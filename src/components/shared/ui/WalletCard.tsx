import React, { useState } from "react";
import { Wallet, Eye, EyeOff, Copy, Check } from "lucide-react";

interface WalletCardProps {
	user: { balance?: number; name?: string; virtualAccount?: string };
}

const WalletCard: React.FC<WalletCardProps> = ({ user }) => {
	const balance = user.balance ?? 5955;
	const accountName = user.name?.trim() || "KABRI ACID";
	const virtualAccount = user.virtualAccount || "2054219007";
	const [showBalance, setShowBalance] = useState(true);
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(virtualAccount);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1200);
		} catch {
			setCopied(false);
		}
	};

	return (
		<div className="bg-gradient-to-r from-[#13070C] to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full"></div>
				<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full"></div>
				<div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full transform -translate-y-1/2"></div>
			</div>

			<div className="relative">
				<div className="flex items-start justify-between mb-6">
					<div className="flex items-center">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
							<Wallet className="w-6 h-6" />
						</div>
						<div>
							<p className="text-white text-opacity-80 text-[10px] uppercase tracking-[0.28em]">
								Wallet
							</p>
							<p className="text-white text-opacity-60 text-xs">
								Available funds
							</p>
						</div>
					</div>
					<button
						onClick={() => setShowBalance(!showBalance)}
						className="cursor-pointer p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
					>
						{showBalance ? (
							<EyeOff className="w-5 h-5" />
						) : (
							<Eye className="w-5 h-5" />
						)}
					</button>
				</div>

				<div className="mb-5">
					<p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
						Available balance
					</p>
					<h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
						{showBalance ? `₦${balance.toLocaleString()}` : "₦***,***"}
					</h3>
					<p className="text-white text-opacity-60 text-sm mt-1">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>

				<div className="space-y-1 mb-5">
					<p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
						Account holder
					</p>
					<h2 className="text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase">
						{accountName}
					</h2>
				</div>

				<div className="space-y-2 mb-5">
					<p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
						Virtual account
					</p>
					<div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
						<span className="font-mono text-sm tracking-[0.18em] text-white/90">
							{virtualAccount}
						</span>
						<button
							type="button"
							onClick={handleCopy}
							className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/15"
						>
							{copied ? (
								<Check className="w-3.5 h-3.5" />
							) : (
								<Copy className="w-3.5 h-3.5" />
							)}
							{copied ? "Copied" : "Copy"}
						</button>
					</div>
				</div>

			</div>
		</div>
	);
};

export default WalletCard;
