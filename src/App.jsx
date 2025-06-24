import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoanRoutes from './routes/LoanRoutes';
import ComplaintPage from './modules/team5-complaint-management/ComplaintPage';
import ComplaintStatus from './modules/team5-complaint-management/ComplaintStatus';
import ComplaintAdmin from './modules/team5-complaint-management/ComplaintAdmin';
import ComplaintRoutes from './routes/ComplaintRoutes';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint/*" element={<ComplaintRoutes />} />
      
        <Route path="/loan/*" element={<LoanRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
