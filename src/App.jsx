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
import Login from './modules/team1-customer-onboarding/Login';
import SignUp from './modules/team1-customer-onboarding/SignUp';
import TransferRoutes from './routes/TransferRoutes';
import Profile from './modules/team1-customer-onboarding/Profile';

import DebitCard from './routes/DebitRoutes';
import CustomerState from './context/CustomerState';



const App = () => {
  return (
    <CustomerState>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/transfer/*" element={<TransferRoutes />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/complaint/*" element={<ComplaintRoutes />} />
        <Route path="/accounts/*" element={<AccountRoutes />} />
        <Route path="/loan/*" element={<LoanRoutes />} />
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
         
         <Route path="/debit/*" element={<DebitCard />} />
        
       </Routes>
    </Router>
    </CustomerState>
  );
};

export default App;
