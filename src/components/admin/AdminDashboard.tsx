import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  CreditCard, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Smartphone,
  Wifi,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Revenue',
      value: '₦2,847,500',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Transactions',
      value: '8,432',
      change: '+15.3%',
      trend: 'up',
      icon: CreditCard,
      color: 'accent'
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+0.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'info'
    }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 1200000, transactions: 450 },
    { name: 'Feb', revenue: 1350000, transactions: 520 },
    { name: 'Mar', revenue: 1180000, transactions: 480 },
    { name: 'Apr', revenue: 1680000, transactions: 650 },
    { name: 'May', revenue: 1920000, transactions: 720 },
    { name: 'Jun', revenue: 2100000, transactions: 820 },
    { name: 'Jul', revenue: 2847500, transactions: 950 }
  ];

  const serviceData = [
    { name: 'Airtime', value: 35, color: '#0ea5e9' },
    { name: 'Data', value: 28, color: '#d946ef' },
    { name: 'Electricity', value: 20, color: '#22c55e' },
    { name: 'Cable TV', value: 12, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#ef4444' }
  ];

  const recentTransactions = [
    { id: 1, user: 'John Doe', service: 'MTN Airtime', amount: 5000, status: 'completed', time: '2 mins ago' },
    { id: 2, user: 'Jane Smith', service: 'GLO Data', amount: 2500, status: 'completed', time: '5 mins ago' },
    { id: 3, user: 'Mike Johnson', service: 'PHCN Bill', amount: 15000, status: 'pending', time: '8 mins ago' },
    { id: 4, user: 'Sarah Wilson', service: 'DSTV Subscription', amount: 8500, status: 'completed', time: '12 mins ago' },
    { id: 5, user: 'David Brown', service: 'Airtel Data', amount: 3000, status: 'failed', time: '15 mins ago' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      success: 'bg-success-500 text-white',
      primary: 'bg-primary-500 text-white',
      accent: 'bg-accent-500 text-white',
      info: 'bg-info-500 text-white'
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-success-100 text-success-700',
      pending: 'bg-warning-100 text-warning-700',
      failed: 'bg-error-100 text-error-700'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-ginto font-bold text-neutral-900">Dashboard Overview</h1>
          <p className="text-neutral-600 mt-1">Monitor your VTU platform performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stats-card group hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                <p className="text-2xl font-ginto font-bold text-neutral-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-success-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-error-500" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    stat.trend === 'up' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 chart-container"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-ginto font-semibold text-neutral-900">Revenue Trend</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-neutral-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                <span className="text-neutral-600">Transactions</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="chart-container"
        >
          <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceData.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: service.color }}
                  ></div>
                  <span className="text-neutral-600">{service.name}</span>
                </div>
                <span className="font-medium text-neutral-900">{service.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-100"
      >
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-ginto font-semibold text-neutral-900">Recent Transactions</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {transaction.user.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-neutral-900">{transaction.user}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {transaction.service.includes('Airtime') && <Smartphone className="w-4 h-4 text-primary-500" />}
                      {transaction.service.includes('Data') && <Wifi className="w-4 h-4 text-accent-500" />}
                      {transaction.service.includes('PHCN') && <Zap className="w-4 h-4 text-warning-500" />}
                      {transaction.service.includes('DSTV') && <Activity className="w-4 h-4 text-info-500" />}
                      <span className="text-sm text-neutral-900">{transaction.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    ₦{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {transaction.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;