import React from 'react';
import { Wifi, Phone, Zap, Target, Tv, MoreHorizontal } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const transactions = [
    {
      id: 1,
      type: 'Mobile data',
      amount: 644.00,
      status: 'Pending',
      date: 'Nov 8, 2023',
      time: '10:35 AM',
      transactionId: 'BDG3T68Ys3',
      icon: Wifi,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'Airtime',
      amount: 600.00,
      status: 'Successful',
      date: 'Nov 5, 2023',
      time: '06:42 AM',
      transactionId: 'BDG4326kJ39',
      icon: Phone,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'Electricity',
      amount: 250.00,
      status: 'Successful',
      date: 'Nov 4, 2023',
      time: '08:06 PM',
      transactionId: 'BDG48348E46',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'Betting',
      amount: 1800.00,
      status: 'Successful',
      date: 'Oct 31, 2023',
      time: '10:10 PM',
      transactionId: 'BDG36661703',
      icon: Target,
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'Cable TV',
      amount: 5020.00,
      status: 'Failed',
      date: 'Oct 26, 2023',
      time: '02:55 PM',
      transactionId: 'BDG15592A50',
      icon: Tv,
      color: 'text-purple-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Successful':
        return '●';
      case 'Pending':
        return '●';
      case 'Failed':
        return '●';
      default:
        return '●';
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((transaction) => {
        const Icon = transaction.icon;
        return (
          <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${transaction.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 truncate">
                      {transaction.type}
                    </h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      <span className="mr-1">{getStatusIcon(transaction.status)}</span>
                      {transaction.status}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                    <span>{transaction.date}</span>
                    <span>•</span>
                    <span>{transaction.time}</span>
                    <span>•</span>
                    <span className="font-mono text-xs">{transaction.transactionId}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ₦{transaction.amount.toLocaleString()}
                  </div>
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="p-4 text-center">
        <button className="text-[#13070C] hover:underline font-medium">
          View all transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;