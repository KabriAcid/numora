import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  Wifi,
  Zap,
  Tv,
  Calendar
} from 'lucide-react';

interface Transaction {
  id: string;
  user_name: string;
  user_email: string;
  service: string;
  service_type: 'airtime' | 'data' | 'electricity' | 'cable' | 'exam_pin';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  created_at: string;
  completed_at?: string;
}

const TransactionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Mock data - replace with actual API calls
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      user_name: 'John Doe',
      user_email: 'john.doe@email.com',
      service: 'MTN Airtime ₦1000',
      service_type: 'airtime',
      amount: 1000,
      status: 'completed',
      reference: 'MTN_1642680000_001',
      created_at: '2024-01-20 14:30:00',
      completed_at: '2024-01-20 14:30:15'
    },
    {
      id: 'TXN002',
      user_name: 'Jane Smith',
      user_email: 'jane.smith@email.com',
      service: 'GLO 2GB Data',
      service_type: 'data',
      amount: 500,
      status: 'completed',
      reference: 'GLO_1642679000_002',
      created_at: '2024-01-20 14:15:00',
      completed_at: '2024-01-20 14:15:08'
    },
    {
      id: 'TXN003',
      user_name: 'Mike Johnson',
      user_email: 'mike.johnson@email.com',
      service: 'PHCN Electricity ₦5000',
      service_type: 'electricity',
      amount: 5000,
      status: 'pending',
      reference: 'PHCN_1642678000_003',
      created_at: '2024-01-20 14:00:00'
    },
    {
      id: 'TXN004',
      user_name: 'Sarah Wilson',
      user_email: 'sarah.wilson@email.com',
      service: 'DSTV Compact Subscription',
      service_type: 'cable',
      amount: 8800,
      status: 'completed',
      reference: 'DSTV_1642677000_004',
      created_at: '2024-01-20 13:45:00',
      completed_at: '2024-01-20 13:45:22'
    },
    {
      id: 'TXN005',
      user_name: 'David Brown',
      user_email: 'david.brown@email.com',
      service: 'Airtel 1GB Data',
      service_type: 'data',
      amount: 300,
      status: 'failed',
      reference: 'AIRTEL_1642676000_005',
      created_at: '2024-01-20 13:30:00'
    }
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesService = serviceFilter === 'all' || transaction.service_type === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-success-100 text-success-700',
      pending: 'bg-warning-100 text-warning-700',
      failed: 'bg-error-100 text-error-700'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      completed: CheckCircle,
      pending: Clock,
      failed: XCircle
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const getServiceIcon = (serviceType: string) => {
    const icons = {
      airtime: Smartphone,
      data: Wifi,
      electricity: Zap,
      cable: Tv,
      exam_pin: Calendar
    };
    return icons[serviceType as keyof typeof icons] || Smartphone;
  };

  const getServiceColor = (serviceType: string) => {
    const colors = {
      airtime: 'text-primary-500',
      data: 'text-accent-500',
      electricity: 'text-warning-500',
      cable: 'text-info-500',
      exam_pin: 'text-success-500'
    };
    return colors[serviceType as keyof typeof colors] || 'text-primary-500';
  };

  const viewTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const exportTransactions = () => {
    // Implement CSV export functionality
    console.log('Exporting transactions...');
  };

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = filteredTransactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending').length;
  const failedTransactions = filteredTransactions.filter(t => t.status === 'failed').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-ginto font-bold text-neutral-900">Transaction Management</h1>
          <p className="text-neutral-600 mt-1">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
          </select>
          <button
            onClick={exportTransactions}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Amount', value: `₦${totalAmount.toLocaleString()}`, icon: CreditCard, color: 'primary' },
          { title: 'Completed', value: completedTransactions.toString(), icon: CheckCircle, color: 'success' },
          { title: 'Pending', value: pendingTransactions.toString(), icon: Clock, color: 'warning' },
          { title: 'Failed', value: failedTransactions.toString(), icon: XCircle, color: 'error' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                <p className="text-2xl font-ginto font-bold text-neutral-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                stat.color === 'primary' ? 'bg-primary-500' :
                stat.color === 'success' ? 'bg-success-500' :
                stat.color === 'warning' ? 'bg-warning-500' : 'bg-error-500'
              } text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by user, service, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Services</option>
          <option value="airtime">Airtime</option>
          <option value="data">Data</option>
          <option value="electricity">Electricity</option>
          <option value="cable">Cable TV</option>
          <option value="exam_pin">Exam Pins</option>
        </select>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredTransactions.map((transaction) => {
                const StatusIcon = getStatusIcon(transaction.status);
                const ServiceIcon = getServiceIcon(transaction.service_type);
                return (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-neutral-900">{transaction.id}</p>
                        <p className="text-sm text-neutral-500">{transaction.reference}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-neutral-900">{transaction.user_name}</p>
                        <p className="text-sm text-neutral-500">{transaction.user_email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <ServiceIcon className={`w-5 h-5 ${getServiceColor(transaction.service_type)}`} />
                        <span className="text-sm text-neutral-900">{transaction.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-neutral-900">
                        ₦{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{transaction.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-neutral-900">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {new Date(transaction.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => viewTransactionDetails(transaction)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-ginto font-semibold text-neutral-900">Transaction Details</h3>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Transaction Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {React.createElement(getServiceIcon(selectedTransaction.service_type), {
                    className: `w-8 h-8 ${getServiceColor(selectedTransaction.service_type)}`
                  })}
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">{selectedTransaction.service}</h4>
                    <p className="text-neutral-600">{selectedTransaction.id}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedTransaction.status)}`}>
                  {React.createElement(getStatusIcon(selectedTransaction.status), { className: "w-4 h-4" })}
                  <span>{selectedTransaction.status}</span>
                </span>
              </div>

              {/* Amount */}
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm font-medium text-neutral-600 mb-1">Transaction Amount</p>
                <p className="text-3xl font-ginto font-bold text-neutral-900">
                  ₦{selectedTransaction.amount.toLocaleString()}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 mb-1">User Information</p>
                    <p className="text-neutral-900">{selectedTransaction.user_name}</p>
                    <p className="text-sm text-neutral-600">{selectedTransaction.user_email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 mb-1">Reference</p>
                    <p className="text-neutral-900 font-mono text-sm">{selectedTransaction.reference}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 mb-1">Created At</p>
                    <p className="text-neutral-900">
                      {new Date(selectedTransaction.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedTransaction.completed_at && (
                    <div>
                      <p className="text-sm font-medium text-neutral-600 mb-1">Completed At</p>
                      <p className="text-neutral-900">
                        {new Date(selectedTransaction.completed_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;