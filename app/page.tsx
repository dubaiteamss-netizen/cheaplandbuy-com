import Link from 'next/link';
import AnimateIn from '../components/AnimateIn';
import CartoonHero from '../components/CartoonHero';
import MarketBoard from '../components/MarketBoard';
export const dynamic = 'force-dynamic'; // Skip static generation to avoid build-time Supabase errors

import { createServerSupabaseClient, isPublishedListingId, isSupabaseConfigured } from '../lib/supabase-server';
import { mockListings } from '../lib/mock-listings';
import { BLOG_POSTS } from '../lib/blog-data';
import { ChevronRight } from 'lucide-react';

async function getFeaturedListings() {
  if (!isSupabaseConfigured()) {
    return [...mockListings]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8);
  }
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(8);
    return (data ?? []).filter((row: { id: string }) => isPublishedListingId(String(row.id)));
  } catch {
    return [];
  }
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
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'support@cheaplandbuy.com' },
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
        { '@type': 'Question', name: 'What is the cheapest state to buy land in?', acceptedAnswer: { '@type': 'Answer', text: 'New Mexico, Arizona, Arkansas, Wyoming, and West Virginia often have some of the lowest prices per acre. Compare the listings on CheapLandBuy.com and confirm price, access, and zoning before you make an offer.' } },
        { '@type': 'Question', name: 'Can I buy land with owner financing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Many listings on CheapLandBuy.com offer owner financing — you pay the seller monthly with no bank required. It is ideal for buyers with limited credit history. Look for the green Owner Financing badge on listings.' } },
        { '@type': 'Question', name: 'How do I sell my land online?', acceptedAnswer: { '@type': 'Answer', text: 'Create a free account on CheapLandBuy.com and post your listing in minutes. Add photos, description, parcel number, and price. Your listing goes live as soon as you submit it.' } },
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
      <CartoonHero />

      {featured.length > 0 ? (
        <MarketBoard listings={featured} />
      ) : (
        <div className="text-center py-16 bg-white border-b border-brand-100">
          <h2 className="text-brand-800 text-2xl mb-2">No listings to show yet</h2>
          <p className="text-brand-400 text-sm mb-6">When a seller posts land, it appears here right away.</p>
          <Link href="/auth/register" className="btn-primary">List your land</Link>
        </div>
      )}

      <div className="bg-white border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
          {[
            { n: '50', l: 'States' },
            { n: '$0', l: 'To list' },
            { n: '0%', l: 'Commission' },
            { n: 'Direct', l: 'Buyer contact' },
          ].map((item, index) => (
            <div key={item.l} className={`py-6 ${index % 2 === 0 ? '' : ''} ${index < 3 ? 'lg:border-r lg:border-brand-100' : ''} ${index < 2 ? 'border-b lg:border-b-0 border-brand-100' : ''}`}>
              <div className="text-2xl text-brand-900">{item.n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-brand-400">{item.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LAND TYPE VISUAL CARDS ── */}
      <AnimateIn>
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-5">
              <div>
                <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Explore</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-900 tracking-tight mt-1">Browse by Land Type</h2>
              </div>
              <Link href="/listings" className="hidden sm:flex items-center gap-1 text-brand-500 hover:text-brand-700 text-sm font-semibold transition-colors">
                All Types <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { type: 'Ranch Land', label: 'Ranch', image: '/illustrations/cartoon-ranch.jpg' },
                { type: 'Hunting Land', label: 'Hunting', image: '/illustrations/cartoon-forest.jpg' },
                { type: 'Waterfront Property', label: 'Waterfront', image: '/illustrations/cartoon-coast.jpg' },
                { type: 'Mountain Property', label: 'Mountain', image: '/illustrations/cartoon-mountain.jpg' },
              ].map((item) => (
                <Link
                  key={item.type}
                  href={`/listings?type=${encodeURIComponent(item.type)}`}
                  className="group overflow-hidden rounded-2xl border border-brand-100 bg-white"
                >
                  <div className="h-36 overflow-hidden sm:h-48">
                    <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="px-3 py-3 text-lg font-semibold text-brand-900">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ── BROWSE BY STATE ── */}
      <section className="bg-white border-y border-brand-100 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Search Your Area</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-1">Popular States for Land</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-brand-100">
            {['Texas','Florida','Montana','Colorado','Tennessee','Oklahoma','Georgia','Arizona'].map((state) => (
              <Link key={state} href={`/listings?state=${state}`}
                className="group border-brand-100 border-b sm:[&:nth-child(4n)]:border-r-0 border-r px-5 py-6 hover:bg-brand-900 transition-colors">
                <div className="text-[11px] uppercase tracking-[0.18em] text-brand-400 group-hover:text-white/60">State</div>
                <div className="mt-2 text-xl text-brand-900 group-hover:text-white">{state}</div>
              </Link>
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
      <section className="bg-brand-50 border-b border-brand-100 py-10 sm:py-12">
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
              { step: '01', title: 'Create an account', desc: 'Sign up with email. There is no fee to start.' },
              { step: '02', title: 'Post the parcel', desc: 'Add photos, price, acreage, and location. It is public immediately.' },
              { step: '03', title: 'Talk to buyers', desc: 'Inquiries come to you. You negotiate and close on your own terms.' },
            ].map((s, i) => (
              <AnimateIn key={s.step} delay={i * 120}>
                <div className="relative bg-white border border-brand-100 p-6 z-10">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-brand-400 mb-4">{s.step}</div>
                  <h3 className="text-brand-900 text-2xl mb-2">{s.title}</h3>
                  <p className="text-brand-500 text-sm leading-relaxed">{s.desc}</p>
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
      <section className="bg-white py-10 sm:py-12 border-b border-brand-100">
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
      <section className="bg-brand-50 border-b border-brand-100 py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">The Marketplace</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-1">Why Buyers & Sellers Choose Us</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-brand-200 bg-white">
            {[
              { title: 'Direct', desc: 'Buyers and sellers message each other. This site is not the broker.' },
              { title: 'Search', desc: 'Filter by state, land type, price, and acreage.' },
              { title: 'Immediate', desc: 'A new listing is public as soon as the seller submits it.' },
              { title: 'Financing', desc: 'Sellers can offer owner financing and skip the bank.' },
            ].map((item) => (
              <div key={item.title} className="p-6 border-brand-200 border-b lg:border-b-0 lg:border-r last:border-0">
                <h4 className="text-brand-900 text-xl mb-2">{item.title}</h4>
                <p className="text-brand-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-blue text-white">
        <div className="grid lg:grid-cols-2">
          <div className="px-4 py-12 sm:px-10 sm:py-16">
            <p className="text-[11px] uppercase tracking-[0.28em] text-teal">For owners</p>
            <h2 className="mt-3 max-w-xl text-4xl text-white sm:text-5xl">List the land. Keep the conversation.</h2>
            <p className="mt-4 max-w-xl text-white/80">
              Post your parcel and buyers contact you directly. There is no listing fee and no commission from this site.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/register" className="rounded-md bg-white px-6 py-3 text-center font-semibold text-blue">
                List your land
              </Link>
              <Link href="/listings" className="rounded-md border border-white/40 px-6 py-3 text-center font-semibold text-white">
                Browse listings
              </Link>
            </div>
          </div>
          <img src="/illustrations/cartoon-coast.jpg" alt="" className="h-56 w-full object-cover sm:h-72 lg:h-full" />
        </div>
      </section>
    </>
  );
}
