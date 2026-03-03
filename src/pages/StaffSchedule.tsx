import React from 'react';

import { mockStaff } from '../data/mockData';

const StaffSchedule: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Schedule</h1>
        <p className="text-gray-600">Manage hospital staff schedules and assignments</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Shift</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockStaff.map((staff) => (
                <tr key={staff.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{staff.name}</td>
                  <td className="py-3 px-4">{staff.role}</td>
                  <td className="py-3 px-4">Department {staff.department_id}</td>
                  <td className="py-3 px-4 capitalize">{staff.shift}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      staff.status === 'on_duty' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {staff.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffSchedule;