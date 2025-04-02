import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AgentRequest } from '@/types/agent';

export async function POST(request: Request) {
  try {
    // Verify authentication
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      return NextResponse.json(
        { error: 'You must be logged in to use this API' },
        { status: 401 }
      );
    }

    // Parse request body
    const requestData: AgentRequest = await request.json();
    
    // Validate required fields
    if (!requestData.business_name || !requestData.website_url) {
      return NextResponse.json(
        { error: 'Business name and website URL are required' },
        { status: 400 }
      );
    }

    // Make API call to our agent
    const agentResponse = await fetch(
      `${process.env.AGENT_API_URL || 'http://localhost:8000'}/run_agent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AGENT_API_KEY || ''}`,
        },
        body: JSON.stringify({
          business_name: requestData.business_name,
          website_url: requestData.website_url,
          model: requestData.model || 'gpt-3.5-turbo',
          temperature: requestData.temperature || 0.7,
          previous_response: requestData.previous_response || '',
        }),
      }
    );

    if (!agentResponse.ok) {
      const errorData = await agentResponse.json().catch(() => ({}));
      throw new Error(errorData.detail || `Agent API error: ${agentResponse.statusText}`);
    }

    const agentData = await agentResponse.json();
    
    // Log the result to Supabase
    await supabase.from('agent_results').insert({
      user_id: session.session.user.id,
      agent_id: 'marketing-research', // This should be an actual ID from the agent_configs table
      input: {
        business_name: requestData.business_name,
        website_url: requestData.website_url,
      },
      output: {
        analysis: agentData.analysis,
        search_query: agentData.search_query,
      },
      status: 'completed',
      execution_time: 0, // Would be calculated from start/end time in a real implementation
    }).catch(err => {
      // Log error but don't fail the request
      console.error('Error saving result to Supabase:', err);
    });

    return NextResponse.json(agentData);
  } catch (error: any) {
    console.error('Error processing agent request:', error);
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 