'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ListingCard from '../../components/ListingCard';
import { createClient } from '../../lib/supabase';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';

const supabase = createClient();

function getSavedIds(): string[] {
  try { return JSON.parse(localStorage.getItem('clb_favorites') ?? '[]'); }
  catch { return []; }
}

export default function SavedPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);

  async function load() {
    setLoading(true);
    const ids = getSavedIds();
    if (ids.length === 0) { setListings([]); setLoading(false); return; }
    const { data } = await supabase.from('listings').select('*').in('id', ids);
    setListings(data ?? []);
    setLoading(false);
  }

  function clearAll() {
    localStorage.setItem('clb_favorites', '[]');
    window.dispatchEvent(new Event('clb-favorites-changed'));
    setListings([]);
  }

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener('clb-favorites-changed', handler);
    return () => window.removeEventListener('clb-favorites-changed', handler);
  }, []);

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-brand-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Back to listings
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart size={20} className="text-white fill-white" />
              </div>
              <div>
                <h1 className="text-white font-extrabold text-2xl">Saved Properties</h1>
                <p className="text-white/50 text-sm">{loading ? '...' : `${listings.length} saved`}</p>
              </div>
            </div>
            {listings.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-white/50 hover:text-red-400 text-sm border border-white/20 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 size={13} /> Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-3 animate-pulse">❤️</div>
            <p className="text-brand-400">Loading saved properties...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-brand-100 shadow-sm">
            <p className="text-6xl mb-4">💔</p>
            <h3 className="font-extrabold text-brand-800 text-xl mb-2">No saved properties yet</h3>
            <p className="text-brand-400 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              Click the ❤️ heart icon on any listing card to save it here.
              Your saves are stored on this device.
            </p>
            <Link href="/listings" className="btn-primary">Browse All Land</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {listings.map(l => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
