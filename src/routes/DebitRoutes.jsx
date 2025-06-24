import { Routes, Route } from 'react-router-dom';
import Debit from '../modules/team6-debitt-card-management/pages/Debit';
import Blockcard from '../modules/team6-debitt-card-management/pages/Blockcard';
import ManageLimits from '../modules/team6-debitt-card-management/pages/ManageLimits';
import SetResetPin from '../modules/team6-debitt-card-management/pages/SetResetPin';
import ActivateCard from '../modules/team6-debitt-card-management/pages/ActivateCard';

function AppRoutes() {
  return (
    <Routes>
      {/* Other module routes */}
      <Route path="/" element={<Debit />} />
      <Route path="/block" element={<Blockcard />} />
      <Route path="/limits" element={<ManageLimits />} />
      <Route path="/pin" element={<SetResetPin />} />
      <Route path="/activate" element={<ActivateCard />} />
    </Routes>
  );
}

export default AppRoutes;
