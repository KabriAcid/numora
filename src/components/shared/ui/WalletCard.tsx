import React, { useState } from "react";
import { Wallet, Plus, Eye, EyeOff } from "lucide-react";
import FundWalletModal from "../../user/modals/FundWalletModal";
// import WithdrawModal from "../../user/modals/WithdrawModal";

interface WalletCardProps {
	user: { balance?: number };
}

const WalletCard: React.FC<WalletCardProps> = ({ user }) => {
	const balance = user.balance ?? 0;
	const [showBalance, setShowBalance] = useState(true);
	const [showFundModal, setShowFundModal] = useState(false);
	// Withdraw is intentionally disabled until the settlement flow is implemented.
	// const [showWithdrawModal, setShowWithdrawModal] = useState(false);

	return (
		<>
			<div className="bg-gradient-to-r from-[#13070C] to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full"></div>
					<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full"></div>
					<div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full transform -translate-y-1/2"></div>
				</div>

				<div className="relative">
					<div className="flex items-center justify-between mb-5 sm:mb-6">
						<div className="flex items-center">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
								<Wallet className="w-6 h-6" />
							</div>
							<div>
								<p className="text-white text-opacity-80 text-sm">
									Wallet Balance
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

					<div className="mb-6 sm:mb-8">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
							{showBalance ? `₦${balance.toLocaleString()}` : "₦***,***"}
						</h2>
						<p className="text-white text-opacity-60 text-sm">
							Last updated: {new Date().toLocaleDateString()}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
						<button
							onClick={() => setShowFundModal(true)}
							className="cursor-pointer min-w-0 text-white bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center"
						>
							<Plus className="w-5 h-5 mr-2" />
							Fund Wallet
						</button>
						{/* Withdraw is disabled until the settlement flow is implemented. */}
					</div>
				</div>
			</div>

			{showFundModal && (
				<FundWalletModal onClose={() => setShowFundModal(false)} />
			)}

			{/* Withdraw modal is intentionally disabled. */}
		</>
	);
};

export default WalletCard;
