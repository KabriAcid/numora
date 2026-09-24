"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import type { DataPlan } from "@/types/service";

interface DataConfirmationModalProps {
	networkName?: string;
	phoneNumber: string;
	plan: DataPlan;
	onCancel: () => void;
	onConfirm: () => void;
}

export default function DataConfirmationModal({
	networkName,
	phoneNumber,
	plan,
	onCancel,
	onConfirm,
}: DataConfirmationModalProps) {
	return (
		<div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl p-6 w-full max-w-sm">
				<div className="text-center mb-6">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Check className="w-8 h-8 text-green-600" />
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Confirm Purchase
					</h2>
					<p className="text-gray-600">Please review your data purchase</p>
				</div>
				<div className="space-y-4 mb-6">
					<div className="flex justify-between">
						<span className="text-gray-600">Network</span>
						{/* <span className="font-medium">{networkName}</span> */}
						<img src="/assets/providers/networks/mtn.svg" alt="" width={50} height={50} />
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Phone Number</span>
						<span className="font-medium">{phoneNumber}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Data Size</span>
						<span className="font-medium">{plan.name}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Validity</span>
						<span className="font-medium">{plan.validity}</span>
					</div>
					<div className="flex justify-between font-bold text-lg">
						<span>Total</span>
						<span>₦{plan.price}</span>
					</div>
				</div>
				<div className="flex space-x-3">
					<button
						type="button"
						onClick={onCancel}
						className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
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
