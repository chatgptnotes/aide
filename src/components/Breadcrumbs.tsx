import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  'patient-flow': 'Patient Flow',
  beds: 'Bed Manager',
  staff: 'Staff Schedule',
  revenue: 'Revenue',
  inventory: 'Inventory',
  agents: 'AI Agents',
  analytics: 'Analytics',
  settings: 'Settings',
  'ot-schedule': 'OT Schedule',
  lab: 'Lab Dashboard',
  'infection-control': 'Infection Control',
  'ed-board': 'ED Board',
  nabh: 'NABH Tracker',
  ambulance: 'Ambulance',
  'blood-bank': 'Blood Bank',
  'sop-library': 'SOP Library',
  referrals: 'Referral Network',
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 px-6 pt-4 pb-0">
      <Link to="/dashboard" className="hover:text-primary-500 transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {segments.map((segment, i) => (
        <React.Fragment key={segment}>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          {i === segments.length - 1 ? (
            <span className="font-medium text-gray-900">{routeLabels[segment] || segment}</span>
          ) : (
            <Link to={`/${segments.slice(0, i + 1).join('/')}`} className="hover:text-primary-500 transition-colors">
              {routeLabels[segment] || segment}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
