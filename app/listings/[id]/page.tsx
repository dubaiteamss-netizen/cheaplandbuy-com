import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockListings } from '../../../lib/mock-listings';
import ListingCard from '../../../components/ListingCard';
import { MapPin, Maximize2, DollarSign, Phone, Mail, ChevronLeft } from 'lucide-react';

function fmt(n: number) { return '$' + n.toLocaleString(); }

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = mockListings.find(l => l.id === params.id);
  if (!listing) notFound();

  const similar = mockListings.filter(l => l.id !== listing.id && l.state === listing.state).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-brand-400">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-700">Listings</Link>
          <span>/</span>
          <Link href={`/listings?state=${listing.state}`} className="hover:text-brand-700">{listing.state}</Link>
          <span>/</span>
          <span className="text-brand-700 font-medium truncate max-w-xs">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/listings" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm mb-6">
          <ChevronLeft size={16} /> Back to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="rounded-xl overflow-hidden h-72 sm:h-96 mb-6 bg-brand-200"
              style={{ background: listing.images[0] ? undefined :
                'linear-gradient(180deg,#87CEEB 38%,#A8D5A2 38%,#6B8F5E 58%,#8B7355 75%,#C4A882 100%)' }}>
              {listing.images[0] && (
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
              )}
            </div>

            {/* Title + price */}
            <div className="card mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wide bg-brand-50 px-2.5 py-1 rounded mb-2 inline-block">
                    {listing.type}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-1">{listing.title}</h1>
                  <div className="flex items-center gap-1 text-brand-400 mt-1 text-sm">
                    <MapPin size={14} />
                    <span>{listing.county}, {listing.state} {listing.zip_code}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-brand-700">{fmt(listing.price)}</div>
                  <div className="text-brand-400 text-sm">{fmt(listing.price_per_acre)} per acre</div>
                </div>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-brand-100 mb-4">
                <div className="text-center">
                  <Maximize2 size={18} className="mx-auto text-brand-500 mb-1" />
                  <div className="font-bold text-brand-800">{listing.acres.toLocaleString()}</div>
                  <div className="text-xs text-brand-400">Acres</div>
                </div>
                <div className="text-center">
                  <DollarSign size={18} className="mx-auto text-brand-500 mb-1" />
                  <div className="font-bold text-brand-800">{fmt(listing.price_per_acre)}</div>
                  <div className="text-xs text-brand-400">Per Acre</div>
                </div>
                <div className="text-center">
                  <MapPin size={18} className="mx-auto text-brand-500 mb-1" />
                  <div className="font-bold text-brand-800">{listing.state}</div>
                  <div className="text-xs text-brand-400">{listing.county}</div>
                </div>
              </div>

              <h2 className="font-bold text-brand-800 mb-2">Property Description</h2>
              <p className="text-brand-600 leading-relaxed text-sm">{listing.description}</p>
            </div>

            {/* Features */}
            <div className="card mb-6">
              <h2 className="font-bold text-brand-800 mb-4">Property Features</h2>
              <div className="grid grid-cols-2 gap-2">
                {listing.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-brand-700">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — contact form */}
          <div className="lg:col-span-1">
            <div className="card sticky top-20">
              <h3 className="font-extrabold text-brand-900 text-lg mb-1">Interested in this property?</h3>
              <p className="text-brand-400 text-sm mb-5">Send the seller a message below.</p>

              <form className="space-y-3">
                <div>
                  <label className="label">Your Name</label>
                  <input type="text" placeholder="John Smith" className="input" />
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <input type="email" placeholder="john@email.com" className="input" />
                </div>
                <div>
                  <label className="label">Phone (optional)</label>
                  <input type="tel" placeholder="(555) 000-0000" className="input" />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea rows={4} className="input resize-none"
                    defaultValue={`Hi, I'm interested in the "${listing.title}" listing. Please contact me with more details.`} />
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Mail size={16} /> Send Message
                </button>
              </form>

              <div className="border-t border-brand-100 mt-5 pt-5 text-center">
                <p className="text-xs text-brand-400 mb-3">Or call the seller directly</p>
                <a href="tel:+10000000000"
                  className="btn-secondary w-full flex items-center justify-center gap-2 text-sm">
                  <Phone size={15} /> Show Phone Number
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-brand-900 mb-6">Similar Land in {listing.state}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
