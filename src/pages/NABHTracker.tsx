import React from 'react';
import { ClipboardCheck, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chapters = [
  { name: 'AAC - Access, Assessment, Continuity', total: 58, completed: 52, score: 89 },
  { name: 'COP - Care of Patients', total: 65, completed: 58, score: 89 },
  { name: 'MOM - Management of Medication', total: 28, completed: 25, score: 89 },
  { name: 'PRE - Patient Rights & Education', total: 22, completed: 20, score: 91 },
  { name: 'HIC - Hospital Infection Control', total: 18, completed: 16, score: 89 },
  { name: 'CQI - Continuous Quality Improvement', total: 32, completed: 26, score: 81 },
  { name: 'ROM - Responsibilities of Management', total: 45, completed: 38, score: 84 },
  { name: 'FMS - Facility Management & Safety', total: 42, completed: 35, score: 83 },
  { name: 'HRM - Human Resource Management', total: 30, completed: 27, score: 90 },
  { name: 'IMS - Information Management', total: 25, completed: 21, score: 84 },
];

const ncList = [
  { id: 'NC-001', chapter: 'CQI', finding: 'Incident reporting not standardized', severity: 'major', status: 'open', dueDate: '2026-03-10' },
  { id: 'NC-002', chapter: 'FMS', finding: 'Fire drill documentation incomplete', severity: 'minor', status: 'in_progress', dueDate: '2026-03-08' },
  { id: 'NC-003', chapter: 'HIC', finding: 'Biomedical waste segregation audit pending', severity: 'major', status: 'open', dueDate: '2026-03-12' },
  { id: 'NC-004', chapter: 'ROM', finding: 'Committee meeting minutes not updated', severity: 'minor', status: 'closed', dueDate: '2026-03-05' },
];

const qualityIndicators = [
  { name: 'Hand Hygiene Compliance', value: 85, target: 90 },
  { name: 'Patient Fall Rate', value: 0.2, target: 0.5 },
  { name: 'Medication Error Rate', value: 0.3, target: 0.5 },
  { name: 'SSI Rate', value: 1.2, target: 2.0 },
  { name: 'Readmission Rate (30d)', value: 4.5, target: 5.0 },
  { name: 'Mortality Rate', value: 1.8, target: 2.0 },
];

const NABHTracker: React.FC = () => {
  const totalElements = chapters.reduce((s, c) => s + c.total, 0);
  const completedElements = chapters.reduce((s, c) => s + c.completed, 0);
  const overallScore = Math.round((completedElements / totalElements) * 100);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">NABH Tracker</h1>
        <p className="text-gray-600">Entry-level accreditation preparation and quality monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Score', value: `${overallScore}%`, icon: ClipboardCheck, color: 'text-primary-600 bg-primary-100' },
          { label: 'Elements Done', value: `${completedElements}/${totalElements}`, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'Open NCs', value: ncList.filter(n => n.status !== 'closed').length.toString(), icon: AlertCircle, color: 'text-red-600 bg-red-100' },
          { label: 'Audit Target', value: 'Mar 15', icon: Clock, color: 'text-blue-600 bg-blue-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-600">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Chapter Progress</h2>
        <div className="space-y-3">
          {chapters.map(c => (
            <div key={c.name} className="flex items-center space-x-4">
              <span className="w-64 text-sm truncate" title={c.name}>{c.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className={`h-3 rounded-full ${c.score >= 90 ? 'bg-green-500' : c.score >= 80 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${c.score}%` }} />
              </div>
              <span className="text-sm font-medium w-20 text-right">{c.completed}/{c.total} ({c.score}%)</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Non-Conformities</h2>
          <div className="space-y-3">
            {ncList.map(nc => (
              <div key={nc.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-500">{nc.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${nc.severity === 'major' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{nc.severity}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${nc.status === 'closed' ? 'bg-green-100 text-green-700' : nc.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{nc.status.replace('_', ' ')}</span>
                  </div>
                  <span className="text-xs text-gray-500">Due: {nc.dueDate}</span>
                </div>
                <p className="text-sm">{nc.finding}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2"><FileText className="w-5 h-5" /><span>Quality Indicators</span></h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={qualityIndicators} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3282B8" name="Actual" />
              <Bar dataKey="target" fill="#d1d5db" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NABHTracker;
