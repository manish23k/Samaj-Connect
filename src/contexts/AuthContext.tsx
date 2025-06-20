// src/contexts/AuthContext.tsx
"use client";

import type { User } from '@/types/user';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored auth state (e.g., from localStorage)
    const storedUser = localStorage.getItem('samajAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _pass: string) => {
    // Mock login
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    const mockUser: User = { id: '1', name: email.split('@')[0], email: email, avatarUrl: `https://placehold.co/100x100.png?text=${email.charAt(0).toUpperCase()}` };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('samajAppUser', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/news-feed');
  };

  const signup = async (name: string, email: string, _pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    const mockUser: User = { id: '2', name, email, avatarUrl: `https://placehold.co/100x100.png?text=${name.charAt(0).toUpperCase()}` };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('samajAppUser', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/news-feed');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('samajAppUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, loading }}>
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
