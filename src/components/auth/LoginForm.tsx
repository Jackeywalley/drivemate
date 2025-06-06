
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Car, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await login(email, password);
    
    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate('/dashboard');
    }
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
          <h2 className="text-4xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground text-lg">Sign in to your account</p>
        </div>

        <Card className="card-elevated animate-fade-in border-border/40 backdrop-blur-sm bg-background/80" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-gradient">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-border/40 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-gradient hover:shadow-xl transition-all duration-300 font-semibold text-lg py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <LogIn className="h-5 w-5" />
                    <span>Sign in</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-gradient font-semibold hover:underline transition-all duration-300">
                  Sign up
                </Link>
              </p>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 inline-block">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
