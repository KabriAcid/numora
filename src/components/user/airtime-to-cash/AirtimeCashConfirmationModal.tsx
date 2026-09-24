"use client";

import { Check } from "lucide-react";
import type { AirtimeCashNetwork } from "@/types/service";

interface AirtimeCashConfirmationModalProps {
	network: AirtimeCashNetwork;
	phoneNumber: string;
	amount: string;
	creditedAmount: number;
	onCancel: () => void;
	onConfirm: () => void;
}

export default function AirtimeCashConfirmationModal({
	network,
	phoneNumber,
	amount,
	creditedAmount,
	onCancel,
	onConfirm,
}: AirtimeCashConfirmationModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl p-6 w-full max-w-sm">
				<div className="text-center mb-6">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Check className="w-8 h-8 text-green-600" />
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Confirm Conversion
					</h2>
					<p className="text-gray-600">
						Please review your airtime to cash conversion
					</p>
				</div>
				<div className="space-y-4 mb-6">
					<div className="flex justify-between">
						<span className="text-gray-600">Network</span>
						<span className="font-medium">{network.name}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Phone Number</span>
						<span className="font-medium">{phoneNumber}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Airtime Amount</span>
						<span className="font-medium">
							₦{Number(amount).toLocaleString()}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Conversion Rate</span>
						<span className="font-medium">
							{(network.rate * 100).toFixed(0)}%
						</span>
					</div>
					<hr />
					<div className="flex justify-between font-bold text-green-600">
						<span>You'll Receive</span>
						<span>₦{creditedAmount.toLocaleString()}</span>
					</div>
				</div>
				<div className="flex space-x-3">
					<button
						type="button"
						onClick={onCancel}
						className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="flex-1 py-3 bg-[#13070C] text-white rounded-2xl font-medium"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
