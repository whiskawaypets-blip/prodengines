import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Initialize Supabase client with direct credentials for server usage
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Service role key not configured' },
      { status: 500 }
    );
  }

  try {
    // Create the agent_categories table if it doesn't exist
    await createCategoriesTable();
    
    // Create user_roles table if it doesn't exist
    await createUserRolesTable();
    
    // Create agent_configs table if it doesn't exist
    await createAgentConfigsTable();
    
    // Create agent_results table if it doesn't exist
    await createAgentResultsTable();
    
    // Seed initial categories
    await seedCategories();
    
    // Seed initial agent configs
    await seedAgentConfigs();

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}

async function createCategoriesTable() {
  const { error } = await supabaseAdmin.rpc('create_categories_table_if_not_exists');
  if (error) throw error;
}

async function createUserRolesTable() {
  const { error } = await supabaseAdmin.rpc('create_user_roles_table_if_not_exists');
  if (error) throw error;
}

async function createAgentConfigsTable() {
  const { error } = await supabaseAdmin.rpc('create_agent_configs_table_if_not_exists');
  if (error) throw error;
}

async function createAgentResultsTable() {
  const { error } = await supabaseAdmin.rpc('create_agent_results_table_if_not_exists');
  if (error) throw error;
}

async function seedCategories() {
  const categories = [
    { name: 'Marketing', description: 'Agents for marketing tasks and analysis' },
    { name: 'Sales', description: 'Sales enablement and customer engagement tools' },
    { name: 'HR', description: 'Human resources and employee management' },
    { name: 'Admin', description: 'Administrative and operational tasks' },
    { name: 'Finance', description: 'Financial analysis and reporting' },
    { name: 'Research', description: 'Research and data analysis tools' }
  ];
  
  // Check if categories already exist
  const { data: existingCategories } = await supabaseAdmin
    .from('agent_categories')
    .select('name');
  
  const existingNames = new Set(existingCategories?.map(cat => cat.name) || []);
  
  // Only insert categories that don't already exist
  const newCategories = categories.filter(cat => !existingNames.has(cat.name));
  
  if (newCategories.length > 0) {
    const { error } = await supabaseAdmin
      .from('agent_categories')
      .insert(newCategories);
      
    if (error) throw error;
  }
}

async function seedAgentConfigs() {
  const marketingAgent = {
    name: 'Marketing Research Agent',
    description: 'Analyzes businesses and websites to provide marketing insights',
    type: 'marketing-agent',
    categories: ['Marketing', 'Research'],
    is_public: true,
    config: {},
    ui_config: {}
  };
  
  const salesAgent = {
    name: 'Sales Enablement Assistant',
    description: 'Helps craft personalized sales outreach and follow-ups',
    type: 'sales-agent',
    categories: ['Sales'],
    is_public: true,
    config: {},
    ui_config: {}
  };
  
  const hrAgent = {
    name: 'HR Policy Assistant',
    description: 'Answers questions about company policies and procedures',
    type: 'hr-agent',
    categories: ['HR', 'Admin'],
    is_public: true,
    config: {},
    ui_config: {}
  };
  
  // Check if agents already exist
  const { data: existingAgents } = await supabaseAdmin
    .from('agent_configs')
    .select('name, type');
  
  const existingTypes = new Set(existingAgents?.map(agent => agent.type) || []);
  
  const agents = [marketingAgent, salesAgent, hrAgent];
  const newAgents = agents.filter(agent => !existingTypes.has(agent.type));
  
  if (newAgents.length > 0) {
    const { error } = await supabaseAdmin
      .from('agent_configs')
      .insert(newAgents);
      
    if (error) throw error;
  }
}