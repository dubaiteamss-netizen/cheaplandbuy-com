'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Suspense } from 'react';

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85',
    label: '🌊 Florida Beach Land — FL',
    overlay: 'linear-gradient(135deg,rgba(0,100,180,0.58) 0%,rgba(0,60,120,0.35) 50%,rgba(255,180,0,0.08) 100%)',
  },
  {
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=85',
    label: '🌴 Florida Sunshine Land — FL',
    overlay: 'linear-gradient(135deg,rgba(0,100,180,0.55) 0%,rgba(0,80,140,0.32) 50%,rgba(255,180,0,0.08) 100%)',
  },
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85',
    label: '🌾 Farmland — Kansas',
    overlay: 'linear-gradient(135deg,rgba(10,74,47,0.65) 0%,rgba(10,74,47,0.38) 50%,rgba(0,0,0,0.12) 100%)',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85',
    label: '🏔️ Mountain Property — Colorado',
    overlay: 'linear-gradient(135deg,rgba(10,74,47,0.65) 0%,rgba(10,74,47,0.38) 50%,rgba(0,0,0,0.12) 100%)',
  },
];

const TOTAL = SLIDES.length + 1; // +1 for animated slide

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % TOTAL), 5000);
    return () => clearInterval(t);
  }, []);

  const isAnimSlide = current === SLIDES.length;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 520 }}>

      {/* Photo slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `url('${slide.url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0" style={{ background: slide.overlay }} />
        </div>
      ))}

      {/* Animated promotional slide */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: isAnimSlide ? 1 : 0 }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-anim-bg" />
        {/* Glow orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full hero-orb-gold" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full hero-orb-green" />

        {/* Animated content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="text-6xl mb-4 hero-float">🌎</div>
          <h2 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-3 drop-shadow-lg">
            Your Land.<br />
            <span className="text-gold">Your Legacy.</span><br />
            Your America.
          </h2>
          <p className="text-white/85 text-base sm:text-lg mb-6 max-w-md">
            Start with as little as $5,000 — own real land anywhere in the USA, no middleman.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['✓ No Hidden Fees','✓ Owner Financing','✓ All 50 States','✓ Verified Sellers'].map(t => (
              <span key={t} className="bg-white/12 border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Location label */}
      {!isAnimSlide && (
        <div className="absolute bottom-14 left-5 z-10 hidden sm:block">
          <span className="bg-black/30 border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
            {SLIDES[current]?.label}
          </span>
        </div>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 border-none cursor-pointer ${
              i === current ? 'bg-gold' : 'bg-white/40 hover:bg-white/70'
            }`}
            style={{ width: i === current ? 22 : 8, height: 6 }}
          />
        ))}
      </div>

      {/* Main content (shown on photo slides only) */}
      {!isAnimSlide && (
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/12 border border-white/25 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            🌿 Trusted by 8,000+ Land Buyers Nationwide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-lg">
            Find Affordable Land<br />
            <span className="text-gold">Anywhere in America</span>
          </h1>
          <p className="text-white/85 text-base sm:text-xl mb-8 max-w-xl mx-auto">
            Browse thousands of land listings from verified sellers across all 50 states.
          </p>
          <Suspense>
            <SearchBar />
          </Suspense>
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 mt-5 text-sm">
            <span className="text-white/50">Popular:</span>
            {['Florida Beach Lots','Texas Ranch Land','Hunting Land','Mountain Property','Farmland'].map(tag => (
              <Link key={tag} href={`/listings?q=${encodeURIComponent(tag)}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/85 hover:text-white px-3 py-1 rounded-full transition-all text-xs backdrop-blur-sm">
                {tag}
              </Link>
            ))}
          </div>
          <div className="flex sm:hidden gap-2 mt-5 overflow-x-auto pb-1 -mx-4 px-4">
            {['Florida Lots','Hunting Land','Ranch Land','Farmland','Mountain'].map(tag => (
              <Link key={tag} href={`/listings?q=${encodeURIComponent(tag)}`}
                className="flex-shrink-0 bg-white/15 border border-white/25 text-white/90 px-3 py-1.5 rounded-full text-xs font-semibold">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
