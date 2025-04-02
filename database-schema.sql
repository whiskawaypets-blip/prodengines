-- Productivity Engines Database Schema
-- Comprehensive schema for user management, agent assignments, token usage tracking, and subscription billing

-- Enable UUID extension for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS AND AUTHENTICATION
-- ========================

-- Users table (managed by Supabase Auth)
-- Note: This is automatically created by Supabase Auth
-- We're extending it with additional fields
CREATE TABLE IF NOT EXISTS auth.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_sign_in TIMESTAMPTZ,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true
);

-- COMPANIES AND TEAMS
-- ==================

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true
);

-- Company members table
CREATE TABLE company_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('invited', 'active', 'suspended')),
  UNIQUE(company_id, user_id)
);

-- AGENTS AND CONFIGURATIONS
-- ========================

-- Agent configurations table
CREATE TABLE agent_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  ui_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  categories TEXT[] DEFAULT '{}'::text[],
  is_public BOOLEAN DEFAULT false,
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  icon TEXT,
  UNIQUE(name, creator_id)
);

-- User-Agent assignments table
CREATE TABLE user_agent_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agent_configs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  config JSONB DEFAULT '{}'::jsonb,
  CHECK ((user_id IS NOT NULL AND company_id IS NULL) OR (user_id IS NULL AND company_id IS NOT NULL))
);

-- Agent deployments table
CREATE TABLE agent_deployments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agent_configs(id) ON DELETE CASCADE NOT NULL,
  subdomain TEXT NOT NULL,
  version TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deployed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'deploying', 'active', 'failed', 'stopped')),
  container_id TEXT,
  health_status TEXT DEFAULT 'unknown' CHECK (status IN ('unknown', 'healthy', 'unhealthy')),
  last_health_check TIMESTAMPTZ,
  UNIQUE(subdomain)
);

-- TOKEN USAGE AND BILLING
-- ======================

-- Token usage tracking table
CREATE TABLE token_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agent_configs(id) ON DELETE SET NULL,
  deployment_id UUID REFERENCES agent_deployments(id) ON DELETE SET NULL,
  model TEXT NOT NULL,
  prompt_tokens INTEGER NOT NULL DEFAULT 0,
  completion_tokens INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  cost_usd DECIMAL(10, 6) NOT NULL DEFAULT 0,
  duration_seconds DECIMAL(10, 3),
  request_id TEXT,
  session_id TEXT,
  CHECK ((user_id IS NOT NULL AND company_id IS NULL) OR (user_id IS NULL AND company_id IS NOT NULL))
);

-- SUBSCRIPTION AND PAYMENT
-- =======================

-- Subscription plans table
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10, 2) NOT NULL,
  price_yearly DECIMAL(10, 2) NOT NULL,
  token_limit INTEGER,
  features JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly TEXT,
  stripe_product_id TEXT,
  max_agents INTEGER DEFAULT 1,
  max_users INTEGER DEFAULT 1,
  UNIQUE(name)
);

-- User subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id) ON DELETE RESTRICT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  tokens_used INTEGER DEFAULT 0,
  tokens_remaining INTEGER,
  CHECK ((user_id IS NOT NULL AND company_id IS NULL) OR (user_id IS NULL AND company_id IS NOT NULL))
);

-- Payment history table
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'succeeded' CHECK (status IN ('succeeded', 'failed', 'pending', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now(),
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT,
  description TEXT,
  receipt_url TEXT,
  CHECK ((user_id IS NOT NULL AND company_id IS NULL) OR (user_id IS NULL AND company_id IS NOT NULL))
);

-- Token top-ups table
CREATE TABLE token_topups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  tokens_added INTEGER NOT NULL,
  amount_paid DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  payment_id UUID REFERENCES payment_history(id) ON DELETE SET NULL,
  CHECK ((user_id IS NOT NULL AND company_id IS NULL) OR (user_id IS NULL AND company_id IS NOT NULL))
);

-- SYSTEM SETTINGS AND LOGS
-- =======================

-- System settings table
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- VIEWS
-- =====

-- User token usage summary view
CREATE OR REPLACE VIEW user_token_usage_summary AS
SELECT 
  user_id,
  DATE_TRUNC('day', created_at) AS usage_date,
  SUM(total_tokens) AS total_tokens,
  SUM(cost_usd) AS total_cost
FROM token_usage
WHERE user_id IS NOT NULL
GROUP BY user_id, DATE_TRUNC('day', created_at);

-- Company token usage summary view
CREATE OR REPLACE VIEW company_token_usage_summary AS
SELECT 
  company_id,
  DATE_TRUNC('day', created_at) AS usage_date,
  SUM(total_tokens) AS total_tokens,
  SUM(cost_usd) AS total_cost
FROM token_usage
WHERE company_id IS NOT NULL
GROUP BY company_id, DATE_TRUNC('day', created_at);

-- Agent usage summary view
CREATE OR REPLACE VIEW agent_usage_summary AS
SELECT 
  agent_id,
  DATE_TRUNC('day', created_at) AS usage_date,
  COUNT(DISTINCT COALESCE(user_id, company_id)) AS unique_users,
  SUM(total_tokens) AS total_tokens,
  SUM(cost_usd) AS total_cost
FROM token_usage
GROUP BY agent_id, DATE_TRUNC('day', created_at);

-- FUNCTIONS AND TRIGGERS
-- =====================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamps on all tables with updated_at
CREATE OR REPLACE FUNCTION create_updated_at_trigger()
RETURNS event_trigger AS $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT quote_ident(relname)
    FROM pg_class
    WHERE relkind = 'r' AND pg_table_is_visible(oid)
    AND EXISTS (
      SELECT 1 FROM pg_attribute 
      WHERE attrelid = pg_class.oid AND attname = 'updated_at'
    )
  LOOP
    EXECUTE format('CREATE TRIGGER update_timestamp
                  BEFORE UPDATE ON %s
                  FOR EACH ROW
                  EXECUTE FUNCTION update_timestamp()', table_name);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate token cost
CREATE OR REPLACE FUNCTION calculate_token_cost()
RETURNS TRIGGER AS $$
BEGIN
  -- Set default costs per 1K tokens based on model
  IF NEW.model LIKE 'gpt-4%' THEN
    -- GPT-4 pricing
    NEW.cost_usd := (NEW.prompt_tokens * 0.01 + NEW.completion_tokens * 0.03) / 1000;
  ELSIF NEW.model LIKE 'gpt-3.5%' THEN
    -- GPT-3.5 pricing
    NEW.cost_usd := (NEW.prompt_tokens * 0.0015 + NEW.completion_tokens * 0.002) / 1000;
  ELSIF NEW.model LIKE 'claude%' THEN
    -- Claude pricing (approximate)
    NEW.cost_usd := (NEW.prompt_tokens * 0.008 + NEW.completion_tokens * 0.024) / 1000;
  ELSE
    -- Default pricing
    NEW.cost_usd := (NEW.prompt_tokens * 0.005 + NEW.completion_tokens * 0.015) / 1000;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for token cost calculation
CREATE TRIGGER calculate_token_cost_trigger
BEFORE INSERT ON token_usage
FOR EACH ROW
EXECUTE FUNCTION calculate_token_cost();

-- Function to update subscription token usage
CREATE OR REPLACE FUNCTION update_subscription_token_usage()
RETURNS TRIGGER AS $$
DECLARE
  sub_id UUID;
BEGIN
  -- Find the active subscription for this user/company
  IF NEW.user_id IS NOT NULL THEN
    SELECT id INTO sub_id FROM subscriptions 
    WHERE user_id = NEW.user_id AND status = 'active' 
    ORDER BY current_period_end DESC LIMIT 1;
  ELSE
    SELECT id INTO sub_id FROM subscriptions 
    WHERE company_id = NEW.company_id AND status = 'active' 
    ORDER BY current_period_end DESC LIMIT 1;
  END IF;
  
  -- Update the subscription token usage if found
  IF sub_id IS NOT NULL THEN
    UPDATE subscriptions 
    SET tokens_used = tokens_used + NEW.total_tokens,
        tokens_remaining = GREATEST(0, tokens_remaining - NEW.total_tokens)
    WHERE id = sub_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating subscription token usage
CREATE TRIGGER update_subscription_token_usage_trigger
AFTER INSERT ON token_usage
FOR EACH ROW
EXECUTE FUNCTION update_subscription_token_usage();

-- INDEXES
-- =======

-- Indexes for token_usage table (high volume)
CREATE INDEX idx_token_usage_user_id ON token_usage(user_id);
CREATE INDEX idx_token_usage_company_id ON token_usage(company_id);
CREATE INDEX idx_token_usage_agent_id ON token_usage(agent_id);
CREATE INDEX idx_token_usage_created_at ON token_usage(created_at);

-- Indexes for subscriptions
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_company_id ON subscriptions(company_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Indexes for user_agent_assignments
CREATE INDEX idx_user_agent_assignments_user_id ON user_agent_assignments(user_id);
CREATE INDEX idx_user_agent_assignments_company_id ON user_agent_assignments(company_id);
CREATE INDEX idx_user_agent_assignments_agent_id ON user_agent_assignments(agent_id);

-- SECURITY POLICIES (ROW LEVEL SECURITY)
-- ====================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_agent_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_topups ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Example policies (these would need to be customized based on your exact requirements)

-- Companies: Users can see companies they are members of, admins can see all
CREATE POLICY company_select_policy ON companies
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM company_members WHERE company_id = id) OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Agent configs: Users can see public agents or ones they created
CREATE POLICY agent_configs_select_policy ON agent_configs
  FOR SELECT USING (
    is_public = true OR
    creator_id = auth.uid() OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Token usage: Users can only see their own usage
CREATE POLICY token_usage_select_policy ON token_usage
  FOR SELECT USING (
    user_id = auth.uid() OR
    auth.uid() IN (SELECT user_id FROM company_members WHERE company_id = token_usage.company_id AND role IN ('owner', 'admin')) OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- INITIAL DATA
-- ===========

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, token_limit, max_agents, max_users, features)
VALUES
  ('Free', 'Basic access with limited features', 0, 0, 100000, 1, 1, '{"features": ["1 Agent", "100K tokens/month", "Basic support"]}'::jsonb),
  ('Starter', 'Perfect for individuals and small teams', 29.99, 299.99, 500000, 3, 5, '{"features": ["3 Agents", "500K tokens/month", "Email support", "Basic analytics"]}'::jsonb),
  ('Professional', 'For growing businesses', 99.99, 999.99, 2000000, 10, 20, '{"features": ["10 Agents", "2M tokens/month", "Priority support", "Advanced analytics", "Custom branding"]}'::jsonb),
  ('Enterprise', 'For large organizations', 499.99, 4999.99, 10000000, 50, 100, '{"features": ["Unlimited Agents", "10M tokens/month", "24/7 support", "Enterprise analytics", "Custom integrations", "Dedicated account manager"]}'::jsonb);

-- Insert system settings
INSERT INTO system_settings (key, value, description)
VALUES
  ('token_pricing', '{"gpt-4": {"prompt": 0.01, "completion": 0.03}, "gpt-3.5-turbo": {"prompt": 0.0015, "completion": 0.002}}'::jsonb, 'Token pricing per 1K tokens by model'),
  ('stripe_config', '{"public_key": "pk_test_your_key", "webhook_secret": "whsec_your_secret"}'::jsonb, 'Stripe configuration'),
  ('company_features', '{"max_members_free": 3, "max_members_starter": 10, "max_members_professional": 50}'::jsonb, 'Company features by plan');
