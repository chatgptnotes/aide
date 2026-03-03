import React from 'react';
import { TrendingUp, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const kpis = [
    { name: 'Average Wait Time', value: '12 min', change: '-23%', trend: 'down' },
    { name: 'Bed Turnover Rate', value: '1.2/day', change: '+15%', trend: 'up' },
    { name: 'Revenue Per Bed', value: '₹8,450', change: '+8%', trend: 'up' },
    { name: 'Staff Efficiency', value: '87%', change: '+5%', trend: 'up' },
    { name: 'Patient Satisfaction', value: '4.2/5', change: '+0.3', trend: 'up' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{kpi.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
            <div className="flex items-center space-x-1">
              <TrendingUp className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Download Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Analytics Reports</h3>
          <button className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Download All Reports</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Patient Flow Report</h4>
            <p className="text-sm text-gray-600">Detailed analysis of patient movement and wait times</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Revenue Analysis</h4>
            <p className="text-sm text-gray-600">Financial performance and billing insights</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Resource Utilization</h4>
            <p className="text-sm text-gray-600">Bed, staff, and equipment usage statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;