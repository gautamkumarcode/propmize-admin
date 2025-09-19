"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	getAllProperties,
	useApproveProperty,
	useRejectProperty,
} from "@/lib/hooks/useAdmin";
import {
	Bath,
	Bed,
	CheckCircle,
	Eye,
	MapPin,
	Search,
	Square,
	XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    status: "pending",
    type: "apartment",
    image: "/modern-apartment-living.png",
    listedDate: "2024-01-15",
    agent: "John Smith",
  },
  {
    id: 2,
    title: "Luxury Family Home",
    address: "456 Oak Ave, Suburbs",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    status: "approved",
    type: "house",
    image: "/luxury-family-home.jpg",
    listedDate: "2024-01-12",
    agent: "Sarah Johnson",
  },
  {
    id: 3,
    title: "Cozy Studio Loft",
    address: "789 Pine St, Arts District",
    price: 280000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    status: "rejected",
    type: "studio",
    image: "/cozy-studio-loft.jpg",
    listedDate: "2024-01-10",
    agent: "Mike Davis",
  },
  {
    id: 4,
    title: "Waterfront Condo",
    address: "321 Beach Blvd, Waterfront",
    price: 620000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    status: "pending",
    type: "condo",
    image: "/waterfront-condo.png",
    listedDate: "2024-01-08",
    agent: "Lisa Chen",
  },
]

export default function PropertyListings() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const router = useRouter();
	const { data: propertiesData = [], isLoading, isError } = getAllProperties();

	// const filteredProperties = properties?.filter((property) => {
	// 	const matchesSearch =
	// 		property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		property.address?.city?.toLowerCase().includes(searchTerm.toLowerCase());
	// 	const matchesStatus =
	// 		statusFilter === "all" || property.status === statusFilter;
	// 	const matchesType =
	// 		typeFilter === "all" || property.propertyType === typeFilter;

	// 	return matchesSearch && matchesStatus && matchesType;
	// });
	const approveMutation = useApproveProperty();
	const rejectMutation = useRejectProperty();

	const handleApprove = (id: string) => {
		approveMutation.mutate(id);
	};

	const handleReject = (id: string) => {
		rejectMutation.mutate(id);
	};

	const handleView = (id: string) => {
		// Navigate to property details page
		router.push(`/dashboard/properties/${id}`);
	};

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
			case "rejected":
				return (
					<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
						Rejected
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Property Listings
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Manage and approve property listings
					</p>
				</div>
				<Button>Add New Property</Button>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<Input
								placeholder="Search properties..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="house">House</SelectItem>
								<SelectItem value="apartment">Apartment</SelectItem>
								<SelectItem value="condo">Condo</SelectItem>
								<SelectItem value="studio">Studio</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Property Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{propertiesData?.map((property) => (
					<Card key={property._id} className="overflow-hidden">
						<div className="relative">
							<img
								src={property.images[0] || "/placeholder.svg"}
								alt={property.title}
								className="h-48 w-full object-cover"
							/>
							<div className="absolute top-2 right-2">
								{getStatusBadge(property.approvalStatus)}
							</div>
						</div>
						<CardHeader>
							<CardTitle className="text-lg">{property.title}</CardTitle>
							<CardDescription className="flex items-center gap-1">
								<MapPin className="h-4 w-4" />
								{property.address.city},{property.address.state}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
								Rs {(property.price ?? 0).toLocaleString()}
							</div>

							<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
								<div className="flex items-center gap-1">
									<Bed className="h-4 w-4" />
									{property.bedrooms} bed
								</div>
								<div className="flex items-center gap-1">
									<Bath className="h-4 w-4" />
									{property.bathrooms} bath
								</div>
								<div className="flex items-center gap-1">
									<Square className="h-4 w-4" />
									{property.area.value} {property.area.unit}
								</div>
							</div>

							<div className="text-sm text-gray-500 dark:text-gray-400">
								Listed by {property.seller.name} on{" "}
								{new Date(property.createdAt).toLocaleDateString()}
							</div>

							<div className="flex gap-2">
								<Button
									variant="outline"
									onClick={() => handleView(property._id)}
									size="sm"
									className="flex-1 bg-transparent">
									<Eye className="h-4 w-4 mr-1" />
									View
								</Button>
								{property.status === "pending" && (
									<>
										<Button
											size="sm"
											className="bg-green-600 hover:bg-green-700"
											onClick={() => handleApprove(property._id)}>
											<CheckCircle className="h-4 w-4 mr-1" />
											Approve
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() => handleReject(property._id)}>
											<XCircle className="h-4 w-4 mr-1" />
											Reject
										</Button>
									</>
								)}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{propertiesData?.length === 0 && (
				<Card>
					<CardContent className="p-12 text-center">
						<div className="text-gray-500 dark:text-gray-400">
							No properties found matching your criteria.
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
