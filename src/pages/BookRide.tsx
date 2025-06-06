
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BookingForm from '@/components/booking/BookingForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Car } from 'lucide-react';

// Mock available chauffeurs
const mockChauffeurs = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 4.9,
    totalRides: 245,
    distance: '2.3 km away',
    estimatedArrival: '8 min',
    price: 45.99,
    profileImage: null,
    specialties: ['Airport transfers', 'Business trips']
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 4.8,
    totalRides: 189,
    distance: '3.1 km away',
    estimatedArrival: '12 min',
    price: 42.50,
    profileImage: null,
    specialties: ['Long distance', 'Night drives']
  },
  {
    id: '3',
    name: 'David Wilson',
    rating: 4.7,
    totalRides: 156,
    distance: '4.2 km away',
    estimatedArrival: '15 min',
    price: 48.75,
    profileImage: null,
    specialties: ['City tours', 'Executive service']
  }
];

const BookRide: React.FC = () => {
  const { user } = useAuth();
  const [showChauffeurs, setShowChauffeurs] = useState(false);
  const [selectedChauffeur, setSelectedChauffeur] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />;
  }

  const handleBookingSubmit = (data: any) => {
    setBookingData(data);
    setShowChauffeurs(true);
  };

  const handleSelectChauffeur = (chauffeurId: string) => {
    setSelectedChauffeur(chauffeurId);
  };

  const handleConfirmBooking = () => {
    // In a real app, this would submit the booking
    console.log('Booking confirmed:', { bookingData, selectedChauffeur });
    alert('Booking confirmed! Your chauffeur will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-silver-light">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showChauffeurs ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Book a Chauffeur</h1>
              <p className="text-muted-foreground">Professional drivers for your vehicle, available when you need them</p>
            </div>
            
            <BookingForm onBookingSubmit={handleBookingSubmit} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Review your ride details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Service Type</p>
                    <p className="capitalize">{bookingData?.serviceType?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Date & Time</p>
                    <p>{bookingData?.date} at {bookingData?.time}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Duration</p>
                    <p>{bookingData?.duration || 'As needed'}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">From: {bookingData?.pickupLocation}</span>
                  </div>
                  {bookingData?.dropoffLocation && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm">To: {bookingData?.dropoffLocation}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Available Chauffeurs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Chauffeurs</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockChauffeurs.map((chauffeur) => (
                  <Card 
                    key={chauffeur.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedChauffeur === chauffeur.id ? 'ring-2 ring-navy bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectChauffeur(chauffeur.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                          <Car className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{chauffeur.name}</h3>
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{chauffeur.rating}</span>
                            <span className="text-sm text-muted-foreground">({chauffeur.totalRides} rides)</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{chauffeur.distance} • {chauffeur.estimatedArrival}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-1">
                          {chauffeur.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-navy">${chauffeur.price}</p>
                          <p className="text-sm text-muted-foreground">Estimated cost</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                          {selectedChauffeur === chauffeur.id && (
                            <Button size="sm" className="navy hover:navy-light">
                              Selected
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Confirm Booking */}
            {selectedChauffeur && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Ready to confirm your booking?</h3>
                      <p className="text-sm text-green-600">
                        You've selected {mockChauffeurs.find(c => c.id === selectedChauffeur)?.name}
                      </p>
                    </div>
                    <div className="space-x-3">
                      <Button variant="outline" onClick={() => setSelectedChauffeur(null)}>
                        Change Chauffeur
                      </Button>
                      <Button 
                        onClick={handleConfirmBooking}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRide;
