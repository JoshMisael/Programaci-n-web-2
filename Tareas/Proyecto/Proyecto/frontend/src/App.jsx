import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes.jsx';
import PublicRoutes from './routes/PublicRoutes.jsx';
import Login from './pages/public/Login.jsx';
import Register from './pages/public/Register.jsx';
import Dashboard from './pages/private/Dashboard.jsx';
import Vehicles from './pages/private/Vehicles.jsx';
import VehicleDetail from './pages/private/VehicleDetail.jsx';
import Checkup from './pages/private/Checkup.jsx';

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/checkup" element={<Checkup />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
