import { Routes, Route } from 'react-router-dom';
import LoanTypes from '../modules/team4-loan-management/pages/LoanTypes';
import GoldLoanCalculator from '../modules/team4-loan-management/pages/GoldLoanCalculator';
import GoldLoanApply from '../modules/team4-loan-management/pages/GoldLoanApply';
import LoanStatus from '../modules/team4-loan-management/pages/LoanStatus';


const LoanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoanTypes />} />
      <Route path="gold" element={<GoldLoanCalculator />} />
      <Route path="gold/apply" element={<GoldLoanApply />} />
      <Route path="status" element={<LoanStatus />} />
      {/* Add other loan types similarly */}
    </Routes>
  );
};

export default LoanRoutes;
