
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'client' | 'chauffeur' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  isVerified?: boolean;
  profileImage?: string;
  licenseNumber?: string;
  rating?: number;
  totalRides?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'client@drivemate.com',
    password: 'password123',
    fullName: 'John Doe',
    phone: '+1234567890',
    role: 'client',
    isVerified: true,
    totalRides: 15
  },
  {
    id: '2',
    email: 'driver@drivemate.com',
    password: 'password123',
    fullName: 'Sarah Johnson',
    phone: '+1234567891',
    role: 'chauffeur',
    isVerified: true,
    licenseNumber: 'DL123456789',
    rating: 4.8,
    totalRides: 127
  },
  {
    id: '3',
    email: 'admin@drivemate.com',
    password: 'password123',
    fullName: 'Admin User',
    phone: '+1234567892',
    role: 'admin',
    isVerified: true
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on app start
    const savedUser = localStorage.getItem('drivemate_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('drivemate_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone,
      role: userData.role,
      isVerified: userData.role === 'client',
      totalRides: 0
    };
    
    setUser(newUser);
    localStorage.setItem('drivemate_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('drivemate_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
