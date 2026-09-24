import { Eye, EyeOff, Lock } from "lucide-react";

interface AuthPasswordFieldProps {
	id: string;
	value: string;
	error?: string;
	visible: boolean;
	onChange: (value: string) => void;
	onToggle: () => void;
}

export default function AuthPasswordField({
	id,
	value,
	error,
	visible,
	onChange,
	onToggle,
}: AuthPasswordFieldProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-2"
			>
				Password
			</label>
			<div className="relative">
				<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
				<input
					id={id}
					type={visible ? "text" : "password"}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder="Enter your password"
					className={`w-full pl-12 pr-12 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] ${error ? "border-red-300 bg-red-50" : "border-gray-300"}`}
				/>
				<button
					type="button"
					onClick={onToggle}
					aria-label={visible ? "Hide password" : "Show password"}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
				>
					{visible ? (
						<EyeOff className="w-5 h-5" />
					) : (
						<Eye className="w-5 h-5" />
					)}
				</button>
			</div>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
}
