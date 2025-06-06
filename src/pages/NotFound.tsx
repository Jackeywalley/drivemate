import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();

  // Log the error for monitoring
  console.error(`Page not found: ${location.pathname}`);

  return (
    <div className="min-h-screen bg-silver-light">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-navy rounded-full mx-auto flex items-center justify-center">
              <span className="text-6xl font-bold text-white">404</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-navy/20 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild variant="outline" size="lg">
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90">
              <Link to="/book-ride" className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Book a Ride
              </Link>
            </Button>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Need a Ride?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Book a professional chauffeur for your next journey.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/book-ride">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Experience our luxury transportation services.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
