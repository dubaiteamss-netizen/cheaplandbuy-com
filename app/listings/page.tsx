export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ListingFilters from '../../components/ListingFilters';
import MarketBoard from '../../components/MarketBoard';
import MobileFilterSheet from '../../components/MobileFilterSheet';
import { createServerSupabaseClient, isPublishedListingId, isSupabaseConfigured } from '../../lib/supabase-server';
import { mockListings } from '../../lib/mock-listings';
import { LAND_TYPES, PRICE_RANGES, ACREAGE_OPTIONS, PPA_OPTIONS } from '../../types';

export const metadata: Metadata = {
  title: 'Browse Land for Sale Across America',
  description: 'Search affordable land for sale in all 50 states. Filter by state, type, price, and acreage. Ranch land, hunting land, farmland, waterfront lots & more.',
  alternates: { canonical: 'https://cheaplandbuy.com/listings' },
};

interface Props {
  searchParams: { q?: string; state?: string; type?: string; price?: string; acres?: string; ppa?: string; sort?: string; finance?: string; page?: string };
}

const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'acres', label: 'Largest acreage' },
] as const;

function sortKey(value?: string) {
  return SORTS.some(option => option.value === value) ? value! : 'newest';
}

function applyRange<T>(rows: T[], raw: string | undefined, read: (row: T) => number) {
  if (!raw) return rows;
  const [min, max] = raw.split('-').map(Number);
  return rows.filter(row => {
    const value = read(row);
    if (min && value < min) return false;
    if (max && value > max) return false;
    return true;
  });
}

async function getListings(sp: Props['searchParams']) {
  if (!isSupabaseConfigured()) return filterMockListings(sp);
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
    // Price per acre filter — uses computed price_per_acre column (added in migration)
    if (sp.ppa) {
      const [min, max] = sp.ppa.split('-').map(Number);
      if (min) query = query.gte('price_per_acre', min);
      if (max) query = query.lte('price_per_acre', max);
    }
    if (sp.finance === '1') query = query.eq('owner_financing', true);
    const page = parseInt(sp.page ?? '1');
    const per  = 24;
    const sort = sortKey(sp.sort);
    if (sort === 'price-asc') query = query.order('price', { ascending: true });
    else if (sort === 'price-desc') query = query.order('price', { ascending: false });
    else if (sort === 'acres') query = query.order('acres', { ascending: false });
    else query = query.order('created_at', { ascending: false });
    query = query.range((page - 1) * per, page * per - 1);
    const { data, count } = await query;
    const listings = (data ?? []).filter((row: { id: string }) => isPublishedListingId(String(row.id)));
    return { listings, total: listings.length };
  } catch {
    return { listings: [], total: 0 };
  }
}

function filterMockListings(sp: Props['searchParams']) {
  let filtered = [...mockListings];
  if (sp.state) filtered = filtered.filter(l => l.state === sp.state);
  if (sp.type)  filtered = filtered.filter(l => l.type === sp.type);
  if (sp.q) {
    const needle = sp.q.toLowerCase();
    filtered = filtered.filter(l =>
      l.title.toLowerCase().includes(needle) ||
      l.description.toLowerCase().includes(needle) ||
      l.county.toLowerCase().includes(needle) ||
      l.state.toLowerCase().includes(needle));
  }
  if (sp.finance === '1') {
    filtered = filtered.filter(l => l.owner_financing || l.features?.includes('Owner Financing') || l.features?.includes('Seller Financing'));
  }
  filtered = applyRange(filtered, sp.price, l => l.price);
  filtered = applyRange(filtered, sp.acres, l => l.acres);
  filtered = applyRange(filtered, sp.ppa, l => (l.acres > 0 ? l.price / l.acres : 0));
  const sort = sortKey(sp.sort);
  filtered.sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'acres') return b.acres - a.acres;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  const page = Math.max(1, parseInt(sp.page ?? '1') || 1);
  const per = 24;
  const start = (page - 1) * per;
  return { listings: filtered.slice(start, start + per), total: filtered.length };
}

export default async function ListingsPage({ searchParams }: Props) {
  const { listings, total } = await getListings(searchParams);
  const page       = parseInt(searchParams.page ?? '1');
  const per        = 24;
  const totalPages = Math.ceil(total / per);

  const activeFilters = [
    searchParams.state && { key: 'state', label: searchParams.state },
    searchParams.type  && { key: 'type',  label: searchParams.type },
    searchParams.price && { key: 'price', label: PRICE_RANGES.find(r => r.value === searchParams.price)?.label ?? searchParams.price },
    searchParams.acres && { key: 'acres', label: ACREAGE_OPTIONS.find(r => r.value === searchParams.acres)?.label ?? searchParams.acres },
    searchParams.ppa   && { key: 'ppa',   label: PPA_OPTIONS.find(r => r.value === searchParams.ppa)?.label ?? searchParams.ppa },
    searchParams.q     && { key: 'q',     label: `"${searchParams.q}"` },
    searchParams.finance === '1' && { key: 'finance', label: 'Owner financing' },
    searchParams.sort && searchParams.sort !== 'newest' && {
      key: 'sort',
      label: SORTS.find(option => option.value === searchParams.sort)?.label ?? 'Sorted',
    },
  ].filter(Boolean) as { key: string; label: string }[];

  function removeFilter(key: string) {
    const p = { ...searchParams };
    delete (p as any)[key];
    const qs = new URLSearchParams(p as any).toString();
    return '/listings' + (qs ? '?' + qs : '');
  }

  const currentSort = sortKey(searchParams.sort);
  const heading = searchParams.state
    ? `Land for sale in ${searchParams.state}`
    : searchParams.type
      ? `${searchParams.type} for sale`
      : searchParams.q
        ? `Results for “${searchParams.q}”`
        : 'Land for sale';

  function typeHref(type?: string) {
    const params = new URLSearchParams();
    if (searchParams.q) params.set('q', searchParams.q);
    if (searchParams.state) params.set('state', searchParams.state);
    if (type && searchParams.type !== type) params.set('type', type);
    if (searchParams.price) params.set('price', searchParams.price);
    if (searchParams.acres) params.set('acres', searchParams.acres);
    if (searchParams.ppa) params.set('ppa', searchParams.ppa);
    if (searchParams.finance) params.set('finance', searchParams.finance);
    if (currentSort !== 'newest') params.set('sort', currentSort);
    const qs = params.toString();
    return '/listings' + (qs ? `?${qs}` : '');
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(var(--canvas))' }}>
      <div className="bg-white border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-400 mb-1">Marketplace</p>
              <h1 className="text-brand-900 text-3xl sm:text-4xl">{heading}</h1>
            </div>
            <p className="text-sm text-brand-500 whitespace-nowrap pb-1">
              {total.toLocaleString()} {total === 1 ? 'parcel' : 'parcels'}
            </p>
          </div>

          <ListingFilters current={{ ...searchParams, sort: currentSort }} />
        </div>

        <div className="border-t border-brand-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 py-2.5 overflow-x-auto scrollbar-hide">
            <Link
              href={typeHref()}
              className={`flex-shrink-0 px-3 py-1.5 text-sm border ${
                !searchParams.type ? 'bg-blue text-white border-blue' : 'bg-white text-brand-700 border-brand-200'
              }`}
            >
              All land
            </Link>
            {LAND_TYPES.map(t => (
              <Link
                key={t}
                href={typeHref(t)}
                className={`flex-shrink-0 px-3 py-1.5 text-sm border whitespace-nowrap ${
                  searchParams.type === t ? 'bg-blue text-white border-blue' : 'bg-white text-brand-700 border-brand-200'
                }`}
              >
                {t}
              </Link>
            ))}
            <div className="lg:hidden flex-shrink-0">
              <Suspense>
                <MobileFilterSheet current={searchParams} totalActive={activeFilters.length} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2">
          {activeFilters.map(f => (
            <Link
              key={f.key}
              href={removeFilter(f.key)}
              className="inline-flex items-center gap-1.5 bg-blue/10 text-blue border border-blue/20 px-3 py-1 text-xs font-semibold"
            >
              {f.label} <span aria-hidden>×</span>
            </Link>
          ))}
          <Link href="/listings" className="text-xs text-brand-500 underline self-center">Clear all</Link>
        </div>
      )}

      {listings.length > 0 ? (
        <>
          <MarketBoard listings={listings} />
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-8">
              {page > 1 && (
                <Link href={`/listings?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                  className="btn-secondary text-sm px-4 py-2">Previous</Link>
              )}
              <span className="text-sm text-brand-500 px-4">Page {page} of {totalPages}</span>
              {page < totalPages && (
                <Link href={`/listings?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                  className="btn-secondary text-sm px-4 py-2">Next</Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="max-w-3xl mx-auto text-center py-20">
          <h3 className="text-brand-800 text-2xl mb-2">No parcels match these filters</h3>
          <p className="text-brand-400 text-sm mb-6">Widen the price, acreage, or location and search again.</p>
          <Link href="/listings" className="btn-primary text-sm">Clear filters</Link>
        </div>
      )}
    </div>
  );
}
