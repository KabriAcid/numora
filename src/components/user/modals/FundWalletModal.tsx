import React, { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';

interface FundWalletModalProps {
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<any>({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      description: 'Pay with your bank card',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Transfer from your bank account',
      icon: Banknote,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'ussd',
      name: 'USSD',
      description: 'Pay using your phone',
      icon: Smartphone,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const quickAmounts = ['1000', '2000', '5000', '10000', '20000', '50000'];

  const validateAmount = (amt: string) => {
    if (!amt) return 'Amount is required';
    const numAmount = Number(amt);
    if (isNaN(numAmount) || numAmount < 100) return 'Minimum amount is ₦100';
    if (numAmount > 500000) return 'Maximum amount is ₦500,000';
    return null;
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setAmount(cleaned);
    
    const error = validateAmount(cleaned);
    setErrors(prev => ({ ...prev, amount: error }));
  };

  const handleContinue = () => {
    const amountError = validateAmount(amount);
    
    const newErrors: any = {};
    if (amountError) newErrors.amount = amountError;
    if (!selectedMethod) newErrors.method = 'Please select a payment method';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    setStep(3);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Fund Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="p-6">
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount to fund"
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select
              </label>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount)}
                    className={`py-2 px-4 border-2 rounded-xl font-medium transition-all ${
                      amount === quickAmount
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    ₦{Number(quickAmount).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 border-2 rounded-2xl transition-all text-left ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${method.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.method && (
                <p className="text-red-500 text-sm mt-1">{errors.method}</p>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Payment</h3>
              <p className="text-gray-600">Review your funding details</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₦{Number(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">
                  {paymentMethods.find(m => m.id === selectedMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee</span>
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
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 py-3 bg-[#13070C] text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your wallet has been funded with ₦{Number(amount).toLocaleString()}
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundWalletModal;