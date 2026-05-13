import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-white font-extrabold text-xl mb-3">
              🏕️ CheapLandBuy<span className="text-gold font-light">.com</span>
            </div>
            <p className="text-sm leading-relaxed text-white/55 mb-4">
              The #1 marketplace for buying and selling affordable land across all 50 states.
            </p>
            <p className="text-xs text-white/35">© 2025 CheapLandBuy.com. All rights reserved.</p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              {['Texas Land','Florida Land','Montana Land','Colorado Land','Tennessee Land'].map(s => (
                <li key={s}><Link href={`/listings?state=${s.split(' ')[0]}`} className="hover:text-white transition-colors">{s}</Link></li>
              ))}
              <li><Link href="/listings" className="hover:text-white transition-colors">All 50 States →</Link></li>
            </ul>
          </div>

          {/* By Type */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Land Types</h4>
            <ul className="space-y-2 text-sm">
              {['Ranch Land','Hunting Land','Residential Lots','Farmland','Mountain Property','Wooded Land'].map(t => (
                <li key={t}><Link href={`/listings?type=${encodeURIComponent(t)}`} className="hover:text-white transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Sellers & Company */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Sellers</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/sell" className="hover:text-white transition-colors">List Your Land</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Seller Dashboard</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Create Account</Link></li>
            </ul>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
