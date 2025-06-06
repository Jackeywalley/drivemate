import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Clock, Shield, Star, Users, MapPin, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-silver-light to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Premium Chauffeur Service at Your Fingertips
            </h1>
            <p className="text-2xl mb-12 text-white/90">
              Experience luxury travel with our professional chauffeurs. Book your ride in seconds and enjoy a comfortable journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90 h-14 px-8 text-lg">
                <Link to="/book-ride" className="flex items-center gap-2">
                  Book Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Car className="h-7 w-7 text-navy" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Premium Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">
                  Travel in style with our fleet of luxury vehicles, maintained to the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-navy" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Professional Chauffeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">
                  Our experienced chauffeurs are trained to provide exceptional service and ensure your comfort.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-navy" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Safe & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">
                  Your safety is our priority. All our vehicles and drivers are fully insured and licensed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-silver-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Book Your Ride</h3>
              <p className="text-gray-600 text-lg">
                Enter your pickup and drop-off locations
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Choose Time</h3>
              <p className="text-gray-600 text-lg">
                Select your preferred date and time
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Get Confirmation</h3>
              <p className="text-gray-600 text-lg">
                Receive instant booking confirmation
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Enjoy Your Ride</h3>
              <p className="text-gray-600 text-lg">
                Your chauffeur will arrive on time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Star className="h-7 w-7 text-navy" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Standard Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg mb-6">
                  Perfect for everyday travel with our comfortable sedans.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-navy mr-3" />
                    <span className="text-lg">24/7 Availability</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-navy mr-3" />
                    <span className="text-lg">City-wide Coverage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Star className="h-7 w-7 text-navy" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Premium Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg mb-6">
                  Luxury SUVs for a more spacious and premium experience.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-navy mr-3" />
                    <span className="text-lg">Priority Booking</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-navy mr-3" />
                    <span className="text-lg">Extended Coverage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Star className="h-7 w-7 text-navy" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Luxury Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg mb-6">
                  Top-tier vehicles for the ultimate luxury experience.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-navy mr-3" />
                    <span className="text-lg">VIP Treatment</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-navy mr-3" />
                    <span className="text-lg">Nationwide Service</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Experience Premium Travel?</h2>
          <p className="text-2xl mb-12 text-white/90">
            Join thousands of satisfied customers who trust us for their transportation needs.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg">
            <Link to="/book-ride" className="flex items-center gap-2">
              Book Your Ride Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
