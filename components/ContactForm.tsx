'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface Props {
  listingId: string;
  listingTitle: string;
}

export default function ContactForm({ listingId, listingTitle }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing_id:  listingId,
          buyer_name:  form.name,
          buyer_email: form.email,
          buyer_phone: form.phone,
          message:     form.message,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed to send');
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message ?? 'Something went wrong. Please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="card text-center py-8">
        <CheckCircle size={40} className="mx-auto text-green-500 mb-3" />
        <h3 className="font-bold text-brand-900 text-lg mb-2">Message Sent!</h3>
        <p className="text-brand-500 text-sm leading-relaxed">
          Your inquiry has been sent to the seller. You'll also receive a confirmation email. They typically respond within 1–2 business days.
        </p>
        <button onClick={() => setStatus('idle')}
          className="mt-4 text-brand-500 hover:text-brand-700 text-xs underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="font-extrabold text-brand-900 text-base mb-1">Contact Seller</h3>
      <p className="text-brand-400 text-xs mb-4">Inquire about this property — free, no obligation</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input value={form.name} onChange={set('name')} className="input text-sm" placeholder="Your Name *" required />
        </div>
        <div>
          <input type="email" value={form.email} onChange={set('email')} className="input text-sm" placeholder="Email Address *" required />
        </div>
        <div>
          <input type="tel" value={form.phone} onChange={set('phone')} className="input text-sm" placeholder="Phone Number (optional)" />
        </div>
        <div>
          <textarea value={form.message} onChange={set('message')} rows={4} className="input text-sm resize-none"
            placeholder={`I'm interested in "${listingTitle}". Could you tell me more about the property?`}
            required />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            ⚠️ {errorMsg}
          </p>
        )}

        <button type="submit" disabled={status === 'sending'}
          className="btn-gold w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60">
          {status === 'sending' ? (
            <><span className="animate-spin">⏳</span> Sending...</>
          ) : (
            <><Send size={15} /> Send Inquiry</>
          )}
        </button>
        <p className="text-center text-brand-300 text-xs">
          Your contact info is shared only with the seller
        </p>
      </form>
    </div>
  );
}
