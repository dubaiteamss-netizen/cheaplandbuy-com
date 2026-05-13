'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-brand-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🏕️</span>
            <span className="text-white font-extrabold text-xl tracking-tight">
              CheapLandBuy<span className="text-gold font-light">.com</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/listings" className="text-white/85 hover:text-white text-sm font-medium transition-colors">
              Browse Land
            </Link>
            <Link href="/sell" className="text-white/85 hover:text-white text-sm font-medium transition-colors">
              Sell Land
            </Link>
            <Link href="/listings?type=Hunting+Land" className="text-white/85 hover:text-white text-sm font-medium transition-colors">
              Hunting Land
            </Link>
            <Link href="/listings?type=Ranch+Land" className="text-white/85 hover:text-white text-sm font-medium transition-colors">
              Ranch Land
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login"
              className="text-white/90 hover:text-white border border-white/40 hover:border-white px-4 py-1.5 rounded-md text-sm font-medium transition-all">
              Sign In
            </Link>
            <Link href="/auth/register"
              className="bg-gold hover:bg-gold-dark text-brand-900 font-bold px-4 py-1.5 rounded-md text-sm transition-all hover:-translate-y-px">
              + List Your Land
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-800 border-t border-white/10 px-4 py-4 space-y-3">
          <Link href="/listings" className="block text-white/85 hover:text-white font-medium py-1" onClick={() => setOpen(false)}>Browse Land</Link>
          <Link href="/sell" className="block text-white/85 hover:text-white font-medium py-1" onClick={() => setOpen(false)}>Sell Land</Link>
          <Link href="/auth/login" className="block text-white/85 hover:text-white font-medium py-1" onClick={() => setOpen(false)}>Sign In</Link>
          <Link href="/auth/register" className="block bg-gold text-brand-900 font-bold text-center py-2 rounded-md" onClick={() => setOpen(false)}>
            + List Your Land
          </Link>
        </div>
      )}
    </nav>
  );
}
