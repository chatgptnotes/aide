import React, { useState, useRef, useEffect } from 'react';
import { Search, X, User, Users, FileText, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPatients, mockStaff, mockInventory } from '../data/mockData';

interface SearchResult {
  type: 'patient' | 'staff' | 'inventory' | 'sop';
  label: string;
  sub: string;
  path: string;
}

const GlobalSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results: SearchResult[] = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const r: SearchResult[] = [];
    mockPatients.filter(p => p.name.toLowerCase().includes(q)).forEach(p =>
      r.push({ type: 'patient', label: p.name, sub: `${p.age}Y, ${p.gender} - ${p.status}`, path: '/patient-flow' })
    );
    mockStaff.filter(s => s.name.toLowerCase().includes(q)).forEach(s =>
      r.push({ type: 'staff', label: s.name, sub: `${s.role} - ${s.shift} shift`, path: '/staff' })
    );
    mockInventory.filter(i => i.name.toLowerCase().includes(q)).forEach(i =>
      r.push({ type: 'inventory', label: i.name, sub: `${i.category} - Qty: ${i.quantity}`, path: '/inventory' })
    );
    const sopKeywords = ['hand hygiene', 'fire safety', 'code blue', 'infection control', 'patient discharge', 'medication administration'];
    sopKeywords.filter(s => s.includes(q)).forEach(s =>
      r.push({ type: 'sop', label: s.charAt(0).toUpperCase() + s.slice(1), sub: 'SOP Document', path: '/sop-library' })
    );
    return r.slice(0, 8);
  }, [query]);

  const icons = { patient: User, staff: Users, inventory: Package, sop: FileText };

  const go = (path: string) => { navigate(path); setOpen(false); setQuery(''); };

  return (
    <>
      <div className="relative flex-1 max-w-md mx-8 hidden md:block" onClick={() => setOpen(true)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          readOnly
          placeholder="Search patients, staff, SOPs... (Ctrl+K)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
        />
      </div>
      <button className="md:hidden p-2 text-gray-400 hover:text-primary-500" onClick={() => setOpen(true)}>
        <Search className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search patients, staff, SOPs, inventory..."
                className="flex-1 text-base outline-none"
              />
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto p-2">
                {results.map((r, i) => {
                  const Icon = icons[r.type];
                  return (
                    <button
                      key={i}
                      onClick={() => go(r.path)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{r.label}</p>
                        <p className="text-xs text-gray-500 truncate">{r.sub}</p>
                      </div>
                      <span className="ml-auto text-[10px] uppercase font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{r.type}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {query && results.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">No results for "{query}"</div>
            )}
            {!query && (
              <div className="p-8 text-center text-gray-400 text-sm">Start typing to search across all hospital data</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSearch;
