// src/components/TransferPage.jsx

import '../../../css/TransactionPageCss.css';

import React, { useState,useEffect} from 'react';
import { sendTransferRequest,getTransactionHistory } from "../../../services/transactionService.js";

function TransactionPage() {
  const [formData, setFormData] = useState({
    senderAccount: '',
    receiverAccount: '',
    ifsc: '',
    amount: '',
  });
  const[transactions,setTransactions]=useState([]);
  useEffect(()=>{
    fetchTransactions();
  },[]);
  const fetchTransactions=async()=>{
    const response=await getTransactionHistory();
    setTransactions(response.data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendTransferRequest(formData);
      console.log("Transfer Success:", response);
      alert("Transfer request sent successfully!");

      setFormData({
        senderAccount: '',
        receiverAccount: '',
        ifsc: '',
        amount: '',
      });
    } catch (err) {
      console.error("Transfer Failed:", err);
      console.log("Fetch Failed");
      alert("Transfer failed. Please try again.");
    }
  };

  return (
    <div className="parent-container">
      <div className="transfer-container">
        <div className="heading-form">
          <h2 className="transfer-title">Money Transfer</h2>

          <form className="transfer-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="senderAccount"
              placeholder="Sender Account Number"
              className="input-field"
              value={formData.senderAccount}
              onChange={handleChange}
            />
            <input
              type="text"
              name="receiverAccount"
              placeholder="Receiver Account Number"
              className="input-field"
              value={formData.receiverAccount}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ifsc"
              placeholder="IFSC Code"
              className="input-field"
              value={formData.ifsc}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="input-field"
              value={formData.amount}
              onChange={handleChange}
            />
            <button type="submit" className="transfer-button">
              Transfer
            </button>
          </form>
        </div>

        <div className="transaction-history">
          <h3 className="history-title">Transaction History</h3>
                <ul className="history-list">
                    {transactions.length === 0 ? (
                        <li className="history-item">No transactions found.</li>
                    ) : (
                        transactions.map((txn) => (
                        <li className="history-item" key={txn.id}>
                            <p><strong>ID:</strong> {txn.id}</p>
                            <p><strong>Amount:</strong> ₹{txn.amount}</p>
                            <p><strong>Status:</strong> {txn.status}</p>
                            <p><strong>Sender:</strong> {txn.senderAccount}</p>
                            <p><strong>Receiver:</strong> {txn.receiverAccount}</p>
                            <p><strong>Time:</strong> {txn.timestamp}</p>
                        </li>
                        ))
                    )}
                </ul>

        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
