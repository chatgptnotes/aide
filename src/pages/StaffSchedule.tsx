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


      {/* Staff Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Performance</h3>
        <div className="space-y-3">
          {[
            { name: 'Dr. BK Murali', role: 'Doctor', attendance: 98, productivity: 95, satisfaction: 4.8 },
            { name: 'Dr. Rajesh Sharma', role: 'Doctor', attendance: 92, productivity: 88, satisfaction: 4.5 },
            { name: 'Sister Meera Joshi', role: 'Nurse', attendance: 96, productivity: 92, satisfaction: 4.7 },
            { name: 'Ravi Technician', role: 'Technician', attendance: 94, productivity: 90, satisfaction: 4.3 },
            { name: 'Dr. Priya Patel', role: 'Doctor', attendance: 90, productivity: 85, satisfaction: 4.6 },
            { name: 'Sister Sunita Rao', role: 'Nurse', attendance: 97, productivity: 93, satisfaction: 4.4 },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-700">{s.name.charAt(0)}</div>
                <div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Attendance</p>
                  <p className={`font-bold ${s.attendance >= 95 ? 'text-green-600' : 'text-amber-600'}`}>{s.attendance}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Productivity</p>
                  <p className={`font-bold ${s.productivity >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{s.productivity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Satisfaction</p>
                  <p className="font-bold text-primary-600">{s.satisfaction}/5</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StaffSchedule;