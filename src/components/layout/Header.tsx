import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Car, User, LogOut, Calendar, Settings, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'chauffeur':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'client':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <header className="glass border-b border-border/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="btn-gradient rounded-xl p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Car className="h-6 w-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-glow" />
            </div>
            <span className="text-xl font-bold text-gradient">DriveMate</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium hover:scale-105 transform"
            >
              Dashboard
            </Link>
            {profile?.role === 'client' && (
              <Link
                to="/book-ride"
                className="text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium hover:scale-105 transform"
              >
                Book Ride
              </Link>
            )}
            {profile?.role === 'chauffeur' && (
              <Link
                to="/rides"
                className="text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium hover:scale-105 transform"
              >
                My Rides
              </Link>
            )}
            {profile?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-foreground/70 hover:text-foreground transition-colors duration-300 font-medium hover:scale-105 transform"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="hidden sm:flex items-center space-x-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getRoleColor(profile.role)} border border-current/20 backdrop-blur-sm`}>
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </span>
              </div>
            )}
            
            <ThemeToggle />
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-border/40 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={profile?.profile_image || ''} alt={profile?.full_name} />
                      <AvatarFallback className="btn-gradient text-white font-semibold">
                        {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 glass border-border/40" align="end" forceMount>
                  <div className="flex flex-col space-y-2 p-4 border-b border-border/40">
                    <p className="text-sm font-semibold leading-none">{profile?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/40" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <User className="mr-3 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <Calendar className="mr-3 h-4 w-4" />
                    <span>My Bookings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <Settings className="mr-3 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/40" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
