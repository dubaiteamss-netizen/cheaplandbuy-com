'use client';
import { useEffect } from 'react';
import { createClient } from '../lib/supabase';

const supabase = createClient();

// Fires once on mount to record a listing page view.
// Silently no-ops if the table doesn't exist yet or RLS blocks insert.
export default function ViewTracker({ listingId }: { listingId: string }) {
  useEffect(() => {
    if (!listingId) return;
    supabase
      .from('listing_views')
      .insert({ listing_id: listingId })
      .then(() => {}); // fire and forget
  }, [listingId]);

  return null; // renders nothing
}
