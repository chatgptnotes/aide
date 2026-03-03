import React, { useState } from 'react';
import { Clock, User, Stethoscope, MapPin, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockPatients, mockDepartments } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

type Stage = 'waiting' | 'triage' | 'treatment' | 'discharge';

interface KanbanPatient {
  id: string;
  name: string;
  age: number;
  department: string;
  stage: Stage;
  time: string;
}

const initialKanban: KanbanPatient[] = [
  { id: '1', name: 'Ramesh Kumar', age: 45, department: 'Orthopedics', stage: 'waiting', time: '12 min' },
  { id: '2', name: 'Anjali Singh', age: 34, department: 'Pediatrics', stage: 'waiting', time: '8 min' },
  { id: '3', name: 'Kavita Sharma', age: 29, department: 'Gynecology', stage: 'waiting', time: '5 min' },
  { id: '4', name: 'Sushila Devi', age: 38, department: 'Surgery', stage: 'triage', time: '3 min' },
  { id: '5', name: 'Mohan Lal', age: 58, department: 'Medicine', stage: 'treatment', time: '15 min' },
  { id: '6', name: 'Prakash Yadav', age: 52, department: 'Orthopedics', stage: 'treatment', time: '22 min' },
  { id: '7', name: 'Geeta Devi', age: 41, department: 'Surgery', stage: 'discharge', time: '2 min' },
];

const stageConfig: Record<Stage, { label: string; color: string; bg: string }> = {
  waiting: { label: 'Waiting', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
  triage: { label: 'Triage', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  treatment: { label: 'Treatment', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  discharge: { label: 'Discharge', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
};

const stages: Stage[] = ['waiting', 'triage', 'treatment', 'discharge'];

const PatientFlow: React.FC = () => {
  const [kanban, setKanban] = useState(initialKanban);
  const currentQueue = mockPatients.filter(p => p.admission_type === 'opd' && p.token_number);

  const movePatient = (id: string) => {
    setKanban(prev => prev.map(p => {
      if (p.id !== id) return p;
      const idx = stages.indexOf(p.stage);
      if (idx < stages.length - 1) return { ...p, stage: stages[idx + 1] };
      return p;
    }));
  };

  const waitTimeData = [
    { department: 'Orthopedics', waitTime: 18 },
    { department: 'Surgery', waitTime: 12 },
    { department: 'Medicine', waitTime: 8 },
    { department: 'Pediatrics', waitTime: 15 },
    { department: 'Gynecology', waitTime: 10 },
    { department: 'Cardiology', waitTime: 25 },
  ];

  const getDepartmentName = (departmentId: string) => {
    const dept = mockDepartments.find(d => d.id === departmentId);
    return dept ? dept.name : 'Unknown';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Patient Flow Management</h1>
        <p className="text-gray-600">Real-time patient queue and flow optimization</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Current Queue</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{currentQueue.length}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Avg Wait Time</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">12 min</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">In Consultation</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{currentQueue.filter(p => p.status === 'in_consultation').length}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-500/10 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{mockPatients.filter(p => p.status === 'done').length}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-4 md:p-6 text-white mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 mt-1 shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Flow Optimization Suggestion</h3>
            <p className="opacity-90 mb-3">Move Dr. Sharma to OPD-2 to reduce Orthopedics wait time by 18 minutes. Current queue: 4 patients waiting.</p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-accent-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">Apply Suggestion</button>
              <button className="bg-accent-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-800 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Flow Kanban */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Flow Kanban</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map(stage => {
            const config = stageConfig[stage];
            const patients = kanban.filter(p => p.stage === stage);
            return (
              <div key={stage} className={`rounded-xl border p-3 ${config.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-sm font-semibold ${config.color}`}>{config.label}</h4>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${config.color} bg-white`}>
                    {patients.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {patients.map(p => (
                    <div key={p.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 group">
                      <p className="text-sm font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.age}Y - {p.department}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{p.time}</span>
                        {stage !== 'discharge' && (
                          <button
                            onClick={() => movePatient(p.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-primary-500 hover:text-primary-700 flex items-center gap-1"
                          >
                            Move <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {patients.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No patients</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Queue - Token Board</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide pb-2 border-b border-gray-200">
              <span>Token</span><span className="col-span-2">Patient</span><span>Dept</span><span>Status</span><span>Wait</span>
            </div>
            {currentQueue.map(patient => (
              <div key={patient.id} className="grid grid-cols-6 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                <div className="font-bold text-primary-600">#{patient.token_number}</div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.age}Y, {patient.gender}</p>
                </div>
                <div className="text-xs text-gray-700">{getDepartmentName(patient.department_id || '')}</div>
                <div>
                  <StatusBadge
                    level={patient.status === 'waiting' ? 'warning' : patient.status === 'in_consultation' ? 'info' : 'normal'}
                    label={patient.status === 'waiting' ? 'Waiting' : patient.status === 'in_consultation' ? 'Consult' : 'Done'}
                    pulse={patient.status === 'waiting'}
                  />
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {patient.status === 'done' ? 'Done' : patient.status === 'in_consultation' ? 'In Progress' : '~15 min'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wait Time Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Wait Time by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waitTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} interval={0} tick={{ fontSize: 11 }} />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="waitTime" radius={[4, 4, 0, 0]} name="Wait Time (min)">
                  {waitTimeData.map((entry, i) => (
                    <Cell key={i} fill={entry.waitTime > 20 ? '#DC2626' : entry.waitTime > 14 ? '#F59E0B' : '#16A34A'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Patient Journey Flow */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Journey Flow</h3>
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-lg p-4 md:p-6 gap-4">
          {[
            { icon: MapPin, label: 'Registration', time: '3 min', color: 'bg-primary-500' },
            { icon: Clock, label: 'Waiting', time: '12 min', color: 'bg-secondary-500' },
            { icon: Stethoscope, label: 'Consultation', time: '15 min', color: 'bg-accent-500' },
            { icon: TrendingUp, label: 'Discharge', time: '5 min', color: 'bg-green-500' },
          ].map((step, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block flex-1 h-0.5 bg-gray-300 mx-2" />}
              <div className="text-center shrink-0">
                <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{step.label}</p>
                <p className="text-xs text-gray-500">Avg: {step.time}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientFlow;
