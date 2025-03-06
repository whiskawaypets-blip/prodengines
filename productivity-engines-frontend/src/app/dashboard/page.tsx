'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, error, isConfigured, signOut } = useAuth();

  useEffect(() => {
    // Only redirect if Supabase is properly configured and user is not logged in
    if (!isLoading && isConfigured && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router, isConfigured]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Show a specialized error message when Supabase is not configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Not Configured</h2>
          <p className="mb-4">
            The Supabase authentication credentials are missing or incorrect. Please check your environment variables.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Make sure <code className="bg-gray-100 p-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code className="bg-gray-100 p-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are set in <code className="bg-gray-100 p-1 rounded">.env.local</code>.
          </p>
          
          <div className="mt-6">
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if there was an auth error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="mb-4">{error}</p>
          <div className="mt-6">
            <Link href="/login" className="text-blue-600 hover:underline">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be redirected in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button 
            onClick={() => signOut()}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
            <p className="mb-4">Your Productivity Engines dashboard is being set up.</p>
            
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Marketing Agent</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Generate marketing content using AI.
                  </p>
                  <div className="mt-4">
                    <Link 
                      href="/agents/marketing"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Use Agent
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 