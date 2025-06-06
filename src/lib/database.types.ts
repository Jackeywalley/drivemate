export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          phone_number: string
          role: 'customer' | 'driver' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          phone_number: string
          role: 'customer' | 'driver' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          phone_number?: string
          role?: 'customer' | 'driver' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      driver_profiles: {
        Row: {
          id: string
          license_number: string
          vehicle_type: string
          vehicle_plate: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          license_number: string
          vehicle_type: string
          vehicle_plate: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          license_number?: string
          vehicle_type?: string
          vehicle_plate?: string
          created_at?: string
          updated_at?: string
        }
      }
      rides: {
        Row: {
          id: string
          customer_id: string
          driver_id: string | null
          pickup_location: string
          dropoff_location: string
          pickup_coordinates: [number, number] | null
          dropoff_coordinates: [number, number] | null
          status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          scheduled_time: string | null
          actual_pickup_time: string | null
          actual_dropoff_time: string | null
          distance: number | null
          duration: number | null
          base_fare: number | null
          total_fare: number | null
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          driver_id?: string | null
          pickup_location: string
          dropoff_location: string
          pickup_coordinates?: [number, number] | null
          dropoff_coordinates?: [number, number] | null
          status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          scheduled_time?: string | null
          actual_pickup_time?: string | null
          actual_dropoff_time?: string | null
          distance?: number | null
          duration?: number | null
          base_fare?: number | null
          total_fare?: number | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          driver_id?: string | null
          pickup_location?: string
          dropoff_location?: string
          pickup_coordinates?: [number, number] | null
          dropoff_coordinates?: [number, number] | null
          status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          scheduled_time?: string | null
          actual_pickup_time?: string | null
          actual_dropoff_time?: string | null
          distance?: number | null
          duration?: number | null
          base_fare?: number | null
          total_fare?: number | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          ride_id: string
          amount: number
          currency: string
          payment_method: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ride_id: string
          amount: number
          currency?: string
          payment_method?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ride_id?: string
          amount?: number
          currency?: string
          payment_method?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          ride_id: string
          rating_by: string
          rating_for: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ride_id: string
          rating_by: string
          rating_for: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ride_id?: string
          rating_by?: string
          rating_for?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 