'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  isConfigured: boolean; // Flag to indicate if Supabase is configured
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// Check if Supabase is configured properly
const isSupabaseConfigured = 
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If Supabase is not configured, skip auth initialization
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setError('Supabase is not configured. Authentication will not work.');
      return;
    }

    // Get session on initial load
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setError(error.message);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          setError(null);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Only set up listener if Supabase is configured
    if (isSupabaseConfigured) {
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log(`Auth event: ${event}`);
          
          // Handle specific auth events
          switch (event) {
            case 'SIGNED_IN':
              setSession(newSession);
              setUser(newSession?.user ?? null);
              setIsLoading(false);
              
              // Redirect to dashboard on successful sign in - REMOVED
              // The redirect should be handled by the redirectTo option in signInWithOAuth
              /* if (newSession?.user) {
                console.log('User signed in - redirecting to dashboard');
                // Add small delay to allow state updates to propagate
                setTimeout(() => router.push('/dashboard'), 300);
              } */
              break;
              
            case 'SIGNED_OUT':
              setSession(null);
              setUser(null);
              // Redirect to home page or login page when signed out
              router.push('/login');
              break;
              
            case 'TOKEN_REFRESHED':
              setSession(newSession);
              setUser(newSession?.user ?? null);
              break;
              
            case 'USER_UPDATED':
              setSession(newSession);
              setUser(newSession?.user ?? null);
              break;
              
            default:
              // Update the session and user state for other events
              setSession(newSession);
              setUser(newSession?.user ?? null);
          }
        }
      );

      // Cleanup subscription on unmount
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, [router]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    if (!isSupabaseConfigured) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error refreshing session:', error);
        setError(error.message);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setError(null);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      setError('Failed to refresh authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    error,
    isConfigured: isSupabaseConfigured,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 