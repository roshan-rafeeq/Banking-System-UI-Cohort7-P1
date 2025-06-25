import React, { useEffect, useState } from "react";
import "../../../css/TransactionPageCss.css";
import { getTransactionHistory } from "../../../services/transactionService";

function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactionHistory();
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
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
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6">No transactions found.</td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>₹{txn.amount}</td>
                <td>{txn.status}</td>
                <td>{txn.senderAccount}</td>
                <td>{txn.receiverAccount}</td>
                <td>{txn.timestamp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistoryPage;
