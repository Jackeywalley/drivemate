
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Clock, Star, DollarSign, MapPin, Phone } from 'lucide-react';

// Mock data for driver
const mockEarnings = {
  today: 127.50,
  week: 892.30,
  month: 3456.80
};

const mockRideRequests = [
  {
    id: '1',
    client: 'John Smith',
    pickup: '123 Business Center',
    dropoff: '456 Airport Terminal',
    time: '15:30',
    distance: '12.5 km',
    estimatedEarning: 45.00,
    serviceType: 'one-way'
  },
  {
    id: '2',
    client: 'Sarah Wilson',
    pickup: '789 Downtown Plaza',
    dropoff: 'Various stops',
    time: '18:00',
    distance: '3 hours',
    estimatedEarning: 120.00,
    serviceType: 'hourly'
  }
];

const mockActiveRide = {
  id: 'active1',
  client: 'Mike Johnson',
  clientPhone: '+1234567890',
  pickup: '555 Oak Street',
  dropoff: '777 Pine Avenue',
  startTime: '14:15',
  estimatedDuration: '25 min',
  estimatedEarning: 32.00
};

// Mock chauffeur data
const mockChauffeurData = {
  rating: 4.8,
  totalRides: 127
};

const ChauffeurDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [hasActiveRide, setHasActiveRide] = useState(true);

  const handleAcceptRide = (rideId: string) => {
    console.log('Accepting ride:', rideId);
    // In a real app, this would make an API call
  };

  const handleDeclineRide = (rideId: string) => {
    console.log('Declining ride:', rideId);
    // In a real app, this would make an API call
  };

  const handleCompleteRide = () => {
    setHasActiveRide(false);
    console.log('Ride completed');
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile?.full_name}!</h1>
              <p className="text-muted-foreground">Ready to start earning? Toggle your availability below.</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Offline</span>
              <Switch
                checked={isOnline}
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-navy"
              />
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Badge className={isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
              {isOnline ? 'Available for rides' : 'Offline'}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold text-green-600">${mockEarnings.today}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">${mockEarnings.week}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">{mockChauffeurData.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-navy" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                  <p className="text-2xl font-bold text-navy">{mockChauffeurData.totalRides}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Ride */}
          {hasActiveRide && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-green-600">Active Ride</CardTitle>
                <CardDescription>Currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{mockActiveRide.client}</h3>
                      <p className="text-sm text-muted-foreground">Started at {mockActiveRide.startTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${mockActiveRide.estimatedEarning}</p>
                      <p className="text-sm text-muted-foreground">{mockActiveRide.estimatedDuration}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">From: {mockActiveRide.pickup}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm">To: {mockActiveRide.dropoff}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Client
                    </Button>
                    <Button className="navy hover:navy-light" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Navigation
                    </Button>
                    <Button 
                      onClick={handleCompleteRide}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      Complete Ride
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ride Requests */}
          <Card className={hasActiveRide ? 'lg:col-span-2' : ''}>
            <CardHeader>
              <CardTitle>Ride Requests</CardTitle>
              <CardDescription>
                {isOnline ? 'Available ride requests near you' : 'Go online to receive ride requests'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isOnline ? (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You're currently offline</p>
                  <p className="text-sm text-muted-foreground">Toggle your availability to start receiving ride requests</p>
                </div>
              ) : mockRideRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No ride requests at the moment</p>
                  <p className="text-sm text-muted-foreground">Stay online and we'll notify you when requests come in</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockRideRequests.map((request) => (
                    <div key={request.id} className="border border-silver rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{request.client}</h3>
                          <p className="text-sm text-muted-foreground">Pickup at {request.time}</p>
                          <Badge variant="secondary" className="mt-1">
                            {request.serviceType}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">${request.estimatedEarning}</p>
                          <p className="text-sm text-muted-foreground">{request.distance}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-4 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-green-600 mr-2" />
                          <span>From: {request.pickup}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-red-600 mr-2" />
                          <span>To: {request.dropoff}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeclineRide(request.id)}
                        >
                          Decline
                        </Button>
                        <Button 
                          className="navy hover:navy-light" 
                          size="sm"
                          onClick={() => handleAcceptRide(request.id)}
                        >
                          Accept Ride
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          {!hasActiveRide && (
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
                <CardDescription>Your recent performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Today</span>
                    <span className="font-semibold">${mockEarnings.today}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-semibold">${mockEarnings.week}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-semibold">${mockEarnings.month}</span>
                  </div>
                  <hr className="border-silver" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Rides</span>
                    <span className="font-bold">{mockChauffeurData.totalRides}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold">{mockChauffeurData.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChauffeurDashboard;
