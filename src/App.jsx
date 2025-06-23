import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoanRoutes from './routes/LoanRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan/*" element={<LoanRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
