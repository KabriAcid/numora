import React, { useState } from "react";
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
      completed: !!user?.emailVerified,
    },
    {
      label: "Add basic information",
      description: "Start paying your bills",
      icon: "Info",
      completed:
        !!user?.billingStreet &&
        !!user?.billingCity &&
        !!user?.billingState &&
        !!user?.billingCountry &&
        !!user?.homeStreet &&
        !!user?.homeCity &&
        !!user?.homeState &&
        !!user?.homeZip,
    },
    {
      label: "Link BVN",
      description: "Link BVN to be able to withdraw",
      icon: "Fingerprint",
      completed: !!user?.bvn,
    },
    {
      label: "Add bank details",
      description: "Save your bank details",
      icon: "Banknote",
      completed:
        !!user?.accountNumber && !!user?.bankName && !!user?.accountName,
    },
  ];

  const completedSteps = profileSteps.filter((step) => step.completed).length;
  const completionPercent = Math.round(
    (completedSteps / profileSteps.length) * 100
  );

  // Add modal state for each step
  const [activeStepModal, setActiveStepModal] = useState<string | null>(null);
  const [email, setEmail] = useState(user?.email || "");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCountry: "",
    homeStreet: "",
    homeCity: "",
    homeState: "",
    homeZip: "",
    avatar: null,
    avatarPreview: "",
  });
  const [basicInfoErrors, setBasicInfoErrors] = useState<any>({});
  const [bvn, setBVN] = useState("");
  const [bvnError, setBVNError] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    accountName: "",
  });
  const [bankErrors, setBankErrors] = useState<any>({});

  // Validation helpers
  const validateEmail = (value: string) => {
    if (!value) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format.";
    return "";
  };
  const validateBasicInfo = (info: typeof basicInfo) => {
    const errors: any = {};
    if (!info.billingStreet) errors.billingStreet = "Required.";
    if (!info.billingCity) errors.billingCity = "Required.";
    if (!info.billingState) errors.billingState = "Required.";
    if (!info.billingCountry) errors.billingCountry = "Required.";
    if (!info.homeStreet) errors.homeStreet = "Required.";
    if (!info.homeCity) errors.homeCity = "Required.";
    if (!info.homeState) errors.homeState = "Required.";
    if (!info.homeZip) errors.homeZip = "Required.";
    return errors;
  };
  const validateBVN = (value: string) => {
    if (!value) return "BVN is required.";
    if (!/^\d{11}$/.test(value)) return "BVN must be 11 digits.";
    return "";
  };
  const validateBankDetails = (details: typeof bankDetails) => {
    const errors: any = {};
    if (!details.accountNumber) errors.accountNumber = "Required.";
    if (!/^\d{10}$/.test(details.accountNumber))
      errors.accountNumber = "Account number must be 10 digits.";
    if (!details.bankName) errors.bankName = "Required.";
    if (!details.accountName) errors.accountName = "Required.";
    return errors;
  };

  // Handlers
  const handleSendEmail = () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) {
      setEmailSent(true);
      // TODO: API call to send email
    }
  };
  const handleBasicInfoChange = (field: string, value: any) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };
  const handleBasicInfoSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateBasicInfo(basicInfo);
    setBasicInfoErrors(errors);
    if (Object.keys(errors).length === 0) {
      // TODO: API call to save info
      setActiveStepModal(null);
    }
  };
  const handleBVNVerify = () => {
    const error = validateBVN(bvn);
    setBVNError(error);
    if (!error) {
      // TODO: API call to verify BVN
      setActiveStepModal(null);
    }
  };
  const handleBankDetailsChange = (field: string, value: any) => {
    setBankDetails((prev) => ({ ...prev, [field]: value }));
  };
  const handleBankDetailsSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateBankDetails(bankDetails);
    setBankErrors(errors);
    if (Object.keys(errors).length === 0) {
      // TODO: API call to save bank details
      setActiveStepModal(null);
    }
  };

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
            <span className="text-sm font-bold text-secondary">
              {completionPercent}% complete
            </span>
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
                  className={`flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm ${
                    !step.completed
                      ? "cursor-pointer hover:bg-gray-50"
                      : "opacity-60"
                  }`}
                  onClick={() => {
                    if (!step.completed) setActiveStepModal(step.icon);
                  }}
                >
                  <div className="bg-primary rounded-xl p-2">
                    {/* Lucide icon, e.g. <UserPlus />, <Mail />, etc. */}
                    {step.icon === "UserPlus" && (
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                    )}
                    {step.icon === "Mail" && (
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                    )}
                    {step.icon === "Info" && (
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="8" />
                      </svg>
                    )}
                    {step.icon === "Fingerprint" && (
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 0v1m0 4v1m0-5v-1m0-4V5m0 0V4m0 4h4m-4 0H8" />
                      </svg>
                    )}
                    {step.icon === "Banknote" && (
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="7" width="18" height="10" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M3 7v10M21 7v10" />
                      </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
      {/* Profile Completion Modals */}
      {activeStepModal === "Mail" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Verify Email
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Enter your email address to verify.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl mb-2 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email address"
            />
            {emailError && (
              <p className="text-red-500 text-xs mb-2">{emailError}</p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setActiveStepModal(null)}
                className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                className="w-1/2 bg-secondary text-white py-3 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
              >
                Send Verification
              </button>
            </div>
            {emailSent && (
              <p className="text-green-600 text-center mt-4">
                Verification email sent!
              </p>
            )}
          </div>
        </div>
      )}
      {activeStepModal === "Info" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Complete Your Basic Information
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Add your billing info, home address, and upload an avatar to
              complete your profile.
            </p>
            <form className="space-y-4" onSubmit={handleBasicInfoSave}>
              <div className="flex flex-col items-center mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleBasicInfoChange("avatar", e.target.files[0]);
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        handleBasicInfoChange(
                          "avatarPreview",
                          ev.target?.result
                        );
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  className="mb-2"
                />
                {basicInfo.avatarPreview && (
                  <img
                    src={basicInfo.avatarPreview}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Street
                  </label>
                  <input
                    type="text"
                    value={basicInfo.billingStreet}
                    onChange={(e) =>
                      handleBasicInfoChange("billingStreet", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.billingStreet
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.billingStreet && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.billingStreet}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing City
                  </label>
                  <input
                    type="text"
                    value={basicInfo.billingCity}
                    onChange={(e) =>
                      handleBasicInfoChange("billingCity", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.billingCity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.billingCity && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.billingCity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing State
                  </label>
                  <input
                    type="text"
                    value={basicInfo.billingState}
                    onChange={(e) =>
                      handleBasicInfoChange("billingState", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.billingState
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.billingState && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.billingState}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Country
                  </label>
                  <input
                    type="text"
                    value={basicInfo.billingCountry}
                    onChange={(e) =>
                      handleBasicInfoChange("billingCountry", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.billingCountry
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.billingCountry && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.billingCountry}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home Street
                  </label>
                  <input
                    type="text"
                    value={basicInfo.homeStreet}
                    onChange={(e) =>
                      handleBasicInfoChange("homeStreet", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.homeStreet
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.homeStreet && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.homeStreet}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home City
                  </label>
                  <input
                    type="text"
                    value={basicInfo.homeCity}
                    onChange={(e) =>
                      handleBasicInfoChange("homeCity", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.homeCity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.homeCity && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.homeCity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home State
                  </label>
                  <input
                    type="text"
                    value={basicInfo.homeState}
                    onChange={(e) =>
                      handleBasicInfoChange("homeState", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.homeState
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.homeState && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.homeState}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home Zip/Postal Code
                  </label>
                  <input
                    type="text"
                    value={basicInfo.homeZip}
                    onChange={(e) =>
                      handleBasicInfoChange("homeZip", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-xl ${
                      basicInfoErrors.homeZip
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {basicInfoErrors.homeZip && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicInfoErrors.homeZip}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveStepModal(null)}
                  className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-secondary text-white py-3 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {activeStepModal === "Fingerprint" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Link BVN
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Enter your BVN to link your account for withdrawals.
            </p>
            <input
              type="text"
              value={bvn}
              onChange={(e) => setBVN(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl mb-2 ${
                bvnError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter BVN"
              maxLength={11}
            />
            {bvnError && (
              <p className="text-red-500 text-xs mb-2">{bvnError}</p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setActiveStepModal(null)}
                className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBVNVerify}
                className="w-1/2 bg-secondary text-white py-3 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
              >
                Verify BVN
              </button>
            </div>
          </div>
        </div>
      )}
      {activeStepModal === "Banknote" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Add Bank Details
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Enter your bank account details to receive withdrawals.
            </p>
            <form className="space-y-4" onSubmit={handleBankDetailsSave}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    handleBankDetailsChange("accountNumber", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-xl ${
                    bankErrors.accountNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  maxLength={10}
                />
                {bankErrors.accountNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {bankErrors.accountNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) =>
                    handleBankDetailsChange("bankName", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-xl ${
                    bankErrors.bankName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {bankErrors.bankName && (
                  <p className="text-red-500 text-xs mt-1">
                    {bankErrors.bankName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  value={bankDetails.accountName}
                  onChange={(e) =>
                    handleBankDetailsChange("accountName", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-xl ${
                    bankErrors.accountName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {bankErrors.accountName && (
                  <p className="text-red-500 text-xs mt-1">
                    {bankErrors.accountName}
                  </p>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveStepModal(null)}
                  className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-secondary text-white py-3 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
