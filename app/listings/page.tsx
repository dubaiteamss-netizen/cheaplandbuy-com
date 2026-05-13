import { Suspense } from 'react';
import SearchBar from '../../components/SearchBar';
import ListingCard from '../../components/ListingCard';
import { mockListings } from '../../lib/mock-listings';
import { LAND_TYPES, US_STATES } from '../../types';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
  searchParams: { state?: string; type?: string; maxPrice?: string; minAcres?: string; q?: string };
}

export default function ListingsPage({ searchParams }: Props) {
  // Filter listings based on search params
  let results = [...mockListings];

  if (searchParams.state) {
    results = results.filter(l => l.state.toLowerCase() === searchParams.state!.toLowerCase());
  }
  if (searchParams.type) {
    results = results.filter(l => l.type.toLowerCase() === searchParams.type!.toLowerCase());
  }
  if (searchParams.maxPrice) {
    const max = parseInt(searchParams.maxPrice);
    if (!isNaN(max)) results = results.filter(l => l.price <= max);
  }
  if (searchParams.minAcres) {
    const min = parseFloat(searchParams.minAcres);
    if (!isNaN(min)) results = results.filter(l => l.acres >= min);
  }
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase();
    results = results.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.type.toLowerCase().includes(q) ||
      l.state.toLowerCase().includes(q)
    );
  }

  const activeState = searchParams.state ?? '';
  const activeType  = searchParams.type  ?? '';

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Search header */}
      <div className="bg-brand-700 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white font-extrabold text-2xl mb-4">
            {activeState && activeType ? `${activeType} in ${activeState}` :
             activeState ? `Land for Sale in ${activeState}` :
             activeType  ? `${activeType} for Sale`              :
             'All Land Listings'}
          </h1>
          <Suspense>
            <SearchBar compact />
          </Suspense>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6">

        {/* Sidebar filters */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="card sticky top-20">
            <h3 className="font-bold text-brand-800 mb-4 flex items-center gap-2 text-sm">
              <SlidersHorizontal size={14} /> Filters
            </h3>

            {/* By State */}
            <div className="mb-5">
              <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">State</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                <Link href={`/listings?${new URLSearchParams({ ...searchParams, state: '' }).toString()}`}
                  className={`block text-sm px-2 py-1 rounded transition-colors ${!activeState ? 'bg-brand-700 text-white font-semibold' : 'text-brand-600 hover:bg-brand-50'}`}>
                  All States
                </Link>
                {US_STATES.slice(0, 15).map(s => (
                  <Link key={s} href={`/listings?state=${s}`}
                    className={`block text-sm px-2 py-1 rounded transition-colors ${activeState === s ? 'bg-brand-700 text-white font-semibold' : 'text-brand-600 hover:bg-brand-50'}`}>
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* By Type */}
            <div>
              <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Land Type</p>
              <div className="space-y-1">
                <Link href={`/listings?${activeState ? `state=${activeState}` : ''}`}
                  className={`block text-sm px-2 py-1 rounded transition-colors ${!activeType ? 'bg-brand-700 text-white font-semibold' : 'text-brand-600 hover:bg-brand-50'}`}>
                  All Types
                </Link>
                {LAND_TYPES.map(t => (
                  <Link key={t} href={`/listings?type=${encodeURIComponent(t)}${activeState ? `&state=${activeState}` : ''}`}
                    className={`block text-sm px-2 py-1 rounded transition-colors ${activeType === t ? 'bg-brand-700 text-white font-semibold' : 'text-brand-600 hover:bg-brand-50'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-brand-500 text-sm">
              <span className="font-bold text-brand-800">{results.length}</span> listings found
            </p>
            <select className="border border-brand-200 rounded-lg px-3 py-1.5 text-sm text-brand-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Acres</option>
            </select>
          </div>

          {results.length === 0 ? (
            <div className="card text-center py-16">
              <p className="text-5xl mb-4">🌾</p>
              <h3 className="text-xl font-bold text-brand-800 mb-2">No listings found</h3>
              <p className="text-brand-400 mb-6">Try adjusting your filters or browsing all listings.</p>
              <Link href="/listings" className="btn-primary">Browse All Listings</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
