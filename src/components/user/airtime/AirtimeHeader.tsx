"use client";

import { ArrowLeft, Smartphone } from "lucide-react";

interface AirtimeHeaderProps {
	onBack: () => void;
}

export default function AirtimeHeader({ onBack }: AirtimeHeaderProps) {
	return (
		<div className="flex items-center mb-6">
			<button
				type="button"
				onClick={onBack}
				className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
				aria-label="Back to dashboard"
			>
				<ArrowLeft className="w-5 h-5" />
			</button>
			<div className="flex items-center">
				<div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
					<Smartphone className="w-5 h-5 text-blue-600" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Buy Airtime</h1>
					<p className="text-gray-600">Top up your phone or someone else's</p>
				</div>
			</div>
		</div>
	);
}
