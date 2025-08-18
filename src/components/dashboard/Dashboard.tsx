import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import WalletCard from "../ui/WalletCard";
import ServiceGrid from "../ui/ServiceGrid";
import TransactionChart from "../ui/TransactionChart";
import SpendingChart from "../ui/SpendingChart";
import RecentTransactions from "../ui/RecentTransactions";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
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
      <div className="p-4 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#13070C] mb-2">
            Hello, {user.name.split(" ")[0]}
          </h1>
          <p className="text-gray-600">Start paying your bills with us</p>
        </div>

        {/* Wallet Section */}
        <div className="mb-8">
          <WalletCard user={user} />
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#13070C] mb-6">
            Quick Services
          </h2>
          <ServiceGrid />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#13070C] mb-4">
              Daily Transactions
            </h3>
            <TransactionChart />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#13070C] mb-4">
              Bill Distribution
            </h3>
            <SpendingChart />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-[#13070C]">
              Recent Transactions
            </h3>
          </div>
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

export default Dashboard;
