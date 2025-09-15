"use client";

import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/context/QueryProider";

import { ReactNode } from "react";

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<QueryProvider>
			<AuthProvider>{children}</AuthProvider>
		</QueryProvider>
	);
}
