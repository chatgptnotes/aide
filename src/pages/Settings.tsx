import React from 'react';
import { Hospital, Users, Bell, Link } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure hospital settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hospital Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Hospital className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900">Hospital Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
              <input
                type="text"
                value="Hope Hospital"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value="Medical Square, Nagpur, Maharashtra 440010"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Beds</label>
                <input
                  type="number"
                  value="75"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
                <input
                  type="number"
                  value="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Administrator</p>
                <p className="text-sm text-gray-500">Full system access</p>
              </div>
              <span className="text-sm text-gray-600">3 users</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Doctor</p>
                <p className="text-sm text-gray-500">Patient management access</p>
              </div>
              <span className="text-sm text-gray-600">12 users</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Nurse</p>
                <p className="text-sm text-gray-500">Limited access</p>
              </div>
              <span className="text-sm text-gray-600">25 users</span>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Critical Alerts</p>
                <p className="text-sm text-gray-500">Emergency situations and system failures</p>
              </div>
              <input type="checkbox" checked className="rounded" readOnly />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Low Stock Alerts</p>
                <p className="text-sm text-gray-500">Inventory below reorder levels</p>
              </div>
              <input type="checkbox" checked className="rounded" readOnly />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Daily Reports</p>
                <p className="text-sm text-gray-500">Summary of daily operations</p>
              </div>
              <input type="checkbox" className="rounded" readOnly />
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Link className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900">Integration Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">HMS Integration</p>
                <p className="text-sm text-gray-500">Hospital Management System</p>
              </div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Lab System</p>
                <p className="text-sm text-gray-500">Laboratory information system</p>
              </div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Pharmacy System</p>
                <p className="text-sm text-gray-500">Pharmacy management integration</p>
              </div>
              <span className="text-sm text-yellow-600">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;