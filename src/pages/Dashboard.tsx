import React from 'react';
import {
  Users,
  Bed,
  TrendingUp,
  AlertTriangle,
  Clock,
  Activity,
  Calendar,

} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { hospitalStats, departmentLoad, chartData, mockAgentActions } from '../data/mockData';

const Dashboard: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Command Center</h1>
        <p className="text-gray-600">Real-time overview of Hope Hospital operations</p>
      </div>

      {/* Hospital Pulse Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients Today</p>
              <p className="text-2xl font-bold text-gray-900">{hospitalStats.totalPatientsToday}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>OPD: {hospitalStats.opdToday}</span>
                <span>IPD: {hospitalStats.ipdToday}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bed Occupancy</p>
              <p className="text-2xl font-bold text-gray-900">
                {hospitalStats.bedOccupancy.occupied}/{hospitalStats.bedOccupancy.total}
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-secondary-500 h-2 rounded-full"
                    style={{
                      width: `${(hospitalStats.bedOccupancy.occupied / hospitalStats.bedOccupancy.total) * 100}%`
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((hospitalStats.bedOccupancy.occupied / hospitalStats.bedOccupancy.total) * 100)}% occupied
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
              <Bed className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Today</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(hospitalStats.revenueToday)}</p>
              <p className="text-sm text-green-600 mt-1">↗ +12% from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">{hospitalStats.criticalAlerts}</p>
              <p className="text-sm text-red-600 mt-1">Requires attention</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Staff On Duty</p>
              <p className="text-2xl font-bold text-gray-900">
                {hospitalStats.staffOnDuty.present}/{hospitalStats.staffOnDuty.total}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((hospitalStats.staffOnDuty.present / hospitalStats.staffOnDuty.total) * 100)}% present
              </p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Patient Flow */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Patient Flow</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last 10 hours</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.patientFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inflow" stroke="#0F4C75" strokeWidth="2" name="Patient Inflow" />
                <Line type="monotone" dataKey="outflow" stroke="#00B4D8" strokeWidth="2" name="Patient Outflow" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Status</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(departmentLoad).map(([dept, load]) => (
              <div key={dept} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{dept}</span>
                  <span className="text-sm font-bold text-gray-900">{load}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      load >= 80 ? 'bg-red-500' : load >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(load, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Agent Activity Feed</h3>
          <div className="space-y-4">
            {mockAgentActions.slice(0, 5).map((action) => (
              <div key={action.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  action.agent_name === 'Flow Agent' ? 'bg-accent-100' :
                  action.agent_name === 'Resource Agent' ? 'bg-primary-100' :
                  action.agent_name === 'Revenue Agent' ? 'bg-green-100' :
                  'bg-yellow-100'
                }`}>
                  <Activity className={`w-4 h-4 ${
                    action.agent_name === 'Flow Agent' ? 'text-accent-600' :
                    action.agent_name === 'Resource Agent' ? 'text-primary-600' :
                    action.agent_name === 'Revenue Agent' ? 'text-green-600' :
                    'text-yellow-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{action.agent_name}</p>
                    <span className="text-xs text-gray-500">{formatTime(action.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    action.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {action.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;