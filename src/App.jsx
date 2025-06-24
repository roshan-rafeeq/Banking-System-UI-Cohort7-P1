import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoanRoutes from './routes/LoanRoutes';
import ComplaintPage from './modules/team5-complaint-management/ComplaintPage';
import ComplaintStatus from './modules/team5-complaint-management/ComplaintStatus';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/complaint/query" element={<ComplaintStatus />} />

        <Route path="/loan/*" element={<LoanRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
