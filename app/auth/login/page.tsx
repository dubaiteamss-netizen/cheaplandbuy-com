'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { createClient } from '../../../lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow]     = useState(false);
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (signInError) throw new Error(signInError.message);

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input pl-9" placeholder="you@email.com" />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
                <input type={show ? 'text' : 'password'} required value={pass}
                  onChange={e => setPass(e.target.value)}
                  className="input pl-9 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 hover:text-brand-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password"
                className="text-sm text-brand-500 hover:text-brand-700 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed">
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
