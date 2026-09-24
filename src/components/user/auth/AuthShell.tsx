import type { ReactNode } from "react";

interface AuthShellProps {
	children: ReactNode;
}

export default function AuthShell({ children }: AuthShellProps) {
	return (
		<main className="min-h-screen bg-[#EFF9F0] flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="bg-white rounded-2xl shadow-xl p-8">{children}</div>
			</div>
		</main>
	);
}
