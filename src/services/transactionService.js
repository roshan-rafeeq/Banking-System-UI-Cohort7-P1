// src/services/transactionService.js
import axios from "axios";

const API_URL = "http://many-shark-kind.ngrok-free.app/api/transactions/create";

// Send a new transaction
export const sendTransferRequest = async (formData) => {
  console.log("Sending transfer request with data:", formData);
  
  // const timestamp = new Date().toLocaleString();
  // const transaction = {
  //   ...formData,
  // };
  log
return await axios.post(API_URL, formData, {
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json'
  }
});
};

// Get all transactions
export const getTransactionHistory = async () => {
  return await axios.get(API_URL);
};
