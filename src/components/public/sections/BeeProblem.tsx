import React from 'react';
import { motion } from 'motion/react';
import { Clock, Zap, Check, X, ShieldAlert, Cpu } from 'lucide-react';

export const BeeProblem: React.FC = () => {
  const withoutBee = [
    'Customers wait hours for replies across disparate channels',
    'High-intent inbound leads go cold before SDR follow-up',
    'Appointments missed or double-booked due to calendar lag',
    'Customer records scattered across un-synced CRM silos',
    'Reporting requires entire afternoons of manual copy-paste',
  ];

  const withBee = [
    'Instant deterministic replies 24/7 with zero lag',
    'Inbound leads qualified and routed into CRM in seconds',
    'Meetings booked directly on calendars with prep briefs',
    'Bi-directional tool synchronization across your stack',
    'Automated daily synthesis dispatched straight to your inbox',
  ];

  return (
    <section id="problem" className="py-20 lg:py-28 bg-[#EDF0F4] border-b border-slate-200/90">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Hero UI Orbitron and Indexing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-extrabold text-[#2469E5] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                02.
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                OPERATIONAL DIAGNOSTIC // THE BOTTLENECK
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              ELIMINATING FRICTION IN YOUR BUSINESS.
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            When operational tasks multiply faster than headcount, response windows decay and high-value customer opportunities disappear.
          </p>
        </div>

        {/* 2 High-Contrast Split Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Without an AI Bee (Manual Workflow) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            {/* Top Telemetry Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                      style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                    >
                      MANUAL OPERATIONS
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      STATUS // UN-AUTOMATED
                    </div>
                  </div>
                </div>

                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/70 text-[11px] font-mono font-semibold">
                  HIGH FRICTION
                </span>
              </div>

              <ul className="space-y-4 pt-2">
                {withoutBee.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-slate-600 text-sm sm:text-base leading-snug">
                    <div className="w-5 h-5 rounded-md bg-rose-100/70 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Metric Diagnostic Bar */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>AVG. 3.4 HRS LOST PER SEAT / DAY</span>
              </span>
              <span className="text-slate-400">EFFICIENCY: ~32%</span>
            </div>
          </motion.div>

          {/* Card 2: With an AI Bee (Autonomous Execution Engine - Hero Dark Charcoal Styling) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl lg:rounded-[32px] bg-[#1B1F27] text-white border border-slate-700/80 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between group"
          >
            {/* Watermark typography in Hero UI style */}
            <div
              className="absolute -right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[80px] font-black text-white/[0.03] tracking-widest rotate-90"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              AUTONOMOUS
            </div>

            {/* Subtle blue accent glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2469E5]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Telemetry Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/70 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2469E5]/20 border border-[#2469E5]/50 flex items-center justify-center text-[#38BDF8] shadow-inner">
                    <Zap className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-black text-white tracking-tight"
                      style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                    >
                      BEEZENT PIPELINE
                    </h3>
                    <div className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>STATUS // ACTIVE 24/7/365</span>
                    </div>
                  </div>
                </div>

                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#2469E5]/25 text-[#38BDF8] border border-[#2469E5]/40 text-[11px] font-mono font-semibold">
                  SLA: 99.8%
                </span>
              </div>

              <ul className="space-y-4 pt-2">
                {withBee.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-slate-200 text-sm sm:text-base leading-snug">
                    <div className="w-5 h-5 rounded-md bg-[#2469E5]/30 border border-[#38BDF8]/50 text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Diagnostic Telemetry */}
            <div className="relative z-10 mt-10 pt-6 border-t border-slate-700/70 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-2 text-[#38BDF8]">
                <Cpu className="w-4 h-4 text-[#38BDF8]" />
                <span>EXECUTION LATENCY: &lt; 850MS</span>
              </span>
              <span className="text-emerald-400 font-bold">100% RELIABILITY</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default BeeProblem;
