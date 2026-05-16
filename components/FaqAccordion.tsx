'use client';
import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  icon: string;
  items: FaqItem[];
}

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen(prev => (prev === key ? null : key));

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.title}>
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{cat.icon}</span>
            <h2 className="text-xl font-bold text-brand-800">{cat.title}</h2>
          </div>

          <div className="divide-y divide-brand-100 border border-brand-100 rounded-2xl overflow-hidden shadow-sm">
            {cat.items.map((item, idx) => {
              const key = `${cat.title}-${idx}`;
              const isOpen = open === key;
              return (
                <div key={key} className={`transition-colors ${isOpen ? 'bg-brand-50' : 'bg-white hover:bg-gray-50'}`}>
                  <button
                    onClick={() => toggle(key)}
                    className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-semibold text-sm sm:text-base leading-snug ${isOpen ? 'text-brand-800' : 'text-brand-700'}`}>
                      {item.q}
                    </span>
                    <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isOpen ? 'border-gold bg-gold text-white rotate-45' : 'border-brand-300 text-brand-400'}`}>
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                        <path d="M6 2v8M2 6h8" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-brand-600 text-sm leading-relaxed border-t border-brand-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
