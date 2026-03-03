import React from 'react';
import { FlaskConical, Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pendingTests = [
  { id: '1', patient: 'Ramesh Kumar', test: 'CBC', ordered: '09:30', status: 'processing', priority: 'routine' },
  { id: '2', patient: 'Sushila Devi', test: 'Blood Sugar (F)', ordered: '09:45', status: 'sample_collected', priority: 'routine' },
  { id: '3', patient: 'Rajesh Gupta', test: 'Troponin I', ordered: '10:00', status: 'processing', priority: 'critical' },
  { id: '4', patient: 'Anjali Singh', test: 'Urine R/M', ordered: '10:15', status: 'pending', priority: 'routine' },
  { id: '5', patient: 'Mohan Lal', test: 'LFT', ordered: '10:30', status: 'completed', priority: 'urgent' },
  { id: '6', patient: 'Prakash Yadav', test: 'PT/INR', ordered: '08:00', status: 'completed', priority: 'critical' },
];

const tatData = [
  { test: 'CBC', target: 60, actual: 45 },
  { test: 'LFT', target: 120, actual: 110 },
  { test: 'RFT', target: 120, actual: 95 },
  { test: 'Blood Sugar', target: 30, actual: 25 },
  { test: 'Troponin', target: 45, actual: 40 },
  { test: 'Urine R/M', target: 60, actual: 55 },
];

const criticalAlerts = [
  { patient: 'Rajesh Gupta', test: 'Troponin I', value: '2.8 ng/mL', normal: '< 0.04', time: '10:25' },
  { patient: 'Geeta Devi', test: 'Potassium', value: '6.2 mEq/L', normal: '3.5-5.0', time: '09:50' },
];

const LabDashboard: React.FC = () => {
  const statusColor: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-700',
    sample_collected: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lab Dashboard</h1>
        <p className="text-gray-600">Pending tests, TAT tracking, and critical alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: '4', icon: Clock, color: 'text-amber-600 bg-amber-100' },
          { label: 'Processing', value: '2', icon: FlaskConical, color: 'text-blue-600 bg-blue-100' },
          { label: 'Completed Today', value: '23', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'Critical Alerts', value: '2', icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {criticalAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-red-800 flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5" /><span>Critical Value Alerts</span>
          </h2>
          <div className="space-y-2">
            {criticalAlerts.map((a, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-red-100">
                <div>
                  <span className="font-medium">{a.patient}</span>
                  <span className="text-gray-500 mx-2">-</span>
                  <span>{a.test}</span>
                </div>
                <div className="text-right">
                  <span className="text-red-700 font-bold">{a.value}</span>
                  <span className="text-gray-500 text-sm ml-2">(Normal: {a.normal})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Pending Tests</h2>
          <div className="space-y-3">
            {pendingTests.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <span className="font-medium text-sm">{t.patient}</span>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-sm">{t.test}</span>
                  {t.priority === 'critical' && <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">CRITICAL</span>}
                  {t.priority === 'urgent' && <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">URGENT</span>}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[t.status]}`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" /><span>TAT Tracking (minutes)</span>
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={tatData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" fill="#d1d5db" name="Target" />
              <Bar dataKey="actual" fill="#3282B8" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
