import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '../lib/supabase-server';
import { BLOG_POSTS } from '../lib/blog-data';

const BASE = 'https://cheaplandbuy.com';

const STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
  'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
  'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
  'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const LAND_TYPES = [
  'Ranch Land','Hunting Land','Recreational Land','Farmland / Agricultural',
  'Residential Lots','Wooded / Timber Land','Waterfront Property',
  'Mountain Property','Desert Land','Horse Property','Homestead',
  'Raw / Undeveloped Land','Commercial Land',
];

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
    { url: `${BASE}/find-agent`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  ];

  // State landing pages
  const statePages: MetadataRoute.Sitemap = STATES.map(state => ({
    url: `${BASE}/listings?state=${encodeURIComponent(state)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Land type pages
  const typePages: MetadataRoute.Sitemap = LAND_TYPES.map(type => ({
    url: `${BASE}/listings?type=${encodeURIComponent(type)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Individual listing pages from DB
  let listingPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'active');
    if (data) {
      listingPages = data.map(l => ({
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

  return [...staticPages, ...statePages, ...typePages, ...blogPages, ...listingPages];
}
