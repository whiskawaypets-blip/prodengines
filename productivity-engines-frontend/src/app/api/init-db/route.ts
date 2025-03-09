import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Initialize Supabase client with admin privileges for database setup
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
    // Create user_roles table if it doesn't exist
    const { error: userRolesError } = await supabaseAdmin.rpc('create_user_roles_table_if_not_exists');
    if (userRolesError) throw userRolesError;

    // Create agent_categories table if it doesn't exist
    const { error: categoriesError } = await supabaseAdmin.rpc('create_categories_table_if_not_exists');
    if (categoriesError) throw categoriesError;

    // Create agent_configs table if it doesn't exist
    const { error: configsError } = await supabaseAdmin.rpc('create_agent_configs_table_if_not_exists');
    if (configsError) throw configsError;

    // Create agent_results table if it doesn't exist
    const { error: resultsError } = await supabaseAdmin.rpc('create_agent_results_table_if_not_exists');
    if (resultsError) throw resultsError;

    // Insert default categories
    await seedDefaultData();

    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      adminAccessUrl: '/api/set-admin?email=guymaxphelps@gmail.com'
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: error },
      { status: 500 }
    );
  }
}

async function seedDefaultData() {
  // Insert default categories if they don't exist
  const categories = [
    { name: 'Marketing', description: 'Marketing analysis and content generation' },
    { name: 'Sales', description: 'Sales enablement and outreach' },
    { name: 'HR', description: 'Human resources assistance' },
    { name: 'Admin', description: 'Administrative tasks' },
  ];

  for (const category of categories) {
    const { data: existingCategory } = await supabaseAdmin
      .from('agent_categories')
      .select('*')
      .eq('name', category.name)
      .maybeSingle();

    if (!existingCategory) {
      await supabaseAdmin.from('agent_categories').insert(category);
    }
  }

  // Insert default agents if they don't exist
  const agents = [
    {
      name: 'Marketing Research Agent',
      description: 'Research businesses and generate marketing insights',
      type: 'marketing-agent',
      categories: ['Marketing'],
      is_public: true,
      config: {},
      ui_config: {}
    },
    {
      name: 'Sales Enablement Agent',
      description: 'Generate personalized sales emails and follow-ups',
      type: 'sales-agent',
      categories: ['Sales'],
      is_public: true,
      config: {},
      ui_config: {}
    }
  ];

  for (const agent of agents) {
    const { data: existingAgent } = await supabaseAdmin
      .from('agent_configs')
      .select('*')
      .eq('type', agent.type)
      .maybeSingle();

    if (!existingAgent) {
      await supabaseAdmin.from('agent_configs').insert(agent);
    }
  }
}