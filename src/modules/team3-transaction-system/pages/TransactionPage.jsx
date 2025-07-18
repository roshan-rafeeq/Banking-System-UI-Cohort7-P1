// src/components/TransferPage.jsx

import '../../../css/TransactionPageCss.css';
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect} from 'react';
import { sendTransferRequest,getTransactionHistory } from "../../../services/transactionService.js";

function TransactionPage() {
  const [formData, setFormData] = useState({
  senderAccount: '',
  receiverAccount: '',
  receiverAccount: '',
  currency: 'INR', // default value
  amount: '',
});

  const [errors, setErrors] = useState({});
  const[transactions,setTransactions]=useState([]);
  useEffect(()=>{
    // fetchTransactions();
  },[]);
  const validateForm = () => {
  const newErrors = {};

  // if (!formData.senderAccount) {
  //   newErrors.senderAccount = "Sender account is required.";
  // } else if (!/^\d{10,16}$/.test(formData.senderAccount)) {
  //   newErrors.senderAccount = "Must be 10–16 digits.";
  // }

  // if (!formData.receiverAccount) {
  //   newErrors.receiverAccount = "Receiver account is required.";
  // } else if (!/^\d{10,16}$/.test(formData.receiverAccount)) {
  //   newErrors.receiverAccount = "Must be 10–16 digits.";
  // }

  if (!formData.currency) {
    newErrors.currency = "Currency is required.";
  }

  if (!formData.amount) {
    newErrors.amount = "Amount is required.";
  } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
    newErrors.amount = "Amount must be a positive number.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    console.log("inside the form submit");
    
    
    const response = await fetch(`https://many-shark-kind.ngrok-free.app/api/transactions/create`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
  body: JSON.stringify(formData)
});
    console.log("Transfer Success:", response);
    alert("Transfer request sent successfully!");

    setFormData({
      senderAccount: '',
      receiverAccount: '',
      currency: 'INR',
      amount: '',
    });
    setErrors({});
  } catch (err) {
    console.error("Transfer Failed:", err);
    alert("Transfer failed. Please try again.");
  }
};
  const fetchTransactions=async()=>{
    const response=await getTransactionHistory();
    setTransactions(response.data)
  }
  const navigate = useNavigate();
  const handleShowHistory = () => {
    navigate('/transfer/history');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  
  
{
  console.log("ihfdiasjdfnkajdfas", formData);
  
}


  return (
    
    <div className="parent-container">
      <div><img src="src\assets\mobile-banking-concept-illustration_114360-12788.avif" alt=" image Banking" /></div>
      
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
            {errors.senderAccount && <p className="error-text">{errors.senderAccount}</p>}
            <input
              type="text"
              name="receiverAccount"
              placeholder="Receiver Account Number"
              className="input-field"
              value={formData.receiverAccount}
              onChange={handleChange}
            />
            {errors.receiverAccount && <p className="error-text">{errors.receiverAccount}</p>}

            <select
              name="currency"
              className="input-field"
              value={formData.currency}
              onChange={handleChange}
            >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="POUND">Pound</option>
                  <option value="DINAR">Dinar</option>
                </select>
{                   errors.currency && <p className="error-text">{errors.currency}</p>}
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="input-field"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && <p className="error-text">{errors.amount}</p>}
            <button type="submit" className="transfer-button">
              Transfer
            </button>
            <button onClick={handleShowHistory} className="transfer-button" >
              Show Transactions
            </button>
          </form>
        </div>

        {/* <div className="transaction-history">
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

        </div> */}
         
      </div>
      
    </div>
  );
}

export default TransactionPage;
