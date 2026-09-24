export type NetworkId = "mtn" | "airtel" | "glo" | "9mobile";

export interface NetworkOption {
	id: NetworkId;
	name: string;
	icon: string;
	prefixes: readonly string[];
}

export interface AirtimeFieldErrors {
	phoneNumber?: string | null;
	network?: string;
	amount?: string;
}

export interface DataPlan {
	id: string;
	name: string;
	validity: string;
	price: number;
}

export interface DataFieldErrors {
	phoneNumber?: string | null;
	network?: string;
	plan?: string;
}

export interface AirtimeCashNetwork {
	id: NetworkId;
	name: string;
	icon: string;
	rate: number;
	prefixes: readonly string[];
}

export interface AirtimeCashFieldErrors {
	phoneNumber?: string | null;
	network?: string;
	amount?: string | null;
}
