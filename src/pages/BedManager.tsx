import React from 'react';
import { Bed, User, Wrench, Calendar } from 'lucide-react';
import { mockBeds } from '../data/mockData';

const BedManager: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'occupied':
        return <User className="w-4 h-4" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4" />;
      case 'reserved':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Bed className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-500 text-white';
      case 'available':
        return 'bg-green-500 text-white';
      case 'maintenance':
        return 'bg-yellow-500 text-white';
      case 'reserved':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const wards = ['General Male', 'General Female', 'Private', 'Semi-Private', 'ICU', 'NICU'];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bed Management</h1>
        <p className="text-gray-600">Monitor and manage hospital bed occupancy</p>
      </div>

      {/* Ward Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {wards.map((ward) => {
          const wardBeds = mockBeds.filter(bed => bed.ward === ward);
          return (
            <div key={ward} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{ward}</h3>
              <div className="grid grid-cols-4 gap-2">
                {wardBeds.map((bed) => (
                  <div
                    key={bed.id}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${getStatusColor(bed.status)}`}
                  >
                    <div className="text-center">
                      {getStatusIcon(bed.status)}
                      <div className="mt-1">{bed.bed_number.split('-')[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Occupancy: {wardBeds.filter(b => b.status === 'occupied').length}/{wardBeds.length}
              </div>
            </div>
          );
        })}
      </div>

      {/* Discharge Planning */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discharge Planning</h3>
        <div className="space-y-3">
          {[
            { patient: 'Rajesh Gupta', bed: 'ICU-01', ward: 'ICU', expectedDate: '2026-03-04', los: 3, readiness: 75, checklist: { vitals: true, meds: true, followup: false, billing: false } },
            { patient: 'Geeta Devi', bed: 'GF-01', ward: 'General Female', expectedDate: '2026-03-03', los: 2, readiness: 100, checklist: { vitals: true, meds: true, followup: true, billing: true } },
          ].map((d, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{d.patient}</span>
                  <span className="text-gray-500 text-sm ml-2">Bed: {d.bed} ({d.ward})</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Expected: {d.expectedDate}</span>
                  <span className="ml-2 text-xs text-gray-400">LOS: {d.los}d</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Readiness:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                  <div className={`h-2 rounded-full ${d.readiness === 100 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${d.readiness}%` }} />
                </div>
                <span className="text-sm font-medium">{d.readiness}%</span>
              </div>
              <div className="flex space-x-4 text-xs">
                {Object.entries(d.checklist).map(([key, done]) => (
                  <span key={key} className={`flex items-center space-x-1 ${done ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>{done ? '\u2713' : '\u2717'}</span>
                    <span className="capitalize">{key}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Avg Bed Turnover Time: <span className="font-bold">4.2 hours</span> (Target: 3 hours)</p>
        </div>
      </div>

    </div>
  );
};

export default BedManager;