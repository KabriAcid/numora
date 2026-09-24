"use client";

interface AirtimeAmountSelectorProps {
	amounts: readonly string[];
	selectedAmount: string;
	customAmount: string;
	error?: string;
	onSelect: (amount: string) => void;
	onCustomChange: (amount: string) => void;
}

export default function AirtimeAmountSelector({
	amounts,
	selectedAmount,
	customAmount,
	error,
	onSelect,
	onCustomChange,
}: AirtimeAmountSelectorProps) {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Select Amount
			</label>
			<div className="grid grid-cols-3 gap-3 mb-4">
				{amounts.map((amount) => (
					<button
						key={amount}
						type="button"
						onClick={() => onSelect(amount)}
						className={`py-3 px-4 border-2 rounded-2xl font-medium transition-all ${
							selectedAmount === amount
								? "border-blue-500 bg-blue-50 text-blue-600"
								: "border-gray-200 hover:border-gray-300"
						}`}
					>
						₦{amount}
					</button>
				))}
			</div>
			<input
				type="number"
				value={customAmount}
				onChange={(event) => onCustomChange(event.target.value)}
				placeholder="Enter custom amount"
				className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
