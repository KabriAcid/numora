"use client";

import { ArrowLeft, Download } from "lucide-react";

interface TransactionsHeaderProps {
	onBack: () => void;
}

export default function TransactionsHeader({
	onBack,
}: TransactionsHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center">
				<button
					type="button"
					onClick={onBack}
					aria-label="Back to dashboard"
					className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
				>
					<ArrowLeft className="w-5 h-5" />
				</button>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
					<p className="text-gray-600">
						View and manage your transaction history
					</p>
				</div>
			</div>
			<button
				type="button"
				className="flex items-center px-4 py-2 bg-[#13070C] text-white rounded-2xl"
			>
				<Download className="w-4 h-4 mr-2" />
				Export
			</button>
		</div>
	);
}
