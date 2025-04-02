'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { useAuth } from '@/lib/auth-context';

type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];
type AgentDeployment = Database['public']['Tables']['agent_deployments']['Row'];

export function AgentDeployment() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [deployments, setDeployments] = useState<AgentDeployment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    agentId: '',
    subdomain: '',
    version: '1.0.0',
    replitUrl: ''
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('agent_configs')
        .select('*');
      
      if (agentsError) throw agentsError;
      
      // Fetch deployments
      const { data: deploymentsData, error: deploymentsError } = await supabase
        .from('agent_deployments')
        .select('*');
      
      if (deploymentsError) throw deploymentsError;
      
      setAgents(agentsData || []);
      setDeployments(deploymentsData || []);
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate subdomain from agent name
    if (name === 'agentId' && value) {
      const selectedAgent = agents.find(a => a.id === value);
      if (selectedAgent) {
        const suggestedSubdomain = selectedAgent.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        setFormData(prev => ({
          ...prev,
          subdomain: suggestedSubdomain
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      // Validate form
      if (!formData.agentId) {
        setError('Please select an agent');
        return;
      }
      
      if (!formData.subdomain) {
        setError('Please enter a subdomain');
        return;
      }
      
      if (!formData.replitUrl) {
        setError('Please enter the Replit URL');
        return;
      }
      
      // Check if subdomain is already in use
      const existingDeployment = deployments.find(d => 
        d.subdomain === formData.subdomain && d.agent_id !== formData.agentId
      );
      
      if (existingDeployment) {
        setError('This subdomain is already in use by another agent');
        return;
      }
      
      // Check if agent is already deployed
      const existingAgentDeployment = deployments.find(d => d.agent_id === formData.agentId);
      
      let deploymentId;
      let operation;
      
      if (existingAgentDeployment) {
        // Update existing deployment
        operation = 'updated';
        const { data, error: updateError } = await supabase
          .from('agent_deployments')
          .update({
            subdomain: formData.subdomain,
            version: formData.version,
            config: { replitUrl: formData.replitUrl },
            status: 'pending', // Reset status for redeployment
            updated_at: new Date().toISOString()
          })
          .eq('id', existingAgentDeployment.id)
          .select('*')
          .single();
        
        if (updateError) throw updateError;
        deploymentId = data.id;
        
        // Update deployments list
        setDeployments(prev => prev.map(d => d.id === data.id ? data : d));
      } else {
        // Create new deployment
        operation = 'created';
        const { data, error: insertError } = await supabase
          .from('agent_deployments')
          .insert({
            agent_id: formData.agentId,
            subdomain: formData.subdomain,
            version: formData.version,
            config: { replitUrl: formData.replitUrl },
            status: 'pending'
          })
          .select('*')
          .single();
        
        if (insertError) throw insertError;
        deploymentId = data.id;
        
        // Add to deployments list
        setDeployments(prev => [...prev, data]);
      }
      
      // Trigger deployment process
      // This would call an API endpoint that handles the actual deployment
      // For now, we'll just simulate it with a timeout
      setTimeout(async () => {
        const { error: statusError } = await supabase
          .from('agent_deployments')
          .update({
            status: 'active',
            container_id: `container-${deploymentId.substring(0, 8)}`,
            updated_at: new Date().toISOString()
          })
          .eq('id', deploymentId);
        
        if (statusError) {
          console.error('Error updating deployment status:', statusError);
          return;
        }
        
        // Update local state
        setDeployments(prev => prev.map(d => {
          if (d.id === deploymentId) {
            return {
              ...d,
              status: 'active',
              container_id: `container-${deploymentId.substring(0, 8)}`,
              updated_at: new Date().toISOString()
            };
          }
          return d;
        }));
      }, 3000); // Simulate deployment delay
      
      setSuccess(`Deployment ${operation} successfully! Processing will complete shortly.`);
      
      // Reset form
      setFormData({
        agentId: '',
        subdomain: '',
        version: '1.0.0',
        replitUrl: ''
      });
      
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: unknown) {
      console.error('Error deploying agent:', err);
      setError(`Failed to deploy agent: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleStopDeployment = async (deploymentId: string) => {
    try {
      const { error } = await supabase
        .from('agent_deployments')
        .update({
          status: 'stopped',
          updated_at: new Date().toISOString()
        })
        .eq('id', deploymentId);
      
      if (error) throw error;
      
      // Update local state
      setDeployments(prev => prev.map(d => {
        if (d.id === deploymentId) {
          return {
            ...d,
            status: 'stopped',
            updated_at: new Date().toISOString()
          };
        }
        return d;
      }));
      
      setSuccess('Deployment stopped successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      console.error('Error stopping deployment:', err);
      setError(`Failed to stop deployment: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleRestartDeployment = async (deploymentId: string) => {
    try {
      const { error } = await supabase
        .from('agent_deployments')
        .update({
          status: 'pending',
          updated_at: new Date().toISOString()
        })
        .eq('id', deploymentId);
      
      if (error) throw error;
      
      // Update local state
      setDeployments(prev => prev.map(d => {
        if (d.id === deploymentId) {
          return {
            ...d,
            status: 'pending',
            updated_at: new Date().toISOString()
          };
        }
        return d;
      }));
      
      // Simulate deployment process
      setTimeout(async () => {
        const { error: statusError } = await supabase
          .from('agent_deployments')
          .update({
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', deploymentId);
        
        if (statusError) {
          console.error('Error updating deployment status:', statusError);
          return;
        }
        
        // Update local state
        setDeployments(prev => prev.map(d => {
          if (d.id === deploymentId) {
            return {
              ...d,
              status: 'active',
              updated_at: new Date().toISOString()
            };
          }
          return d;
        }));
      }, 3000); // Simulate deployment delay
      
      setSuccess('Deployment restart initiated!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      console.error('Error restarting deployment:', err);
      setError(`Failed to restart deployment: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const getDeploymentStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            Failed
          </span>
        );
      case 'stopped':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
            Stopped
          </span>
        );
      default:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Agent Deployment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="agentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Agent *
            </label>
            <select
              id="agentId"
              name="agentId"
              value={formData.agentId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">-- Select an agent --</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subdomain *
            </label>
            <div className="flex">
              <input
                type="text"
                id="subdomain"
                name="subdomain"
                value={formData.subdomain}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-r-md">
                .productivity-engines.com
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This will be the URL where users can access the agent.
            </p>
          </div>
          
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Version
            </label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="replitUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Replit URL *
            </label>
            <input
              type="text"
              id="replitUrl"
              name="replitUrl"
              value={formData.replitUrl}
              onChange={handleChange}
              placeholder="https://replit.com/@username/agent-name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              The URL of your agent&apos;s Replit project.
            </p>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Deploy Agent
            </button>
          </div>
        </div>
      </form>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Deployed Agents</h3>
        
        {isLoading ? (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            Loading deployments...
          </div>
        ) : deployments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Version
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {deployments.map(deployment => {
                  const agent = agents.find(a => a.id === deployment.agent_id);
                  
                  return (
                    <tr key={deployment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {agent?.name || 'Unknown Agent'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <a 
                          href={`https://${deployment.subdomain}.productivity-engines.com`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                        >
                          {deployment.subdomain}.productivity-engines.com
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {deployment.version}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getDeploymentStatusBadge(deployment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex space-x-2">
                          {deployment.status === 'active' ? (
                            <button
                              onClick={() => handleStopDeployment(deployment.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Stop
                            </button>
                          ) : deployment.status === 'stopped' ? (
                            <button
                              onClick={() => handleRestartDeployment(deployment.id)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            >
                              Restart
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            No deployments found. Deploy an agent to get started.
          </div>
        )}
      </div>
    </div>
  );
}
