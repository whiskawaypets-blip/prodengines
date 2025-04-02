'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { useAuth } from '@/lib/auth-context';

type AgentCategory = Database['public']['Tables']['agent_categories']['Row'];

interface NewAgentFormData {
  name: string;
  description: string;
  type: string;
  categories: string[];
  is_public: boolean;
  icon?: string;
}

export function AdminPanel() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<NewAgentFormData>({
    name: '',
    description: '',
    type: '',
    categories: [],
    is_public: true,
    icon: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<AgentCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat !== value)
      }));
    }
  };

  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      is_public: e.target.checked
    }));
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    setIsAddingCategory(true);
    
    try {
      const { data, error } = await supabase
        .from('agent_categories')
        .insert({ name: newCategory.trim() })
        .select('*')
        .single();
      
      if (error) {
        setError(`Failed to add category: ${error.message}`);
        return;
      }
      
      setCategories(prev => [...prev, data]);
      setNewCategory('');
      setSuccess('Category added successfully!');
      
      // Auto-select the new category
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, data.name]
      }));
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Failed to add category. Please try again.');
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Basic validation
      if (!formData.name.trim()) {
        setError('Agent name is required');
        setIsSubmitting(false);
        return;
      }
      
      if (!formData.type.trim()) {
        setError('Agent type is required');
        setIsSubmitting(false);
        return;
      }
      
      // Create the agent config
      const { data, error } = await supabase
        .from('agent_configs')
        .insert({
          name: formData.name.trim(),
          description: formData.description.trim(),
          type: formData.type.trim(),
          categories: formData.categories,
          is_public: formData.is_public,
          creator_id: user?.id,
          icon: formData.icon?.trim() || null,
          config: {}, // Default empty config
          ui_config: {} // Default empty UI config
        })
        .select('*')
        .single();
      
      if (error) {
        setError(`Failed to create agent: ${error.message}`);
        return;
      }
      
      setSuccess('Agent created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        type: '',
        categories: [],
        is_public: true,
        icon: ''
      });
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error creating agent:', err);
      setError('Failed to create agent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Admin Panel - Add New Agent</h2>
      
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
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Agent Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Agent Type (URL Path) *
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. marketing-agent"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be used in the URL: /dashboard/{formData.type || 'agent-type'}
            </p>
          </div>
          
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon URL (optional)
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="https://example.com/icon.svg"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Categories
              </label>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={isAddingCategory || !newCategory.trim()}
                  className="px-3 py-1 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingCategory ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.name}
                    checked={formData.categories.includes(category.name)}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_public"
              name="is_public"
              checked={formData.is_public}
              onChange={handlePublicChange}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="is_public" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Make this agent public (visible to all users)
            </label>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Agent...' : 'Create Agent'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}