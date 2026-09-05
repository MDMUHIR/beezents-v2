import React from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import {
  ShieldCheck,
  Cpu,
  Zap,
  TrendingUp,
  Workflow,
  ArrowRight,
  Code2,
  CheckCircle2,
  Award,
  Users
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Principal Systems Architect & Co-Founder',
      bio: 'Former distributed systems lead at Google Cloud and frontier AI researcher. Specializes in multi-agent orchestration, state persistence, and low-latency inference runtimes.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sarah Lin',
      role: 'Head of AI Engineering',
      bio: 'Ex-Stripe infrastructure engineer with 8+ years developing fault-tolerant backend workflows and enterprise fintech data pipelines.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of AI Safety & Guardrails',
      bio: 'Machine learning PhD with focus on adversarial evaluation, zero-leakage enterprise privacy, and automated red-teaming for autonomous LLM agents.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              THE BEEZENT ENGINEERING MANIFESTO
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engineering the Autonomous Enterprise
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              We are full-stack software architects, AI researchers, and automation engineers dedicated to making artificial intelligence truly reliable, deterministic, and secure for mission-critical business systems.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Beliefs */}
      <section className="py-16 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB]">Our Core Mission</div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bridging the Gap Between Research Models and Enterprise Production
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              The generative AI revolution produced astonishing conversational models, but raw models are fundamentally non-deterministic. In an enterprise environment, a 95% accuracy rate is not a feature—it is an unacceptable defect.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At The Beezent, we wrap frontier intelligence in schema-enforced state machines, persistent transaction logs, automatic rollback routines, and continuous golden evaluations. We turn experimental AI into bulletproof business software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <Cpu className="w-8 h-8 text-[#0282EB] mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">Code Over Prompts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe durable automation comes from typed schemas, clean interfaces, and robust systems architecture—not fuzzy prompt engineering.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#0282EB] mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">Private by Design</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero telemetry leakage. We deploy into private VPC environments, self-hosted clusters, or on-premise infrastructure with strict tenant boundaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <TrendingUp className="w-8 h-8 text-[#0282EB] mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">Measurable ROI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We measure success by hours saved, defect reduction, and throughput scaling—never by vanity token consumption counts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <Workflow className="w-8 h-8 text-[#0282EB] mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">Human in the Loop</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Autonomous workflows automatically escalate borderline edge cases to human specialists with synthesized context and recommended decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] mb-2">Technical Leadership</div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built by Experienced Systems Engineers
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Our architects bring decades of combined experience from leading cloud providers, high-frequency trading platforms, and AI research labs.
            </p>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div
                key={member.name}
                className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 border-2 border-white shadow-md">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <div className="text-xs font-semibold text-[#0282EB] mt-0.5 mb-3">{member.role}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
             ))}
           </div>
           <div className="mt-10 text-center">
             <Link
               href="/team"
               className="inline-flex items-center gap-2 rounded-full bg-[#0282EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d58c4]"
             >
               <Users className="h-4 w-4" />
               Meet the full team
               <ArrowRight className="h-4 w-4" />
             </Link>
           </div>
         </div>
       </section>

      {/* CTA */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Let's Engineer Your Company's AI Future
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Book an architecture consultation with our technical founders to explore feasibility, timelines, and implementation strategy.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all"
            >
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
