import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransactionPage from '../modules/team3-transaction-system/pages/TransactionPage';

function TransferRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TransactionPage />} />
    </Routes>
  );
}

export default TransferRoutes;
