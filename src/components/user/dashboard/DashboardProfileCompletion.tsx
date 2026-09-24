"use client";

import { useState } from "react";
import type { DashboardUser } from "@/types/user";

interface DashboardProfileCompletionProps {
	user: DashboardUser;
}

type ProfileStep = { label: string; description: string; completed: boolean };

export default function DashboardProfileCompletion({
	user,
}: DashboardProfileCompletionProps) {
	const [collapsed, setCollapsed] = useState(false);
	const steps: ProfileStep[] = [
		{
			label: "Create account",
			description: "Create Numora account",
			completed: true,
		},
		{
			label: "Verify email",
			description: "Verify your email address",
			completed: !!user.emailVerified,
		},
		{
			label: "Add basic information",
			description: "Start paying your bills",
			completed:
				!!user.billingStreet &&
				!!user.billingCity &&
				!!user.billingState &&
				!!user.billingCountry &&
				!!user.homeStreet &&
				!!user.homeCity &&
				!!user.homeState &&
				!!user.homeZip,
		},
		{
			label: "Link BVN",
			description: "Link BVN to be able to withdraw",
			completed: !!user.bvn,
		},
		{
			label: "Add bank details",
			description: "Save your bank details",
			completed: !!user.accountNumber && !!user.bankName && !!user.accountName,
		},
	];
	const completed = steps.filter((step) => step.completed).length;
	const percentage = Math.round((completed / steps.length) * 100);

	return (
		<section className="mb-8 w-full bg-white rounded-2xl shadow-sm p-6">
			<div className="flex items-center justify-between mb-2">
				<div>
					<h2 className="text-2xl font-medium text-secondary">
						Complete your profile setup
					</h2>
					<span className="text-sm text-gray-600">
						Finish setting up your account to enjoy Numora fully
					</span>
				</div>
				<span className="text-sm font-bold text-secondary">
					{percentage}% complete
				</span>
			</div>
			<div className="w-full bg-primary rounded-full h-2 mb-6">
				<div
					className="bg-secondary h-2 rounded-full transition-all"
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<button
				type="button"
				className="text-xs text-gray-500 hover:underline mb-4"
				onClick={() => setCollapsed((value) => !value)}
			>
				{collapsed ? "Show more" : "Show less"}
			</button>
			{!collapsed && (
				<ul className="space-y-3">
					{steps.map((step) => (
						<li
							key={step.label}
							className={`flex items-center gap-4 p-3 rounded-xl border border-gray-100 ${step.completed ? "opacity-60" : ""}`}
						>
							<div className="bg-primary rounded-xl p-2 text-secondary">
								{step.completed ? "✓" : "○"}
							</div>
							<div className="flex-1">
								<div className="font-semibold text-secondary">{step.label}</div>
								<div className="text-sm text-gray-600">{step.description}</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
