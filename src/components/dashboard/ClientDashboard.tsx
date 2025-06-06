
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Clock, MapPin, Star, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for rides
const mockRides = [
  {
    id: '1',
    date: '2024-01-15',
    time: '14:30',
    pickup: '123 Main St, Downtown',
    dropoff: '456 Oak Ave, Uptown',
    chauffeur: 'Sarah Johnson',
    status: 'completed',
    rating: 5,
    cost: 45.99
  },
  {
    id: '2',
    date: '2024-01-10',
    time: '09:15',
    pickup: '789 Business District',
    dropoff: 'Airport Terminal 1',
    chauffeur: 'Mike Chen',
    status: 'completed',
    rating: 4,
    cost: 67.50
  },
  {
    id: '3',
    date: '2024-01-18',
    time: '16:00',
    pickup: 'Home',
    dropoff: 'Downtown Office',
    chauffeur: 'David Wilson',
    status: 'upcoming',
    cost: 35.00
  }
];

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeRide, setActiveRide] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedRides = mockRides.filter(ride => ride.status === 'completed');
  const upcomingRides = mockRides.filter(ride => ride.status === 'upcoming' || ride.status === 'in-progress');

  return (
    <div className="min-h-screen bg-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.fullName}!</h1>
          <p className="text-muted-foreground">Manage your rides and book new chauffeur services</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-navy" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                  <p className="text-2xl font-bold text-navy">{user?.totalRides || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-green-600">{completedRides.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-blue-600">{upcomingRides.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Book a new ride or manage your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link to="/book">
                  <Button className="navy hover:navy-light">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Ride
                  </Button>
                </Link>
                <Link to="/rides">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View All Rides
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Rides */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rides</CardTitle>
              <CardDescription>Your scheduled chauffeur services</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingRides.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming rides</p>
                  <Link to="/book">
                    <Button className="mt-4 navy hover:navy-light">Book Your Next Ride</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingRides.map((ride) => (
                    <div key={ride.id} className="border border-silver rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{ride.date} at {ride.time}</p>
                          <p className="text-sm text-muted-foreground">Chauffeur: {ride.chauffeur}</p>
                        </div>
                        <Badge className={getStatusColor(ride.status)}>
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-green-600 mr-1" />
                          <span className="text-green-600">From:</span>
                          <span className="ml-1">{ride.pickup}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-red-600 mr-1" />
                          <span className="text-red-600">To:</span>
                          <span className="ml-1">{ride.dropoff}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-silver flex justify-between items-center">
                        <span className="font-medium">${ride.cost}</span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">Contact</Button>
                          <Button size="sm" className="navy hover:navy-light">Track</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Completed Rides */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Rides</CardTitle>
              <CardDescription>Your completed trips</CardDescription>
            </CardHeader>
            <CardContent>
              {completedRides.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed rides yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedRides.slice(0, 3).map((ride) => (
                    <div key={ride.id} className="border border-silver rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{ride.date} at {ride.time}</p>
                          <p className="text-sm text-muted-foreground">Chauffeur: {ride.chauffeur}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= (ride.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-green-600 mr-1" />
                          <span className="text-green-600">From:</span>
                          <span className="ml-1">{ride.pickup}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-red-600 mr-1" />
                          <span className="text-red-600">To:</span>
                          <span className="ml-1">{ride.dropoff}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-silver flex justify-between items-center">
                        <span className="font-medium">${ride.cost}</span>
                        <Badge className={getStatusColor(ride.status)}>Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
