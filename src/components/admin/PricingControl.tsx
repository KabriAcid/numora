import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Edit3, 
  Save, 
  X, 
  Plus,
  Upload,
  Download,
  Smartphone,
  Wifi,
  Zap,
  Tv
} from 'lucide-react';

interface PricingItem {
  id: number;
  service: string;
  provider: string;
  type: string;
  cost_price: number;
  selling_price: number;
  profit_margin: number;
  status: 'active' | 'inactive';
  icon: React.ComponentType<any>;
  color: string;
}

const PricingControl: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data - replace with actual API calls
  const [pricingData, setPricingData] = useState<PricingItem[]>([
    {
      id: 1,
      service: 'MTN Airtime',
      provider: 'MTN',
      type: 'airtime',
      cost_price: 98.5,
      selling_price: 100,
      profit_margin: 1.5,
      status: 'active',
      icon: Smartphone,
      color: 'text-yellow-600'
    },
    {
      id: 2,
      service: 'GLO 1GB Data',
      provider: 'GLO',
      type: 'data',
      cost_price: 245,
      selling_price: 250,
      profit_margin: 2.0,
      status: 'active',
      icon: Wifi,
      color: 'text-green-600'
    },
    {
      id: 3,
      service: 'Airtel 2GB Data',
      provider: 'Airtel',
      type: 'data',
      cost_price: 480,
      selling_price: 500,
      profit_margin: 4.2,
      status: 'active',
      icon: Wifi,
      color: 'text-red-600'
    },
    {
      id: 4,
      service: 'PHCN Electricity',
      provider: 'PHCN',
      type: 'electricity',
      cost_price: 98,
      selling_price: 100,
      profit_margin: 2.0,
      status: 'active',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      id: 5,
      service: 'DSTV Compact',
      provider: 'DSTV',
      type: 'cable',
      cost_price: 8500,
      selling_price: 8800,
      profit_margin: 3.5,
      status: 'active',
      icon: Tv,
      color: 'text-purple-600'
    }
  ]);

  const [editForm, setEditForm] = useState({
    cost_price: 0,
    selling_price: 0
  });

  const filteredData = pricingData.filter(item => {
    const matchesSearch = item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (item: PricingItem) => {
    setEditingId(item.id);
    setEditForm({
      cost_price: item.cost_price,
      selling_price: item.selling_price
    });
  };

  const handleSave = (id: number) => {
    const profit_margin = ((editForm.selling_price - editForm.cost_price) / editForm.cost_price) * 100;
    
    setPricingData(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            cost_price: editForm.cost_price,
            selling_price: editForm.selling_price,
            profit_margin: profit_margin
          }
        : item
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ cost_price: 0, selling_price: 0 });
  };

  const exportPricing = () => {
    // Implement CSV export
    console.log('Exporting pricing data...');
  };

  const importPricing = () => {
    // Implement CSV import
    console.log('Importing pricing data...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-ginto font-bold text-neutral-900">Pricing Control</h1>
          <p className="text-neutral-600 mt-1">Manage service prices and profit margins</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={importPricing}
            className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={exportPricing}
            className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search services or providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Services</option>
          <option value="airtime">Airtime</option>
          <option value="data">Data</option>
          <option value="electricity">Electricity</option>
          <option value="cable">Cable TV</option>
        </select>
      </div>

      {/* Pricing Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Cost Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Selling Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Profit Margin</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredData.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{item.service}</p>
                        <p className="text-sm text-neutral-500">{item.provider}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editForm.cost_price}
                        onChange={(e) => setEditForm(prev => ({ ...prev, cost_price: parseFloat(e.target.value) }))}
                        className="w-24 px-2 py-1 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        step="0.01"
                      />
                    ) : (
                      <span className="text-sm font-medium text-neutral-900">₦{item.cost_price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editForm.selling_price}
                        onChange={(e) => setEditForm(prev => ({ ...prev, selling_price: parseFloat(e.target.value) }))}
                        className="w-24 px-2 py-1 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        step="0.01"
                      />
                    ) : (
                      <span className="text-sm font-medium text-neutral-900">₦{item.selling_price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      item.profit_margin > 3 ? 'text-success-600' : 
                      item.profit_margin > 1 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {item.profit_margin.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'active' 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {editingId === item.id ? (
                        <>
                          <button
                            onClick={() => handleSave(item.id)}
                            className="p-2 text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Average Profit Margin</p>
              <p className="text-2xl font-ginto font-bold text-neutral-900 mt-1">2.8%</p>
            </div>
            <div className="w-12 h-12 bg-success-500 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Services</p>
              <p className="text-2xl font-ginto font-bold text-neutral-900 mt-1">{pricingData.filter(item => item.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Services</p>
              <p className="text-2xl font-ginto font-bold text-neutral-900 mt-1">{pricingData.length}</p>
            </div>
            <div className="w-12 h-12 bg-accent-500 rounded-2xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingControl;