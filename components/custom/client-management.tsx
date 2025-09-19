"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCreateClient, useGetAllClients } from "@/lib/hooks/useAdmin";
import {
	DollarSign,
	Eye,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	Search,
	TrendingUp,
	UserPlus,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ClientManagement() {
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newClient, setNewClient] = useState({
		name: "",
		email: "",
		phone: "",
		role: "",
	});

	// Only send params if they have values
	const searchParams: Record<string, string> = {};
	if (statusFilter && statusFilter !== "all")
		searchParams.status = statusFilter;
	if (typeFilter && typeFilter !== "all") searchParams.type = typeFilter;
	if (searchTerm) searchParams.search = searchTerm;

	const {
		data: clientsData = [],
		isLoading,
		isRefetching,
		isError,
	} = useGetAllClients(
		searchParams.status,
		searchParams.type,
		searchParams.search
	);

	const filteredClients = clientsData;

	// if (isLoading || !clientsData || isRefetching) {
	// 	return <ClientManagementSkeleton />;
	// }
	const getTypeBadge = (type: string) => {
		switch (type) {
			case "buyer":
				return (
					<Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
						Buyer
					</Badge>
				);
			case "seller":
				return (
					<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
						Seller
					</Badge>
				);
			case "investor":
				return (
					<Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
						Investor
					</Badge>
				);
			default:
				return <Badge variant="secondary">{type}</Badge>;
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return (
					<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
						Active
					</Badge>
				);
			case "inactive":
				return (
					<Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
						Inactive
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const buyers = clientsData.filter((c) => c.role === "buyer");
	const sellers = clientsData.filter((c) => c.role === "seller");
	const investors = clientsData.filter((c) => c.role === "investor");

	const createClientMutation = useCreateClient();
	const handleCreateClient = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createClientMutation.mutate(newClient, {
			onSuccess: () => {
				setIsAddDialogOpen(false);
				setNewClient({ name: "", email: "", phone: "", role: "" });
			},
			onError: (error: unknown) => {
				console.error("Error creating client:", error);
				alert("Failed to create client");
			},
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Client Management
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Manage buyers, sellers, and investors
					</p>
				</div>
				<Button onClick={() => setIsAddDialogOpen(true)}>
					<UserPlus className="h-4 w-4 mr-2" />
					Add New Client
				</Button>

				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogContent className="max-w-[90vw] md:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add New Client</DialogTitle>
							<DialogDescription>
								Enter details to create a new client.
							</DialogDescription>
						</DialogHeader>
						<form
							onSubmit={handleCreateClient}
							className="grid gap-4 py-4"
							action="">
							<div className="flex flex-col gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									name="name"
									placeholder="Client Name"
									required
									value={newClient.name}
									onChange={(e) =>
										setNewClient((c) => ({ ...c, name: e.target.value }))
									}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="Email"
									required
									value={newClient.email}
									onChange={(e) =>
										setNewClient((c) => ({ ...c, email: e.target.value }))
									}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="phone">Phone</Label>
								<Input
									id="phone"
									name="phone"
									placeholder="Phone"
									required
									value={newClient.phone}
									onChange={(e) => {
										const value = e.target.value;
										const phoneRegex = /^[0-9]*$/;
										if (value === "" || phoneRegex.test(value)) {
											value.length <= 10 &&
												setNewClient((c) => ({ ...c, phone: value }));
										}
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="type">Type</Label>
								<Select
									required
									value={newClient.role}
									onValueChange={(value) =>
										setNewClient((c) => ({ ...c, role: value }))
									}>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="buyer">Buyer</SelectItem>
										<SelectItem value="seller">Seller</SelectItem>
										<SelectItem value="investor">Investor</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex justify-end gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsAddDialogOpen(false)}>
									Cancel
								</Button>
								<Button type="submit">
									{createClientMutation.isPending
										? "Creating..."
										: "Create Client"}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Summary Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Clients</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{clientsData.length}</div>
						<p className="text-xs text-muted-foreground">
							{clientsData.filter((c) => c.isActive === true).length} active
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Buyers</CardTitle>
						<UserPlus className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{buyers.length}</div>
						<p className="text-xs text-muted-foreground">
							Avg budget: Rs{" "}
							{(
								buyers.reduce((sum, b) => sum + (b.propertyValue || 0), 0) /
								buyers.length /
								1000
							).toFixed(0)}
							K
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Sellers</CardTitle>
						<TrendingUp className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{sellers.length}</div>
						<p className="text-xs text-muted-foreground">Properties listed</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Investors</CardTitle>
						<DollarSign className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{investors.length}</div>
						<p className="text-xs text-muted-foreground">High-value clients</p>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<Input
								placeholder="Search clients..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="buyer">Buyers</SelectItem>
								<SelectItem value="seller">Sellers</SelectItem>
								<SelectItem value="investor">Investors</SelectItem>
							</SelectContent>
						</Select>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="inactive">Inactive</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Clients List */}
			{isLoading && (
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
			)}
			{!isRefetching && filteredClients.length > 0 && (
				<div className="grid gap-4">
					{filteredClients.map((client) => (
						<Card key={client._id}>
							<CardContent className="p-6">
								<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
									<div className="flex items-center gap-4">
										<Avatar className="h-12 w-12">
											<AvatarImage
												src={client.avatar || "/placeholder.svg"}
												alt={client.name}
											/>
											<AvatarFallback>
												{client?.name
													?.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<h3 className="font-semibold">{client.name}</h3>
												{getTypeBadge(client.role)}
												{getStatusBadge(
													client.isActive ? "active" : "inactive"
												)}
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
												<div className="flex items-center gap-1">
													<Mail className="h-3 w-3" />
													{client.email}
												</div>
												<div className="flex items-center gap-1">
													<Phone className="h-3 w-3" />
													{client.phone}
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-3 w-3" />
													{client.address.city}, {client.address.state}
												</div>
											</div>
											<div className="text-sm text-gray-500">
												Agent: {client.name} • Joined{" "}
												{new Date(client.createdAt).toLocaleDateString()}
											</div>
										</div>
									</div>

									<div className="flex items-center gap-6">
										{client.role === "buyer" && (
											<>
												<div className="text-center">
													<div className="text-lg font-semibold">
														Rs{" "}
														{(
															Number(client.preferences.priceRange.max) / 1000
														).toFixed(0)}
														K
													</div>
													<div className="text-xs text-gray-500">Budget</div>
												</div>
												<div className="text-center">
													<div className="text-lg font-semibold">
														{client.propertiesViewed}
													</div>
													<div className="text-xs text-gray-500">Viewed</div>
												</div>
											</>
										)}
										{client.role === "seller" && (
											<>
												<div className="text-center">
													<div className="text-lg font-semibold">
														Rs{" "}
														{(Number(client.propertyValue) / 1000).toFixed(0)}K
													</div>
													<div className="text-xs text-gray-500">
														Property Value
													</div>
												</div>
												<div className="text-center">
													<div className="text-lg font-semibold">
														{client.propertiesCount || 0}
													</div>
													<div className="text-xs text-gray-500">Listed</div>
												</div>
											</>
										)}
										{/* {client.role === "investor" && (
										<>
											<div className="text-center">
												<div className="text-lg font-semibold">
													Rs {(Number(client.budget) / 1000).toFixed(0)}K
												</div>
												<div className="text-xs text-gray-500">
													Investment Budget
												</div>
											</div>
											<div className="text-center">
												<div className="text-lg font-semibold">
													{client.propertiesViewed}
												</div>
												<div className="text-xs text-gray-500">Properties</div>
											</div>
										</>
									)} */}
										<div className="text-center">
											<div className="text-sm text-gray-500">Last Active</div>
											<div className="text-xs">
												{new Date(client.updatedAt).toLocaleDateString()}
											</div>
										</div>
										<div className="flex gap-2">
											<Button variant="outline" size="sm">
												<Eye className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="sm">
												<MessageSquare className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{filteredClients.length === 0 && (
				<Card>
					<CardContent className="p-12 text-center">
						<div className="text-gray-500 dark:text-gray-400">
							No clients found matching your criteria.
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
