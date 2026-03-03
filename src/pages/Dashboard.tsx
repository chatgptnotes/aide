import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, Bed, TrendingUp, AlertTriangle, Activity, Calendar, Minimize, Monitor,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { hospitalStats, departmentLoad, chartData, mockAgentActions } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { SkeletonCard, SkeletonChart } from '../components/SkeletonLoader';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [commandCenter, setCommandCenter] = useState(false);
  const [ccSection, setCcSection] = useState(0);
  const [ccTime, setCcTime] = useState(new Date());

  useEffect(() => { setTimeout(() => setLoading(false), 800); }, []);

  // Auto-update elapsed time
  useEffect(() => {
    const i = setInterval(() => setElapsed(Math.floor((Date.now() - lastUpdated) / 1000)), 1000);
    return () => clearInterval(i);
  }, [lastUpdated]);

  // Simulate refresh every 30s
  useEffect(() => {
    const i = setInterval(() => setLastUpdated(Date.now()), 30000);
    return () => clearInterval(i);
  }, []);

  // Command center auto-cycle
  useEffect(() => {
    if (!commandCenter) return;
    const i = setInterval(() => setCcSection(s => (s + 1) % 3), 30000);
    return () => clearInterval(i);
  }, [commandCenter]);

  // Command center clock
  useEffect(() => {
    if (!commandCenter) return;
    const i = setInterval(() => setCcTime(new Date()), 1000);
    return () => clearInterval(i);
  }, [commandCenter]);

  const toggleCommandCenter = useCallback(() => {
    if (!commandCenter) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setCommandCenter(!commandCenter);
  }, [commandCenter]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const ccBase = commandCenter ? 'bg-gray-950 text-white min-h-screen' : '';
  const ccCard = commandCenter ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200';
  const ccText = commandCenter ? 'text-gray-100' : 'text-gray-900';
  const ccSub = commandCenter ? 'text-gray-400' : 'text-gray-600';

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="mb-8"><div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-2" /><div className="h-4 bg-gray-200 rounded w-48 animate-pulse" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">{Array.from({length:5}).map((_,i)=><SkeletonCard key={i}/>)}</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><SkeletonChart /><SkeletonChart /></div>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-6 space-y-6 ${ccBase}`}>
      {/* Command Center Clock Overlay */}
      {commandCenter && (
        <div className="fixed top-4 right-4 z-50 text-right">
          <div className="text-4xl font-mono font-bold text-white/90">{ccTime.toLocaleTimeString('en-IN')}</div>
          <div className="text-sm text-gray-400">{ccTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${ccText} mb-1`}>Hospital Command Center</h1>
          <div className="flex items-center gap-3">
            <p className={ccSub}>Real-time overview of Hope Hospital operations</p>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Last updated {elapsed < 5 ? 'just now' : `${elapsed}s ago`}
            </span>
          </div>
        </div>
        <button
          onClick={toggleCommandCenter}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${commandCenter ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
        >
          {commandCenter ? <Minimize className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
          {commandCenter ? 'Exit Command Center' : 'Command Center Mode'}
        </button>
      </div>

      {/* Hospital Pulse Cards */}
      {(!commandCenter || ccSection === 0) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs md:text-sm font-medium ${ccSub}`}>Total Patients Today</p>
                <p className={`text-xl md:text-2xl font-bold ${ccText}`}>{hospitalStats.totalPatientsToday}</p>
                <div className="flex items-center gap-3 mt-2 text-xs md:text-sm text-gray-500">
                  <span>OPD: {hospitalStats.opdToday}</span>
                  <span>IPD: {hospitalStats.ipdToday}</span>
                </div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs md:text-sm font-medium ${ccSub}`}>Bed Occupancy</p>
                <p className={`text-xl md:text-2xl font-bold ${ccText}`}>
                  {hospitalStats.bedOccupancy.occupied}/{hospitalStats.bedOccupancy.total}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: `${(hospitalStats.bedOccupancy.occupied / hospitalStats.bedOccupancy.total) * 100}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{Math.round((hospitalStats.bedOccupancy.occupied / hospitalStats.bedOccupancy.total) * 100)}% occupied</p>
                </div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary-500/10 rounded-xl flex items-center justify-center">
                <Bed className="w-5 h-5 md:w-6 md:h-6 text-secondary-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs md:text-sm font-medium ${ccSub}`}>Revenue Today</p>
                <p className={`text-xl md:text-2xl font-bold ${ccText}`}>{formatCurrency(hospitalStats.revenueToday)}</p>
                <p className="text-xs md:text-sm text-green-500 mt-1">+12% from yesterday</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs md:text-sm font-medium ${ccSub}`}>Critical Alerts</p>
                <p className="text-xl md:text-2xl font-bold text-red-500 animate-pulse">{hospitalStats.criticalAlerts}</p>
                <StatusBadge level="critical" label="Requires attention" pulse />
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 md:p-6 col-span-2 md:col-span-1 ${ccCard}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs md:text-sm font-medium ${ccSub}`}>Staff On Duty</p>
                <p className={`text-xl md:text-2xl font-bold ${ccText}`}>{hospitalStats.staffOnDuty.present}/{hospitalStats.staffOnDuty.total}</p>
                <StatusBadge level="normal" label={`${Math.round((hospitalStats.staffOnDuty.present / hospitalStats.staffOnDuty.total) * 100)}% present`} />
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {(!commandCenter || ccSection === 1) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${ccText}`}>Live Patient Flow</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Live</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.patientFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke={commandCenter ? '#374151' : '#E5E7EB'} />
                  <XAxis dataKey="time" stroke={commandCenter ? '#9CA3AF' : '#6B7280'} />
                  <YAxis stroke={commandCenter ? '#9CA3AF' : '#6B7280'} />
                  <Tooltip contentStyle={commandCenter ? { backgroundColor: '#1F2937', border: '1px solid #374151', color: '#fff' } : undefined} />
                  <Line type="monotone" dataKey="inflow" stroke="#0F4C75" strokeWidth={2} name="Patient Inflow" dot={false} />
                  <Line type="monotone" dataKey="outflow" stroke="#00B4D8" strokeWidth={2} name="Patient Outflow" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <h3 className={`text-lg font-semibold ${ccText} mb-6`}>Revenue Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData.revenueBreakdown} cx="50%" cy="50%" labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80} fill="#8884d8" dataKey="value">
                    {chartData.revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={commandCenter ? { backgroundColor: '#1F2937', border: '1px solid #374151', color: '#fff' } : undefined} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {(!commandCenter || ccSection === 2) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <h3 className={`text-lg font-semibold ${ccText} mb-6`}>Department Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(departmentLoad).map(([dept, load]) => (
                <div key={dept} className={`p-4 rounded-lg ${commandCenter ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${commandCenter ? 'text-gray-300' : 'text-gray-700'}`}>{dept}</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${load >= 80 ? 'bg-red-500 animate-pulse' : load >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                      <span className={`text-sm font-bold ${ccText}`}>{load}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${load >= 80 ? 'bg-red-500' : load >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(load, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 md:p-6 ${ccCard}`}>
            <h3 className={`text-lg font-semibold ${ccText} mb-6`}>AI Agent Activity Feed</h3>
            <div className="space-y-4">
              {mockAgentActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    action.agent_name === 'Flow Agent' ? 'bg-accent-500/20' :
                    action.agent_name === 'Resource Agent' ? 'bg-primary-500/20' :
                    action.agent_name === 'Revenue Agent' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                  }`}>
                    <Activity className="w-4 h-4 text-accent-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${ccText}`}>{action.agent_name}</p>
                      <span className="text-xs text-gray-500">{formatTime(action.created_at)}</span>
                    </div>
                    <p className={`text-sm ${ccSub}`}>{action.description}</p>
                    <StatusBadge level={action.status === 'completed' ? 'normal' : 'warning'} label={action.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Predictive Occupancy */}
      {!commandCenter && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Predictive Occupancy - Next 7 Days</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { day: 'Today', predicted: 56, actual: 56 },
              { day: 'Tue', predicted: 58, actual: undefined },
              { day: 'Wed', predicted: 62, actual: undefined },
              { day: 'Thu', predicted: 60, actual: undefined },
              { day: 'Fri', predicted: 55, actual: undefined },
              { day: 'Sat', predicted: 48, actual: undefined },
              { day: 'Sun', predicted: 45, actual: undefined },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 75]} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted" stroke="#3282B8" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="#0F4C75" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-600 inline-block" />Actual</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 inline-block border-b-2 border-dashed" />Predicted</span>
            <span>Peak expected: Wednesday (62/75 beds, 83%)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
