import React from 'react';
import { UserPlus, TrendingUp, MapPin } from 'lucide-react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const referringDoctors = [
  { name: 'Dr. Ashok Jain', specialty: 'GP', location: 'Dharampeth', referrals: 28, revenue: 420000, phone: '9876543230' },
  { name: 'Dr. Meena Sharma', specialty: 'GP', location: 'Manewada', referrals: 22, revenue: 330000, phone: '9876543231' },
  { name: 'Dr. Sunil Patil', specialty: 'Physician', location: 'Sadar', referrals: 18, revenue: 540000, phone: '9876543232' },
  { name: 'Dr. Kavita Rao', specialty: 'Gynecologist', location: 'Civil Lines', referrals: 15, revenue: 375000, phone: '9876543233' },
  { name: 'Dr. Vinay Deshmukh', specialty: 'GP', location: 'Hingna', referrals: 12, revenue: 180000, phone: '9876543234' },
  { name: 'Dr. Pradeep Chavan', specialty: 'Cardiologist', location: 'Ramdaspeth', referrals: 10, revenue: 450000, phone: '9876543235' },
];

const sourceData = [
  { name: 'GP Referrals', value: 45, fill: '#3282B8' },
  { name: 'Self/Walk-in', value: 25, fill: '#00B4D8' },
  { name: 'Specialist Ref', value: 15, fill: '#0F4C75' },
  { name: 'Insurance Panel', value: 10, fill: '#16A34A' },
  { name: 'Online/Website', value: 5, fill: '#F59E0B' },
];

const ReferralNetwork: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Referral Network</h1>
        <p className="text-gray-600">Referring doctor performance and source analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrals (Month)', value: referringDoctors.reduce((s, d) => s + d.referrals, 0).toString(), icon: UserPlus, color: 'text-blue-600 bg-blue-100' },
          { label: 'Referring Doctors', value: referringDoctors.length.toString(), icon: UserPlus, color: 'text-green-600 bg-green-100' },
          { label: 'Referral Revenue', value: '23.9L', icon: TrendingUp, color: 'text-purple-600 bg-purple-100' },
          { label: 'Top Source', value: 'GP Referrals', icon: MapPin, color: 'text-amber-600 bg-amber-100' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-600">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Top Referring Doctors</h2>
          <div className="space-y-3">
            {referringDoctors.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <div>
                    <p className="font-medium text-sm">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.specialty}, {d.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{d.referrals} referrals</p>
                  <p className="text-xs text-gray-500">Rs {(d.revenue / 1000).toFixed(0)}K revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Referral Source Mix</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {sourceData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReferralNetwork;
