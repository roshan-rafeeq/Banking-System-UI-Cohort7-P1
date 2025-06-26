import React, { useEffect, useState } from "react";
import "../../../css/TransactionPageCss.css";
import { getTransactionHistory } from "../../../services/transactionService";

function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    // try {
    //   const response = await getTransactionHistory();
    //   setTransactions(response.data);
    //   console.log("Transactions fetched successfully:", response.data);

    // } catch (err) {
    //   console.error("Failed to fetch transactions:", err);
    // }
    console.log("Fetching transactions from API...");

    try {
      const response = await fetch(`https://many-shark-kind.ngrok-free.app/api/transactions/history/0001-CUST9877-002`, {
        method: "GET",
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });

      console.log("**********************");
      console.log(response);

      const js = await response.json();
      console.log("Responseeeeeeeee:" + response);

      //setTransactions(js);
      setTransactions(js.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

      console.log("Transactions fetched successfully:", js);



    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile.");
    }

  };

  return (
    <div className="parent-container-history">
      <h2 className="transfer-title-history">Transaction History</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>₹{transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>{transaction.senderAccount}</td>
                <td>{transaction.receiverAccount}</td>
                <td>{transaction.timestamp}</td>
              </tr>
            ))    
          }
          {/* {transactions.length === 0 ? (
            <tr>
              <td colSpan="6">No transactions found.</td>
            </tr>
          ) : (
            // transactions.map((transactions) => (
            <tr key={transactions.id}>
              <td>{transactions.id}</td>
              <td>₹{transactions.amount}</td>
              <td>{transactions.status}</td>
              <td>{transactions.senderAccount}</td>
              <td>{transactions.receiverAccount}</td>
              <td>{transactions.timestamp}</td>
            </tr>
            // ))
          )} */}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistoryPage;
