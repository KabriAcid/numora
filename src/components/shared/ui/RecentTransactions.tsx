import React from "react";
import Link from "next/link";
import { Wifi, Phone, ArrowRightLeft } from "lucide-react";

const RecentTransactions: React.FC = () => {
	const transactions = [
		{
			id: "TXN001",
			type: "Mobile data",
			amount: 644.0,
			status: "Pending",
			date: "2024-01-15T10:30:00Z",
			icon: Wifi,
			color: "text-blue-600",
		},
		{
			id: "TXN002",
			type: "Airtime",
			amount: 600.0,
			status: "Successful",
			date: "2024-01-14T06:42:00Z",
			icon: Phone,
			color: "text-green-600",
		},
		{
			id: "TXN008",
			type: "Airtime to Cash",
			amount: 850.0,
			status: "Successful",
			date: "2024-01-09T12:10:00Z",
			icon: ArrowRightLeft,
			color: "text-violet-600",
		},
	];

	const formatPrettyDate = (value: string) => {
		const date = new Date(value);
		return new Intl.DateTimeFormat("en", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		}).format(date);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Successful":
				return "bg-green-100 text-green-800";
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			case "Failed":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="divide-y divide-gray-100">
			{transactions.map((transaction) => {
				const Icon = transaction.icon;
				const prettyDate = formatPrettyDate(transaction.date);
				return (
					<div
						key={transaction.id}
						className="p-4 hover:bg-gray-50 transition-colors"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="flex items-center gap-3 min-w-0">
								<div
									className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${transaction.color}`}
								>
									<Icon className="w-5 h-5" />
								</div>
								<div className="min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<h4 className="font-medium text-gray-900 truncate">
											{transaction.type}
										</h4>
										<span
											className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(transaction.status)}`}
										>
											{transaction.status}
										</span>
									</div>
									<p className="text-xs text-gray-500">{prettyDate}</p>
								</div>
							</div>

							<div className="flex flex-col items-end gap-2">
								<div className="font-semibold text-gray-900 text-right">
									₦{transaction.amount.toLocaleString()}
								</div>
								<Link
									href={`/transactions/${transaction.id}`}
									className="text-xs font-medium text-[#13070C] hover:underline"
								>
									View invoice
								</Link>
							</div>
						</div>
					</div>
				);
			})}

			<div className="p-4 text-center">
				<Link
					href="/transactions"
					className="text-[#13070C] hover:underline font-medium"
				>
					View all transactions
				</Link>
			</div>
		</div>
	);
};

export default RecentTransactions;
