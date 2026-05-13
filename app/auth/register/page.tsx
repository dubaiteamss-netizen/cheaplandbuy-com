'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [done, setDone]       = useState(false);
  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true); setError('');

    const { data, error } = await supabase.auth.signUp({
      email:    form.email.trim().toLowerCase(),
      password: form.password,
      options:  { data: { full_name: form.name.trim() } },
    });

    if (error) {
      setError(error.message); setLoading(false); return;
    }

    // Send welcome email
    try {
      await fetch('/api/send-welcome', {
        method: 'POST',
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
          <Link href="/auth/login" className="btn-primary">Sign In Now →</Link>
          <p className="text-brand-300 text-xs mt-4">Check your spam folder if you don't see it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-800 font-extrabold text-2xl mb-6">
            <span className="text-3xl">🏕️</span> CheapLandBuy<span className="text-gold">.com</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-brand-900">Create Free Account</h1>
          <p className="text-brand-400 mt-1 text-sm">Start listing your land in minutes</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {['Free to list', 'No commission', 'Buyers waiting'].map(b => (
            <div key={b} className="bg-green-50 border border-green-100 rounded-lg py-2 px-1 text-center">
              <span className="text-green-600 text-base">✓</span>
              <p className="text-green-700 font-semibold text-xs mt-0.5">{b}</p>
            </div>
          ))}
        </div>

        <div className="card shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" value={form.name} required className="input"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Smith" autoComplete="name" />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={form.email} required className="input"
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" autoComplete="email" />
            </div>
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

            <button type="submit" disabled={loading || !form.name || !form.email || form.password.length < 8}
              className="btn-gold w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? '⏳ Creating account...' : 'Create Free Account →'}
            </button>

            <p className="text-center text-brand-300 text-xs">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-brand-500">Terms</Link> and{' '}
              <Link href="/privacy" className="underline hover:text-brand-500">Privacy Policy</Link>
            </p>
          </form>
        </div>

        <p className="text-center text-brand-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-brand-700 hover:text-brand-900">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
