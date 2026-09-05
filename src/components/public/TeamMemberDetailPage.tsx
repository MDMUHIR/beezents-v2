import React from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowLeft, Mail, Users } from 'lucide-react';

export const TeamMemberDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getTeamMemberBySlug, loadTeamMemberBySlug } = useDatabase();
  const cached = getTeamMemberBySlug(slug);
  const [member, setMember] = React.useState(cached);
  const [loading, setLoading] = React.useState(!cached);

  React.useEffect(() => {
    let active = true;
    void loadTeamMemberBySlug(slug).then(result => {
      if (active) {
        setMember(result);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">Loading profile...</div>;
  if (!member) return <div className="mx-auto max-w-3xl px-4 py-24 text-center"><h1 className="text-2xl font-bold text-slate-900">Team member not found</h1><Link href="/team" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0282EB]"><ArrowLeft className="h-4 w-4" /> Back to team</Link></div>;

  return (
    <div className="w-full bg-[#F8FAFC]">
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8"><Link href="/team" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0282EB]"><ArrowLeft className="h-3.5 w-3.5" /> Team</Link></div>
      </section>
      <section className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-5"><div className="aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">{member.avatarUrl ? <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : <div className="flex h-full items-center justify-center text-7xl font-black text-[#0282EB]">{member.name.charAt(0)}</div>}</div></div>
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0282EB]"><Users className="h-3.5 w-3.5" /> {member.category}</div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{member.name}</h1>
          <p className="mt-3 text-lg font-semibold text-[#0282EB]">{member.role}</p>
          <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-slate-600">{member.bio || 'A member of the Beezent team building practical, reliable AI systems.'}</p>
          <Link href="/contact" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0282EB] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1d58c4]"><Mail className="h-4 w-4" /> Work with our team</Link>
        </div>
      </section>
    </div>
  );
};

export default TeamMemberDetailPage;
