import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '../../../lib/supabase-server';
import { mockListings } from '../../../lib/mock-listings';
import ContactForm from '../../../components/ContactForm';
import ListingCard from '../../../components/ListingCard';
import { MapPin, Ruler, DollarSign, Tag, Calendar, ChevronLeft, Share2 } from 'lucide-react';

async function getListing(id: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.from('listings').select('*').eq('id', id).single();
    if (data) return data;
  } catch {}
  return mockListings.find(l => l.id === id) ?? null;
}

async function getSimilar(id: string, state: string, type: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings').select('*').eq('status', 'active')
      .eq('state', state).neq('id', id).limit(3);
    if (data && data.length > 0) return data;
  } catch {}
  return mockListings.filter(l => l.id !== id && (l.state === state || l.type === type)).slice(0, 3);
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);
  if (!listing) notFound();

  const similar = await getSimilar(params.id, listing.state, listing.type);
  const images: string[] = listing.images ?? [];
  const features: string[] = listing.features ?? [];
  const pricePerAcre = listing.acres > 0 ? Math.round(listing.price / listing.acres) : 0;
  const createdDate = listing.created_at
    ? new Date(listing.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen bg-brand-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
          <Link href="/listings" className="text-brand-500 hover:text-brand-700 flex items-center gap-1">
            <ChevronLeft size={14} /> Listings
          </Link>
          <span className="text-brand-300">/</span>
          <Link href={`/listings?state=${listing.state}`} className="text-brand-500 hover:text-brand-700">{listing.state}</Link>
          <span className="text-brand-300">/</span>
          <span className="text-brand-700 font-medium truncate max-w-xs">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Photo Gallery */}
            <div className="card p-0 overflow-hidden">
              {images.length > 0 ? (
                <div>
                  <img src={images[0]} alt={listing.title}
                    className="w-full h-72 sm:h-96 object-cover" />
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-1 p-1">
                      {images.slice(1, 5).map((src: string, i: number) => (
                        <div key={i} className="relative">
                          <img src={src} alt="" className="w-full h-20 object-cover rounded" />
                          {i === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                              <span className="text-white font-bold text-sm">+{images.length - 5}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <span className="text-7xl">🌾</span>
                </div>
              )}
            </div>

            {/* Title & Key Stats */}
            <div className="card">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full">{listing.type}</span>
                    {listing.status === 'active' && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Active</span>
                    )}
                    {listing.status === 'sold' && (
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">SOLD</span>
                    )}
                  </div>
                  <h1 className="text-2xl font-extrabold text-brand-900 leading-tight">{listing.title}</h1>
                  <p className="text-brand-500 mt-1 flex items-center gap-1 text-sm">
                    <MapPin size={14} /> {listing.county}, {listing.state} {listing.zip_code && `· ${listing.zip_code}`}
                  </p>
                </div>
                <button className="p-2 text-brand-400 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors flex-shrink-0">
                  <Share2 size={18} />
                </button>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[
                  { icon: <DollarSign size={18} />, label: 'Price',         value: `$${listing.price.toLocaleString()}` },
                  { icon: <Ruler size={18} />,      label: 'Acres',         value: `${listing.acres} ac` },
                  { icon: <DollarSign size={18} />, label: 'Per Acre',      value: `$${pricePerAcre.toLocaleString()}/ac` },
                  { icon: <Tag size={18} />,        label: 'Type',          value: listing.type },
                ].map(m => (
                  <div key={m.label} className="bg-brand-50 rounded-xl p-3 text-center">
                    <div className="text-brand-400 flex justify-center mb-1">{m.icon}</div>
                    <div className="font-extrabold text-brand-800 text-base">{m.value}</div>
                    <div className="text-brand-400 text-xs">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="font-extrabold text-brand-900 text-lg mb-4">Property Description</h2>
              <div className="text-brand-600 leading-relaxed text-sm whitespace-pre-line">
                {listing.description}
              </div>
              {createdDate && (
                <p className="text-brand-300 text-xs mt-5 flex items-center gap-1.5">
                  <Calendar size={12} /> Listed on {createdDate}
                </p>
              )}
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="card">
                <h2 className="font-extrabold text-brand-900 text-lg mb-4">Property Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {features.map((f: string) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-brand-700 bg-brand-50 rounded-lg px-3 py-2">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Info */}
            <div className="card">
              <h2 className="font-extrabold text-brand-900 text-lg mb-4">Location</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-brand-400 text-xs uppercase tracking-wide mb-1">County</p>
                  <p className="font-semibold text-brand-800">{listing.county}</p>
                </div>
                <div>
                  <p className="text-brand-400 text-xs uppercase tracking-wide mb-1">State</p>
                  <p className="font-semibold text-brand-800">{listing.state}</p>
                </div>
                {listing.zip_code && (
                  <div>
                    <p className="text-brand-400 text-xs uppercase tracking-wide mb-1">ZIP Code</p>
                    <p className="font-semibold text-brand-800">{listing.zip_code}</p>
                  </div>
                )}
                {listing.parcel_number && (
                  <div>
                    <p className="text-brand-400 text-xs uppercase tracking-wide mb-1">Parcel Number (APN)</p>
                    <p className="font-semibold text-brand-800 font-mono">{listing.parcel_number}</p>
                  </div>
                )}
                {listing.zoning && (
                  <div>
                    <p className="text-brand-400 text-xs uppercase tracking-wide mb-1">Zoning</p>
                    <p className="font-semibold text-brand-800">{listing.zoning}</p>
                  </div>
                )}
                {listing.taxes_per_year && (
                  <div>
                    <p className="text-brand-400 text-xs uppercase tracking-wide mb-1">Annual Property Tax</p>
                    <p className="font-semibold text-brand-800">${listing.taxes_per_year.toLocaleString()}/yr</p>
                  </div>
                )}
                {listing.owner_financing && (
                  <div className="col-span-2 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-xl">💰</span>
                    <div>
                      <p className="font-bold text-green-800 text-sm">Owner Financing Available</p>
                      <p className="text-green-600 text-xs">Contact seller for terms and down payment details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-4">
              {/* Price card */}
              <div className="card bg-brand-700 text-white text-center">
                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Asking Price</p>
                <p className="text-4xl font-extrabold">${listing.price.toLocaleString()}</p>
                <p className="text-white/60 text-sm mt-1">{listing.acres} acres · ${pricePerAcre.toLocaleString()}/ac</p>
                {listing.features?.includes('Owner Financing') && (
                  <div className="mt-3 bg-gold/20 border border-gold/40 text-gold text-xs font-bold px-3 py-1.5 rounded-full inline-block">
                    💰 Owner Financing Available
                  </div>
                )}
              </div>

              {/* Contact form */}
              {listing.status !== 'sold' ? (
                <ContactForm listingId={params.id} listingTitle={listing.title} />
              ) : (
                <div className="card text-center py-8">
                  <p className="text-4xl mb-3">🔒</p>
                  <p className="font-bold text-brand-800">This Property is Sold</p>
                  <p className="text-brand-400 text-sm mt-1 mb-4">Check out similar properties below</p>
                  <Link href={`/listings?state=${listing.state}`} className="btn-primary text-sm">
                    Browse {listing.state} Land
                  </Link>
                </div>
              )}

              {/* Share */}
              <div className="card text-center">
                <p className="text-sm font-semibold text-brand-700 mb-3">Share This Listing</p>
                <div className="flex justify-center gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://cheaplandbuy.com/listings/${params.id}`)}`}
                    target="_blank" rel="noopener"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://cheaplandbuy.com/listings/${params.id}`)}&text=${encodeURIComponent(listing.title)}`}
                    target="_blank" rel="noopener"
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                    Twitter/X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SIMILAR LISTINGS ── */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="font-extrabold text-brand-900 text-xl mb-6">Similar Properties in {listing.state}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((l: any) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
