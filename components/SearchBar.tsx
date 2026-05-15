'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { US_STATES, LAND_TYPES, PRICE_RANGES, ACREAGE_OPTIONS } from '../types';

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();

  const [state, setState] = useState(params.get('state') ?? '');
  const [type,  setType]  = useState(params.get('type')  ?? '');
  const [price, setPrice] = useState(params.get('price') ?? '');
  const [acres, setAcres] = useState(params.get('acres') ?? '');

  function handleSearch() {
    const q = new URLSearchParams();
    if (state) q.set('state', state);
    if (type)  q.set('type',  type);
    if (price) q.set('price', price);
    if (acres) q.set('acres', acres);
    router.push(`/listings?${q.toString()}`);
  }

  if (compact) {
    return (
      <div className="flex gap-2 flex-wrap">
        <select value={state} onChange={e => setState(e.target.value)}
          className="flex-1 min-w-[130px] border border-brand-200 rounded-lg px-3 py-2 text-sm text-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="">All States</option>
          {US_STATES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)}
          className="flex-1 min-w-[130px] border border-brand-200 rounded-lg px-3 py-2 text-sm text-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="">All Types</option>
          {LAND_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={handleSearch}
          className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5">
          <Search size={14} /> Search
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ── MOBILE: stacked layout ── */}
      <div className="sm:hidden bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto">
        <div className="grid grid-cols-2 divide-x divide-y divide-brand-100">
          <div className="px-4 py-3">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">All States</option>
              {US_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="px-4 py-3">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Land Type</label>
            <select value={type} onChange={e => setType(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">Any Type</option>
              {LAND_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="px-4 py-3">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Max Price</label>
            <select value={price} onChange={e => setPrice(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">Any Price</option>
              {PRICE_RANGES.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="px-4 py-3">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Min Acres</label>
            <select value={acres} onChange={e => setAcres(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">Any Size</option>
              {ACREAGE_OPTIONS.map(a => <option key={a.label} value={a.value}>{a.label}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleSearch}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3.5 font-bold text-sm transition-colors flex items-center justify-center gap-2">
          <Search size={16} /> Search Land
        </button>
      </div>

      {/* ── DESKTOP: horizontal layout ── */}
      <div className="hidden sm:block bg-white rounded-xl shadow-2xl overflow-hidden max-w-3xl mx-auto">
        <div className="flex items-stretch">
          <div className="flex-1 px-4 py-3 border-r border-brand-100">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">All States</option>
              {US_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex-1 px-4 py-3 border-r border-brand-100">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Land Type</label>
            <select value={type} onChange={e => setType(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">Any Type</option>
              {LAND_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex-1 px-4 py-3 border-r border-brand-100">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Max Price</label>
            <select value={price} onChange={e => setPrice(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">Any Price</option>
              {PRICE_RANGES.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex-1 px-4 py-3 border-r border-brand-100">
            <label className="block text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Min Acres</label>
            <select value={acres} onChange={e => setAcres(e.target.value)}
              className="w-full font-semibold text-brand-800 text-sm bg-transparent border-none outline-none appearance-none cursor-pointer">
              <option value="">Any Size</option>
              {ACREAGE_OPTIONS.map(a => <option key={a.label} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <button onClick={handleSearch}
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 font-bold text-sm transition-colors flex items-center gap-2">
            <Search size={16} /> Search
          </button>
        </div>
      </div>
    </>
  );
}
