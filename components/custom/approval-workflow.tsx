"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	AlertTriangle,
	Bath,
	Bed,
	Calendar,
	CheckCircle,
	Clock,
	Eye,
	MapPin,
	Search,
	Square,
	User,
	XCircle,
} from "lucide-react";
import { useState } from "react";

// Mock data for pending approvals
const mockApprovals = [
  {
    id: 1,
    propertyTitle: "Modern Downtown Loft",
    address: "123 Main St, Downtown",
    price: 650000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    agent: "John Smith",
    submittedDate: "2024-01-20",
    status: "pending",
    priority: "high",
    images: ["/placeholder.svg?height=200&width=300&text=Property1"],
    description: "Stunning modern loft in the heart of downtown with floor-to-ceiling windows and premium finishes.",
    issues: [],
    documents: ["Property Deed", "Inspection Report", "Photos"],
  },
  {
    id: 2,
    propertyTitle: "Family Home with Garden",
    address: "456 Oak Ave, Suburbs",
    price: 485000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    agent: "Sarah Johnson",
    submittedDate: "2024-01-19",
    status: "under_review",
    priority: "medium",
    images: ["/placeholder.svg?height=200&width=300&text=Property2"],
    description: "Spacious family home with large backyard, perfect for families with children.",
    issues: ["Missing floor plan", "Unclear property boundaries"],
    documents: ["Property Deed", "Photos"],
  },
  {
    id: 3,
    propertyTitle: "Luxury Waterfront Condo",
    address: "789 Beach Blvd, Waterfront",
    price: 890000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    agent: "Lisa Chen",
    submittedDate: "2024-01-18",
    status: "needs_revision",
    priority: "low",
    images: ["/placeholder.svg?height=200&width=300&text=Property3"],
    description: "Luxury condo with stunning ocean views and premium amenities.",
    issues: ["Price verification needed", "HOA documents missing"],
    documents: ["Property Deed", "Photos", "HOA Rules"],
  },
]

export default function ApprovalWorkflow() {
  const [approvals, setApprovals] = useState(mockApprovals)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  const handleApprove = (id: number) => {
    setApprovals((prev) =>
      prev.map((approval) => (approval.id === id ? { ...approval, status: "approved" } : approval)),
    )
    setSelectedProperty(null)
  }

  const handleReject = (id: number) => {
    setApprovals((prev) =>
      prev.map((approval) => (approval.id === id ? { ...approval, status: "rejected" } : approval)),
    )
    setSelectedProperty(null)
  }

  const handleRequestRevision = (id: number) => {
    setApprovals((prev) =>
      prev.map((approval) => (approval.id === id ? { ...approval, status: "needs_revision" } : approval)),
    )
    setSelectedProperty(null)
  }

  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.agent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || approval.status === statusFilter
    const matchesPriority = priorityFilter === "all" || approval.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Under Review</Badge>
      case "needs_revision":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            Needs Revision
          </Badge>
        )
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const pendingCount = approvals.filter((a) => a.status === "pending").length
  const underReviewCount = approvals.filter((a) => a.status === "under_review").length
  const needsRevisionCount = approvals.filter((a) => a.status === "needs_revision").length

  return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Property Approvals
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Review and approve property listings
				</p>
			</div>

			{/* Summary Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Review
						</CardTitle>
						<Clock className="h-4 w-4 text-yellow-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{pendingCount}</div>
						<p className="text-xs text-muted-foreground">
							Awaiting initial review
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Under Review</CardTitle>
						<Eye className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{underReviewCount}</div>
						<p className="text-xs text-muted-foreground">
							Currently being reviewed
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Needs Revision
						</CardTitle>
						<AlertTriangle className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{needsRevisionCount}</div>
						<p className="text-xs text-muted-foreground">Requires changes</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Avg Review Time
						</CardTitle>
						<Calendar className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">2.3</div>
						<p className="text-xs text-muted-foreground">Days to approval</p>
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
								<SelectItem value="under_review">Under Review</SelectItem>
								<SelectItem value="needs_revision">Needs Revision</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
						<Select value={priorityFilter} onValueChange={setPriorityFilter}>
							<SelectTrigger className="w-full md:w-[180px]">
								<SelectValue placeholder="Filter by priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Priority</SelectItem>
								<SelectItem value="high">High</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="low">Low</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Approvals List */}
			<div className="grid gap-4">
				{filteredApprovals.map((approval) => (
					<Card key={approval.id} className="overflow-hidden">
						<CardContent className="p-0">
							<div className="flex flex-col md:flex-row">
								<div className="md:w-1/3">
									<img
										src={approval.images[0] || "/placeholder.svg"}
										alt={approval.propertyTitle}
										className="h-48 md:h-full w-full object-cover"
									/>
								</div>
								<div className="flex-1 p-6">
									<div className="flex flex-col gap-4">
										<div className="flex items-start justify-between">
											<div>
												<div className="flex items-center gap-2 mb-2">
													<h3 className="text-lg font-semibold">
														{approval.propertyTitle}
													</h3>
													{getStatusBadge(approval.status)}
													{getPriorityBadge(approval.priority)}
												</div>
												<div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
													<MapPin className="h-4 w-4" />
													{approval.address}
												</div>
												<div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
													${(approval.price ?? 0).toLocaleString()}
												</div>
												<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
													<div className="flex items-center gap-1">
														<Bed className="h-4 w-4" />
														{approval.bedrooms} bed
													</div>
													<div className="flex items-center gap-1">
														<Bath className="h-4 w-4" />
														{approval.bathrooms} bath
													</div>
													<div className="flex items-center gap-1">
														<Square className="h-4 w-4" />
														{approval.sqft} sqft
													</div>
												</div>
											</div>
										</div>

										<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
											{approval.description}
										</p>

										{approval.issues.length > 0 && (
											<div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
												<div className="flex items-center gap-2 mb-2">
													<AlertTriangle className="h-4 w-4 text-orange-600" />
													<span className="text-sm font-medium text-orange-800 dark:text-orange-200">
														Issues Found
													</span>
												</div>
												<ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
													{approval.issues.map((issue, index) => (
														<li key={index}>• {issue}</li>
													))}
												</ul>
											</div>
										)}

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4 text-sm text-gray-500">
												<div className="flex items-center gap-1">
													<User className="h-4 w-4" />
													Agent: {approval.agent}
												</div>
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />
													Submitted:{" "}
													{new Date(
														approval.submittedDate
													).toLocaleDateString()}
												</div>
											</div>

											<div className="flex gap-2">
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant="outline"
															size="sm"
															onClick={() => setSelectedProperty(approval)}>
															<Eye className="h-4 w-4 mr-1" />
															Review
														</Button>
													</DialogTrigger>
													<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
														<DialogHeader>
															<DialogTitle>
																{approval.propertyTitle}
															</DialogTitle>
															<DialogDescription>
																{approval.address}
															</DialogDescription>
														</DialogHeader>

														{selectedProperty && (
															<div className="space-y-6">
																<div className="grid gap-4 md:grid-cols-2">
																	<div>
																		<img
																			src={
																				selectedProperty.images[0] ||
																				"/placeholder.svg"
																			}
																			alt={selectedProperty.propertyTitle}
																			className="w-full h-64 object-cover rounded-lg"
																		/>
																	</div>
																	<div className="space-y-4">
																		<div>
																			<h4 className="font-semibold mb-2">
																				Property Details
																			</h4>
																			<div className="space-y-2 text-sm">
																				<div className="flex justify-between">
																					<span>Price:</span>
																					<span className="font-medium">
																						$
																						{(
																							selectedProperty.price ?? 0
																						).toLocaleString()}
																					</span>
																				</div>
																				<div className="flex justify-between">
																					<span>Bedrooms:</span>
																					<span>
																						{selectedProperty.bedrooms}
																					</span>
																				</div>
																				<div className="flex justify-between">
																					<span>Bathrooms:</span>
																					<span>
																						{selectedProperty.bathrooms}
																					</span>
																				</div>
																				<div className="flex justify-between">
																					<span>Square Feet:</span>
																					<span>{selectedProperty.sqft}</span>
																				</div>
																				<div className="flex justify-between">
																					<span>Agent:</span>
																					<span>{selectedProperty.agent}</span>
																				</div>
																			</div>
																		</div>

																		<div>
																			<h4 className="font-semibold mb-2">
																				Documents
																			</h4>
																			<div className="space-y-1">
																				{selectedProperty.documents.map(
																					(doc: string, index: number) => (
																						<div
																							key={index}
																							className="flex items-center gap-2 text-sm">
																							<CheckCircle className="h-4 w-4 text-green-600" />
																							{doc}
																						</div>
																					)
																				)}
																			</div>
																		</div>
																	</div>
																</div>

																<div>
																	<h4 className="font-semibold mb-2">
																		Description
																	</h4>
																	<p className="text-sm text-gray-600 dark:text-gray-400">
																		{selectedProperty.description}
																	</p>
																</div>

																{selectedProperty.issues.length > 0 && (
																	<div>
																		<h4 className="font-semibold mb-2 text-orange-600">
																			Issues to Address
																		</h4>
																		<ul className="space-y-1">
																			{selectedProperty.issues.map(
																				(issue: string, index: number) => (
																					<li
																						key={index}
																						className="text-sm text-orange-700 dark:text-orange-300">
																						• {issue}
																					</li>
																				)
																			)}
																		</ul>
																	</div>
																)}

																<div>
																	<Label htmlFor="review-notes">
																		Review Notes
																	</Label>
																	<Textarea
																		id="review-notes"
																		placeholder="Add your review notes here..."
																		value={reviewNotes}
																		onChange={(e) =>
																			setReviewNotes(e.target.value)
																		}
																		className="mt-2"
																	/>
																</div>

																<div className="flex gap-2 justify-end">
																	<Button
																		variant="outline"
																		onClick={() =>
																			handleRequestRevision(selectedProperty.id)
																		}>
																		Request Revision
																	</Button>
																	<Button
																		variant="destructive"
																		onClick={() =>
																			handleReject(selectedProperty.id)
																		}>
																		<XCircle className="h-4 w-4 mr-1" />
																		Reject
																	</Button>
																	<Button
																		className="bg-green-600 hover:bg-green-700"
																		onClick={() =>
																			handleApprove(selectedProperty.id)
																		}>
																		<CheckCircle className="h-4 w-4 mr-1" />
																		Approve
																	</Button>
																</div>
															</div>
														)}
													</DialogContent>
												</Dialog>

												{approval.status === "pending" && (
													<>
														<Button
															size="sm"
															className="bg-green-600 hover:bg-green-700"
															onClick={() => handleApprove(approval.id)}>
															<CheckCircle className="h-4 w-4 mr-1" />
															Approve
														</Button>
														<Button
															size="sm"
															variant="destructive"
															onClick={() => handleReject(approval.id)}>
															<XCircle className="h-4 w-4 mr-1" />
															Reject
														</Button>
													</>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{filteredApprovals.length === 0 && (
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
