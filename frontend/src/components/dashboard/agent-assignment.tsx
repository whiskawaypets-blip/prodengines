'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { useAuth } from '@/lib/auth-context';

type AgentConfig = Database['public']['Tables']['agent_configs']['Row'];
type UserAgentAssignment = Database['public']['Tables']['user_agent_assignments']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];

type User = {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
};

interface FormData {
  agentId: string;
  assignType: 'user' | 'company';
  userId: string;
  companyId: string;
}

export function AgentAssignment() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [assignments, setAssignments] = useState<UserAgentAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    agentId: '',
    assignType: 'user',
    userId: '',
    companyId: ''
  });
  
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('agent_configs')
        .select('*');
      
      if (agentsError) throw agentsError;
      
      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*');
      
      if (usersError) throw usersError;
      
      // Fetch companies
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*');
      
      if (companiesError) throw companiesError;
      
      // Fetch assignments
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('user_agent_assignments')
        .select('*');
      
      if (assignmentsError) throw assignmentsError;
      
      setAgents(agentsData || []);
      setUsers(usersData || []);
      setCompanies(companiesData || []);
      setAssignments(assignmentsData || []);
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAssignTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      assignType: e.target.value as 'user' | 'company',
      // Reset the other ID when changing assignment type
      userId: e.target.value === 'user' ? prev.userId : '',
      companyId: e.target.value === 'company' ? prev.companyId : ''
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.agentId) {
      setError('Please select an agent');
      return;
    }
    
    if (formData.assignType === 'user' && !formData.userId) {
      setError('Please select a user');
      return;
    }
    
    if (formData.assignType === 'company' && !formData.companyId) {
      setError('Please select a company');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if assignment already exists
      const { data: existingAssignment, error: checkError } = await supabase
        .from('user_agent_assignments')
        .select('*')
        .eq('agent_id', formData.agentId)
        .eq(formData.assignType === 'user' ? 'user_id' : 'company_id', 
            formData.assignType === 'user' ? formData.userId : formData.companyId);
      
      if (checkError) throw checkError;
      
      if (existingAssignment && existingAssignment.length > 0) {
        setError('This agent is already assigned to this user/company');
        return;
      }
      
      // Create assignment
      const { error: insertError } = await supabase
        .from('user_agent_assignments')
        .insert({
          agent_id: formData.agentId,
          user_id: formData.assignType === 'user' ? formData.userId : user?.id || '',
          company_id: formData.assignType === 'company' ? formData.companyId : null,
          assigned_by: user?.id || '',
          status: 'active'
        });
      
      if (insertError) throw insertError;
      
      // Reset form and show success message
      setFormData({
        agentId: '',
        assignType: 'user',
        userId: '',
        companyId: ''
      });
      
      setSuccessMessage('Agent assigned successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Refresh assignments
      fetchData();
    } catch (err: unknown) {
      console.error('Error assigning agent:', err);
      setError(`Failed to assign agent: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('user_agent_assignments')
        .delete()
        .eq('id', assignmentId);
      
      if (error) throw error;
      
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
      setSuccessMessage('Assignment removed successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: unknown) {
      console.error('Error removing assignment:', err);
      setError(`Failed to remove assignment: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Agent Assignment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
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
              onChange={handleInputChange}
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assign To *
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="assignUser"
                  name="assignType"
                  value="user"
                  checked={formData.assignType === 'user'}
                  onChange={handleAssignTypeChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                />
                <label htmlFor="assignUser" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="assignCompany"
                  name="assignType"
                  value="company"
                  checked={formData.assignType === 'company'}
                  onChange={handleAssignTypeChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                />
                <label htmlFor="assignCompany" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Company
                </label>
              </div>
            </div>
          </div>
          
          {formData.assignType === 'user' && (
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select User *
              </label>
              <select
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                required={formData.assignType === 'user'}
              >
                <option value="">-- Select a user --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {formData.assignType === 'company' && (
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Company *
              </label>
              <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                required={formData.assignType === 'company'}
              >
                <option value="">-- Select a company --</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Agent
            </button>
          </div>
        </div>
      </form>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Assignments</h3>
        
        {isLoading ? (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            Loading assignments...
          </div>
        ) : assignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned To
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
                {assignments.map(assignment => {
                  const agent = agents.find(a => a.id === assignment.agent_id);
                  const assignedUser = users.find(u => u.id === assignment.user_id);
                  const assignedCompany = companies.find(c => c.id === assignment.company_id);
                  
                  return (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {agent?.name || 'Unknown Agent'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {assignment.company_id 
                          ? `Company: ${assignedCompany?.name || 'Unknown Company'}` 
                          : `User: ${assignedUser?.email || 'Unknown User'}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${assignment.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => handleRemoveAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            No assignments found. Assign an agent to get started.
          </div>
        )}
      </div>
    </div>
  );
}
