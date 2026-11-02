export const dynamic = 'force-dynamic';
import { MetadataRoute } from 'next';
import { createServerSupabaseClient, isPublishedListingId } from '../lib/supabase-server';
import { BLOG_POSTS } from '../lib/blog-data';

const BASE = 'https://cheaplandbuy.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/listings`,    lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${BASE}/sell`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/faq`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/find-agent`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Individual listing pages from DB
  let listingPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'active');
    if (data) {
      listingPages = data.filter(l => isPublishedListingId(String(l.id))).map(l => ({
        url: `${BASE}/listings/${l.id}`,
        lastModified: new Date(l.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      }));
    }
  } catch {}

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.dateISO),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages, ...listingPages];
}
