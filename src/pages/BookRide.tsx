import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Car, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const BookRide: React.FC = () => {
  const { user, profile, isLoading } = useAuth();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('12:00');
  const [passengers, setPassengers] = useState<string>('1');
  const [serviceType, setServiceType] = useState<string>('standard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-silver-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', { date, time, passengers, serviceType });
  };

  return (
    <div className="min-h-screen bg-silver-light">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book Your Ride</h1>
            <p className="text-muted-foreground mt-2">
              Choose your pickup location, destination, and preferred time
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="pickup"
                      placeholder="Enter pickup address"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropoff">Drop-off Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="dropoff"
                      placeholder="Enter destination address"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date and Time */}
            <Card>
              <CardHeader>
                <CardTitle>When do you need the ride?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ride Details */}
            <Card>
              <CardHeader>
                <CardTitle>Ride Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Number of Passengers</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4 Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Service Type</Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Book Now
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BookRide;
