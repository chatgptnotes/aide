import React from 'react';
import { Clock, User, Stethoscope, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPatients, mockDepartments } from '../data/mockData';

const PatientFlow: React.FC = () => {
  const currentQueue = mockPatients.filter(p => p.admission_type === 'opd' && p.token_number);
  
  const waitTimeData = [
    { department: 'Orthopedics', waitTime: 18 },
    { department: 'Surgery', waitTime: 12 },
    { department: 'Medicine', waitTime: 8 },
    { department: 'Pediatrics', waitTime: 15 },
    { department: 'Gynecology', waitTime: 10 },
    { department: 'Cardiology', waitTime: 25 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'text-yellow-600 bg-yellow-100';
      case 'in_consultation':
        return 'text-blue-600 bg-blue-100';
      case 'done':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatWaitTime = (createdAt: string, status: string) => {
    if (status === 'done') return 'Completed';
    if (status === 'in_consultation') return 'In Progress';
    
    const created = new Date(createdAt);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    return `${diffMinutes} min`;
  };

  const getDepartmentName = (departmentId: string) => {
    const dept = mockDepartments.find(d => d.id === departmentId);
    return dept ? dept.name : 'Unknown';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Flow Management</h1>
        <p className="text-gray-600">Real-time patient queue and flow optimization</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Queue</p>
              <p className="text-2xl font-bold text-gray-900">{currentQueue.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Wait Time</p>
              <p className="text-2xl font-bold text-gray-900">12 min</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Consultation</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentQueue.filter(p => p.status === 'in_consultation').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPatients.filter(p => p.status === 'done').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Flow Optimization Suggestion</h3>
            <p className="opacity-90 mb-3">
              Move Dr. Sharma to OPD-2 to reduce Orthopedics wait time by 18 minutes. 
              Current queue: 4 patients waiting.
            </p>
            <div className="flex space-x-3">
              <button className="bg-white text-accent-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Apply Suggestion
              </button>
              <button className="bg-accent-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-800 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Queue - Token Board</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide pb-2 border-b border-gray-200">
              <span>Token</span>
              <span className="col-span-2">Patient</span>
              <span>Department</span>
              <span>Status</span>
              <span>Wait Time</span>
            </div>
            {currentQueue.map((patient) => (
              <div key={patient.id} className="grid grid-cols-6 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                <div className="font-bold text-primary-600">
                  #{patient.token_number}
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.age}Y, {patient.gender}</p>
                </div>
                <div className="text-sm text-gray-700">
                  {getDepartmentName(patient.department_id || '')}
                </div>
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status === 'waiting' ? 'Waiting' : 
                     patient.status === 'in_consultation' ? 'In Consultation' : 'Done'}
                  </span>
                </div>
                <div className="text-sm font-medium">
                  {formatWaitTime(patient.created_at, patient.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wait Time Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Wait Time by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waitTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="department" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar 
                  dataKey="waitTime" 
                  fill="#0F4C75"
                  radius={[4, 4, 0, 0]}
                  name="Wait Time (min)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Routing Flow */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Journey Flow</h3>
        <div className="relative">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-900">Registration</p>
              <p className="text-sm text-gray-500">Avg: 3 min</p>
            </div>
            
            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-900">Waiting Area</p>
              <p className="text-sm text-gray-500">Avg: 12 min</p>
            </div>
            
            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-900">Consultation</p>
              <p className="text-sm text-gray-500">Avg: 15 min</p>
            </div>
            
            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-900">Discharge</p>
              <p className="text-sm text-gray-500">Avg: 5 min</p>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Flow Optimization Active</h4>
                <p className="text-sm text-blue-700 mt-1">
                  AI agents are continuously monitoring and optimizing patient flow. 
                  Total journey time reduced by 22% this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFlow;