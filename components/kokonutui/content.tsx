"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDashboard } from "@/lib/hooks/useAdmin";
import {
	Building2,
	CheckCircle,
	Clock,
	DollarSign,
	Eye,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import DashboardSkeleton from "../custom/skeleton/Dashboard";

export default function Content() {
	const { data: dashboardData, isLoading } = useAdminDashboard();

	const stats = dashboardData?.overview || {
		totalProperties: 0,
		activeUsers: 0,
		totalRevenue: 0,
		pendingApprovals: 0,
	};
	// Mock data for dashboard overview

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "approved":
				return (
					<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
						Approved
					</Badge>
				);
			case "pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
						Pending
					</Badge>
				);
			case "under_review":
				return (
					<Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
						Under Review
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};
	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Dashboard Overview
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Welcome to your real estate platform dashboard
				</p>
			</div>

			{/* Key Metrics */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Properties
						</CardTitle>
						<Building2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalProperties}</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+12.5%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.activeUsers}</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+8.2%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Revenue
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalRevenue}</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+24.1%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Approvals
						</CardTitle>
						<Clock className="h-4 w-4 text-yellow-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.pendingApprovals}</div>
						<p className="text-xs text-muted-foreground">Awaiting review</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Recent Properties */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<Building2 className="h-5 w-5" />
							Recent Properties
						</CardTitle>
						<Link href="/dashboard/properties">
							<Button variant="outline" size="sm">
								View All
							</Button>
						</Link>
					</CardHeader>
					<CardContent className="space-y-4">
						{dashboardData?.recentProperties?.map((property) => (
							<div
								key={property._id}
								className="flex items-center justify-between p-3 border rounded-lg">
								<div className="space-y-1">
									<div className="font-medium capitalize">{property.title}</div>
									<div className="text-sm text-gray-500">
										Agent: {property.seller.name}
									</div>
									<div className="text-sm text-gray-500"> </div>
									<div className="text-lg font-semibold text-blue-600">
										Rs {property.price}
									</div>
								</div>
								<div className="text-right">
									{getStatusBadge(property.status)}
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Recent Activity
						</CardTitle>
						<Link href="/dashboard/analytics">
							<Button variant="outline" size="sm">
								View Analytics
							</Button>
						</Link>
					</CardHeader>
					<CardContent className="space-y-4">
						{dashboardData?.recentActivities.map((activity, index: number) => (
							<div
								key={index}
								className="flex items-center gap-3 p-3 border rounded-lg">
								<div className="flex-shrink-0">
									{activity.type.includes("approved") && (
										<CheckCircle className="h-4 w-4 text-green-600" />
									)}
									{activity.type.includes("user_signup") && (
										<Users className="h-4 w-4 text-blue-600" />
									)}
									{activity.type.includes("inquiry") && (
										<Eye className="h-4 w-4 text-purple-600" />
									)}
									{activity.type.includes("completed") && (
										<DollarSign className="h-4 w-4 text-green-600" />
									)}
								</div>
								<div className="flex-1">
									<div className="text-sm font-medium">{activity.type}</div>
									<div className="text-xs text-gray-500">
										{activity.description &&
											`Description: ${activity.description}`}
									</div>
								</div>
								<div className="text-xs text-gray-400">
									{activity?.date
										? new Date(activity.date).toLocaleString()
										: "N/A"}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-4">
						<Link href="/dashboard/properties">
							<Button
								className="w-full h-20 flex flex-col gap-2 bg-transparent"
								variant="outline">
								<Building2 className="h-6 w-6" />
								<span>Manage Properties</span>
							</Button>
						</Link>
						<Link href="/dashboard/approvals">
							<Button
								className="w-full h-20 flex flex-col gap-2 bg-transparent"
								variant="outline">
								<CheckCircle className="h-6 w-6" />
								<span>Review Approvals</span>
							</Button>
						</Link>
						<Link href="/dashboard/agents">
							<Button
								className="w-full h-20 flex flex-col gap-2 bg-transparent"
								variant="outline">
								<Users className="h-6 w-6" />
								<span>Manage Agents</span>
							</Button>
						</Link>
						<Link href="/dashboard/analytics">
							<Button
								className="w-full h-20 flex flex-col gap-2 bg-transparent"
								variant="outline">
								<TrendingUp className="h-6 w-6" />
								<span>View Analytics</span>
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
