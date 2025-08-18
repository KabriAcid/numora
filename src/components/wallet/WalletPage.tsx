import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import WalletCard from "../ui/WalletCard";
import TransactionChart from "../ui/TransactionChart";
import SpendingChart from "../ui/SpendingChart";
import RecentTransactions from "../ui/RecentTransactions";

interface WalletPageProps {
  user: any;
  onLogout: () => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogoutClick}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
            <p className="text-gray-600">
              Manage your funds and view transaction history
            </p>
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
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to logout?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelLogout}
                className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-3 bg-[#13070C] text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default WalletPage;
