"use client";

import type { DataPlan } from "@/types/service";

interface DataPlanSelectorProps {
	plans: readonly DataPlan[];
	selectedPlan: string;
	error?: string;
	onSelect: (planId: string) => void;
}

export default function DataPlanSelector({
	plans,
	selectedPlan,
	error,
	onSelect,
}: DataPlanSelectorProps) {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Select Data Plan
			</label>
			<div className="space-y-3">
				{plans.map((plan) => (
					<button
						key={plan.id}
						type="button"
						onClick={() => onSelect(plan.id)}
						className={`w-full p-4 border-2 rounded-2xl transition-all text-left ${selectedPlan === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
					>
						<div className="flex justify-between items-center">
							<div>
								<p className="font-medium">{plan.name}</p>
								<p className="text-sm text-gray-600">{plan.validity}</p>
							</div>
							<p className="font-bold text-lg">₦{plan.price}</p>
						</div>
					</button>
				))}
			</div>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
