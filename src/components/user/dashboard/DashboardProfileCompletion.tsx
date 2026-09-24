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
		<section className="mb-6 sm:mb-8 w-full bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
				<div className="min-w-0">
					<h2 className="text-lg sm:text-2xl font-medium text-secondary">
						Complete your profile setup
					</h2>
					<span className="block text-sm text-gray-600">
						Finish setting up your account to enjoy Numora fully
					</span>
				</div>
				<span className="self-start sm:self-auto text-sm font-bold text-secondary whitespace-nowrap">
					{percentage}% complete
				</span>
			</div>
			<div className="flex items-center gap-3 mb-5 sm:mb-6">
				<div
					className="flex-1 bg-primary rounded-full h-2 overflow-hidden"
					role="progressbar"
					aria-valuenow={percentage}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Profile completion"
				>
					<div
						className="bg-secondary h-full rounded-full transition-all duration-300"
						style={{ width: `${percentage}%` }}
					/>
				</div>
				<span className="text-xs sm:text-sm font-semibold text-secondary tabular-nums">
					{percentage}%
				</span>
			</div>
			<button
				type="button"
				className="cursor-pointer text-xs text-gray-500 hover:underline mb-4"
				onClick={() => setCollapsed((value) => !value)}
			>
				{collapsed ? "Show more" : "Show less"}
			</button>
			{!collapsed && (
				<ul className="space-y-3">
					{steps.map((step) => (
						<li
							key={step.label}
							className={`flex items-start gap-3 sm:gap-4 p-3 rounded-xl border border-gray-100 ${step.completed ? "opacity-60" : ""}`}
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
