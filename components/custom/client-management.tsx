"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Mail, Phone, MapPin, DollarSign, Eye, MessageSquare, Users, UserPlus, TrendingUp } from "lucide-react"

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 987-6543",
    type: "buyer",
    status: "active",
    budget: 750000,
    location: "Downtown",
    agent: "John Smith",
    joinDate: "2024-01-15",
    lastActivity: "2024-01-20",
    propertiesViewed: 12,
    avatar: "/placeholder.svg?height=40&width=40&text=RW",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 876-5432",
    type: "seller",
    status: "active",
    propertyValue: 620000,
    location: "Suburbs",
    agent: "Sarah Johnson",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-19",
    propertiesListed: 1,
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
  },
  {
    id: 3,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 765-4321",
    type: "buyer",
    status: "inactive",
    budget: 450000,
    location: "Arts District",
    agent: "Mike Davis",
    joinDate: "2023-12-20",
    lastActivity: "2024-01-05",
    propertiesViewed: 8,
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
  },
  {
    id: 4,
    name: "Jennifer Brown",
    email: "jennifer.brown@email.com",
    phone: "+1 (555) 654-3210",
    type: "investor",
    status: "active",
    budget: 1200000,
    location: "Waterfront",
    agent: "Lisa Chen",
    joinDate: "2024-01-08",
    lastActivity: "2024-01-21",
    propertiesViewed: 25,
    avatar: "/placeholder.svg?height=40&width=40&text=JB",
  },
]

export default function ClientManagement() {
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || client.type === typeFilter
    const matchesStatus = statusFilter === "all" || client.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "buyer":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Buyer</Badge>
      case "seller":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Seller</Badge>
      case "investor":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Investor</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const buyers = clients.filter((c) => c.type === "buyer")
  const sellers = clients.filter((c) => c.type === "seller")
  const investors = clients.filter((c) => c.type === "investor")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage buyers, sellers, and investors</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter((c) => c.status === "active").length} active
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
              Avg budget: ${(buyers.reduce((sum, b) => sum + (b.budget || 0), 0) / buyers.length / 1000).toFixed(0)}K
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
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{client.name}</h3>
                      {getTypeBadge(client.type)}
                      {getStatusBadge(client.status)}
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
                        {client.location}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Agent: {client.agent} • Joined {new Date(client.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {client.type === "buyer" && (
                    <>
                      <div className="text-center">
                        <div className="text-lg font-semibold">${(client.budget! / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-500">Budget</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{client.propertiesViewed}</div>
                        <div className="text-xs text-gray-500">Viewed</div>
                      </div>
                    </>
                  )}
                  {client.type === "seller" && (
                    <>
                      <div className="text-center">
                        <div className="text-lg font-semibold">${(client.propertyValue! / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-500">Property Value</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{client.propertiesListed || 0}</div>
                        <div className="text-xs text-gray-500">Listed</div>
                      </div>
                    </>
                  )}
                  {client.type === "investor" && (
                    <>
                      <div className="text-center">
                        <div className="text-lg font-semibold">${(client.budget! / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-500">Investment Budget</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{client.propertiesViewed}</div>
                        <div className="text-xs text-gray-500">Properties</div>
                      </div>
                    </>
                  )}
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Last Active</div>
                    <div className="text-xs">{new Date(client.lastActivity).toLocaleDateString()}</div>
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

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">No clients found matching your criteria.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
