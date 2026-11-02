'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80',
    label: 'Farmland',
    place: 'Kansas',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
    label: 'Mountain land',
    place: 'Colorado',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    label: 'Coastal land',
    place: 'Florida',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(index => (index + 1) % SLIDES.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-900" style={{ minHeight: 680 }}>
      {SLIDES.map((slide, index) => (
        <div
          key={slide.url}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: index === current ? 1 : 0,
            backgroundImage: `url('${slide.url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24">
        <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.28em] mb-5">
          Direct land marketplace
        </p>
        <h1 className="max-w-3xl text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6">
          Land for sale,
          <span className="block">without the broker.</span>
        </h1>
        <p className="max-w-xl text-white/80 text-base sm:text-lg leading-relaxed mb-8">
          Private sellers list acreage across all 50 states. Search by place, price, and land type. Listing is free, and a new parcel is public as soon as it is submitted.
        </p>
        <Suspense>
          <SearchBar />
        </Suspense>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
          <span>No commission</span>
          <span className="text-white/30">/</span>
          <span>$0 to list</span>
          <span className="text-white/30">/</span>
          <span>Owner financing tools</span>
        </div>
        <div className="mt-10 flex items-center gap-4 text-white/80 text-xs uppercase tracking-[0.22em]">
          <span>{SLIDES[current].place}</span>
          <span className="h-px w-10 bg-white/40" />
          <span>{SLIDES[current].label}</span>
          <div className="ml-auto flex gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.place}
                type="button"
                aria-label={`Show ${slide.place}`}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all ${index === current ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {['Texas ranch', 'Florida acreage', 'Hunting land', 'Mountain property'].map(tag => (
            <Link
              key={tag}
              href={`/listings?q=${encodeURIComponent(tag)}`}
              className="text-xs text-white/90 border border-white/25 px-3 py-1.5 hover:bg-white hover:text-brand-900 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
