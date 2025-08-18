import React, { useState } from "react";
import { ArrowLeft, Wifi, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import mtnIcon from "../../assets/icons/mtn.svg";
import gloIcon from "../../assets/icons/glo.png";
import airtelIcon from "../../assets/icons/airtel-logo1.png";
import nineMobileIcon from "../../assets/icons/9mobile.png";

interface DataPageProps {
  user: any;
  onLogout: () => void;
}

const DataPage: React.FC<DataPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const networks = [
    {
      id: "mtn",
      name: "MTN",
      icon: mtnIcon,
      prefixes: [
        "0803",
        "0806",
        "0703",
        "0706",
        "0813",
        "0816",
        "0810",
        "0814",
        "0903",
        "0906",
        "0913",
        "0916",
      ],
    },
    {
      id: "airtel",
      name: "Airtel",
      icon: airtelIcon,
      prefixes: [
        "0802",
        "0808",
        "0708",
        "0812",
        "0701",
        "0902",
        "0907",
        "0901",
        "0912",
      ],
    },
    {
      id: "glo",
      name: "Glo",
      icon: gloIcon,
      prefixes: ["0805", "0807", "0705", "0815", "0811", "0905"],
    },
    {
      id: "9mobile",
      name: "9mobile",
      icon: nineMobileIcon,
      prefixes: ["0809", "0817", "0818", "0909", "0908"],
    },
  ];

  const dataPlans = {
    mtn: [
      { id: "1gb_30", name: "1GB", validity: "30 Days", price: 350 },
      { id: "2gb_30", name: "2GB", validity: "30 Days", price: 700 },
      { id: "5gb_30", name: "5GB", validity: "30 Days", price: 1500 },
      { id: "10gb_30", name: "10GB", validity: "30 Days", price: 3000 },
    ],
    glo: [
      { id: "1gb_30", name: "1GB", validity: "30 Days", price: 400 },
      { id: "2gb_30", name: "2GB", validity: "30 Days", price: 800 },
      { id: "5gb_30", name: "5GB", validity: "30 Days", price: 1600 },
      { id: "10gb_30", name: "10GB", validity: "30 Days", price: 3200 },
    ],
    airtel: [
      { id: "1gb_30", name: "1GB", validity: "30 Days", price: 380 },
      { id: "2gb_30", name: "2GB", validity: "30 Days", price: 750 },
      { id: "5gb_30", name: "5GB", validity: "30 Days", price: 1550 },
      { id: "10gb_30", name: "10GB", validity: "30 Days", price: 3100 },
    ],
    "9mobile": [
      { id: "1gb_30", name: "1GB", validity: "30 Days", price: 420 },
      { id: "2gb_30", name: "2GB", validity: "30 Days", price: 840 },
      { id: "5gb_30", name: "5GB", validity: "30 Days", price: 1700 },
      { id: "10gb_30", name: "10GB", validity: "30 Days", price: 3400 },
    ],
  };

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

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 11);
    setPhoneNumber(cleaned);

    if (cleaned.length >= 4) {
      const prefix = cleaned.substring(0, 4);
      const detectedNetwork = networks.find((n) => n.prefixes.includes(prefix));
      if (detectedNetwork && !selectedNetwork) {
        setSelectedNetwork(detectedNetwork.id);
        setSelectedPlan(""); // Reset plan when network changes
      }
    }

    const error = validatePhoneNumber(cleaned);
    setErrors((prev: { [key: string]: string | null }) => ({
      ...prev,
      phoneNumber: error,
    }));
  };

  const handleNetworkChange = (networkId: string) => {
    setSelectedNetwork(networkId);
    setSelectedPlan(""); // Reset plan when network changes
  };

  const handleSubmit = () => {
    const phoneError = validatePhoneNumber(phoneNumber);

    const newErrors: any = {};
    if (phoneError) newErrors.phoneNumber = phoneError;
    if (!selectedNetwork) newErrors.network = "Please select a network";
    if (!selectedPlan) newErrors.plan = "Please select a data plan";

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

  const selectedPlanDetails =
    selectedNetwork && selectedPlan
      ? dataPlans[selectedNetwork as keyof typeof dataPlans]?.find(
          (p) => p.id === selectedPlan
        )
      : null;

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
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
              <Wifi className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Buy Data</h1>
              <p className="text-gray-600">
                Purchase data bundles for your device
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
                  onClick={() => handleNetworkChange(network.id)}
                  className={`p-4 border-2 rounded-2xl transition-all flex flex-col items-center ${
                    selectedNetwork === network.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={network.icon}
                    alt={network.name}
                    className="w-8 h-8 object-contain mx-auto mb-2 rounded-lg shadow"
                  />
                  <p className="font-medium text-sm">{network.name}</p>
                </button>
              ))}
            </div>
            {errors.network && (
              <p className="text-red-500 text-sm mt-1">{errors.network}</p>
            )}
          </div>

          {/* Data Plan Selection */}
          {selectedNetwork && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Data Plan
              </label>
              <div className="space-y-3">
                {dataPlans[selectedNetwork as keyof typeof dataPlans]?.map(
                  (plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full p-4 border-2 rounded-2xl transition-all text-left ${
                        selectedPlan === plan.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{plan.name}</p>
                          <p className="text-sm text-gray-600">
                            {plan.validity}
                          </p>
                        </div>
                        <p className="font-bold text-lg">₦{plan.price}</p>
                      </div>
                    </button>
                  )
                )}
              </div>
              {errors.plan && (
                <p className="text-red-500 text-sm mt-1">{errors.plan}</p>
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
        {showConfirmModal && selectedPlanDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Purchase
                </h3>
                <p className="text-gray-600">
                  Please review your data purchase
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium">
                    {networks.find((n) => n.id === selectedNetwork)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Number</span>
                  <span className="font-medium">{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Plan</span>
                  <span className="font-medium">
                    {selectedPlanDetails.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-medium">
                    {selectedPlanDetails.validity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">
                    ₦{selectedPlanDetails.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Charges</span>
                  <span className="font-medium">₦0.00</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₦{selectedPlanDetails.price}</span>
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
      </div>
    </DashboardLayout>
  );
};

export default DataPage;
