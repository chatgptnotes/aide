import React from 'react';
import { User, Menu } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import { AlertBell } from './AlertSystem';

interface Props {
  onToggleSidebar?: () => void;
}

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onToggleSidebar} className="md:hidden p-2 text-gray-500 hover:text-primary-500 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-primary-500">Aide</h1>
          <span className="text-sm text-gray-500 hidden sm:inline">Hospital Neural Network</span>
        </div>

        <GlobalSearch />

        <div className="flex items-center space-x-3 relative">
          <AlertBell />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm hidden sm:block">
              <p className="font-medium text-gray-900">Dr. Admin</p>
              <p className="text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
