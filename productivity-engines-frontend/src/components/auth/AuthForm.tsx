'use client';

import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';

export default function AuthForm() {
  const [authView, setAuthView] = useState<'sign_in' | 'sign_up'>('sign_in');
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {authView === 'sign_in' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <Auth
        supabaseClient={supabase}
        view={authView}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={true}
        providers={['google']}
        redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`}
      />
      
      <div className="mt-4 text-center">
        {authView === 'sign_in' ? (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setAuthView('sign_up')}
          >
            Don&apos;t have an account? Sign up
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
    </div>
  );
} 