import React from 'react';
import { Siren, Clock, AlertTriangle, User, Activity } from 'lucide-react';

const patients = [
  { id: '1', name: 'Suresh Patil', age: 55, chief: 'Chest Pain', esi: 1, arrival: '10:05', status: 'being_seen', zone: 'Resus', doctor: 'Dr. Amit Kumar', waitTime: 0 },
  { id: '2', name: 'Meena Rani', age: 32, chief: 'Abdominal Pain', esi: 3, arrival: '10:15', status: 'waiting', zone: 'Zone B', doctor: '-', waitTime: 25 },
  { id: '3', name: 'Anil Verma', age: 68, chief: 'Fall - Hip Injury', esi: 2, arrival: '09:45', status: 'being_seen', zone: 'Zone A', doctor: 'Dr. BK Murali', waitTime: 0 },
  { id: '4', name: 'Pooja Deshmukh', age: 8, chief: 'High Fever', esi: 3, arrival: '10:30', status: 'waiting', zone: 'Peds', doctor: '-', waitTime: 10 },
  { id: '5', name: 'Raju Shinde', age: 45, chief: 'Laceration', esi: 4, arrival: '10:00', status: 'waiting', zone: 'Zone C', doctor: '-', waitTime: 40 },
  { id: '6', name: 'Lata Bai', age: 72, chief: 'Breathing Difficulty', esi: 2, arrival: '10:20', status: 'being_seen', zone: 'Zone A', doctor: 'Dr. Priya Patel', waitTime: 0 },
];

const esiColors: Record<number, string> = {
  1: 'bg-red-600 text-white',
  2: 'bg-orange-500 text-white',
  3: 'bg-yellow-400 text-gray-900',
  4: 'bg-green-500 text-white',
  5: 'bg-blue-500 text-white',
};

const esiLabels: Record<number, string> = { 1: 'Resuscitation', 2: 'Emergent', 3: 'Urgent', 4: 'Less Urgent', 5: 'Non-Urgent' };

const EDBoard: React.FC = () => {
  const avgWait = Math.round(patients.filter(p => p.waitTime > 0).reduce((s, p) => s + p.waitTime, 0) / patients.filter(p => p.waitTime > 0).length);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Department Board</h1>
          <p className="text-gray-600">Real-time triage board with ESI scoring</p>
        </div>
        <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          <Siren className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-700">{patients.length} Active Patients</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Wait Time', value: `${avgWait} min`, icon: Clock, color: 'text-blue-600 bg-blue-100' },
          { label: 'Being Seen', value: patients.filter(p => p.status === 'being_seen').length.toString(), icon: Activity, color: 'text-green-600 bg-green-100' },
          { label: 'Waiting', value: patients.filter(p => p.status === 'waiting').length.toString(), icon: User, color: 'text-amber-600 bg-amber-100' },
          { label: 'ESI 1-2 (Critical)', value: patients.filter(p => p.esi <= 2).length.toString(), icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-600">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold">Triage Board</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['ESI', 'Patient', 'Age', 'Chief Complaint', 'Arrival', 'Wait', 'Zone', 'Doctor', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.sort((a, b) => a.esi - b.esi).map(p => (
                <tr key={p.id} className={p.esi <= 2 ? 'bg-red-50' : ''}>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${esiColors[p.esi]}`}>ESI {p.esi}</span></td>
                  <td className="px-4 py-3 font-medium text-sm">{p.name}</td>
                  <td className="px-4 py-3 text-sm">{p.age}</td>
                  <td className="px-4 py-3 text-sm">{p.chief}</td>
                  <td className="px-4 py-3 text-sm">{p.arrival}</td>
                  <td className="px-4 py-3 text-sm">{p.waitTime > 0 ? `${p.waitTime} min` : '-'}</td>
                  <td className="px-4 py-3 text-sm">{p.zone}</td>
                  <td className="px-4 py-3 text-sm">{p.doctor}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${p.status === 'being_seen' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{p.status === 'being_seen' ? 'Being Seen' : 'Waiting'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">ESI Acuity Scale</h2>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map(level => (
            <div key={level} className={`rounded-lg p-3 text-center ${esiColors[level]}`}>
              <p className="font-bold">ESI {level}</p>
              <p className="text-xs mt-1">{esiLabels[level]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EDBoard;
