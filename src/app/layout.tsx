import type { Metadata } from "next";
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
			<body suppressHydrationWarning>{children}</body>
		</html>
	);
}
