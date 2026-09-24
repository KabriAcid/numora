"use client";

import type {
	AirtimeCashFieldErrors,
	AirtimeCashNetwork,
	NetworkId,
} from "@/types/service";

interface AirtimeCashNetworkSelectorProps {
	networks: readonly AirtimeCashNetwork[];
	selectedNetwork: NetworkId | "";
	errors: AirtimeCashFieldErrors;
	onSelect: (id: NetworkId) => void;
}

export default function AirtimeCashNetworkSelector({
	networks,
	selectedNetwork,
	errors,
	onSelect,
}: AirtimeCashNetworkSelectorProps) {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Network
			</label>
			<div className="grid grid-cols-2 gap-3">
				{networks.map((network) => (
					<button
						key={network.id}
						type="button"
						onClick={() => onSelect(network.id)}
						className={`p-4 border-2 rounded-2xl transition-all flex flex-col items-center ${selectedNetwork === network.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
					>
						<img
							src={network.icon}
							alt={network.name}
							className="w-8 h-8 object-contain mx-auto mb-2 rounded-lg shadow"
						/>
						<span className="font-medium text-sm">{network.name}</span>
						<span className="text-xs text-gray-600">
							{(network.rate * 100).toFixed(0)}% rate
						</span>
					</button>
				))}
			</div>
			{errors.network && (
				<p className="text-red-500 text-sm mt-1">{errors.network}</p>
			)}
		</div>
	);
}
