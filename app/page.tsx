import Link from 'next/link';
import { Suspense } from 'react';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import HeroSlider from '../components/HeroSlider';
import { createServerSupabaseClient } from '../lib/supabase-server';
import { mockListings } from '../lib/mock-listings';
import { LAND_TYPES } from '../types';
import { MapPin, Users, TrendingUp, Shield, ChevronRight } from 'lucide-react';

const STATES_GRID = [
  { state: 'Texas',      count: '2,410' },
  { state: 'Florida',    count: '1,830' },
  { state: 'Montana',    count: '980' },
  { state: 'Colorado',   count: '1,140' },
  { state: 'Tennessee',  count: '760' },
  { state: 'Oklahoma',   count: '890' },
  { state: 'Georgia',    count: '1,020' },
  { state: 'Arizona',    count: '670' },
];

async function getFeaturedListings() {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6);
    if (data && data.length > 0) return data;
  } catch {}
  return mockListings.slice(0, 6);
}

export const metadata = {
  title: 'Affordable Land For Sale Across America – Ranch, Farm, Hunting & More',
  description: 'Find cheap land for sale in all 50 states. Browse ranch land, hunting land, farmland, waterfront lots & residential parcels. Owner financing available. Search free.',
  alternates: { canonical: 'https://cheaplandbuy.com' },
};

const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cheaplandbuy.com/#organization',
      name: 'CheapLandBuy.com',
      url: 'https://cheaplandbuy.com',
      logo: 'https://cheaplandbuy.com/logo.png',
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'hello@cheaplandbuy.com' },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cheaplandbuy.com/#website',
      url: 'https://cheaplandbuy.com',
      name: 'CheapLandBuy.com',
      publisher: { '@id': 'https://cheaplandbuy.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://cheaplandbuy.com/listings?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I buy cheap land in the USA?', acceptedAnswer: { '@type': 'Answer', text: 'Browse CheapLandBuy.com to find affordable land listings in all 50 states. Filter by state, land type, price, and acreage. Look for owner-financed properties to skip bank approval, and always check zoning, road access, and parcel taxes before making an offer.' } },
        { '@type': 'Question', name: 'What is the cheapest state to buy land in?', acceptedAnswer: { '@type': 'Answer', text: 'New Mexico, Arizona, Arkansas, Wyoming, and West Virginia consistently offer the lowest price per acre. CheapLandBuy.com lists affordable parcels starting under $1,000 per acre in these states.' } },
        { '@type': 'Question', name: 'Can I buy land with owner financing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Many listings on CheapLandBuy.com offer owner financing — you pay the seller monthly with no bank required. It is ideal for buyers with limited credit history. Look for the green Owner Financing badge on listings.' } },
        { '@type': 'Question', name: 'How do I sell my land online?', acceptedAnswer: { '@type': 'Answer', text: 'Create a free account on CheapLandBuy.com and post your listing in minutes. Add photos, description, parcel number, and price. Toggle owner financing on to get 3x more inquiries. Your listing goes live immediately.' } },
        { '@type': 'Question', name: 'How much does an acre of land cost in the United States?', acceptedAnswer: { '@type': 'Answer', text: 'Raw rural land can cost $500–$3,000 per acre in affordable states. Agricultural Midwest land averages $5,000–$15,000 per acre. Residential lots near cities run $20,000–$100,000+ per acre. Waterfront and mountain land commands premium prices.' } },
        { '@type': 'Question', name: 'What is raw land?', acceptedAnswer: { '@type': 'Answer', text: 'Raw land is undeveloped property with no utilities, roads, or structures. It is the cheapest type of land to buy and is ideal for hunting, camping, future building, or long-term investment.' } },
        { '@type': 'Question', name: 'Is buying land a good investment?', acceptedAnswer: { '@type': 'Answer', text: 'Land is one of the most reliable long-term investments — it cannot be manufactured, never depreciates, and appreciates over time especially near growing metros. Rural land appreciates 3–7% annually on average and provides inflation protection.' } },
        { '@type': 'Question', name: 'Do I need a real estate agent to buy land?', acceptedAnswer: { '@type': 'Answer', text: 'No. You can buy land directly from sellers on CheapLandBuy.com. Land is simpler to transact than homes. A title company or real estate attorney can handle closing documents for a few hundred dollars.' } },
        { '@type': 'Question', name: 'What is owner financing on land?', acceptedAnswer: { '@type': 'Answer', text: 'Owner financing means the seller acts as the bank. You pay monthly directly to the seller with no mortgage lender involved. It is common on land because traditional banks often refuse to finance rural or raw land parcels.' } },
        { '@type': 'Question', name: 'Can I buy land with bad credit?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most sellers offering owner financing on CheapLandBuy.com do not run formal credit checks. Owner financing is the best option for buyers with low credit scores, no credit history, or recent bankruptcies.' } },
      ],
    },
  ],
};

export default async function HomePage() {
  const featured = await getFeaturedListings();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      {/* ── HERO ── */}
      <HeroSlider />

      {/* ── STATS BAR ── */}
      <div className="bg-brand-800 py-4">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
          {[
            { n: '12,400+', l: 'Active Listings' },
            { n: '50',      l: 'States Covered' },
            { n: '8,200+',  l: 'Happy Buyers' },
            { n: '$85M+',   l: 'In Land Sales' },
          ].map((s, i, arr) => (
            <div key={s.l} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-gold font-extrabold text-2xl tracking-tight">{s.n}</div>
                <div className="text-white/55 text-xs uppercase tracking-wider">{s.l}</div>
              </div>
              {i < arr.length - 1 && <div className="h-8 w-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="bg-white border-b border-brand-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-brand-600 text-base sm:text-lg leading-relaxed">
            Welcome to <strong className="text-brand-800">CheapLandBuy.com</strong> — an online marketplace where buyers and sellers can directly list, discover, purchase, and sell affordable land across the United States.
          </p>
          <p className="text-brand-500 text-sm sm:text-base leading-relaxed mt-3">
            Our platform is designed to make land listings simple, accessible, and affordable for everyone. Whether you are searching for investment land, rural acreage, residential lots, or owner-financed properties, you can explore opportunities from different states in one place.
          </p>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">Latest Land Listings</h2>
            <p className="text-brand-400 mt-1">Fresh properties from verified sellers</p>
          </div>
          <Link href="/listings" className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          <Link href="/listings" className="bg-brand-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold">All</Link>
          {LAND_TYPES.slice(0, 6).map(t => (
            <Link key={t} href={`/listings?type=${encodeURIComponent(t)}`}
              className="bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
              {t}
            </Link>
          ))}
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((l: any) => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-50 rounded-xl border border-brand-100">
            <p className="text-5xl mb-3">🌾</p>
            <h3 className="font-bold text-brand-800 text-lg mb-2">Listings Coming Soon</h3>
            <p className="text-brand-400 text-sm mb-6">Be the first to list your land on CheapLandBuy.com</p>
            <Link href="/auth/register" className="btn-primary">List Your Land Free →</Link>
          </div>
        )}
        {featured.length > 0 && (
          <div className="text-center mt-10">
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
              View All Listings <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </section>

      {/* ── BROWSE BY STATE ── */}
      <section className="bg-brand-50 border-y border-brand-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-brand-900 mb-6 text-center">Browse Land by State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATES_GRID.map(({ state, count }) => (
              <Link key={state} href={`/listings?state=${state}`}
                className="bg-white hover:bg-brand-700 hover:text-white border border-brand-100 hover:border-brand-700
                           rounded-lg px-4 py-3 flex justify-between items-center transition-all group">
                <span className="font-semibold text-sm text-brand-800 group-hover:text-white">
                  <MapPin size={12} className="inline mr-1 opacity-60" />{state}
                </span>
                <span className="text-xs text-brand-400 group-hover:text-white/70">{count}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/listings" className="text-brand-600 hover:text-brand-700 font-semibold text-sm">All 50 States →</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">How It Works for Sellers</h2>
          <p className="text-brand-400 mt-2">List your land and connect with buyers in minutes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '👤', step: 1, title: 'Create Free Account', desc: 'Sign up in under 2 minutes. No experience needed. Completely free to start.' },
            { icon: '📸', step: 2, title: 'Post Your Listing',   desc: 'Add photos, price, acreage, location, and description. Goes live after review.' },
            { icon: '🤝', step: 3, title: 'Connect with Buyers', desc: 'Receive inquiries directly. Close deals on your own terms, no middleman.' },
          ].map((s, i) => (
            <div key={s.step} className="card relative text-center">
              <div className="absolute top-4 left-4 w-6 h-6 bg-brand-700 text-white rounded-full flex items-center justify-center text-xs font-black">{s.step}</div>
              <div className="text-4xl mb-4 mt-2">{s.icon}</div>
              <h3 className="font-bold text-brand-900 text-lg mb-2">{s.title}</h3>
              <p className="text-brand-400 text-sm leading-relaxed">{s.desc}</p>
              {i < 2 && <div className="hidden md:block absolute top-1/2 -right-3 text-brand-200 text-2xl font-bold z-10">›</div>}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/auth/register" className="btn-gold inline-flex items-center gap-2 text-base">
            Start Listing Today — It's Free
          </Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-brand-50 border-y border-brand-100 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-brand-900 text-center mb-10">Why Sellers & Buyers Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Shield size={28} />, title: 'Verified Sellers',  desc: 'Every seller is reviewed before listings go live.' },
              { icon: <Users size={28} />,  title: 'Huge Buyer Pool',   desc: '50,000+ active buyers searching every month.' },
              { icon: <TrendingUp size={28} />, title: 'Fast Sales',    desc: 'Most listings receive inquiries within 48 hours.' },
              { icon: <MapPin size={28} />, title: 'All 50 States',     desc: 'The largest affordable land marketplace in the country.' },
            ].map(f => (
              <div key={f.title} className="card flex flex-col items-center">
                <div className="text-brand-600 mb-3">{f.icon}</div>
                <h4 className="font-bold text-brand-900 mb-1">{f.title}</h4>
                <p className="text-brand-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-brand-800 to-brand-600 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Ready to Sell?</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Have Land to Sell?</h2>
          <p className="text-white/75 text-lg mb-8">Join thousands of sellers reaching motivated buyers every day on CheapLandBuy.com</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-gold text-base px-8 py-3.5">List Your Land Free</Link>
            <Link href="/listings" className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-3.5 rounded-lg transition-all text-base">Browse Listings</Link>
          </div>
        </div>
      </section>
    </>
  );
}
