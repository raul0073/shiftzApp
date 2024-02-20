
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.scss";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/root/ThemeProvider";
import { ConfigProvider } from "antd";
const inter = Inter({ subsets: ["latin"] });
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata: Metadata = {
	title: "Shift Orginaizer",
	description: "rm product",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={clerkKey}>
			<html lang="en" suppressHydrationWarning>
				<StoreProvider>
					<body className={inter.className}>
					<ConfigProvider
					 theme={{
      components: {
       Calendar: {
        itemActiveBg: '#ededed'
	   }
      },
    }}
					>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem
							disableTransitionOnChange>
							{children}
							<Toaster />
						</ThemeProvider>
					</ConfigProvider>
					</body>
				</StoreProvider>
			</html>
		</ClerkProvider>
	);
}
