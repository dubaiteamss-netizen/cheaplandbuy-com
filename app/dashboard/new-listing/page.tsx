'use client';
import Link from 'next/link';
import { useState } from 'react';
import { US_STATES, LAND_TYPES } from '../../../types';
import { Upload, ChevronLeft, CheckCircle } from 'lucide-react';

export default function NewListingPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', acres: '', price: '',
    state: '', county: '', zip: '', type: '',
    features: [] as string[],
  });

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

  const FEATURE_OPTIONS = [
    'Road Access','Electricity Available','Water Well','Creek / Stream',
    'Pond','Hunting','Timber','Mountain Views','Owner Financing',
    'No HOA','Fenced','Utilities Nearby',
  ];

  if (done) return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center shadow-md">
        <CheckCircle size={52} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-extrabold text-brand-900 mb-2">Listing Submitted!</h2>
        <p className="text-brand-400 mb-6 text-sm">
          Your listing is under review and will go live within 24 hours.
          Buyers will be able to find it and send you inquiries directly.
        </p>
        <div className="flex gap-3">
          <Link href="/dashboard" className="btn-secondary flex-1 text-center text-sm">View Dashboard</Link>
          <Link href="/dashboard/new-listing" onClick={() => setDone(false)} className="btn-primary flex-1 text-center text-sm">
            Add Another
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-brand-700 py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="text-white/70 hover:text-white">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-white font-extrabold text-xl">Post a New Listing</h1>
            <p className="text-white/60 text-sm">Step {step} of 3</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mt-4">
          <div className="h-1.5 bg-white/20 rounded-full">
            <div className="h-1.5 bg-gold rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span className={step >= 1 ? 'text-gold font-semibold' : ''}>Property Info</span>
            <span className={step >= 2 ? 'text-gold font-semibold' : ''}>Details & Features</span>
            <span className={step >= 3 ? 'text-gold font-semibold' : ''}>Photos & Submit</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card shadow-md">

          {/* ── STEP 1: Basic Info ── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-brand-900 text-lg">Property Information</h2>

              <div>
                <label className="label">Listing Title *</label>
                <input value={form.title} onChange={set('title')} className="input"
                  placeholder="e.g. 40 Acres Rolling Ranch Land in Texas" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">State *</label>
                  <select value={form.state} onChange={set('state')} className="input" required>
                    <option value="">Select State</option>
                    {US_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">County *</label>
                  <input value={form.county} onChange={set('county')} className="input" placeholder="e.g. Hill County" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">ZIP Code</label>
                  <input value={form.zip} onChange={set('zip')} className="input" placeholder="e.g. 76457" />
                </div>
                <div>
                  <label className="label">Land Type *</label>
                  <select value={form.type} onChange={set('type')} className="input" required>
                    <option value="">Select Type</option>
                    {LAND_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Acres *</label>
                  <input type="number" value={form.acres} onChange={set('acres')} className="input" placeholder="e.g. 40" min="0.1" step="0.1" required />
                </div>
                <div>
                  <label className="label">Asking Price ($) *</label>
                  <input type="number" value={form.price} onChange={set('price')} className="input" placeholder="e.g. 89000" min="1" required />
                </div>
              </div>

              {form.acres && form.price && (
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 text-sm text-brand-600">
                  💡 Price per acre: <strong>${Math.round(parseInt(form.price) / parseFloat(form.acres)).toLocaleString()}</strong>
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={() => setStep(2)} disabled={!form.title || !form.state || !form.county || !form.type || !form.acres || !form.price}
                  className="btn-primary disabled:opacity-50">
                  Next: Details →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Details & Features ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-brand-900 text-lg">Details & Features</h2>

              <div>
                <label className="label">Property Description *</label>
                <textarea value={form.description} onChange={set('description')} rows={5}
                  className="input resize-none" placeholder="Describe the property — what makes it special? Access, water, terrain, nearby towns, intended uses..." required />
                <p className="text-xs text-brand-400 mt-1">{form.description.length} / 2000 characters. More detail = more buyer inquiries.</p>
              </div>

              <div>
                <label className="label">Property Features</label>
                <p className="text-xs text-brand-400 mb-3">Check all that apply</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FEATURE_OPTIONS.map(f => (
                    <button key={f} type="button" onClick={() => toggleFeature(f)}
                      className={`text-sm px-3 py-2 rounded-lg border text-left transition-all font-medium
                        ${form.features.includes(f)
                          ? 'bg-brand-700 border-brand-700 text-white'
                          : 'bg-white border-brand-200 text-brand-600 hover:border-brand-500'
                        }`}>
                      {form.features.includes(f) ? '✓ ' : ''}{f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                <button onClick={() => setStep(3)} disabled={!form.description}
                  className="btn-primary disabled:opacity-50">
                  Next: Photos →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Photos & Submit ── */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-brand-900 text-lg">Photos & Submit</h2>

              {/* Upload area */}
              <div className="border-2 border-dashed border-brand-200 hover:border-brand-400 rounded-xl p-10 text-center cursor-pointer transition-colors bg-brand-50 hover:bg-brand-100">
                <Upload size={32} className="mx-auto text-brand-300 mb-3" />
                <p className="font-semibold text-brand-600 mb-1">Click to upload photos</p>
                <p className="text-sm text-brand-400">JPG, PNG up to 10MB each. Upload up to 20 photos.</p>
                <p className="text-xs text-brand-400 mt-2">Listings with photos get 5x more inquiries</p>
                <input type="file" accept="image/*" multiple className="hidden" />
              </div>

              {/* Summary */}
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
                <h3 className="font-bold text-brand-800 mb-3 text-sm">Listing Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-brand-400">Title:</span> <span className="font-medium text-brand-700">{form.title}</span></div>
                  <div><span className="text-brand-400">Type:</span> <span className="font-medium text-brand-700">{form.type}</span></div>
                  <div><span className="text-brand-400">State:</span> <span className="font-medium text-brand-700">{form.state}</span></div>
                  <div><span className="text-brand-400">Acres:</span> <span className="font-medium text-brand-700">{form.acres} ac</span></div>
                  <div><span className="text-brand-400">Price:</span> <span className="font-bold text-brand-700">${parseInt(form.price || '0').toLocaleString()}</span></div>
                  <div><span className="text-brand-400">Features:</span> <span className="font-medium text-brand-700">{form.features.length} selected</span></div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-secondary">← Back</button>
                <button onClick={() => setDone(true)} className="btn-gold flex items-center gap-2">
                  ✓ Submit Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
