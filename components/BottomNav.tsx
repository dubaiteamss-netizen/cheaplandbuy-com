'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, Search, PlusCircle, User } from 'lucide-react';
import { createClient } from '../lib/supabase';

const supabase = createClient();

export default function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Hide on dashboard and auth pages
  const hide = pathname.startsWith('/dashboard') || pathname.startsWith('/auth');
  if (hide) return null;

  const tabs = [
    { href: '/',         label: 'Home',   icon: Home },
    { href: '/listings', label: 'Browse', icon: Search },
    {
      href: user ? '/dashboard/new-listing' : '/auth/register',
      label: 'Post',
      icon: PlusCircle,
      gold: true,
    },
    {
      href: user ? '/dashboard' : '/auth/login',
      label: user ? 'Account' : 'Sign In',
      icon: User,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-4 h-[72px]">
        {tabs.map(({ href, label, icon: Icon, gold }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);
          return (
            <Link key={label} href={href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors active:scale-95
                ${gold ? 'text-brand-700' : active ? 'text-brand-700' : 'text-gray-400'}`}
            >
              {gold ? (
                <span className="bg-brand-700 rounded-full p-2 -mt-1 shadow-md">
                  <Icon size={22} strokeWidth={2.5} className="text-white" />
                </span>
              ) : (
                <Icon size={24} strokeWidth={active ? 2.5 : 1.8} />
              )}
              <span className={`text-[11px] font-semibold leading-none ${gold ? 'text-brand-700' : active ? 'text-brand-700' : 'text-gray-400'}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
