import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { mockInventory } from '../data/mockData';

const Inventory: React.FC = () => {
  const lowStockItems = mockInventory.filter(item => item.quantity <= item.reorder_level);
  const categories = Array.from(new Set(mockInventory.map(item => item.category)));

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Monitor stock levels and manage supplies</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => {
          const items = mockInventory.filter(item => item.category === category);
          const lowStock = items.filter(item => item.quantity <= item.reorder_level).length;
          
          return (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{category}</p>
                  <p className="text-2xl font-bold text-gray-900">{items.length}</p>
                  {lowStock > 0 && (
                    <p className="text-sm text-red-600">{lowStock} low stock</p>
                  )}
                </div>
                <Package className="w-12 h-12 text-blue-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Low Stock Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 border border-red-200">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.category}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium text-red-600">
                    Current: {item.quantity} | Reorder: {item.reorder_level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Inventory Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Item</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Quantity</th>
                <th className="text-left py-3 px-4">Reorder Level</th>
                <th className="text-left py-3 px-4">Unit Price</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">{item.reorder_level}</td>
                  <td className="py-3 px-4">₹{item.unit_price}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.quantity <= item.reorder_level 
                        ? 'bg-red-100 text-red-800' 
                        : item.quantity <= item.reorder_level * 1.5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.quantity <= item.reorder_level ? 'Low Stock' : 
                       item.quantity <= item.reorder_level * 1.5 ? 'Moderate' : 'In Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Drug Interaction Checker */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Drug Interaction Alerts</h3>
        <div className="space-y-3 mb-4">
          {[
            { drug1: 'Warfarin', drug2: 'Aspirin', severity: 'high', effect: 'Increased bleeding risk' },
            { drug1: 'Metformin', drug2: 'Contrast Dye', severity: 'high', effect: 'Lactic acidosis risk' },
            { drug1: 'Ciprofloxacin', drug2: 'Antacids', severity: 'moderate', effect: 'Reduced absorption' },
          ].map((d, i) => (
            <div key={i} className={`p-3 rounded-lg border ${d.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{d.drug1} + {d.drug2}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${d.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{d.severity}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{d.effect}</p>
            </div>
          ))}
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Expiring within 30 days: <span className="font-bold">3 items</span> (Amoxicillin 250mg, X-Ray Films, Saline 500ml)</p>
        </div>
      </div>

      {/* Equipment Maintenance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Maintenance</h3>
        <div className="space-y-3">
          {[
            { equipment: 'C-Arm Fluoroscopy', lastPM: '2026-02-15', nextPM: '2026-03-15', status: 'maintenance', amcExpiry: '2026-12-31', amcVendor: 'Siemens' },
            { equipment: 'Ventilator #3', lastPM: '2026-01-20', nextPM: '2026-04-20', status: 'operational', amcExpiry: '2026-06-30', amcVendor: 'Draeger' },
            { equipment: 'X-Ray Machine', lastPM: '2026-02-01', nextPM: '2026-05-01', status: 'operational', amcExpiry: '2027-03-31', amcVendor: 'GE Healthcare' },
            { equipment: 'Autoclave #1', lastPM: '2026-02-28', nextPM: '2026-03-28', status: 'operational', amcExpiry: '2026-09-30', amcVendor: 'Tuttnauer' },
          ].map((e, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-sm">{e.equipment}</p>
                <p className="text-xs text-gray-500">AMC: {e.amcVendor} (expires {e.amcExpiry})</p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Last PM</p>
                  <p>{e.lastPM}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Next PM</p>
                  <p className="font-medium">{e.nextPM}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${e.status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{e.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Inventory;