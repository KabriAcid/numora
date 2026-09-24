"use client";

import { Check } from "lucide-react";

interface AirtimeConfirmationModalProps {
	networkName?: string;
	phoneNumber: string;
	amount: string;
	onConfirm: () => void;
}

export default function AirtimeConfirmationModal({
	networkName,
	phoneNumber,
	amount,
	onConfirm,
}: AirtimeConfirmationModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl p-6 w-full max-w-sm">
				<div className="text-center mb-6">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Check className="w-8 h-8 text-green-600" />
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Confirm Purchase
					</h2>
					<p className="text-gray-600">Please review your airtime purchase</p>
				</div>
				<div className="space-y-4 mb-6">
					<div className="flex justify-between">
						<span className="text-gray-600">Network</span>
						<span className="font-medium">{networkName}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Phone Number</span>
						<span className="font-medium">{phoneNumber}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Amount</span>
						<span className="font-medium">₦{amount}</span>
					</div>
				</div>
				<button
					type="button"
					onClick={onConfirm}
					className="w-full bg-green-600 text-white py-3 rounded-2xl font-medium hover:bg-green-700 transition-colors"
				>
					Confirm &amp; Buy
				</button>
			</div>
		</div>
	);
}
