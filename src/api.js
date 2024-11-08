import axios from 'axios';

const API_URL = 'https://loan-app-backend-41j0.onrender.com/api'; // Use your backend API URL
axios.defaults.baseURL = API_URL;

// Ensure setAuthToken is called after login and token is present
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


// API functions
export const register = (userData) => axios.post('/auth/register', userData);
export const login = (userData) => axios.post('/auth/login', userData);
export const applyLoan = (loanData) => axios.post('/loans/apply', loanData);
export const getAdminLoans = () => axios.get('/loans/all');
export const getLoans = () => axios.get('/loans');
export const approveLoan = (loanId) => axios.patch(`/loans/approve/${loanId}`);
export const submitRepayment = (repaymentData) => axios.post('/repayments', repaymentData);


export const submitRepaymentForLoan = async ({ loanId, repaymentIndex, amount }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `/loans/${loanId}/repayments`,
      { amount, repaymentIndex },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};



export const getLoanDetails = (loanId) => axios.get(`/loans/${loanId}`);

