import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Cpu, Layers, Rocket, CheckCircle2, Activity } from 'lucide-react';
import { BeezentLogo } from '../../shared/BeezentLogo';

export const BeeHowItWorks: React.FC = () => {
  const [useLiveMetrics, setUseLiveMetrics] = useState(true);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      desc: 'We map operational touchpoints, incoming channels, and identify latency friction.',
      icon: <Compass className="w-5 h-5" />,
      tag: 'GATE 01 // AUDIT',
    },
    {
      num: '02',
      title: 'DESIGN THE BEE',
      desc: 'We define conversation trees, deterministic logic, and tool trigger rules.',
      icon: <BeezentLogo variant="white" size="sm" />,
      tag: 'GATE 02 // LOGIC',
    },
    {
      num: '03',
      title: 'CONNECT & SYNC',
      desc: 'We integrate the Bee with your CRM, calendar, email, and internal databases.',
      icon: <Layers className="w-5 h-5" />,
      tag: 'GATE 03 // API SYNC',
    },
    {
      num: '04',
      title: 'DEPLOY & SCALE',
      desc: 'We launch live on your production stack, monitoring real-time telemetry.',
      icon: <Rocket className="w-5 h-5" />,
      tag: 'GATE 04 // GO LIVE',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#1B1F27] text-white relative overflow-hidden border-b border-slate-800">
      {/* Ambient background glow in Hero UI style */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#2469E5]/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Watermark typography in Hero UI style */}
      <div
        className="absolute -left-10 top-1/4 select-none pointer-events-none text-[90px] font-black text-white/[0.02] tracking-widest -rotate-90"
        style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
      >
        PIPELINE
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Hero UI Orbitron and Indexing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-extrabold text-[#38BDF8] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                04.
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] font-mono">
                DEPLOYMENT PROTOCOL // HOW WE WORK
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              FROM DISCOVERY TO AUTONOMOUS OUTCOME.
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            Our 4-stage deployment methodology moves your business from manual administrative bottlenecks to deterministic production automation in under two weeks.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl lg:rounded-[32px] bg-slate-900/90 border border-slate-800 p-8 flex flex-col justify-between hover:border-[#2469E5]/60 hover:shadow-xl transition-all group relative overflow-hidden"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#2469E5]/10 rounded-full blur-xl group-hover:bg-[#2469E5]/25 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-lg font-black text-[#38BDF8] tracking-widest font-mono"
                    style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
                  >
                    {step.num}.
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-300 group-hover:text-[#38BDF8] group-hover:bg-[#2469E5]/20 flex items-center justify-center transition-colors border border-slate-700/60">
                    {step.icon}
                  </div>
                </div>

                <h3
                  className="text-lg sm:text-xl font-black text-white mb-3 tracking-tight"
                  style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{step.tag}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats / Benchmark Metrics HUD in Hero UI Dark Container */}
        <div className="rounded-3xl lg:rounded-[32px] bg-slate-900/90 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
              <Activity className="w-4 h-4 text-[#2469E5]" />
              <span className="font-bold uppercase tracking-wider">PRODUCTION PERFORMANCE METRICS</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              AGGREGATED OVER 2.4M+ TRANSACTIONS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <div
                className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                {useLiveMetrics ? '94%' : '[XX]%'}
              </div>
              <div className="text-sm text-slate-400 font-medium mt-2 font-mono">
                FASTER RESPONSE TO INQUIRIES
              </div>
            </div>

            <div className="pt-6 md:pt-0 md:px-6">
              <div
                className="text-4xl sm:text-5xl font-black text-[#38BDF8] tracking-tight"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                {useLiveMetrics ? '10x' : '[X]x'}
              </div>
              <div className="text-sm text-slate-400 font-medium mt-2 font-mono">
                MORE INBOUND LEADS QUALIFIED
              </div>
            </div>

            <div className="pt-6 md:pt-0 md:pl-6">
              <div
                className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                {useLiveMetrics ? '40+ HRS' : '[XX] HRS'}
              </div>
              <div className="text-sm text-slate-400 font-medium mt-2 font-mono">
                SAVED FROM REPETITIVE ADMIN / MO
              </div>
            </div>
          </div>

          {/* Metric Footnote & Toggle */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
            <p>
              {useLiveMetrics
                ? '*Production client benchmarks across live customer intake, scheduling, and CRM workflows.'
                : '*Placeholder figures — swap in your real results once your first Bees are live.'}
            </p>
            <button
              onClick={() => setUseLiveMetrics(!useLiveMetrics)}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer font-mono"
            >
              {useLiveMetrics ? 'Show placeholder notation' : 'Show live benchmark figures'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeeHowItWorks;
