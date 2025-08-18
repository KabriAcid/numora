import React, { useState } from 'react';
import { X, Banknote, Check } from 'lucide-react';

interface WithdrawModalProps {
  user: any;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ user, onClose }) => {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<any>({});

  const banks = [
    'Access Bank', 'Citibank', 'Diamond Bank', 'Ecobank Nigeria', 'Fidelity Bank',
    'First Bank of Nigeria', 'First City Monument Bank', 'Guaranty Trust Bank',
    'Heritage Bank', 'Keystone Bank', 'Polaris Bank', 'Providus Bank',
    'Stanbic IBTC Bank', 'Standard Chartered Bank', 'Sterling Bank',
    'Union Bank of Nigeria', 'United Bank For Africa', 'Unity Bank',
    'Wema Bank', 'Zenith Bank'
  ];

  const validateAmount = (amt: string) => {
    if (!amt) return 'Amount is required';
    const numAmount = Number(amt);
    if (isNaN(numAmount) || numAmount < 1000) return 'Minimum withdrawal is ₦1,000';
    if (numAmount > user.balance) return 'Insufficient balance';
    return null;
  };

  const validateAccountNumber = (accNum: string) => {
    if (!accNum) return 'Account number is required';
    if (accNum.length !== 10) return 'Account number must be 10 digits';
    return null;
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setAmount(cleaned);
    
    const error = validateAmount(cleaned);
    setErrors(prev => ({ ...prev, amount: error }));
  };

  const handleAccountNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 10);
    setAccountNumber(cleaned);
    
    // Simulate account name lookup
    if (cleaned.length === 10) {
      setTimeout(() => {
        setAccountName('John Doe'); // Mock account name
      }, 1000);
    } else {
      setAccountName('');
    }
    
    const error = validateAccountNumber(cleaned);
    setErrors(prev => ({ ...prev, accountNumber: error }));
  };

  const handleContinue = () => {
    const amountError = validateAmount(amount);
    const accountError = validateAccountNumber(accountNumber);
    
    const newErrors: any = {};
    if (amountError) newErrors.amount = amountError;
    if (!bankName) newErrors.bankName = 'Please select a bank';
    if (accountError) newErrors.accountNumber = accountError;
    if (!accountName) newErrors.accountName = 'Account name not found';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  const handleWithdraw = () => {
    // Simulate withdrawal processing
    setStep(3);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const withdrawalFee = amount ? Math.max(50, Number(amount) * 0.01) : 0;
  const totalDeduction = Number(amount) + withdrawalFee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Withdraw Money</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="p-6">
            {/* Available Balance */}
            <div className="mb-6 p-4 bg-green-50 rounded-2xl">
              <p className="text-sm text-green-700">Available Balance</p>
              <p className="text-2xl font-bold text-green-800">₦{user.balance.toLocaleString()}</p>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount to withdraw"
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Bank Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bank
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.bankName ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose your bank</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
              {errors.bankName && (
                <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
              )}
            </div>

            {/* Account Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => handleAccountNumberChange(e.target.value)}
                placeholder="Enter 10-digit account number"
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {accountName && (
                <p className="text-green-600 text-sm mt-1">Account Name: {accountName}</p>
              )}
              {errors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
              )}
            </div>

            {/* Fee Information */}
            {amount && (
              <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
                <div className="flex justify-between text-sm mb-1">
                  <span>Withdrawal Amount:</span>
                  <span>₦{Number(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Processing Fee:</span>
                  <span>₦{withdrawalFee.toLocaleString()}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Deduction:</span>
                  <span>₦{totalDeduction.toLocaleString()}</span>
                </div>
              </div>
            )}

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
                <Banknote className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Withdrawal</h3>
              <p className="text-gray-600">Review your withdrawal details</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₦{Number(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bank</span>
                <span className="font-medium">{bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number</span>
                <span className="font-medium">{accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Name</span>
                <span className="font-medium">{accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium">₦{withdrawalFee.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>Total Deduction</span>
                <span>₦{totalDeduction.toLocaleString()}</span>
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
                onClick={handleWithdraw}
                className="flex-1 py-3 bg-[#13070C] text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
              >
                Withdraw
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Withdrawal Initiated!</h3>
            <p className="text-gray-600 mb-4">
              Your withdrawal of ₦{Number(amount).toLocaleString()} is being processed
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Funds will be credited to your account within 24 hours
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;