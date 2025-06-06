
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Car, LogOut, Menu, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-navy rounded-lg p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-navy">DriveMate</span>
          </Link>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-6">
              {user.role === 'client' && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors hover:text-navy ${
                      isActive('/dashboard') ? 'text-navy' : 'text-muted-foreground'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/book"
                    className={`text-sm font-medium transition-colors hover:text-navy ${
                      isActive('/book') ? 'text-navy' : 'text-muted-foreground'
                    }`}
                  >
                    Book Ride
                  </Link>
                  <Link
                    to="/rides"
                    className={`text-sm font-medium transition-colors hover:text-navy ${
                      isActive('/rides') ? 'text-navy' : 'text-muted-foreground'
                    }`}
                  >
                    My Rides
                  </Link>
                </>
              )}
              
              {user.role === 'chauffeur' && (
                <>
                  <Link
                    to="/driver-dashboard"
                    className={`text-sm font-medium transition-colors hover:text-navy ${
                      isActive('/driver-dashboard') ? 'text-navy' : 'text-muted-foreground'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/earnings"
                    className={`text-sm font-medium transition-colors hover:text-navy ${
                      isActive('/earnings') ? 'text-navy' : 'text-muted-foreground'
                    }`}
                  >
                    Earnings
                  </Link>
                </>
              )}
              
              {user.role === 'admin' && (
                <>
                  <Link
                    to="/admin"
                    className={`text-sm font-medium transition-colors hover:text-navy ${
                      isActive('/admin') ? 'text-navy' : 'text-muted-foreground'
                    }`}
                  >
                    Admin Panel
                  </Link>
                </>
              )}
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout} className="p-2 hover:bg-red-50 hover:text-red-600">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="navy">Sign Up</Button>
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
