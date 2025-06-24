
import { Routes, Route } from 'react-router-dom';
import AccountsDashboard from '../modules/team2-account-management/pages/AccountsDashboard';
import AccountDetails from '../modules/team2-account-management/pages/AccountDetails';
import CreateAccount from '../modules/team2-account-management/pages/CreateAccount';


const LoanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountsDashboard />} />
       <Route path=":accountId" element={<AccountDetails />} />
      <Route path="/create" element={<CreateAccount />} />

    </Routes>
  );
};

export default LoanRoutes;
