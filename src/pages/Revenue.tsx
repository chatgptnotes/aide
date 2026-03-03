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
    </div>
  );
};

export default Revenue;