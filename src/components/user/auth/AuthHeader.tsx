import { Wallet } from "lucide-react";

interface AuthHeaderProps {
	title: string;
	description: string;
}

export default function AuthHeader({ title, description }: AuthHeaderProps) {
	return (
		<header className="text-center mb-8">
			<div className="w-16 h-16 bg-[#13070C] rounded-2xl flex items-center justify-center mx-auto mb-4">
				<Wallet className="w-8 h-8 text-white" />
			</div>
			<h1 className="text-2xl font-bold text-[#13070C]">{title}</h1>
			<p className="text-gray-600 mt-2">{description}</p>
		</header>
	);
}
