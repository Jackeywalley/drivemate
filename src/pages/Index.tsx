
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Star, CheckCircle, Users } from 'lucide-react';
import Header from '@/components/layout/Header';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-navy to-navy-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Chauffeurs
              <br />
              <span className="text-silver-light">For Your Car</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-silver-light max-w-3xl mx-auto">
              Need a licensed driver for your vehicle? DriveMate connects you with professional chauffeurs who will drive YOUR car safely to your destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-navy hover:bg-silver-light text-lg px-8 py-6">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-navy hover:bg-silver-light text-lg px-8 py-6">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy text-lg px-8 py-6">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-silver-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DriveMate?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Safe, reliable, and professional chauffeur services for when you need a licensed driver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-silver">
              <CardContent className="p-8">
                <div className="bg-navy rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Licensed & Verified</h3>
                <p className="text-muted-foreground">
                  All our chauffeurs are professionally licensed, background-checked, and verified for your safety and peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-silver">
              <CardContent className="p-8">
                <div className="bg-navy rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Available 24/7</h3>
                <p className="text-muted-foreground">
                  Need a driver at any hour? Our chauffeurs are available around the clock for your convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-silver">
              <CardContent className="p-8">
                <div className="bg-navy rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Rated Professionals</h3>
                <p className="text-muted-foreground">
                  Choose from highly-rated chauffeurs with proven track records and excellent customer reviews.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Book a professional chauffeur in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-navy text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Online</h3>
              <p className="text-muted-foreground">Enter your pickup location, destination, and preferred time</p>
            </div>

            <div className="text-center">
              <div className="bg-navy text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Chauffeur</h3>
              <p className="text-muted-foreground">Select from available professional drivers based on ratings and reviews</p>
            </div>

            <div className="text-center">
              <div className="bg-navy text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Track & Relax</h3>
              <p className="text-muted-foreground">Track your chauffeur's arrival and enjoy a safe, comfortable ride</p>
            </div>

            <div className="text-center">
              <div className="bg-navy text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Rate & Pay</h3>
              <p className="text-muted-foreground">Complete your trip, rate your experience, and pay securely through the app</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-20 bg-silver-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Options
            </h2>
            <p className="text-xl text-muted-foreground">
              Flexible chauffeur services to meet your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-silver">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 text-navy mr-2" />
                  One-Way Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Perfect for airport transfers, special events, or when you can't drive your car back.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Airport pickups/drop-offs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Event transportation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Medical appointments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-silver">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 text-navy mr-2" />
                  Hourly Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Book a chauffeur for multiple stops, shopping trips, or business meetings.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Multiple destinations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Shopping assistance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Business meetings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-silver">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-navy mr-2" />
                  Full-Day Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Dedicated chauffeur for the entire day for tours, business, or special occasions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">City tours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Business travel</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Special events</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Chauffeur?
          </h2>
          <p className="text-xl text-silver-light mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust DriveMate for their professional chauffeur needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <>
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-navy hover:bg-silver-light text-lg px-8 py-6">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy text-lg px-8 py-6">
                    Become a Chauffeur
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-navy rounded-lg p-2">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">DriveMate</span>
              </div>
              <p className="text-gray-400">
                Professional chauffeur services for your vehicle. Safe, reliable, and available 24/7.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>One-way Trips</li>
                <li>Hourly Service</li>
                <li>Full-day Service</li>
                <li>Airport Transfers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>How It Works</li>
                <li>Safety</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Get Started</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Book a Ride</li>
                <li>Become a Chauffeur</li>
                <li>Business Solutions</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DriveMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
