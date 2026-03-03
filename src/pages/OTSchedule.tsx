import React, { useState } from 'react';
import { Scissors, Clock, User, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

const surgeons = [
  { id: '1', name: 'Dr. BK Murali', specialty: 'Orthopedics', available: true },
  { id: '2', name: 'Dr. Rajesh Sharma', specialty: 'General Surgery', available: true },
  { id: '3', name: 'Dr. Vikram Singh', specialty: 'Cardiology', available: false },
  { id: '4', name: 'Dr. Sunita Rao', specialty: 'Gynecology', available: true },
];

const otRooms = [
  { id: 'OT-1', name: 'OT 1 - Major', status: 'in_use' as const },
  { id: 'OT-2', name: 'OT 2 - Minor', status: 'available' as const },
  { id: 'OT-3', name: 'OT 3 - Emergency', status: 'available' as const },
];

const schedule = [
  { id: '1', patient: 'Ramesh Kumar', procedure: 'Total Knee Replacement', surgeon: 'Dr. BK Murali', ot: 'OT-1', time: '09:00', duration: '3h', status: 'in_progress', equipment: ['Tourniquet', 'Knee Implant Set', 'Power Drill'] },
  { id: '2', patient: 'Kavita Sharma', procedure: 'Appendectomy', surgeon: 'Dr. Rajesh Sharma', ot: 'OT-2', time: '11:00', duration: '1.5h', status: 'scheduled', equipment: ['Laparoscope', 'Trocar Set', 'Harmonic Scalpel'] },
  { id: '3', patient: 'Mohan Lal', procedure: 'Hernia Repair', surgeon: 'Dr. Rajesh Sharma', ot: 'OT-2', time: '14:00', duration: '2h', status: 'scheduled', equipment: ['Mesh Kit', 'Retractor Set'] },
  { id: '4', patient: 'Geeta Devi', procedure: 'C-Section', surgeon: 'Dr. Sunita Rao', ot: 'OT-3', time: '15:00', duration: '1h', status: 'scheduled', equipment: ['CS Kit', 'Neonatal Warmer'] },
  { id: '5', patient: 'Prakash Yadav', procedure: 'Hip Replacement', surgeon: 'Dr. BK Murali', ot: 'OT-1', time: '14:00', duration: '4h', status: 'scheduled', equipment: ['Hip Implant', 'Power Drill', 'C-Arm'] },
];

const equipmentChecklist = [
  { name: 'Anesthesia Machine', status: 'ready' }, { name: 'Electrocautery', status: 'ready' },
  { name: 'Suction Unit', status: 'ready' }, { name: 'C-Arm Fluoroscopy', status: 'maintenance' },
  { name: 'Laparoscopy Tower', status: 'ready' }, { name: 'Patient Monitor', status: 'ready' },
  { name: 'Defibrillator', status: 'ready' }, { name: 'Ventilator', status: 'ready' },
];

const OTSchedule: React.FC = () => {
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">OT Schedule</h1>
          <p className="text-gray-600">Operation theatre calendar and management</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input type="date" value={selectedDate} readOnly className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {otRooms.map(room => (
          <div key={room.id} className={`bg-white rounded-xl border p-4 ${room.status === 'in_use' ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scissors className="w-5 h-5" />
                <span className="font-semibold">{room.name}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${room.status === 'in_use' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {room.status === 'in_use' ? 'In Use' : 'Available'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Surgeon Availability</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {surgeons.map(s => (
            <div key={s.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className={`w-3 h-3 rounded-full ${s.available ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">{s.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Today's Surgeries</h2>
        <div className="space-y-4">
          {schedule.map(s => (
            <div key={s.id} className={`border rounded-lg p-4 ${s.status === 'in_progress' ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{s.time} ({s.duration})</span>
                  </div>
                  <span className="font-semibold">{s.procedure}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {s.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{s.ot}</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{s.patient}</span></span>
                <span className="flex items-center space-x-1"><Scissors className="w-4 h-4" /><span>{s.surgeon}</span></span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.equipment.map(eq => (
                  <span key={eq} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{eq}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Equipment Checklist</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {equipmentChecklist.map(eq => (
            <div key={eq.name} className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
              {eq.status === 'ready' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
              <span className="text-sm">{eq.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTSchedule;
