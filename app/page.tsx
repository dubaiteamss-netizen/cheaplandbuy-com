import Link from 'next/link';
import ListingCard from '../components/ListingCard';
import HeroSlider from '../components/HeroSlider';
import AnimateIn from '../components/AnimateIn';
import { createServerSupabaseClient } from '../lib/supabase-server';
import { mockListings } from '../lib/mock-listings';
import { LAND_TYPES } from '../types';
import { BLOG_POSTS } from '../lib/blog-data';
import { Users, TrendingUp, Shield, ChevronRight, Star, Zap, DollarSign, Globe } from 'lucide-react';

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
      <div className="bg-brand-800 py-5 sm:py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {[
              { n: '12,400+', l: 'Active Listings', icon: '🏕️' },
              { n: '50',      l: 'States Covered',  icon: '🗺️' },
              { n: '8,200+',  l: 'Happy Buyers',    icon: '🤝' },
              { n: '$85M+',   l: 'In Land Sales',   icon: '💰' },
            ].map((s, i) => (
              <div key={s.l} className={`text-center py-3 px-2 ${i < 3 ? 'border-r border-white/10' : ''} ${i >= 2 ? 'border-t border-white/10 sm:border-t-0' : ''}`}>
                <div className="text-gold font-black text-2xl sm:text-3xl tracking-tight leading-none">{s.n}</div>
                <div className="text-white/60 text-xs uppercase tracking-widest mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK BENEFITS STRIP ── */}
      <AnimateIn>
        <section className="bg-white border-b border-brand-100 py-8 sm:py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: <Globe size={22} className="text-brand-600" />, title: 'All 50 States',        desc: 'Search nationwide or filter by your state' },
                { icon: <DollarSign size={22} className="text-emerald-600" />, title: 'Owner Financing', desc: 'No bank needed — buy direct from seller' },
                { icon: <Zap size={22} className="text-gold" />,         title: 'List in Minutes',     desc: 'Free account, live listing instantly' },
                { icon: <Shield size={22} className="text-blue-600" />,  title: 'Verified Sellers',   desc: 'Every seller reviewed before going live' },
              ].map((b, i) => (
                <AnimateIn key={b.title} delay={i * 80}>
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-brand-50 border border-brand-100 hover:border-brand-300 hover:shadow-md transition-all duration-300 group h-full">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-brand-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      {b.icon}
                    </div>
                    <div className="font-bold text-brand-800 text-sm leading-snug mb-1">{b.title}</div>
                    <div className="text-brand-400 text-xs leading-relaxed hidden sm:block">{b.desc}</div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ── LAND TYPE VISUAL CARDS ── */}
      <AnimateIn>
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-7">
              <div>
                <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Explore</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight mt-1">Browse by Land Type</h2>
              </div>
              <Link href="/listings" className="hidden sm:flex items-center gap-1 text-brand-500 hover:text-brand-700 text-sm font-semibold transition-colors">
                All Types <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { type: 'Ranch Land',              emoji: '🐄', gradient: 'linear-gradient(160deg,#87CEEB,#6B8F5E)' },
                { type: 'Hunting Land',            emoji: '🦌', gradient: 'linear-gradient(160deg,#4A90D9,#2D5A27)' },
                { type: 'Farmland / Agricultural', emoji: '🌾', gradient: 'linear-gradient(160deg,#87CEEB,#4A8F40)' },
                { type: 'Waterfront Property',     emoji: '🌊', gradient: 'linear-gradient(160deg,#2176AE,#6B8F5E)' },
                { type: 'Mountain Property',       emoji: '🏔️', gradient: 'linear-gradient(160deg,#2C6FAC,#8B7355)' },
                { type: 'Desert Land',             emoji: '🌵', gradient: 'linear-gradient(160deg,#FF9552,#D2B48C)' },
                { type: 'Wooded / Timber Land',    emoji: '🌲', gradient: 'linear-gradient(160deg,#228B22,#0F3B0F)' },
                { type: 'Residential Lots',        emoji: '🏡', gradient: 'linear-gradient(160deg,#87CEEB,#2E7D32)' },
              ].map((lt, i) => (
                <AnimateIn key={lt.type} delay={i * 55}>
                  <Link
                    href={`/listings?type=${encodeURIComponent(lt.type)}`}
                    className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div
                      className="relative flex flex-col items-center justify-end text-center p-3 pb-4"
                      style={{ background: lt.gradient, minHeight: 110 }}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <span className="text-3xl sm:text-4xl mb-2 drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300 inline-block">{lt.emoji}</span>
                      <span className="text-white text-xs font-bold leading-tight drop-shadow relative z-10 text-center">
                        {lt.type.replace(' / Agricultural', '').replace(' / Timber Land', '')}
                      </span>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ── FEATURED LISTINGS ── */}
      <section className="bg-gray-50 py-12 sm:py-16 border-t border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  🔥 Just Listed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">Latest Land Listings</h2>
                <p className="text-brand-400 text-sm mt-1">Fresh properties from verified sellers across the USA</p>
              </div>
              <Link href="/listings" className="hidden sm:flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm whitespace-nowrap">
                View All <ChevronRight size={16} />
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mb-7">
              <Link href="/listings" className="flex-shrink-0 bg-brand-700 text-white px-4 py-2 rounded-full text-sm font-semibold">All</Link>
              {LAND_TYPES.slice(0, 7).map(t => (
                <Link key={t} href={`/listings?type=${encodeURIComponent(t)}`}
                  className="flex-shrink-0 bg-white hover:bg-brand-700 hover:text-white text-brand-700 border border-brand-200 hover:border-brand-700 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap">
                  {t}
                </Link>
              ))}
            </div>
          </AnimateIn>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((l: any, i: number) => (
                <AnimateIn key={l.id} delay={i * 70}>
                  <ListingCard listing={l} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <AnimateIn>
              <div className="text-center py-16 bg-white rounded-2xl border border-brand-100 shadow-sm">
                <p className="text-5xl mb-3">🌾</p>
                <h3 className="font-bold text-brand-800 text-lg mb-2">Listings Coming Soon</h3>
                <p className="text-brand-400 text-sm mb-6">Be the first to list your land on CheapLandBuy.com</p>
                <Link href="/auth/register" className="btn-primary">List Your Land Free →</Link>
              </div>
            </AnimateIn>
          )}

          {featured.length > 0 && (
            <AnimateIn delay={200}>
              <div className="text-center mt-10">
                <Link href="/listings" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
                  View All Listings <ChevronRight size={18} />
                </Link>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* ── BROWSE BY STATE ── */}
      <section className="bg-white border-y border-brand-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Search Your Area</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-1">Popular States for Land</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { state: 'Texas',      count: '2,410', emoji: '🤠' },
              { state: 'Florida',    count: '1,830', emoji: '🌴' },
              { state: 'Montana',    count: '980',   emoji: '🏔️' },
              { state: 'Colorado',   count: '1,140', emoji: '⛷️' },
              { state: 'Tennessee',  count: '760',   emoji: '🎵' },
              { state: 'Oklahoma',   count: '890',   emoji: '🌾' },
              { state: 'Georgia',    count: '1,020', emoji: '🍑' },
              { state: 'Arizona',    count: '670',   emoji: '🌵' },
            ].map(({ state, count, emoji }, i) => (
              <AnimateIn key={state} delay={i * 60}>
                <Link href={`/listings?state=${state}`}
                  className="group bg-white hover:bg-brand-700 border border-brand-100 hover:border-brand-700
                             rounded-xl px-4 py-4 flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                  <div className="min-w-0">
                    <div className="font-bold text-brand-800 group-hover:text-white text-sm leading-tight">{state}</div>
                    <div className="text-brand-400 group-hover:text-white/70 text-xs">{count} listings</div>
                  </div>
                  <ChevronRight size={14} className="text-brand-300 group-hover:text-white/70 ml-auto flex-shrink-0 transition-colors" />
                </Link>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={500}>
            <div className="text-center mt-6">
              <Link href="/listings" className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-semibold text-sm">
                Browse All 50 States <ChevronRight size={14} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-brand-50 border-b border-brand-100 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Simple Process</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight mt-1">Sell Your Land in 3 Steps</h2>
              <p className="text-brand-400 mt-2 text-sm">List your land and connect with buyers in minutes</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 z-0" />
            {[
              { emoji: '👤', step: '01', title: 'Create Free Account', desc: 'Sign up in under 2 minutes. No experience needed. Completely free to start.' },
              { emoji: '📸', step: '02', title: 'Post Your Listing',   desc: 'Add photos, price, acreage, location, and description. Goes live immediately.' },
              { emoji: '🤝', step: '03', title: 'Connect with Buyers', desc: 'Receive inquiries directly. Close deals on your terms — no middleman.' },
            ].map((s, i) => (
              <AnimateIn key={s.step} delay={i * 120}>
                <div className="relative bg-white rounded-2xl border border-brand-100 shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 z-10">
                  {/* Step number */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-700 text-white text-xs font-black px-3 py-1 rounded-full">
                    Step {s.step}
                  </div>
                  <div className="text-5xl mb-4 mt-3">{s.emoji}</div>
                  <h3 className="font-bold text-brand-900 text-base mb-2">{s.title}</h3>
                  <p className="text-brand-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={400}>
            <div className="text-center mt-10">
              <Link href="/auth/register" className="btn-gold inline-flex items-center gap-2 text-base px-8 py-3.5">
                Start Listing Today — It's Free <ChevronRight size={18} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="bg-white py-12 sm:py-16 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Land Insights</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-1">Learn Before You Buy</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-brand-500 hover:text-brand-700 text-sm font-semibold">
                All Articles <ChevronRight size={15} />
              </Link>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <AnimateIn key={post.slug} delay={i * 90}>
                <Link href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-brand-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden bg-brand-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-brand-800 text-sm leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-brand-400 text-xs leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-300 text-xs">{post.readTime} min read</span>
                      <span className="text-gold font-bold text-xs group-hover:translate-x-1 transition-transform inline-block">Read →</span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={350}>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm">
                All Articles <ChevronRight size={14} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-brand-50 border-b border-brand-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Trusted Platform</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-1">Why Buyers & Sellers Choose Us</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={26} />, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100',   title: 'Verified Sellers',    desc: 'Every seller reviewed before listings go live.' },
              { icon: <Users size={26} />,  color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', title: 'Huge Buyer Pool',    desc: '50,000+ active buyers searching every month.' },
              { icon: <TrendingUp size={26} />, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', title: 'Fast Sales', desc: 'Most listings get inquiries within 48 hours.' },
              { icon: <Star size={26} />,   color: 'text-gold', bg: 'bg-amber-50 border-amber-100',   title: 'Top Rated',           desc: 'Rated #1 for affordable land by our buyers.' },
            ].map((f, i) => (
              <AnimateIn key={f.title} delay={i * 80}>
                <div className={`bg-white border ${f.bg.split(' ')[1]} rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-xl ${f.bg} border flex items-center justify-center mx-auto mb-3 ${f.color}`}>
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-brand-900 text-sm mb-1">{f.title}</h4>
                  <p className="text-brand-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-anim-bg opacity-95" />
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full hero-orb-gold" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full hero-orb-green" />
        <AnimateIn>
          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <div className="text-4xl mb-4 hero-float inline-block">🏕️</div>
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Ready to Sell?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Have Land to Sell?
            </h2>
            <p className="text-white/75 text-base sm:text-lg mb-8 leading-relaxed">
              Join thousands of sellers reaching motivated buyers every day across all 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-gold text-base px-8 py-3.5">
                List Your Land Free
              </Link>
              <Link href="/listings"
                className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-3.5 rounded-lg transition-all text-base hover:bg-white/10">
                Browse Listings
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {['✓ Free to List', '✓ No Commission', '✓ Owner Financing Friendly', '✓ All 50 States'].map(t => (
                <span key={t} className="bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
