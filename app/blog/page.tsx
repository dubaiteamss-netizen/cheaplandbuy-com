import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '../../lib/blog-data';

export const metadata: Metadata = {
  title: 'Land Buying & Selling Blog – Tips, Guides & Market Insights',
  description: 'Expert guides on buying cheap land in the USA, owner financing, land investment, hunting land, homesteading, and selling land fast. Updated regularly.',
  keywords: ['land buying guide', 'cheap land tips', 'land investment blog', 'owner financing land', 'hunting land guide', 'homestead land', 'sell land fast'],
  alternates: { canonical: 'https://cheaplandbuy.com/blog' },
  openGraph: {
    title: 'Land Blog – Guides & Tips | CheapLandBuy.com',
    description: 'Expert guides on buying, investing in, and selling land across the USA.',
    url: 'https://cheaplandbuy.com/blog',
    type: 'website',
  },
};

const blogListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'CheapLandBuy.com Land Blog',
  url: 'https://cheaplandbuy.com/blog',
  description: 'Expert guides on buying, financing, and selling land across the USA.',
  blogPost: BLOG_POSTS.map(p => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    url: `https://cheaplandbuy.com/blog/${p.slug}`,
    datePublished: p.dateISO,
    image: p.image,
    author: { '@type': 'Organization', name: 'CheapLandBuy.com' },
    keywords: p.tags.join(', '),
  })),
};

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }} />

      {/* ── HEADER ── */}
      <div className="bg-brand-800 text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">📰</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Land Buying &amp; Selling Blog</h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Expert guides on buying cheap land, owner financing, land investment, homesteading, and selling land fast.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── FEATURED POST ── */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-14">
          <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[16/7] bg-brand-900">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="object-cover blog-hero-zoom"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${featured.categoryColor}`}>
                {featured.category}
              </span>
              <h2 className="text-white text-xl sm:text-3xl font-extrabold leading-tight mb-2 group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-white/70 text-sm sm:text-base line-clamp-2 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-white/50 text-xs">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} min read</span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 blog-card-fadein"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Card image with zoom on hover */}
              <div className="relative overflow-hidden h-44 bg-brand-900 flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                  {post.category}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="font-bold text-brand-800 text-base leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-brand-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-50">
                  <div className="flex items-center gap-2 text-brand-400 text-xs">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} min</span>
                  </div>
                  <span className="text-gold font-bold text-xs group-hover:translate-x-1 transition-transform inline-block">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 bg-brand-800 rounded-2xl p-8 text-center text-white">
          <div className="text-3xl mb-3">🏕️</div>
          <h3 className="text-xl font-bold mb-2">Ready to Find Your Land?</h3>
          <p className="text-white/65 text-sm mb-6">Browse thousands of affordable listings across all 50 states.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="bg-gold text-brand-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors">
              Browse Listings →
            </Link>
            <Link href="/faq" className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              Land Buying FAQ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
