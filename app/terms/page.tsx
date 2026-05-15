export const metadata = {
  title: 'Terms & Conditions | CheapLandBuy.com',
  description: 'Terms and Conditions for using CheapLandBuy.com — the online land marketplace platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-700 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Terms &amp; Conditions</h1>
          <p className="text-white/70 text-base">Last updated: 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8 space-y-8 text-brand-600 leading-relaxed">

          <p>
            By using CheapLandBuy.com, you agree to comply with these terms and conditions.
          </p>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Platform Use</h2>
            <p className="mb-3">Users may:</p>
            <ul className="space-y-2">
              {[
                'Browse listings',
                'Post properties',
                'Contact buyers and sellers',
                'Use marketplace features lawfully',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Prohibited Activities</h2>
            <p className="mb-3">Users must not:</p>
            <ul className="space-y-2">
              {[
                'Post false or misleading listings',
                'Use fraudulent documents',
                'Violate laws or regulations',
                'Abuse or misuse the platform',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Account Responsibility</h2>
            <p>
              Users are responsible for maintaining accurate account information and protecting login credentials.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-brand-900 mb-3">Listing Responsibility</h2>
            <p>
              Users are fully responsible for all information, pricing, images, and documents submitted in property listings. We reserve the right to remove listings or suspend accounts that violate platform policies.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h2 className="text-base font-extrabold text-amber-800 mb-2">Legal Disclaimer</h2>
            <div className="space-y-3 text-amber-700 text-sm leading-relaxed">
              <p>
                CheapLandBuy.com is an independent online marketplace platform that allows users to list, advertise, buy, and sell land and real estate directly with each other.
              </p>
              <p>
                We are not a real estate broker, agent, lender, attorney, or title company unless specifically stated.
              </p>
              <p>
                All transactions are conducted directly between buyers and sellers. We are not involved in negotiations, contracts, payments, title transfers, or closing processes.
              </p>
              <p>
                Buyers and sellers are solely responsible for verifying ownership, confirming legal documents, checking taxes, zoning, access, land conditions, and performing independent due diligence.
              </p>
              <p className="font-semibold">
                We do not guarantee listing accuracy, property condition, legal ownership, investment value, or availability of properties. Use of this platform is entirely at the user's own risk and responsibility.
              </p>
            </div>
          </div>

          <div className="border-t border-brand-100 pt-6">
            <p className="text-sm text-brand-400">
              By continuing to use CheapLandBuy.com, you acknowledge and accept these Terms &amp; Conditions in full.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
