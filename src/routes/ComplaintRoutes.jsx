import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComplaintStatus from './ComplaintStatus';
import ComplaintAdmin from './ComplaintAdmin';

function ComplaintRoutes() {
  return (
    <Routes>
      <Route path="/complaintstatus" element={<ComplaintStatus />} />
      <Route path="/complaintAdmin" element={<ComplaintAdmin />} />
    </Routes>
  );
}

export default ComplaintRoutes;
