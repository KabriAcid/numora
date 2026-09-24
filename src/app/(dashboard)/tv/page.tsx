import React, { useState } from "react";
import { ArrowLeft, Tv, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import dstvIcon from "../../assets/icons/dstv.png";
import gotvIcon from "../../assets/icons/gotv.png";
import startimesIcon from "../../assets/icons/startimes.png";

interface TVSubscriptionPageProps {
  user: any;
  onLogout: () => void;
}

const TVSubscriptionPage: React.FC<TVSubscriptionPageProps> = ({
  user,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const providers = [
    { id: "dstv", name: "DStv", icon: dstvIcon },
    { id: "gotv", name: "GOtv", icon: gotvIcon },
    { id: "startimes", name: "StarTimes", icon: startimesIcon },
  ];

  const packages = {
    dstv: [
      { id: "padi", name: "DStv Padi", price: 2500, duration: "1 Month" },
      { id: "yanga", name: "DStv Yanga", price: 3500, duration: "1 Month" },
      { id: "confam", name: "DStv Confam", price: 6200, duration: "1 Month" },
      {
        id: "compact",
        name: "DStv Compact",
        price: 10500,
        duration: "1 Month",
      },
      {
        id: "premium",
        name: "DStv Premium",
        price: 24500,
        duration: "1 Month",
      },
    ],
    gotv: [
      { id: "smallie", name: "GOtv Smallie", price: 1100, duration: "1 Month" },
      { id: "jinja", name: "GOtv Jinja", price: 2250, duration: "1 Month" },
      { id: "jolli", name: "GOtv Jolli", price: 3300, duration: "1 Month" },
      { id: "max", name: "GOtv Max", price: 4850, duration: "1 Month" },
    ],
    startimes: [
      { id: "nova", name: "Nova", price: 1200, duration: "1 Month" },
      { id: "basic", name: "Basic", price: 2200, duration: "1 Month" },
      { id: "smart", name: "Smart", price: 3000, duration: "1 Month" },
      { id: "classic", name: "Classic", price: 4200, duration: "1 Month" },
      { id: "super", name: "Super", price: 6500, duration: "1 Month" },
    ],
  };

  const validateSmartCardNumber = (number: string) => {
    if (!number) return "Smart card number is required";
    if (number.length < 10)
      return "Smart card number must be at least 10 digits";
    return null;
  };

  const handleSmartCardChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setSmartCardNumber(cleaned);

    const error = validateSmartCardNumber(cleaned);
    setErrors((prev: any) => ({ ...prev, smartCardNumber: error }));
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    setSelectedPackage(""); // Reset package when provider changes
  };

  const handleSubmit = () => {
    const smartCardError = validateSmartCardNumber(smartCardNumber);

    const newErrors: any = {};
    if (!selectedProvider) newErrors.provider = "Please select a TV provider";
    if (smartCardError) newErrors.smartCardNumber = smartCardError;
    if (!selectedPackage) newErrors.package = "Please select a package";

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

  const selectedPackageDetails =
    selectedProvider && selectedPackage
      ? packages[selectedProvider as keyof typeof packages]?.find(
          (p) => p.id === selectedPackage
        )
      : null;

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
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
              <Tv className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                TV Subscription
              </h1>
              <p className="text-gray-600">Renew your cable TV subscription</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Provider Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TV Provider
            </label>
            <div className="grid grid-cols-3 gap-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderChange(provider.id)}
                  className={`p-4 border-2 rounded-2xl transition-all flex flex-col items-center ${
                    selectedProvider === provider.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={provider.icon}
                    alt={provider.name}
                    className="w-8 h-8 object-contain mx-auto mb-2 rounded-lg shadow"
                  />
                  <p className="font-medium text-sm">{provider.name}</p>
                </button>
              ))}
            </div>
            {errors.provider && (
              <p className="text-red-500 text-sm mt-1">{errors.provider}</p>
            )}
          </div>

          {/* Smart Card Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Smart Card / IUC Number
            </label>
            <input
              type="text"
              value={smartCardNumber}
              onChange={(e) => handleSmartCardChange(e.target.value)}
              placeholder="Enter your smart card number"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.smartCardNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.smartCardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.smartCardNumber}
              </p>
            )}
          </div>

          {/* Package Selection */}
          {selectedProvider && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Package
              </label>
              <div className="space-y-3">
                {packages[selectedProvider as keyof typeof packages]?.map(
                  (pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-full p-4 border-2 rounded-2xl transition-all text-left ${
                        selectedPackage === pkg.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{pkg.name}</p>
                          <p className="text-sm text-gray-600">
                            {pkg.duration}
                          </p>
                        </div>
                        <p className="font-bold text-lg">
                          ₦{pkg.price.toLocaleString()}
                        </p>
                      </div>
                    </button>
                  )
                )}
              </div>
              {errors.package && (
                <p className="text-red-500 text-sm mt-1">{errors.package}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Continue
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && selectedPackageDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Subscription
                </h3>
                <p className="text-gray-600">
                  Please review your TV subscription
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-medium">
                    {providers.find((p) => p.id === selectedProvider)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Smart Card</span>
                  <span className="font-medium">{smartCardNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package</span>
                  <span className="font-medium">
                    {selectedPackageDetails.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {selectedPackageDetails.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">
                    ₦{selectedPackageDetails.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Charges</span>
                  <span className="font-medium">₦0.00</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₦{selectedPackageDetails.price.toLocaleString()}</span>
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

export default TVSubscriptionPage;
