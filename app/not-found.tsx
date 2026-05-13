import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl mb-6">🗺️</p>
        <h1 className="text-6xl font-extrabold text-brand-800 mb-2">404</h1>
        <h2 className="text-xl font-bold text-brand-700 mb-4">Page Not Found</h2>
        <p className="text-brand-400 mb-8 leading-relaxed">
          This land might have already been sold, or the page you're looking for doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/listings" className="btn-primary">Browse Listings</Link>
          <Link href="/" className="btn-secondary">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
