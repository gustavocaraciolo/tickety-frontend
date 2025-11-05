'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'organizer' | 'admin';
  preferred_language: string;
  country?: {
    id: number;
    name: string;
    code: string;
    currency_code: string;
    currency_symbol: string;
  };
  state?: {
    id: number;
    name: string;
    code: string;
  };
  organizer_profile?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  country_id: number;
  state_id: number;
  preferred_language: string;
  role: 'buyer' | 'organizer';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const response = await apiClient.getMe();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          localStorage.removeItem('auth_token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: response.message || 'Falha no login' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Falha no login' };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await apiClient.register(data);
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.getMe();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
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

