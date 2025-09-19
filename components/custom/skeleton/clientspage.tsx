"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function ClientManagementSkeleton() {
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<Skeleton className="h-8 w-48 mb-2" />
					<Skeleton className="h-4 w-64" />
				</div>
				<Skeleton className="h-10 w-32" />
			</div>

			{/* Summary Cards Skeleton */}
			<div className="grid gap-4 md:grid-cols-4">
				{[1, 2, 3, 4].map((i) => (
					<Card key={i}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-4 rounded-full" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-7 w-16 mb-1" />
							<Skeleton className="h-3 w-24" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Filters Skeleton */}
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center">
						<Skeleton className="h-10 flex-1" />
						<Skeleton className="h-10 w-[180px]" />
						<Skeleton className="h-10 w-[180px]" />
					</div>
				</CardContent>
			</Card>

			{/* Clients List Skeleton */}
			<div className="grid gap-4">
				{[1, 2, 3, 4, 5].map((i) => (
					<Card key={i}>
						<CardContent className="p-6">
							<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
								<div className="flex items-center gap-4">
									<Skeleton className="h-12 w-12 rounded-full" />
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Skeleton className="h-5 w-32" />
											<Skeleton className="h-6 w-16 rounded-full" />
											<Skeleton className="h-6 w-16 rounded-full" />
										</div>
										<div className="flex flex-wrap gap-4">
											<Skeleton className="h-3 w-40" />
											<Skeleton className="h-3 w-32" />
											<Skeleton className="h-3 w-36" />
										</div>
										<Skeleton className="h-3 w-48" />
									</div>
								</div>

								<div className="flex items-center gap-6">
									<div className="text-center">
										<Skeleton className="h-6 w-16 mb-1" />
										<Skeleton className="h-3 w-12" />
									</div>
									<div className="text-center">
										<Skeleton className="h-6 w-12 mb-1" />
										<Skeleton className="h-3 w-16" />
									</div>
									<div className="text-center">
										<Skeleton className="h-4 w-20 mb-1" />
										<Skeleton className="h-3 w-16" />
									</div>
									<div className="flex gap-2">
										<Skeleton className="h-9 w-9 rounded-md" />
										<Skeleton className="h-9 w-9 rounded-md" />
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
