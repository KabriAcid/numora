import { useState } from "react";
import { Plus } from "lucide-react";
import WalletCard from "../../shared/ui/WalletCard";
import ServiceGrid from "../../shared/ui/ServiceGrid";
import TransactionChart from "../../shared/ui/TransactionChart";
import SpendingChart from "../../shared/ui/SpendingChart";
import RecentTransactions from "../../shared/ui/RecentTransactions";
import FundWalletModal from "../modals/FundWalletModal";
import type { DashboardUser } from "@/types/user";

interface DashboardOverviewProps {
	user: DashboardUser;
}

export default function DashboardOverview({ user }: DashboardOverviewProps) {
	const [showFundModal, setShowFundModal] = useState(false);

	return (
		<>
			<div className="mb-6 sm:mb-8">
				<WalletCard user={user} />
			</div>
			<div className="mb-6 sm:mb-8">
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
			<section className="mb-6 sm:mb-8">
				<ServiceGrid />
			</section>
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
				<div className="bg-white rounded-xl p-4 sm:p-6">
					<h3 className="text-lg font-semibold text-[#13070C] mb-4">
						Daily Transactions
					</h3>
					<TransactionChart />
				</div>
				<div className="bg-white rounded-xl p-4 sm:p-6">
					<h3 className="text-lg font-semibold text-[#13070C] mb-4">
						Bill Distribution
					</h3>
					<SpendingChart />
				</div>
			</section>
			<section className="bg-white rounded-xl overflow-hidden">
				<div className="p-4 sm:p-6 border-b">
					<h3 className="text-lg font-semibold text-[#13070C]">
						Recent Transactions
					</h3>
				</div>
				<RecentTransactions />
			</section>
		</>
	);
}
