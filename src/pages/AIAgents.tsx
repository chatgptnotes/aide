import React from 'react';
import { Users, Bed, TrendingUp, Package, Activity, MessageSquare, Zap, Brain, Clock, CheckCircle } from 'lucide-react';
import { mockAgentActions } from '../data/mockData';

const AIAgents: React.FC = () => {
  const agents = [
    {
      id: 'flow',
      name: 'Flow Agent',
      icon: Users,
      color: 'accent',
      status: 'Active',
      description: 'Manages patient queues, routing, wait times',
      currentTask: 'Optimizing OPD queue distribution across 3 consultation rooms',
      actionsToday: 89,
      accuracy: 94,
      lastAction: '2 minutes ago',
      stats: 'Processed 89 OPD tokens today, avg wait reduced to 12 min',
    },
    {
      id: 'resource',
      name: 'Resource Agent',
      icon: Bed,
      color: 'primary',
      status: 'Active',
      description: 'Manages beds, staff, equipment allocation',
      currentTask: 'Coordinating bed transfer from General Ward to ICU',
      actionsToday: 47,
      accuracy: 96,
      lastAction: '5 minutes ago',
      stats: 'Optimized 3 bed transfers, flagged 2 maintenance needs',
    },
    {
      id: 'revenue',
      name: 'Revenue Agent',
      icon: TrendingUp,
      color: 'green',
      status: 'Learning',
      description: 'Handles billing, claims, collections',
      currentTask: 'Processing insurance claim submissions for ESIC patients',
      actionsToday: 23,
      accuracy: 91,
      lastAction: '8 minutes ago',
      stats: 'Auto-submitted 5 claims, flagged 2 payment delays',
    },
    {
      id: 'logistics',
      name: 'Logistics Agent',
      icon: Package,
      color: 'yellow',
      status: 'Active',
      description: 'Coordinates pharmacy, lab, supplies',
      currentTask: 'Monitoring medicine expiry dates and reorder levels',
      actionsToday: 156,
      accuracy: 98,
      lastAction: '1 minute ago',
      stats: 'Alerted 8 low-stock items, processed 23 lab requests',
    },
  ];

  const agentCommunications = [
    {
      id: '1',
      from: 'Flow Agent',
      to: 'Resource Agent',
      message: 'Need 2 additional beds in General Ward by 2 PM for incoming transfers',
      timestamp: '10:35 AM',
      status: 'pending',
    },
    {
      id: '2',
      from: 'Revenue Agent',
      to: 'Logistics Agent',
      message: 'Verify pharmacy stock for insurance patient discharge - Patient ID: #4567',
      timestamp: '10:32 AM',
      status: 'completed',
    },
    {
      id: '3',
      from: 'Resource Agent',
      to: 'Flow Agent',
      message: 'ICU Bed 7 maintenance complete, available for allocation',
      timestamp: '10:28 AM',
      status: 'completed',
    },
    {
      id: '4',
      from: 'Logistics Agent',
      to: 'Revenue Agent',
      message: 'Stock confirmed: Discharge medications available for Patient #4567',
      timestamp: '10:25 AM',
      status: 'completed',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'accent':
        return {
          bg: 'bg-accent-100',
          text: 'text-accent-600',
          border: 'border-accent-200',
          gradient: 'from-accent-500 to-accent-600',
        };
      case 'primary':
        return {
          bg: 'bg-primary-100',
          text: 'text-primary-600',
          border: 'border-primary-200',
          gradient: 'from-primary-500 to-primary-600',
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          border: 'border-green-200',
          gradient: 'from-green-500 to-green-600',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          border: 'border-yellow-200',
          gradient: 'from-yellow-500 to-yellow-600',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          gradient: 'from-gray-500 to-gray-600',
        };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Network</h1>
        <p className="text-gray-600">Monitor and manage your hospital's intelligent automation system</p>
      </div>

      {/* Neural Network Status */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Neural Network Status</h2>
            <p className="opacity-90">All systems operational • 4 agents active • 98% uptime today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">315</div>
              <div className="text-sm opacity-75">Actions Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-75">Avg Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {agents.map((agent) => {
          const colors = getColorClasses(agent.color);
          return (
            <div key={agent.id} className={`bg-white rounded-xl shadow-sm border-2 ${colors.border} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                  <agent.icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">{agent.status}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{agent.description}</p>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">CURRENT TASK</p>
                  <p className="text-sm text-gray-700">{agent.currentTask}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Actions Today</p>
                    <p className="text-lg font-bold text-gray-900">{agent.actionsToday}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Accuracy</p>
                    <p className="text-lg font-bold text-gray-900">{agent.accuracy}%</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Last action: {agent.lastAction}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Communication Log */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-primary-500" />
            Agent Communication Log
          </h3>
          <div className="space-y-4">
            {agentCommunications.map((comm) => (
              <div key={comm.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary-600">{comm.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-sm font-medium text-secondary-600">{comm.to}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{comm.timestamp}</span>
                    {comm.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{comm.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Neural Network Visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary-500" />
            Neural Network Map
          </h3>
          <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 256">
              {/* Animated connections */}
              <g className="stroke-primary-300 opacity-60" strokeWidth="2" fill="none">
                <line x1="80" y1="64" x2="160" y2="64">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="80" y1="64" x2="160" y2="128">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2.5s" repeatCount="indefinite" />
                </line>
                <line x1="80" y1="192" x2="160" y2="128">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="1.8s" repeatCount="indefinite" />
                </line>
                <line x1="80" y1="192" x2="160" y2="192">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2.2s" repeatCount="indefinite" />
                </line>
                <line x1="160" y1="64" x2="240" y2="96">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="1.9s" repeatCount="indefinite" />
                </line>
                <line x1="160" y1="128" x2="240" y2="96">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2.1s" repeatCount="indefinite" />
                </line>
                <line x1="160" y1="128" x2="240" y2="160">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2.3s" repeatCount="indefinite" />
                </line>
                <line x1="160" y1="192" x2="240" y2="160">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="1.7s" repeatCount="indefinite" />
                </line>
                <line x1="240" y1="96" x2="320" y2="128">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2.4s" repeatCount="indefinite" />
                </line>
                <line x1="240" y1="160" x2="320" y2="128">
                  <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2.0s" repeatCount="indefinite" />
                </line>
              </g>
              
              {/* Agent nodes */}
              <g>
                <circle cx="80" cy="64" r="20" fill="#00B4D8" className="animate-pulse" />
                <circle cx="80" cy="192" r="20" fill="#0F4C75" className="animate-pulse" />
                <circle cx="240" cy="96" r="20" fill="#16A34A" className="animate-pulse" />
                <circle cx="240" cy="160" r="20" fill="#F59E0B" className="animate-pulse" />
                <circle cx="160" cy="64" r="12" fill="#6B7280" />
                <circle cx="160" cy="128" r="12" fill="#6B7280" />
                <circle cx="160" cy="192" r="12" fill="#6B7280" />
                <circle cx="320" cy="128" r="16" fill="#3282B8" />
              </g>
              
              {/* Labels */}
              <g className="fill-gray-700 text-xs font-medium">
                <text x="80" y="50" textAnchor="middle">Flow</text>
                <text x="80" y="210" textAnchor="middle">Resource</text>
                <text x="240" y="85" textAnchor="middle">Revenue</text>
                <text x="240" y="178" textAnchor="middle">Logistics</text>
                <text x="320" y="145" textAnchor="middle">Central</text>
              </g>
            </svg>
            
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span>Real-time data flow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Agent Activity</h3>
        <div className="space-y-3">
          {mockAgentActions.slice(0, 8).map((action) => (
            <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  action.agent_name === 'Flow Agent' ? 'bg-accent-100' :
                  action.agent_name === 'Resource Agent' ? 'bg-primary-100' :
                  action.agent_name === 'Revenue Agent' ? 'bg-green-100' :
                  'bg-yellow-100'
                }`}>
                  <Activity className={`w-4 h-4 ${
                    action.agent_name === 'Flow Agent' ? 'text-accent-600' :
                    action.agent_name === 'Resource Agent' ? 'text-primary-600' :
                    action.agent_name === 'Revenue Agent' ? 'text-green-600' :
                    'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{action.agent_name}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {new Date(action.created_at).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  action.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {action.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAgents;