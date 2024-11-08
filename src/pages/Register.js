import React, { useState } from 'react';
import { register } from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState({ name: '', email: '', password: '', role: '' }); // Track error messages for each field
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    // Simple form validation
    if (!formData.name || !formData.email || !formData.password) {
      setError({
        name: formData.name ? '' : 'Name is required',
        email: formData.email ? '' : 'Email is required',
        password: formData.password ? '' : 'Password is required',
        role: ''
      });
      setLoading(false);
      return;
    }

    try {
      const response = await register(formData);
      if (response.data) {
        alert('Registration successful! Please log in.');
        setFormData({ name: '', email: '', password: '', role: 'customer' }); // Reset form
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError({ ...error, general: error.response?.data?.message || 'Something went wrong during registration.' });
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setError(prevState => ({
        ...prevState,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }));
    } else {
      setError(prevState => ({
        ...prevState,
        [field]: ''
      }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <form onSubmit={handleRegister} className="max-w-sm w-full p-8 space-y-6 bg-white rounded-xl shadow-xl transform transition-all hover:scale-105">
        <h2 className="text-center text-3xl font-extrabold text-blue-600 tracking-wide">Create Account</h2>
        
        {/* Form fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => handleBlur('name')} // Add onBlur event handler
          />
          {error.name && <p className="text-red-500 text-sm mt-2">{error.name}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur('email')} // Add onBlur event handler
          />
          {error.email && <p className="text-red-500 text-sm mt-2">{error.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onBlur={() => handleBlur('password')} // Add onBlur event handler
          />
          {error.password && <p className="text-red-500 text-sm mt-2">{error.password}</p>}

          <select
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Error message */}
        {error.general && <p className="text-red-500 text-sm mt-2">{error.general}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className={`w-full py-3 mt-4 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition-colors'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
