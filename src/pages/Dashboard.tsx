
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import ChauffeurDashboard from '@/components/dashboard/ChauffeurDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user, profile, isLoading } = useAuth();

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

  if (!user || !profile) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (profile.role) {
      case 'client':
        return <ClientDashboard />;
      case 'chauffeur':
        return <ChauffeurDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Navigate to="/login" replace />;
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
