"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AirtimeAmountSelector from "./AirtimeAmountSelector";
import AirtimeConfirmationModal from "./AirtimeConfirmationModal";
import AirtimeHeader from "./AirtimeHeader";
import AirtimeNetworkSelector from "./AirtimeNetworkSelector";
import type {
	AirtimeFieldErrors,
	NetworkId,
	NetworkOption,
} from "@/types/service";

const networks: readonly NetworkOption[] = [
	{
		id: "mtn",
		name: "MTN",
		icon: "/assets/providers/networks/mtn.svg",
		prefixes: [
			"0803",
			"0806",
			"0703",
			"0706",
			"0813",
			"0816",
			"0810",
			"0814",
			"0903",
			"0906",
			"0913",
			"0916",
		],
	},
	{
		id: "airtel",
		name: "Airtel",
		icon: "/assets/providers/networks/airtel-logo1.png",
		prefixes: [
			"0802",
			"0808",
			"0708",
			"0812",
			"0701",
			"0902",
			"0907",
			"0901",
			"0912",
		],
	},
	{
		id: "glo",
		name: "Glo",
		icon: "/assets/providers/networks/glo.png",
		prefixes: ["0805", "0807", "0705", "0815", "0811", "0905"],
	},
	{
		id: "9mobile",
		name: "9mobile",
		icon: "/assets/providers/networks/9mobile.png",
		prefixes: ["0809", "0817", "0818", "0909", "0908"],
	},
];

const quickAmounts = ["100", "200", "500", "1000", "2000", "5000"] as const;

export default function AirtimePurchaseForm() {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [selectedNetwork, setSelectedNetwork] = useState<NetworkId | "">("");
	const [selectedAmount, setSelectedAmount] = useState("");
	const [customAmount, setCustomAmount] = useState("");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [errors, setErrors] = useState<AirtimeFieldErrors>({});

	const validatePhone = (phone: string): string | null => {
		if (!phone) return "Phone number is required";
		if (phone.length !== 11) return "Phone number must be 11 digits";
		if (!phone.startsWith("0")) return "Phone number must start with 0";
		const network = networks.find((item) =>
			item.prefixes.includes(phone.slice(0, 4)),
		);
		if (!network) return "Invalid network prefix";
		if (selectedNetwork && network.id !== selectedNetwork) {
			return `This number belongs to ${network.name}, but you selected ${networks.find((item) => item.id === selectedNetwork)?.name}`;
		}
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

	const handleSubmit = () => {
		const amount = customAmount || selectedAmount;
		const nextErrors: AirtimeFieldErrors = {
			phoneNumber: validatePhone(phoneNumber),
		};
		if (!selectedNetwork) nextErrors.network = "Please select a network";
		if (!amount) nextErrors.amount = "Please select or enter an amount";
		if (amount && (Number.isNaN(Number(amount)) || Number(amount) < 50)) {
			nextErrors.amount = "Amount must be at least ₦50";
		}
		setErrors(nextErrors);
		if (!Object.values(nextErrors).some(Boolean)) setShowConfirmation(true);
	};

	const selectedNetworkName = networks.find(
		(item) => item.id === selectedNetwork,
	)?.name;

	return (
		<div className="p-6">
			<AirtimeHeader onBack={() => router.push("/dashboard")} />
			<div className="max-w-md mx-auto">
				<div className="mb-6">
					<label
						htmlFor="airtime-phone"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Phone Number
					</label>
					<input
						id="airtime-phone"
						type="tel"
						value={phoneNumber}
						onChange={(event) => handlePhoneChange(event.target.value)}
						placeholder="08012345678"
						className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
					/>
					{errors.phoneNumber && (
						<p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
					)}
				</div>
				<AirtimeNetworkSelector
					networks={networks}
					selectedNetwork={selectedNetwork}
					errors={errors}
					onSelect={setSelectedNetwork}
				/>
				<AirtimeAmountSelector
					amounts={quickAmounts}
					selectedAmount={selectedAmount}
					customAmount={customAmount}
					error={errors.amount}
					onSelect={(amount) => {
						setSelectedAmount(amount);
						setCustomAmount("");
					}}
					onCustomChange={(amount) => {
						setCustomAmount(amount);
						setSelectedAmount("");
					}}
				/>
				<button
					type="button"
					onClick={handleSubmit}
					className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
				>
					Continue
				</button>
			</div>
			{showConfirmation && (
				<AirtimeConfirmationModal
					networkName={selectedNetworkName}
					phoneNumber={phoneNumber}
					amount={customAmount || selectedAmount}
					onConfirm={() => {
						setShowConfirmation(false);
						router.push("/dashboard");
					}}
				/>
			)}
		</div>
	);
}
