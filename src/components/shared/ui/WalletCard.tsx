import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import FundWalletModal from '../modals/FundWalletModal';
import WithdrawModal from '../modals/WithdrawModal';

interface WalletCardProps {
  user: any;
}

const WalletCard: React.FC<WalletCardProps> = ({ user }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-[#13070C] to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full transform -translate-y-1/2"></div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white text-opacity-80 text-sm">Wallet Balance</p>
                <p className="text-white text-opacity-60 text-xs">Available funds</p>
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-1">
              {showBalance ? `₦${user.balance.toLocaleString()}` : '₦***,***'}
            </h2>
            <p className="text-white text-opacity-60 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFundModal(true)}
              className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-2xl font-medium transition-all flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Fund Wallet
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 bg-transparent border border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-2xl font-medium transition-all flex items-center justify-center"
            >
              <ArrowUpRight className="w-5 h-5 mr-2" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {showFundModal && (
        <FundWalletModal onClose={() => setShowFundModal(false)} />
      )}

      {showWithdrawModal && (
        <WithdrawModal user={user} onClose={() => setShowWithdrawModal(false)} />
      )}
    </>
  );
};

export default WalletCard;