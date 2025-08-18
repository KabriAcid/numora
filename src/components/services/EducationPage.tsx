import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

interface EducationPageProps {
  user: any;
  onLogout: () => void;
}

const EducationPage: React.FC<EducationPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [examNumber, setExamNumber] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const educationServices = [
    { id: 'waec', name: 'WAEC', color: 'bg-blue-600', description: 'West African Examinations Council' },
    { id: 'jamb', name: 'JAMB', color: 'bg-green-600', description: 'Joint Admissions and Matriculation Board' },
    { id: 'neco', name: 'NECO', color: 'bg-purple-600', description: 'National Examinations Council' },
    { id: 'nabteb', name: 'NABTEB', color: 'bg-red-600', description: 'National Business and Technical Examinations Board' }
  ];

  const packages = {
    waec: [
      { id: 'registration', name: 'WAEC Registration', price: 15000, description: 'Full registration for WAEC examination' },
      { id: 'result_checker', name: 'Result Checker', price: 1000, description: 'Check your WAEC results online' }
    ],
    jamb: [
      { id: 'registration', name: 'JAMB Registration', price: 4700, description: 'UTME registration form' },
      { id: 'result_checker', name: 'Result Checker', price: 1000, description: 'Check your JAMB results online' },
      { id: 'change_course', name: 'Change of Course/Institution', price: 2500, description: 'Change your course or institution' }
    ],
    neco: [
      { id: 'registration', name: 'NECO Registration', price: 13500, description: 'Full registration for NECO examination' },
      { id: 'result_checker', name: 'Result Checker', price: 1000, description: 'Check your NECO results online' }
    ],
    nabteb: [
      { id: 'registration', name: 'NABTEB Registration', price: 12000, description: 'Full registration for NABTEB examination' },
      { id: 'result_checker', name: 'Result Checker', price: 1000, description: 'Check your NABTEB results online' }
    ]
  };

  const validateExamNumber = (number: string) => {
    if (!number) return 'Exam/Registration number is required';
    if (number.length < 8) return 'Exam number must be at least 8 characters';
    return null;
  };

  const handleExamNumberChange = (value: string) => {
    setExamNumber(value.toUpperCase());
    
    const error = validateExamNumber(value);
    setErrors(prev => ({ ...prev, examNumber: error }));
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedPackage(''); // Reset package when service changes
  };

  const handleSubmit = () => {
    const examError = validateExamNumber(examNumber);
    
    const newErrors: any = {};
    if (!selectedService) newErrors.service = 'Please select an education service';
    if (examError) newErrors.examNumber = examError;
    if (!selectedPackage) newErrors.package = 'Please select a package';

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

  const selectedPackageDetails = selectedService && selectedPackage 
    ? packages[selectedService as keyof typeof packages]?.find(p => p.id === selectedPackage)
    : null;

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
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Education Payments</h1>
              <p className="text-gray-600">Pay for examination fees and services</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Education Service Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education Service
            </label>
            <div className="grid grid-cols-2 gap-3">
              {educationServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceChange(service.id)}
                  className={`p-4 border-2 rounded-2xl transition-all text-left ${
                    selectedService === service.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 ${service.color} rounded-lg mb-2`}></div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </button>
              ))}
            </div>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service}</p>
            )}
          </div>

          {/* Exam Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exam/Registration Number
            </label>
            <input
              type="text"
              value={examNumber}
              onChange={(e) => handleExamNumberChange(e.target.value)}
              placeholder="Enter your exam number"
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.examNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.examNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.examNumber}</p>
            )}
          </div>

          {/* Package Selection */}
          {selectedService && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service
              </label>
              <div className="space-y-3">
                {packages[selectedService as keyof typeof packages]?.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`w-full p-4 border-2 rounded-2xl transition-all text-left ${
                      selectedPackage === pkg.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{pkg.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                      </div>
                      <p className="font-bold text-lg ml-4">₦{pkg.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Payment</h3>
                <p className="text-gray-600">Please review your education payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">{educationServices.find(s => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exam Number</span>
                  <span className="font-medium">{examNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package</span>
                  <span className="font-medium">{selectedPackageDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">₦{selectedPackageDetails.price.toLocaleString()}</span>
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
      </div>
    </DashboardLayout>
  );
};

export default EducationPage;