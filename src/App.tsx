
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientFlow from './pages/PatientFlow';
import BedManager from './pages/BedManager';
import StaffSchedule from './pages/StaffSchedule';
import Revenue from './pages/Revenue';
import Inventory from './pages/Inventory';
import AIAgents from './pages/AIAgents';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patient-flow" element={<PatientFlow />} />
            <Route path="/beds" element={<BedManager />} />
            <Route path="/staff" element={<StaffSchedule />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/agents" element={<AIAgents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;