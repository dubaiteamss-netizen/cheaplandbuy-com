'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase';
import { Listing } from '../../types';
import { PlusCircle, Eye, Edit, Trash2, TrendingUp, MessageSquare, List, LogOut, AlertCircle, BarChart2, Heart } from 'lucide-react';

const supabase = createClient();

export default function DashboardPage() {
  const [listings,  setListings]  = useState<Listing[]>([]);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [loading,   setLoading]   = useState(true);
  const [user,      setUser]      = useState<any>(null);
  const [deleting,  setDeleting]  = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    loadData();
    // Saved count from localStorage
    try {
      const ids = JSON.parse(localStorage.getItem('clb_favorites') ?? '[]');
      setSavedCount(ids.length);
    } catch {}
  }, []);

  async function loadData() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { window.location.href = '/auth/login'; return; }
    setUser(session.user);

    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('seller_id', session.user.id)
      .order('created_at', { ascending: false });

    const myListings = data ?? [];
    setListings(myListings);

    // Fetch view counts for each listing
    if (myListings.length > 0) {
      const ids = myListings.map((l: any) => l.id);
      const { data: viewData } = await supabase
        .from('listing_views')
        .select('listing_id')
        .in('listing_id', ids);

      if (viewData) {
        const counts: Record<string, number> = {};
        viewData.forEach((v: any) => {
          counts[v.listing_id] = (counts[v.listing_id] ?? 0) + 1;
        });
        setViewCounts(counts);
      }
    }

    setLoading(false);
  }

  async function deleteListing(id: string) {
    if (!confirm('Delete this listing? This cannot be undone.')) return;
    setDeleting(id);
    await supabase.from('listings').delete().eq('id', id);
    setListings(l => l.filter(x => x.id !== id));
    setDeleting(null);
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  const totalViews = Object.values(viewCounts).reduce((a, b) => a + b, 0);

  const stats = [
    { icon: <List size={20} />,        n: listings.length,                                    label: 'Total Listings',  color: 'text-brand-500' },
    { icon: <Eye size={20} />,         n: listings.filter(l => l.status === 'active').length,  label: 'Active',          color: 'text-green-500' },
    { icon: <BarChart2 size={20} />,   n: totalViews,                                          label: 'Total Views',     color: 'text-blue-500' },
    { icon: <TrendingUp size={20} />,  n: listings.filter(l => l.status === 'sold').length,    label: 'Sold',            color: 'text-gold-dark' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">🏕️</div>
        <p className="text-brand-500 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-brand-700 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-extrabold text-2xl">Seller Dashboard</h1>
            <p className="text-white/60 text-sm mt-0.5">
              Welcome back, {user?.user_metadata?.full_name ?? user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/new-listing" className="btn-gold flex items-center gap-2 text-sm">
              <PlusCircle size={16} /> Post New Listing
            </Link>
            <button onClick={signOut}
              className="border border-white/30 hover:border-white text-white/70 hover:text-white
                         px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-1.5">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="card flex items-center gap-4">
              <div className={s.color}>{s.icon}</div>
              <div>
                <div className="text-2xl font-extrabold text-brand-800">{s.n.toLocaleString()}</div>
                <div className="text-xs text-brand-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Listings table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-brand-900 text-lg">Your Listings</h2>
            <Link href="/dashboard/new-listing"
              className="text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center gap-1">
              <PlusCircle size={14} /> Add Listing
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🌾</p>
              <h3 className="font-bold text-brand-800 text-xl mb-2">No listings yet</h3>
              <p className="text-brand-400 mb-8 text-sm max-w-sm mx-auto">
                Post your first land listing and start getting buyer inquiries within 48 hours.
              </p>
              <Link href="/dashboard/new-listing" className="btn-primary">
                Post Your First Listing →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-100 bg-brand-50">
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide py-3 px-6">Property</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide py-3 px-4">Price</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide py-3 px-4">Acres</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide py-3 px-4 hidden md:table-cell">Views</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide py-3 px-4">Status</th>
                    <th className="text-right text-xs font-bold text-brand-400 uppercase tracking-wide py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {listings.map(l => {
                    const views = viewCounts[l.id] ?? 0;
                    return (
                      <tr key={l.id} className="hover:bg-brand-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-brand-800 text-sm">{l.title}</div>
                          <div className="text-brand-400 text-xs mt-0.5">{l.county}, {l.state}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-brand-700 text-sm">${l.price.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4 text-brand-600 text-sm">{l.acres} ac</td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                            <Eye size={13} className="text-blue-400" />
                            {views.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            l.status === 'active'  ? 'bg-green-100 text-green-700' :
                            l.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            l.status === 'sold'    ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/listings/${l.id}`}
                              className="p-2 text-brand-400 hover:text-brand-700 hover:bg-brand-100 rounded-lg transition-colors"
                              title="View public listing">
                              <Eye size={15} />
                            </Link>
                            <Link href={`/dashboard/edit/${l.id}`}
                              className="p-2 text-brand-400 hover:text-brand-700 hover:bg-brand-100 rounded-lg transition-colors"
                              title="Edit listing">
                              <Edit size={15} />
                            </Link>
                            <button
                              onClick={() => deleteListing(l.id)}
                              disabled={deleting === l.id}
                              className="p-2 text-brand-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete listing">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <Link href="/listings" className="card hover:shadow-md transition-all text-center py-6 group">
            <div className="text-3xl mb-2">🏡</div>
            <p className="font-bold text-brand-800 group-hover:text-brand-600">Browse All</p>
            <p className="text-brand-400 text-xs mt-1">See how buyers see listings</p>
          </Link>
          <Link href="/dashboard/new-listing" className="card hover:shadow-md transition-all text-center py-6 group">
            <div className="text-3xl mb-2">➕</div>
            <p className="font-bold text-brand-800 group-hover:text-brand-600">Post Listing</p>
            <p className="text-brand-400 text-xs mt-1">Free to list, no commission</p>
          </Link>
          <Link href="/saved" className="card hover:shadow-md transition-all text-center py-6 group">
            <div className="text-3xl mb-2">❤️</div>
            <p className="font-bold text-brand-800 group-hover:text-brand-600">Saved Properties</p>
            <p className="text-brand-400 text-xs mt-1">{savedCount} saved on this device</p>
          </Link>
          <Link href="/contact" className="card hover:shadow-md transition-all text-center py-6 group">
            <div className="text-3xl mb-2">💬</div>
            <p className="font-bold text-brand-800 group-hover:text-brand-600">Get Support</p>
            <p className="text-brand-400 text-xs mt-1">We're here to help you sell</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
