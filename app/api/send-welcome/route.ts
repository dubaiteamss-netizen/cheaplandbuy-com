import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!email || !name) {
    return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL    = process.env.FROM_EMAIL ?? 'hello@cheaplandbuy.com';

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const html = buildWelcomeEmail(name);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `CheapLandBuy.com <${FROM_EMAIL}>`,
      to:   [email],
      subject: '🏕️ Welcome to CheapLandBuy.com — Your account is ready!',
      html,
      text: `Hi ${name},\n\nWelcome to CheapLandBuy.com!\n\nYour seller account is ready. You can now post land listings and start connecting with buyers.\n\nPost your first listing: https://cheaplandbuy.com/dashboard/new-listing\n\nBrowse all listings: https://cheaplandbuy.com/listings\n\nThanks,\nThe CheapLandBuy.com Team`,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

function buildWelcomeEmail(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to CheapLandBuy.com</title>
</head>
<body style="margin:0;padding:0;background:#F0F6FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F6FF;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- ── HEADER IMAGE BANNER ── -->
        <tr>
          <td style="background:linear-gradient(135deg,#0C4A8F 0%,#1565C0 50%,#0D47A1 100%);
                     border-radius:16px 16px 0 0;padding:48px 40px 40px;text-align:center;">

            <!-- Land scene illustration using CSS/Unicode -->
            <div style="font-size:64px;margin-bottom:16px;line-height:1;">🏕️</div>

            <!-- Fake landscape banner -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:rgba(255,255,255,0.08);border-radius:12px;padding:20px;text-align:center;">
                  <span style="font-size:28px;">🌄</span>
                  <span style="font-size:28px;">🌿</span>
                  <span style="font-size:28px;">🏞️</span>
                  <span style="font-size:28px;">🌾</span>
                  <span style="font-size:28px;">⛰️</span>
                </td>
              </tr>
            </table>

            <div style="color:#FFD166;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">
              Welcome to
            </div>
            <div style="color:#FFFFFF;font-size:32px;font-weight:800;letter-spacing:-1px;margin-bottom:6px;">
              CheapLandBuy.com
            </div>
            <div style="color:rgba(255,255,255,0.7);font-size:15px;">
              America's Land Marketplace
            </div>
          </td>
        </tr>

        <!-- ── MAIN CONTENT ── -->
        <tr>
          <td style="background:#FFFFFF;padding:40px;">

            <p style="font-size:22px;font-weight:800;color:#1A2744;margin:0 0 8px;">
              Hi ${name}! 👋
            </p>
            <p style="font-size:16px;color:#4A5568;margin:0 0 24px;line-height:1.6;">
              Your seller account on <strong>CheapLandBuy.com</strong> is ready.
              You can now list your land and start connecting with motivated buyers across America.
            </p>

            <!-- Stats row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td width="33%" align="center"
                  style="background:#EDF4FF;border-radius:10px;padding:16px 8px;margin:4px;">
                  <div style="font-size:22px;font-weight:800;color:#0C4A8F;">50,000+</div>
                  <div style="font-size:11px;color:#718096;text-transform:uppercase;letter-spacing:1px;">Monthly Buyers</div>
                </td>
                <td width="2%" />
                <td width="33%" align="center"
                  style="background:#EDF4FF;border-radius:10px;padding:16px 8px;">
                  <div style="font-size:22px;font-weight:800;color:#0C4A8F;">$0</div>
                  <div style="font-size:11px;color:#718096;text-transform:uppercase;letter-spacing:1px;">Listing Fee</div>
                </td>
                <td width="2%" />
                <td width="33%" align="center"
                  style="background:#EDF4FF;border-radius:10px;padding:16px 8px;">
                  <div style="font-size:22px;font-weight:800;color:#0C4A8F;">48 hrs</div>
                  <div style="font-size:11px;color:#718096;text-transform:uppercase;letter-spacing:1px;">First Inquiry</div>
                </td>
              </tr>
            </table>

            <!-- What to do next -->
            <p style="font-size:14px;font-weight:700;color:#1A2744;text-transform:uppercase;
                      letter-spacing:1px;margin:0 0 14px;">What to do next</p>

            <!-- Step 1 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td width="36" valign="top">
                  <div style="width:28px;height:28px;background:#0C4A8F;border-radius:50%;
                              color:#fff;font-size:13px;font-weight:800;text-align:center;
                              line-height:28px;">1</div>
                </td>
                <td style="padding-left:12px;">
                  <div style="font-weight:700;color:#1A2744;font-size:14px;">Post your first listing</div>
                  <div style="color:#718096;font-size:13px;margin-top:2px;">
                    Add photos, price, and location — takes about 10 minutes.
                  </div>
                </td>
              </tr>
            </table>

            <!-- Step 2 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td width="36" valign="top">
                  <div style="width:28px;height:28px;background:#0C4A8F;border-radius:50%;
                              color:#fff;font-size:13px;font-weight:800;text-align:center;
                              line-height:28px;">2</div>
                </td>
                <td style="padding-left:12px;">
                  <div style="font-weight:700;color:#1A2744;font-size:14px;">Buyers find your land</div>
                  <div style="color:#718096;font-size:13px;margin-top:2px;">
                    Your listing shows up in search immediately after approval.
                  </div>
                </td>
              </tr>
            </table>

            <!-- Step 3 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td width="36" valign="top">
                  <div style="width:28px;height:28px;background:#0C4A8F;border-radius:50%;
                              color:#fff;font-size:13px;font-weight:800;text-align:center;
                              line-height:28px;">3</div>
                </td>
                <td style="padding-left:12px;">
                  <div style="font-weight:700;color:#1A2744;font-size:14px;">Get buyer inquiries by email</div>
                  <div style="color:#718096;font-size:13px;margin-top:2px;">
                    Interested buyers contact you directly — no middleman, no commission.
                  </div>
                </td>
              </tr>
            </table>

            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://cheaplandbuy.com/dashboard/new-listing"
                    style="display:inline-block;background:#1976D2;color:#FFFFFF;
                           font-size:16px;font-weight:700;padding:16px 40px;
                           border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
                    Post Your First Listing →
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="background:#F8FAFF;border-top:1px solid #E2EDFB;
                     border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
            <p style="color:#A0AEC0;font-size:12px;margin:0 0 8px;">
              You're receiving this because you created an account on CheapLandBuy.com
            </p>
            <p style="margin:0;">
              <a href="https://cheaplandbuy.com" style="color:#1976D2;font-size:12px;text-decoration:none;">
                cheaplandbuy.com
              </a>
              &nbsp;·&nbsp;
              <a href="https://cheaplandbuy.com/listings" style="color:#1976D2;font-size:12px;text-decoration:none;">
                Browse Land
              </a>
              &nbsp;·&nbsp;
              <a href="https://cheaplandbuy.com/dashboard" style="color:#1976D2;font-size:12px;text-decoration:none;">
                My Dashboard
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
