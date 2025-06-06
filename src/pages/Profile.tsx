import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const Profile: React.FC = () => {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [phone, setPhone] = useState(profile?.phone_number || '');
  const [email, setEmail] = useState(user?.email || '');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [rideUpdates, setRideUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement profile update logic
    setTimeout(() => setIsLoading(false), 1000);
  };

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

  return (
    <div className="min-h-screen bg-silver-light">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">
                        Email address cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Ride Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about your ride status
                        </p>
                      </div>
                      <Switch
                        checked={rideUpdates}
                        onCheckedChange={setRideUpdates}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Promotions</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional offers and updates
                        </p>
                      </div>
                      <Switch
                        checked={promotions}
                        onCheckedChange={setPromotions}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-silver-light rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-silver-light rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Change Password</Label>
                        <p className="text-sm text-muted-foreground">
                          Update your account password
                        </p>
                      </div>
                      <Button variant="outline">Change</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-silver-light rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Login History</Label>
                        <p className="text-sm text-muted-foreground">
                          View your recent login activity
                        </p>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-silver-light rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Language</Label>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred language
                        </p>
                      </div>
                      <Button variant="outline">English</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-silver-light rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Currency</Label>
                        <p className="text-sm text-muted-foreground">
                          Set your preferred currency
                        </p>
                      </div>
                      <Button variant="outline">USD</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-silver-light rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Time Zone</Label>
                        <p className="text-sm text-muted-foreground">
                          Set your local time zone
                        </p>
                      </div>
                      <Button variant="outline">UTC-5</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
