'use client';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

function getSavedIds(): string[] {
  try { return JSON.parse(localStorage.getItem('clb_favorites') ?? '[]'); }
  catch { return []; }
}
function persistSaved(ids: string[]) {
  localStorage.setItem('clb_favorites', JSON.stringify(ids));
  window.dispatchEvent(new Event('clb-favorites-changed'));
}

export default function FavoriteButton({
  listingId,
  size = 'sm',
  className = '',
}: {
  listingId: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const [saved,  setSaved]  = useState(false);
  const [bounce, setBounce] = useState(false);
  const [ready,  setReady]  = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setSaved(getSavedIds().includes(listingId));
    setReady(true);
    const handler = () => setSaved(getSavedIds().includes(listingId));
    window.addEventListener('clb-favorites-changed', handler);
    return () => window.removeEventListener('clb-favorites-changed', handler);
  }, [listingId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const current = getSavedIds();
    const next = current.includes(listingId)
      ? current.filter(id => id !== listingId)
      : [...current, listingId];
    persistSaved(next);
    setSaved(next.includes(listingId));
    if (next.includes(listingId)) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }
  }

  if (!ready) return null;

  const iconSize = size === 'md' ? 20 : 15;
  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from saved' : 'Save listing'}
      title={saved ? 'Remove from saved' : 'Save listing'}
      className={`flex items-center justify-center rounded-full border transition-all duration-200
        ${size === 'md' ? 'w-11 h-11' : 'w-8 h-8'}
        ${saved
          ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
          : 'bg-white/90 text-brand-300 border-brand-100 hover:text-red-400 hover:border-red-200'
        }
        ${bounce ? 'scale-125' : 'scale-100'}
        shadow-sm ${className}`}
    >
      <Heart
        size={iconSize}
        className={`transition-all duration-200 ${saved ? 'fill-red-500 text-red-500' : ''}`}
      />
    </button>
  );
}
