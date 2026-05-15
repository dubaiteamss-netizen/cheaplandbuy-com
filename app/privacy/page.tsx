export const metadata = {
  title: 'Privacy Policy | CheapLandBuy.com',
  description: 'Privacy Policy for CheapLandBuy.com — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-700 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/70 text-base">Last updated: 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8 space-y-8 text-brand-600 leading-relaxed">

          <p>
            CheapLandBuy.com respects your privacy and is committed to protecting your personal information.
          </p>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Information We Collect</h2>
            <p className="mb-3">We may collect:</p>
            <ul className="space-y-2">
              {[
                'Name',
                'Email address',
                'Phone number',
                'Property listing details',
                'IP address and website usage data',
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
                'Operate the platform',
                'Improve user experience',
                'Respond to inquiries',
                'Display property listings',
                'Prevent fraud and abuse',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Information Sharing</h2>
            <p>
              We do not sell personal information. Information may be shared only when required by law or necessary for platform operation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">User Responsibility</h2>
            <p>
              Users should avoid sharing sensitive financial or personal information publicly in listings or messages.
            </p>
          </div>

          <div className="border-t border-brand-100 pt-6">
            <p className="text-sm text-brand-400">
              By using CheapLandBuy.com, you agree to this Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
