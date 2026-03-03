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


      {/* Patient Satisfaction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Satisfaction (NPS)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">+42</p>
            <p className="text-sm text-gray-600">Overall NPS Score</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">4.2/5</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">87%</p>
            <p className="text-sm text-gray-600">Complaint Resolution</p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Department Feedback</h4>
          {[
            { dept: 'Orthopedics', nps: 58, rating: 4.5 },
            { dept: 'Emergency', nps: 32, rating: 3.8 },
            { dept: 'General Surgery', nps: 45, rating: 4.2 },
            { dept: 'Gynecology', nps: 50, rating: 4.4 },
            { dept: 'Pediatrics', nps: 55, rating: 4.6 },
          ].map(d => (
            <div key={d.dept} className="flex items-center justify-between p-2 rounded bg-gray-50">
              <span className="text-sm">{d.dept}</span>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`font-medium ${d.nps >= 50 ? 'text-green-600' : d.nps >= 30 ? 'text-blue-600' : 'text-amber-600'}`}>NPS: +{d.nps}</span>
                <span className="text-gray-600">{d.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* M&M Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mortality & Morbidity Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: 'Mortality Rate', value: '1.8%', target: '< 2%', ok: true },
            { label: 'Morbidity Rate', value: '3.2%', target: '< 5%', ok: true },
            { label: 'Unplanned ICU', value: '2.1%', target: '< 3%', ok: true },
            { label: 'Readmission (30d)', value: '4.5%', target: '< 5%', ok: true },
          ].map((m, i) => (
            <div key={i} className={`p-4 rounded-lg border ${m.ok ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <p className="text-sm text-gray-600">{m.label}</p>
              <p className="text-xl font-bold">{m.value}</p>
              <p className="text-xs text-gray-500">Target: {m.target}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Recent M&M Reviews</h4>
          <div className="space-y-2">
            {[
              { case: 'Post-op DVT in TKR patient', date: '2026-02-28', outcome: 'Protocol updated', rca: 'Delayed mobilization' },
              { case: 'Medication error - wrong dose', date: '2026-02-20', outcome: 'Staff retrained', rca: 'Look-alike drug packaging' },
            ].map((c, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{c.case}</span>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span>RCA: {c.rca}</span>
                  <span className="text-green-600">Outcome: {c.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Analytics;