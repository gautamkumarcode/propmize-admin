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

// Mock data for analytics
const monthlyData = [
	{ month: "Jan", listings: 45, sales: 32, revenue: 2400000 },
	{ month: "Feb", listings: 52, sales: 38, revenue: 2800000 },
	{ month: "Mar", listings: 48, sales: 35, revenue: 2600000 },
	{ month: "Apr", listings: 61, sales: 42, revenue: 3200000 },
	{ month: "May", listings: 55, sales: 39, revenue: 2900000 },
	{ month: "Jun", listings: 67, sales: 48, revenue: 3600000 },
];

const propertyTypeData = [
	{ name: "Houses", value: 45, color: "#3B82F6", percent: 45 / 100 },
	{ name: "Apartments", value: 30, color: "#10B981", percent: 30 / 100 },
	{ name: "Condos", value: 20, color: "#F59E0B", percent: 20 / 100 },
	{ name: "Studios", value: 5, color: "#EF4444", percent: 5 / 100 },
];

const locationData = [
	{ location: "Downtown", properties: 85, avgPrice: 450000 },
	{ location: "Suburbs", properties: 120, avgPrice: 380000 },
	{ location: "Waterfront", properties: 45, avgPrice: 620000 },
	{ location: "Arts District", properties: 35, avgPrice: 320000 },
	{ location: "Business District", properties: 65, avgPrice: 520000 },
];

const weeklyViewsData = [
	{ day: "Mon", views: 1200 },
	{ day: "Tue", views: 1400 },
	{ day: "Wed", views: 1100 },
	{ day: "Thu", views: 1600 },
	{ day: "Fri", views: 1800 },
	{ day: "Sat", views: 2200 },
	{ day: "Sun", views: 1900 },
];

export default function AnalyticsDashboard() {
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
						<div className="text-2xl font-bold">1,234</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600 flex items-center gap-1">
								<TrendingUp className="h-3 w-3" />
								+12.5%
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
						<div className="text-2xl font-bold">8,456</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600 flex items-center gap-1">
								<TrendingUp className="h-3 w-3" />
								+8.2%
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
						<div className="text-2xl font-bold">$3.6M</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600 flex items-center gap-1">
								<TrendingUp className="h-3 w-3" />
								+24.1%
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
						<div className="text-2xl font-bold">45.2K</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-red-600 flex items-center gap-1">
								<TrendingDown className="h-3 w-3" />
								-2.1%
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
													(sum, entry) => sum + entry.value,
													0
												);
												const percent =
													typeof value === "number" ? value / total : 0;
												return `${name} ${(percent * 100).toFixed(0)}%`;
											}}>
											{propertyTypeData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
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
								<div className="text-2xl font-bold">23</div>
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
								<div className="text-2xl font-bold">12</div>
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
								<div className="text-2xl font-bold">$485K</div>
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
								{locationData.map((location, index) => (
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
								))}
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
									<Badge className="bg-green-100 text-green-800">68.5%</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Average Days on Market</span>
									<Badge variant="secondary">24 days</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">User Engagement Rate</span>
									<Badge className="bg-blue-100 text-blue-800">84.2%</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Return Visitor Rate</span>
									<Badge className="bg-purple-100 text-purple-800">42.1%</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>Latest platform activities</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center gap-3 text-sm">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<span>Property approved: Downtown Loft</span>
									<span className="text-gray-500 ml-auto">2m ago</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Building2 className="h-4 w-4 text-blue-600" />
									<span>New listing: Suburban Home</span>
									<span className="text-gray-500 ml-auto">15m ago</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Users className="h-4 w-4 text-purple-600" />
									<span>New agent registered</span>
									<span className="text-gray-500 ml-auto">1h ago</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<DollarSign className="h-4 w-4 text-green-600" />
									<span>Sale completed: $650K</span>
									<span className="text-gray-500 ml-auto">3h ago</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
