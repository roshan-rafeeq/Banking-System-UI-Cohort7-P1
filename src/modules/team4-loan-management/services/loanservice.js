import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/loans'; // Replace with actual Spring Boot API

// Submit loan application
export const applyForLoan = async (loanData) => {
  return axios.post(`${BASE_URL}/apply`, loanData);
};

// Fetch all loans
export const fetchAllLoans = async () => {
  return axios.get(`${BASE_URL}/all`);
};

// Fetch loan by ID
export const fetchLoanById = async (loanId) => {
  return axios.get(`${BASE_URL}/${loanId}`);
};
