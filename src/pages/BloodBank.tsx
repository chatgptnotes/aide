import React from 'react';
import { Droplets, AlertTriangle, CheckCircle, Calendar, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stockLevels = [
  { group: 'A+', units: 12, min: 5, status: 'adequate' },
  { group: 'A-', units: 3, min: 3, status: 'low' },
  { group: 'B+', units: 18, min: 5, status: 'adequate' },
  { group: 'B-', units: 2, min: 3, status: 'critical' },
  { group: 'O+', units: 8, min: 8, status: 'low' },
  { group: 'O-', units: 1, min: 3, status: 'critical' },
  { group: 'AB+', units: 6, min: 3, status: 'adequate' },
  { group: 'AB-', units: 2, min: 2, status: 'low' },
];

const crossMatches = [
  { patient: 'Ramesh Kumar', group: 'B+', units: 2, surgery: 'TKR', date: '2026-03-03', status: 'matched' },
  { patient: 'Prakash Yadav', group: 'A+', units: 3, surgery: 'Hip Replacement', date: '2026-03-03', status: 'pending' },
  { patient: 'Geeta Devi', group: 'O+', units: 1, surgery: 'C-Section', date: '2026-03-03', status: 'matched' },
];

const donationDrives = [
  { name: 'Rotary Club Drive', date: '2026-03-10', expected: 50, location: 'Hospital Auditorium' },
  { name: 'Corporate Drive - TCS', date: '2026-03-15', expected: 30, location: 'TCS Nagpur Campus' },
  { name: 'World Blood Donor Day', date: '2026-06-14', expected: 100, location: 'Town Hall' },
];

const statusColor: Record<string, string> = {
  adequate: 'bg-green-100 text-green-700 border-green-300',
  low: 'bg-amber-100 text-amber-700 border-amber-300',
  critical: 'bg-red-100 text-red-700 border-red-300',
};

const BloodBank: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blood Bank</h1>
        <p className="text-gray-600">Stock levels, cross-matching, and donation drives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Units', value: stockLevels.reduce((s, l) => s + l.units, 0).toString(), icon: Droplets, color: 'text-red-600 bg-red-100' },
          { label: 'Critical Groups', value: stockLevels.filter(s => s.status === 'critical').length.toString(), icon: AlertTriangle, color: 'text-amber-600 bg-amber-100' },
          { label: 'Pending Cross-Match', value: crossMatches.filter(c => c.status === 'pending').length.toString(), icon: CheckCircle, color: 'text-blue-600 bg-blue-100' },
          { label: 'Next Drive', value: 'Mar 10', icon: Calendar, color: 'text-purple-600 bg-purple-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-600">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Blood Group Stock Levels</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {stockLevels.map(s => (
            <div key={s.group} className={`rounded-xl border-2 p-4 text-center ${statusColor[s.status]}`}>
              <p className="text-2xl font-bold">{s.group}</p>
              <p className="text-3xl font-black mt-1">{s.units}</p>
              <p className="text-xs mt-1">Min: {s.min} units</p>
              <p className="text-xs font-medium mt-1 uppercase">{s.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Cross-Match Requests</h2>
          <div className="space-y-3">
            {crossMatches.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-sm">{c.patient}</p>
                  <p className="text-xs text-gray-500">{c.surgery} - {c.units} units {c.group}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${c.status === 'matched' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2"><Users className="w-5 h-5" /><span>Upcoming Donation Drives</span></h2>
          <div className="space-y-3">
            {donationDrives.map((d, i) => (
              <div key={i} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{d.name}</span>
                  <span className="text-xs text-gray-500">{d.date}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{d.location} - Expected: {d.expected} donors</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Stock Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stockLevels}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="units" fill="#ef4444" name="Units Available" />
            <Bar dataKey="min" fill="#d1d5db" name="Minimum Required" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BloodBank;
