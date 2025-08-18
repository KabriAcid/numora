import React, { useState } from "react";
import { ArrowLeft, Zap, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import ekoIcon from "../../assets/icons/eko.png";
import ikejaIcon from "../../assets/icons/Ikeja-Electric.png";
import abujaIcon from "../../assets/icons/glo.png";
import kanoIcon from "../../assets/icons/glo.png";
import portharcourtIcon from "../../assets/icons/glo.png";
import ibadanIcon from "../../assets/icons/glo.png";

interface ElectricityPageProps {
  user: any;
  onLogout: () => void;
}

const ElectricityPage: React.FC<ElectricityPageProps> = ({
  user,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [selectedDisco, setSelectedDisco] = useState("");
  const [meterType, setMeterType] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const discos = [
    { id: "eko", name: "Eko Electric", icon: ekoIcon },
    { id: "ikeja", name: "Ikeja Electric", icon: ikejaIcon },
    { id: "abuja", name: "Abuja Electric", icon: abujaIcon },
    { id: "kano", name: "Kano Electric", icon: kanoIcon },
    {
      id: "portharcourt",
      name: "Port Harcourt Electric",
      icon: portharcourtIcon,
    },
    { id: "ibadan", name: "Ibadan Electric", icon: ibadanIcon },
  ];

  const meterTypes = [
    { id: "prepaid", name: "Prepaid", description: "Pay before use" },
    { id: "postpaid", name: "Postpaid", description: "Pay after use" },
  ];

  const validateMeterNumber = (number: string) => {
    if (!number) return "Meter number is required";
    if (number.length < 10) return "Meter number must be at least 10 digits";
    return null;
  };

  const validateAmount = (amt: string) => {
    if (!amt) return "Amount is required";
    const numAmount = Number(amt);
    if (isNaN(numAmount) || numAmount < 500) return "Minimum amount is ₦500";
    if (numAmount > 100000) return "Maximum amount is ₦100,000";
    return null;
  };

  const handleMeterNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setMeterNumber(cleaned);

    const error = validateMeterNumber(cleaned);
    setErrors((prev: { [key: string]: string | null }) => ({
      ...prev,
      meterNumber: error,
    }));
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setAmount(cleaned);

    const error = validateAmount(cleaned);
    setErrors((prev: { [key: string]: string | null }) => ({
      ...prev,
      amount: error,
    }));
  };

  const handleSubmit = () => {
    const meterError = validateMeterNumber(meterNumber);
    const amountError = validateAmount(amount);

    const newErrors: any = {};
    if (!selectedDisco)
      newErrors.disco = "Please select a distribution company";
    if (!meterType) newErrors.meterType = "Please select meter type";
    if (meterError) newErrors.meterNumber = meterError;
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
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Electricity Bills
              </h1>
              <p className="text-gray-600">
                Pay your electricity bills instantly
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Distribution Company Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distribution Company
            </label>
            <div className="grid grid-cols-2 gap-3">
              {discos.map((disco) => (
                <button
                  key={disco.id}
                  onClick={() => setSelectedDisco(disco.id)}
                  className={`p-4 border-2 rounded-2xl transition-all flex flex-col items-center ${
                    selectedDisco === disco.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={disco.icon}
                    alt={disco.name}
                    className="w-8 h-8 object-contain mx-auto mb-2 rounded-lg shadow"
                  />
                  <p className="font-medium text-sm">{disco.name}</p>
                </button>
              ))}
            </div>
            {errors.disco && (
              <p className="text-red-500 text-sm mt-1">{errors.disco}</p>
            )}
          </div>

          {/* Meter Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meter Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {meterTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setMeterType(type.id)}
                  className={`p-4 border-2 rounded-2xl transition-all text-left ${
                    meterType === type.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium">{type.name}</p>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>
            {errors.meterType && (
              <p className="text-red-500 text-sm mt-1">{errors.meterType}</p>
            )}
          </div>

          {/* Meter Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meter Number
            </label>
            <input
              type="text"
              value={meterNumber}
              onChange={(e) => handleMeterNumberChange(e.target.value)}
              placeholder="Enter your meter number"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.meterNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.meterNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.meterNumber}</p>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₦500 - ₦100,000)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Enter amount"
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
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
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
                  Please review your electricity bill payment
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Distribution Company</span>
                  <span className="font-medium">
                    {discos.find((d) => d.id === selectedDisco)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meter Type</span>
                  <span className="font-medium capitalize">{meterType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meter Number</span>
                  <span className="font-medium">{meterNumber}</span>
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
      </div>
    </DashboardLayout>
  );
};

export default ElectricityPage;
