"use client";

interface DashboardLogoutModalProps {
	onCancel: () => void;
	onConfirm: () => void;
}

export default function DashboardLogoutModal({
	onCancel,
	onConfirm,
}: DashboardLogoutModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
			<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
				<h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
					Confirm Logout
				</h2>
				<p className="text-gray-600 mb-6 text-center">
					Are you sure you want to logout?
				</p>
				<div className="flex space-x-3">
					<button
						type="button"
						onClick={onCancel}
						className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="flex-1 py-3 bg-[#13070C] text-white rounded-2xl font-medium"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}
