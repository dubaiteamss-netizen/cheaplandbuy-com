import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServerSupabaseClient } from '../../../lib/supabase-server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL ?? 'hello@cheaplandbuy.com';

export async function POST(req: NextRequest) {
  try {
    const { listing_id, buyer_name, buyer_email, buyer_phone, message } = await req.json();

    if (!listing_id || !buyer_name || !buyer_email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Fetch listing + seller profile
    const { data: listing, error: listingErr } = await supabase
      .from('listings')
      .select('*, profiles(full_name, email)')
      .eq('id', listing_id)
      .single();

    if (listingErr || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Save inquiry to database
    await supabase.from('inquiries').insert({
      listing_id,
      buyer_name:  buyer_name.trim(),
      buyer_email: buyer_email.trim().toLowerCase(),
      buyer_phone: buyer_phone?.trim() ?? null,
      message:     message.trim(),
    });

    const sellerName  = (listing as any).profiles?.full_name ?? 'Seller';
    const sellerEmail = (listing as any).profiles?.email;

    // Email to seller (if we have their email)
    if (sellerEmail) {
      await resend.emails.send({
        from:    FROM,
        to:      sellerEmail,
        subject: `New Inquiry: ${listing.title}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px">
        <!-- Header -->
        <tr><td style="background:#0C4A8F;padding:28px 40px">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800">🏕️ CheapLandBuy.com</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px">New Buyer Inquiry</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:36px 40px">
          <p style="margin:0 0 8px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Hi ${sellerName},</p>
          <h2 style="margin:0 0 20px;color:#0C4A8F;font-size:20px;font-weight:800">You have a new inquiry!</h2>
          <!-- Listing box -->
          <div style="background:#f8fafc;border-left:4px solid #FFD166;border-radius:4px;padding:16px 20px;margin-bottom:24px">
            <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em">Listing</p>
            <p style="margin:0;font-size:16px;font-weight:700;color:#0C4A8F">${listing.title}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#6b7280">${listing.acres} acres · $${listing.price.toLocaleString()} · ${listing.county}, ${listing.state}</p>
          </div>
          <!-- Buyer details -->
          <h3 style="margin:0 0 12px;color:#374151;font-size:14px;font-weight:700">Buyer Information</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;width:100px">Name</td>
                <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#111827;font-weight:600">${buyer_name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280">Email</td>
                <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#111827"><a href="mailto:${buyer_email}" style="color:#0C4A8F">${buyer_email}</a></td></tr>
            ${buyer_phone ? `<tr><td style="padding:8px 0;font-size:13px;color:#6b7280">Phone</td>
                <td style="padding:8px 0;font-size:13px;color:#111827">${buyer_phone}</td></tr>` : ''}
          </table>
          <!-- Message -->
          <h3 style="margin:0 0 10px;color:#374151;font-size:14px;font-weight:700">Their Message</h3>
          <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin-bottom:28px">
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.6">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <!-- CTA -->
          <a href="mailto:${buyer_email}?subject=Re: ${encodeURIComponent(listing.title)}"
            style="display:inline-block;background:#0C4A8F;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px">
            Reply to Buyer →
          </a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
            CheapLandBuy.com · <a href="https://cheaplandbuy.com/dashboard" style="color:#0C4A8F">Manage your listings</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    }

    // Auto-reply to buyer
    await resend.emails.send({
      from:    FROM,
      to:      buyer_email,
      subject: `Your inquiry about "${listing.title}" has been sent`,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px">
        <tr><td style="background:#0C4A8F;padding:28px 40px">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800">🏕️ CheapLandBuy.com</h1>
        </td></tr>
        <tr><td style="padding:36px 40px">
          <h2 style="margin:0 0 16px;color:#0C4A8F;font-size:20px;font-weight:800">Your inquiry was sent! ✅</h2>
          <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.6">
            Hi ${buyer_name}, your inquiry about <strong>${listing.title}</strong> has been sent to the seller.
            They typically respond within 1–2 business days.
          </p>
          <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin-bottom:24px">
            <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase">Your Message</p>
            <p style="margin:0;font-size:13px;color:#374151;line-height:1.6">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <a href="https://cheaplandbuy.com/listings" style="display:inline-block;background:#0C4A8F;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px">Browse More Land →</a>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">CheapLandBuy.com · America's Land Marketplace</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Inquiry error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
