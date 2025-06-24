// src/services/transactionService.js
import axios from "axios";

const API_URL = "http://localhost:3001/transactions";

// Send a new transaction
export const sendTransferRequest = async (formData) => {
  const timestamp = new Date().toLocaleString();
  const transaction = {
    ...formData,
    status: "Success", // for testing
    timestamp,
  };

  return await axios.post(API_URL, transaction);
};

// Get all transactions
export const getTransactionHistory = async () => {
  return await axios.get(API_URL);
};
