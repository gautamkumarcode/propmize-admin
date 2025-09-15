"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAnalyticsDashboard } from "@/lib/hooks/useAdmin";
import {
	Building2,
	CheckCircle,
	Clock,
	DollarSign,
	Eye,
	MapPin,
	TrendingDown,
	TrendingUp,
	Users,
} from "lucide-react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsDashboard() {
	const { data: data, isLoading, error } = useGetAnalyticsDashboard();

	if (isLoading) {
		return <Skeleton className="h-[600px] w-full" />;
	}
	if (error || !data) {
		return <div className="text-red-500">Failed to load analytics.</div>;
	}

	// Map API data to chart formats
	const monthlyData = data.monthlyStats.map(
		(item) => ({
			month: `${item._id.month}/${item._id.year}`,
			listings: item.listings,
			sales: item.sales,
			revenue:
				data.monthlyRevenue.find(
					(rev  ) =>
						rev._id.month === item._id.month && rev._id.year === item._id.year
				)?.revenue || 0,
		})
	);

	const propertyTypeData = data.propertyTypeStats.map(
		(item: { _id: string; value: number }) => ({
			name: item._id,
			value: item.value,
			color: "#3B82F6", // You can map colors based on type if needed
		})
	);

	const locationData = data.locationStats.map(
		(loc: { _id: string; properties: number; avgPrice: number }) => ({
			location: loc._id,
			properties: loc.properties,
			avgPrice: loc.avgPrice,
		})
	);

	const weeklyViewsData = [
		{ day: "Mon", views: Math.floor(data.keyMetrics.pageViews / 7) },
		{ day: "Tue", views: Math.floor(data.keyMetrics.pageViews / 7) },
		{ day: "Wed", views: Math.floor(data.keyMetrics.pageViews / 7) },
		{ day: "Thu", views: Math.floor(data.keyMetrics.pageViews / 7) },
		{ day: "Fri", views: Math.floor(data.keyMetrics.pageViews / 7) },
		{ day: "Sat", views: Math.floor(data.keyMetrics.pageViews / 7) },
		{ day: "Sun", views: Math.floor(data.keyMetrics.pageViews / 7) },
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Analytics Dashboard
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Track your real estate platform performance
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
						<div className="text-2xl font-bold">
							{data.keyMetrics.totalProperties}
						</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600 flex items-center gap-1">
								<TrendingUp className="h-3 w-3" />
								{(() => {
									const prev = data.keyMetrics.prevTotalProperties;
									const curr = data.keyMetrics.totalProperties;
									if (typeof prev === "number" && prev > 0) {
										const percent = ((curr - prev) / prev) * 100;
										return `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}%`;
									}
									return "N/A";
								})()}
							</span>
							from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{data.keyMetrics.activeUsers}
						</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600 flex items-center gap-1">
								<TrendingUp className="h-3 w-3" />
								{(() => {
									const prev = data.keyMetrics.prevActiveUsers;
									const curr = data.keyMetrics.activeUsers;
									if (typeof prev === "number" && prev > 0) {
										const percent = ((curr - prev) / prev) * 100;
										return `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}%`;
									}
									return "N/A";
								})()}
							</span>
							from last month
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
						<div className="text-2xl font-bold">
							{"Rs" + data.keyMetrics.totalRevenue.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600 flex items-center gap-1">
								<TrendingUp className="h-3 w-3" />
								{(() => {
									const prev = data.keyMetrics.prevTotalRevenue;
									const curr = data.keyMetrics.totalRevenue;
									if (typeof prev === "number" && prev > 0) {
										const percent = ((curr - prev) / prev) * 100;
										return `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}%`;
									}
									return "N/A";
								})()}
							</span>
							from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Page Views</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{data.keyMetrics.pageViews.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-red-600 flex items-center gap-1">
								<TrendingDown className="h-3 w-3" />
								{(() => {
									const prev = data.keyMetrics.prevPageViews;
									const curr = data.keyMetrics.pageViews;
									if (typeof prev === "number" && prev > 0) {
										const percent = ((curr - prev) / prev) * 100;
										return `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}%`;
									}
									return "N/A";
								})()}
							</span>
							from last month
						</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="properties">Properties</TabsTrigger>
					<TabsTrigger value="locations">Locations</TabsTrigger>
					<TabsTrigger value="performance">Performance</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Monthly Listings & Sales</CardTitle>
								<CardDescription>
									Track property listings and successful sales
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={monthlyData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Bar dataKey="listings" fill="#3B82F6" name="Listings" />
										<Bar dataKey="sales" fill="#10B981" name="Sales" />
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Revenue Trend</CardTitle>
								<CardDescription>Monthly revenue performance</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<AreaChart data={monthlyData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip
											formatter={(value) => [
												`$${(value as number).toLocaleString()}`,
												"Revenue",
											]}
										/>
										<Area
											type="monotone"
											dataKey="revenue"
											stroke="#3B82F6"
											fill="#3B82F6"
											fillOpacity={0.3}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Property Types Distribution</CardTitle>
								<CardDescription>
									Breakdown of property types on platform
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={propertyTypeData}
											cx="50%"
											cy="50%"
											outerRadius={80}
											dataKey="value"
											label={(props) => {
												const { name, value } = props;
												const total = propertyTypeData.reduce(
													(sum: number, entry: { value: number }) =>
														sum + entry.value,
													0
												);
												const percent =
													typeof value === "number" ? value / total : 0;
												return `${name} ${(percent * 100).toFixed(0)}%`;
											}}>
											{propertyTypeData.map(
												(
													entry: { color: string | undefined },
													index: number
												) => (
													<Cell key={`cell-${index}`} fill={entry.color} />
												)
											)}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Weekly Page Views</CardTitle>
								<CardDescription>
									Daily website traffic this week
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<LineChart data={weeklyViewsData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="day" />
										<YAxis />
										<Tooltip />
										<Line
											type="monotone"
											dataKey="views"
											stroke="#3B82F6"
											strokeWidth={2}
										/>
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="properties" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-3">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Pending Approvals
								</CardTitle>
								<Clock className="h-4 w-4 text-yellow-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{data.propertiesMetrics.pendingApprovals}
								</div>
								<p className="text-xs text-muted-foreground">
									Properties awaiting review
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Approved Today
								</CardTitle>
								<CheckCircle className="h-4 w-4 text-green-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{data.propertiesMetrics.approvedToday}
								</div>
								<p className="text-xs text-muted-foreground">
									Properties approved today
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Average Price
								</CardTitle>
								<DollarSign className="h-4 w-4 text-blue-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									${data.propertiesMetrics.avgPrice.toLocaleString()}
								</div>
								<p className="text-xs text-muted-foreground">
									Across all properties
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="locations" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Properties by Location</CardTitle>
							<CardDescription>
								Distribution and average prices across different areas
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{locationData.map(
									(
										location: {
											location: string;
											properties: number;
											avgPrice: number;
										},
										index: number
									) => (
										<div
											key={index}
											className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center gap-3">
												<MapPin className="h-5 w-5 text-blue-600" />
												<div>
													<div className="font-medium">{location.location}</div>
													<div className="text-sm text-gray-500">
														{location.properties} properties
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="font-semibold">
													${location.avgPrice.toLocaleString()}
												</div>
												<div className="text-sm text-gray-500">avg price</div>
											</div>
										</div>
									)
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="performance" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Conversion Metrics</CardTitle>
								<CardDescription>Key performance indicators</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-sm">Listing to Sale Rate</span>
									<Badge className="bg-green-100 text-green-800">
										{data.conversionMetrics.listingToSaleRate}%
									</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Average Days on Market</span>
									<Badge variant="secondary">
										{data.conversionMetrics.avgDaysOnMarket} days
									</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">User Engagement Rate</span>
									<Badge className="bg-blue-100 text-blue-800">
										{data.conversionMetrics.userEngagementRate}%
									</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Return Visitor Rate</span>
									<Badge className="bg-purple-100 text-purple-800">
										{data.conversionMetrics.returnVisitorRate}%
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>Latest platform activities</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								{data.recentActivity.map(
									(
										activity: { description: string; time: string },
										idx: number
									) => (
										<div key={idx} className="flex items-center gap-3 text-sm">
											{/* You can use icons based on activity.type if desired */}
											<span>{activity.description}</span>
											<span className="text-gray-500 ml-auto">
												{activity.time}
											</span>
										</div>
									)
								)}
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
