import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleCheckBig, Download, ReceiptText } from "lucide-react";
import DashboardLayout from "@/layouts/user/DashboardLayout";
import { transactions } from "@/components/user/transactions/transactions.data";

const formatCurrency = (value: number) =>
	`₦${Math.abs(value).toLocaleString()}`;

const formatDate = (value: string) =>
	new Intl.DateTimeFormat("en", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date(value));

export default async function TransactionDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const transaction = transactions.find((item) => item.id === id);

	if (!transaction) {
		notFound();
	}

	const isCredit = transaction.amount > 0;
	const statusStyles = {
		completed: "bg-green-100 text-green-700",
		pending: "bg-yellow-100 text-yellow-700",
		failed: "bg-red-100 text-red-700",
	} as const;

	return (
		<DashboardLayout>
			<div className="p-4 sm:p-6">
				<div className="mb-6 flex items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<Link
							href="/transactions"
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50"
							aria-label="Back to transactions"
						>
							<ArrowLeft className="h-4 w-4" />
						</Link>
						<div>
							<p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
								Transaction
							</p>
							<h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
						</div>
					</div>
					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-2xl bg-[#13070C] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#260d18]"
					>
						<Download className="h-4 w-4" />
						Download
					</button>
				</div>

				<div className="rounded-[28px] border border-gray-200 bg-white p-5 sm:p-8 shadow-none">
					<div className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F1F2] text-2xl">
								{transaction.type === "airtime"
									? "📱"
									: transaction.type === "data"
										? "📶"
										: transaction.type === "wallet_funding"
											? "💳"
											: "💰"}
							</div>
							<div>
								<p className="text-sm text-gray-500">
									{transaction.description}
								</p>
								<h2 className="mt-1 text-xl font-semibold text-gray-900">
									{transaction.type
										.replace("_", " ")
										.replace(/\b\w/g, (letter) => letter.toUpperCase())}
								</h2>
							</div>
						</div>
						<div className="text-left sm:text-right">
							<p className="text-3xl font-bold text-gray-900">
								{isCredit ? "+" : "-"}
								{formatCurrency(transaction.amount)}
							</p>
							<span
								className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}
							>
								{transaction.status}
							</span>
						</div>
					</div>

					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<div className="rounded-2xl bg-gray-50 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-gray-500">
								Date
							</p>
							<p className="mt-2 text-sm font-medium text-gray-900">
								{formatDate(transaction.date)}
							</p>
						</div>
						<div className="rounded-2xl bg-gray-50 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-gray-500">
								Status
							</p>
							<p className="mt-2 text-sm font-medium text-gray-900">
								{transaction.status}
							</p>
						</div>
						<div className="rounded-2xl bg-gray-50 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-gray-500">
								Channel
							</p>
							<p className="mt-2 text-sm font-medium text-gray-900">
								{transaction.type === "data"
									? "Data Bundle"
									: transaction.type === "airtime"
										? "Airtime"
										: transaction.type === "wallet_funding"
											? "Wallet Top-up"
											: "Cash-out"}
							</p>
						</div>
						<div className="rounded-2xl bg-gray-50 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-gray-500">
								Transaction ID
							</p>
							<p className="mt-2 text-sm font-medium text-gray-900">
								{transaction.id}
							</p>
						</div>
					</div>

					<div className="mt-8 rounded-3xl border border-gray-200 bg-[#FBFBFB] p-5">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#13070C] text-white">
								<ReceiptText className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.24em] text-gray-500">
									Invoice summary
								</p>
								<h3 className="text-lg font-semibold text-gray-900">
									Numora payment receipt
								</h3>
							</div>
						</div>

						<div className="mt-6 space-y-4">
							<div className="flex items-center justify-between text-sm">
								<span className="text-gray-500">Amount</span>
								<span className="font-semibold text-gray-900">
									{formatCurrency(transaction.amount)}
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-gray-500">Type</span>
								<span className="font-semibold text-gray-900">
									{transaction.description}
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-gray-500">Recipient</span>
								<span className="font-semibold text-gray-900">
									{transaction.recipient}
								</span>
							</div>
						</div>
						<div className="mt-6 rounded-2xl bg-[#13070C] p-4 text-white">
							<div className="flex items-center justify-between gap-3">
								<span className="text-sm text-white/80">Net amount</span>
								<span className="text-xl font-semibold">
									{isCredit ? "+" : "-"}
									{formatCurrency(transaction.amount)}
								</span>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-center gap-3">
						<CircleCheckBig className="h-5 w-5 text-green-600" />
						<p className="text-sm text-gray-600">
							This transaction has been processed successfully.
						</p>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
