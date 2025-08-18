import React, { useState } from "react";
import { ArrowLeft, Target, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import bet9jaIcon from "../../assets/icons/bet9ja.png";
import sportybetIcon from "../../assets/icons/sportybet.png";
import nairabetIcon from "../../assets/icons/nairabet.png";
import betkingIcon from "../../assets/icons/betking.svg";
import x1betIcon from "../../assets/icons/1xbet.png";
import betwayIcon from "../../assets/icons/betway.png";
import defaultIcon from "../../assets/icons/default.svg";

interface BettingPageProps {
  user: any;
  onLogout: () => void;
}

const BettingPage: React.FC<BettingPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const bettingPlatforms = [
    {
      id: "bet9ja",
      name: "Bet9ja",
      icon: bet9jaIcon || defaultIcon,
      description: "Nigeria's number 1 betting site",
    },
    {
      id: "sportybet",
      name: "SportyBet",
      icon: sportybetIcon || defaultIcon,
      description: "Your winning partner",
    },
    {
      id: "nairabet",
      name: "NairaBet",
      icon: nairabetIcon || defaultIcon,
      description: "Bet with the best",
    },
    {
      id: "betking",
      name: "BetKing",
      icon: betkingIcon || defaultIcon,
      description: "King of betting",
    },
    {
      id: "1xbet",
      name: "1xBet",
      icon: x1betIcon || defaultIcon,
      description: "High odds, fast payouts",
    },
    {
      id: "betway",
      name: "Betway",
      icon: betwayIcon || defaultIcon,
      description: "Bet your way",
    },
  ];

  const validateUserId = (id: string) => {
    if (!id) return "User ID is required";
    if (id.length < 3) return "User ID must be at least 3 characters";
    return null;
  };

  const validateAmount = (amt: string) => {
    if (!amt) return "Amount is required";
    const numAmount = Number(amt);
    if (isNaN(numAmount) || numAmount < 100) return "Minimum amount is ₦100";
    if (numAmount > 100000) return "Maximum amount is ₦100,000";
    return null;
  };

  const handleUserIdChange = (value: string) => {
    setUserId(value);

    const error = validateUserId(value);
    setErrors((prev: any) => ({ ...prev, userId: error }));
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setAmount(cleaned);

    const error = validateAmount(cleaned);
    setErrors((prev: any) => ({ ...prev, amount: error }));
  };

  const handleSubmit = () => {
    const userIdError = validateUserId(userId);
    const amountError = validateAmount(amount);

    const newErrors: any = {};
    if (!selectedPlatform)
      newErrors.platform = "Please select a betting platform";
    if (userIdError) newErrors.userId = userIdError;
    if (amountError) newErrors.amount = amountError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmPurchase = () => {
    // Simulate purchase
    setShowConfirmModal(false);
    // Show success message and redirect
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const selectedPlatformData = bettingPlatforms.find(
    (p) => p.id === selectedPlatform
  );

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
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Betting Payments
              </h1>
              <p className="text-gray-600">
                Fund your betting account instantly
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Platform Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Betting Platform
            </label>
            <div className="grid grid-cols-2 gap-3">
              {bettingPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 border-2 rounded-2xl transition-all flex flex-col items-center ${
                    selectedPlatform === platform.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-8 h-8 object-contain mx-auto mb-2 rounded-lg shadow"
                  />
                  <p className="font-medium text-sm">{platform.name}</p>
                  <p className="text-xs text-gray-600">
                    {platform.description}
                  </p>
                </button>
              ))}
            </div>
            {errors.platform && (
              <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
            )}
          </div>

          {/* User ID Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID / Account Number
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => handleUserIdChange(e.target.value)}
              placeholder="Enter your betting account ID"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.userId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₦100 - ₦100,000)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Enter amount to fund"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Continue
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-2xl">
            <h4 className="font-medium text-yellow-900 mb-2">
              Important Notice:
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Ensure your account ID is correct</li>
              <li>• Funds are credited instantly</li>
              <li>• Minimum funding amount is ₦100</li>
              <li>• Contact support if you encounter any issues</li>
            </ul>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && selectedPlatformData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Payment
                </h3>
                <p className="text-gray-600">
                  Please review your betting account funding
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform</span>
                  <span className="font-medium">
                    {selectedPlatformData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-medium">{userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">
                    ₦{Number(amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Charges</span>
                  <span className="font-medium">₦0.00</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₦{Number(amount).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  className="flex-1 py-3 bg-[#13070C] text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
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
      </div>
    </DashboardLayout>
  );
};

export default BettingPage;
