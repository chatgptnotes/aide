import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

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
import OTSchedule from './pages/OTSchedule';
import LabDashboard from './pages/LabDashboard';
import InfectionControl from './pages/InfectionControl';
import EDBoard from './pages/EDBoard';
import NABHTracker from './pages/NABHTracker';
import AmbulanceTracker from './pages/AmbulanceTracker';
import BloodBank from './pages/BloodBank';
import SOPLibrary from './pages/SOPLibrary';
import ReferralNetwork from './pages/ReferralNetwork';

function App() {
  return (
    <ErrorBoundary fallbackTitle="Application Error">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<ErrorBoundary fallbackTitle="Dashboard Error"><Dashboard /></ErrorBoundary>} />
              <Route path="/patient-flow" element={<ErrorBoundary><PatientFlow /></ErrorBoundary>} />
              <Route path="/beds" element={<ErrorBoundary><BedManager /></ErrorBoundary>} />
              <Route path="/staff" element={<ErrorBoundary><StaffSchedule /></ErrorBoundary>} />
              <Route path="/revenue" element={<ErrorBoundary><Revenue /></ErrorBoundary>} />
              <Route path="/inventory" element={<ErrorBoundary><Inventory /></ErrorBoundary>} />
              <Route path="/agents" element={<ErrorBoundary><AIAgents /></ErrorBoundary>} />
              <Route path="/analytics" element={<ErrorBoundary><Analytics /></ErrorBoundary>} />
              <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
              <Route path="/ot-schedule" element={<ErrorBoundary><OTSchedule /></ErrorBoundary>} />
              <Route path="/lab" element={<ErrorBoundary><LabDashboard /></ErrorBoundary>} />
              <Route path="/infection-control" element={<ErrorBoundary><InfectionControl /></ErrorBoundary>} />
              <Route path="/ed-board" element={<ErrorBoundary><EDBoard /></ErrorBoundary>} />
              <Route path="/nabh" element={<ErrorBoundary><NABHTracker /></ErrorBoundary>} />
              <Route path="/ambulance" element={<ErrorBoundary><AmbulanceTracker /></ErrorBoundary>} />
              <Route path="/blood-bank" element={<ErrorBoundary><BloodBank /></ErrorBoundary>} />
              <Route path="/sop-library" element={<ErrorBoundary><SOPLibrary /></ErrorBoundary>} />
              <Route path="/referrals" element={<ErrorBoundary><ReferralNetwork /></ErrorBoundary>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
