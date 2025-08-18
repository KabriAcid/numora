import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  Info,
  Fingerprint,
  Banknote,
  Check,
  ChevronRight,
} from "lucide-react";
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

  const [profileCollapsed, setProfileCollapsed] = useState(false);
  const profileSteps = [
    {
      label: "Create account",
      description: "Create Numora account",
      icon: "UserPlus",
      completed: true,
    },
    {
      label: "Verify email",
      description: "Verify your email address",
      icon: "Mail",
      completed: false,
    },
    {
      label: "Add basic information",
      description: "Start paying your bills",
      icon: "Info",
      completed: false,
    },
    {
      label: "Link BVN",
      description: "Link BVN to be able to withdraw",
      icon: "Fingerprint",
      completed: false,
    },
    {
      label: "Add bank details",
      description: "Save your bank details",
      icon: "Banknote",
      completed: false,
    },
  ];

  return (
    <DashboardLayout user={user} onLogout={handleLogoutClick}>
      <div className="p-4 lg:p-8">
        {/* Profile Completion Section */}
        <div className="mb-8 w-full bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-medium text-secondary">
                Complete your profile setup
              </h2>
              <span className="text-sm text-gray-600">
                Finish setting up your account to enjoy Numora fully
              </span>
            </div>
            <span className="text-sm font-bold text-primary">20% complete</span>
          </div>
          <div className="w-full bg-primary rounded-full h-2 mb-6">
            <div
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: "20%" }}
            ></div>
          </div>
          <button
            className="text-xs text-gray-500 hover:underline mb-4"
            onClick={() => setProfileCollapsed((prev) => !prev)}
          >
            {profileCollapsed ? "Show more" : "Show less"}
          </button>
          {!profileCollapsed && (
            <ul className="space-y-3">
              {profileSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="bg-primary rounded-xl p-2">
                    {step.icon === "UserPlus" && (
                      <UserPlus className="w-6 h-6 text-secondary" />
                    )}
                    {step.icon === "Mail" && (
                      <Mail className="w-6 h-6 text-secondary" />
                    )}
                    {step.icon === "Info" && (
                      <Info className="w-6 h-6 text-secondary" />
                    )}
                    {step.icon === "Fingerprint" && (
                      <Fingerprint className="w-6 h-6 text-secondary" />
                    )}
                    {step.icon === "Banknote" && (
                      <Banknote className="w-6 h-6 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-secondary">
                      {step.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {step.description}
                    </div>
                  </div>
                  <div
                    className={
                      step.completed ? "text-success" : "text-gray-400"
                    }
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
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
