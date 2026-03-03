import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span>drmhope.com | A Bettroi Product</span>
        </div>
        <div>
          <span>v1.0 • Built with Aide Neural Network</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;