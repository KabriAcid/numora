import type { TransactionRecord } from "@/types/transaction";

export const transactions: readonly TransactionRecord[] = [
  { id: "TXN001", type: "airtime", description: "MTN Airtime Purchase", amount: -500, status: "completed", date: "2024-01-15T10:30:00Z", recipient: "08012345678" },
  { id: "TXN002", type: "data", description: "Glo Data Bundle", amount: -1500, status: "completed", date: "2024-01-14T15:45:00Z", recipient: "08087654321" },
  { id: "TXN003", type: "wallet_funding", description: "Wallet Funding", amount: 10000, status: "completed", date: "2024-01-14T09:20:00Z", recipient: "Self" },
  { id: "TXN007", type: "betting", description: "Betting Funding", amount: -2000, status: "completed", date: "2024-01-10T13:45:00Z", recipient: "BET123456" },
  { id: "TXN008", type: "airtime_to_cash", description: "Airtime to Cash", amount: 850, status: "completed", date: "2024-01-09T12:10:00Z", recipient: "Self" },
];
