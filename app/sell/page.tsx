import Link from 'next/link';
import { CheckCircle, DollarSign, Users, Zap, Globe, Camera, MessageSquare } from 'lucide-react';

const FAQS = [
  { q: 'How much does it cost to list my land?',
    a: 'Completely free. We charge zero listing fees. You keep 100% of the sale price.' },
  { q: 'How long does review take?',
    a: 'Most listings are reviewed and live within 24 hours, often faster.' },
  { q: 'How do buyers contact me?',
    a: 'Buyers fill out an inquiry form on your listing page. You receive an email with their contact info and message — then you connect directly.' },
  { q: 'Can I edit my listing after it goes live?',
    a: 'Yes — update price, photos, description, and details anytime from your dashboard.' },
  { q: 'What types of land can I list?',
    a: 'All types — raw land, farmland, ranches, hunting land, timber land, waterfront, mountain lots, residential lots, and more.' },
  { q: 'Do I need a real estate license?',
    a: 'No. We welcome private sellers listing their own property.' },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-600 py-20 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          🆓 100% Free to List — No Commission
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight mb-5">
          Sell Your Land Faster with <span className="text-gold">CheapLandBuy.com</span>
        </h1>
        <p className="text-white/75 text-xl max-w-xl mx-auto mb-10">
          Reach thousands of motivated land buyers nationwide. List your property in minutes, completely free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-gold text-base px-10 py-4">
            List Your Land Free →
          </Link>
          <Link href="/auth/login" className="border-2 border-white/40 hover:border-white text-white font-bold px-10 py-4 rounded-lg transition-all text-base">
            Already a Seller? Sign In
          </Link>
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <div className="bg-brand-800 py-4">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
          {[
            { n: '12,400+', l: 'Listings Posted' },
            { n: '8,200+',  l: 'Buyers Monthly' },
            { n: '48 hrs',  l: 'Avg First Inquiry' },
            { n: '$0',      l: 'Cost to List' },
          ].map((s, i, arr) => (
            <div key={s.l} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-gold font-extrabold text-2xl">{s.n}</div>
                <div className="text-white/55 text-xs uppercase tracking-wider">{s.l}</div>
              </div>
              {i < arr.length - 1 && <div className="h-8 w-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-brand-900">How Selling Works</h2>
          <p className="text-brand-400 mt-2">Go from signup to live listing in under 10 minutes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '👤', step: 1, title: 'Create Free Account', desc: 'Sign up with your email. No credit card, no fees. Takes about 2 minutes.' },
            { icon: '📋', step: 2, title: 'Fill Out Listing Form', desc: 'Add your property details, upload photos, set your price. Our 3-step form makes it easy.' },
            { icon: '📬', step: 3, title: 'Receive Buyer Inquiries', desc: 'Once approved, buyers contact you directly. You negotiate and close the deal yourself.' },
          ].map((s) => (
            <div key={s.step} className="card relative text-center border-t-4 border-brand-700">
              <div className="w-8 h-8 bg-brand-700 text-white rounded-full flex items-center justify-center text-sm font-black mx-auto mb-4">
                {s.step}
              </div>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-brand-900 text-lg mb-2">{s.title}</h3>
              <p className="text-brand-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-brand-50 border-y border-brand-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-brand-900 text-center mb-12">Everything You Need to Sell</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <DollarSign size={22} />,    title: 'Zero Fees Forever',     desc: 'Free to list, free to sell. No hidden charges, ever.' },
              { icon: <Users size={22} />,          title: 'Huge Buyer Audience',   desc: '50,000+ land buyers searching every month.' },
              { icon: <Camera size={22} />,         title: 'Photo Gallery',         desc: 'Upload up to 20 photos. Listings with photos get 5× more inquiries.' },
              { icon: <Globe size={22} />,          title: 'SEO Optimized',         desc: 'Listings show up on Google for local searches.' },
              { icon: <Zap size={22} />,            title: 'Fast Approval',         desc: 'Most listings reviewed and live within 24 hours.' },
              { icon: <MessageSquare size={22} />,  title: 'Direct Buyer Contact',  desc: 'Buyers email you directly. No middlemen on your deal.' },
            ].map(f => (
              <div key={f.title} className="card flex gap-4">
                <div className="text-brand-600 mt-0.5 flex-shrink-0">{f.icon}</div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">{f.title}</h4>
                  <p className="text-brand-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-brand-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="card">
              <h3 className="font-bold text-brand-900 mb-2 flex items-start gap-2">
                <span className="text-brand-500 mt-0.5 flex-shrink-0">Q.</span> {q}
              </h3>
              <p className="text-brand-500 text-sm leading-relaxed pl-5">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-brand-800 to-brand-600 py-16 text-center px-4">
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready to List Your Land?</h2>
        <p className="text-white/75 text-lg mb-8 max-w-md mx-auto">
          Join thousands of sellers reaching motivated buyers every day. It takes less than 10 minutes to go live.
        </p>
        <Link href="/auth/register" className="btn-gold text-base px-10 py-4 inline-block">
          Create Free Account →
        </Link>
      </section>
    </div>
  );
}
