import Link from "next/link";
import { Search } from "lucide-react";
import type { TransactionRecord } from "@/types/transaction";

interface TransactionListProps {
	transactions: readonly TransactionRecord[];
}

const icons: Record<TransactionRecord["type"], string> = {
	airtime: "📱",
	data: "📶",
	wallet_funding: "💳",
	airtime_to_cash: "💰",
};
const statusStyles: Record<TransactionRecord["status"], string> = {
	completed: "bg-green-100 text-green-800",
	pending: "bg-yellow-100 text-yellow-800",
	failed: "bg-red-100 text-red-800",
};

export default function TransactionList({
	transactions,
}: TransactionListProps) {
	const formatDate = (value: string) =>
		new Intl.DateTimeFormat("en", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		}).format(new Date(value));

	return (
		<div className="bg-white rounded-2xl shadow-none overflow-hidden border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h2 className="text-lg font-semibold text-gray-900">
					Transaction History ({transactions.length})
				</h2>
			</div>
			<div className="divide-y divide-gray-200">
				{transactions.length ? (
					transactions.map((transaction) => (
						<Link
							key={transaction.id}
							href={`/transactions/${transaction.id}`}
							className="block p-6 hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-center min-w-0">
									<div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 text-xl">
										{icons[transaction.type]}
									</div>
									<div className="min-w-0">
										<h3 className="font-medium text-gray-900 truncate">
											{transaction.description}
										</h3>
										<p className="mt-1 text-sm text-gray-600">
											{formatDate(transaction.date)}
										</p>
									</div>
								</div>
								<div className="text-right flex-shrink-0">
									<p
										className={`text-lg font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}
									>
										{transaction.amount > 0 ? "+" : ""}₦
										{Math.abs(transaction.amount).toLocaleString()}
									</p>
									<span
										className={`mt-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusStyles[transaction.status]}`}
									>
										{transaction.status}
									</span>
								</div>
							</div>
						</Link>
					))
				) : (
					<div className="p-12 text-center">
						<Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No transactions found
						</h3>
						<p className="text-gray-600">
							Try adjusting your search or filter criteria
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
