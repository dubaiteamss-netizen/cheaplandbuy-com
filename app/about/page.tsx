import Link from 'next/link';
import { MapPin, Users, Shield, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'About Us | CheapLandBuy.com',
  description: 'Learn about CheapLandBuy.com — an independent online land marketplace connecting buyers and sellers across the United States.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-700 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">About CheapLandBuy.com</h1>
          <p className="text-white/70 text-base">Independent. Direct. Affordable.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* About */}
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8">
          <h2 className="text-xl font-extrabold text-brand-900 mb-4">Who We Are</h2>
          <div className="space-y-4 text-brand-600 leading-relaxed">
            <p>
              CheapLandBuy.com is an independent online land marketplace created to connect land buyers and sellers directly.
            </p>
            <p>
              We provide a platform where users can easily post land listings, explore properties, communicate with sellers, and find affordable land opportunities across the USA.
            </p>
            <p>
              Our goal is to simplify the land buying and selling process by offering a user-friendly marketplace focused on vacant land, investment properties, rural acreage, and residential lots.
            </p>
            <p>
              We believe land ownership should be accessible to everyone. Our platform helps individuals, investors, and property owners connect directly without complicated processes.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8">
          <h2 className="text-xl font-extrabold text-brand-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin,      title: 'Nationwide Listings',       desc: 'Land listings across all 50 United States.' },
              { icon: Users,       title: 'Direct Communication',      desc: 'Buyers and sellers connect without middlemen.' },
              { icon: TrendingUp,  title: 'Affordable Opportunities',  desc: 'Budget-friendly properties for every type of buyer.' },
              { icon: Shield,      title: 'Owner Financing',           desc: 'Find listings with flexible owner-financing options.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 bg-brand-50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-900 text-sm mb-0.5">{title}</h3>
                  <p className="text-brand-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {[
              'Easy property browsing and search tools',
              'Simple listing submission for sellers',
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-brand-600 text-sm">
                <span className="text-green-500 font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-brand-500 text-sm leading-relaxed border-t border-brand-100 pt-5">
            We continue working to build a trusted and growing land marketplace for buyers, sellers, and investors nationwide.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-brand-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-extrabold text-white mb-2">Ready to Get Started?</h2>
          <p className="text-white/70 text-sm mb-6">Browse listings or post your land today — it's free.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="btn-gold text-sm py-2.5 px-6">Browse Listings</Link>
            <Link href="/auth/register" className="border-2 border-white/40 hover:border-white text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-all">
              List Your Land Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
