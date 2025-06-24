import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComplaintStatus from '../modules/team5-complaint-management/ComplaintStatus';
import ComplaintAdmin from '../modules/team5-complaint-management/ComplaintAdmin';
import ComplaintPage from '../modules/team5-complaint-management/ComplaintPage';

function ComplaintRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ComplaintPage />} />
      <Route path="/status" element={<ComplaintStatus />} />
      <Route path="/admin" element={<ComplaintAdmin />} />
    </Routes>
  );
}

export default ComplaintRoutes;
