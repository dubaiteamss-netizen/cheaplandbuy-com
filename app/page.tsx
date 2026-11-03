import Link from 'next/link';
import CartoonHero from '../components/CartoonHero';
import ListingCard from '../components/ListingCard';
import ListingMap from '../components/ListingMap';
export const dynamic = 'force-dynamic'; // Skip static generation to avoid build-time Supabase errors

import { createServerSupabaseClient, isPublishedListingId, isSupabaseConfigured } from '../lib/supabase-server';
import { mockListings } from '../lib/mock-listings';

async function getFeaturedListings() {
  if (!isSupabaseConfigured()) {
    return [...mockListings]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 9);
  }
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(9);
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

      <div className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-4 scrollbar-hide">
          {[
            { type: 'Ranch Land', label: 'Ranch', image: '/illustrations/cartoon-ranch.jpg' },
            { type: 'Hunting Land', label: 'Hunting', image: '/illustrations/cartoon-forest.jpg' },
            { type: 'Waterfront Property', label: 'Water', image: '/illustrations/cartoon-coast.jpg' },
            { type: 'Mountain Property', label: 'Mountain', image: '/illustrations/cartoon-mountain.jpg' },
            { type: 'Farmland / Agricultural', label: 'Farm', image: '/illustrations/cartoon-ranch.jpg' },
          ].map((item) => (
            <Link key={item.type} href={`/listings?type=${encodeURIComponent(item.type)}`} className="flex w-20 flex-shrink-0 flex-col items-center gap-2">
              <img src={item.image} alt="" className="h-16 w-16 rounded-full object-cover ring-2 ring-teal" />
              <span className="text-xs font-semibold text-brand-800">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-4 lg:px-6">
          <div>
            <div className="mb-3 flex items-end justify-between">
              <h2 className="text-2xl text-brand-900">Just listed</h2>
              <Link href="/listings" className="text-sm font-semibold text-blue">See all</Link>
            </div>
            {featured.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                {featured.map((listing: any) => (
                  <ListingCard key={listing.id} listing={listing} variant="tile" />
                ))}
              </div>
            ) : (
              <div className="bg-white px-4 py-16 text-center">
                <h2 className="text-2xl text-brand-800">No listings to show yet</h2>
                <p className="mt-2 text-sm text-brand-400">When a seller posts land, it appears here right away.</p>
                <Link href="/auth/register" className="btn-primary mt-6 inline-block">List your land</Link>
              </div>
            )}
          </div>
          <aside className="sticky top-[84px] hidden h-[calc(100vh-100px)] overflow-hidden rounded-2xl border border-brand-100 lg:block">
            <ListingMap listings={featured} />
          </aside>
        </div>
      </section>

      <section className="bg-white px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-3 text-xl text-brand-900">Shop by state</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['Texas','Florida','Montana','Colorado','Tennessee','Oklahoma','Georgia','Arizona','California','Missouri'].map((state) => (
              <Link key={state} href={`/listings?state=${state}`} className="flex-shrink-0 rounded-full bg-blue/10 px-4 py-2 text-sm font-semibold text-blue">
                {state}
              </Link>
            ))}
            <Link href="/listings" className="flex-shrink-0 rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white">All states</Link>
          </div>
        </div>
      </section>

      <section className="bg-blue text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="px-4 py-10 sm:px-8">
            <h2 className="text-3xl text-white sm:text-4xl">List the land. Keep the conversation.</h2>
            <p className="mt-3 max-w-md text-white/80">No listing fee. Buyers contact you directly.</p>
            <Link href="/auth/register" className="mt-5 inline-block rounded-md bg-white px-5 py-3 font-semibold text-blue">List your land</Link>
          </div>
          <img src="/illustrations/cartoon-coast.jpg" alt="" className="h-40 w-full object-cover sm:h-52 lg:h-full" />
        </div>
      </section>
    </>
  );
}
