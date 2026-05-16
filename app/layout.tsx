import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export const metadata: Metadata = {
  metadataBase: new URL('https://cheaplandbuy.com'),
  title: {
    default: 'CheapLandBuy.com – Affordable Land For Sale Across America',
    template: '%s | CheapLandBuy.com',
  },
  description: 'Find affordable land for sale anywhere in America. Browse ranch land, hunting land, farmland, waterfront property, residential lots & more. Owner financing available. All 50 states.',
  keywords: [
    'cheap land for sale','affordable land for sale','land for sale','buy land',
    'ranch land for sale','hunting land for sale','farmland for sale',
    'waterfront land for sale','residential lots for sale','land listings',
    'owner financing land','land for sale by owner','cheap acreage for sale',
    'rural land for sale','undeveloped land for sale','land auction',
    'Texas land for sale','Florida land for sale','Colorado land for sale',
    'Montana land for sale','Tennessee land for sale',
  ],
  authors: [{ name: 'CheapLandBuy.com', url: 'https://cheaplandbuy.com' }],
  creator: 'CheapLandBuy.com',
  publisher: 'CheapLandBuy.com',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cheaplandbuy.com',
    siteName: 'CheapLandBuy.com',
    title: 'CheapLandBuy.com – Affordable Land For Sale Across America',
    description: 'Find affordable land for sale anywhere in America. Ranch land, hunting land, farmland, waterfront & more. Owner financing available.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'CheapLandBuy.com - Affordable Land For Sale' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CheapLandBuy.com – Affordable Land For Sale',
    description: 'Browse affordable land listings across all 50 states. Ranch, hunting, farm, waterfront & more.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://cheaplandbuy.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* pb-16 on mobile so content isn't hidden behind bottom nav */}
        <main className="pb-[72px] md:pb-0">{children}</main>
        <div className="pb-[72px] md:pb-0">
          <Footer />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
