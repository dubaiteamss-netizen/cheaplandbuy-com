'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { Eye, EyeOff, CheckCircle, Home, BadgeCheck, ChevronRight } from 'lucide-react';

const supabase = createClient();

type Role = 'owner' | 'agent';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<Role>((searchParams.get('role') as Role) || 'owner');
  const [step, setStep] = useState<'role' | 'details'>(
    searchParams.get('role') ? 'details' : 'role'
  );
  const [form, setForm] = useState({
    name:           '',
    email:          '',
    password:       '',
    company_name:   '',
    license_number: '',
    license_state:  '',
    phone:          '',
  });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [done, setDone]       = useState(false);

  const US_STATES = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
    'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
    'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
    'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
    'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
  ];

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (role === 'agent' && !form.license_number.trim()) {
      setError('License number is required for agent accounts.'); return;
    }
    setLoading(true); setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email:    form.email.trim().toLowerCase(),
      password: form.password,
      options:  {
        data: {
          full_name:      form.name.trim(),
          role,
          company_name:   form.company_name.trim() || null,
          license_number: form.license_number.trim() || null,
          license_state:  form.license_state || null,
          phone:          form.phone.trim() || null,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message); setLoading(false); return;
    }

    // Save extra agent fields to profile if user was confirmed immediately
    if (data.user && role === 'agent') {
      try {
        await supabase.from('profiles').upsert({
          id:             data.user.id,
          full_name:      form.name.trim(),
          role,
          company_name:   form.company_name.trim() || null,
          license_number: form.license_number.trim() || null,
          license_state:  form.license_state || null,
          phone:          form.phone.trim() || null,
        });
      } catch {}
    }

    try {
      await fetch('/api/send-welcome', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim().toLowerCase() }),
      });
    } catch {}

    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle size={56} className="mx-auto text-green-500 mb-5" />
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">Check Your Email!</h1>
          <p className="text-brand-500 mb-6 leading-relaxed">
            We sent a confirmation link to <strong>{form.email}</strong>.<br />
            Click it to activate your account, then sign in.
          </p>
          {role === 'agent' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-left">
              <p className="text-blue-800 font-bold text-sm mb-1 flex items-center gap-1.5">
                <BadgeCheck size={15} /> Agent Profile Submitted
              </p>
              <p className="text-blue-600 text-xs leading-relaxed">
                Your license number <strong>{form.license_number}</strong> has been saved. Our team will verify your credentials within 1–2 business days.
              </p>
            </div>
          )}
          <Link href="/auth/login" className="btn-primary">Sign In Now →</Link>
          <p className="text-brand-300 text-xs mt-4">Check your spam folder if you don't see it.</p>
        </div>
      </div>
    );
  }

  // ── STEP 1: ROLE SELECTION ──────────────────────────────────────────────
  if (step === 'role') {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <img src="/icon.svg" alt="" width={40} height={40} />
              <span className="font-extrabold text-2xl text-brand-800">CheapLandBuy<span className="text-gold">.com</span></span>
            </Link>
            <h1 className="text-2xl font-extrabold text-brand-900">Create Free Account</h1>
            <p className="text-brand-400 mt-1 text-sm">First, tell us how you'll use the platform</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Land Owner card */}
            <button
              onClick={() => { setRole('owner'); setStep('details'); }}
              className="group bg-white border-2 border-brand-200 hover:border-brand-700 rounded-2xl p-6 text-left transition-all hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-brand-50 group-hover:bg-brand-700 border border-brand-200 group-hover:border-brand-700 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Home size={26} className="text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-extrabold text-brand-900 text-lg mb-1 group-hover:text-brand-700">Land Owner</h3>
              <p className="text-brand-400 text-sm leading-relaxed mb-4">
                I own land and want to list it for sale. Buy or sell land directly without an agent.
              </p>
              <ul className="space-y-1.5 text-xs text-brand-500">
                {['List your land free','Direct buyer contact','Owner financing option'].map(b => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-1 text-brand-700 group-hover:text-brand-900 font-bold text-sm">
                Get Started <ChevronRight size={15} />
              </div>
            </button>

            {/* Real Estate Agent card */}
            <button
              onClick={() => { setRole('agent'); setStep('details'); }}
              className="group bg-white border-2 border-brand-200 hover:border-blue-500 rounded-2xl p-6 text-left transition-all hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-600 border border-blue-200 group-hover:border-blue-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <BadgeCheck size={26} className="text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-extrabold text-brand-900 text-lg mb-1 group-hover:text-blue-700">Real Estate Agent</h3>
              <p className="text-brand-400 text-sm leading-relaxed mb-4">
                I'm a licensed real estate agent or broker specializing in land sales.
              </p>
              <ul className="space-y-1.5 text-xs text-brand-500">
                {['Public agent profile page','License number displayed','Appear in agent directory'].map(b => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">✓</span> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-1 text-blue-600 group-hover:text-blue-800 font-bold text-sm">
                Create Agent Profile <ChevronRight size={15} />
              </div>
            </button>
          </div>

          <p className="text-center text-brand-500 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-brand-700 hover:text-brand-900">Sign in →</Link>
          </p>
        </div>
      </div>
    );
  }

  // ── STEP 2: REGISTRATION DETAILS ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/icon.svg" alt="" width={36} height={36} />
            <span className="font-extrabold text-xl text-brand-800">CheapLandBuy<span className="text-gold">.com</span></span>
          </Link>

          {/* Role badge */}
          <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-3 ${
            role === 'agent'
              ? 'bg-blue-100 border border-blue-300 text-blue-700'
              : 'bg-brand-100 border border-brand-200 text-brand-700'
          }`}>
            {role === 'agent' ? <BadgeCheck size={13} /> : <Home size={13} />}
            {role === 'agent' ? 'Real Estate Agent Account' : 'Land Owner Account'}
          </div>

          <h1 className="text-2xl font-extrabold text-brand-900">Create Your Account</h1>
          <p className="text-brand-400 mt-1 text-sm">
            {role === 'agent' ? 'Your license number will be verified and displayed on your public profile.' : 'Start listing your land in minutes'}
          </p>
        </div>

        <div className="card shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="label">Full Name</label>
              <input type="text" value={form.name} required className="input"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Smith" autoComplete="name" />
            </div>

            {/* Agent-only fields */}
            {role === 'agent' && (
              <>
                <div>
                  <label className="label">Company / Brokerage Name</label>
                  <input type="text" value={form.company_name} className="input"
                    onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))}
                    placeholder="e.g. Texas Ranch Sales LLC" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      License Number <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={form.license_number} required={role === 'agent'} className="input"
                      onChange={e => setForm(f => ({ ...f, license_number: e.target.value }))}
                      placeholder="e.g. TX-0567832" />
                  </div>
                  <div>
                    <label className="label">License State</label>
                    <select value={form.license_state} onChange={e => setForm(f => ({ ...f, license_state: e.target.value }))}
                      className="input text-base">
                      <option value="">Select state</option>
                      {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Phone Number</label>
                  <input type="tel" value={form.phone} className="input"
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(512) 555-0123" autoComplete="tel" />
                </div>

                {/* License info note */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  <p className="text-blue-700 text-xs leading-relaxed">
                    <BadgeCheck size={12} className="inline mr-1" />
                    Your license number will be publicly displayed on your agent profile and verified by our team within 1–2 business days.
                  </p>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={form.email} required className="input"
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" autoComplete="email" />
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} required className="input pr-10"
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Minimum 8 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className={`mt-1 text-xs font-medium ${form.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                  {form.password.length >= 8 ? '✓ Good password' : `${8 - form.password.length} more characters needed`}
                </div>
              )}
            </div>

            <button type="submit"
              disabled={loading || !form.name || !form.email || form.password.length < 8 || (role === 'agent' && !form.license_number)}
              className={`w-full py-3 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                role === 'agent' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'btn-gold'
              }`}>
              {loading
                ? '⏳ Creating account...'
                : role === 'agent'
                  ? 'Create Agent Profile →'
                  : 'Create Free Account →'
              }
            </button>

            <p className="text-center text-brand-300 text-xs">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-brand-500">Terms</Link> and{' '}
              <Link href="/privacy" className="underline hover:text-brand-500">Privacy Policy</Link>
            </p>
          </form>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-brand-500">
          <button onClick={() => setStep('role')} className="hover:text-brand-700 font-medium">
            ← Change account type
          </button>
          <Link href="/auth/login" className="font-bold text-brand-700 hover:text-brand-900">
            Sign in →
          </Link>
        </div>
      </div>
    </div>
  );
}
