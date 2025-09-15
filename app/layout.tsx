import { Providers } from "@/components/provider/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "KokonutUI Dashboard",
	description: "A modern dashboard with theme switching",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
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
