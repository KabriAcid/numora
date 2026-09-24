"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/user/DashboardLayout";
import TransactionFilters from "./TransactionFilters";
import TransactionsHeader from "./TransactionsHeader";
import TransactionList from "./TransactionList";
import { transactions } from "./transactions.data";

export default function TransactionsScreen() {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const [type, setType] = useState("all");
	const [date, setDate] = useState("all");

	const filteredTransactions = useMemo(
		() =>
			transactions.filter((transaction) => {
				const query = search.toLowerCase();
				const matchesSearch =
					!query ||
					transaction.description.toLowerCase().includes(query) ||
					transaction.id.toLowerCase().includes(query) ||
					transaction.recipient.toLowerCase().includes(query);
				return (
					matchesSearch &&
					(status === "all" || transaction.status === status) &&
					(type === "all" || transaction.type === type)
				);
			}),
		[search, status, type],
	);

	return (
		<DashboardLayout>
			<div className="p-6">
				<TransactionsHeader onBack={() => router.push("/dashboard")} />
				<TransactionFilters
					search={search}
					status={status}
					type={type}
					date={date}
					onSearch={setSearch}
					onStatus={setStatus}
					onType={setType}
					onDate={setDate}
				/>
				<TransactionList transactions={filteredTransactions} />
			</div>
		</DashboardLayout>
	);
}
