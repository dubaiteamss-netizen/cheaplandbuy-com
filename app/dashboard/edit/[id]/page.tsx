'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { US_STATES, LAND_TYPES } from '../../../../types';
import { ChevronLeft, Save } from 'lucide-react';
import { createClient } from '../../../../lib/supabase';

const FEATURES = [
  'Road Access','Electricity Available','Water Well','Creek / Stream',
  'Pond','Hunting','Timber','Mountain Views','Owner Financing',
  'No HOA','Fenced','Utilities Nearby','Mineral Rights','Survey Available',
];

export default function EditListingPage({ params }: { params: { id: string } }) {
  const router  = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', acres: '', price: '',
    state: '', county: '', zip: '', type: '',
    features: [] as string[], status: 'pending',
  });

  const supabase = createClient();

  useEffect(() => {
    loadListing();
  }, []);

  async function loadListing() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth/login'); return; }

    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', params.id)
      .eq('seller_id', user.id)
      .single();

    if (error || !data) { router.push('/dashboard'); return; }

    setForm({
      title: data.title,
      description: data.description,
      acres: String(data.acres),
      price: String(data.price),
      state: data.state,
      county: data.county,
      zip: data.zip_code ?? '',
      type: data.type,
      features: data.features ?? [],
      status: data.status,
    });
    setLoading(false);
  }

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  function toggleFeature(f: string) {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter(x => x !== f)
        : [...prev.features, f],
    }));
  }

  async function handleSave() {
    setError('');
    setSaving(true);
    try {
      const { error: updateErr } = await supabase
        .from('listings')
        .update({
          title:       form.title.trim(),
          description: form.description.trim(),
          acres:       parseFloat(form.acres),
          price:       parseInt(form.price),
          state:       form.state,
          county:      form.county.trim(),
          zip_code:    form.zip.trim(),
          type:        form.type,
          features:    form.features,
          updated_at:  new Date().toISOString(),
        })
        .eq('id', params.id);

      if (updateErr) throw new Error(updateErr.message);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: any) {
      setError(err.message ?? 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  }

  const pricePerAcre = form.acres && form.price
    ? Math.round(parseInt(form.price) / parseFloat(form.acres))
    : null;

  if (loading) return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center">
      <p className="text-brand-500 font-medium animate-pulse">Loading listing...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-brand-700 py-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <h1 className="text-white font-extrabold text-xl">Edit Listing</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
            ✅ Saved! Redirecting to dashboard...
          </div>
        )}

        <div className="card shadow-md space-y-5">
          <h2 className="font-extrabold text-brand-900 text-lg">Property Details</h2>

          <div>
            <label className="label">Listing Title *</label>
            <input value={form.title} onChange={set('title')} className="input"
              placeholder="e.g. 40 Acres Rolling Ranch Land in Texas" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">State *</label>
              <select value={form.state} onChange={set('state')} className="input">
                <option value="">Select State</option>
                {US_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">County *</label>
              <input value={form.county} onChange={set('county')} className="input" placeholder="e.g. Hill County" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">ZIP Code</label>
              <input value={form.zip} onChange={set('zip')} className="input" placeholder="e.g. 76457" />
            </div>
            <div>
              <label className="label">Land Type *</label>
              <select value={form.type} onChange={set('type')} className="input">
                <option value="">Select Type</option>
                {LAND_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Total Acres *</label>
              <input type="number" value={form.acres} onChange={set('acres')} className="input" min="0.1" step="0.1" />
            </div>
            <div>
              <label className="label">Asking Price ($) *</label>
              <input type="number" value={form.price} onChange={set('price')} className="input" min="1" />
            </div>
          </div>

          {pricePerAcre && (
            <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 text-sm text-brand-600">
              💡 Price per acre: <strong>${pricePerAcre.toLocaleString()}</strong>
            </div>
          )}

          <div>
            <label className="label">Description *</label>
            <textarea value={form.description} onChange={set('description')} rows={6}
              className="input resize-none" placeholder="Describe the property..." />
          </div>

          <div>
            <label className="label">Features</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {FEATURES.map(f => (
                <button key={f} type="button" onClick={() => toggleFeature(f)}
                  className={`text-sm px-3 py-2 rounded-lg border text-left font-medium transition-all
                    ${form.features.includes(f)
                      ? 'bg-brand-700 border-brand-700 text-white'
                      : 'bg-white border-brand-200 text-brand-600 hover:border-brand-400'}`}>
                  {form.features.includes(f) ? '✓ ' : ''}{f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-2 border-t border-brand-100">
            <Link href="/dashboard" className="btn-secondary text-sm">Cancel</Link>
            <button onClick={handleSave} disabled={saving || success}
              className="btn-primary flex items-center gap-2 disabled:opacity-60">
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
