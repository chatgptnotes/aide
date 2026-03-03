import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, Bed, TrendingUp, Package, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary-500">Aide</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-primary-700 mb-6">
              Aide - The Hospital Neural Network
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Where AI agents orchestrate seamless hospital operations. Transform your healthcare facility 
              with intelligent automation that connects every department in a unified neural network.
            </p>
            
            {/* Neural Network Visualization */}
            <div className="mb-12">
              <div className="relative w-full max-w-4xl mx-auto h-64">
                <svg className="w-full h-full" viewBox="0 0 800 256">
                  {/* Connections */}
                  <g className="stroke-primary-300" strokeWidth="2" fill="none">
                    <line x1="100" y1="128" x2="200" y2="64" />
                    <line x1="100" y1="128" x2="200" y2="128" />
                    <line x1="100" y1="128" x2="200" y2="192" />
                    <line x1="200" y1="64" x2="300" y2="96" />
                    <line x1="200" y1="128" x2="300" y2="96" />
                    <line x1="200" y1="192" x2="300" y2="160" />
                    <line x1="300" y1="96" x2="400" y2="80" />
                    <line x1="300" y1="160" x2="400" y2="176" />
                    <line x1="400" y1="80" x2="500" y2="64" />
                    <line x1="400" y1="176" x2="500" y2="192" />
                    <line x1="500" y1="64" x2="600" y2="96" />
                    <line x1="500" y1="192" x2="600" y2="160" />
                    <line x1="600" y1="96" x2="700" y2="128" />
                    <line x1="600" y1="160" x2="700" y2="128" />
                  </g>
                  
                  {/* Nodes */}
                  <g className="fill-primary-500">
                    <circle cx="100" cy="128" r="20" />
                    <circle cx="200" cy="64" r="16" />
                    <circle cx="200" cy="128" r="16" />
                    <circle cx="200" cy="192" r="16" />
                    <circle cx="300" cy="96" r="16" />
                    <circle cx="300" cy="160" r="16" />
                    <circle cx="400" cy="80" r="16" />
                    <circle cx="400" cy="176" r="16" />
                    <circle cx="500" cy="64" r="16" />
                    <circle cx="500" cy="192" r="16" />
                    <circle cx="600" cy="96" r="16" />
                    <circle cx="600" cy="160" r="16" />
                    <circle cx="700" cy="128" r="20" />
                  </g>
                  
                  {/* Labels */}
                  <g className="fill-primary-700 text-sm font-medium">
                    <text x="100" y="155" textAnchor="middle">OPD</text>
                    <text x="200" y="45" textAnchor="middle">IPD</text>
                    <text x="200" y="110" textAnchor="middle">ICU</text>
                    <text x="200" y="210" textAnchor="middle">OT</text>
                    <text x="300" y="85" textAnchor="middle">Lab</text>
                    <text x="300" y="180" textAnchor="middle">Pharmacy</text>
                    <text x="700" y="155" textAnchor="middle">Billing</text>
                  </g>
                </svg>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center bg-primary-500 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Schedule Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intelligent Agents, Seamless Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four specialized AI agents work together to optimize every aspect of your hospital operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Flow Agent</h3>
              <p className="text-gray-600 text-sm">
                Optimizes OPD queues, reduces wait times, and manages patient routing across departments
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bed className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resource Agent</h3>
              <p className="text-gray-600 text-sm">
                Manages beds, staff allocation, and equipment in real-time for maximum utilization
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Agent</h3>
              <p className="text-gray-600 text-sm">
                Tracks billing, automates insurance claims, and optimizes collection processes
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logistics Agent</h3>
              <p className="text-gray-600 text-sm">
                Coordinates pharmacy inventory, lab requests, and supply chain management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600">Real improvements from hospitals using Aide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">40%</div>
              <div className="text-lg text-gray-700 mb-1">Reduced Wait Times</div>
              <div className="text-sm text-gray-500">Average OPD wait time decreased from 45 to 27 minutes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-500 mb-2">95%</div>
              <div className="text-lg text-gray-700 mb-1">Bed Utilization</div>
              <div className="text-sm text-gray-500">Optimal bed allocation across all departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">30%</div>
              <div className="text-lg text-gray-700 mb-1">Faster Billing</div>
              <div className="text-sm text-gray-500">Automated claims processing and payment collection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-500" />
              </div>
              <span className="text-xl font-bold">Aide</span>
            </div>
            <div className="text-sm opacity-90">
              drmhope.com | A Bettroi Product
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-600 text-center text-sm opacity-75">
            © 2024 Aide Hospital Neural Network. Transforming healthcare operations with AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;