import React from 'react';
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
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patient-flow', icon: Users, label: 'Patient Flow' },
  { path: '/beds', icon: Bed, label: 'Bed Manager' },
  { path: '/staff', icon: Calendar, label: 'Staff Schedule' },
  { path: '/revenue', icon: TrendingUp, label: 'Revenue' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/agents', icon: Bot, label: 'AI Agents' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-500">Aide</h1>
            <p className="text-xs text-gray-500">Neural Network</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-5 h-5" />
            <span className="font-medium">Neural Status</span>
          </div>
          <div className="text-sm opacity-90">
            <p>4 Agents Active</p>
            <p>System Health: 98%</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;