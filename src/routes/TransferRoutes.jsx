import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransactionPage from '../modules/team3-transaction-system/pages/TransactionPage';
import TransactionHistoryPage from '../modules/team3-transaction-system/pages/TransactionHistoryPage';

function TransferRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TransactionPage />} />
      <Route path="/history" element={<TransactionHistoryPage />} />
    </Routes>
  );
}

export default TransferRoutes;
