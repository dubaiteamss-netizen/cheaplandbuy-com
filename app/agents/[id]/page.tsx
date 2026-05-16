import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '../../../lib/supabase-server';
import { MOCK_AGENTS, type AgentProfile, formatPrice } from '../../../lib/mock-agents';
import { mockListings } from '../../../lib/mock-listings';
import ListingCard from '../../../components/ListingCard';
import {
  BadgeCheck, MapPin, Phone, Globe, Building2,
  Briefcase, Star, ChevronRight, Mail, Award,
} from 'lucide-react';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const agent = await getAgent(params.id);
  if (!agent) return { title: 'Agent Not Found | CheapLandBuy.com' };
  return {
    title: `${agent.full_name} — ${agent.company_name} | Land Specialist | CheapLandBuy.com`,
    description: `${agent.full_name} is a licensed land specialist at ${agent.company_name}. License: ${agent.license_number}. ${agent.total_listings} active listings. Serving ${agent.states_served.join(', ')}.`,
    alternates: { canonical: `https://cheaplandbuy.com/agents/${agent.id}` },
  };
}

async function getAgent(id: string): Promise<AgentProfile | null> {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .eq('role', 'agent')
      .single();
    if (data) return data as AgentProfile;
  } catch {}
  return MOCK_AGENTS.find(a => a.id === id) || null;
}

async function getAgentListings(agentId: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('seller_id', agentId)
      .eq('status', 'active')
      .limit(6);
    if (data && data.length > 0) return data;
  } catch {}
  return mockListings.slice(0, 3);
}

export default async function AgentProfilePage({ params }: { params: { id: string } }) {
  const agent = await getAgent(params.id);
  if (!agent) notFound();

  const listings = await getAgentListings(agent.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agent.full_name,
    image: agent.avatar_url,
    telephone: agent.phone,
    url: agent.website,
    worksFor: { '@type': 'Organization', name: agent.company_name },
    areaServed: agent.states_served,
    description: agent.bio,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Real Estate License',
      name: `Real Estate License ${agent.license_number}`,
      recognizedBy: { '@type': 'Organization', name: `${agent.license_state} Real Estate Commission` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── BREADCRUMB ── */}
      <div className="bg-brand-50 border-b border-brand-100 py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-2 text-xs text-brand-400">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight size={12} />
          <Link href="/find-agent" className="hover:text-brand-600">Find an Agent</Link>
          <ChevronRight size={12} />
          <span className="text-brand-700 font-semibold">{agent.full_name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── PROFILE HEADER ── */}
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden mb-8">
          {/* Blue banner */}
          <div className="h-24 bg-gradient-to-r from-brand-800 to-brand-600 relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=60")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>

          <div className="px-6 pb-6">
            {/* Avatar overlapping banner */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 mb-5">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-brand-700 flex-shrink-0">
                {agent.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={agent.avatar_url} alt={agent.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-3xl font-black">
                    {agent.full_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="sm:mb-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900">{agent.full_name}</h1>
                  {agent.is_verified && (
                    <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-brand-500 text-sm mt-1 flex items-center gap-1.5">
                  <Building2 size={13} />{agent.company_name}
                </p>
                <p className="text-brand-400 text-sm mt-0.5 flex items-center gap-1.5">
                  <MapPin size={13} />{agent.location_city}, {agent.location_state}
                </p>
              </div>
            </div>

            {/* License box — prominent */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Real Estate License</div>
                  <div className="text-blue-900 font-extrabold text-lg tracking-wider">{agent.license_number}</div>
                </div>
              </div>
              <div className="sm:border-l sm:border-blue-200 sm:pl-6">
                <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Issuing State</div>
                <div className="text-blue-900 font-bold">{agent.license_state} Real Estate Commission</div>
              </div>
              {agent.years_experience && (
                <div className="sm:border-l sm:border-blue-200 sm:pl-6">
                  <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Experience</div>
                  <div className="text-blue-900 font-bold">{agent.years_experience} Years</div>
                </div>
              )}
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-3">
              {agent.phone && (
                <a href={`tel:${agent.phone.replace(/\D/g,'')}`}
                  className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  <Phone size={15} /> {agent.phone}
                </a>
              )}
              <Link href="/contact"
                className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-brand-900 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
                <Mail size={15} /> Send Message
              </Link>
              {agent.website && (
                <a href={agent.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-brand-200 hover:border-brand-400 text-brand-600 hover:text-brand-800 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  <Globe size={15} /> Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-5">
              <h2 className="font-extrabold text-brand-900 text-base mb-4">Listing Statistics</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center bg-brand-50 rounded-xl p-4">
                  <div className="text-2xl font-extrabold text-brand-800">{agent.total_listings}</div>
                  <div className="text-brand-400 text-xs mt-1 uppercase tracking-wide">Total Listings</div>
                </div>
                <div className="text-center bg-brand-50 rounded-xl p-4">
                  <div className="text-sm font-extrabold text-brand-800 leading-snug">
                    {formatPrice(agent.price_min)}<br /><span className="text-brand-400">–</span><br />{formatPrice(agent.price_max)}
                  </div>
                  <div className="text-brand-400 text-xs mt-1 uppercase tracking-wide">Price Range</div>
                </div>
                <div className="text-center bg-brand-50 rounded-xl p-4">
                  <div className="text-sm font-extrabold text-brand-800 leading-snug">
                    {agent.acres_min}<br /><span className="text-brand-400">–</span><br />{agent.acres_max.toLocaleString()} ac
                  </div>
                  <div className="text-brand-400 text-xs mt-1 uppercase tracking-wide">Acre Range</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {agent.bio && (
              <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-5">
                <h2 className="font-extrabold text-brand-900 text-base mb-3">About {agent.full_name}</h2>
                <p className="text-brand-600 text-sm leading-relaxed">{agent.bio}</p>
              </div>
            )}

            {/* Active Listings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-extrabold text-brand-900 text-base">Active Listings</h2>
                {listings.length > 0 && (
                  <Link href={`/listings?seller=${agent.id}`}
                    className="text-brand-500 hover:text-brand-700 text-sm font-semibold flex items-center gap-1">
                    View All <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listings.slice(0, 4).map((l: any) => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-brand-50 rounded-2xl border border-brand-100">
                  <p className="text-3xl mb-2">🌾</p>
                  <p className="text-brand-400 text-sm">No active listings right now</p>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-5">

            {/* Specialties */}
            {agent.specialties?.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-5">
                <h3 className="font-extrabold text-brand-900 text-sm mb-3 flex items-center gap-2">
                  <Star size={15} className="text-gold" /> Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map(s => (
                    <span key={s} className="bg-gold/10 border border-gold/30 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* States served */}
            {agent.states_served?.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-5">
                <h3 className="font-extrabold text-brand-900 text-sm mb-3 flex items-center gap-2">
                  <MapPin size={15} className="text-brand-500" /> States Served
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.states_served.map(s => (
                    <Link key={s} href={`/listings?state=${encodeURIComponent(s)}`}
                      className="bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {agent.years_experience && (
              <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-5">
                <h3 className="font-extrabold text-brand-900 text-sm mb-3 flex items-center gap-2">
                  <Briefcase size={15} className="text-brand-500" /> Experience
                </h3>
                <div className="text-3xl font-black text-brand-800">{agent.years_experience}</div>
                <div className="text-brand-400 text-xs uppercase tracking-wide">Years in Land Sales</div>
              </div>
            )}

            {/* Find more agents CTA */}
            <div className="bg-brand-800 rounded-2xl p-5 text-center">
              <p className="text-white font-bold text-sm mb-2">Looking for more specialists?</p>
              <Link href="/find-agent"
                className="inline-flex items-center gap-1.5 text-gold hover:text-white text-sm font-bold transition-colors">
                Browse All Agents <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
