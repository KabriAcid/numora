"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthHeader from "./AuthHeader";
import AuthPasswordField from "./AuthPasswordField";
import AuthShell from "./AuthShell";
import AuthTextField from "./AuthTextField";

export default function LoginForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	const validate = () => {
		const nextErrors: Record<string, string> = {};
		if (!email) nextErrors.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			nextErrors.email = "Please enter a valid email address";
		if (!password) nextErrors.password = "Password is required";
		else if (password.length < 6)
			nextErrors.password = "Password must be at least 6 characters";
		return nextErrors;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const nextErrors = validate();
		if (Object.keys(nextErrors).length) {
			setErrors(nextErrors);
			return;
		}
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 600));
		router.push("/dashboard");
	};

	return (
		<AuthShell>
			<AuthHeader
				title="Welcome Back"
				description="Sign in to your Numora account"
			/>
			<form onSubmit={handleSubmit} className="space-y-6">
				{errors.general && (
					<p className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
						{errors.general}
					</p>
				)}
				<AuthTextField
					id="login-email"
					label="Email Address"
					type="email"
					value={email}
					placeholder="Enter your email"
					error={errors.email}
					icon={
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					}
					onChange={setEmail}
				/>
				<AuthPasswordField
					id="login-password"
					value={password}
					error={errors.password}
					visible={showPassword}
					onChange={setPassword}
					onToggle={() => setShowPassword((visible) => !visible)}
				/>
				<div className="flex items-center justify-between">
					<label className="flex items-center gap-2 text-sm text-gray-700">
						<input type="checkbox" className="h-4 w-4 text-[#13070C]" />
						Remember me
					</label>
					<Link
						href="/reset-password"
						className="text-sm text-[#13070C] hover:underline font-medium"
					>
						Forgot password?
					</Link>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-[#13070C] text-white py-4 px-4 rounded-2xl font-medium disabled:opacity-50"
				>
					{isLoading ? "Signing In..." : "Sign In"}
				</button>
			</form>
			<p className="mt-8 text-center text-gray-600">
				Don't have an account?{" "}
				<Link
					href="/register"
					className="text-[#13070C] hover:underline font-medium"
				>
					Sign up
				</Link>
			</p>
		</AuthShell>
	);
}
