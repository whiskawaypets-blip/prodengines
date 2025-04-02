'use client';

import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

export default function AuthForm() {
  const [authView, setAuthView] = useState<'sign_in' | 'sign_up'>('sign_in');
  const { isLoading, error, isConfigured } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Check for auth errors from Supabase
  useEffect(() => {
    const checkUrlForErrors = () => {
      const url = new URL(window.location.href);
      const errorDescription = url.searchParams.get('error_description');
      if (errorDescription) {
        setAuthError(decodeURIComponent(errorDescription));
      }
    };
    
    checkUrlForErrors();
    
    // Also listen for auth errors via events
    const authErrorListener = (event: StorageEvent) => {
      if (event.key?.includes('supabase.auth.error')) {
        try {
          const errorData = JSON.parse(event.newValue || '');
          if (errorData && errorData.error_description) {
            setAuthError(errorData.error_description);
          }
        } catch (e) {
          console.error('Failed to parse auth error:', e);
        }
      }
    };
    
    window.addEventListener('storage', authErrorListener);
    
    // Listen for auth errors from Supabase client
    const handleAuthError = () => {
      const supabaseAuthListener = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        }
      });
      
      return supabaseAuthListener.data.subscription.unsubscribe;
    };
    
    const unsubscribe = handleAuthError();
    
    return () => {
      window.removeEventListener('storage', authErrorListener);
      unsubscribe();
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex justify-center">
        <p className="text-gray-600">Loading authentication...</p>
      </div>
    );
  }
  
  // Show error if Supabase is not configured
  if (!isConfigured) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-700">
          <h3 className="font-bold mb-2">Authentication Not Configured</h3>
          <p className="mb-2">Supabase credentials are missing in your environment variables.</p>
          <p className="text-sm">
            Add the following to your <code className="bg-gray-100 p-1 rounded">.env.local</code> file:
          </p>
          <pre className="mt-2 p-2 bg-gray-100 overflow-x-auto text-xs rounded">
            {`NEXT_PUBLIC_SUPABASE_URL=your-project-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
          </pre>
          <p className="mt-2 text-sm">
            Then restart your development server.
          </p>
        </div>
        
        {/* Show a mock login form that doesn't actually do anything */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {authView === 'sign_in' ? 'Sign In' : 'Create Account'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="you@example.com"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled
              />
            </div>
            <button 
              className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed"
              disabled
            >
              Sign In (Disabled)
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Show general auth error
  if (error || authError) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="p-4 bg-red-50 border border-red-300 rounded-md text-red-700">
          <h3 className="font-bold mb-2">Authentication Error</h3>
          <p>{error || authError}</p>
          <button 
            onClick={() => {
              setAuthError(null);
              window.location.href = window.location.pathname; // Clear URL params
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {authView === 'sign_in' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <Auth
        supabaseClient={supabase}
        view={authView}
        appearance={{ 
          theme: ThemeSupa,
          style: { 
            button: { 
              background: '#4F46E5',
              borderRadius: '0.375rem',
            },
            anchor: { 
              color: '#4F46E5' 
            },
          }
        }}
        theme="light"
        showLinks={true}
        providers={['google']}
        redirectTo={`${siteUrl}/dashboard`}
      />
      
      <div className="mt-4 text-center">
        {authView === 'sign_in' ? (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setAuthView('sign_up')}
          >
            Do not have an account? Sign up
          </button>
        ) : (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setAuthView('sign_in')}
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
      
      {/* Debug helper - you can remove this in production */}
      <div className="mt-8 text-xs text-gray-500">
        <p className="mb-1">Having trouble signing in?</p>
        <a 
          href="/auth-test" 
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Run Authentication Diagnostics
        </a>
      </div>
    </div>
  );
} 