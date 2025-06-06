import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Car, UserPlus, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/lib/database.types';

type UserRole = Database['public']['Tables']['profiles']['Row']['role'];

const SignupForm: React.FC = () => {
  const { signup } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const error = await signup(email, password, firstName, lastName, phoneNumber, role);
    
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Please check your email to confirm your account',
      });
      navigate('/login');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 animate-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>

      {/* Theme toggle in top right */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo */}
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="btn-gradient rounded-2xl p-4 shadow-2xl">
                <Car className="h-10 w-10 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-glow" />
            </div>
            <span className="text-3xl font-bold text-gradient">DriveMate</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Join DriveMate</h2>
          <p className="text-muted-foreground text-lg">Create your account to get started</p>
        </div>

        <Card className="card-elevated animate-fade-in border-border/40 backdrop-blur-sm bg-background/80" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-gradient">Sign up</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose your role and create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="border-border/40 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="border-border/40 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="border-border/40 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-border/40 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="border-border/40 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I want to</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Book a chauffeur (Customer)</SelectItem>
                    <SelectItem value="driver">Work as a chauffeur (Driver)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-gradient hover:shadow-xl transition-all duration-300 font-semibold text-lg py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <UserPlus className="h-5 w-5" />
                    <span>Create account</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-gradient font-semibold hover:underline transition-all duration-300">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;
