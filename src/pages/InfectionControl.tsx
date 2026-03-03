import React from 'react';
import { ShieldAlert, Bug, Droplets, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const haiTrend = [
  { month: 'Oct', rate: 3.2 }, { month: 'Nov', rate: 2.8 }, { month: 'Dec', rate: 2.5 },
  { month: 'Jan', rate: 2.9 }, { month: 'Feb', rate: 2.1 }, { month: 'Mar', rate: 1.8 },
];

const resistanceData = [
  { name: 'MRSA', value: 18, fill: '#ef4444' },
  { name: 'ESBL', value: 25, fill: '#f97316' },
  { name: 'VRE', value: 8, fill: '#eab308' },
  { name: 'CRE', value: 5, fill: '#8b5cf6' },
  { name: 'Sensitive', value: 44, fill: '#22c55e' },
];

const hygieneCompliance = [
  { dept: 'ICU', compliance: 92 }, { dept: 'OT', compliance: 98 },
  { dept: 'General Ward', compliance: 78 }, { dept: 'Emergency', compliance: 85 },
  { dept: 'OPD', compliance: 72 }, { dept: 'Lab', compliance: 95 },
];

const InfectionControl: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Infection Control</h1>
        <p className="text-gray-600">HAI surveillance, antibiotic resistance, and hygiene compliance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Current HAI Rate', value: '1.8%', sub: 'Target < 2%', icon: Bug, color: 'text-green-600 bg-green-100' },
          { label: 'Active HAIs', value: '3', sub: '2 SSI, 1 CAUTI', icon: ShieldAlert, color: 'text-red-600 bg-red-100' },
          { label: 'Hand Hygiene', value: '85%', sub: 'Overall compliance', icon: Droplets, color: 'text-blue-600 bg-blue-100' },
          { label: 'Antibiotic Stewardship', value: '76%', sub: 'Appropriate use', icon: TrendingDown, color: 'text-purple-600 bg-purple-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">HAI Rate Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={haiTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#3282B8" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Antibiotic Resistance Pattern</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={resistanceData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {resistanceData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Hand Hygiene Compliance by Department</h2>
        <div className="space-y-3">
          {hygieneCompliance.map(d => (
            <div key={d.dept} className="flex items-center space-x-4">
              <span className="w-28 text-sm font-medium">{d.dept}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className={`h-3 rounded-full ${d.compliance >= 90 ? 'bg-green-500' : d.compliance >= 80 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${d.compliance}%` }} />
              </div>
              <span className="text-sm font-medium w-12 text-right">{d.compliance}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfectionControl;
