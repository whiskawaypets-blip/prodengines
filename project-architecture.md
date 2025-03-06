# Productivity Engines - Project Architecture (Supabase Version)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                            │
└───────────────────────────────────┬─────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Next.js Frontend (Vercel)                     │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌──────────┐ │
│  │  Landing    │   │   Auth      │   │  Dashboard  │   │  Agent   │ │
│  │   Pages     │   │   Pages     │   │   Pages     │   │  Pages   │ │
│  └─────────────┘   └─────────────┘   └─────────────┘   └──────────┘ │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                │
│  │  Supabase   │   │  Tailwind   │   │   React     │                │
│  │   Client    │   │    CSS      │   │   Hooks     │                │
│  └─────────────┘   └─────────────┘   └─────────────┘                │
└───────────────────────────────────┬─────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Supabase Platform                             │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌──────────┐ │
│  │    Auth     │   │  PostgreSQL │   │   Storage   │   │ Realtime │ │
│  │  (Google    │   │  Database   │   │   (Files)   │   │          │ │
│  │   OAuth)    │   │             │   │             │   │          │ │
│  └─────────────┘   └─────────────┘   └─────────────┘   └──────────┘ │
│                                                                     │
│  ┌─────────────────────────────┐   ┌─────────────────────────────┐  │
│  │     Database Functions      │   │      Row-Level Security     │  │
│  └─────────────────────────────┘   └─────────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Agent Backend API (Render/Heroku)                 │
│                   (Only for complex agent processing)               │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Agent Functions                         │    │
│  │                                                             │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │    │
│  │  │  Marketing  │  │  Private AI │  │  Process Analysis   │  │    │
│  │  │    Agent    │  │    Agent    │  │       Agent        │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      External Services                              │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                │
│  │  Google     │   │   OpenAI    │   │   Tavily    │                │
│  │   OAuth     │   │     API     │   │     API     │                │
│  └─────────────┘   └─────────────┘   └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
```

## Authentication Flow (with Supabase)

```
┌──────────┐       ┌───────────┐      ┌───────────┐
│  User    │       │  Next.js  │      │  Supabase │
│ Browser  │       │  Frontend │      │           │
└────┬─────┘       └─────┬─────┘      └─────┬─────┘
     │                   │                  │
     │  Login Request    │                  │
     │──────────────────>│                  │
     │                   │                  │
     │                   │  Authentication  │
     │                   │  Request         │
     │                   │─────────────────>│
     │                   │                  │
     │                   │                  │
     │                   │  User Session    │
     │                   │<─────────────────│
     │                   │                  │
     │  Set Cookie with  │                  │
     │  Session          │                  │
     │<──────────────────│                  │
     │                   │                  │
     │  Redirect to      │                  │
     │  Dashboard        │                  │
     │<──────────────────│                  │
     │                   │                  │
```

## Agent Execution Flow

```
┌──────────┐       ┌───────────┐      ┌───────────┐     ┌────────────┐
│  User    │       │  Next.js  │      │  Agent    │     │ External   │
│ Browser  │       │  Frontend │      │  API      │     │ APIs       │
└────┬─────┘       └─────┬─────┘      └─────┬─────┘     └──────┬─────┘
     │                   │                  │                  │
     │  Select Agent     │                  │                  │
     │  & Input Data     │                  │                  │
     │──────────────────>│                  │                  │
     │                   │                  │                  │
     │                   │  Execute Agent   │                  │
     │                   │  Request         │                  │
     │                   │─────────────────>│                  │
     │                   │                  │                  │
     │                   │                  │  API Calls       │
     │                   │                  │  (OpenAI/Tavily) │
     │                   │                  │─────────────────>│
     │                   │                  │                  │
     │                   │                  │  API Response    │
     │                   │                  │<─────────────────│
     │                   │                  │                  │
     │                   │  Agent Results   │                  │
     │                   │<─────────────────│                  │
     │                   │                  │                  │
     │                   │  Save Results    │                  │
     │                   │  to Supabase     │                  │
     │                   │─────┐            │                  │
     │                   │     │            │                  │
     │                   │<────┘            │                  │
     │                   │                  │                  │
     │  Display Results  │                  │                  │
     │<──────────────────│                  │                  │
     │                   │                  │                  │
```

## Data Model (Supabase Tables)

### users (managed by Supabase Auth)
```sql
-- This table is managed by Supabase Auth
-- We can extend it with additional columns

ALTER TABLE auth.users ADD COLUMN role TEXT DEFAULT 'user';
ALTER TABLE auth.users ADD COLUMN subscription_plan TEXT DEFAULT 'free';
ALTER TABLE auth.users ADD COLUMN subscription_start_date TIMESTAMP;
ALTER TABLE auth.users ADD COLUMN subscription_end_date TIMESTAMP;
```

### agent_configs
```sql
CREATE TABLE agent_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  config JSONB NOT NULL,
  ui_config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE agent_configs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON agent_configs
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to insert/update" ON agent_configs
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### agent_results
```sql
CREATE TABLE agent_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  agent_id UUID REFERENCES agent_configs(id) NOT NULL,
  input JSONB NOT NULL,
  output JSONB NOT NULL,
  status TEXT NOT NULL,
  execution_time FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- For searching
  CONSTRAINT agent_results_user_id_idx UNIQUE (id, user_id)
);

-- Row Level Security
ALTER TABLE agent_results ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own results" ON agent_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own results" ON agent_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all results" ON agent_results
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
``` 