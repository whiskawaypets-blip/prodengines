'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { useAuth } from '@/lib/auth-context';

type TokenUsage = Database['public']['Tables']['token_usage']['Row'];
type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];

export function TokenUsage() {
  const { user } = useAuth();
  const [tokenUsage, setTokenUsage] = useState<TokenUsage[]>([]);
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('7d'); // '24h', '7d', '30d', 'all'
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('agent_configs')
        .select('*');
      
      if (agentsError) throw agentsError;
      
      // Calculate date range
      let query = supabase.from('token_usage').select('*');
      const now = new Date();
      
      if (timeRange === '24h') {
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        query = query.gte('created_at', yesterday.toISOString());
      } else if (timeRange === '7d') {
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        query = query.gte('created_at', lastWeek.toISOString());
      } else if (timeRange === '30d') {
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        query = query.gte('created_at', lastMonth.toISOString());
      }
      
      // Fetch token usage
      const { data: usageData, error: usageError } = await query;
      
      if (usageError) throw usageError;
      
      setAgents(agentsData || []);
      setTokenUsage(usageData || []);
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
      setError('Failed to load token usage data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  // Calculate summary statistics
  const calculateStats = () => {
    if (tokenUsage.length === 0) return { totalTokens: 0, totalCost: 0, agentStats: [] };
    
    const totalTokens = tokenUsage.reduce((sum, item) => sum + item.total_tokens, 0);
    const totalCost = tokenUsage.reduce((sum, item) => sum + item.cost, 0);
    
    // Group by agent
    const agentStats = agents.map(agent => {
      const agentUsage = tokenUsage.filter(item => item.agent_id === agent.id);
      const agentTokens = agentUsage.reduce((sum, item) => sum + item.total_tokens, 0);
      const agentCost = agentUsage.reduce((sum, item) => sum + item.cost, 0);
      const percentage = totalTokens > 0 ? (agentTokens / totalTokens) * 100 : 0;
      
      return {
        id: agent.id,
        name: agent.name,
        tokens: agentTokens,
        cost: agentCost,
        percentage,
        requests: agentUsage.length
      };
    }).filter(agent => agent.tokens > 0).sort((a, b) => b.tokens - a.tokens);
    
    return { totalTokens, totalCost, agentStats };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">Token Usage Analytics</h2>
        
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
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
          <span className="text-lg text-gray-600 dark:text-gray-300">Loading usage data...</span>
        </div>
      ) : tokenUsage.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Tokens</h3>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {stats.totalTokens.toLocaleString()}
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Cost</h3>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                ${stats.totalCost.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Requests</h3>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {tokenUsage.length.toLocaleString()}
              </p>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Usage by Agent</h3>
          
          {stats.agentStats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Agent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tokens
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Requests
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      % of Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {stats.agentStats.map(agent => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {agent.tokens.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${agent.cost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {agent.requests.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <span className="mr-2">{agent.percentage.toFixed(1)}%</span>
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-amber-600 h-2.5 rounded-full" 
                              style={{ width: `${agent.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500 dark:text-gray-400">
              No agent usage data available for the selected time period.
            </div>
          )}
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No usage data found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            There is no token usage data available for the selected time period.
          </p>
        </div>
      )}
    </div>
  );
}
