-- ================================================================
-- CheapLandBuy.com — Features Migration
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hpdnmpoyqqpavdilgluc/sql
-- ================================================================

-- 1. Add new columns to listings table
ALTER TABLE listings ADD COLUMN IF NOT EXISTS previous_price NUMERIC;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS price_per_acre NUMERIC
  GENERATED ALWAYS AS (
    CASE WHEN COALESCE(acres, 0) > 0 THEN price / acres ELSE 0 END
  ) STORED;

-- 2. saved_listings table (❤️ Favorites)
CREATE TABLE IF NOT EXISTS saved_listings (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id TEXT        NOT NULL,
  saved_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, listing_id)
);

ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own saved listings" ON saved_listings;
CREATE POLICY "Users can manage own saved listings"
  ON saved_listings FOR ALL
  USING (auth.uid() = user_id);

-- 3. listing_views table (📊 Analytics)
CREATE TABLE IF NOT EXISTS listing_views (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id TEXT        NOT NULL,
  user_id    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE listing_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert listing views" ON listing_views;
CREATE POLICY "Anyone can insert listing views"
  ON listing_views FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Sellers can read their listing views" ON listing_views;
CREATE POLICY "Sellers can read their listing views"
  ON listing_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id::text = listing_views.listing_id
        AND listings.seller_id = auth.uid()
    )
  );

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_listing_views_listing_id ON listing_views (listing_id);
CREATE INDEX IF NOT EXISTS idx_saved_listings_user_id   ON saved_listings (user_id);
CREATE INDEX IF NOT EXISTS idx_listings_price_per_acre  ON listings (price_per_acre);
