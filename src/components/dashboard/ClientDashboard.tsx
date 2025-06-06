
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Calendar, Car, Star, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface Ride {
  id: string;
  service_type: string;
  pickup_location: string;
  dropoff_location: string | null;
  scheduled_time: string;
  status: string;
  estimated_price: number | null;
  final_price: number | null;
  created_at: string;
}

const ClientDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRides: 0,
    activeRides: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    fetchRides();
  }, [user]);

  const fetchRides = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error loading rides",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setRides(data || []);
      
      // Calculate stats
      const totalRides = data?.length || 0;
      const activeRides = data?.filter(ride => ['pending', 'accepted', 'in_progress'].includes(ride.status)).length || 0;
      const totalSpent = data?.reduce((sum, ride) => sum + (ride.final_price || ride.estimated_price || 0), 0) || 0;

      setStats({
        totalRides,
        activeRides,
        totalSpent,
      });

    } catch (error) {
      toast({
        title: "Error loading rides",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceTypeLabel = (serviceType: string) => {
    switch (serviceType) {
      case 'one_way':
        return 'One Way';
      case 'hourly':
        return 'Hourly';
      case 'full_day':
        return 'Full Day';
      default:
        return serviceType;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.full_name}!</h1>
        <p className="text-navy-light">Ready to book your next chauffeur service?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{stats.totalRides}</p>
              </div>
              <Car className="h-8 w-8 text-navy" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rides</p>
                <p className="text-2xl font-bold">{stats.activeRides}</p>
              </div>
              <Clock className="h-8 w-8 text-navy" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-navy" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with your next ride</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/book">
              <Button className="w-full h-20 navy hover:navy-light">
                <div className="flex flex-col items-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>Book New Ride</span>
                </div>
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-20 border-navy text-navy hover:bg-navy hover:text-white">
              <div className="flex flex-col items-center space-y-2">
                <Star className="h-6 w-6" />
                <span>View Chauffeurs</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Rides */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rides</CardTitle>
          <CardDescription>Your latest booking history</CardDescription>
        </CardHeader>
        <CardContent>
          {rides.length === 0 ? (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No rides booked yet</p>
              <Link to="/book">
                <Button className="navy hover:navy-light">
                  Book Your First Ride
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rides.slice(0, 5).map((ride) => (
                <div key={ride.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(ride.status)}>
                        {ride.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {getServiceTypeLabel(ride.service_type)}
                      </span>
                    </div>
                    <span className="font-semibold text-navy">
                      ${(ride.final_price || ride.estimated_price || 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{ride.pickup_location}</span>
                    </div>
                    {ride.dropoff_location && (
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{ride.dropoff_location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(ride.scheduled_time), 'PPP p')}</span>
                    </div>
                  </div>
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
