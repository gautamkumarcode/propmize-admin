"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
	return (
		<div className="space-y-6">
			<div>
				<Skeleton className="h-8 w-64 mb-2" />
				<Skeleton className="h-4 w-80" />
			</div>

			{/* Key Metrics Skeleton */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[1, 2, 3, 4].map((i) => (
					<Card key={i}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-4 rounded-full" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-7 w-16 mb-1" />
							<Skeleton className="h-3 w-28" />
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Recent Properties Skeleton */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" />
							<Skeleton className="h-5 w-32" />
						</div>
						<Skeleton className="h-9 w-20" />
					</CardHeader>
					<CardContent className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="flex items-center justify-between p-3 border rounded-lg">
								<div className="space-y-2 flex-1">
									<Skeleton className="h-4 w-40" />
									<Skeleton className="h-3 w-32" />
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-5 w-20" />
								</div>
								<Skeleton className="h-6 w-16 rounded-full" />
							</div>
						))}
					</CardContent>
				</Card>

				{/* Recent Activity Skeleton */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" />
							<Skeleton className="h-5 w-32" />
						</div>
						<Skeleton className="h-9 w-24" />
					</CardHeader>
					<CardContent className="space-y-4">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="flex items-center gap-3 p-3 border rounded-lg">
								<Skeleton className="h-4 w-4 rounded-full" />
								<div className="flex-1 space-y-2">
									<Skeleton className="h-3 w-48" />
									<Skeleton className="h-3 w-36" />
								</div>
								<Skeleton className="h-3 w-20" />
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions Skeleton */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-32" />
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-4">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="w-full h-20">
								<Skeleton className="w-full h-full rounded-md" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
