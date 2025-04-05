'use client';

import Link from 'next/link';
import { Database } from '@/types/database';
import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];

interface AgentCardProps {
  agent: AgentConfig;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Extract config properties safely
  const config = agent.config as Record<string, unknown> | null;
  const externalUrl = config?.externalUrl as string | undefined;
  const authType = config?.authType as string | undefined;
  const tokenParam = config?.tokenParam as string | undefined;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle external agents with JWT query param auth
    if (externalUrl && authType === 'jwt_query_param' && tokenParam) {
      e.preventDefault(); // Prevent default link navigation
      setIsNavigating(true);
      setError(null);

      try {
        // Get current session
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error(`Authentication error: ${sessionError.message}`);
        }

        if (!data.session) {
          // If no session, maybe prompt user to log in or handle differently?
          // For now, redirect to the external URL without a token, 
          // assuming the external app handles unauthenticated users.
          console.warn('No active session found. Navigating without token.');
          window.open(externalUrl, '_blank');
          // Alternatively, redirect to login:
          // router.push('/'); // Redirect to home which might trigger login via header
          // setError('Please sign in to use this agent.'); 
          return; 
        }

        const jwt = data.session.access_token;
        const urlWithToken = `${externalUrl}?${encodeURIComponent(tokenParam)}=${encodeURIComponent(jwt)}`;
        
        console.log(`Navigating to external agent with token: ${urlWithToken}`);
        window.open(urlWithToken, '_blank', 'noopener,noreferrer');

      } catch (err) {
        console.error('Error preparing external agent navigation:', err);
        setError(err instanceof Error ? err.message : 'Failed to get authentication token.');
      } finally {
        setIsNavigating(false);
      }
    } else {
      // Default behavior for internal agents (assuming path is based on type)
      // Or external agents without special auth handled by simple Link href
      // (The Link component below handles this case)
    }
  };

  // Determine the href for the Link component
  // Internal agents use /dashboard/:type, external without special auth use externalUrl
  const href = (externalUrl && authType !== 'jwt_query_param') 
               ? externalUrl 
               : `/dashboard/${agent.type}`;

  // Target for the Link component
  const target = (externalUrl && authType !== 'jwt_query_param') ? '_blank' : '_self';

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className={`block p-5 ${isNavigating ? 'opacity-70 cursor-not-allowed' : ''}`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center overflow-hidden">
            {agent.icon && agent.icon.startsWith('/') ? (
              <Image 
                src={agent.icon} 
                alt={`${agent.name} icon`}
                width={32}
                height={32}
                className="object-contain"
              />
            ) : agent.icon ? (
              <span className="text-2xl" role="img" aria-label={`${agent.name} icon`}>{agent.icon}</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate" title={agent.name}>
              {agent.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2" title={agent.description || ''}>
              {agent.description || 'No description available.'}
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
        
        <div className="mt-4 flex justify-end">
          <Link 
            href={href} 
            target={target}
            rel={target === '_blank' ? "noopener noreferrer" : undefined}
            onClick={handleClick} 
            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isNavigating ? 'opacity-70 cursor-wait' : ''} ${!externalUrl && authType !== 'jwt_query_param' ? '' : ''} `}
            aria-disabled={isNavigating}
          >
            {isNavigating ? 'Loading...' : (externalUrl ? 'Open Agent' : 'Use Agent')} 
          </Link>
        </div>
      </div>
      
      {error && (
         <div className="px-5 pb-3 text-xs text-red-600 dark:text-red-400">
             Error: {error}
         </div>
       )}
    </div>
  );
}