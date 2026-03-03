import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bed,
  Calendar,
  TrendingUp,
  Package,
  Bot,
  BarChart3,
  Settings,
  Activity,
  Scissors,
  FlaskConical,
  ShieldAlert,
  Siren,
  ClipboardCheck,
  Truck,
  Droplets,
  FileText,
  UserPlus,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const navSections = [
  {
    title: 'Core',
    items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/patient-flow', icon: Users, label: 'Patient Flow' },
      { path: '/beds', icon: Bed, label: 'Bed Manager' },
      { path: '/staff', icon: Calendar, label: 'Staff Schedule' },
      { path: '/revenue', icon: TrendingUp, label: 'Revenue' },
      { path: '/inventory', icon: Package, label: 'Inventory' },
    ],
  },
  {
    title: 'Clinical',
    items: [
      { path: '/ot-schedule', icon: Scissors, label: 'OT Schedule' },
      { path: '/lab', icon: FlaskConical, label: 'Lab Dashboard' },
      { path: '/ed-board', icon: Siren, label: 'ED Board' },
      { path: '/blood-bank', icon: Droplets, label: 'Blood Bank' },
      { path: '/infection-control', icon: ShieldAlert, label: 'Infection Control' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { path: '/ambulance', icon: Truck, label: 'Ambulance' },
      { path: '/nabh', icon: ClipboardCheck, label: 'NABH Tracker' },
      { path: '/sop-library', icon: FileText, label: 'SOP Library' },
      { path: '/referrals', icon: UserPlus, label: 'Referral Network' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { path: '/agents', icon: Bot, label: 'AI Agents' },
      { path: '/analytics', icon: BarChart3, label: 'Analytics' },
      { path: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="bg-white border-r border-gray-200 w-64 flex-shrink-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-500">Aide</h1>
            <p className="text-xs text-gray-500">Neural Network</p>
          </div>
        </div>
        
        <nav className="space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 hover:text-gray-600"
              >
                <span>{section.title}</span>
                {collapsed[section.title] ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {!collapsed[section.title] && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors ${
                          isActive
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-6 pt-2">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-5 h-5" />
            <span className="font-medium text-sm">Neural Status</span>
          </div>
          <div className="text-xs opacity-90">
            <p>4 Agents Active</p>
            <p>System Health: 98%</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
