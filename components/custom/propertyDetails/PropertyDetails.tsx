"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useApproveProperty,
	useGetPropertyById,
	useRejectProperty,
} from "@/lib/hooks/useAdmin";
import { useParams, useRouter } from "next/navigation";

const PropertyDetails = () => {
	const { id } = useParams();
	const router = useRouter();
	const { data: propertyData } = useGetPropertyById(id as string);
	const approveMutation = useApproveProperty();
	const rejectMutation = useRejectProperty();

	const property = propertyData?.data;

	if (!property) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-lg text-blue-600 dark:text-blue-300 animate-pulse">
					Loading property details...
				</div>
			</div>
		);
	}

	const handleApprove = () => {
		approveMutation.mutate(property._id, {
			onSuccess: () => router.back(),
		});
	};

	const handleReject = () => {
		rejectMutation.mutate(property._id, {
			onSuccess: () => router.back(),
		});
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "approved":
				return (
					<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs sm:text-sm">
						Approved
					</Badge>
				);
			case "pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs sm:text-sm">
						Pending
					</Badge>
				);
			case "rejected":
				return (
					<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs sm:text-sm">
						Rejected
					</Badge>
				);
			default:
				return (
					<Badge variant="secondary" className="text-xs sm:text-sm">
						{status}
					</Badge>
				);
		}
	};

	return (
		<div className="container mx-auto sm:py-4 sm:px-2">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
					Property Review
				</h1>
				<Button
					variant="outline"
					onClick={() => router.back()}
					className="text-sm sm:text-base">
					Back to List
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<Card className="mb-4 sm:mb-6">
						<CardHeader className="pb-3 sm:pb-4">
							<div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
								<CardTitle className="text-xl sm:text-2xl">
									{property.title}
								</CardTitle>
								{getStatusBadge(property.approvalStatus)}
							</div>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 break-words">
								{property.description}
							</p>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
								<div>
									<h3 className="font-semibold text-base sm:text-lg mb-2">
										Basic Details
									</h3>
									<div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Type:
											</span>
											<span className="font-medium">
												{property.propertyType}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Listing Type:
											</span>
											<span className="font-medium">
												{property.listingType}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Price:
											</span>
											<span className="font-medium text-blue-600 dark:text-blue-400">
												Rs {(property.price ?? 0).toLocaleString()}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Area:
											</span>
											<span className="font-medium">
												{property.area?.value} {property.area?.unit}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Furnishing:
											</span>
											<span className="font-medium">{property.furnished}</span>
										</div>
									</div>
								</div>
								<div>
									<h3 className="font-semibold text-base sm:text-lg mb-2">
										Property Features
									</h3>
									<div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Bedrooms:
											</span>
											<span className="font-medium">
												{property.bedrooms ?? "-"}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Bathrooms:
											</span>
											<span className="font-medium">
												{property.bathrooms ?? "-"}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Balconies:
											</span>
											<span className="font-medium">
												{property.balconies ?? "-"}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Parking:
											</span>
											<span className="font-medium">
												{property.parking ?? "-"}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Property Age:
											</span>
											<span className="font-medium">{property.age} years</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Tabs defaultValue="images" className="mb-4 sm:mb-6">
						<TabsList className="grid grid-cols-4 sm:flex mb-3 sm:mb-0">
							<TabsTrigger
								value="images"
								className="text-xs sm:text-sm py-1.5 sm:py-2">
								Images
							</TabsTrigger>
							<TabsTrigger
								value="address"
								className="text-xs sm:text-sm py-1.5 sm:py-2">
								Address
							</TabsTrigger>
							<TabsTrigger
								value="contact"
								className="text-xs sm:text-sm py-1.5 sm:py-2">
								Contact
							</TabsTrigger>
							<TabsTrigger
								value="additional"
								className="text-xs sm:text-sm py-1.5 sm:py-2">
								Details
							</TabsTrigger>
						</TabsList>
						<TabsContent value="images">
							<Card>
								<CardContent className="pt-4 sm:pt-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
										{property.images?.map((image: string, index: number) => (
											<div key={index} className="rounded-lg overflow-hidden">
												<img
													src={image || "/placeholder.svg"}
													alt={`${property.title} - Image ${index + 1}`}
													className="w-full h-40 sm:h-48 object-cover"
												/>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="address">
							<Card>
								<CardContent className="pt-4 sm:pt-6">
									<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
										Address Details
									</h3>
									<div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Street:
											</span>
											<span className="font-medium">
												{property.address?.street}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Area:
											</span>
											<span className="font-medium">
												{property.address?.area}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												City:
											</span>
											<span className="font-medium">
												{property.address?.city}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												State:
											</span>
											<span className="font-medium">
												{property.address?.state}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Zip Code:
											</span>
											<span className="font-medium">
												{property.address?.zipCode}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Country:
											</span>
											<span className="font-medium">
												{property.address?.country}
											</span>
										</div>
										{property.address?.landmark && (
											<div className="flex justify-between">
												<span className="text-gray-600 dark:text-gray-400">
													Landmark:
												</span>
												<span className="font-medium">
													{property.address.landmark}
												</span>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="contact">
							<Card>
								<CardContent className="pt-4 sm:pt-6">
									<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
										Contact Information
									</h3>
									<div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Contact Name:
											</span>
											<span className="font-medium">
												{property.contact?.name}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Phone:
											</span>
											<span className="font-medium">
												{property.contact?.phone}
											</span>
										</div>
										{property.contact?.whatsapp && (
											<div className="flex justify-between">
												<span className="text-gray-600 dark:text-gray-400">
													WhatsApp:
												</span>
												<span className="font-medium">
													{property.contact.whatsapp}
												</span>
											</div>
										)}
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Contact Type:
											</span>
											<span className="font-medium capitalize">
												{property.contact?.type}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="additional">
							<Card>
								<CardContent className="pt-4 sm:pt-6">
									<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
										Additional Details
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
										{property.pricing?.basePrice && (
											<div>
												<h4 className="font-medium text-sm sm:text-base mb-2">
													Pricing Details
												</h4>
												<div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
													<div className="flex justify-between">
														<span className="text-gray-600 dark:text-gray-400">
															Base Price:
														</span>
														<span className="font-medium">
															Rs{" "}
															{(
																property.pricing?.basePrice ?? 0
															).toLocaleString()}
														</span>
													</div>
													{property.pricing?.maintenanceCharges && (
														<div className="flex justify-between">
															<span className="text-gray-600 dark:text-gray-400">
																Maintenance:
															</span>
															<span className="font-medium">
																Rs{" "}
																{(
																	property.pricing?.maintenanceCharges ?? 0
																).toLocaleString()}
															</span>
														</div>
													)}
													{property.pricing?.securityDeposit && (
														<div className="flex justify-between">
															<span className="text-gray-600 dark:text-gray-400">
																Security Deposit:
															</span>
															<span className="font-medium">
																Rs{" "}
																{(
																	property.pricing?.securityDeposit ?? 0
																).toLocaleString()}
															</span>
														</div>
													)}
													<div className="flex justify-between">
														<span className="text-gray-600 dark:text-gray-400">
															Price Negotiable:
														</span>
														<span className="font-medium">
															{property.pricing?.priceNegotiable ? "Yes" : "No"}
														</span>
													</div>
												</div>
											</div>
										)}
										<div>
											<h4 className="font-medium text-sm sm:text-base mb-2">
												Legal Information
											</h4>
											<div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-gray-400">
														Ownership Type:
													</span>
													<span className="font-medium capitalize">
														{property.legalInfo?.ownershipType}
													</span>
												</div>
												{/* {property.legalInfo?.rera && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">RERA Number:</span>
                              <span className="font-medium">{property.legalInfo.rera.number}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">RERA Approved:</span>
                              <span className="font-medium">
                                {property.legalInfo.rera.approved ? "Yes" : "No"}
                              </span>
                            </div>
                          </>
                        )} */}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Sidebar */}
				<div>
					<Card className="mb-4 sm:mb-6">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg sm:text-xl">
								Admin Actions
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 sm:space-y-4">
								<div className="text-sm text-gray-600 dark:text-gray-400">
									Current Status:{" "}
									<span className="font-medium capitalize">
										{property.approvalStatus}
									</span>
								</div>
								{property.approvalStatus === "pending" && (
									<div className="space-y-2 sm:space-y-3">
										<Button
											className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-2.5"
											onClick={handleApprove}
											disabled={approveMutation.status === "pending"}>
											{approveMutation.status === "pending"
												? "Approving..."
												: "Approve Property"}
										</Button>
										<Button
											variant="destructive"
											className="w-full text-sm sm:text-base py-2 sm:py-2.5"
											onClick={handleReject}
											disabled={rejectMutation.status === "pending"}>
											{rejectMutation.status === "pending"
												? "Rejecting..."
												: "Reject Property"}
										</Button>
									</div>
								)}
								{property.approvalStatus !== "pending" && (
									<div className="text-sm text-gray-500 dark:text-gray-400 italic">
										This property has already been {property.approvalStatus}.
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					<Card className="mb-4 sm:mb-6">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg sm:text-xl">
								Property Stats
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">
										Views:
									</span>
									<span className="font-medium">{property.views || 0}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">
										Likes:
									</span>
									<span className="font-medium">
										{property.likedBy?.length || 0}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">
										Leads:
									</span>
									<span className="font-medium">
										{property.contactedBy?.length || 0}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">
										Listed On:
									</span>
									<span className="font-medium">
										{new Date(property.createdAt).toLocaleDateString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">
										Last Updated:
									</span>
									<span className="font-medium">
										{new Date(property.updatedAt).toLocaleDateString()}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg sm:text-xl">Amenities</CardTitle>
						</CardHeader>

						<CardContent>
							<div className="flex flex-wrap gap-2">
								{property.amenities?.map((amenity: string, index: number) => (
									<Badge key={index} variant="secondary" className="mb-1">
										{amenity}
									</Badge>
								))}
								{(!property.amenities || property.amenities.length === 0) && (
									<p className="text-sm text-gray-500 dark:text-gray-400">
										No amenities listed
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetails;
