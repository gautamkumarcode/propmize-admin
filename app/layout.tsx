import { Providers } from "@/components/provider/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import logo from "../assests/logo.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Propmize admin Dashboard",
	description: "Admin dashboard for Propmize - Real Estate Platform",
	generator: "Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<link rel="icon" href={logo.src} />
			</head>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
