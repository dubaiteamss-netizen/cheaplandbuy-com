'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function AgentSearch({
  states,
  defaultState = '',
}: {
  states: string[];
  defaultState?: string;
}) {
  const router = useRouter();
  const [state, setState] = useState(defaultState);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (state) {
      router.push(`/find-agent?state=${encodeURIComponent(state)}`);
    } else {
      router.push('/find-agent');
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <select
        value={state}
        onChange={e => setState(e.target.value)}
        className="flex-1 bg-white text-brand-800 font-semibold text-base px-4 py-3 rounded-xl border-2 border-white/50 focus:outline-none focus:border-gold appearance-none cursor-pointer"
      >
        <option value="">All States</option>
        {states.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button
        type="submit"
        className="btn-gold flex items-center justify-center gap-2 px-8 py-3 text-base font-bold"
      >
        <Search size={18} /> Search Agents
      </button>
    </form>
  );
}
