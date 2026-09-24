"use client";

interface DataPhoneInputProps {
	value: string;
	error?: string | null;
	onChange: (value: string) => void;
}

export default function DataPhoneInput({
	value,
	error,
	onChange,
}: DataPhoneInputProps) {
	return (
		<div className="mb-6">
			<label
				htmlFor="data-phone"
				className="block text-sm font-medium text-gray-700 mb-2"
			>
				Phone Number
			</label>
			<input
				id="data-phone"
				type="tel"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="08012345678"
				className={`w-full px-4 py-3 border rounded-2xl ${error ? "border-red-500" : "border-gray-300"}`}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
