import React, { useState, useEffect, useCallback } from 'react';
import { Bell, X, AlertTriangle, Bed, FlaskConical, Siren } from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  icon: React.ElementType;
  time: Date;
}

const initialAlerts: Alert[] = [
  { id: 1, type: 'critical', title: 'ICU Bed Full', message: 'All ICU beds occupied. 2 patients waiting.', icon: Bed, time: new Date() },
  { id: 2, type: 'critical', title: 'Critical Lab Value', message: 'Patient Rajesh Gupta - Potassium 6.8 mEq/L', icon: FlaskConical, time: new Date(Date.now() - 300000) },
  { id: 3, type: 'warning', title: 'Emergency Admission', message: 'Trauma case incoming via ambulance ETA 5 min', icon: Siren, time: new Date(Date.now() - 600000) },
];

const typeColors = {
  critical: 'border-red-500 bg-red-50',
  warning: 'border-yellow-500 bg-yellow-50',
  info: 'border-blue-500 bg-blue-50',
};

const typeText = {
  critical: 'text-red-700',
  warning: 'text-yellow-700',
  info: 'text-blue-700',
};

export const AlertBell: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [open, setOpen] = useState(false);
  const [toasts, setToasts] = useState<Alert[]>([]);

  const dismiss = useCallback((id: number) => {
    setAlerts(a => a.filter(x => x.id !== id));
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  // Simulate a new alert every 45 seconds
  useEffect(() => {
    const newAlerts = [
      { type: 'warning' as const, title: 'Low Stock Alert', message: 'Surgical Gloves below reorder level', icon: AlertTriangle },
      { type: 'critical' as const, title: 'Ventilator Alarm', message: 'ICU Bed 3 - SpO2 dropping', icon: Siren },
      { type: 'info' as const, title: 'Shift Change', message: 'Night shift handover in 30 minutes', icon: Bell },
    ];
    let idx = 0;
    const interval = setInterval(() => {
      const base = newAlerts[idx % newAlerts.length];
      const alert: Alert = { ...base, id: Date.now(), time: new Date() };
      setAlerts(a => [alert, ...a].slice(0, 10));
      setToasts(t => [alert, ...t]);
      setTimeout(() => dismissToast(alert.id), 5000);
      idx++;
    }, 45000);
    return () => clearInterval(interval);
  }, [dismissToast]);

  return (
    <>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-400 hover:text-primary-500 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {alerts.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Alerts ({alerts.length})</h3>
              <button onClick={() => { setAlerts([]); setOpen(false); }} className="text-xs text-primary-500 hover:underline">Clear all</button>
            </div>
            {alerts.map(alert => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className={`p-3 border-b border-gray-50 flex items-start gap-3 border-l-4 ${typeColors[alert.type]}`}>
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${typeText[alert.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${typeText[alert.type]}`}>{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{alert.time.toLocaleTimeString('en-IN')}</p>
                  </div>
                  <button onClick={() => dismiss(alert.id)} className="p-0.5 hover:bg-gray-200 rounded">
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              );
            })}
            {alerts.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No alerts</div>}
          </div>
        </>
      )}

      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
        {toasts.map(toast => {
          const Icon = toast.icon;
          return (
            <div key={toast.id} className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-l-4 bg-white ${typeColors[toast.type]} animate-[slideIn_0.3s_ease-out]`}>
              <Icon className={`w-5 h-5 ${typeText[toast.type]}`} />
              <div>
                <p className={`text-sm font-medium ${typeText[toast.type]}`}>{toast.title}</p>
                <p className="text-xs text-gray-500">{toast.message}</p>
              </div>
              <button onClick={() => dismissToast(toast.id)} className="p-1 hover:bg-gray-100 rounded ml-2">
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AlertBell;
