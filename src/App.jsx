import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoanRoutes from './routes/LoanRoutes';
import ComplaintPage from './modules/team5-complaint-management/ComplaintPage';
import ComplaintStatus from './modules/team5-complaint-management/ComplaintStatus';
import AccountRoutes from './routes/AccountRoutes';
import NavBar from './components/Navbar';
import ComplaintRoutes from './routes/ComplaintRoutes';

import AccountsDashboard from './modules/team2-account-management/pages/AccountsDashboard';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint/*" element={<ComplaintRoutes />} />
        <Route path="/accounts/*" element={<AccountRoutes />} />
        <Route path="/loan/*" element={<LoanRoutes />} />
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
