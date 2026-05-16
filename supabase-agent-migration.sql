-- =====================================================
-- CheapLandBuy.com — Agent Profile Migration
-- Run this in Supabase SQL editor (Dashboard > SQL Editor)
-- =====================================================

-- Add agent/owner role to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'owner' CHECK (role IN ('owner', 'agent'));

-- Agent-specific fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name    TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS license_number  TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS license_state   TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_experience INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS specialties     TEXT[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS states_served   TEXT[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website         TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified     BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location_city   TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location_state  TEXT;

-- Index for fast agent lookups
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
CREATE INDEX IF NOT EXISTS profiles_location_state_idx ON public.profiles(location_state);

-- Update handle_new_user trigger to capture role from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'owner')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
