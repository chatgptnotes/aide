import React from 'react';

type Level = 'normal' | 'warning' | 'critical' | 'info';

const colors: Record<Level, string> = {
  normal: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

const dotColors: Record<Level, string> = {
  normal: 'bg-green-500',
  warning: 'bg-yellow-500',
  critical: 'bg-red-500',
  info: 'bg-blue-500',
};

interface Props {
  level: Level;
  label: string;
  pulse?: boolean;
}

const StatusBadge: React.FC<Props> = ({ level, label, pulse }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${dotColors[level]} ${pulse ? 'animate-pulse' : ''}`} />
    {label}
  </span>
);

export default StatusBadge;
