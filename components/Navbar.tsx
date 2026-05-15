'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, PlusCircle, LogOut, LayoutDashboard } from 'lucide-react';
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
    { href: '/listings',                       label: 'Browse Land' },
    { href: '/sell',                           label: 'Sell Land' },
    { href: '/listings?type=Hunting%20Land',   label: 'Hunting Land' },
    { href: '/listings?type=Ranch%20Land',     label: 'Ranch Land' },
  ];

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  }

  return (
    <nav className="bg-brand-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight hover:opacity-90 transition-opacity flex-shrink-0">
            <span className="text-2xl">🏕️</span>
            <span><span className="text-white">CheapLandBuy</span><span className="text-gold">.com</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href) ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {!loaded ? (
              <div className="w-24 h-8 bg-white/10 rounded-lg animate-pulse" />
            ) : user ? (
              <>
                <Link href="/dashboard"
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <Link href="/dashboard/new-listing"
                  className="btn-gold text-sm flex items-center gap-1.5 py-2">
                  <PlusCircle size={14} /> Post Listing
                </Link>
                <button onClick={signOut}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Sign out">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login"
                  className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20 hover:border-white/40">
                  Sign In
                </Link>
                <Link href="/auth/register" className="btn-gold text-sm py-2">
                  + List Your Land
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-900 border-t border-white/10 pb-4">
          <div className="px-4 pt-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href) ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}>
                {label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3 space-y-1">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-white/75 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium">
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <Link href="/dashboard/new-listing" onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 bg-gold text-brand-900 rounded-lg text-sm font-bold">
                    <PlusCircle size={15} /> Post New Listing
                  </Link>
                  <button onClick={() => { signOut(); setOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2.5 text-white/60 hover:text-white w-full text-left text-sm">
                    <LogOut size={15} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-white/75 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/register" onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 bg-gold text-brand-900 rounded-lg text-sm font-bold text-center">
                    + List Your Land Free
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
