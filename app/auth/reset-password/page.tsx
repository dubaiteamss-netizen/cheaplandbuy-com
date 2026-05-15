'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const router   = useRouter();
  const [password, setPassword]   = useState('');
  const [confirm,  setConfirm]    = useState('');
  const [showPw,   setShowPw]     = useState(false);
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState('');
  const [done,     setDone]       = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
      setTimeout(() => router.push('/dashboard'), 2500);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle size={56} className="mx-auto text-green-500 mb-5" />
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">Password Updated!</h1>
          <p className="text-brand-500 mb-2">Your password has been changed successfully.</p>
          <p className="text-brand-400 text-sm">Taking you to your dashboard...</p>
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
          <h1 className="text-2xl font-extrabold text-brand-900">Set New Password</h1>
          <p className="text-brand-400 mt-1 text-sm">Choose a strong password for your account</p>
        </div>

        <div className="card shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">New Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password} required className="input pr-10"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className={`mt-1 text-xs font-medium ${password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                  {password.length >= 8 ? '✓ Good password' : `${8 - password.length} more characters needed`}
                </div>
              )}
            </div>

            <div>
              <label className="label">Confirm New Password</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={confirm} required className="input"
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
              {confirm && password && (
                <div className={`mt-1 text-xs font-medium ${confirm === password ? 'text-green-600' : 'text-red-500'}`}>
                  {confirm === password ? '✓ Passwords match' : 'Passwords do not match'}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || password.length < 8 || password !== confirm}
              className="btn-primary w-full py-3 disabled:opacity-60"
            >
              {loading ? '⏳ Updating...' : 'Update Password →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
