import NotificationListener from "@/components/custom/notificationdropdown/NotificationListerner";
import Layout from "@/components/kokonutui/layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Layout>{children}</Layout>
				<NotificationListener />
			</body>
		</html>
	);
}
