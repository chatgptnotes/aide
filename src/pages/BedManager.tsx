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
    </div>
  );
};

export default BedManager;