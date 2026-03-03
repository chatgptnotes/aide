import React from 'react';
import { Truck, Clock, MapPin, Phone, CheckCircle } from 'lucide-react';

const ambulances = [
  { id: 'AMB-01', driver: 'Sanjay Patil', phone: '9876543220', status: 'en_route', location: 'Dharampeth, 3.2 km away', patient: 'Pickup - Chest Pain', eta: '8 min' },
  { id: 'AMB-02', driver: 'Vinod Meshram', phone: '9876543221', status: 'available', location: 'Hospital Bay', patient: '-', eta: '-' },
  { id: 'AMB-03', driver: 'Raju Ingle', phone: '9876543222', status: 'returning', location: 'Civil Lines, 5.1 km', patient: 'Returning after drop', eta: '15 min' },
];

const tripLog = [
  { id: '1', ambulance: 'AMB-01', patient: 'Suresh Patil', from: 'Sitabuldi', to: 'Hope Hospital', time: '09:30', responseTime: '12 min', type: 'Emergency' },
  { id: '2', ambulance: 'AMB-02', patient: 'Meena Rani', from: 'Manewada', to: 'Hope Hospital', time: '08:45', responseTime: '18 min', type: 'Emergency' },
  { id: '3', ambulance: 'AMB-03', patient: 'Geeta Devi', from: 'Hope Hospital', to: 'Home (Wardha Rd)', time: '10:00', responseTime: '-', type: 'Transfer' },
  { id: '4', ambulance: 'AMB-01', patient: 'Rajesh Gupta', from: 'Sadar', to: 'Hope Hospital', time: '07:15', responseTime: '10 min', type: 'Emergency' },
];

const statusColor: Record<string, string> = {
  en_route: 'bg-red-100 text-red-700 border-red-200',
  available: 'bg-green-100 text-green-700 border-green-200',
  returning: 'bg-blue-100 text-blue-700 border-blue-200',
};

const AmbulanceTracker: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ambulance Tracker</h1>
        <p className="text-gray-600">Fleet tracking, response times, and trip log</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Fleet', value: '3', icon: Truck, color: 'text-blue-600 bg-blue-100' },
          { label: 'Available', value: '1', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'Avg Response Time', value: '13 min', icon: Clock, color: 'text-amber-600 bg-amber-100' },
          { label: 'Trips Today', value: '4', icon: MapPin, color: 'text-purple-600 bg-purple-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-600">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {ambulances.map(a => (
          <div key={a.id} className={`bg-white rounded-xl border-2 p-5 ${statusColor[a.status]}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold">{a.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[a.status]}`}>
                {a.status === 'en_route' ? 'En Route' : a.status === 'available' ? 'Available' : 'Returning'}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2"><Truck className="w-4 h-4 text-gray-400" /><span>{a.driver}</span></div>
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-gray-400" /><span>{a.location}</span></div>
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-400" /><span>{a.phone}</span></div>
              {a.eta !== '-' && <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-gray-400" /><span>ETA: {a.eta}</span></div>}
              <p className="text-gray-600 mt-2">{a.patient}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mock GPS Map */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Live Map</h2>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs text-blue-700 font-medium ml-2">Hope Hospital</span>
          </div>
          <div className="absolute top-1/4 left-1/3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-700 ml-1">AMB-01</span>
          </div>
          <div className="absolute bottom-1/3 right-1/4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs text-blue-600 ml-1">AMB-03</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Trip Log</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Ambulance', 'Patient', 'From', 'To', 'Time', 'Response', 'Type'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tripLog.map(t => (
              <tr key={t.id}>
                <td className="px-4 py-3 text-sm font-medium">{t.ambulance}</td>
                <td className="px-4 py-3 text-sm">{t.patient}</td>
                <td className="px-4 py-3 text-sm">{t.from}</td>
                <td className="px-4 py-3 text-sm">{t.to}</td>
                <td className="px-4 py-3 text-sm">{t.time}</td>
                <td className="px-4 py-3 text-sm">{t.responseTime}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${t.type === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{t.type}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmbulanceTracker;
