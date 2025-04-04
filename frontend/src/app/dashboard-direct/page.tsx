'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { AgentCard } from '@/components/dashboard/agent-card';
import { CategoryFilter } from '@/components/dashboard/category-filter';
import { AdminPanel } from '@/components/dashboard/admin-panel';
import { Database } from '@/types/database';
import { User } from '@supabase/supabase-js';
import { Skeleton } from "@/components/ui/skeleton";

type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];

export default function DashboardDirectPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [isAgentsLoading, setIsAgentsLoading] = useState(true);
  const [agentsError, setAgentsError] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Custom user check - allows non-logged-in users to view the library
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        // Try to get from localStorage first (from auth-debug fix)
        const storedUser = localStorage.getItem('dashboard_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // Also check Supabase session
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
        }
        
        // Non-logged-in users can still view the library
        // No redirect to login here
      } catch (err) {
        console.error('Session check error:', err);
        // Fall back to stored user if available
        const storedUser = localStorage.getItem('dashboard_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        // No redirect on error - allow anonymous view
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, [router]);
  
  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      try {
        // Special case for guymaxphelps@gmail.com
        if (user.email === 'guymaxphelps@gmail.com') {
          setIsAdmin(true);
          return;
        }
        
        // Check admin role
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
          
        setIsAdmin(!!data);
      } catch (err) {
        console.error('Admin check error:', err);
        // If guymaxphelps@gmail.com, set admin regardless of error
        if (user.email === 'guymaxphelps@gmail.com') {
          setIsAdmin(true);
        }
      }
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  // Fetch agents even without a logged-in user
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsAgentsLoading(true);
        
        // Initialize database if needed - REMOVED for production build
        /* try {
          await fetch('/api/init-db');
        } catch (err) {
          console.error('Database init error:', err);
          // Non-critical, continue anyway
        } */
        
        // Fetch public agents
        const { data, error } = await supabase
          .from('agent_configs')
          .select('*')
          .eq('is_public', true);
          
        if (error) {
          throw error;
        }
        
        setAgents(data || []);
        
        // Extract unique categories
        const allCategories = data
          .flatMap(agent => agent.categories || [])
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort();
        
        setCategories(allCategories);
        setSelectedCategories(allCategories);
      } catch (err) {
        console.error('Raw error fetching agents:', err); // Log the raw error
        let errorMessage = 'Failed to load agents. Please try again.';
        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === 'string') {
            errorMessage = err;
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
             // Handle Supabase specific error structure if needed
            errorMessage = (err as { message?: string }).message || JSON.stringify(err);
        } else {
            errorMessage = JSON.stringify(err); // Fallback to stringify
        }
        console.error('Processed error message:', errorMessage); // Log processed message
        setAgentsError(errorMessage);
      } finally {
        setIsAgentsLoading(false);
      }
    };
    
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(agent => {
    // Filter by selected categories
    const categoryMatch = selectedCategories.length === 0 || 
      (agent.categories && agent.categories.some(cat => selectedCategories.includes(cat)));
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agent.description && agent.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  // Main Loading State (Session Check)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-gray-700 sm:flex sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agents Library
          </h1>
          
          <div className="mt-3 sm:mt-0 flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors duration-150"
                  >
                    {showAdminPanel ? 'Hide Admin Panel' : 'Add New Agent'}
                  </button>
                )}
                <div className="px-3 py-1.5 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                  Logged in: {user.email?.split('@')[0]}
                </div>
              </>
            ) : (
              <Link 
                href="#"
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('google-login-button')?.click();
                }}
                className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors duration-150"
              >
                Sign In
              </Link>
            )}
            
            <Link 
              href="/"
              className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {isAdmin && showAdminPanel && (
          <div className="mb-8">
            <AdminPanel />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
              <div className="mb-6">
                <label htmlFor="search" className="sr-only">Search Agents</label>
                <input
                  type="search"
                  id="search"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <CategoryFilter 
                categories={categories} 
                selectedCategories={selectedCategories} 
                onChange={setSelectedCategories} 
              />
            </div>
          </div>

          <div className="md:col-span-3">
            {isAgentsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-8 w-1/3 ml-auto" />
                  </div>
                ))}
              </div>
            ) : agentsError ? (
              <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-700 dark:text-red-300">{agentsError}</p>
              </div>
            ) : filteredAgents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-gray-500 dark:text-gray-400">No agents found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}