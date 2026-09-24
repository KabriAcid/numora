"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AirtimeCashConfirmationModal from "./AirtimeCashConfirmationModal";
import AirtimeCashHeader from "./AirtimeCashHeader";
import AirtimeCashInstructions from "./AirtimeCashInstructions";
import AirtimeCashNetworkSelector from "./AirtimeCashNetworkSelector";
import type {
	AirtimeCashFieldErrors,
	AirtimeCashNetwork,
	NetworkId,
} from "@/types/service";

const networks: readonly AirtimeCashNetwork[] = [
	{
		id: "mtn",
		name: "MTN",
		icon: "/assets/providers/networks/mtn.svg",
		rate: 0.85,
		prefixes: ["0803", "0806", "0813", "0816", "0903", "0906", "0913", "0916"],
	},
	{
		id: "glo",
		name: "Glo",
		icon: "/assets/providers/networks/glo.png",
		rate: 0.8,
		prefixes: ["0805", "0807", "0815", "0811", "0905", "0915"],
	},
	{
		id: "airtel",
		name: "Airtel",
		icon: "/assets/providers/networks/airtel-logo1.png",
		rate: 0.82,
		prefixes: ["0802", "0808", "0812", "0901", "0902", "0907", "0912"],
	},
	{
		id: "9mobile",
		name: "9mobile",
		icon: "/assets/providers/networks/9mobile.png",
		rate: 0.78,
		prefixes: ["0809", "0817", "0818", "0909", "0908"],
	},
];

export default function AirtimeToCashForm() {
	const router = useRouter();
	const [selectedNetwork, setSelectedNetwork] = useState<NetworkId | "">("");
	const [amount, setAmount] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [errors, setErrors] = useState<AirtimeCashFieldErrors>({});

	const validatePhone = (phone: string): string | null => {
		if (!phone) return "Phone number is required";
		if (phone.length !== 11) return "Phone number must be 11 digits";
		if (!phone.startsWith("0")) return "Phone number must start with 0";
		const network = networks.find((item) =>
			item.prefixes.includes(phone.slice(0, 4)),
		);
		if (!network) return "Invalid network prefix";
		if (selectedNetwork && network.id !== selectedNetwork)
			return `This number belongs to ${network.name}, but you selected ${networks.find((item) => item.id === selectedNetwork)?.name}`;
		return null;
	};

	const validateAmount = (value: string): string | null => {
		const numeric = Number(value);
		if (!value) return "Amount is required";
		if (Number.isNaN(numeric) || numeric < 100) return "Minimum amount is ₦100";
		if (numeric > 50000) return "Maximum amount is ₦50,000";
		return null;
	};

	const handlePhoneChange = (value: string) => {
		const cleaned = value.replace(/\D/g, "").slice(0, 11);
		setPhoneNumber(cleaned);
		const detected = networks.find((item) =>
			item.prefixes.includes(cleaned.slice(0, 4)),
		);
		if (detected && !selectedNetwork) setSelectedNetwork(detected.id);
		setErrors((previous) => ({
			...previous,
			phoneNumber: validatePhone(cleaned),
		}));
	};

	const handleAmountChange = (value: string) => {
		const cleaned = value.replace(/\D/g, "");
		setAmount(cleaned);
		setErrors((previous) => ({ ...previous, amount: validateAmount(cleaned) }));
	};

	const handleSubmit = () => {
		const nextErrors: AirtimeCashFieldErrors = {
			phoneNumber: validatePhone(phoneNumber),
			amount: validateAmount(amount),
		};
		if (!selectedNetwork) nextErrors.network = "Please select a network";
		setErrors(nextErrors);
		if (!Object.values(nextErrors).some(Boolean)) setShowConfirmation(true);
	};

	const network = networks.find((item) => item.id === selectedNetwork);
	const creditedAmount = network
		? Math.floor(Number(amount) * network.rate)
		: 0;

	return (
		<div className="p-6">
			<AirtimeCashHeader onBack={() => router.push("/dashboard")} />
			<div className="max-w-md mx-auto">
				<div className="mb-6">
					<label
						htmlFor="cash-phone"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Phone Number
					</label>
					<input
						id="cash-phone"
						type="tel"
						value={phoneNumber}
						onChange={(event) => handlePhoneChange(event.target.value)}
						placeholder="08012345678"
						className={`w-full px-4 py-3 border rounded-2xl ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
					/>
					{errors.phoneNumber && (
						<p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
					)}
				</div>
				<AirtimeCashNetworkSelector
					networks={networks}
					selectedNetwork={selectedNetwork}
					errors={errors}
					onSelect={setSelectedNetwork}
				/>
				<div className="mb-6">
					<label
						htmlFor="cash-amount"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Airtime Amount (₦100 - ₦50,000)
					</label>
					<input
						id="cash-amount"
						type="text"
						value={amount}
						onChange={(event) => handleAmountChange(event.target.value)}
						placeholder="Enter airtime amount"
						className={`w-full px-4 py-3 border rounded-2xl ${errors.amount ? "border-red-500" : "border-gray-300"}`}
					/>
					{errors.amount && (
						<p className="text-red-500 text-sm mt-1">{errors.amount}</p>
					)}
				</div>
				{network && amount && !errors.amount && (
					<div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200">
						<div className="flex justify-between">
							<div>
								<p className="text-sm text-gray-600">You will receive:</p>
								<p className="text-2xl font-bold text-green-600">
									₦{creditedAmount.toLocaleString()}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-600">Rate:</p>
								<p className="font-medium">
									{(network.rate * 100).toFixed(0)}%
								</p>
							</div>
						</div>
					</div>
				)}
				<button
					type="button"
					onClick={handleSubmit}
					className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium"
				>
					Continue
				</button>
				<AirtimeCashInstructions />
			</div>
			{showConfirmation && network && (
				<AirtimeCashConfirmationModal
					network={network}
					phoneNumber={phoneNumber}
					amount={amount}
					creditedAmount={creditedAmount}
					onCancel={() => setShowConfirmation(false)}
					onConfirm={() => {
						setShowConfirmation(false);
						router.push("/dashboard");
					}}
				/>
			)}
		</div>
	);
}
