import React from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Clock,
  ShieldCheck,
  Workflow,
  Headphones,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export const BeeWhyItWorks: React.FC = () => {
  const reasons = [
    {
      code: 'SPEC_01',
      title: 'RAPID DEPLOYMENT',
      desc: 'Your first autonomous Bee deployed live to production in weeks, not quarters.',
      icon: <Zap className="w-5 h-5 text-[#2469E5]" />,
      stat: 'TIME TO VALUE: < 14 DAYS',
    },
    {
      code: 'SPEC_02',
      title: 'ALWAYS-ON RUNTIME',
      desc: 'Your Bee operates uninterrupted across nights, weekends, and peak volume spikes.',
      icon: <Clock className="w-5 h-5 text-[#2469E5]" />,
      stat: 'UPTIME: 99.8% SLA',
    },
    {
      code: 'SPEC_03',
      title: 'DETERMINISTIC ACCURACY',
      desc: 'Responses and tool actions strictly grounded in your proprietary business records.',
      icon: <ShieldCheck className="w-5 h-5 text-[#2469E5]" />,
      stat: 'HALLUCINATION: ZERO',
    },
    {
      code: 'SPEC_04',
      title: 'DEEP STACK INTEGRATION',
      desc: 'Native webhooks and API connectors with your CRM, calendar, Slack, and email.',
      icon: <Workflow className="w-5 h-5 text-[#2469E5]" />,
      stat: 'PROTOCOLS: REST & WEBHOOKS',
    },
    {
      code: 'SPEC_05',
      title: 'DEDICATED ARCHITECTS',
      desc: 'Continuous engineering refinement behind every Bee, not just a software seat.',
      icon: <Headphones className="w-5 h-5 text-[#2469E5]" />,
      stat: 'MONITORING: 24/7 SRE',
    },
    {
      code: 'SPEC_06',
      title: 'ELASTIC HORIZONTAL SCALE',
      desc: 'Engineered to scale effortlessly from a single intake workflow to company-wide automation.',
      icon: <TrendingUp className="w-5 h-5 text-[#2469E5]" />,
      stat: 'CAPACITY: 10K+ EVENTS/MIN',
    },
  ];

  return (
    <section id="why-it-works" className="py-20 lg:py-28 bg-[#EDF0F4] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Hero UI Orbitron and Indexing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-extrabold text-[#2469E5] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                05.
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                SYSTEM SPECIFICATIONS // WHY BEEZENT
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              ARCHITECTED FOR PRECISION AND SCALE.
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            Enterprise reliability, deterministic guardrails, and deep API integrations designed for businesses that cannot afford workflow downtime.
          </p>
        </div>

        {/* 6 Feature Boxes Grid in Hero UI Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 hover:border-[#2469E5]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    [{item.code}]
                  </span>
                </div>

                <h3
                  className="text-lg sm:text-xl font-black text-slate-900 mb-2.5 tracking-tight"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{item.stat}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BeeWhyItWorks;
