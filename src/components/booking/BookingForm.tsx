
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Car } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookingFormProps {
  onBookingSubmit: (bookingData: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    duration: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceType || !formData.pickupLocation || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onBookingSubmit(formData);
    
    toast({
      title: "Booking Request Submitted!",
      description: "We're finding available chauffeurs for you.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Car className="h-5 w-5 text-navy" />
          <span>Book a Chauffeur</span>
        </CardTitle>
        <CardDescription>
          Schedule a professional driver for your vehicle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type *</Label>
            <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-way">One-way Trip</SelectItem>
                <SelectItem value="hourly">Hourly Service</SelectItem>
                <SelectItem value="full-day">Full Day Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Location */}
          <div className="space-y-2">
            <Label htmlFor="pickupLocation">Pickup Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="pickupLocation"
                type="text"
                placeholder="Enter pickup address"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Drop-off Location */}
          {formData.serviceType === 'one-way' && (
            <div className="space-y-2">
              <Label htmlFor="dropoffLocation">Drop-off Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dropoffLocation"
                  type="text"
                  placeholder="Enter destination address"
                  value={formData.dropoffLocation}
                  onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Duration for hourly/full-day service */}
          {(formData.serviceType === 'hourly' || formData.serviceType === 'full-day') && (
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {formData.serviceType === 'hourly' ? (
                    <>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="full-day">Full Day (8-10 hours)</SelectItem>
                      <SelectItem value="half-day">Half Day (4-6 hours)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or instructions for your chauffeur..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full navy hover:navy-light">
            Find Available Chauffeurs
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
