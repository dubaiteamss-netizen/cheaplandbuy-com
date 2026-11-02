'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { US_STATES, LAND_TYPES, PRICE_RANGES, ACREAGE_OPTIONS, PPA_OPTIONS } from '../types';

const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'acres', label: 'Largest acreage' },
] as const;

export default function ListingFilters({
  current,
}: {
  current: {
    q?: string;
    state?: string;
    type?: string;
    price?: string;
    acres?: string;
    ppa?: string;
    sort?: string;
    finance?: string;
  };
}) {
  const router = useRouter();
  const fieldClass = 'h-11 w-full border border-brand-200 bg-white px-3 text-sm text-brand-800 outline-none focus:border-brand-700';

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const key of ['q', 'state', 'type', 'price', 'acres', 'ppa', 'sort', 'finance']) {
      const value = String(data.get(key) ?? '').trim();
      if (!value) continue;
      if (key === 'sort' && value === 'newest') continue;
      params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `/listings?${qs}` : '/listings');
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap gap-2">
      <label className="relative min-w-[220px] flex-1">
        <span className="sr-only">Keyword</span>
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
        <input
          name="q"
          defaultValue={current.q ?? ''}
          placeholder="County, city, or keyword"
          className={`${fieldClass} pl-9`}
        />
      </label>
      <select name="state" defaultValue={current.state ?? ''} className={`${fieldClass} min-w-[150px] flex-1`} aria-label="State">
        <option value="">All states</option>
        {US_STATES.map(state => <option key={state}>{state}</option>)}
      </select>
      <select name="type" defaultValue={current.type ?? ''} className={`${fieldClass} min-w-[170px] flex-1`} aria-label="Land type">
        <option value="">All types</option>
        {LAND_TYPES.map(type => <option key={type}>{type}</option>)}
      </select>
      <select name="price" defaultValue={current.price ?? ''} className={`${fieldClass} min-w-[150px] flex-1`} aria-label="Price">
        <option value="">Any price</option>
        {PRICE_RANGES.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
      </select>
      <select name="acres" defaultValue={current.acres ?? ''} className={`${fieldClass} min-w-[140px] flex-1`} aria-label="Acreage">
        <option value="">Any acres</option>
        {ACREAGE_OPTIONS.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
      </select>
      <select name="ppa" defaultValue={current.ppa ?? ''} className={`${fieldClass} min-w-[170px] flex-1`} aria-label="Price per acre">
        {PPA_OPTIONS.map(range => <option key={range.value || 'any'} value={range.value}>{range.label}</option>)}
      </select>
      <select name="finance" defaultValue={current.finance ?? ''} className={`${fieldClass} min-w-[170px] flex-1`} aria-label="Financing">
        <option value="">Any financing</option>
        <option value="1">Owner financing</option>
      </select>
      <select name="sort" defaultValue={current.sort && current.sort !== 'newest' ? current.sort : 'newest'} className={`${fieldClass} min-w-[180px] flex-1`} aria-label="Sort">
        {SORTS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <button type="submit" className="h-11 bg-brand-900 px-6 text-sm font-semibold text-white hover:bg-brand-700">
        Search
      </button>
    </form>
  );
}
