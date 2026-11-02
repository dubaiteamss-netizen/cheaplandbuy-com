'use client';

import { useState } from 'react';
import ListingCard from './ListingCard';
import ListingMap from './ListingMap';
import { isPremiumListing } from '../lib/map-points';

export default function MarketBoard({ listings }: { listings: any[] }) {
  const [view, setView] = useState<'list' | 'map'>('list');
  const lead = listings.reduce((best: any, item: any) => (
    Number(item?.price ?? 0) > Number(best?.price ?? -1) ? item : best
  ), null);
  const rest = lead ? listings.filter((item) => item.id !== lead.id) : listings;

  return (
    <div>
      {lead && (
        <div className={view === 'map' ? 'hidden lg:block' : 'block'}>
          <ListingCard listing={lead} variant="premium" premium />
        </div>
      )}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,42%)] lg:min-h-[calc(100vh-220px)]">
      <div className={view === 'map' ? 'hidden lg:block' : 'block'}>
        <div className="divide-y divide-brand-100 border-y border-brand-100 bg-white lg:border-l-0">
          {rest.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              variant="row"
              premium={isPremiumListing(listing)}
            />
          ))}
        </div>
      </div>

      <div className={`${view === 'map' ? 'block' : 'hidden'} lg:block lg:sticky lg:top-[76px] lg:h-[calc(100vh-76px)] lg:border-l lg:border-brand-100`}>
        <ListingMap listings={listings} />
      </div>

      <div className="lg:hidden fixed bottom-20 left-1/2 z-40 -translate-x-1/2">
        <button
          type="button"
          onClick={() => setView(view === 'list' ? 'map' : 'list')}
          className="bg-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg"
        >
          {view === 'list' ? 'Map' : 'List'}
        </button>
      </div>
      </div>
    </div>
  );
}
