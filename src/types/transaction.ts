export type TransactionType =
	| "airtime"
	| "data"
	| "wallet_funding"
	| "airtime_to_cash";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface TransactionRecord {
	id: string;
	type: TransactionType;
	description: string;
	amount: number;
	status: TransactionStatus;
	date: string;
	recipient: string;
}
