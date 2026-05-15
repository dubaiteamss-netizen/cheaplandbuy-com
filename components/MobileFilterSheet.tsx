'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { US_STATES, LAND_TYPES, PRICE_RANGES, ACREAGE_OPTIONS } from '../types';

interface Props {
  current: {
    state?: string;
    type?:  string;
    price?: string;
    acres?: string;
    q?:     string;
  };
  totalActive: number;
}

export default function MobileFilterSheet({ current, totalActive }: Props) {
  const router = useRouter();
  const [open,  setOpen]  = useState(false);
  const [state, setState] = useState(current.state ?? '');
  const [type,  setType]  = useState(current.type  ?? '');
  const [price, setPrice] = useState(current.price ?? '');
  const [acres, setAcres] = useState(current.acres ?? '');

  function apply() {
    const p = new URLSearchParams();
    if (current.q) p.set('q', current.q);
    if (state) p.set('state', state);
    if (type)  p.set('type',  type);
    if (price) p.set('price', price);
    if (acres) p.set('acres', acres);
    router.push(`/listings?${p.toString()}`);
    setOpen(false);
  }

  function clear() {
    setState(''); setType(''); setPrice(''); setAcres('');
    router.push('/listings');
    setOpen(false);
  }

  const activeCount = [state, type, price, acres].filter(Boolean).length;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-brand-200 bg-white rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 shadow-sm active:scale-95 transition-transform"
      >
        <SlidersHorizontal size={15} />
        Filters
        {activeCount > 0 && (
          <span className="bg-brand-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sheet */}
      <div className={`fixed bottom-0 inset-x-0 z-50 md:hidden bg-white rounded-t-2xl shadow-2xl transition-transform duration-300
        ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="font-extrabold text-brand-900 text-base">Filter Listings</h2>
          <button onClick={() => setOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="px-5 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* State */}
          <div>
            <label className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1.5 block">State</label>
            <div className="relative">
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full border border-brand-200 rounded-xl px-4 py-3 text-sm text-brand-800 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500 bg-brand-50"
              >
                <option value="">All States</option>
                {US_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none" />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1.5 block">Land Type</label>
            <div className="grid grid-cols-2 gap-2">
              {LAND_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setType(type === t ? '' : t)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all
                    ${type === t
                      ? 'bg-brand-700 text-white border-brand-700'
                      : 'bg-white text-brand-700 border-brand-200'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1.5 block">Price Range</label>
            <div className="grid grid-cols-2 gap-2">
              {PRICE_RANGES.map(r => (
                <button
                  key={r.value}
                  onClick={() => setPrice(price === r.value ? '' : r.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all
                    ${price === r.value
                      ? 'bg-brand-700 text-white border-brand-700'
                      : 'bg-white text-brand-700 border-brand-200'
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Acres */}
          <div>
            <label className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1.5 block">Acreage</label>
            <div className="grid grid-cols-2 gap-2">
              {ACREAGE_OPTIONS.map(r => (
                <button
                  key={r.value}
                  onClick={() => setAcres(acres === r.value ? '' : r.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all
                    ${acres === r.value
                      ? 'bg-brand-700 text-white border-brand-700'
                      : 'bg-white text-brand-700 border-brand-200'
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100">
          <button
            onClick={clear}
            className="flex-1 border-2 border-brand-200 text-brand-600 font-bold py-3 rounded-xl text-sm active:scale-95 transition-transform"
          >
            Clear All
          </button>
          <button
            onClick={apply}
            className="flex-2 bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-8 rounded-xl text-sm active:scale-95 transition-transform"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
