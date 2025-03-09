-- Function to create agent_categories table if it doesn't exist
CREATE OR REPLACE FUNCTION create_categories_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'agent_categories') THEN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE public.agent_categories (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Set up RLS
    ALTER TABLE public.agent_categories ENABLE ROW LEVEL SECURITY;
    
    -- Allow all authenticated users to read categories
    CREATE POLICY "Allow users to read categories" 
      ON public.agent_categories
      FOR SELECT 
      TO authenticated 
      USING (true);
    
    -- Allow admins to insert, update, delete categories
    CREATE POLICY "Allow admins to manage categories" 
      ON public.agent_categories
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role = 'admin'
        )
      );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create user_roles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_user_roles_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_roles') THEN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE public.user_roles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, role)
    );
    
    -- Set up RLS
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    
    -- Allow users to read their own roles
    CREATE POLICY "Allow users to read their own roles" 
      ON public.user_roles
      FOR SELECT 
      TO authenticated 
      USING (user_id = auth.uid());
    
    -- Allow admins to read all roles
    CREATE POLICY "Allow admins to read all roles" 
      ON public.user_roles
      FOR SELECT 
      TO authenticated 
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role = 'admin'
        )
      );
    
    -- Allow admins to insert, update, delete roles
    CREATE POLICY "Allow admins to manage roles" 
      ON public.user_roles
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role = 'admin'
        )
      );
    
    -- Special case for new users creating their own role
    CREATE POLICY "Allow users to create their own role once" 
      ON public.user_roles
      FOR INSERT 
      TO authenticated 
      WITH CHECK (
        user_id = auth.uid() AND 
        NOT EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid()
        )
      );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create agent_configs table if it doesn't exist
CREATE OR REPLACE FUNCTION create_agent_configs_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'agent_configs') THEN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE public.agent_configs (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL UNIQUE,
      config JSONB NOT NULL DEFAULT '{}',
      ui_config JSONB NOT NULL DEFAULT '{}',
      categories TEXT[] DEFAULT '{}',
      is_public BOOLEAN NOT NULL DEFAULT true,
      creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
      icon TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Set up RLS
    ALTER TABLE public.agent_configs ENABLE ROW LEVEL SECURITY;
    
    -- Allow all authenticated users to read public agents
    CREATE POLICY "Allow users to read public agents" 
      ON public.agent_configs
      FOR SELECT 
      TO authenticated 
      USING (is_public = true);
    
    -- Allow users to read their own private agents
    CREATE POLICY "Allow users to read their own private agents" 
      ON public.agent_configs
      FOR SELECT 
      TO authenticated 
      USING (creator_id = auth.uid());
    
    -- Allow admins to read all agents
    CREATE POLICY "Allow admins to read all agents" 
      ON public.agent_configs
      FOR SELECT 
      TO authenticated 
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role = 'admin'
        )
      );
    
    -- Allow admins to manage all agents
    CREATE POLICY "Allow admins to manage all agents" 
      ON public.agent_configs
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role = 'admin'
        )
      );
    
    -- Allow users to manage their own agents
    CREATE POLICY "Allow users to manage their own agents" 
      ON public.agent_configs
      USING (creator_id = auth.uid());
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create agent_results table if it doesn't exist
CREATE OR REPLACE FUNCTION create_agent_results_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'agent_results') THEN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE public.agent_results (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      agent_id UUID NOT NULL REFERENCES public.agent_configs(id) ON DELETE CASCADE,
      input JSONB NOT NULL DEFAULT '{}',
      output JSONB NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'pending',
      execution_time NUMERIC,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Set up RLS
    ALTER TABLE public.agent_results ENABLE ROW LEVEL SECURITY;
    
    -- Allow users to read their own results
    CREATE POLICY "Allow users to read their own results" 
      ON public.agent_results
      FOR SELECT 
      TO authenticated 
      USING (user_id = auth.uid());
    
    -- Allow admins to read all results
    CREATE POLICY "Allow admins to read all results" 
      ON public.agent_results
      FOR SELECT 
      TO authenticated 
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role = 'admin'
        )
      );
    
    -- Allow users to insert their own results
    CREATE POLICY "Allow users to insert their own results" 
      ON public.agent_results
      FOR INSERT 
      TO authenticated 
      WITH CHECK (user_id = auth.uid());
    
    -- Allow users to update their own results
    CREATE POLICY "Allow users to update their own results" 
      ON public.agent_results
      FOR UPDATE 
      TO authenticated 
      USING (user_id = auth.uid());
  END IF;
END;
$$ LANGUAGE plpgsql;