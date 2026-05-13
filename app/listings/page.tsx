import { Suspense } from 'react';
import Link from 'next/link';
import ListingCard from '../../components/ListingCard';
import { createServerSupabaseClient } from '../../lib/supabase-server';
import { mockListings } from '../../lib/mock-listings';
import { US_STATES, LAND_TYPES, PRICE_RANGES, ACREAGE_OPTIONS } from '../../types';
import { SlidersHorizontal, MapPin } from 'lucide-react';

interface Props {
  searchParams: { q?: string; state?: string; type?: string; price?: string; acres?: string; page?: string };
}

async function getListings(sp: Props['searchParams']) {
  try {
    const supabase = createServerSupabaseClient();
    let query = supabase.from('listings').select('*', { count: 'exact' }).eq('status', 'active');
    if (sp.state) query = query.eq('state', sp.state);
    if (sp.type)  query = query.eq('type', sp.type);
    if (sp.q)     query = query.or(`title.ilike.%${sp.q}%,description.ilike.%${sp.q}%,county.ilike.%${sp.q}%,state.ilike.%${sp.q}%`);
    if (sp.price) {
      const [min, max] = sp.price.split('-').map(Number);
      if (min) query = query.gte('price', min);
      if (max) query = query.lte('price', max);
    }
    if (sp.acres) {
      const [min, max] = sp.acres.split('-').map(Number);
      if (min) query = query.gte('acres', min);
      if (max) query = query.lte('acres', max);
    }
    const page = parseInt(sp.page ?? '1');
    const per  = 24;
    query = query.order('created_at', { ascending: false }).range((page - 1) * per, page * per - 1);
    const { data, count } = await query;
    if (data && data.length > 0) return { listings: data, total: count ?? 0 };
  } catch {}
  // fallback to mock data with basic filter
  let filtered = [...mockListings];
  if (sp.state) filtered = filtered.filter(l => l.state === sp.state);
  if (sp.type)  filtered = filtered.filter(l => l.type === sp.type);
  if (sp.q)     filtered = filtered.filter(l =>
    l.title.toLowerCase().includes(sp.q!.toLowerCase()) ||
    l.state.toLowerCase().includes(sp.q!.toLowerCase()));
  return { listings: filtered, total: filtered.length };
}

export default async function ListingsPage({ searchParams }: Props) {
  const { listings, total } = await getListings(searchParams);
  const page = parseInt(searchParams.page ?? '1');
  const per  = 24;
  const totalPages = Math.ceil(total / per);

  const activeFilters = [
    searchParams.state && { key: 'state', label: searchParams.state },
    searchParams.type  && { key: 'type',  label: searchParams.type },
    searchParams.price && { key: 'price', label: `Price: ${searchParams.price}` },
    searchParams.acres && { key: 'acres', label: `Acres: ${searchParams.acres}` },
    searchParams.q     && { key: 'q',     label: `"${searchParams.q}"` },
  ].filter(Boolean) as { key: string; label: string }[];

  function removeFilter(key: string) {
    const p = { ...searchParams };
    delete (p as any)[key];
    return '/listings?' + new URLSearchParams(p as any).toString();
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Page Header */}
      <div className="bg-brand-700 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white font-extrabold text-2xl mb-1">
            {searchParams.state ? `Land for Sale in ${searchParams.state}` :
             searchParams.type  ? `${searchParams.type} for Sale` :
             searchParams.q     ? `Results for "${searchParams.q}"` :
             'Browse Land for Sale'}
          </h1>
          <p className="text-white/60 text-sm">
            {total.toLocaleString()} propert{total === 1 ? 'y' : 'ies'} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-7">

          {/* ── SIDEBAR FILTERS ── */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="card sticky top-4">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal size={16} className="text-brand-500" />
                <h2 className="font-bold text-brand-900 text-sm">Filter Results</h2>
              </div>

              <form method="GET" action="/listings" className="space-y-5">
                {/* Keep existing search q */}
                {searchParams.q && <input type="hidden" name="q" value={searchParams.q} />}

                <div>
                  <label className="label text-xs">State</label>
                  <select name="state" defaultValue={searchParams.state ?? ''} className="input text-sm">
                    <option value="">All States</option>
                    {US_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label text-xs">Land Type</label>
                  <select name="type" defaultValue={searchParams.type ?? ''} className="input text-sm">
                    <option value="">All Types</option>
                    {LAND_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label text-xs">Price Range</label>
                  <select name="price" defaultValue={searchParams.price ?? ''} className="input text-sm">
                    <option value="">Any Price</option>
                    {PRICE_RANGES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label text-xs">Acreage</label>
                  <select name="acres" defaultValue={searchParams.acres ?? ''} className="input text-sm">
                    <option value="">Any Size</option>
                    {ACREAGE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full text-sm py-2.5">Apply Filters</button>
                <Link href="/listings" className="block text-center text-brand-400 hover:text-brand-600 text-xs">Clear all filters</Link>
              </form>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">
            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeFilters.map(f => (
                  <Link key={f.key} href={removeFilter(f.key)}
                    className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-700 border border-brand-200 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                    {f.label} ✕
                  </Link>
                ))}
              </div>
            )}

            {/* Sort bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-brand-500">
                Showing <strong>{listings.length}</strong> of <strong>{total}</strong>
              </p>
            </div>

            {/* Grid */}
            {listings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {listings.map((l: any) => <ListingCard key={l.id} listing={l} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    {page > 1 && (
                      <Link href={`/listings?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                        className="btn-secondary text-sm px-4 py-2">← Prev</Link>
                    )}
                    <span className="text-sm text-brand-500 px-4">Page {page} of {totalPages}</span>
                    {page < totalPages && (
                      <Link href={`/listings?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                        className="btn-secondary text-sm px-4 py-2">Next →</Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-brand-100">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="font-bold text-brand-800 text-xl mb-2">No listings found</h3>
                <p className="text-brand-400 text-sm mb-6">Try adjusting your filters or search terms</p>
                <Link href="/listings" className="btn-primary text-sm">Clear Filters</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
