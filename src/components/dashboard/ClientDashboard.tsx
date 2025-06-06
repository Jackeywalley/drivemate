
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Car, 
  Clock, 
  MapPin, 
  Calendar, 
  Star, 
  TrendingUp, 
  DollarSign,
  Plus,
  Filter,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

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
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (profile) {
      fetchRides();
    }
  }, [profile]);

  const fetchRides = async () => {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select(`
          *,
          chauffeurs:chauffeur_id (
            profiles:id (
              full_name
            )
          )
        `)
        .eq('client_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rides:', error);
        // Use mock data for demonstration
        setRides(mockRides);
      } else {
        setRides(data || mockRides);
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
      setRides(mockRides);
    } finally {
      setIsLoading(false);
    }
  };

  const mockRides: Ride[] = [
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
    const matchesSearch = ride.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.dropoff_location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedRides = rides.filter(ride => ride.status === 'completed').length;
  const totalSpent = rides
    .filter(ride => ride.status === 'completed')
    .reduce((sum, ride) => sum + (ride.final_price || ride.estimated_price), 0);
  const averageRating = rides
    .filter(ride => ride.chauffeur?.rating)
    .reduce((sum, ride) => sum + (ride.chauffeur?.rating || 0), 0) / 
    rides.filter(ride => ride.chauffeur?.rating).length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="card-gradient rounded-2xl p-8 border border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Welcome back, {profile?.full_name}! ✨
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready for your next premium ride experience?
            </p>
          </div>
          <Link to="/book">
            <Button className="btn-gradient hover:shadow-xl transition-all duration-300 text-lg px-8 py-6">
              <Plus className="h-5 w-5 mr-2" />
              Book New Ride
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Car className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold text-foreground">{rides.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedRides}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Rides */}
      <Card className="card-elevated border-border/40">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Recent Rides</CardTitle>
              <CardDescription>Your ride history and current bookings</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {statusFilter === 'all' ? 'All Status' : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRides.length === 0 ? (
            <div className="text-center py-12">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rides found</h3>
              <p className="text-muted-foreground mb-6">
                {rides.length === 0 
                  ? "You haven't booked any rides yet. Start your journey!"
                  : "No rides match your current filters."
                }
              </p>
              <Link to="/book">
                <Button className="btn-gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Your First Ride
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRides.map((ride) => (
                <div key={ride.id} className="border border-border/40 rounded-lg p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getStatusColor(ride.status)} border-0`}>
                        {getStatusIcon(ride.status)}
                        <span className="ml-2 capitalize">{ride.status}</span>
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {ride.service_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Chauffeur</DropdownMenuItem>
                        {ride.status === 'completed' && (
                          <DropdownMenuItem>Rate & Review</DropdownMenuItem>
                        )}
                        {ride.status === 'pending' && (
                          <DropdownMenuItem className="text-destructive">Cancel Ride</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-green-600" />
                        Pickup
                      </div>
                      <p className="font-medium">{ride.pickup_location}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        Destination
                      </div>
                      <p className="font-medium">{ride.dropoff_location || 'Multiple stops'}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date & Time
                      </div>
                      <p className="font-medium">
                        {new Date(ride.scheduled_time).toLocaleDateString()} at{' '}
                        {new Date(ride.scheduled_time).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Price
                      </div>
                      <p className="font-medium">
                        ${(ride.final_price || ride.estimated_price).toFixed(2)}
                        {!ride.final_price && (
                          <span className="text-xs text-muted-foreground ml-1">(estimated)</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {ride.chauffeur && (
                    <div className="mt-4 pt-4 border-t border-border/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                            {ride.chauffeur.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{ride.chauffeur.full_name}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm text-muted-foreground">{ride.chauffeur.rating}</span>
                            </div>
                          </div>
                        </div>
                        {ride.status === 'active' && (
                          <Button size="sm" variant="outline">
                            Contact Chauffeur
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
