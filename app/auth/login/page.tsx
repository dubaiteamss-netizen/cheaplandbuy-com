'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  useEffect(() => {
    if (searchParams.get('error') === 'link_expired') {
      setError('This link has expired or is invalid. Please try again.');
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Incorrect email or password. Please try again.'
        : error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-800 font-extrabold text-2xl mb-6">
            <span className="text-3xl">🏕️</span> CheapLandBuy<span className="text-gold">.com</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-brand-900">Welcome Back</h1>
          <p className="text-brand-400 mt-1 text-sm">Sign in to your seller account</p>
        </div>

        <div className="card shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5 flex items-start gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={form.email} required className="input"
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="label mb-0">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-brand-500 hover:text-brand-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} required className="input pr-10"
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Your password" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-brand-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-bold text-brand-700 hover:text-brand-900">
            Create one free →
          </Link>
        </p>
      </div>
    </div>
  );
}
