"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsDashboardSkeleton() {
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
							<Skeleton className="h-7 w-16 mb-2" />
							<Skeleton className="h-3 w-32" />
						</CardContent>
					</Card>
				))}
			</div>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">
						<Skeleton className="h-4 w-16" />
					</TabsTrigger>
					<TabsTrigger value="properties">
						<Skeleton className="h-4 w-20" />
					</TabsTrigger>
					<TabsTrigger value="locations">
						<Skeleton className="h-4 w-20" />
					</TabsTrigger>
					<TabsTrigger value="performance">
						<Skeleton className="h-4 w-24" />
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						{[1, 2].map((i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="h-5 w-40 mb-2" />
									<Skeleton className="h-4 w-60" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-64 w-full" />
								</CardContent>
							</Card>
						))}
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						{[3, 4].map((i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="h-5 w-40 mb-2" />
									<Skeleton className="h-4 w-60" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-64 w-full" />
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="properties" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-3">
						{[1, 2, 3].map((i) => (
							<Card key={i}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-4 rounded-full" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-7 w-16 mb-1" />
									<Skeleton className="h-3 w-28" />
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="locations" className="space-y-4">
					<Card>
						<CardHeader>
							<Skeleton className="h-5 w-48 mb-2" />
							<Skeleton className="h-4 w-72" />
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="flex items-center justify-between p-4 border rounded-lg">
										<div className="flex items-center gap-3">
											<Skeleton className="h-5 w-5 rounded-full" />
											<div>
												<Skeleton className="h-4 w-24 mb-1" />
												<Skeleton className="h-3 w-20" />
											</div>
										</div>
										<div className="text-right">
											<Skeleton className="h-4 w-16 mb-1" />
											<Skeleton className="h-3 w-14" />
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="performance" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<Skeleton className="h-5 w-40 mb-2" />
								<Skeleton className="h-4 w-60" />
							</CardHeader>
							<CardContent className="space-y-4">
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className="flex justify-between items-center">
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-6 w-16 rounded-full" />
									</div>
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Skeleton className="h-5 w-32 mb-2" />
								<Skeleton className="h-4 w-48" />
							</CardHeader>
							<CardContent className="space-y-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<div key={i} className="flex items-center gap-3">
										<Skeleton className="h-3 w-48" />
										<Skeleton className="h-3 w-12 ml-auto" />
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
