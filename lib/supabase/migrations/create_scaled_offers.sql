-- Migration: Create Scaled Offers Table
-- Run this in your Supabase SQL Editor

CREATE TYPE offer_category AS ENUM ('BR', 'LATAM', 'INFOPRODUTO', 'BLACK');

CREATE TABLE scaled_offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  copy_text TEXT,
  media_url TEXT,
  ad_library_url TEXT,
  category offer_category NOT NULL,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE scaled_offers ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage scaled offers" ON scaled_offers
  FOR ALL USING (public.is_admin());

-- Members can see free offers
CREATE POLICY "Members can view free offers" ON scaled_offers
  FOR SELECT USING (is_free = true);

-- Elite Members (Subscribers) can see all offers
CREATE POLICY "Elite members can view all offers" ON scaled_offers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND plan = 'dna_elite')
  );

-- Function to update updated_at timestamp
CREATE TRIGGER update_scaled_offers_updated_at
  BEFORE UPDATE ON scaled_offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
