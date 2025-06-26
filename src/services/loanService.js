// src/services/loanService.js
const BASE_URL = 'https://tidy-gibbon-typically.ngrok-free.app/loans';

export const applyGoldLoan = async (data) => {
  return await fetch(`${BASE_URL}/goldLoan/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const applyPersonalLoan = async (data) => {
  return await fetch(`${BASE_URL}/personalLoan/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const applyPropertyLoan = async (data) => {
  return await fetch(`${BASE_URL}/homeLoan/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const getLoansByCustomer = async (customerId) => {
  const res = await fetch(`${BASE_URL}/customer/${customerId}`);
  return res.json();
};
