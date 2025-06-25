import { Routes, Route } from 'react-router-dom';
import Debit from '../modules/team6-user-access-management/pages/Debit';
import Blockcard from '../modules/team6-user-access-management/pages/Blockcard';
import ManageLimits from '../modules/team6-user-access-management/pages/ManageLimits';
import SetResetPin from '../modules/team6-user-access-management/pages/SetResetPin';
import ActivateCard from '../modules/team6-user-access-management/pages/ActivateCard';

function AppRoutes() {
  return (
     <Routes>
      <Route path="/" element={<Debit />} />
      <Route path="block/:cardId" element={<Blockcard />} />
      <Route path="limits/:cardId" element={<ManageLimits />} />
      <Route path="pin/:cardId" element={<SetResetPin />} />
      <Route path="activate/:cardId" element={<ActivateCard />} />
    </Routes>
  );
}

export default AppRoutes;
