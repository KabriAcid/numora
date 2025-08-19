import React, { useState } from "react";
import { ArrowLeft, RefreshCw, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import mtnIcon from "../../assets/icons/mtn.svg";
import gloIcon from "../../assets/icons/glo.png";
import airtelIcon from "../../assets/icons/airtel-logo1.png";
import nineMobileIcon from "../../assets/icons/9mobile.png";
import defaultIcon from "../../assets/icons/default.svg";

interface AirtimeToCashPageProps {
  user: any;
  onLogout: () => void;
}

const AirtimeToCashPage: React.FC<AirtimeToCashPageProps> = ({
  user,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const networks = [
    {
      id: "mtn",
      name: "MTN",
      icon: mtnIcon || defaultIcon,
      rate: 0.85,
      prefixes: [
        "0803",
        "0806",
        "0813",
        "0816",
        "0903",
        "0906",
        "0913",
        "0916",
      ],
    },
    {
      id: "glo",
      name: "Glo",
      icon: gloIcon || defaultIcon,
      rate: 0.8,
      prefixes: ["0805", "0807", "0815", "0811", "0905", "0915"],
    },
    {
      id: "airtel",
      name: "Airtel",
      icon: airtelIcon || defaultIcon,
      rate: 0.82,
      prefixes: ["0802", "0808", "0812", "0901", "0902", "0907", "0912"],
    },
    {
      id: "9mobile",
      name: "9mobile",
      icon: nineMobileIcon || defaultIcon,
      rate: 0.78,
      prefixes: ["0809", "0817", "0818", "0909", "0908"],
    },
  ];

  const validatePhoneNumber = (phone: string) => {
    if (!phone) return "Phone number is required";
    if (phone.length !== 11) return "Phone number must be 11 digits";
    if (!phone.startsWith("0")) return "Phone number must start with 0";

    const prefix = phone.substring(0, 4);
    const network = networks.find((n) => n.prefixes.includes(prefix));
    if (!network) return "Invalid network prefix";

    if (selectedNetwork && network.id !== selectedNetwork) {
      return `This number belongs to ${network.name}, but you selected ${
        networks.find((n) => n.id === selectedNetwork)?.name
      }`;
    }

    return null;
  };
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

  const validateAmount = (amt: string) => {
    if (!amt) return "Amount is required";
    const numAmount = Number(amt);
    if (isNaN(numAmount) || numAmount < 100) return "Minimum amount is ₦100";
    if (numAmount > 50000) return "Maximum amount is ₦50,000";
    return null;
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 11);
    setPhoneNumber(cleaned);

    if (cleaned.length >= 4) {
      const prefix = cleaned.substring(0, 4);
      const detectedNetwork = networks.find((n) => n.prefixes.includes(prefix));
      if (detectedNetwork && !selectedNetwork) {
        setSelectedNetwork(detectedNetwork.id);
      }
    }

    const error = validatePhoneNumber(cleaned);
    setErrors((prev: typeof errors) => ({ ...prev, phoneNumber: error }));
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setAmount(cleaned);

    const error = validateAmount(cleaned);
    setErrors((prev: typeof errors) => ({ ...prev, amount: error }));
  };

  const handleSubmit = () => {
    const phoneError = validatePhoneNumber(phoneNumber);
    const amountError = validateAmount(amount);

    const newErrors: any = {};
    if (phoneError) newErrors.phoneNumber = phoneError;
    if (!selectedNetwork) newErrors.network = "Please select a network";
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

  const selectedNetworkData = networks.find((n) => n.id === selectedNetwork);
  const creditedAmount =
    selectedNetworkData && amount
      ? Math.floor(Number(amount) * selectedNetworkData.rate)
      : 0;

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          {/* Removed SVG sign out button for consistent header layout */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
              <RefreshCw className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Airtime to Cash
              </h1>
              <p className="text-gray-600">
                Convert your airtime to cash instantly
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="08012345678"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Network Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Network
            </label>
            <div className="grid grid-cols-2 gap-3">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => setSelectedNetwork(network.id)}
                  className={`p-4 border-2 rounded-2xl transition-all flex flex-col items-center ${
                    selectedNetwork === network.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={network.icon || defaultIcon}
                    alt={network.name}
                    className="w-8 h-8 object-contain mx-auto mb-2 rounded-lg shadow"
                  />
                  <p className="font-medium text-sm">{network.name}</p>
                  <p className="text-xs text-gray-600">
                    {(network.rate * 100).toFixed(0)}% rate
                  </p>
                </button>
              ))}
            </div>
            {errors.network && (
              <p className="text-red-500 text-sm mt-1">{errors.network}</p>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Airtime Amount (₦100 - ₦50,000)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Enter airtime amount"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Conversion Preview */}
          {selectedNetworkData && amount && !errors.amount && (
            <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">You will receive:</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₦{creditedAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Rate:</p>
                  <p className="font-medium">
                    {(selectedNetworkData.rate * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Continue
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
            <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Enter your phone number and airtime amount</li>
              <li>• We'll send you instructions via SMS</li>
              <li>• Transfer the airtime as instructed</li>
              <li>• Cash will be credited to your wallet instantly</li>
            </ul>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && selectedNetworkData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Conversion
                </h3>
                <p className="text-gray-600">
                  Please review your airtime to cash conversion
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium">
                    {selectedNetworkData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Number</span>
                  <span className="font-medium">{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Airtime Amount</span>
                  <span className="font-medium">
                    ₦{Number(amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-medium">
                    {(selectedNetworkData.rate * 100).toFixed(0)}%
                  </span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-green-600">
                  <span>You'll Receive</span>
                  <span>₦{creditedAmount.toLocaleString()}</span>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#13070C]">Sign Out</h2>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Are you sure you want to sign out?
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelLogout}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-2xl font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AirtimeToCashPage;
