import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import WalletCard from '../ui/WalletCard';
import ServiceGrid from '../ui/ServiceGrid';
import TransactionChart from '../ui/TransactionChart';
import SpendingChart from '../ui/SpendingChart';
import RecentTransactions from '../ui/RecentTransactions';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="p-4 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#13070C] mb-2">
            Hello, Kabri
          </h1>
          <p className="text-gray-600">Start paying your bills with us</p>
        </div>

        {/* Wallet Section */}
        <div className="mb-8">
          <WalletCard user={user} />
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#13070C] mb-6">Quick Services</h2>
          <ServiceGrid />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#13070C] mb-4">Daily Transactions</h3>
            <TransactionChart />
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#13070C] mb-4">Bill Distribution</h3>
            <SpendingChart />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-[#13070C]">Recent Transactions</h3>
          </div>
          <RecentTransactions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;