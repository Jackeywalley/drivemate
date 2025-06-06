import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'customer' | 'driver' | 'admin';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

interface DriverProfile {
  id: string;
  license_number: string;
  vehicle_type: string;
  vehicle_plate: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  driverProfile: DriverProfile | null;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: UserRole) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setDriverProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      setProfile(profileData);

      if (profileData.role === 'driver') {
        const { data: driverData, error: driverError } = await supabase
          .from('driver_profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (driverError) {
          console.error('Error fetching driver profile:', driverError);
          return;
        }

        setDriverProfile(driverData);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return error.message;
      }

      return null;
    } catch (error) {
      console.error('Unexpected login error:', error);
      return 'An unexpected error occurred during login';
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: UserRole
  ) => {
    try {
      console.log('Starting signup process...');
      
      // 1. Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
        },
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        return authError.message;
      }

      if (!authData.user) {
        console.error('No user data returned from signup');
        return 'Failed to create user account';
      }

      console.log('User created successfully:', authData.user.id);

      // 2. Create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            role,
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Clean up the user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        return profileError.message;
      }

      console.log('Profile created successfully');

      // 3. If user is a driver, create driver profile
      if (role === 'driver') {
        const { error: driverError } = await supabase
          .from('driver_profiles')
          .insert([
            {
              id: authData.user.id,
              license_number: '', // These will be updated later
              vehicle_type: '',
              vehicle_plate: '',
            },
          ]);

        if (driverError) {
          console.error('Driver profile creation error:', driverError);
          // Clean up the user and profile if driver profile creation fails
          await supabase.auth.admin.deleteUser(authData.user.id);
          return driverError.message;
        }

        console.log('Driver profile created successfully');
      }

      return null;
    } catch (error) {
      console.error('Unexpected signup error:', error);
      return 'An unexpected error occurred during signup';
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during logout',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        driverProfile,
        loading,
        isLoading: loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
