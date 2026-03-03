import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 md:px-6 py-3 print:hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-1">
        <span>Powered by Aide . Hope Hospital</span>
        <span>drmhope.com | A Bettroi Product | v1.2 | 2026</span>
      </div>
    </footer>
  );
};

export default Footer;
