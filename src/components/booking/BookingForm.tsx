
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, MapPin, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type ServiceType = 'one_way' | 'hourly' | 'full_day';

interface BookingFormData {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  scheduledDate: Date | undefined;
  scheduledTime: string;
  durationHours: number | undefined;
  specialInstructions: string;
}

const BookingForm: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: 'one_way',
    pickupLocation: '',
    dropoffLocation: '',
    scheduledDate: undefined,
    scheduledTime: '',
    durationHours: undefined,
    specialInstructions: '',
  });

  const calculateEstimatedPrice = (serviceType: ServiceType, durationHours?: number): number => {
    const baseRates = {
      one_way: 50,
      hourly: 30,
      full_day: 200,
    };

    if (serviceType === 'hourly' && durationHours) {
      return baseRates.hourly * durationHours;
    }

    return baseRates[serviceType];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a ride.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      toast({
        title: "Invalid date/time",
        description: "Please select a valid date and time.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const scheduledDateTime = new Date(formData.scheduledDate);
      const [hours, minutes] = formData.scheduledTime.split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

      const estimatedPrice = calculateEstimatedPrice(formData.serviceType, formData.durationHours);

      const { error } = await supabase
        .from('rides')
        .insert({
          client_id: user.id,
          service_type: formData.serviceType,
          pickup_location: formData.pickupLocation,
          dropoff_location: formData.dropoffLocation || null,
          scheduled_time: scheduledDateTime.toISOString(),
          duration_hours: formData.durationHours || null,
          estimated_price: estimatedPrice,
          special_instructions: formData.specialInstructions || null,
        });

      if (error) {
        toast({
          title: "Booking failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Booking created successfully!",
        description: "Your ride request has been submitted. We'll find you a chauffeur shortly.",
      });

      // Reset form
      setFormData({
        serviceType: 'one_way',
        pickupLocation: '',
        dropoffLocation: '',
        scheduledDate: undefined,
        scheduledTime: '',
        durationHours: undefined,
        specialInstructions: '',
      });

    } catch (error) {
      toast({
        title: "Booking failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedPrice = calculateEstimatedPrice(formData.serviceType, formData.durationHours);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-navy" />
            <span>Book Your Chauffeur</span>
          </CardTitle>
          <CardDescription>
            Choose your service type and provide trip details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select 
                value={formData.serviceType} 
                onValueChange={(value: ServiceType) => setFormData(prev => ({ ...prev, serviceType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one_way">One Way Trip</SelectItem>
                  <SelectItem value="hourly">Hourly Service</SelectItem>
                  <SelectItem value="full_day">Full Day Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                placeholder="Enter pickup address"
                value={formData.pickupLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                required
              />
            </div>

            {/* Dropoff Location (only for one_way) */}
            {formData.serviceType === 'one_way' && (
              <div className="space-y-2">
                <Label htmlFor="dropoffLocation">Dropoff Location</Label>
                <Input
                  id="dropoffLocation"
                  placeholder="Enter destination address"
                  value={formData.dropoffLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
                  required
                />
              </div>
            )}

            {/* Duration (for hourly service) */}
            {formData.serviceType === 'hourly' && (
              <div className="space-y-2">
                <Label htmlFor="durationHours">Duration (Hours)</Label>
                <Input
                  id="durationHours"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="Number of hours"
                  value={formData.durationHours || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    durationHours: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  required
                />
              </div>
            )}

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.scheduledDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.scheduledDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, scheduledDate: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledTime">Time</Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any special requirements or instructions for your chauffeur..."
                value={formData.specialInstructions}
                onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Price Estimate */}
            <div className="bg-silver-light p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-navy" />
                  <span className="font-medium">Estimated Price</span>
                </div>
                <span className="text-2xl font-bold text-navy">${estimatedPrice}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Final price may vary based on actual distance and time
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full navy hover:navy-light"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating booking...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Book Now</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
