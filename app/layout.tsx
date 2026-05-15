import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export const metadata: Metadata = {
  title: 'CheapLandBuy.com – Find Affordable Land For Sale Nationwide',
  description: 'Browse thousands of affordable land listings across all 50 states. Ranch land, hunting land, residential lots, farmland, and more. Buy or sell land today.',
  keywords: 'cheap land for sale, affordable land, land listings, buy land, sell land, ranch land, hunting land',
  openGraph: {
    title: 'CheapLandBuy.com',
    description: 'Find affordable land for sale anywhere in America',
    url: 'https://cheaplandbuy.com',
    siteName: 'CheapLandBuy.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* pb-16 on mobile so content isn't hidden behind bottom nav */}
        <main className="pb-16 md:pb-0">{children}</main>
        <div className="pb-16 md:pb-0">
          <Footer />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
