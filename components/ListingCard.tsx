import Link from 'next/link';
import { MapPin, Maximize2 } from 'lucide-react';
import { Listing } from '../types';

const LAND_GRADIENTS: Record<string, string> = {
  'Ranch Land':       'linear-gradient(180deg,#87CEEB 38%,#A8D5A2 38%,#6B8F5E 58%,#8B7355 75%,#C4A882 100%)',
  'Hunting Land':     'linear-gradient(180deg,#4A90D9 35%,#6B9B6B 35%,#2D5A27 55%,#909090 75%,#787878 100%)',
  'Residential Lots': 'linear-gradient(180deg,#87CEEB 40%,#4CAF50 40%,#388E3C 62%,#2E7D32 80%,#1B5E20 100%)',
  'Mountain Property':'linear-gradient(180deg,#2C6FAC 30%,#5B9BD5 42%,#8B7355 52%,#6B8F5E 65%,#2D5A27 88%)',
  'Wooded Land':      'linear-gradient(180deg,#87CEEB 30%,#228B22 30%,#1A6B1A 52%,#155215 72%,#0F3B0F 100%)',
  'Desert Land':      'linear-gradient(180deg,#FF9552 22%,#F5A623 36%,#D2B48C 46%,#C4A882 66%,#BDA882 100%)',
  'Farmland':         'linear-gradient(180deg,#87CEEB 38%,#90EE90 38%,#6ABF5E 55%,#4A8F40 72%,#2D5C2A 100%)',
  'Commercial':       'linear-gradient(180deg,#87CEEB 40%,#C8B89A 40%,#B0976E 58%,#8B7355 78%,#6B5740 100%)',
  'Recreational':     'linear-gradient(180deg,#87CEEB 35%,#5DBB63 35%,#3A9940 52%,#2A7330 68%,#1B4A20 100%)',
};

function fmt(n: number) {
  return '$' + n.toLocaleString();
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const gradient = LAND_GRADIENTS[listing.type] ?? LAND_GRADIENTS['Ranch Land'];

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-brand-100 shadow-sm
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-250">
        {/* Image */}
        <div className="relative h-44 overflow-hidden" style={{ background: listing.images[0] ? undefined : gradient }}>
          {listing.images[0] && (
            <img src={listing.images[0]} alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          )}
          <div className="absolute inset-0 flex items-start justify-between p-3">
            <span className="bg-white/93 text-brand-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide">
              {listing.type}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-brand-700 font-extrabold text-xl tracking-tight mb-0.5">
            {fmt(listing.price)}
          </p>
          <h3 className="text-brand-900 font-semibold text-base mb-2 leading-snug">
            {listing.title}
          </h3>

          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1 text-brand-800 font-semibold text-sm">
              <Maximize2 size={13} />
              {listing.acres.toLocaleString()} Acres
            </span>
            <span className="text-xs text-brand-400 bg-brand-50 px-2 py-0.5 rounded font-medium">
              {fmt(listing.price_per_acre)}/acre
            </span>
          </div>

          <div className="flex items-center gap-1 text-brand-400 text-xs mb-3">
            <MapPin size={12} />
            <span>{listing.county}, {listing.state}</span>
          </div>

          {/* Features */}
          {listing.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.features.slice(0, 3).map(f => (
                <span key={f} className="text-[10px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full border border-brand-100">
                  {f}
                </span>
              ))}
            </div>
          )}

          <button className="w-full border border-brand-500 text-brand-600 hover:bg-brand-600 hover:text-white
                             py-2 rounded-lg text-sm font-semibold transition-all group-hover:bg-brand-600 group-hover:text-white">
            View Details →
          </button>
        </div>
      </div>
    </Link>
  );
}
