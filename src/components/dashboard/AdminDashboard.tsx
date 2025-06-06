
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Car, DollarSign, Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1247,
  totalChauffeurs: 89,
  totalRides: 3456,
  monthlyRevenue: 45678.90,
  activeRides: 12,
  pendingApprovals: 5
};

const mockPendingChauffeurs = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@email.com',
    phone: '+1234567890',
    licenseNumber: 'DL987654321',
    appliedDate: '2024-01-15',
    documents: ['License', 'Insurance', 'Background Check']
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@email.com',
    phone: '+1234567891',
    licenseNumber: 'DL456789123',
    appliedDate: '2024-01-14',
    documents: ['License', 'Insurance']
  }
];

const mockRecentRides = [
  {
    id: '1',
    client: 'John Smith',
    chauffeur: 'Sarah Johnson',
    date: '2024-01-15',
    time: '14:30',
    status: 'completed',
    amount: 45.99
  },
  {
    id: '2',
    client: 'Emily Davis',
    chauffeur: 'Mike Chen',
    date: '2024-01-15',
    time: '16:45',
    status: 'in-progress',
    amount: 32.50
  },
  {
    id: '3',
    client: 'Robert Wilson',
    chauffeur: 'David Brown',
    date: '2024-01-15',
    time: '18:00',
    status: 'upcoming',
    amount: 67.25
  }
];

const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@email.com',
    role: 'client',
    joinDate: '2024-01-10',
    totalRides: 15,
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    role: 'chauffeur',
    joinDate: '2024-01-05',
    totalRides: 127,
    status: 'active'
  }
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleApproveChauffeur = (chauffeurId: string) => {
    console.log('Approving chauffeur:', chauffeurId);
    // In a real app, this would make an API call
  };

  const handleRejectChauffeur = (chauffeurId: string) => {
    console.log('Rejecting chauffeur:', chauffeurId);
    // In a real app, this would make an API call
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, rides, and platform operations</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold text-blue-600">{mockStats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Car className="h-8 w-8 text-navy" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Chauffeurs</p>
                      <p className="text-2xl font-bold text-navy">{mockStats.totalChauffeurs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                      <p className="text-2xl font-bold text-green-600">{mockStats.totalRides}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold text-green-600">${mockStats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Active Rides</p>
                      <p className="text-2xl font-bold text-yellow-600">{mockStats.activeRides}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <UserCheck className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-orange-600">{mockStats.pendingApprovals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Latest ride activity on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell className="font-medium">{ride.client}</TableCell>
                        <TableCell>{ride.chauffeur}</TableCell>
                        <TableCell>{ride.date} {ride.time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ride.status)}>
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>${ride.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Total Rides</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.totalRides}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ride Management</CardTitle>
                <CardDescription>View and manage all rides</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ride ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell className="font-medium">#{ride.id}</TableCell>
                        <TableCell>{ride.client}</TableCell>
                        <TableCell>{ride.chauffeur}</TableCell>
                        <TableCell>{ride.date} {ride.time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ride.status)}>
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>${ride.amount}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chauffeur Approvals</CardTitle>
                <CardDescription>Review and approve pending chauffeur applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockPendingChauffeurs.map((chauffeur) => (
                    <div key={chauffeur.id} className="border border-silver rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{chauffeur.name}</h3>
                          <p className="text-sm text-muted-foreground">{chauffeur.email}</p>
                          <p className="text-sm text-muted-foreground">{chauffeur.phone}</p>
                        </div>
                        <Badge variant="secondary">Pending Review</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">License Number</p>
                          <p className="text-sm text-muted-foreground">{chauffeur.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Applied Date</p>
                          <p className="text-sm text-muted-foreground">{chauffeur.appliedDate}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Documents Submitted</p>
                        <div className="flex flex-wrap gap-2">
                          {chauffeur.documents.map((doc) => (
                            <Badge key={doc} variant="outline">{doc}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectChauffeur(chauffeur.id)}
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApproveChauffeur(chauffeur.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          View Documents
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
