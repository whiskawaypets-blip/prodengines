'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useAdmin } from '@/lib/use-admin';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { AgentCard } from '@/components/dashboard/agent-card';
import { CategoryFilter } from '@/components/dashboard/category-filter';
import { AdminPanel } from '@/components/dashboard/admin-panel';
import { AgentAssignment } from '@/components/dashboard/agent-assignment';
import { TokenUsage } from '@/components/dashboard/token-usage';
import { AgentDeployment } from '@/components/dashboard/agent-deployment';

type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, error, isConfigured } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [isAgentsLoading, setIsAgentsLoading] = useState(true);
  const [agentsError, setAgentsError] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog', 'assignments', 'usage', 'deployment'
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Run setup if this is first time loading with a new user
  useEffect(() => {
    const initializeDatabase = async () => {
      if (user && !isLoading) {
        try {
          // Check if the database is initialized
          const response = await fetch('/api/init-db');
          const data = await response.json();
          
          if (data.success) {
            console.log('Database initialized successfully');
            if (user.email === 'guymaxphelps@gmail.com') {
              // Set admin role for guymaxphelps@gmail.com
              await fetch(`/api/set-admin?email=${encodeURIComponent(user.email)}`);
            }
          }
        } catch (err) {
          console.error('Error initializing database:', err);
        }
      }
    };
    
    initializeDatabase();
  }, [user, isLoading]);

  useEffect(() => {
    // Only redirect if Supabase is properly configured and user is not logged in
    if (!isLoading && isConfigured && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router, isConfigured]);

  const fetchAgents = useCallback(async () => {
    try {
      setIsAgentsLoading(true);
      setAgentsError(null);
      
      const { data, error } = await supabase
        .from('agent_configs')
        .select('*')
        .or(`is_public.eq.true,creator_id.eq.${user?.id}`);
      
      if (error) {
        console.error('Error fetching agents:', error);
        setAgentsError('Failed to load agents. Please try refreshing the page.');
        return;
      }
      
      setAgents(data || []);
      
      // Extract unique categories
      const allCategories = data
        .flatMap(agent => agent.categories || [])
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      
      setCategories(allCategories);
      setSelectedCategories(allCategories); // Initially select all categories
    } catch (err) {
      console.error('Failed to fetch agents:', err);
      setAgentsError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsAgentsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAgents();
    }
  }, [user, fetchAgents]);

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

  const toggleAdminPanel = () => {
    setShowAdminPanel(prev => !prev);
  };

  if (isLoading || isAdminLoading) {
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
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be redirected in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-gray-700 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Productivity Engines Dashboard
          </h1>
          
          {isAdmin && (
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                onClick={toggleAdminPanel}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
              </button>
            </div>
          )}
        </div>
        
        {isAdmin && showAdminPanel && (
          <div className="mt-6">
            <AdminPanel />
          </div>
        )}
        
        {/* Dashboard Tabs */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'catalog' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
            >
              Agent Catalog
            </button>
            
            {isAdmin && (
              <button
                onClick={() => setActiveTab('assignments')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                Agent Assignments
              </button>
            )}
            
            {isAdmin && (
              <button
                onClick={() => setActiveTab('usage')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'usage' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                Token Usage
              </button>
            )}
            
            {isAdmin && (
              <button
                onClick={() => setActiveTab('deployment')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'deployment' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                Agent Deployment
              </button>
            )}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {/* Agent Catalog Tab */}
          {activeTab === 'catalog' && (
            <div>
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
                      aria-hidden="true"
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900 dark:text-white"
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
                    className="animate-spin -ml-1 mr-3 h-8 w-8 text-amber-500" 
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
                  <span className="text-lg text-gray-600 dark:text-gray-300">Loading agents...</span>
                </div>
              ) : filteredAgents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No agents found</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    {searchQuery 
                      ? "Try adjusting your search or filter criteria." 
                      : "There are no available agents matching your selection."}
                  </p>
                  {isAdmin && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowAdminPanel(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 dark:text-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Add Your First Agent
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Agent Assignments Tab */}
          {activeTab === 'assignments' && isAdmin && (
            <AgentAssignment />
          )}
          
          {/* Token Usage Tab */}
          {activeTab === 'usage' && isAdmin && (
            <TokenUsage />
          )}
          
          {/* Agent Deployment Tab */}
          {activeTab === 'deployment' && isAdmin && (
            <AgentDeployment />
          )}
        </div>
      </div>
    </div>
  );
}