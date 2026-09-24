import type { ReactNode } from "react";

interface AuthTextFieldProps {
	id: string;
	label: string;
	type?: "email" | "text";
	value: string;
	placeholder: string;
	error?: string;
	icon: ReactNode;
	onChange: (value: string) => void;
}

export default function AuthTextField({
	id,
	label,
	type = "text",
	value,
	placeholder,
	error,
	icon,
	onChange,
}: AuthTextFieldProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-2"
			>
				{label}
			</label>
			<div className="relative">
				{icon}
				<input
					id={id}
					type={type}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder={placeholder}
					className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#13070C] ${error ? "border-red-300 bg-red-50" : "border-gray-300"}`}
				/>
			</div>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
}
