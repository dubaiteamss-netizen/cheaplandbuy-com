import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl mb-4">
              <span className="text-2xl">🏕️</span>
              <span>CheapLandBuy<span className="text-gold">.com</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              America's trusted marketplace for affordable land. Connect buyers and sellers across all 50 states.
            </p>
            <p className="text-white/30 text-xs">© {year} CheapLandBuy.com<br />All rights reserved.</p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="text-white/90 font-bold text-sm uppercase tracking-wider mb-4">Browse Land</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Listings',      href: '/listings' },
                { label: 'Texas Land',        href: '/listings?state=Texas' },
                { label: 'Florida Land',      href: '/listings?state=Florida' },
                { label: 'Montana Land',      href: '/listings?state=Montana' },
                { label: 'Hunting Land',      href: '/listings?type=Hunting Land' },
                { label: 'Ranch Land',        href: '/listings?type=Ranch Land' },
                { label: 'Farmland',          href: '/listings?type=Farmland' },
              ].map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Sellers */}
          <div>
            <h4 className="text-white/90 font-bold text-sm uppercase tracking-wider mb-4">For Sellers</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sell Your Land',     href: '/sell' },
                { label: 'Create Account',     href: '/auth/register' },
                { label: 'Sign In',            href: '/auth/login' },
                { label: 'Seller Dashboard',   href: '/dashboard' },
                { label: 'Post a Listing',     href: '/dashboard/new-listing' },
              ].map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/90 font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us',           href: '/about' },
                { label: 'Contact',            href: '/contact' },
                { label: 'Privacy Policy',     href: '/privacy' },
                { label: 'Terms of Service',   href: '/terms' },
              ].map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/40 text-xs mb-2">Have land to sell?</p>
              <Link href="/auth/register"
                className="inline-block bg-gold text-brand-900 font-bold text-xs px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
                List Free →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4 text-center">
        <p className="text-white/30 text-xs">
          CheapLandBuy.com is an independent land marketplace. We are not real estate agents or brokers.
        </p>
      </div>
    </footer>
  );
}
