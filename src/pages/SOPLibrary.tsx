import React, { useState } from 'react';
import { FileText, Search, CheckCircle, Clock, User, Eye } from 'lucide-react';

const sops = [
  { id: 'SOP-001', title: 'Patient Admission Process', department: 'Front Office', version: '3.2', lastUpdated: '2026-02-15', owner: 'Dr. BK Murali', acknowledged: 45, total: 50, category: 'Clinical' },
  { id: 'SOP-002', title: 'Hand Hygiene Protocol', department: 'Infection Control', version: '2.1', lastUpdated: '2026-01-20', owner: 'Sister Meera Joshi', acknowledged: 58, total: 62, category: 'Infection Control' },
  { id: 'SOP-003', title: 'Code Blue Response', department: 'Emergency', version: '4.0', lastUpdated: '2026-02-28', owner: 'Dr. Amit Kumar', acknowledged: 40, total: 62, category: 'Emergency' },
  { id: 'SOP-004', title: 'Blood Transfusion Protocol', department: 'Blood Bank', version: '2.5', lastUpdated: '2026-01-10', owner: 'Dr. Neha Gupta', acknowledged: 30, total: 35, category: 'Clinical' },
  { id: 'SOP-005', title: 'Biomedical Waste Management', department: 'Housekeeping', version: '3.0', lastUpdated: '2026-02-01', owner: 'Ravi Kumar', acknowledged: 48, total: 50, category: 'Safety' },
  { id: 'SOP-006', title: 'Fire Safety & Evacuation', department: 'Administration', version: '2.0', lastUpdated: '2026-01-25', owner: 'Safety Officer', acknowledged: 55, total: 62, category: 'Safety' },
  { id: 'SOP-007', title: 'OT Sterilization Protocol', department: 'OT', version: '3.1', lastUpdated: '2026-02-20', owner: 'Sister Sunita', acknowledged: 12, total: 15, category: 'Clinical' },
  { id: 'SOP-008', title: 'Discharge Process', department: 'Nursing', version: '2.3', lastUpdated: '2026-02-10', owner: 'Nursing Superintendent', acknowledged: 42, total: 50, category: 'Clinical' },
];

const SOPLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(sops.map(s => s.category)))];
  const filtered = sops.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || s.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SOP Library</h1>
        <p className="text-gray-600">Searchable SOPs with version control and staff acknowledgment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total SOPs', value: sops.length.toString(), icon: FileText, color: 'text-blue-600 bg-blue-100' },
          { label: 'Up to Date', value: sops.filter(s => new Date(s.lastUpdated) > new Date('2026-01-01')).length.toString(), icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'Avg Acknowledgment', value: `${Math.round(sops.reduce((s, p) => s + (p.acknowledged / p.total) * 100, 0) / sops.length)}%`, icon: User, color: 'text-purple-600 bg-purple-100' },
          { label: 'Categories', value: (categories.length - 1).toString(), icon: Eye, color: 'text-amber-600 bg-amber-100' },
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
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input type="text" placeholder="Search SOPs..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div className="flex space-x-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-lg text-sm ${categoryFilter === c ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-primary-500" />
                  <div>
                    <span className="font-medium">{s.title}</span>
                    <span className="text-gray-400 text-xs ml-2">v{s.version}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{s.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{s.department}</span>
                  <span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>{s.lastUpdated}</span></span>
                  <span>Owner: {s.owner}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(s.acknowledged / s.total) * 100}%` }} />
                  </div>
                  <span className="text-xs">{s.acknowledged}/{s.total} ack</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOPLibrary;
