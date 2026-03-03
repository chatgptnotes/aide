import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, any email/password combination works
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary-700">Welcome to Aide</h1>
            <p className="text-gray-600 mt-2">Sign in to your Hospital Neural Network</p>
          </div>

          
            {/* Demo Credentials Card */}
            <button
              type="button"
              onClick={() => { setEmail('cmd@hopehospitaal.com'); setPassword('Chindwada@1'); }}
              className="w-full mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#0F4C75] uppercase tracking-wider">Demo Access</span>
                <span className="text-[10px] bg-[#0F4C75] text-white px-2 py-0.5 rounded-full">Click to fill</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600"><span className="text-gray-400 w-16 inline-block">Email:</span> cmd@hopehospitaal.com</div>
                <div className="text-sm text-gray-600"><span className="text-gray-400 w-16 inline-block">Pass:</span> Chindwada@1</div>
              </div>
            </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                Contact Administrator
              </a>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        Demo Mode: Use any email/password
      </div>
    </div>
  );
};

export default Login;