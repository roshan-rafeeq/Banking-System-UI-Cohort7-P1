import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoanRoutes from './routes/LoanRoutes';
import ComplaintPage from './modules/team5-complaint-management/ComplaintPage';
import ComplaintStatus from './modules/team5-complaint-management/ComplaintStatus';
import AccountsDashboard from './modules/team2-account-management/pages/AccountsDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/complaint/query" element={<ComplaintStatus />} />
        <Route path = "/accounts/" element={<AccountsDashboard/>} />
        {/* Placeholder for Accounts Dashboard, replace with actual component */}

        <Route path="/loan/*" element={<LoanRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
