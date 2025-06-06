import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Car, Clock, MapPin, Star, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { gradients, cards, buttons, badges } from "@/lib/utils";

// Mock data
const activeRide = {
  id: 1,
  pickup: "123 Main St",
  dropoff: "456 Park Ave",
  scheduledTime: "2024-03-15 14:30",
  status: "in_progress",
  client: {
    name: "John Doe",
    rating: 4.8
  }
};

const rideRequests = [
  {
    id: 1,
    pickup: "789 Oak St",
    dropoff: "321 Pine Rd",
    scheduledTime: "2024-03-15 15:45",
    estimatedPrice: 25.50,
    client: {
      name: "Jane Smith",
      rating: 4.9
    }
  },
  {
    id: 2,
    pickup: "555 Elm St",
    dropoff: "888 Maple Dr",
    scheduledTime: "2024-03-15 16:30",
    estimatedPrice: 32.00,
    client: {
      name: "Mike Johnson",
      rating: 4.7
    }
  }
];

const stats = {
  totalEarnings: 1250.75,
  rating: 4.9,
  totalRides: 45,
  onlineHours: 120
};

export default function ChauffeurDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Chauffeur Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              Manage your rides and earnings
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={isOnline}
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm font-medium">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? "Available for rides" : "Not available"}
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Wallet className="h-4 w-4 text-accent-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                All time earnings
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-warning-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Based on {stats.totalRides} rides
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Car className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRides}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Completed trips
              </p>
            </CardContent>
          </Card>

          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
              <Clock className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.onlineHours}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Total active hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Ride */}
        {activeRide && (
          <Card className={cn(cards.glass, "border-none")}>
            <CardHeader>
              <CardTitle className="text-2xl">Active Ride</CardTitle>
              <CardDescription>Current ride details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary-500" />
                    <span className="font-medium">{activeRide.client.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning-500" />
                      <span className="text-sm">{activeRide.client.rating}</span>
                    </div>
                  </div>
                  <Badge variant="default">In Progress</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent-500" />
                    <span className="text-sm">
                      {activeRide.pickup} → {activeRide.dropoff}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {activeRide.scheduledTime}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="default" className="flex-1">
                    Navigate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact Client
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ride Requests */}
        <Card className={cn(cards.glass, "border-none")}>
          <CardHeader>
            <CardTitle className="text-2xl">Ride Requests</CardTitle>
            <CardDescription>New ride requests from clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rideRequests.map((request) => (
                <Card key={request.id} className={cn(cards.elevated, "hover:shadow-lg transition-all duration-300")}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary-500" />
                          <span className="font-medium">{request.client.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning-500" />
                            <span className="text-sm">{request.client.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent-500" />
                          <span className="text-sm">
                            {request.pickup} → {request.dropoff}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary-500" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {request.scheduledTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <div className="text-right">
                          <div className="font-semibold">${request.estimatedPrice.toFixed(2)}</div>
                          <div className="text-sm text-neutral-500">Estimated fare</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Decline</Button>
                          <Button variant="default" size="sm">Accept</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <Card className={cn(cards.glass, "border-none")}>
          <CardHeader>
            <CardTitle className="text-2xl">Earnings Summary</CardTitle>
            <CardDescription>Your earnings overview</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className={cn(cards.elevated, "hover:shadow-lg transition-all duration-300")}>
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-neutral-500">Total Earnings</div>
                      <div className="text-2xl font-bold mt-2">$125.50</div>
                      <div className="text-sm text-success-500 mt-1">+12% from yesterday</div>
                    </CardContent>
                  </Card>

                  <Card className={cn(cards.elevated, "hover:shadow-lg transition-all duration-300")}>
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-neutral-500">Completed Rides</div>
                      <div className="text-2xl font-bold mt-2">8</div>
                      <div className="text-sm text-success-500 mt-1">+2 from yesterday</div>
                    </CardContent>
                  </Card>

                  <Card className={cn(cards.elevated, "hover:shadow-lg transition-all duration-300")}>
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-neutral-500">Average Fare</div>
                      <div className="text-2xl font-bold mt-2">$15.69</div>
                      <div className="text-sm text-success-500 mt-1">+5% from yesterday</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
