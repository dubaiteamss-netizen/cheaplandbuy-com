import Link from 'next/link';
import { CheckCircle, Users, TrendingUp, Star, DollarSign } from 'lucide-react';

export default function SellPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-600 py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Sell Your Land on<br /><span className="text-gold">CheapLandBuy.com</span>
        </h1>
        <p className="text-white/75 text-xl mb-10 max-w-xl mx-auto">
          Reach 50,000+ motivated land buyers every month. List your land free and start getting inquiries within 48 hours.
        </p>
        <Link href="/auth/register" className="btn-gold text-lg px-10 py-4">
          List Your Land Free →
        </Link>
        <p className="text-white/50 text-sm mt-4">No credit card required. No commissions taken.</p>
      </section>

      {/* Stats */}
      <div className="bg-brand-800 py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-10">
          {[
            { n: '50,000+', l: 'Monthly Buyers' },
            { n: '48 hrs',  l: 'Avg. First Inquiry' },
            { n: '$0',      l: 'Listing Fee' },
            { n: '0%',      l: 'Commission' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-gold font-extrabold text-2xl">{s.n}</div>
              <div className="text-white/55 text-xs uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-brand-900 text-center mb-12">How Selling Works</h2>
        <div className="space-y-8">
          {[
            { n: 1, icon: '👤', t: 'Create Your Free Account', d: 'Sign up in 2 minutes. Just your name, email, and a password. No fees, no contracts.' },
            { n: 2, icon: '📸', t: 'Post Your Listing',        d: 'Fill out our simple form — title, acreage, price, location, description, and up to 20 photos. Takes about 10 minutes.' },
            { n: 3, icon: '🔍', t: 'Buyers Find Your Land',    d: 'Your listing shows up in search results immediately. Buyers filter by state, type, price and acreage.' },
            { n: 4, icon: '💬', t: 'Receive Inquiries',        d: 'Interested buyers fill out a contact form. You get their info directly to your email — no middleman.' },
            { n: 5, icon: '🤝', t: 'Close the Deal',           d: 'Communicate directly with buyers and close on your own terms. We never take a commission.' },
          ].map(s => (
            <div key={s.n} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-700 text-white rounded-full flex items-center justify-center font-black text-lg">
                {s.n}
              </div>
              <div>
                <div className="text-2xl mb-1">{s.icon}</div>
                <h3 className="font-bold text-brand-900 text-lg mb-1">{s.t}</h3>
                <p className="text-brand-500 text-sm leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-brand-50 border-y border-brand-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-brand-900 mb-4">Simple, Free Pricing</h2>
          <p className="text-brand-400 mb-10">No tricks, no hidden fees. List your land and keep 100% of the sale price.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="card border-2 border-brand-200">
              <div className="text-3xl font-extrabold text-brand-800 mb-1">Free</div>
              <p className="text-brand-400 text-sm mb-5">Forever. No credit card needed.</p>
              <ul className="space-y-3">
                {[
                  'Unlimited listings',
                  'Buyer inquiries to your email',
                  'Listing management dashboard',
                  'Up to 10 photos per listing',
                  'Visible to all buyers',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-brand-700">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="btn-primary w-full text-center mt-6 block">
                Get Started Free
              </Link>
            </div>
            <div className="card border-2 border-gold bg-gradient-to-br from-white to-brand-50">
              <div className="inline-block bg-gold text-brand-900 text-xs font-bold px-3 py-1 rounded-full mb-3">Coming Soon</div>
              <div className="text-3xl font-extrabold text-brand-800 mb-1">Pro <span className="text-lg text-brand-400">$19/mo</span></div>
              <p className="text-brand-400 text-sm mb-5">For serious sellers.</p>
              <ul className="space-y-3">
                {[
                  'Everything in Free',
                  'Featured listing placement',
                  'Up to 50 photos per listing',
                  'Priority buyer inbox',
                  'Analytics dashboard',
                  'Social media promotion',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-brand-700">
                    <CheckCircle size={16} className="text-gold flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled className="btn-secondary w-full text-center mt-6 opacity-60 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-700 py-16 text-center px-4">
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Sell Your Land?</h2>
        <p className="text-white/70 mb-8 text-lg">Create your free account and post your first listing today.</p>
        <Link href="/auth/register" className="btn-gold text-base px-10 py-4">
          Start Listing Free →
        </Link>
      </section>
    </div>
  );
}
