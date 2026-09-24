import WalletCard from "../../shared/ui/WalletCard";
import ServiceGrid from "../../shared/ui/ServiceGrid";
import TransactionChart from "../../shared/ui/TransactionChart";
import SpendingChart from "../../shared/ui/SpendingChart";
import RecentTransactions from "../../shared/ui/RecentTransactions";
import type { DashboardUser } from "@/types/user";

interface DashboardOverviewProps {
	user: DashboardUser;
}

export default function DashboardOverview({ user }: DashboardOverviewProps) {
	return (
		<>
			<div className="mb-8">
				<WalletCard user={user} />
			</div>
			<section className="mb-8">
				<h2 className="text-xl font-bold text-[#13070C] mb-6">
					Quick Services
				</h2>
				<ServiceGrid />
			</section>
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<div className="bg-white rounded-2xl shadow-sm p-6">
					<h3 className="text-lg font-semibold text-[#13070C] mb-4">
						Daily Transactions
					</h3>
					<TransactionChart />
				</div>
				<div className="bg-white rounded-2xl shadow-sm p-6">
					<h3 className="text-lg font-semibold text-[#13070C] mb-4">
						Bill Distribution
					</h3>
					<SpendingChart />
				</div>
			</section>
			<section className="bg-white rounded-2xl shadow-sm">
				<div className="p-6 border-b">
					<h3 className="text-lg font-semibold text-[#13070C]">
						Recent Transactions
					</h3>
				</div>
				<RecentTransactions />
			</section>
		</>
	);
}
