-- Migration: Create Custom Agents Tables
-- Run this in your Supabase SQL Editor

-- 1. Table for Agents created by Admin
CREATE TABLE custom_agents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  system_prompt TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  icon TEXT DEFAULT 'bot',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table for tracking which users bought which agents
CREATE TABLE user_agent_access (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES custom_agents(id) ON DELETE CASCADE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, agent_id)
);

-- 3. Table for chat history
CREATE TABLE ai_chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES custom_agents(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security Policies (RLS)
ALTER TABLE custom_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_agent_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chats ENABLE ROW LEVEL SECURITY;

-- Agents: Admins can do everything
CREATE POLICY "Admins manage agents" ON custom_agents
  FOR ALL USING (public.is_admin());

-- Agents: Users can VIEW active agents (to buy them)
CREATE POLICY "Users can view active agents" ON custom_agents
  FOR SELECT USING (is_active = true);

-- Access: Users can view their own accesses
CREATE POLICY "Users view own accesses" ON user_agent_access
  FOR SELECT USING (user_id = auth.uid());

-- Access: Admins can manage accesses
CREATE POLICY "Admins manage accesses" ON user_agent_access
  FOR ALL USING (public.is_admin());

-- Chats: Users can read/insert their own chats
CREATE POLICY "Users manage own chats" ON ai_chats
  FOR ALL USING (user_id = auth.uid());

-- Triggers for updated_at
CREATE TRIGGER update_custom_agents_updated_at
  BEFORE UPDATE ON custom_agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
