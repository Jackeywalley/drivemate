
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  DollarSign, 
  Car, 
  User,
  Plus,
  Minus,
  Route,
  Info,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';

const BookingForm: React.FC = () => {
  const { profile } = useAuth();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState('');
  const [durationHours, setDurationHours] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTypes = [
    {
      id: 'one_way',
      name: 'One-Way Trip',
      description: 'Single destination ride',
      basePrice: 25,
      icon: Route
    },
    {
      id: 'hourly',
      name: 'Hourly Service',
      description: 'Multiple stops, charged by hour',
      basePrice: 45,
      icon: Clock
    },
    {
      id: 'full_day',
      name: 'Full Day Service',
      description: 'Dedicated chauffeur for the day',
      basePrice: 300,
      icon: Calendar
    }
  ];

  const calculateEstimatedPrice = () => {
    const selectedService = serviceTypes.find(s => s.id === serviceType);
    if (!selectedService) return 0;

    if (serviceType === 'hourly') {
      return selectedService.basePrice * durationHours;
    }
    return selectedService.basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a ride.",
        variant: "destructive",
      });
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Missing information",
        description: "Please select both date and time for your ride.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledDateTime = new Date(scheduledDate);
      const [hours, minutes] = scheduledTime.split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

      const rideData = {
        client_id: profile.id,
        pickup_location: pickupLocation,
        dropoff_location: serviceType === 'one_way' ? dropoffLocation : null,
        service_type: serviceType,
        scheduled_time: scheduledDateTime.toISOString(),
        duration_hours: serviceType === 'hourly' ? durationHours : null,
        special_instructions: specialInstructions || null,
        estimated_price: calculateEstimatedPrice(),
        status: 'pending'
      };

      const { error } = await supabase
        .from('rides')
        .insert([rideData]);

      if (error) {
        console.error('Error creating ride:', error);
        toast({
          title: "Booking failed",
          description: "There was an error creating your booking. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ride booked successfully!",
          description: "Your ride has been submitted and is pending chauffeur assignment.",
        });
        
        // Reset form
        setPickupLocation('');
        setDropoffLocation('');
        setServiceType('');
        setScheduledDate(undefined);
        setScheduledTime('');
        setDurationHours(1);
        setSpecialInstructions('');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Booking failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full btn-gradient shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient">Book Your Ride</h1>
          <Sparkles className="h-6 w-6 text-yellow-500 animate-glow" />
        </div>
        <p className="text-xl text-muted-foreground">
          Professional chauffeurs for your vehicle, available 24/7
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Service Type Selection */}
        <Card className="card-elevated border-border/40">
          <CardHeader>
            <CardTitle className="text-xl">Choose Your Service</CardTitle>
            <CardDescription>Select the type of service that best fits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceTypes.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      serviceType === service.id
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-border/40 hover:border-primary/50 hover:bg-accent/50'
                    }`}
                    onClick={() => setServiceType(service.id)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        serviceType === service.id ? 'bg-primary text-white' : 'bg-muted'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${service.basePrice}</span>
                      <span className="text-sm text-muted-foreground">
                        {service.id === 'hourly' ? '/hour' : service.id === 'full_day' ? '/day' : 'base'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card className="card-elevated border-border/40">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location Details
            </CardTitle>
            <CardDescription>Where should your chauffeur pick you up?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location *</Label>
              <Input
                id="pickup"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Enter your pickup address..."
                required
                className="border-border/40 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {serviceType === 'one_way' && (
              <div className="space-y-2">
                <Label htmlFor="dropoff">Destination *</Label>
                <Input
                  id="dropoff"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Enter your destination..."
                  required
                  className="border-border/40 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}

            {serviceType === 'hourly' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">Hourly Service</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Perfect for multiple stops, shopping trips, or business meetings. 
                    Your chauffeur will wait for you at each location.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours) *</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDurationHours(Math.max(1, durationHours - 1))}
                      disabled={durationHours <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-xl w-16 text-center">{durationHours}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDurationHours(Math.min(12, durationHours + 1))}
                      disabled={durationHours >= 12}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Minimum 1 hour, maximum 12 hours</p>
                </div>
              </div>
            )}

            {serviceType === 'full_day' && (
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">Full Day Service</span>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  A dedicated chauffeur for up to 8 hours. Perfect for city tours, 
                  business travel, or special events.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card className="card-elevated border-border/40">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule Your Ride
            </CardTitle>
            <CardDescription>When do you need your chauffeur?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-border/40"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  required
                  className="border-border/40 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card className="card-elevated border-border/40">
          <CardHeader>
            <CardTitle className="text-xl">Additional Information</CardTitle>
            <CardDescription>Any special requirements or instructions for your chauffeur?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g., Please call when you arrive, Assistance with luggage needed, etc."
                rows={4}
                className="border-border/40 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Price Summary */}
        {serviceType && (
          <Card className="card-elevated border-border/40">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Price Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Service Type:</span>
                  <Badge variant="outline" className="capitalize">
                    {serviceTypes.find(s => s.id === serviceType)?.name}
                  </Badge>
                </div>
                
                {serviceType === 'hourly' && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{durationHours} hour{durationHours > 1 ? 's' : ''}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between py-2 text-lg font-bold">
                  <span>Estimated Total:</span>
                  <span className="text-primary">${calculateEstimatedPrice().toFixed(2)}</span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  * Final price may vary based on actual distance and time. 
                  You'll be notified of any changes before confirmation.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting || !serviceType}
            className="btn-gradient hover:shadow-xl transition-all duration-300 text-lg px-12 py-6"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Booking Your Ride...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5" />
                <span>Book Ride - ${calculateEstimatedPrice().toFixed(2)}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
