import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { BeezentLogo } from '../../shared/BeezentLogo';

interface BeePricingProps {
  onOpenDemoModal: () => void;
}

export const BeePricing: React.FC<BeePricingProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#EDF0F4] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Hero UI Orbitron and Indexing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-extrabold text-[#2469E5] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                07.
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                COMMERCIAL TIERS // PRODUCTION DEPLOYMENTS
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              TRANSPARENT PRICING FOR AUTONOMOUS SCALE.
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            Deterministic AI systems deployed directly into your operational stack. Predictable investment with dedicated solution engineering.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Starter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  [TIER_01]
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  ENTRY
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <BeezentLogo variant="mark" size="sm" />
                <div
                  className="text-2xl font-black text-slate-900"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  STARTER BEE
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-6 font-medium">
                For automating your single highest-friction workflow
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl font-black text-slate-900 tracking-tight"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  $1,499
                </span>
                <span className="text-xs font-mono text-slate-500 ml-2">SETUP · THEN $299/MO</span>
              </div>

              <div className="h-px bg-slate-100 mb-6" />

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>1 AI Bee workflow pipeline</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>Core channel integration (Web or Email)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>Calendar booking engine sync</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>14-day rapid production setup</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onOpenDemoModal}
                className="w-full pl-5 pr-1.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer group"
              >
                <span>DEPLOY STARTER</span>
                <span className="w-8 h-8 rounded-lg bg-[#1B1F27] text-white flex items-center justify-center group-hover:bg-[#2469E5] transition-colors shadow-2xs">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: Growth (MOST POPULAR - Dark Charcoal Highlighted Card) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl lg:rounded-[32px] bg-[#1B1F27] text-white border border-[#2469E5]/50 p-8 sm:p-9 flex flex-col justify-between shadow-2xl relative lg:-translate-y-2 overflow-hidden"
          >
            {/* Watermark in background */}
            <div
              className="absolute -right-6 bottom-4 select-none pointer-events-none text-[60px] font-black text-white/[0.03] tracking-widest"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              GROWTH
            </div>

            {/* Tag: Most Popular */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-[#38BDF8] font-bold uppercase tracking-wider">
                [TIER_02]
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2469E5] text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-md">
                RECOMMENDED // POPULAR
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <BeezentLogo variant="white" size="sm" />
                <div
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  GROWTH STACK
                </div>
              </div>
              <div className="text-xs text-slate-400 mb-6 font-medium">
                For scaling intake, qualifying, and automated CRM sync
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl font-black text-[#38BDF8] tracking-tight"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  $3,499
                </span>
                <span className="text-xs font-mono text-slate-400 ml-2">SETUP · THEN $799/MO</span>
              </div>

              <div className="h-px bg-slate-700/80 mb-6" />

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 stroke-[2.5]" />
                  <span>Unlimited conversational workflows</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 stroke-[2.5]" />
                  <span>Omnichannel (Web, SMS, Email, & CRM)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 stroke-[2.5]" />
                  <span>Bi-directional CRM & calendar sync</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 stroke-[2.5]" />
                  <span>Priority SRE monitoring & fine-tuning</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 relative z-10">
              <button
                onClick={onOpenDemoModal}
                className="w-full pl-5 pr-1.5 py-1.5 rounded-full bg-[#2469E5] hover:bg-[#1b58ca] text-white text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer group shadow-lg"
              >
                <span>DEPLOY GROWTH STACK</span>
                <span className="w-8 h-8 rounded-lg bg-white text-[#2469E5] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Card 3: Custom */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  [TIER_03]
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  ENTERPRISE
                </span>
              </div>

              <div
                className="text-2xl font-black text-slate-900 mb-1"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                CUSTOM OPS
              </div>
              <div className="text-xs text-slate-500 mb-6 font-medium">
                For multi-location or high-throughput enterprise systems
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl font-black text-slate-900 tracking-tight"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  LET'S TALK
                </span>
                <span className="text-xs font-mono text-slate-500 ml-2">CUSTOM SLA & SCOPE</span>
              </div>

              <div className="h-px bg-slate-100 mb-6" />

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>Full-stack automation across all tools</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>Dedicated solutions architect</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>Private VPC deployment & HIPAA/SOC2 ready</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2469E5] shrink-0 stroke-[2.5]" />
                  <span>24/7 dedicated telephone SLA</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onOpenDemoModal}
                className="w-full pl-5 pr-1.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer group"
              >
                <span>BOOK TECHNICAL SCOPING</span>
                <span className="w-8 h-8 rounded-lg bg-[#1B1F27] text-white flex items-center justify-center group-hover:bg-[#2469E5] transition-colors shadow-2xs">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing Footnote */}
        <p className="text-center text-xs font-mono text-slate-400 mt-12 max-w-xl mx-auto leading-relaxed">
          *Final scope and recurring fees are calibrated during discovery. All deployments backed by our deterministic execution guarantee.
        </p>
      </div>
    </section>
  );
};
export default BeePricing;
