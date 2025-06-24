// src/routes/LoanRoutes.jsx

import { Routes, Route } from 'react-router-dom';
// import ApplyLoan from '../modules/loan/pages/ApplyLoan';
// import LoanList from '../modules/loan/pages/LoanList';

const LoanRoutes = () => {
  return (
    <Routes>
      <Route path="/loan/apply" element={<ApplyLoan />} />
      {/* <Route path="/loan/list" element={<LoanList />} /> */}
    </Routes>
  );
};

export default LoanRoutes;
