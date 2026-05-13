-- =====================================================
-- CheapLandBuy.com — Supabase Database Schema
-- Run this in your Supabase SQL editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES ────────────────────────────────────────
-- Extends the built-in Supabase auth.users table
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  phone       TEXT,
  bio         TEXT,
  avatar_url  TEXT,
  is_admin    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── LISTINGS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.listings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  acres           NUMERIC(10,2) NOT NULL,
  price           INTEGER NOT NULL,  -- price in dollars
  price_per_acre  INTEGER GENERATED ALWAYS AS (price / NULLIF(acres::INTEGER, 0)) STORED,
  state           TEXT NOT NULL,
  county          TEXT NOT NULL,
  zip_code        TEXT,
  type            TEXT NOT NULL CHECK (type IN (
    'Ranch Land','Hunting Land','Residential Lots','Mountain Property',
    'Wooded Land','Desert Land','Farmland','Commercial','Recreational'
  )),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','rejected','sold')),
  images          TEXT[] DEFAULT '{}',
  features        TEXT[] DEFAULT '{}',
  lat             NUMERIC(10,6),
  lng             NUMERIC(10,6),
  view_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast search
CREATE INDEX IF NOT EXISTS listings_state_idx   ON public.listings(state);
CREATE INDEX IF NOT EXISTS listings_type_idx    ON public.listings(type);
CREATE INDEX IF NOT EXISTS listings_status_idx  ON public.listings(status);
CREATE INDEX IF NOT EXISTS listings_price_idx   ON public.listings(price);
CREATE INDEX IF NOT EXISTS listings_acres_idx   ON public.listings(acres);

-- ── INQUIRIES ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.inquiries (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id   UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  buyer_name   TEXT NOT NULL,
  buyer_email  TEXT NOT NULL,
  buyer_phone  TEXT,
  message      TEXT NOT NULL,
  is_read      BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_listing_idx ON public.inquiries(listing_id);

-- ── ROW LEVEL SECURITY ───────────────────────────────
ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, only update their own
CREATE POLICY "profiles_select_all"   ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own"   ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Listings: anyone can read active listings; sellers manage their own
CREATE POLICY "listings_select_active" ON public.listings FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
CREATE POLICY "listings_insert_own"    ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "listings_update_own"    ON public.listings FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "listings_delete_own"    ON public.listings FOR DELETE USING (auth.uid() = seller_id);

-- Inquiries: anyone can insert; only the listing owner can read
CREATE POLICY "inquiries_insert_all"        ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_select_seller"     ON public.inquiries FOR SELECT
  USING (listing_id IN (SELECT id FROM public.listings WHERE seller_id = auth.uid()));

-- ── STORAGE ──────────────────────────────────────────
-- Create a storage bucket for listing images
-- Run this separately in Supabase Dashboard > Storage > New Bucket
-- Bucket name: listing-images
-- Public: YES
