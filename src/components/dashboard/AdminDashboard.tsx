import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Car, Clock, MapPin, Search, Star, User, Users, Wallet, Shield, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { gradients, cards, buttons, badges } from "@/lib/utils";

// Mock data
const stats = {
  totalUsers: 1250,
  activeUsers: 850,
  totalRides: 3500,
  totalRevenue: 87500.75,
  activeDrivers: 85,
  averageRating: 4.8,
  pendingApprovals: 12,
  reportedIssues: 5
};

const recentRides = [
  {
    id: 1,
    client: "John Doe",
    chauffeur: "Mike Smith",
    pickup: "123 Main St",
    dropoff: "456 Park Ave",
    date: "2024-03-15",
    status: "completed",
    amount: 25.50
  },
  {
    id: 2,
    client: "Jane Smith",
    chauffeur: "Sarah Johnson",
    pickup: "789 Oak St",
    dropoff: "321 Pine Rd",
    date: "2024-03-15",
    status: "in_progress",
    amount: 18.75
  },
  {
    id: 3,
    client: "Mike Johnson",
    chauffeur: "David Wilson",
    pickup: "555 Elm St",
    dropoff: "888 Maple Dr",
    date: "2024-03-15",
    status: "scheduled",
    amount: 32.00
  }
];

const pendingChauffeurs = [
  {
    id: 1,
    name: "Alex Brown",
    email: "alex@example.com",
    phone: "+1234567890",
    documents: "Verified",
    status: "pending"
  },
  {
    id: 2,
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1234567891",
    documents: "Pending",
    status: "pending"
  }
];

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    status: "active",
    joinedAt: "2024-03-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "driver",
    status: "pending",
    joinedAt: "2024-03-14"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "driver",
    status: "suspended",
    joinedAt: "2024-03-13"
  }
];

const reportedIssues = [
  {
    id: 1,
    type: "Driver Behavior",
    description: "Rude behavior during ride",
    status: "pending",
    reportedAt: "2024-03-15 14:30"
  },
  {
    id: 2,
    type: "Payment Issue",
    description: "Double charged for ride",
    status: "resolved",
    reportedAt: "2024-03-15 12:15"
  }
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Admin Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              Manage your platform and monitor activity
            </p>
          </div>
          <div className="flex gap-4">
            <Button className={cn(buttons.primary)}>
              Generate Report
            </Button>
            <Button className={cn(buttons.outline)}>
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {stats.activeUsers} active users
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Car className="h-4 w-4 text-accent-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRides}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                All time rides
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Wallet className="h-4 w-4 text-success-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Platform earnings
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              <Car className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDrivers}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Platform rating
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Shield className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Driver applications
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reportedIssues}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Active reports
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="chauffeurs">Chauffeurs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Recent Rides */}
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">Recent Rides</CardTitle>
                    <CardDescription>Latest ride activities</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Input
                      placeholder="Search rides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell className="font-medium">{ride.client}</TableCell>
                        <TableCell>{ride.chauffeur}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent-500" />
                            <span className="text-sm">
                              {ride.pickup} → {ride.dropoff}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary-500" />
                            <span className="text-sm">{ride.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={ride.status === "completed" ? "success" : "warning"}>
                            {ride.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${ride.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pending Chauffeur Approvals */}
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <CardTitle className="text-2xl">Pending Approvals</CardTitle>
                <CardDescription>Chauffeur applications awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingChauffeurs.map((chauffeur) => (
                      <TableRow key={chauffeur.id}>
                        <TableCell className="font-medium">{chauffeur.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{chauffeur.email}</div>
                            <div className="text-sm text-neutral-500">{chauffeur.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={chauffeur.documents === "Verified" ? "success" : "warning"}>
                            {chauffeur.documents}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="warning">Pending</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Review</Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">User Management</CardTitle>
                    <CardDescription>Manage platform users</CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10"
                      />
                    </div>
                    <Button>Add User</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : user.status === "pending" ? "secondary" : "destructive"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rides">
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">Ride Management</CardTitle>
                    <CardDescription>Manage all platform rides</CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="Search rides..."
                        className="pl-10"
                      />
                    </div>
                    <Button>Export Data</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>#{ride.id}</TableCell>
                        <TableCell>{ride.client}</TableCell>
                        <TableCell>{ride.chauffeur}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent-500" />
                            <span className="text-sm">
                              {ride.pickup} → {ride.dropoff}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={ride.status === "completed" ? "success" : "warning"}>
                            {ride.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${ride.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chauffeurs">
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">Chauffeur Management</CardTitle>
                    <CardDescription>Manage platform chauffeurs</CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="Search chauffeurs..."
                        className="pl-10"
                      />
                    </div>
                    <Button>Add Chauffeur</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Mike Smith</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">mike@example.com</div>
                          <div className="text-sm text-neutral-500">+1234567890</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning-500" />
                          <span>4.8</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Suspend</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
