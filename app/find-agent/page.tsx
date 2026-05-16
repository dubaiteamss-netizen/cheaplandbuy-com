import Link from 'next/link';
import { Suspense } from 'react';
import { createServerSupabaseClient } from '../../lib/supabase-server';
import { MOCK_AGENTS, type AgentProfile, formatPrice } from '../../lib/mock-agents';
import { Search, MapPin, BadgeCheck, Building2, ChevronRight, Phone, Globe } from 'lucide-react';
import AgentSearch from './AgentSearch';

export const metadata = {
  title: 'Find a Land Specialist — Real Estate Agents & Land Brokers | CheapLandBuy.com',
  description: 'Find licensed land specialists, real estate agents, and land brokers near you. Browse by state, view listings count, price range, and contact agents directly on CheapLandBuy.com.',
  alternates: { canonical: 'https://cheaplandbuy.com/find-agent' },
};

async function getAgents(state?: string): Promise<AgentProfile[]> {
  try {
    const supabase = createServerSupabaseClient();
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('role', 'agent');
    if (state) query = query.eq('location_state', state);
    const { data } = await query.limit(50);
    if (data && data.length > 0) return data as AgentProfile[];
  } catch {}
  // Fall back to mock agents
  if (state) return MOCK_AGENTS.filter(a => a.location_state === state);
  return MOCK_AGENTS;
}

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
  'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
  'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
  'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

function AgentCard({ agent }: { agent: AgentProfile }) {
  return (
    <Link href={`/agents/${agent.id}`}
      className="group bg-white rounded-2xl border border-brand-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Card body */}
      <div className="p-5 flex gap-4">
        {/* Photo */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-brand-100 border border-brand-200">
          {agent.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={agent.avatar_url} alt={agent.full_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-700 text-white text-2xl font-black">
              {agent.full_name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-1.5 flex-wrap">
            <h3 className="font-extrabold text-brand-900 text-base leading-tight group-hover:text-brand-700 transition-colors">
              {agent.full_name}
            </h3>
            {agent.is_verified && (
              <BadgeCheck size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
            )}
          </div>
          <p className="text-brand-500 text-xs font-medium mt-0.5 line-clamp-1 flex items-center gap-1">
            <Building2 size={11} className="flex-shrink-0" />{agent.company_name}
          </p>
          <p className="text-brand-400 text-xs mt-1 flex items-center gap-1">
            <MapPin size={11} className="flex-shrink-0" />{agent.location_city}, {agent.location_state}
          </p>

          {/* License badge */}
          <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5">
            <BadgeCheck size={11} className="text-blue-500 flex-shrink-0" />
            <span className="text-blue-700 text-[11px] font-bold">License: {agent.license_number} · {agent.license_state}</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-brand-50 bg-brand-50/50 grid grid-cols-3 divide-x divide-brand-100">
        <div className="px-3 py-2.5 text-center">
          <div className="font-extrabold text-brand-800 text-sm">{agent.total_listings}</div>
          <div className="text-brand-400 text-[10px] uppercase tracking-wide">Listings</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="font-extrabold text-brand-800 text-xs leading-tight">
            {formatPrice(agent.price_min)} – {formatPrice(agent.price_max)}
          </div>
          <div className="text-brand-400 text-[10px] uppercase tracking-wide">Price Range</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="font-extrabold text-brand-800 text-xs leading-tight">
            {agent.acres_min} – {agent.acres_max.toLocaleString()}
          </div>
          <div className="text-brand-400 text-[10px] uppercase tracking-wide">Acre Range</div>
        </div>
      </div>

      {/* Specialties + CTA */}
      <div className="px-5 pb-4 pt-3 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1">
          {agent.specialties.slice(0, 2).map(s => (
            <span key={s} className="bg-brand-50 border border-brand-200 text-brand-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
        <span className="flex-shrink-0 flex items-center gap-1 text-brand-700 group-hover:text-brand-900 text-xs font-bold whitespace-nowrap">
          View Profile <ChevronRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export default async function FindAgentPage({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  const stateFilter = searchParams.state || '';
  const agents = await getAgents(stateFilter || undefined);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Land Specialists & Agents on CheapLandBuy.com',
    description: 'Licensed real estate agents and land brokers specializing in US land sales',
    numberOfItems: agents.length,
    itemListElement: agents.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'RealEstateAgent',
        name: a.full_name,
        worksFor: { '@type': 'Organization', name: a.company_name },
        areaServed: a.states_served,
        url: `https://cheaplandbuy.com/agents/${a.id}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <div className="bg-brand-800 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <BadgeCheck size={13} /> Licensed & Verified Specialists
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Find a Land Specialist
          </h1>
          <p className="text-white/65 text-base sm:text-lg mb-8">
            Explore top land brokers &amp; agents near you
          </p>

          {/* Search form */}
          <Suspense>
            <AgentSearch states={US_STATES} defaultState={stateFilter} />
          </Suspense>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-brand-900">
              {stateFilter ? `Land Specialists in ${stateFilter}` : 'Find Trusted Land Brokers & Agents'}
            </h2>
            <p className="text-brand-400 text-sm mt-0.5">{agents.length} specialists found</p>
          </div>
          {stateFilter && (
            <Link href="/find-agent" className="text-brand-500 hover:text-brand-700 text-sm font-semibold">
              Clear filter ×
            </Link>
          )}
        </div>

        {/* Agent grid */}
        {agents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-50 rounded-2xl border border-brand-100">
            <p className="text-5xl mb-3">🏕️</p>
            <h3 className="font-bold text-brand-800 text-lg mb-2">No agents found in {stateFilter}</h3>
            <p className="text-brand-400 text-sm mb-6">Try searching a different state or browse all agents</p>
            <Link href="/find-agent" className="btn-primary">Browse All Agents</Link>
          </div>
        )}

        {/* CTA — become an agent */}
        <div className="mt-14 bg-brand-800 rounded-2xl p-8 text-center">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Are You an Agent?</p>
          <h3 className="text-2xl font-extrabold text-white mb-3">List Your Agency Profile Free</h3>
          <p className="text-white/65 text-sm mb-6 max-w-lg mx-auto">
            Join CheapLandBuy.com as a verified land specialist. Get your license number displayed, manage listings, and connect directly with motivated buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/register?role=agent" className="btn-gold px-8 py-3">
              Create Agent Profile Free
            </Link>
            <Link href="/listings" className="border border-white/30 hover:border-white text-white font-bold px-8 py-3 rounded-lg transition-all text-sm hover:bg-white/10">
              Browse Listings First
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
