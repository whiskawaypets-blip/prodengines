'use client';

import Link from 'next/link';
import { Database } from '@/types/database';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];

interface AgentCardProps {
  agent: AgentConfig;
}

const defaultIcons = {
  marketing: (
    <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  sales: (
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  hr: (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  admin: (
    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  general: (
    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

function getCategoryIcon(category: string) {
  const normalizedCategory = category.toLowerCase();
  
  if (normalizedCategory.includes('market')) return defaultIcons.marketing;
  if (normalizedCategory.includes('sales')) return defaultIcons.sales;
  if (normalizedCategory.includes('hr') || normalizedCategory.includes('human')) return defaultIcons.hr;
  if (normalizedCategory.includes('admin')) return defaultIcons.admin;
  
  return defaultIcons.general;
}

export function AgentCard({ agent }: AgentCardProps) {
  const primaryCategory = agent.categories?.[0] || 'general';
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  const handleAgentClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginPrompt(true);
    }
  };
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 relative">
      <div className="p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {agent.icon ? (
              <img src={agent.icon} alt={agent.name} className="h-8 w-8" />
            ) : (
              getCategoryIcon(primaryCategory)
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{agent.name}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {agent.description || `A ${primaryCategory} agent for productivity enhancement.`}
            </p>
          </div>
        </div>
        
        {agent.categories && agent.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {agent.categories.map((category) => (
              <span 
                key={category}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4">
          {user ? (
            <Link 
              href={`/dashboard/${agent.type}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Use Agent
            </Link>
          ) : (
            <button
              onClick={handleAgentClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Use Agent
            </button>
          )}
        </div>
      </div>
      
      {/* Login Prompt Overlay */}
      {showLoginPrompt && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-xs w-full">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sign In Required</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You need to sign in to use this agent. Create a free account or sign in to continue.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}