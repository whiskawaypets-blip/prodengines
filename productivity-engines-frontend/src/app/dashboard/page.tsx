'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        router.push('/login');
        return;
      }
      
      setUser(data.session.user);
      setLoading(false);
    };

    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login');
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
            <p className="mb-4">Your Productivity Engines dashboard is being set up.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-2">Marketing Research Agent</h3>
                <p className="text-gray-600">Analyze and get valuable insights for businesses.</p>
                <Link href="/dashboard/marketing-agent" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block">
                  Use Agent
                </Link>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-2">Private Conversational AI</h3>
                <p className="text-gray-600">Secure AI assistant trained on your documents.</p>
                <button disabled className="mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-2">Process Analysis</h3>
                <p className="text-gray-600">Uncover opportunities for efficiency in your workflows.</p>
                <button disabled className="mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 