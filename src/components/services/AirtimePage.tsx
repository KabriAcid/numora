import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

interface AirtimePageProps {
  user: any;
  onLogout: () => void;
}

const AirtimePage: React.FC<AirtimePageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const networks = [
    { id: 'mtn', name: 'MTN', color: 'bg-yellow-500', prefixes: ['0803', '0806', '0813', '0816', '0903', '0906', '0913', '0916'] },
    { id: 'glo', name: 'Glo', color: 'bg-green-500', prefixes: ['0805', '0807', '0815', '0811', '0905', '0915'] },
    { id: 'airtel', name: 'Airtel', color: 'bg-red-500', prefixes: ['0802', '0808', '0812', '0901', '0902', '0907', '0912'] },
    { id: '9mobile', name: '9mobile', color: 'bg-green-600', prefixes: ['0809', '0817', '0818', '0909', '0908'] }
  ];

  const quickAmounts = ['100', '200', '500', '1000', '2000', '5000'];

  const validatePhoneNumber = (phone: string) => {
    if (!phone) return 'Phone number is required';
    if (phone.length !== 11) return 'Phone number must be 11 digits';
    if (!phone.startsWith('0')) return 'Phone number must start with 0';
    
    const prefix = phone.substring(0, 4);
    const network = networks.find(n => n.prefixes.includes(prefix));
    if (!network) return 'Invalid network prefix';
    
    if (selectedNetwork && network.id !== selectedNetwork) {
      return `This number belongs to ${network.name}, but you selected ${networks.find(n => n.id === selectedNetwork)?.name}`;
    }
    
    return null;
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 11);
    setPhoneNumber(cleaned);
    
    if (cleaned.length >= 4) {
      const prefix = cleaned.substring(0, 4);
      const detectedNetwork = networks.find(n => n.prefixes.includes(prefix));
      if (detectedNetwork && !selectedNetwork) {
        setSelectedNetwork(detectedNetwork.id);
      }
    }
    
    const error = validatePhoneNumber(cleaned);
    setErrors(prev => ({ ...prev, phoneNumber: error }));
  };

  const handleSubmit = () => {
    const phoneError = validatePhoneNumber(phoneNumber);
    const amount = customAmount || selectedAmount;
    
    const newErrors: any = {};
    if (phoneError) newErrors.phoneNumber = phoneError;
    if (!selectedNetwork) newErrors.network = 'Please select a network';
    if (!amount) newErrors.amount = 'Please select or enter an amount';
    if (amount && (isNaN(Number(amount)) || Number(amount) < 50)) {
      newErrors.amount = 'Amount must be at least ₦50';
    }

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
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Buy Airtime</h1>
              <p className="text-gray-600">Top up your phone or someone else's</p>
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
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
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
                  className={`p-4 border-2 rounded-2xl transition-all ${
                    selectedNetwork === network.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 ${network.color} rounded-lg mx-auto mb-2`}></div>
                  <p className="font-medium text-sm">{network.name}</p>
                </button>
              ))}
            </div>
            {errors.network && (
              <p className="text-red-500 text-sm mt-1">{errors.network}</p>
            )}
          </div>

          {/* Quick Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 border-2 rounded-2xl font-medium transition-all ${
                    selectedAmount === amount
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  ₦{amount}
                </button>
              ))}
            </div>
            
            {/* Custom Amount */}
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount('');
              }}
              placeholder="Enter custom amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Purchase</h3>
                <p className="text-gray-600">Please review your airtime purchase</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium">{networks.find(n => n.id === selectedNetwork)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Number</span>
                  <span className="font-medium">{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">₦{customAmount || selectedAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Charges</span>
                  <span className="font-medium">₦0.00</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₦{customAmount || selectedAmount}</span>
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

export default AirtimePage;