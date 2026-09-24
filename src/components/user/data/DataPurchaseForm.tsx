"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DataConfirmationModal from "./DataConfirmationModal";
import DataHeader from "./DataHeader";
import DataNetworkSelector from "./DataNetworkSelector";
import DataPhoneInput from "./DataPhoneInput";
import DataPlanSelector from "./DataPlanSelector";
import type {
	DataFieldErrors,
	DataPlan,
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

const dataPlans: Record<NetworkId, readonly DataPlan[]> = {
	mtn: [
		{ id: "1gb_30", name: "1GB", validity: "30 Days", price: 350 },
		{ id: "2gb_30", name: "2GB", validity: "30 Days", price: 700 },
		{ id: "5gb_30", name: "5GB", validity: "30 Days", price: 1500 },
		{ id: "10gb_30", name: "10GB", validity: "30 Days", price: 3000 },
	],
	glo: [
		{ id: "1gb_30", name: "1GB", validity: "30 Days", price: 400 },
		{ id: "2gb_30", name: "2GB", validity: "30 Days", price: 800 },
		{ id: "5gb_30", name: "5GB", validity: "30 Days", price: 1600 },
		{ id: "10gb_30", name: "10GB", validity: "30 Days", price: 3200 },
	],
	airtel: [
		{ id: "1gb_30", name: "1GB", validity: "30 Days", price: 380 },
		{ id: "2gb_30", name: "2GB", validity: "30 Days", price: 750 },
		{ id: "5gb_30", name: "5GB", validity: "30 Days", price: 1550 },
		{ id: "10gb_30", name: "10GB", validity: "30 Days", price: 3100 },
	],
	"9mobile": [
		{ id: "1gb_30", name: "1GB", validity: "30 Days", price: 420 },
		{ id: "2gb_30", name: "2GB", validity: "30 Days", price: 840 },
		{ id: "5gb_30", name: "5GB", validity: "30 Days", price: 1700 },
		{ id: "10gb_30", name: "10GB", validity: "30 Days", price: 3400 },
	],
};

export default function DataPurchaseForm() {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [selectedNetwork, setSelectedNetwork] = useState<NetworkId | "">("");
	const [selectedPlan, setSelectedPlan] = useState("");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [errors, setErrors] = useState<DataFieldErrors>({});

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

	const handleNetworkChange = (network: NetworkId) => {
		setSelectedNetwork(network);
		setSelectedPlan("");
	};

	const handleSubmit = () => {
		const nextErrors: DataFieldErrors = {
			phoneNumber: validatePhone(phoneNumber),
		};
		if (!selectedNetwork) nextErrors.network = "Please select a network";
		if (!selectedPlan) nextErrors.plan = "Please select a data plan";
		setErrors(nextErrors);
		if (!Object.values(nextErrors).some(Boolean)) setShowConfirmation(true);
	};

	const plans = selectedNetwork ? dataPlans[selectedNetwork] : [];
	const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan);
	const selectedNetworkName = networks.find(
		(network) => network.id === selectedNetwork,
	)?.name;

	return (
		<div className="p-6">
			<DataHeader onBack={() => router.push("/dashboard")} />
			<div className="max-w-md mx-auto">
				<DataPhoneInput
					value={phoneNumber}
					error={errors.phoneNumber}
					onChange={handlePhoneChange}
				/>
				<DataNetworkSelector
					networks={networks}
					selectedNetwork={selectedNetwork}
					errors={errors}
					onSelect={handleNetworkChange}
				/>
				{selectedNetwork && (
					<DataPlanSelector
						plans={plans}
						selectedPlan={selectedPlan}
						error={errors.plan}
						onSelect={setSelectedPlan}
					/>
				)}
				<button
					type="button"
					onClick={handleSubmit}
					className="w-full bg-[#13070C] text-white py-4 rounded-2xl font-medium"
				>
					Continue
				</button>
			</div>
			{showConfirmation && selectedPlanDetails && (
				<DataConfirmationModal
					networkName={selectedNetworkName}
					phoneNumber={phoneNumber}
					plan={selectedPlanDetails}
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
