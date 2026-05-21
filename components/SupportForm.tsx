'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function SupportForm() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? 'Failed to send');
      }
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message ?? 'Something went wrong. Please try again or email us directly.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <CheckCircle size={40} className="mx-auto text-green-500 mb-3" />
        <h3 className="font-bold text-brand-900 text-lg mb-2">Message Sent!</h3>
        <p className="text-brand-500 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. We'll reply to <strong>{form.email}</strong> within 1 business day.
        </p>
        <button onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle'); }}
          className="mt-4 text-brand-500 hover:text-brand-700 text-xs underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label text-xs">Name *</label>
          <input
            value={form.name}
            onChange={set('name')}
            className="input text-sm"
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="label text-xs">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            className="input text-sm"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div>
        <label className="label text-xs">Subject</label>
        <select value={form.subject} onChange={set('subject')} className="input text-sm">
          <option value="">Select a topic…</option>
          <option value="Listing Question">Listing question</option>
          <option value="Account Support">Account support</option>
          <option value="Report a Problem">Report a problem</option>
          <option value="General Inquiry">General inquiry</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="label text-xs">Message *</label>
        <textarea
          value={form.message}
          onChange={set('message')}
          rows={5}
          className="input text-sm resize-none"
          placeholder="How can we help you?"
          required
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠️ {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary flex items-center justify-center gap-2 text-sm py-3 w-full sm:w-auto px-8 disabled:opacity-60"
      >
        {status === 'sending' ? (
          <><span className="animate-spin inline-block">⏳</span> Sending…</>
        ) : (
          <><Send size={15} /> Send Message</>
        )}
      </button>
    </form>
  );
}
