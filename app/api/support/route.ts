import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Forward to the same Resend/email setup used by the inquiry route
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const SUPPORT_EMAIL  = process.env.SUPPORT_EMAIL ?? 'support@cheaplandbuy.com';

    if (!RESEND_API_KEY) {
      // If no email key configured yet, log and acknowledge gracefully
      console.log('[support] Email not configured. Contact form submission:', { name, email, subject });
      return NextResponse.json({ ok: true });
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;">
        <h2 style="color:#1a3a2a;margin-bottom:16px;">📬 New Support Message — CheapLandBuy.com</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;font-weight:700;color:#374151;width:120px;">From</td><td style="padding:8px 0;color:#111827;">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;color:#374151;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0C4A8F;">${email}</a></td></tr>
          ${subject ? `<tr><td style="padding:8px 0;font-weight:700;color:#374151;">Subject</td><td style="padding:8px 0;color:#111827;">${subject}</td></tr>` : ''}
        </table>
        <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
          <p style="margin:0;font-size:14px;color:#111827;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Sent via the Contact page on CheapLandBuy.com</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'CheapLandBuy.com <noreply@cheaplandbuy.com>',
        to:      [SUPPORT_EMAIL],
        reply_to: email,
        subject: `[Support] ${subject || 'General inquiry'} — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[support] Resend error:', err);
      return NextResponse.json({ error: 'Failed to send. Please email us directly.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[support] Unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
