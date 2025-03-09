'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthDebugPage() {
  const router = useRouter();
  const { user, session, isLoading, error, isConfigured } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const getDebugInfo = async () => {
      try {
        // Get session info
        const { data: sessionData } = await supabase.auth.getSession();
        
        // Test supabase connection
        const { data: testData, error: testError } = await supabase.from('auth.users').select('*').limit(1);
        
        setDebugInfo({
          clientSession: sessionData,
          testQuery: { data: testData, error: testError },
          contextInfo: {
            isUser: !!user,
            userEmail: user?.email,
            isSession: !!session,
            isLoading,
            error,
            isConfigured
          }
        });
      } catch (err) {
        console.error('Error fetching debug info:', err);
        setDebugInfo({ error: err });
      }
    };
    
    getDebugInfo();
  }, [user, session, isLoading, error, isConfigured]);
  
  const hardResetSession = async () => {
    setLoading(true);
    try {
      // Sign out
      await supabase.auth.signOut();
      
      // Clear local storage
      localStorage.clear();
      
      // Clear cookies
      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      });
      
      setStatus('Session reset complete. Please sign in again.');
      
      // Wait 1 second and reload
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (err) {
      console.error('Error resetting session:', err);
      setStatus('Error resetting session: ' + String(err));
    } finally {
      setLoading(false);
    }
  };
  
  const fixDashboardRedirect = () => {
    setLoading(true);
    try {
      // Store current user info in localStorage for dashboard
      if (user) {
        localStorage.setItem('dashboard_user', JSON.stringify({
          id: user.id,
          email: user.email
        }));
      }
      
      setStatus('Dashboard fix applied. Redirecting...');
      
      // Wait 1 second and go to dashboard
      setTimeout(() => {
        router.push('/dashboard-direct');
      }, 1000);
    } catch (err) {
      console.error('Error applying fix:', err);
      setStatus('Error applying fix: ' + String(err));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Authentication Debug Tool</h1>
        
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <h2 className="text-xl font-medium mb-4">Authentication Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Is User Signed In:</div>
            <div>{user ? '✅ Yes' : '❌ No'}</div>
            
            <div className="font-medium">Email:</div>
            <div>{user?.email || 'N/A'}</div>
            
            <div className="font-medium">User ID:</div>
            <div>{user?.id || 'N/A'}</div>
            
            <div className="font-medium">Active Session:</div>
            <div>{session ? '✅ Yes' : '❌ No'}</div>
            
            <div className="font-medium">Still Loading:</div>
            <div>{isLoading ? '⏳ Yes' : '✅ No'}</div>
            
            <div className="font-medium">Error:</div>
            <div>{error || 'None'}</div>
            
            <div className="font-medium">Supabase Configured:</div>
            <div>{isConfigured ? '✅ Yes' : '❌ No'}</div>
          </div>
        </div>
        
        <div className="mb-8 flex gap-4">
          <button
            onClick={hardResetSession}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Working...' : 'Hard Reset Session'}
          </button>
          
          <button
            onClick={fixDashboardRedirect}
            disabled={loading || !user}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Working...' : 'Apply Dashboard Fix'}
          </button>
          
          <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Back to Home
          </Link>
        </div>
        
        {status && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="font-medium">{status}</p>
          </div>
        )}
        
        <h2 className="text-2xl font-bold mb-4">Debug Information</h2>
        <div className="p-4 bg-gray-100 rounded-lg overflow-auto max-h-96">
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}