import React, { useState } from 'react';
import { login, setAuthToken } from '../api'; // Make sure `login` API returns user data with role
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // Add error state to manage error messages
  const [inputErrors, setInputErrors] = useState({ email: '', password: '' }); // Manage individual input errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before attempting login
    setInputErrors({ email: '', password: '' }); // Clear input errors on submit
    try {
      const res = await login(formData); // Call the API to login

      // Save the token and role in localStorage
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      localStorage.setItem('userRole', res.data.role); // Store role (admin or customer)

      // Redirect based on role
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Login failed. Please check your credentials and try again.'); // Set error message
    }
  };

  const handleBlur = (field) => {
    if (formData[field] === '') {
      setInputErrors((prevState) => ({
        ...prevState,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex justify-center items-center">
      <form onSubmit={handleLogin} className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-center text-3xl font-bold text-blue-600">Login</h2>

        {/* Show general error message */}
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur('email')} // Trigger error check on blur
            required
          />
          {inputErrors.email && <p className="text-red-500 text-sm">{inputErrors.email}</p>} {/* Show email error */}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onBlur={() => handleBlur('password')} // Trigger error check on blur
            required
          />
          {inputErrors.password && <p className="text-red-500 text-sm">{inputErrors.password}</p>} {/* Show password error */}
        </div>
        
        <button type="submit" className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Login
        </button>
        
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-700">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
