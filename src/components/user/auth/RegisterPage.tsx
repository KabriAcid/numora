import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Wallet, Mail, Lock, User, Phone } from "lucide-react";

interface RegisterPageProps {
  onLogin: (userData: any) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (tokenResponse: any) => {
    // TODO: Send tokenResponse.access_token to backend for verification
    // Simulate login for now
    const userData = {
      id: "google-1",
      name: "Google User",
      email: "googleuser@email.com",
      phone: "",
      balance: 0,
      hasTransactionPin: false,
      googleCredential: tokenResponse.access_token,
    };
    if (typeof onLogin === "function") onLogin(userData);
  };

  const handleGoogleError = () => {
    setErrors({ general: "Google login failed. Please try again." });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "implicit",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+234|234|0)[789][01]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers,
      message: !hasMinLength
        ? "Password must be at least 8 characters"
        : !hasUpperCase
        ? "Password must contain at least one uppercase letter"
        : !hasLowerCase
        ? "Password must contain at least one lowercase letter"
        : !hasNumbers
        ? "Password must contain at least one number"
        : "",
    };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    const newErrors = { ...errors };

    if (field === "firstName") {
      if (!value) {
        newErrors.firstName = "First name is required";
      } else if (value.length < 2) {
        newErrors.firstName = "First name must be at least 2 characters";
      } else {
        delete newErrors.firstName;
      }
    }

    if (field === "lastName") {
      if (!value) {
        newErrors.lastName = "Last name is required";
      } else if (value.length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters";
      } else {
        delete newErrors.lastName;
      }
    }

    if (field === "email") {
      if (!value) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "phone") {
      if (!value) {
        newErrors.phone = "Phone number is required";
      } else if (!validatePhone(value)) {
        newErrors.phone = "Please enter a valid Nigerian phone number";
      } else {
        delete newErrors.phone;
      }
    }

    if (field === "password") {
      const validation = validatePassword(value);
      if (!value) {
        newErrors.password = "Password is required";
      } else if (!validation.isValid) {
        newErrors.password = validation.message;
      } else {
        delete newErrors.password;
      }

      // Check confirm password match
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else if (formData.confirmPassword) {
        delete newErrors.confirmPassword;
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Nigerian phone number";
    }

    if (formData.password) {
      const validation = validatePassword(formData.password);
      if (!validation.isValid) {
        newErrors.password = validation.message;
      }
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = {
        id: "1",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        balance: 0,
        hasTransactionPin: false,
      };

      onLogin(userData);
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF9F0] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#13070C] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#13070C]">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">Join Numora today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                {errors.general}
              </div>
            )}

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] focus:border-transparent transition-all ${
                      errors.firstName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] focus:border-transparent transition-all ${
                    errors.lastName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] focus:border-transparent transition-all ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] focus:border-transparent transition-all ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="08012345678"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] focus:border-transparent transition-all ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] focus:border-transparent transition-all ${
                    errors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Custom Google login button with SVG icon */}
            <button
              type="button"
              onClick={() => googleLogin()}
              className="w-full bg-white border border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 shadow hover:bg-gray-50 mt-4"
            >
              {/* Google SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <g>
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.54 0 6.36 1.22 8.32 2.26l6.18-6.18C34.36 2.36 29.52 0 24 0 14.64 0 6.48 5.64 2.64 14.04l7.6 5.9C12.36 13.36 17.76 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.1 24.5c0-1.54-.14-3.02-.4-4.44H24v8.44h12.44c-.54 2.74-2.18 5.06-4.64 6.62l7.36 5.72C43.52 37.36 46.1 31.5 46.1 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.24 28.94c-1.12-3.36-1.12-6.98 0-10.34l-7.6-5.9C.86 16.64 0 20.22 0 24c0 3.78.86 7.36 2.64 10.3l7.6-5.36z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 46c5.52 0 10.36-1.86 14.18-5.08l-7.36-5.72c-2.02 1.36-4.62 2.18-6.82 2.18-5.24 0-9.64-3.86-11.36-9.44l-7.6 5.36C6.48 42.36 14.64 46 24 46z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </g>
              </svg>
              <span className="font-medium text-gray-700">
                Login with Google
              </span>
            </button>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-full bg-[#13070C] text-white py-4 px-4 rounded-2xl font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#13070C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#13070C] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
