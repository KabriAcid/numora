"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";

interface AirtimeCashHeaderProps {
	onBack: () => void;
}

export default function AirtimeCashHeader({ onBack }: AirtimeCashHeaderProps) {
	return (
		<div className="flex items-center mb-6">
			<button
				type="button"
				onClick={onBack}
				aria-label="Back to dashboard"
				className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
			>
				<ArrowLeft className="w-5 h-5" />
			</button>
			<div className="flex items-center">
				<div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
					<RefreshCw className="w-5 h-5 text-green-600" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Airtime to Cash</h1>
					<p className="text-gray-600">
						Convert your airtime to cash instantly
					</p>
				</div>
			</div>
		</div>
	);
}
