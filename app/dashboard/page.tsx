import Link from 'next/link';
import { mockListings } from '../../lib/mock-listings';
import { PlusCircle, Eye, Edit, Trash2, TrendingUp, MessageSquare, List } from 'lucide-react';

// In production: fetch listings where seller_id = current user from Supabase
const MY_LISTINGS = mockListings.slice(0, 3);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-brand-700 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-extrabold text-2xl">Seller Dashboard</h1>
            <p className="text-white/70 text-sm mt-1">Manage your land listings</p>
          </div>
          <Link href="/dashboard/new-listing" className="btn-gold flex items-center gap-2">
            <PlusCircle size={18} /> Post New Listing
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <List size={20} />,        n: MY_LISTINGS.length, label: 'Active Listings' },
            { icon: <Eye size={20} />,          n: '1,240',            label: 'Total Views' },
            { icon: <MessageSquare size={20} />, n: '34',               label: 'Inquiries' },
            { icon: <TrendingUp size={20} />,   n: '$0',               label: 'Sales This Month' },
          ].map(s => (
            <div key={s.label} className="card flex items-center gap-4">
              <div className="text-brand-500">{s.icon}</div>
              <div>
                <div className="text-2xl font-extrabold text-brand-800">{s.n}</div>
                <div className="text-xs text-brand-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Listings table */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-brand-900 text-lg">Your Listings</h2>
            <Link href="/dashboard/new-listing" className="text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center gap-1">
              <PlusCircle size={14} /> Add Listing
            </Link>
          </div>

          {MY_LISTINGS.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-5xl mb-4">🌾</p>
              <h3 className="font-bold text-brand-800 text-lg mb-2">No listings yet</h3>
              <p className="text-brand-400 mb-6 text-sm">Post your first land listing and start getting buyer inquiries.</p>
              <Link href="/dashboard/new-listing" className="btn-primary">Post Your First Listing</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-100">
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide pb-3 pr-4">Listing</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide pb-3 pr-4">Price</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide pb-3 pr-4">Acres</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide pb-3 pr-4">Status</th>
                    <th className="text-left text-xs font-bold text-brand-400 uppercase tracking-wide pb-3 pr-4">Views</th>
                    <th className="text-right text-xs font-bold text-brand-400 uppercase tracking-wide pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {MY_LISTINGS.map(l => (
                    <tr key={l.id} className="hover:bg-brand-50 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-semibold text-brand-800 text-sm">{l.title}</div>
                        <div className="text-brand-400 text-xs">{l.county}, {l.state}</div>
                      </td>
                      <td className="py-4 pr-4 font-bold text-brand-700 text-sm">${l.price.toLocaleString()}</td>
                      <td className="py-4 pr-4 text-brand-600 text-sm">{l.acres} ac</td>
                      <td className="py-4 pr-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          l.status === 'active'  ? 'bg-green-100 text-green-700' :
                          l.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-brand-100 text-brand-500'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-brand-500 text-sm">—</td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/listings/${l.id}`}
                            className="p-1.5 text-brand-400 hover:text-brand-700 hover:bg-brand-100 rounded transition-colors">
                            <Eye size={15} />
                          </Link>
                          <Link href={`/dashboard/edit/${l.id}`}
                            className="p-1.5 text-brand-400 hover:text-brand-700 hover:bg-brand-100 rounded transition-colors">
                            <Edit size={15} />
                          </Link>
                          <button className="p-1.5 text-brand-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
