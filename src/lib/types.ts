export type UserRole = 'customer' | 'driver' | 'admin';
export type RideStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface DriverProfile extends Profile {
  license_number: string;
  license_expiry: string;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_year: number | null;
  vehicle_color: string | null;
  vehicle_plate: string | null;
  is_verified: boolean;
  rating: number;
  total_rides: number;
}

export interface Ride {
  id: string;
  customer_id: string;
  driver_id: string | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_coordinates: [number, number] | null;
  dropoff_coordinates: [number, number] | null;
  status: RideStatus;
  scheduled_time: string | null;
  actual_pickup_time: string | null;
  actual_dropoff_time: string | null;
  distance: number | null;
  duration: number | null;
  base_fare: number | null;
  total_fare: number | null;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  ride_id: string;
  amount: number;
  currency: string;
  payment_method: string | null;
  status: PaymentStatus;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: string;
  ride_id: string;
  rating_by: string;
  rating_for: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RideRequest {
  pickup_location: string;
  dropoff_location: string;
  pickup_coordinates: Coordinates;
  dropoff_coordinates: Coordinates;
  scheduled_time?: string;
}

export interface DriverLocation {
  driver_id: string;
  location: Coordinates;
  last_updated: string;
} 