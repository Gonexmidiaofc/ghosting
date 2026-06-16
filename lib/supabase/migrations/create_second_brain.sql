-- Migration: Create Second Brain Tables
-- Run this in your Supabase SQL Editor

CREATE TABLE brain_nodes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  group_type TEXT DEFAULT 'Ideia',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE brain_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source UUID REFERENCES brain_nodes(id) ON DELETE CASCADE,
  target UUID REFERENCES brain_nodes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source, target)
);

-- Security Policies (RLS)
ALTER TABLE brain_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE brain_links ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins manage brain nodes" ON brain_nodes
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admins manage brain links" ON brain_links
  FOR ALL USING (public.is_admin());

-- Users cannot see or access the admin's second brain
CREATE POLICY "Deny users access to brain nodes" ON brain_nodes
  FOR ALL USING (false);

CREATE POLICY "Deny users access to brain links" ON brain_links
  FOR ALL USING (false);

-- Triggers for updated_at
CREATE TRIGGER update_brain_nodes_updated_at
  BEFORE UPDATE ON brain_nodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
