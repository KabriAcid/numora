import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import WalletCard from '../ui/WalletCard';
import TransactionChart from '../ui/TransactionChart';
import SpendingChart from '../ui/SpendingChart';
import RecentTransactions from '../ui/RecentTransactions';

interface WalletPageProps {
  user: any;
  onLogout: () => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
            <p className="text-gray-600">Manage your funds and view transaction history</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Wallet Card */}
          <WalletCard user={user} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransactionChart />
            <SpendingChart />
          </div>

          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;