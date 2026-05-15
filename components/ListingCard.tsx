import Link from 'next/link';
import { MapPin, Maximize2, DollarSign } from 'lucide-react';
import { Listing } from '../types';

const LAND_GRADIENTS: Record<string, string> = {
  'Ranch Land':              'linear-gradient(180deg,#87CEEB 38%,#A8D5A2 38%,#6B8F5E 58%,#8B7355 75%,#C4A882 100%)',
  'Hunting Land':            'linear-gradient(180deg,#4A90D9 35%,#6B9B6B 35%,#2D5A27 55%,#909090 75%,#787878 100%)',
  'Recreational Land':       'linear-gradient(180deg,#87CEEB 35%,#5DBB63 35%,#3A9940 52%,#2A7330 68%,#1B4A20 100%)',
  'Farmland / Agricultural': 'linear-gradient(180deg,#87CEEB 38%,#90EE90 38%,#6ABF5E 55%,#4A8F40 72%,#2D5C2A 100%)',
  'Residential Lots':        'linear-gradient(180deg,#87CEEB 40%,#4CAF50 40%,#388E3C 62%,#2E7D32 80%,#1B5E20 100%)',
  'Wooded / Timber Land':    'linear-gradient(180deg,#87CEEB 30%,#228B22 30%,#1A6B1A 52%,#155215 72%,#0F3B0F 100%)',
  'Waterfront Property':     'linear-gradient(180deg,#4A90D9 38%,#2176AE 50%,#A8D5A2 58%,#6B8F5E 78%,#5A7A50 100%)',
  'Mountain Property':       'linear-gradient(180deg,#2C6FAC 30%,#5B9BD5 42%,#8B7355 52%,#6B8F5E 65%,#2D5A27 88%)',
  'Desert Land':             'linear-gradient(180deg,#FF9552 22%,#F5A623 36%,#D2B48C 46%,#C4A882 66%,#BDA882 100%)',
  'Horse Property':          'linear-gradient(180deg,#87CEEB 38%,#C8A882 42%,#A8855A 58%,#8B6914 75%,#6B5020 100%)',
  'Homestead':               'linear-gradient(180deg,#87CEEB 35%,#90EE90 38%,#5DBB63 55%,#3A7A3A 72%,#1B4A20 100%)',
  'Raw / Undeveloped Land':  'linear-gradient(180deg,#87CEEB 40%,#D2B48C 42%,#B8976A 58%,#9B7A4A 75%,#7A5E30 100%)',
  'Commercial Land':         'linear-gradient(180deg,#87CEEB 40%,#C8B89A 40%,#B0976E 58%,#8B7355 78%,#6B5740 100%)',
  'Mobile Home Lots':        'linear-gradient(180deg,#87CEEB 40%,#A8D5A2 42%,#6B8F5E 60%,#5A7A50 78%,#3A5A30 100%)',
  'Orchard / Vineyard':      'linear-gradient(180deg,#87CEEB 35%,#90EE90 38%,#4CAF50 52%,#2E7D32 68%,#1B5E20 100%)',
  'Conservation Land':       'linear-gradient(180deg,#4A90D9 30%,#2D7A2D 38%,#1A5A1A 55%,#0F3B0F 75%,#0A2A0A 100%)',
};

function isNewListing(createdAt: string) {
  const created = new Date(createdAt);
  const days = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
  return days <= 7;
}

export default function ListingCard({ listing }: { listing: any }) {
  const gradient   = LAND_GRADIENTS[listing.type] ?? LAND_GRADIENTS['Ranch Land'];
  const images: string[] = listing.images ?? [];
  const price      = listing.price ?? 0;
  const acres      = listing.acres ?? 0;
  const pricePerAc = acres > 0 ? Math.round(price / acres) : (listing.price_per_acre ?? 0);
  const isNew      = listing.created_at ? isNewListing(listing.created_at) : false;
  const hasOwnerFin = listing.owner_financing || listing.features?.includes('Owner Financing');

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-brand-100 shadow-sm
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-250">
        {/* Image */}
        <div className="relative h-48 sm:h-44 overflow-hidden bg-brand-100"
          style={{ background: images[0] ? undefined : gradient }}>
          {images[0] ? (
            <img src={images[0]} alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-30">🌾</span>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1.5">
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-white/95 text-brand-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
                {listing.type}
              </span>
              {isNew && (
                <span className="bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
                  ✦ New
                </span>
              )}
            </div>
            {listing.status === 'sold' && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide flex-shrink-0">
                SOLD
              </span>
            )}
          </div>

          {/* Bottom badges */}
          {hasOwnerFin && (
            <div className="absolute bottom-2.5 left-2.5">
              <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                💰 Owner Financing
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-brand-700 font-extrabold text-xl tracking-tight">
              ${price.toLocaleString()}
            </p>
            <span className="text-xs text-brand-400 bg-brand-50 px-2 py-0.5 rounded-full font-semibold border border-brand-100">
              ${pricePerAc.toLocaleString()}/ac
            </span>
          </div>

          {/* Title */}
          <h3 className="text-brand-900 font-semibold text-sm mb-2.5 leading-snug line-clamp-2">
            {listing.title}
          </h3>

          {/* Acres + Location */}
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-brand-700 font-bold bg-brand-50 px-2 py-1 rounded-full">
              <Maximize2 size={11} />
              {acres.toLocaleString()} Acres
            </span>
            <span className="flex items-center gap-1 text-brand-400">
              <MapPin size={11} />
              {listing.county ? `${listing.county}, ` : ''}{listing.state}
            </span>
          </div>

          {/* Feature pills (top 3) */}
          {listing.features?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {listing.features.slice(0, 3).map((f: string) => (
                <span key={f} className="text-[10px] bg-brand-50 text-brand-500 px-2 py-0.5 rounded-full border border-brand-100">
                  {f}
                </span>
              ))}
              {listing.features.length > 3 && (
                <span className="text-[10px] text-brand-400 px-1">+{listing.features.length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
