import React from 'react';
import { TrendingUp, DollarSign, CreditCard, Smartphone } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRevenue, chartData } from '../data/mockData';

const Revenue: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const paymentModes = mockRevenue.reduce((acc, rev) => {
    acc[rev.payment_mode] = (acc[rev.payment_mode] || 0) + rev.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Management</h1>
        <p className="text-gray-600">Track billing, payments and financial performance</p>
      </div>

      {/* Payment Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cash</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(paymentModes.cash || 0)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Card</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(paymentModes.card || 0)}</p>
            </div>
            <CreditCard className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">UPI</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(paymentModes.upi || 0)}</p>
            </div>
            <Smartphone className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Insurance</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(paymentModes.insurance || 0)}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value / 100000) + 'L'} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line type="monotone" dataKey="target" stroke="#DC2626" strokeDasharray="5 5" name="Target" />
              <Line type="monotone" dataKey="actual" stroke="#0F4C75" strokeWidth="2" name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Revenue Deep Dive */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Deep Dive</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Claim Denials', value: '12%', trend: 'down', color: 'text-green-600' },
            { label: 'AR Aging (>90d)', value: '8.2L', trend: 'up', color: 'text-red-600' },
            { label: 'Collection Rate', value: '87%', trend: 'up', color: 'text-green-600' },
            { label: 'Avg Days to Collect', value: '32', trend: 'down', color: 'text-green-600' },
          ].map((m, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">{m.label}</p>
              <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-3">Payer Mix</h4>
            <div className="space-y-2">
              {[
                { payer: 'Self-Pay', pct: 35, color: 'bg-blue-500' },
                { payer: 'ESIC', pct: 25, color: 'bg-green-500' },
                { payer: 'Ayushman Bharat', pct: 20, color: 'bg-purple-500' },
                { payer: 'Private Insurance', pct: 15, color: 'bg-amber-500' },
                { payer: 'Corporate', pct: 5, color: 'bg-red-500' },
              ].map(p => (
                <div key={p.payer} className="flex items-center space-x-3">
                  <span className="w-24 text-xs">{p.payer}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                  </div>
                  <span className="text-xs font-medium w-8">{p.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">AR Aging Buckets</h4>
            <div className="space-y-2">
              {[
                { bucket: '0-30 days', amount: '12.5L', color: 'bg-green-500' },
                { bucket: '31-60 days', amount: '6.8L', color: 'bg-amber-500' },
                { bucket: '61-90 days', amount: '3.2L', color: 'bg-orange-500' },
                { bucket: '90+ days', amount: '8.2L', color: 'bg-red-500' },
              ].map(b => (
                <div key={b.bucket} className="flex items-center justify-between p-2 rounded bg-gray-50">
                  <span className="text-sm flex items-center space-x-2"><span className={`w-2 h-2 rounded-full ${b.color}`}></span><span>{b.bucket}</span></span>
                  <span className="font-medium text-sm">Rs {b.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Projections</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Department', 'Budget', 'Actual', 'Variance', 'Projection (Month)'].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { dept: 'Orthopedics', budget: 1500000, actual: 1380000, projection: 4500000 },
                { dept: 'General Surgery', budget: 1200000, actual: 1150000, projection: 3600000 },
                { dept: 'Internal Medicine', budget: 800000, actual: 720000, projection: 2400000 },
                { dept: 'Gynecology', budget: 600000, actual: 580000, projection: 1800000 },
                { dept: 'Emergency', budget: 500000, actual: 520000, projection: 1500000 },
              ].map(d => {
                const variance = ((d.actual - d.budget) / d.budget * 100).toFixed(1);
                const isPositive = d.actual >= d.budget;
                return (
                  <tr key={d.dept}>
                    <td className="px-4 py-3 font-medium">{d.dept}</td>
                    <td className="px-4 py-3">Rs {(d.budget/100000).toFixed(1)}L</td>
                    <td className="px-4 py-3">Rs {(d.actual/100000).toFixed(1)}L</td>
                    <td className={`px-4 py-3 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{isPositive ? '+' : ''}{variance}%</td>
                    <td className="px-4 py-3">Rs {(d.projection/100000).toFixed(1)}L</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Revenue;