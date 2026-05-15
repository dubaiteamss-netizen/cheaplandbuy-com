'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { US_STATES, LAND_TYPES } from '../../../types';
import { Upload, ChevronLeft, CheckCircle, X, ImageIcon } from 'lucide-react';
import { createClient } from '../../../lib/supabase';

const FEATURES = [
  // Access & Utilities
  'Paved Road Access','Dirt Road Access','Electricity Available','Water Well',
  'City Water','Septic System','Natural Gas','Internet / Cell Service',
  // Water Features
  'Creek / Stream','River Frontage','Pond','Lake Access','Wetlands',
  // Land Features
  'Timber','Hunting','Mineral Rights Included','Agricultural Exemption',
  'Fenced','Cross Fenced','Irrigated','Food Plot','Deer Stand',
  // Views & Setting
  'Mountain Views','Hill Country Views','Open Pasture','Wooded',
  'Backs to Public Land','No HOA','Survey Available',
  // Financials
  'Owner Financing','1031 Exchange Eligible','Hunting Lease Income',
  // Improvements
  'Barn / Storage','Well House','Mobile Home Allowed','Build Site Ready',
  'Horse Facilities','ATV / OHV Trails',
];

const supabase = createClient();

export default function NewListingPage() {
  const router  = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Grab the session on mount — fixes "not logged in" on submit
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/auth/login?next=/dashboard/new-listing');
      } else {
        setCurrentUser(session.user);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.replace('/auth/login?next=/dashboard/new-listing');
      else setCurrentUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, []);
  const [form, setForm] = useState({
    title: '', description: '', acres: '', price: '',
    state: '', county: '', zip: '', type: '', parcel: '',
    taxes: '', zoning: '', owner_financing: false as boolean,
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

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const newFiles = [...photos, ...files].slice(0, 20);
    setPhotos(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  }

  function removePhoto(i: number) {
    const f = photos.filter((_, idx) => idx !== i);
    setPhotos(f);
    setPreviews(f.map(x => URL.createObjectURL(x)));
  }

  async function handleSubmit() {
    setError('');
    setSaving(true);
    try {
      // Use the session loaded on mount — avoids a redundant network call
      const user = currentUser;
      if (!user) {
        router.replace('/auth/login?next=/dashboard/new-listing');
        return;
      }

      // Upload photos to Supabase Storage
      const imageUrls: string[] = [];
      for (const photo of photos) {
        const ext  = photo.name.split('.').pop();
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('listing-images')
          .upload(path, photo, { contentType: photo.type });
        if (!uploadErr) {
          const { data } = supabase.storage.from('listing-images').getPublicUrl(path);
          imageUrls.push(data.publicUrl);
        }
      }

      // Save listing to database
      const acres = parseFloat(form.acres);
      const price = parseInt(form.price);
      const { data, error: insertErr } = await supabase.from('listings').insert({
        seller_id:    user.id,
        title:        form.title.trim(),
        description:  form.description.trim(),
        acres,
        price,
        state:        form.state,
        county:       form.county.trim(),
        zip_code:      form.zip.trim(),
        parcel_number:   form.parcel.trim() || null,
        taxes_per_year:  form.taxes ? parseInt(form.taxes) : null,
        zoning:          form.zoning.trim() || null,
        owner_financing: form.owner_financing,
        type:            form.type,
        features:     form.features,
        images:       imageUrls,
        status:       'active',
      }).select().single();

      if (insertErr) throw new Error(insertErr.message);

      router.push('/dashboard?success=1');
    } catch (err: any) {
      setError(err.message ?? 'Failed to save listing. Please try again.');
      setSaving(false);
    }
  }

  const pricePerAcre = form.acres && form.price
    ? Math.round(parseInt(form.price) / parseFloat(form.acres))
    : null;

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-brand-700 py-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1">
            <h1 className="text-white font-extrabold text-xl">Post a New Listing</h1>
            <p className="text-white/50 text-xs mt-0.5">Step {step} of 3</p>
          </div>
        </div>
        {/* Progress */}
        <div className="max-w-3xl mx-auto mt-4 px-0">
          <div className="h-1.5 bg-white/15 rounded-full">
            <div className="h-1.5 bg-gold rounded-full transition-all duration-400"
              style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-[11px]">
            {['Property Info','Details & Features','Photos & Submit'].map((s, i) => (
              <span key={s} className={step > i ? 'text-gold font-semibold' : 'text-white/40'}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5 flex items-start gap-2">
            <span className="mt-0.5 flex-shrink-0">⚠️</span> {error}
          </div>
        )}

        <div className="card shadow-md">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-brand-900 text-lg">Property Information</h2>
              <div>
                <label className="label">Listing Title *</label>
                <input value={form.title} onChange={set('title')} className="input"
                  placeholder="e.g. 40 Acres Rolling Ranch Land in Texas" />
                <p className="text-xs text-brand-400 mt-1">Be specific — include acreage, type, and state</p>
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
                  <input value={form.county} onChange={set('county')} className="input"
                    placeholder="e.g. Hill County" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">ZIP Code</label>
                  <input value={form.zip} onChange={set('zip')} className="input" placeholder="e.g. 76457" />
                </div>
                <div>
                  <label className="label">Parcel Number <span className="text-brand-300 font-normal">(optional)</span></label>
                  <input value={form.parcel} onChange={set('parcel')} className="input" placeholder="e.g. 12-345-678-000" />
                  <p className="text-xs text-brand-400 mt-1">APN or tax parcel ID — helps buyers locate the exact property</p>
                </div>
                {/* Taxes + Zoning row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Annual Property Tax <span className="text-brand-300 font-normal">(optional)</span></label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400 font-bold">$</span>
                      <input type="number" value={form.taxes} onChange={set('taxes')} className="input pl-7" placeholder="e.g. 450" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Zoning <span className="text-brand-300 font-normal">(optional)</span></label>
                    <input value={form.zoning} onChange={set('zoning')} className="input" placeholder="e.g. Agricultural, Residential" />
                  </div>
                </div>
                {/* Owner Financing Toggle */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-green-800">💰 Owner Financing Available</p>
                    <p className="text-green-600 text-xs mt-0.5">Listings with owner financing get 3x more inquiries</p>
                  </div>
                  <button type="button"
                    onClick={() => setForm(f => ({ ...f, owner_financing: !f.owner_financing }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.owner_financing ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.owner_financing ? 'left-6' : 'left-0.5'}`} />
                  </button>
                </div>
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
                  <input type="number" value={form.acres} onChange={set('acres')} className="input"
                    placeholder="e.g. 40" min="0.1" step="0.1" />
                </div>
                <div>
                  <label className="label">Asking Price ($) *</label>
                  <input type="number" value={form.price} onChange={set('price')} className="input"
                    placeholder="e.g. 89000" min="1" />
                </div>
              </div>
              {pricePerAcre && (
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 text-sm text-brand-600 flex items-center gap-2">
                  💡 That's <strong>${pricePerAcre.toLocaleString()} per acre</strong>
                </div>
              )}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.title || !form.state || !form.county || !form.type || !form.acres || !form.price}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  Next: Details →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-brand-900 text-lg">Details & Features</h2>
              <div>
                <label className="label">Property Description *</label>
                <textarea value={form.description} onChange={set('description')} rows={6}
                  className="input resize-none"
                  placeholder="Describe the property in detail — terrain, access, water sources, nearby towns, best uses, anything special about it..." />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-brand-400">More detail = more buyer inquiries</p>
                  <p className="text-xs text-brand-400">{form.description.length} chars</p>
                </div>
              </div>
              <div>
                <label className="label">Property Features <span className="text-brand-300 font-normal">(check all that apply)</span></label>
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
              <div className="flex justify-between pt-2">
                <button onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                <button onClick={() => setStep(3)} disabled={!form.description}
                  className="btn-primary disabled:opacity-50">Next: Photos →</button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-brand-900 text-lg">Photos & Submit</h2>

              {/* Photo upload */}
              <div>
                <label className="label">Property Photos <span className="text-brand-300 font-normal">(up to 20)</span></label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-brand-200 hover:border-brand-400
                             rounded-xl p-8 text-center cursor-pointer transition-colors bg-brand-50 hover:bg-brand-100">
                  <Upload size={28} className="mx-auto text-brand-300 mb-2" />
                  <p className="font-semibold text-brand-600 text-sm">Click to upload photos</p>
                  <p className="text-xs text-brand-400 mt-1">JPG or PNG, up to 10MB each</p>
                  <p className="text-xs text-brand-400">Listings with photos get 5× more inquiries</p>
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                    onChange={handlePhotoSelect} />
                </div>

                {previews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                    {previews.map((src, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-brand-100">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5
                                     opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={12} />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 bg-brand-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            MAIN
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
                <h3 className="font-bold text-brand-800 text-sm mb-3">Listing Summary</h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <div><span className="text-brand-400">Title: </span><span className="font-medium text-brand-700">{form.title}</span></div>
                  <div><span className="text-brand-400">Type: </span><span className="font-medium text-brand-700">{form.type}</span></div>
                  <div><span className="text-brand-400">Location: </span><span className="font-medium text-brand-700">{form.county}, {form.state}</span></div>
                  <div><span className="text-brand-400">Acres: </span><span className="font-medium text-brand-700">{form.acres} ac</span></div>
                  <div><span className="text-brand-400">Price: </span><span className="font-bold text-brand-700">${parseInt(form.price||'0').toLocaleString()}</span></div>
                  <div><span className="text-brand-400">Photos: </span><span className="font-medium text-brand-700">{photos.length} uploaded</span></div>
                  <div><span className="text-brand-400">Features: </span><span className="font-medium text-brand-700">{form.features.length} selected</span></div>
                </div>
                <p className="text-xs text-brand-400 mt-3">
                  ✅ Your listing goes live immediately after submitting.
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <button onClick={() => setStep(2)} className="btn-secondary">← Back</button>
                <button onClick={handleSubmit} disabled={saving}
                  className="btn-gold flex items-center gap-2 disabled:opacity-60">
                  {saving ? '⏳ Saving...' : '✓ Submit Listing'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
