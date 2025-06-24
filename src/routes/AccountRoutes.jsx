
import { Routes, Route } from 'react-router-dom';


const LoanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplyLoan />} />
    </Routes>
  );
};

export default LoanRoutes;
