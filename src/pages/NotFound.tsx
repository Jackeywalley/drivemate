
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Home, ArrowLeft, Sparkles } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 animate-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="relative">
            <div className="btn-gradient rounded-2xl p-4 shadow-2xl">
              <Car className="h-12 w-12 text-white" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400 animate-glow" />
          </div>
          <span className="text-3xl font-bold text-gradient">DriveMate</span>
        </div>

        <Card className="card-elevated border-border/40 backdrop-blur-sm bg-background/80">
          <CardContent className="p-12 text-center space-y-6">
            {/* 404 Number */}
            <div className="space-y-4">
              <h1 className="text-8xl font-bold text-gradient animate-fade-in">404</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Oops! Route Not Found</h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                It looks like you took a wrong turn. The page you're looking for doesn't exist.
              </p>
              <p className="text-sm text-muted-foreground">
                Attempted route: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                asChild 
                className="btn-gradient hover:shadow-xl transition-all duration-300"
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="border-border/40 hover:bg-accent/50"
                onClick={() => window.history.back()}
              >
                <span className="cursor-pointer">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </span>
              </Button>
            </div>

            {/* Help Text */}
            <div className="pt-6 border-t border-border/40">
              <p className="text-sm text-muted-foreground">
                Need help? <Link to="/" className="text-primary hover:underline">Contact our support team</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <Card className="border-border/40 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Book a Ride</h3>
              <p className="text-sm text-muted-foreground">Professional chauffeurs available 24/7</p>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground">Manage your rides and profile</p>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Premium Service</h3>
              <p className="text-sm text-muted-foreground">Luxury experience guaranteed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
