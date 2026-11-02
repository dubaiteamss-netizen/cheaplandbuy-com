'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, PlusCircle, LogOut, LayoutDashboard, Heart } from 'lucide-react';
import { createClient } from '../lib/supabase';

const supabase = createClient();

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen]     = useState(false);
  const [user, setUser]     = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoaded(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const navLinks = [
    { href: '/listings', label: 'Buy' },
    { href: '/sell', label: 'Sell' },
    { href: '/listings?finance=1', label: 'Financing' },
    { href: '/saved', label: 'Saved' },
    { href: '/blog', label: 'Guides' },
  ];

  const [savedCount, setSavedCount] = useState(0);
  useEffect(() => {
    function updateCount() {
      try {
        const ids = JSON.parse(localStorage.getItem('clb_favorites') ?? '[]');
        setSavedCount(ids.length);
      } catch { setSavedCount(0); }
    }
    updateCount();
    window.addEventListener('clb-favorites-changed', updateCount);
    return () => window.removeEventListener('clb-favorites-changed', updateCount);
  }, []);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    const path = href.split('?')[0];
    if (path === '/listings') return pathname === '/listings' && !href.includes('?');
    return pathname === path || pathname.startsWith(path + '/');
  }

  const linkClass = (href: string) =>
    `px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
      isActive(href) ? 'text-white underline decoration-teal decoration-2 underline-offset-8' : 'text-white/80 hover:text-white'
    }`;

  return (
    <nav className="bg-blue sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/icon.svg" alt="" width={28} height={28} className="flex-shrink-0 bg-white rounded-md" />
            <span className="font-semibold text-[15px] tracking-[0.14em] uppercase text-white">
              CheapLandBuy
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/saved"
              className="relative flex items-center justify-center w-9 h-9 text-white hover:bg-white/10 rounded-md transition-colors"
              title="Saved listings"
            >
              <Heart size={18} className={savedCount > 0 ? 'fill-white text-white' : ''} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount > 9 ? '9+' : savedCount}
                </span>
              )}
            </Link>

            {!loaded ? (
              <div className="w-24 h-8 bg-brand-50 rounded-md animate-pulse" />
            ) : user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium px-3 py-2">
                  <LayoutDashboard size={14} /> Account
                </Link>
                <Link href="/dashboard/new-listing" className="bg-white text-blue text-sm font-semibold flex items-center gap-1.5 py-2 px-4 rounded-md">
                  <PlusCircle size={14} /> List land
                </Link>
                <button onClick={signOut} className="p-2 text-white/70 hover:text-white" title="Sign out">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-white/90 hover:text-white text-sm font-medium px-3 py-2">
                  Sign in
                </Link>
                <Link href="/auth/register" className="bg-white text-blue text-sm font-semibold py-2.5 px-4 rounded-md">
                  List your land
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-brand-100 pb-4">
          <div className="px-4 pt-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`block px-3 py-3 text-sm font-semibold ${isActive(href) ? 'text-blue' : 'text-brand-800'}`}>
                {label}
              </Link>
            ))}
            <div className="border-t border-brand-100 pt-3 mt-3 space-y-1">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-3 text-brand-700 text-sm">
                    <LayoutDashboard size={15} /> Account
                  </Link>
                  <Link href="/dashboard/new-listing" onClick={() => setOpen(false)} className="btn-primary block text-center text-sm">
                    List land
                  </Link>
                  <button onClick={() => { signOut(); setOpen(false); }} className="flex items-center gap-2 px-3 py-3 text-brand-500 text-sm w-full">
                    <LogOut size={15} /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="block px-3 py-3 text-brand-700 text-sm">
                    Sign in
                  </Link>
                  <Link href="/auth/register" onClick={() => setOpen(false)} className="btn-primary block text-center text-sm">
                    List your land
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
