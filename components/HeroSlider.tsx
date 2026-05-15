'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Suspense } from 'react';

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85',
    label: 'Farmland & Agricultural',
    state: 'Kansas',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85',
    label: 'Mountain Property',
    state: 'Colorado',
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85',
    label: 'Wooded Timber Land',
    state: 'Tennessee',
  },
  {
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=85',
    label: 'Ranch Land',
    state: 'Texas',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
      {/* Background slides */}
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
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Slide label bottom-left */}
      <div className="absolute bottom-24 left-6 z-10 hidden sm:block">
        <span className="bg-black/40 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
          📍 {SLIDES[current].label} — {SLIDES[current].state}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          🌿 Trusted by 8,000+ Land Buyers Nationwide
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
          Find Affordable Land<br />
          <span className="text-gold">Anywhere in America</span>
        </h1>
        <p className="text-white/80 text-base sm:text-xl mb-8 max-w-xl mx-auto">
          Browse thousands of land listings from verified sellers across all 50 states.
        </p>
        <Suspense>
          <SearchBar />
        </Suspense>
        {/* Popular tags */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 mt-5 text-sm">
          <span className="text-white/50">Popular:</span>
          {['Texas Ranch Land','Florida Lots','Hunting Land','Mountain Property','Farmland'].map(tag => (
            <Link key={tag} href={`/listings?q=${encodeURIComponent(tag)}`}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/85 hover:text-white px-3 py-1 rounded-full transition-all text-xs backdrop-blur-sm">
              {tag}
            </Link>
          ))}
        </div>
        {/* Mobile quick-links */}
        <div className="flex sm:hidden gap-2 mt-5 overflow-x-auto pb-1 -mx-4 px-4">
          {['Hunting Land','Ranch Land','Farmland','Mountain Property','Wooded Land'].map(tag => (
            <Link key={tag} href={`/listings?type=${encodeURIComponent(tag)}`}
              className="flex-shrink-0 bg-white/15 border border-white/25 text-white/90 px-3 py-1.5 rounded-full text-xs font-semibold">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
