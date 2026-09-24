import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
	title: "Numora",
	description: "Numora financial services",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<NextTopLoader
					color="#13070C"
					height={3}
					showSpinner={false}
					shadow={false}
					zIndex={9999}
				/>
				{children}
			</body>
		</html>
	);
}
