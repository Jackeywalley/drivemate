
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BookingForm from '@/components/booking/BookingForm';

const BookRide: React.FC = () => {
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

  if (profile.role !== 'client') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-silver-light">
      <Header />
      <div className="py-8">
        <BookingForm />
      </div>
    </div>
  );
};

export default BookRide;
