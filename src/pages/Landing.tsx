import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Bed, TrendingUp, Package,
  Brain, Cpu, Network, Shield, Clock, BarChart3,
  Stethoscope, Pill, FlaskConical, CreditCard, Heart, Siren,
  CheckCircle, Zap, ChevronRight,
} from 'lucide-react';

const DEPARTMENTS = [
  { name: 'OPD', icon: Users, color: '#0F4C75', x: 50, y: 30 },
  { name: 'IPD', icon: Bed, color: '#3282B8', x: 180, y: 10 },
  { name: 'ICU', icon: Heart, color: '#DC2626', x: 310, y: 30 },
  { name: 'OT', icon: Stethoscope, color: '#7C3AED', x: 440, y: 10 },
  { name: 'Lab', icon: FlaskConical, color: '#0891B2', x: 570, y: 30 },
  { name: 'Pharmacy', icon: Pill, color: '#16A34A', x: 700, y: 10 },
  { name: 'Emergency', icon: Siren, color: '#EA580C', x: 125, y: 100 },
  { name: 'Billing', icon: CreditCard, color: '#B8860B', x: 375, y: 100 },
  { name: 'Supply', icon: Package, color: '#6366F1', x: 625, y: 100 },
];

const CONNECTIONS = [
  [0,1],[0,6],[1,2],[1,7],[2,3],[2,6],[3,4],[3,7],[4,5],[4,8],[5,8],[6,7],[7,8],
];

const AGENTS = [
  {
    name: 'Flow Agent',
    desc: 'Optimizes patient queues, reduces OPD wait times by 40%, routes patients intelligently across departments',
    icon: Users,
    color: 'bg-sky-500',
    stat: '40% faster',
  },
  {
    name: 'Resource Agent',
    desc: 'Real-time bed allocation, staff scheduling, and equipment tracking for 95% utilization',
    icon: Bed,
    color: 'bg-blue-700',
    stat: '95% utilized',
  },
  {
    name: 'Revenue Agent',
    desc: 'Automates billing, insurance claims (ESIC/CGHS), and payment collection. 30% faster processing',
    icon: TrendingUp,
    color: 'bg-emerald-600',
    stat: '30% faster',
  },
  {
    name: 'Logistics Agent',
    desc: 'Coordinates pharmacy stock, lab sample routing, and supply chain with predictive reordering',
    icon: Package,
    color: 'bg-amber-600',
    stat: '0 stockouts',
  },
];

const STATS = [
  { value: '40%', label: 'Reduced Wait Times', sub: 'OPD average 45 to 27 minutes' },
  { value: '95%', label: 'Bed Utilization', sub: 'Optimal allocation across all wards' },
  { value: '30%', label: 'Faster Billing', sub: 'Automated claims and collection' },
  { value: '24/7', label: 'AI Monitoring', sub: 'Continuous operations intelligence' },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F4C75] to-[#00B4D8] flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#0F4C75]">Aide</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-gray-600 hover:text-[#0F4C75] font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/dashboard" className="text-sm bg-[#0F4C75] text-white px-4 py-2 rounded-lg hover:bg-[#093049] transition-colors font-medium">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8] rounded-full blur-[160px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F4C75] rounded-full blur-[160px] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0F4C75]/5 text-[#0F4C75] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Network className="w-4 h-4" />
              The Hospital Neural Network
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Where <span className="text-[#0F4C75]">AI Agents</span> Run
              <br />Hospital Operations
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Four specialized AI agents coordinate across every department,
              turning your hospital into an intelligent, self-optimizing system.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-[#0F4C75] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#093049] transition-all shadow-lg shadow-[#0F4C75]/20"
              >
                <Zap className="w-4 h-4" />
                Launch Demo
              </Link>
              <a
                href="#agents"
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-base font-semibold hover:border-[#0F4C75] hover:text-[#0F4C75] transition-all"
              >
                Meet the Agents
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Neural Network Diagram */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400 font-mono">aide-neural-network.live</span>
              </div>
              <svg viewBox="0 0 800 160" className="w-full">
                {/* Connection lines with animation */}
                {CONNECTIONS.map(([a, b], i) => {
                  const da = DEPARTMENTS[a];
                  const db = DEPARTMENTS[b];
                  return (
                    <line
                      key={`c-${i}`}
                      x1={da.x + 30} y1={da.y + 20}
                      x2={db.x + 30} y2={db.y + 20}
                      stroke="#E2E8F0"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                  );
                })}
                {/* Central AI brain */}
                <circle cx="400" cy="65" r="28" fill="#0F4C75" opacity="0.08" />
                <circle cx="400" cy="65" r="18" fill="#0F4C75" opacity="0.15" />
                {/* Department nodes */}
                {DEPARTMENTS.map((dept, i) => (
                  <g key={i}>
                    <rect
                      x={dept.x}
                      y={dept.y}
                      width="60"
                      height="40"
                      rx="8"
                      fill="white"
                      stroke={dept.color}
                      strokeWidth="2"
                    />
                    <rect
                      x={dept.x}
                      y={dept.y}
                      width="60"
                      height="40"
                      rx="8"
                      fill={dept.color}
                      opacity="0.08"
                    />
                    <text
                      x={dept.x + 30}
                      y={dept.y + 25}
                      textAnchor="middle"
                      fill={dept.color}
                      fontSize="11"
                      fontWeight="600"
                    >
                      {dept.name}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live</span>
                <span>9 departments connected</span>
                <span>4 AI agents active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Four Agents. One Network.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Each agent specializes in a domain but communicates with others in real-time for coordinated decision-making.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENTS.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#0F4C75]/30 transition-all group"
                >
                  <div className={`w-11 h-11 ${agent.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-[#00B4D8] mb-1 uppercase tracking-wider">{agent.stat}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{agent.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{agent.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0F4C75]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-sm font-medium text-white/80 mb-1">{s.label}</div>
                <div className="text-xs text-white/50">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How Aide Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect', desc: 'Integrates with your existing HMS, lab systems, pharmacy, and billing software', icon: Network },
              { step: '02', title: 'Learn', desc: 'AI agents analyze your hospital patterns, workflows, and bottlenecks for 48 hours', icon: Brain },
              { step: '03', title: 'Optimize', desc: 'Agents begin coordinating departments, predicting demand, and automating decisions', icon: Cpu },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative text-center">
                  <div className="text-6xl font-black text-gray-100 mb-4">{item.step}</div>
                  <div className="w-12 h-12 bg-[#0F4C75]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#0F4C75]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Shield, label: 'HIPAA Compliant' },
              { icon: Clock, label: '99.9% Uptime' },
              { icon: CheckCircle, label: 'NABH Ready' },
              { icon: BarChart3, label: 'Real-time Analytics' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <Icon className="w-5 h-5 text-[#00B4D8]" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to transform your hospital?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Join hospitals that run smarter with AI-powered operations.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-[#0F4C75] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#093049] transition-all shadow-lg shadow-[#0F4C75]/20"
          >
            <Zap className="w-5 h-5" />
            Launch Live Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#093049] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-[#00B4D8]" />
              </div>
              <span className="font-bold">Aide</span>
              <span className="text-white/40 text-sm ml-2">The Hospital Neural Network</span>
            </div>
            <div className="text-sm text-white/40">
              drmhope.com | A Bettroi Product | v1.0 | 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
