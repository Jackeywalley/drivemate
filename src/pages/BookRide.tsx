import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Car, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { gradients, cards, buttons, inputs } from "@/lib/utils";

export default function BookRide() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [rideType, setRideType] = useState("standard");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    navigate("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            Book Your Ride
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose your ride type and schedule your journey
          </p>
        </div>

        <Tabs defaultValue="now" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="now" className="text-lg">Book Now</TabsTrigger>
            <TabsTrigger value="later" className="text-lg">Schedule Later</TabsTrigger>
          </TabsList>

          <TabsContent value="now">
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <CardTitle className="text-2xl">Quick Booking</CardTitle>
                <CardDescription>Book a ride for immediate pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <Input
                          id="pickup"
                          placeholder="Enter pickup location"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className={cn(inputs.default, "pl-10")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dropoff">Dropoff Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <Input
                          id="dropoff"
                          placeholder="Enter dropoff location"
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                          className={cn(inputs.default, "pl-10")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ride Type</Label>
                    <Select value={rideType} onValueChange={setRideType}>
                      <SelectTrigger className={inputs.default}>
                        <SelectValue placeholder="Select ride type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>Standard</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="premium">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>Premium</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="luxury">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>Luxury</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or notes for the driver"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={inputs.default}
                    />
                  </div>

                  <Button type="submit" className={cn(buttons.primary, "w-full py-6 text-lg")}>
                    Book Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="later">
            <Card className={cn(cards.glass, "border-none")}>
              <CardHeader>
                <CardTitle className="text-2xl">Schedule Ride</CardTitle>
                <CardDescription>Book a ride for a future date and time</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-neutral-500"
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
                      <Label htmlFor="time">Pickup Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <Input
                          id="time"
                          type="time"
                          className={cn(inputs.default, "pl-10")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <Input
                          id="pickup"
                          placeholder="Enter pickup location"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className={cn(inputs.default, "pl-10")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dropoff">Dropoff Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <Input
                          id="dropoff"
                          placeholder="Enter dropoff location"
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                          className={cn(inputs.default, "pl-10")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ride Type</Label>
                    <Select value={rideType} onValueChange={setRideType}>
                      <SelectTrigger className={inputs.default}>
                        <SelectValue placeholder="Select ride type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>Standard</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="premium">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>Premium</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="luxury">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>Luxury</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or notes for the driver"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={inputs.default}
                    />
                  </div>

                  <Button type="submit" className={cn(buttons.primary, "w-full py-6 text-lg")}>
                    Schedule Ride
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
