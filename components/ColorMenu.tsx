'use client';

import { useEffect, useRef, useState } from 'react';
import { Palette } from 'lucide-react';

export const THEMES = [
  { id: 'cedar', name: 'Cedar', note: 'Pine and clay', swatch: '#1B4633', accent: '#E6B15A' },
  { id: 'mesa', name: 'Mesa', note: 'Clay and sand', swatch: '#8C4720', accent: '#F0C36A' },
  { id: 'harbor', name: 'Harbor', note: 'Deep water', swatch: '#124656', accent: '#F2C14E' },
  { id: 'ink', name: 'Ink', note: 'Charcoal and amber', swatch: '#181C2A', accent: '#F0B429' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

export function applyTheme(id: string) {
  const theme = THEMES.some(item => item.id === id) ? id : 'cedar';
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('clb-theme', theme);
  } catch {}
  return theme;
}

export default function ColorMenu() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>('cedar');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme || 'cedar';
    setCurrent(saved);
  }, []);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function choose(id: string) {
    setCurrent(applyTheme(id));
    setOpen(false);
  }

  const active = THEMES.find(item => item.id === current) ?? THEMES[0];

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
        className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors"
        title="Color palette"
      >
        <span className="flex -space-x-1" aria-hidden>
          <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ background: active.swatch }} />
          <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ background: active.accent }} />
        </span>
        <Palette size={14} />
        <span className="text-xs font-semibold tracking-wide">{active.name}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Site color palette"
          className="absolute right-0 mt-2 w-64 rounded-2xl border border-brand-100 bg-white p-2 shadow-2xl z-[60]"
        >
          <p className="px-2 pt-1 pb-2 text-[11px] font-bold uppercase tracking-widest text-brand-400">
            Color palette
          </p>
          {THEMES.map(theme => {
            const selected = theme.id === current;
            return (
              <button
                key={theme.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => choose(theme.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors ${
                  selected ? 'bg-brand-50' : 'hover:bg-brand-50'
                }`}
              >
                <span className="flex shrink-0 -space-x-1" aria-hidden>
                  <span className="w-6 h-6 rounded-full border border-black/10" style={{ background: theme.swatch }} />
                  <span className="w-6 h-6 rounded-full border border-black/10" style={{ background: theme.accent }} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-brand-900">{theme.name}</span>
                  <span className="block text-xs text-brand-400">{theme.note}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
