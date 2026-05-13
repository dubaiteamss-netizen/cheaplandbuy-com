import Link from 'next/link';
import { MapPin, Maximize2 } from 'lucide-react';
import { Listing } from '../types';

const LAND_GRADIENTS: Record<string, string> = {
  'Ranch Land':        'linear-gradient(180deg,#87CEEB 38%,#A8D5A2 38%,#6B8F5E 58%,#8B7355 75%,#C4A882 100%)',
  'Hunting Land':      'linear-gradient(180deg,#4A90D9 35%,#6B9B6B 35%,#2D5A27 55%,#909090 75%,#787878 100%)',
  'Residential Lots':  'linear-gradient(180deg,#87CEEB 40%,#4CAF50 40%,#388E3C 62%,#2E7D32 80%,#1B5E20 100%)',
  'Mountain Property': 'linear-gradient(180deg,#2C6FAC 30%,#5B9BD5 42%,#8B7355 52%,#6B8F5E 65%,#2D5A27 88%)',
  'Wooded Land':       'linear-gradient(180deg,#87CEEB 30%,#228B22 30%,#1A6B1A 52%,#155215 72%,#0F3B0F 100%)',
  'Desert Land':       'linear-gradient(180deg,#FF9552 22%,#F5A623 36%,#D2B48C 46%,#C4A882 66%,#BDA882 100%)',
  'Farmland':          'linear-gradient(180deg,#87CEEB 38%,#90EE90 38%,#6ABF5E 55%,#4A8F40 72%,#2D5C2A 100%)',
  'Commercial':        'linear-gradient(180deg,#87CEEB 40%,#C8B89A 40%,#B0976E 58%,#8B7355 78%,#6B5740 100%)',
  'Recreational':      'linear-gradient(180deg,#87CEEB 35%,#5DBB63 35%,#3A9940 52%,#2A7330 68%,#1B4A20 100%)',
};

export default function ListingCard({ listing }: { listing: any }) {
  const gradient   = LAND_GRADIENTS[listing.type] ?? LAND_GRADIENTS['Ranch Land'];
  const images: string[] = listing.images ?? [];
  const price      = listing.price ?? 0;
  const acres      = listing.acres ?? 0;
  const pricePerAc = acres > 0 ? Math.round(price / acres) : (listing.price_per_acre ?? 0);

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-brand-100 shadow-sm
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-250">
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-brand-100"
          style={{ background: images[0] ? undefined : gradient }}>
          {images[0] ? (
            <img src={images[0]} alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-30">🌾</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-start justify-between p-3">
            <span className="bg-white/93 text-brand-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide shadow-sm">
              {listing.type}
            </span>
            {listing.status === 'sold' && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                SOLD
              </span>
            )}
            {listing.features?.includes('Owner Financing') && (
              <span className="bg-gold text-brand-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ml-auto">
                Owner Finance
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-brand-700 font-extrabold text-xl tracking-tight mb-0.5">
            ${price.toLocaleString()}
          </p>
          <h3 className="text-brand-900 font-semibold text-sm mb-2 leading-snug line-clamp-2">
            {listing.title}
          </h3>

          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1 text-brand-800 font-semibold text-sm">
              <Maximize2 size={13} />
              {acres.toLocaleString()} Acres
            </span>
            <span className="text-xs text-brand-400 bg-brand-50 px-2 py-0.5 rounded font-medium">
              ${pricePerAc.toLocaleString()}/ac
            </span>
          </div>

          <div className="flex items-center gap-1 text-brand-400 text-xs">
            <MapPin size={11} />
            <span>{listing.county ? `${listing.county}, ` : ''}{listing.state}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
