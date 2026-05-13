'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: call Supabase auth.signInWithPassword({ email, password: pass })
    // then redirect to /dashboard
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-extrabold text-brand-700 mb-2">
            🏕️ CheapLandBuy.com
          </Link>
          <h1 className="text-2xl font-extrabold text-brand-900">Welcome back</h1>
          <p className="text-brand-400 text-sm mt-1">Sign in to your seller account</p>
        </div>

        <div className="card shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="input pl-9" placeholder="you@email.com" />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type={show ? 'text' : 'password'} required value={pass} onChange={e => setPass(e.target.value)}
                  className="input pl-9 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 hover:text-brand-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-brand-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center text-base disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-brand-100 mt-6 pt-5 text-center text-sm text-brand-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-brand-600 font-semibold hover:underline">
              Create one free →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
