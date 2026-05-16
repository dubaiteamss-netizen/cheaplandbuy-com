import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/auth/reset-password'],
      },
    ],
    sitemap: 'https://cheaplandbuy.com/sitemap.xml',
    host: 'https://cheaplandbuy.com',
  };
}
