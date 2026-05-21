export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for CheapLandBuy.com — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://cheaplandbuy.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-700 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/70 text-base">Last updated: May 21, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8 space-y-8 text-brand-600 leading-relaxed">

          <p>
            CheapLandBuy.com respects your privacy and is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.
          </p>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Information We Collect</h2>
            <p className="mb-3">We may collect the following when you use our platform:</p>
            <ul className="space-y-2">
              {[
                'Name and email address (when you register or contact us)',
                'Phone number (optional, when provided in listings or inquiries)',
                'Property listing details (description, price, location, photos)',
                'IP address, browser type, and pages visited (via server logs and analytics)',
                'Cookies and similar tracking technologies (see Cookies section below)',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">How We Use Information</h2>
            <p className="mb-3">We use collected information to:</p>
            <ul className="space-y-2">
              {[
                'Operate, maintain, and improve the platform',
                'Create and manage user accounts',
                'Display and deliver property listings',
                'Send transactional emails (account confirmations, listing inquiries)',
                'Respond to customer support requests',
                'Detect and prevent fraud or abuse',
                'Comply with legal obligations',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Cookies</h2>
            <p className="mb-3">
              We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how the site is used. You can disable cookies in your browser settings, though this may affect functionality. We do not use cookies for third-party advertising purposes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Third-Party Service Providers</h2>
            <p className="mb-3">We use the following third-party processors to operate this platform:</p>
            <ul className="space-y-2">
              {[
                'Supabase — database, authentication, and file storage (supabase.com)',
                'Resend — transactional email delivery (resend.com)',
                'Vercel — website hosting and deployment (vercel.com)',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">Each of these providers has its own privacy policy governing how they handle data.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Information Sharing</h2>
            <p>
              We do not sell your personal information. We share data only with the service providers listed above, when required by law, or when necessary to operate the platform (for example, sharing your inquiry with a listing seller).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Data Retention</h2>
            <p>
              We retain your account information for as long as your account is active. Inactive accounts and associated data may be deleted after 24 months of inactivity. You may request deletion at any time (see Your Rights below).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Your Rights (CCPA / Privacy Rights)</h2>
            <p className="mb-3">Depending on where you live, you may have the right to:</p>
            <ul className="space-y-2">
              {[
                'Know what personal data we hold about you',
                'Request a copy of your data',
                'Request correction of inaccurate data',
                'Request deletion of your data ("right to be forgotten")',
                'Opt out of any future sale of your data (we do not currently sell data)',
                'Non-discrimination for exercising these rights',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:support@cheaplandbuy.com" className="text-brand-700 font-semibold hover:underline">support@cheaplandbuy.com</a>.
              We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">User Responsibility</h2>
            <p>
              Users should avoid sharing sensitive financial information (bank details, SSNs, payment credentials) publicly in listing descriptions or messages. CheapLandBuy.com is not responsible for information you choose to share publicly.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:support@cheaplandbuy.com" className="text-brand-700 font-semibold hover:underline">support@cheaplandbuy.com</a>.
            </p>
          </div>

          <div className="border-t border-brand-100 pt-6">
            <p className="text-sm text-brand-400">
              By using CheapLandBuy.com, you agree to this Privacy Policy. We may update this policy periodically — the date above reflects the most recent revision.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
