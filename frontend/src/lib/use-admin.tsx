'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './auth-context';
import { supabase } from './supabase';

export interface UseAdminResult {
  isAdmin: boolean;
  isAdminLoading: boolean;
  isAdminError: string | null;
}

export function useAdmin(): UseAdminResult {
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [isAdminError, setIsAdminError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        return;
      }

      try {
        setIsAdminLoading(true);
        
        // Special case for guymaxphelps@gmail.com - always check and set as admin
        if (user.email === 'guymaxphelps@gmail.com') {
          // Try to get the admin role
          const { data: adminData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .maybeSingle();
          
          // If no admin role exists yet, create it
          if (!adminData) {
            try {
              await supabase.from('user_roles').insert({
                user_id: user.id,
                role: 'admin'
              });
              
              // Also call the API endpoint to ensure proper setup - REMOVED
              // await fetch(`/api/set-admin?email=${encodeURIComponent(user.email)}`);
              
              setIsAdmin(true);
            } catch (insertError) {
              console.error('Error setting admin role:', insertError);
              // Try using API endpoint as fallback - REMOVED
              // await fetch(`/api/set-admin?email=${encodeURIComponent(user.email)}`);
              setIsAdmin(true); // Assume admin if insert worked or if it's the special user
            }
          } else {
            setIsAdmin(true);
          }
          setIsAdminLoading(false);
          return;
        }
        
        // For other users, check if they have admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        if (error) {
          // For new users or if no role exists, we should create a user role entry
          if (error.code === 'PGRST116') { // No rows returned
            // Create regular user role
            try {
              await supabase.from('user_roles').insert({
                user_id: user.id,
                role: 'user'
              });
            } catch (insertError) {
              console.error('Error creating user role:', insertError);
            }
            setIsAdmin(false);
          } else {
            console.error('Error checking admin status:', error);
            setIsAdminError(error.message);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(data?.role === 'admin');
        }
      } catch (err) {
        console.error('Failed to check admin status:', err);
        setIsAdminError('Failed to check admin permissions');
        setIsAdmin(false);
      } finally {
        setIsAdminLoading(false);
      }
    };

    if (!isLoading) {
      checkAdminStatus();
    }
  }, [user, isLoading]);

  return { isAdmin, isAdminLoading, isAdminError };
}