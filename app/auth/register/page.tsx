'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { createClient } from '../../../lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();

      // 1 — Create Supabase auth account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name, phone: form.phone },
        },
      });

      if (signUpError) throw new Error(signUpError.message);

      // 2 — Send welcome email
      await fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });

      setDone(true);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen ──
  if (done) return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center shadow-md py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold text-brand-900 mb-3">
          Welcome to CheapLandBuy.com!
        </h2>
        <p className="text-brand-500 mb-2 text-sm">
          Your account is created. We sent a welcome email to:
        </p>
        <p className="font-bold text-brand-700 mb-6">{form.email}</p>
        <p className="text-brand-400 text-xs mb-8">
          Check your inbox (and spam folder) for a confirmation link before signing in.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/auth/login" className="btn-primary text-center">
            Sign In Now →
          </Link>
          <Link href="/listings" className="btn-secondary text-center text-sm">
            Browse Listings First
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-extrabold text-brand-700 mb-2">
            🏕️ CheapLandBuy.com
          </Link>
          <h1 className="text-2xl font-extrabold text-brand-900">Create your free account</h1>
          <p className="text-brand-400 text-sm mt-1">Start listing your land in minutes</p>
        </div>

        <div className="card shadow-md">
          {/* Benefits */}
          <div className="bg-brand-50 rounded-lg p-4 mb-6 border border-brand-100">
            <p className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">
              What you get — FREE
            </p>
            <ul className="space-y-1 text-sm text-brand-600">
              <li>✓ Unlimited land listings</li>
              <li>✓ Buyer inquiries directly to your email</li>
              <li>✓ Seller dashboard to manage listings</li>
              <li>✓ Visible to 50,000+ monthly buyers</li>
            </ul>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type="text" required value={form.name} onChange={set('name')}
                  className="input pl-9" placeholder="Jane Smith" />
              </div>
            </div>

            <div>
              <label className="label">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type="email" required value={form.email} onChange={set('email')}
                  className="input pl-9" placeholder="jane@email.com" />
              </div>
            </div>

            <div>
              <label className="label">Phone Number <span className="text-brand-300 font-normal">(optional)</span></label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type="tel" value={form.phone} onChange={set('phone')}
                  className="input pl-9" placeholder="(555) 000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Password *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                  <input type="password" required value={form.password} onChange={set('password')}
                    className="input pl-9" placeholder="Min. 8 chars" minLength={8} />
                </div>
              </div>
              <div>
                <label className="label">Confirm *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                  <input type="password" required value={form.confirm} onChange={set('confirm')}
                    className="input pl-9" placeholder="Repeat" />
                </div>
              </div>
            </div>

            <p className="text-xs text-brand-400">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-brand-600 underline">Terms</Link> and{' '}
              <Link href="/privacy" className="text-brand-600 underline">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={loading}
              className="btn-gold w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Creating account...' : 'Create Free Account →'}
            </button>
          </form>

          <div className="border-t border-brand-100 mt-6 pt-5 text-center text-sm text-brand-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-600 font-semibold hover:underline">
              Sign in →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
