"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthHeader from "./AuthHeader";
import AuthPasswordField from "./AuthPasswordField";
import AuthShell from "./AuthShell";
import AuthTextField from "./AuthTextField";

type RegisterField = "firstName" | "lastName" | "email" | "phone" | "password" | "confirmPassword";
type RegisterValues = Record<RegisterField, string>;

const initialValues: RegisterValues = { firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" };

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const update = (field: RegisterField, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const validatePassword = (value: string) => value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (values.firstName.length < 2) nextErrors.firstName = "First name must be at least 2 characters";
    if (values.lastName.length < 2) nextErrors.lastName = "Last name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email address";
    if (!/^(\+234|234|0)[789][01]\d{8}$/.test(values.phone)) nextErrors.phone = "Please enter a valid Nigerian phone number";
    if (!validatePassword(values.password)) nextErrors.password = "Use 8+ characters with uppercase, lowercase, and a number";
    if (values.password !== values.confirmPassword) nextErrors.confirmPassword = "Passwords do not match";
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/dashboard");
  };

  return (
    <AuthShell>
      <AuthHeader title="Create Account" description="Join Numora today" />
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && <p className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">{errors.general}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthTextField id="first-name" label="First Name" value={values.firstName} placeholder="First name" error={errors.firstName} icon={<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />} onChange={(value) => update("firstName", value)} />
          <AuthTextField id="last-name" label="Last Name" value={values.lastName} placeholder="Last name" error={errors.lastName} icon={<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />} onChange={(value) => update("lastName", value)} />
        </div>
        <AuthTextField id="register-email" label="Email Address" type="email" value={values.email} placeholder="Enter your email" error={errors.email} icon={<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />} onChange={(value) => update("email", value)} />
        <AuthTextField id="register-phone" label="Phone Number" type="text" value={values.phone} placeholder="08012345678" error={errors.phone} icon={<Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />} onChange={(value) => update("phone", value)} />
        <AuthPasswordField id="register-password" value={values.password} error={errors.password} visible={showPassword} onChange={(value) => update("password", value)} onToggle={() => setShowPassword((visible) => !visible)} />
        <AuthPasswordField id="confirm-password" value={values.confirmPassword} error={errors.confirmPassword} visible={showConfirmPassword} onChange={(value) => update("confirmPassword", value)} onToggle={() => setShowConfirmPassword((visible) => !visible)} />
        <button type="submit" disabled={isLoading} className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium disabled:opacity-50">{isLoading ? "Creating Account..." : "Create Account"}</button>
      </form>
      <p className="mt-8 text-center text-gray-600">Already have an account? <Link href="/login" className="text-[#13070C] hover:underline font-medium">Sign in</Link></p>
    </AuthShell>
  );
}
