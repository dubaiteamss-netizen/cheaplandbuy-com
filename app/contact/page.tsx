import Link from 'next/link';
import { Mail, Globe, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | CheapLandBuy.com',
  description: 'Contact CheapLandBuy.com for questions about listings, property postings, account support, or general inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-700 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Contact CheapLandBuy.com</h1>
          <p className="text-white/70 text-base">We're here to help with listings, accounts, and general inquiries.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">

        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8">
          <p className="text-brand-600 leading-relaxed mb-8">
            If you have questions about listings, property postings, account support, or general inquiries, feel free to contact us. We aim to respond to inquiries as quickly as possible.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4 p-5 bg-brand-50 rounded-xl">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe size={20} className="text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Website</p>
                <Link href="/" className="text-brand-700 font-semibold hover:underline">CheapLandBuy.com</Link>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-brand-50 rounded-xl">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:support@cheaplandbuy.com" className="text-brand-700 font-semibold hover:underline">
                  support@cheaplandbuy.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-brand-50 rounded-xl">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Business Hours</p>
                <p className="text-brand-700 font-semibold">Monday – Saturday</p>
                <p className="text-brand-500 text-sm">9:00 AM – 6:00 PM (EST)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-700 rounded-2xl p-8 text-center">
          <h2 className="text-lg font-extrabold text-white mb-2">Looking to list your land?</h2>
          <p className="text-white/70 text-sm mb-5">Create a free account and post your property in minutes.</p>
          <Link href="/auth/register" className="btn-gold text-sm py-2.5 px-8">Get Started Free →</Link>
        </div>

      </div>
    </div>
  );
}
