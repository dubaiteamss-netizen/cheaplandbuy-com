import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, getBlogPost, type Section } from '../../../lib/blog-data';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `https://cheaplandbuy.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://cheaplandbuy.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.dateISO,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

function renderSection(s: Section, i: number) {
  switch (s.t) {
    case 'h2':
      return <h2 key={i} className="text-xl sm:text-2xl font-extrabold text-brand-800 mt-10 mb-4 leading-tight">{s.v}</h2>;
    case 'h3':
      return <h3 key={i} className="text-lg font-bold text-brand-700 mt-7 mb-3 leading-snug">{s.v}</h3>;
    case 'p':
      return <p key={i} className="text-brand-600 leading-relaxed mb-4">{s.v}</p>;
    case 'bold':
      return <p key={i} className="text-brand-800 font-semibold leading-relaxed mb-4">{s.v}</p>;
    case 'ul':
      return (
        <ul key={i} className="mb-5 space-y-2">
          {s.v.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-brand-600 leading-relaxed">
              <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className="mb-5 space-y-2">
          {s.v.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-brand-600 leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-800 text-white text-xs font-bold flex items-center justify-center mt-0.5">{j + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'tip':
      return (
        <div key={i} className="my-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl px-5 py-4">
          <div className="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">{s.label ?? 'Pro Tip'}</div>
          <p className="text-emerald-800 text-sm leading-relaxed">{s.v}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { '@type': 'Organization', name: 'CheapLandBuy.com', url: 'https://cheaplandbuy.com' },
    publisher: { '@type': 'Organization', name: 'CheapLandBuy.com', logo: { '@type': 'ImageObject', url: 'https://cheaplandbuy.com/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://cheaplandbuy.com/blog/${post.slug}` },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    url: `https://cheaplandbuy.com/blog/${post.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cheaplandbuy.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cheaplandbuy.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://cheaplandbuy.com/blog/${post.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* ── HERO IMAGE with Ken Burns animation ── */}
      <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 bg-brand-900">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover blog-hero-zoom"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Category + breadcrumb */}
        <div className="absolute top-5 left-5">
          <nav className="flex items-center gap-2 text-white/60 text-xs">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className={`px-2 py-0.5 rounded-full font-semibold ${post.categoryColor}`}>{post.category}</span>
          </nav>
        </div>
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 max-w-4xl">
          <h1 className="text-white text-xl sm:text-3xl font-extrabold leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>CheapLandBuy.com</span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="bg-brand-50 text-brand-600 text-xs font-medium px-3 py-1 rounded-full border border-brand-100">
              #{tag}
            </span>
          ))}
        </div>

        {/* Excerpt lead */}
        <p className="text-brand-700 text-base sm:text-lg leading-relaxed font-medium border-l-4 border-gold pl-4 mb-8 bg-brand-50 py-3 pr-4 rounded-r-xl">
          {post.excerpt}
        </p>

        {/* Body sections */}
        <div className="blog-content">
          {post.body.map((section, i) => renderSection(section, i))}
        </div>

        {/* CTA box */}
        <div className="mt-12 bg-brand-800 rounded-2xl p-7 text-center text-white">
          <h3 className="text-lg font-bold mb-2">Start Browsing Land Today</h3>
          <p className="text-white/65 text-sm mb-5">Thousands of affordable listings across all 50 states. Many with owner financing available.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="bg-gold text-brand-900 font-bold px-6 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm">
              Browse Listings →
            </Link>
            <Link href="/faq" className="bg-white/10 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-sm">
              Land Buying FAQ
            </Link>
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-14">
          <h2 className="text-xl font-extrabold text-brand-800 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map(rp => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-white rounded-xl border border-brand-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-32 overflow-hidden bg-brand-900">
                  <Image
                    src={rp.image}
                    alt={rp.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rp.categoryColor}`}>{rp.category}</span>
                  <p className="mt-1.5 text-brand-800 text-sm font-semibold leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">{rp.title}</p>
                  <p className="text-brand-400 text-xs mt-1">{rp.readTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
