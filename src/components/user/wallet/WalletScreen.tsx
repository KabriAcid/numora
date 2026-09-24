"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/user/DashboardLayout";
import WalletCard from "@/components/shared/ui/WalletCard";
import TransactionChart from "@/components/shared/ui/TransactionChart";
import SpendingChart from "@/components/shared/ui/SpendingChart";
import RecentTransactions from "@/components/shared/ui/RecentTransactions";

export default function WalletScreen() {
	const router = useRouter();
	const user = { balance: 0 };

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex items-center mb-6">
					<button
						type="button"
						onClick={() => router.push("/dashboard")}
						aria-label="Back to dashboard"
						className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
