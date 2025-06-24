import { Routes, Route } from 'react-router-dom';
import LoanTypes from '../modules/team4-loan-management/pages/LoanTypes';
import GoldLoanCalculator from '../modules/team4-loan-management/pages/GoldLoanCalculator';
import GoldLoanApply from '../modules/team4-loan-management/pages/GoldLoanApply';
import LoanStatus from '../modules/team4-loan-management/pages/LoanStatus';
import LoanDetails from '../modules/team4-loan-management/pages/LoanDetails';
import PersonalLoanCalculator from '../modules/team4-loan-management/pages/PersonalLoanCalculator';
import PersonalLoanApply from '../modules/team4-loan-management/pages/PersonalLoanApply';


const LoanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoanTypes />} />
      <Route path="gold" element={<GoldLoanCalculator />} />
      <Route path="gold/apply" element={<GoldLoanApply />} />
      <Route path="status" element={<LoanStatus />} />
      <Route path="status/:loanId" element={<LoanDetails />} />
      <Route path="personal" element={<PersonalLoanCalculator />} />
      <Route path="personal/apply" element={<PersonalLoanApply/>} />


    </Routes>
  );
};

export default LoanRoutes;
