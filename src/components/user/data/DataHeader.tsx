"use client";

import { ArrowLeft, Wifi } from "lucide-react";

interface DataHeaderProps {
	onBack: () => void;
}

export default function DataHeader({ onBack }: DataHeaderProps) {
	return (
		<div className="mb-6">
			<button
				type="button"
				onClick={onBack}
				className="hover:bg-gray-100 rounded-lg"
				aria-label="Back to dashboard"
			>
				<ArrowLeft className="w-5 h-5" />
			</button>
			<div className="flex items-center">
				<div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
					<Wifi className="w-5 h-5 text-blue-600" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Buy Data</h1>
					<p className="text-gray-600">Purchase data bundles for your device</p>
				</div>
			</div>
		</div>
	);
}
