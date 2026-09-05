import React, { useState } from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { getTeamMembers } = useDatabase();
  const members = getTeamMembers();
  const [category, setCategory] = useState<'ALL' | 'leadership' | 'talent'>('ALL');
  const filtered = category === 'ALL' ? members : members.filter(member => member.category === category);

  return (
    <div className="w-full bg-[#F8FAFC]">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0282EB]">
              <Users className="h-3.5 w-3.5" />
              THE PEOPLE BEHIND THE SYSTEMS
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">Meet the Beezent team</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">Strategists, engineers, and builders turning difficult operational problems into dependable AI systems.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              { value: 'ALL' as const, label: 'Everyone' },
              { value: 'leadership' as const, label: 'Leadership' },
              { value: 'talent' as const, label: 'Talent' },
            ].map(filter => (
              <button key={filter.value} onClick={() => setCategory(filter.value)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${category === filter.value ? 'bg-[#0282EB] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">Team profiles are being prepared.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(member => (
              <Link key={member.id} href={`/team/${member.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  {member.avatarUrl ? <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-5xl font-black text-[#0282EB]">{member.name.charAt(0)}</div>}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0282EB]"><Sparkles className="h-3 w-3" />{member.category}</div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0282EB]">{member.name}</h2>
                  <p className="mt-1 text-xs font-medium text-slate-500">{member.role}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#0282EB]">View profile <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
