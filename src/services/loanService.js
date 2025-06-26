// src/services/loanService.js
const BASE_URL = 'https://tidy-gibbon-typically.ngrok-free.app/loans';

export const applyGoldLoan = async (data) => {
  return await fetch(`${BASE_URL}/gold`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const applyPersonalLoan = async (data) => {
  return await fetch(`${BASE_URL}/personal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const applyPropertyLoan = async (data) => {
  return await fetch(`${BASE_URL}/property`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const getLoansByCustomer = async (customerId) => {
  const res = await fetch(`${BASE_URL}/customer/${customerId}`);
  return res.json();
};
