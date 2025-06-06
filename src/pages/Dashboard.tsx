import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import ChauffeurDashboard from '@/components/dashboard/ChauffeurDashboard';

const Dashboard: React.FC = () => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

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

  // Create a mock profile if none exists (for testing)
  const mockProfile = {
    role: 'admin',
    first_name: 'Admin',
    last_name: 'User',
    email: user?.email || 'admin@example.com',
    phone_number: '+1234567890'
  };

  // Use the mock profile if no real profile exists
  const userProfile = profile || mockProfile;

  const renderDashboard = () => {
    // Determine which dashboard to show based on the current route
    switch (location.pathname) {
      case '/admin-dashboard':
        return <AdminDashboard />;
      case '/driver-dashboard':
        return <ChauffeurDashboard />;
      case '/dashboard':
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-silver-light">
      <Header />
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
