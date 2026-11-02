import Link from 'next/link';
import { CheckCircle, DollarSign, Users, Zap, Globe, Camera, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Sell Your Land Free — List in Minutes',
  description: 'List your land for free on CheapLandBuy.com. Reach motivated buyers across all 50 states. No commission, no listing fees. Owner financing welcome.',
  alternates: { canonical: 'https://cheaplandbuy.com/sell' },
};

const FAQS = [
  { q: 'How much does it cost to list my land?',
    a: 'Completely free. We charge zero listing fees. You keep 100% of the sale price.' },
  { q: 'When does my listing go live?',
    a: 'As soon as you submit it. There is no review queue. You can edit the price, photos, and description anytime from your dashboard.' },
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
      <section className="relative bg-brand-900 py-24 px-4 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative max-w-4xl">
        <p className="text-gold text-[11px] uppercase tracking-[0.28em] mb-4">No commission</p>
        <h1 className="text-4xl sm:text-6xl text-white max-w-3xl leading-[0.95] mb-5">
          Sell your land directly.
        </h1>
        <p className="text-white/75 text-lg max-w-xl mb-10">
          List your property in minutes. Buyers contact you. There is no fee and no commission from this site.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/auth/register" className="bg-white text-brand-900 font-semibold px-6 py-3 rounded-md text-center">
            List your land
          </Link>
          <Link href="/auth/login" className="border border-white/40 text-white font-semibold px-6 py-3 rounded-md text-center">
            Sign in
          </Link>
        </div>
        </div>
      </section>

      <div className="bg-white border-b border-brand-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4">
          {[
            { n: '50', l: 'States' },
            { n: '$0', l: 'To list' },
            { n: 'Live', l: 'On submit' },
            { n: '0%', l: 'Commission' },
          ].map((item) => (
            <div key={item.l} className="py-6">
              <div className="text-2xl text-brand-900">{item.n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-brand-400">{item.l}</div>
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
            { icon: '📬', step: 3, title: 'Receive Buyer Inquiries', desc: 'Your listing is public immediately. Buyers contact you directly, and you close the deal yourself.' },
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
              { icon: <Users size={22} />,          title: 'Direct Buyer Contact',  desc: 'Buyers search by state, price, and land type, then email you from the listing.' },
              { icon: <Camera size={22} />,         title: 'Photo Gallery',         desc: 'Upload up to 20 photos so buyers can see the parcel before they write.' },
              { icon: <Globe size={22} />,          title: 'SEO Optimized',         desc: 'Each listing has its own page that search engines can index.' },
              { icon: <Zap size={22} />,            title: 'Live Immediately',      desc: 'Your listing is public as soon as you submit it. No approval wait.' },
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
      <section className="bg-brand-900 py-16 text-center px-4">
        <h2 className="text-3xl sm:text-5xl text-white mb-4">Ready to list your land?</h2>
        <p className="text-white/75 text-lg mb-8 max-w-md mx-auto">
          It takes less than 10 minutes. Your listing is public as soon as you submit it.
        </p>
        <Link href="/auth/register" className="btn-gold text-base px-10 py-4 inline-block">
          Create Free Account →
        </Link>
      </section>
    </div>
  );
}
