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
        
        // Initialize database if needed
        try {
          await fetch('/api/init-db');
        } catch (err) {
          console.error('Database init error:', err);
          // Non-critical, continue anyway
        }
        
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
        console.error('Error fetching agents:', err);
        setAgentsError('Failed to load agents. Please try again.');
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-gray-700 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agents Library
          </h1>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                  >
                    {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
                  </button>
                )}
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                  Signed in as {user.email?.split('@')[0]}
                </div>
              </>
            ) : (
              <Link 
                href="/login"
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Sign In
              </Link>
            )}
            
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Home
            </Link>
          </div>
        </div>
        
        {isAdmin && showAdminPanel && (
          <div className="mt-6">
            <AdminPanel />
          </div>
        )}
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Agent Library
          </h2>
          
          {agentsError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {agentsError}
            </div>
          )}
          
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
            />
          )}
          
          {isAgentsLoading ? (
            <div className="py-12 flex justify-center">
              <svg 
                className="animate-spin h-8 w-8 text-amber-500" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading agents...</span>
            </div>
          ) : filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300">No agents found</p>
              
              {isAdmin && (
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                  Add Your First Agent
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}