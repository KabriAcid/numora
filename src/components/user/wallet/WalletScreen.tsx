"use client";

import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/user/DashboardLayout";
import WalletCard from "@/components/shared/ui/WalletCard";
import TransactionChart from "@/components/shared/ui/TransactionChart";
import SpendingChart from "@/components/shared/ui/SpendingChart";
import RecentTransactions from "@/components/shared/ui/RecentTransactions";
import FundWalletModal from "../modals/FundWalletModal";

export default function WalletScreen() {
	const router = useRouter();
	const [showFundModal, setShowFundModal] = useState(false);
	const user = {
		balance: 5955,
		name: "Kabri Acid",
		virtualAccount: "2054219007",
	};

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex items-center mb-6">
					<button
						type="button"
						onClick={() => router.push("/dashboard")}
						aria-label="Back to dashboard"
						className="cursor-pointer mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
					</button>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
						<p className="text-gray-600">
							Manage your funds and view transaction history
						</p>
					</div>
				</div>
				<div className="space-y-6">
					<WalletCard user={user} />
					<div className="pt-1">
						<button
							type="button"
							onClick={() => setShowFundModal(true)}
							className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-2xl bg-[#13070C] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#260d18]"
						>
							<Plus className="h-4 w-4" />
							Fund Wallet
						</button>
					</div>
					{showFundModal && (
						<FundWalletModal onClose={() => setShowFundModal(false)} />
					)}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<TransactionChart />
						<SpendingChart />
					</div>
					<RecentTransactions />
				</div>
			</div>
		</DashboardLayout>
	);
}
