import Link from 'next/link';
import { MapPin } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

function money(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

function pricePerAcre(price: number, acres: number, stored?: number) {
  if (stored && stored > 0) return Math.round(stored);
  if (acres > 0 && price > 0) return Math.round(price / acres);
  return 0;
}

const TYPE_ART: Record<string, string> = {
  'Ranch Land': '/illustrations/cartoon-ranch.jpg',
  'Hunting Land': '/illustrations/cartoon-forest.jpg',
  'Wooded / Timber Land': '/illustrations/cartoon-forest.jpg',
  'Waterfront Property': '/illustrations/cartoon-coast.jpg',
  'Mountain Property': '/illustrations/cartoon-mountain.jpg',
  'Farmland / Agricultural': '/illustrations/cartoon-ranch.jpg',
  'Recreational Land': '/illustrations/cartoon-forest.jpg',
  'Desert Land': '/illustrations/hero-land.jpg',
  'Residential Lots': '/illustrations/hero-land.jpg',
};

function isNewListing(createdAt: string) {
  const created = new Date(createdAt);
  return (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24) <= 14;
}

export default function ListingCard({
  listing,
  variant = 'card',
  premium = false,
  featured = false,
}: {
  listing: any;
  variant?: 'card' | 'row' | 'premium' | 'tile';
  premium?: boolean;
  featured?: boolean;
}) {
  const mode = variant === 'card' && (featured || premium) ? 'premium' : variant;
  const images: string[] = listing.images ?? [];
  const photoSrc = images[0] || TYPE_ART[listing.type] || '/illustrations/hero-land.jpg';
  const illustrated = !images[0];
  const price = listing.price ?? 0;
  const acres = listing.acres ?? 0;
  const ppa = pricePerAcre(price, acres, listing.price_per_acre);
  const place = [listing.county, listing.state].filter(Boolean).join(', ');
  const blurb = String(listing.description ?? '').replace(/\s+/g, ' ').trim();
  const isNew = listing.created_at ? isNewListing(listing.created_at) : false;
  const hasOwnerFin = listing.owner_financing || listing.features?.includes('Owner Financing') || listing.features?.includes('Seller Financing');
  const showLargePhoto = mode === 'premium' || (mode === 'row' && premium);

  const photo = (
    <div className={`relative overflow-hidden bg-brand-100 ${
      mode === 'premium' ? 'h-56 sm:h-[420px] lg:h-[520px]' :
      mode === 'row' ? (showLargePhoto ? 'h-72 sm:h-[240px] sm:w-[380px] flex-shrink-0' : 'h-44 sm:h-[168px] sm:w-56 flex-shrink-0') :
      'h-52'
    }`}>
      <img
        src={photoSrc}
        alt={illustrated ? `${listing.type} illustration` : listing.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {illustrated && (
        <span className="absolute bottom-3 right-3 bg-white/95 text-[10px] font-semibold uppercase tracking-wide text-brand-700 px-2 py-1">
          Illustration
        </span>
      )}
      <div className="absolute top-3 left-3 flex gap-1.5">
        {premium && mode !== 'premium' && (
          <span className="bg-teal text-white text-[11px] font-semibold uppercase tracking-wide px-2 py-1">Premium</span>
        )}
        {isNew && (
          <span className="bg-white text-brand-900 text-[11px] font-semibold uppercase tracking-wide px-2 py-1">New</span>
        )}
        {listing.status === 'sold' && (
          <span className="bg-brand-900 text-white text-[11px] font-semibold uppercase tracking-wide px-2 py-1">Sold</span>
        )}
      </div>
      <div className="absolute top-3 right-3">
        <FavoriteButton listingId={listing.id} size="sm" />
      </div>
      {mode === 'premium' && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/80 to-transparent p-6 sm:p-8 text-white">
          <p className="text-4xl sm:text-5xl font-semibold tracking-tight">{money(price)}</p>
          <p className="mt-2 text-white/85">
            {Number(acres).toLocaleString()} acres{ppa > 0 && ` · ${money(ppa)}/acre`}
          </p>
        </div>
      )}
    </div>
  );

  const facts = (
    <div className={`flex flex-1 flex-col ${mode === 'premium' ? 'p-6 sm:p-8' : mode === 'row' ? 'p-4 sm:p-5' : 'p-4'}`}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-teal">{listing.type}</p>
      {mode !== 'premium' && (
        <>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-brand-900">{money(price)}</p>
          <p className="mt-1 text-sm text-brand-600">
            <span className="font-semibold text-brand-800">{Number(acres).toLocaleString()} acres</span>
            {ppa > 0 && <span> · {money(ppa)}/acre</span>}
          </p>
        </>
      )}
      <h3 className={`text-brand-900 leading-snug line-clamp-2 ${mode === 'premium' ? 'font-display text-3xl sm:text-4xl' : 'mt-2 text-lg font-semibold'}`}>
        {listing.title}
      </h3>
      {place && (
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-brand-500">
          <MapPin size={14} className="flex-shrink-0 text-blue" />
          {place}
        </p>
      )}
      {blurb && (
        <p className={`mt-2 text-sm leading-relaxed text-brand-500 ${mode === 'premium' ? 'line-clamp-3 max-w-3xl' : 'line-clamp-2'}`}>
          {blurb}
        </p>
      )}
      {hasOwnerFin && (
        <p className="mt-3 inline-flex self-start border border-teal/40 bg-teal/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-dark">
          Owner financing
        </p>
      )}
    </div>
  );

  if (mode === 'tile') {
    return (
      <Link href={`/listings/${listing.id}`} className="group block h-full overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
        <div className="relative h-36 sm:h-44">
          <img src={photoSrc} alt={illustrated ? `${listing.type} illustration` : listing.title} className="h-full w-full object-cover" />
          <div className="absolute left-2 top-2">
            <FavoriteButton listingId={listing.id} size="sm" />
          </div>
          <div className="absolute inset-x-2 bottom-2 flex items-end justify-between gap-2">
            <span className="rounded-lg bg-blue px-2 py-1 text-sm font-semibold text-white">{money(price)}</span>
            <span className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-brand-900">{Number(acres).toLocaleString()} ac</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-brand-900">{listing.title}</h3>
          {place && <p className="mt-1 line-clamp-1 text-xs text-brand-500">{place}</p>}
          <p className="mt-1 text-xs font-semibold text-teal">{ppa > 0 ? `${money(ppa)}/acre` : listing.type}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/listings/${listing.id}`} className="group block h-full bg-white">
      <article className={`h-full ${
        mode === 'row' ? 'sm:flex' : ''
      } ${mode === 'card' ? 'border border-brand-100 shadow-card overflow-hidden' : ''} ${
        mode === 'premium' ? 'overflow-hidden border border-brand-100 shadow-card' : ''
      }`}>
        {photo}
        {facts}
      </article>
    </Link>
  );
}
