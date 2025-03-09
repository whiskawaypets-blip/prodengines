'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

export default function SalesAgentPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    prospect_name: '',
    company: '',
    industry: '',
    pain_points: '',
    previous_interactions: '',
    goal: 'introduction' // Default value
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Validate required fields
      if (!formData.prospect_name || !formData.company || !formData.goal) {
        throw new Error('Please fill in all required fields');
      }
      
      // Find the agent ID
      const { data: agentData, error: agentError } = await supabase
        .from('agent_configs')
        .select('id')
        .eq('type', 'sales-agent')
        .single();
      
      if (agentError) {
        throw new Error('Sales agent configuration not found');
      }
      
      // Simulating agent processing
      // In a real implementation, you would call your backend API
      const mockResponse = await new Promise<string>((resolve) => {
        setTimeout(() => {
          const templates: Record<string, string> = {
            introduction: `
Hi ${formData.prospect_name},

I hope this message finds you well. My name is [Your Name] from Productivity Engines, and I noticed the great work ${formData.company} has been doing in the ${formData.industry} industry.

${formData.pain_points ? `It seems that you're currently facing challenges with ${formData.pain_points}. Many companies in your industry struggle with similar issues, and we've developed solutions specifically to address these pain points.` : ''}

I'd love to schedule a quick 15-minute call to discuss how our automation solutions have helped similar companies improve operational efficiency while reducing costs.

Would you be available for a brief conversation this week?

Best regards,
[Your Name]
Productivity Engines
            `,
            
            followup: `
Hi ${formData.prospect_name},

I wanted to follow up on my previous message${formData.previous_interactions ? ` and our conversation about ${formData.previous_interactions}` : ''}.

I've been thinking about the challenges you mentioned regarding ${formData.pain_points || 'operational efficiency'}, and I believe our ${formData.industry}-specific solutions could provide significant value to ${formData.company}.

I've attached a brief case study of how we helped a similar organization achieve a 45% improvement in productivity and 30% cost reduction through our automation platform.

I'm available this week for a quick demo if you're interested in seeing how this would work for your specific needs. Would you have 20 minutes to spare?

Looking forward to your response,
[Your Name]
Productivity Engines
            `,
            
            meeting: `
Hi ${formData.prospect_name},

I'd like to suggest a meeting to discuss how Productivity Engines can help ${formData.company} address the challenges with ${formData.pain_points || 'operational efficiency'} that we've discussed${formData.previous_interactions ? ` during ${formData.previous_interactions}` : ''}.

Here's what I propose we cover:
1. Your current workflow and specific pain points
2. Our approach to automation in the ${formData.industry} industry
3. Implementation timeline and expected ROI
4. Next steps and pricing options

Would any of these times work for you?
- Tuesday, 2:00 PM - 2:30 PM ET
- Wednesday, 10:00 AM - 10:30 AM ET
- Thursday, 4:00 PM - 4:30 PM ET

Feel free to suggest alternative times that work better for your schedule.

Best regards,
[Your Name]
Productivity Engines
            `
          };
          
          resolve(templates[formData.goal] || templates.introduction);
        }, 2000);
      });
      
      // Save the result to the database
      await supabase.from('agent_results').insert({
        user_id: user.id,
        agent_id: agentData.id,
        input: formData,
        output: { message: mockResponse },
        status: 'completed'
      });
      
      setResult(mockResponse);
    } catch (err) {
      console.error('Error processing sales agent request:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sales Enablement Assistant
            </h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"
            >
              Back to Dashboard
            </button>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Craft personalized sales emails and follow-ups for your prospects
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div>
                <label htmlFor="prospect_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prospect Name *
                </label>
                <input
                  type="text"
                  id="prospect_name"
                  name="prospect_name"
                  value={formData.prospect_name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Technology, Healthcare, Manufacturing, etc."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="pain_points" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pain Points / Challenges
                </label>
                <textarea
                  id="pain_points"
                  name="pain_points"
                  value={formData.pain_points}
                  onChange={handleChange}
                  placeholder="What challenges is this prospect facing that your solution can solve?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="previous_interactions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Previous Interactions
                </label>
                <textarea
                  id="previous_interactions"
                  name="previous_interactions"
                  value={formData.previous_interactions}
                  onChange={handleChange}
                  placeholder="Describe any previous emails, calls, or meetings you've had with this prospect"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Purpose *
                </label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="introduction">Initial Outreach</option>
                  <option value="followup">Follow-up Email</option>
                  <option value="meeting">Meeting Request</option>
                </select>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Generating Email...' : 'Generate Email'}
                </button>
              </div>
            </form>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Generated Email</h2>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 focus:outline-none"
                  >
                    Copy to Clipboard
                  </button>
                )}
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <svg 
                    className="animate-spin h-10 w-10 text-amber-500" 
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
                </div>
              ) : result ? (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                  <svg 
                    className="h-12 w-12 mb-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                  <p>Fill out the form to generate a sales email</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}