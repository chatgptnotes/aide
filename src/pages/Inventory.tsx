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
    </div>
  );
};

export default Inventory;