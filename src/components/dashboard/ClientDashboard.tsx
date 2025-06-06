import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Car, 
  Clock, 
  MapPin, 
  Calendar, 
  Star, 
  DollarSign,
  Plus,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { gradients, cards, buttons, badges } from "@/lib/utils";

interface Ride {
  id: string;
  pickup_location: string;
  dropoff_location: string;
  scheduled_time: string;
  status: string;
  service_type: string;
  estimated_price: number;
  final_price?: number;
  chauffeur?: {
    full_name: string;
    rating: number;
  };
}

const ClientDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Mock rides data
  const rides: Ride[] = [
    {
      id: '1',
      pickup_location: '123 Main St, Downtown',
      dropoff_location: 'Airport Terminal 2',
      scheduled_time: '2024-06-07T10:30:00Z',
      status: 'completed',
      service_type: 'one_way',
      estimated_price: 45.00,
      final_price: 42.50,
      chauffeur: {
        full_name: 'John Smith',
        rating: 4.8
      }
    },
    {
      id: '2',
      pickup_location: 'Hotel Plaza, City Center',
      dropoff_location: 'Conference Center',
      scheduled_time: '2024-06-06T14:00:00Z',
      status: 'active',
      service_type: 'hourly',
      estimated_price: 120.00,
      chauffeur: {
        full_name: 'Sarah Johnson',
        rating: 4.9
      }
    },
    {
      id: '3',
      pickup_location: '456 Oak Avenue',
      dropoff_location: 'Shopping Mall',
      scheduled_time: '2024-06-08T16:00:00Z',
      status: 'pending',
      service_type: 'one_way',
      estimated_price: 25.00
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.pickup_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ride.dropoff_location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || ride.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const completedRides = rides.filter(ride => ride.status === 'completed').length;
  const totalSpent = rides
    .filter(ride => ride.status === 'completed')
    .reduce((sum, ride) => sum + (ride.final_price || ride.estimated_price), 0);
  const averageRating = rides
    .filter(ride => ride.chauffeur?.rating)
    .reduce((sum, ride) => sum + (ride.chauffeur?.rating || 0), 0) / 
    rides.filter(ride => ride.chauffeur?.rating).length || 0;

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section with Glass Effect */}
      <div className="glass rounded-xl p-6 space-y-4">
        <h1 className="text-gradient text-4xl font-bold">Welcome back, {profile?.first_name}</h1>
        <p className="text-muted-foreground text-lg">Manage your rides and bookings</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-gradient">Book a Ride</CardTitle>
            <CardDescription>Schedule your next journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="btn-gradient w-full">Book Now</Button>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-gradient">Active Rides</CardTitle>
            <CardDescription>Track your current journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="btn-gradient w-full">View Active</Button>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-gradient">Payment History</CardTitle>
            <CardDescription>View your transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="btn-gradient w-full">View History</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="glass">
            <TabsTrigger value="all">All Rides</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 glass"
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredRides.map((ride) => (
            <Card key={ride.id} className={cn(cards.elevated, "hover:shadow-lg transition-all duration-300")}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary-500" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {new Date(ride.scheduled_time).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent-500" />
                      <span className="text-sm">
                        {ride.pickup_location} → {ride.dropoff_location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={ride.status === "completed" ? "success" : "warning"}>
                      {ride.status}
                    </Badge>
                    <div className="text-right">
                      <div className="font-semibold">${ride.final_price || ride.estimated_price}</div>
                      {ride.chauffeur && (
                        <div className="flex items-center gap-1 text-sm text-neutral-500">
                          <Star className="h-4 w-4 text-warning-500" />
                          {ride.chauffeur.rating}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
