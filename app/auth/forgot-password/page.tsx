'use client';
import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '../../../lib/supabase';

import { ArrowLeft, MailCheck } from 'lucide-react';

const supabase = createClient();

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      },
    );

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <MailCheck size={56} className="mx-auto text-brand-600 mb-5" />
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">Check Your Inbox</h1>
          <p className="text-brand-500 mb-6 leading-relaxed">
            We sent a password reset link to <strong>{email}</strong>.<br />
            Click the link in the email to set a new password.
          </p>
          <p className="text-brand-300 text-xs mb-6">Didn't get it? Check your spam folder.</p>
          <Link href="/auth/login" className="btn-primary">Back to Sign In</Link>
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
          <h1 className="text-2xl font-extrabold text-brand-900">Reset Your Password</h1>
          <p className="text-brand-400 mt-1 text-sm">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div className="card shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email" value={email} required className="input"
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="btn-primary w-full py-3 disabled:opacity-60"
            >
              {loading ? '⏳ Sending...' : 'Send Reset Link →'}
            </button>
          </form>
        </div>

        <p className="text-center text-brand-500 text-sm mt-6">
          <Link href="/auth/login" className="inline-flex items-center gap-1 font-bold text-brand-700 hover:text-brand-900">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
