import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Activity } from 'lucide-react';
import mountainImage from '../../../assets/images/relax_mountain_view_1788367831289.jpg';

interface BeeRelaxBannerProps {
  onOpenDayTimeline: () => void;
}

export const BeeRelaxBanner: React.FC<BeeRelaxBannerProps> = ({ onOpenDayTimeline }) => {
  return (
    <section id="day-with-bee" className="py-20 lg:py-28 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width scenic image card with dark overlay and Hero UI geometry */}
        <div className="relative rounded-3xl lg:rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[540px] flex items-center shadow-2xl border border-slate-800">
          {/* Background image */}
          <img
            src={mountainImage}
            alt="Relaxed business founder on scenic mountain"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Dark gradient overlay to ensure text contrast and punchiness */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1F27]/98 via-[#1B1F27]/85 to-black/40" />

          {/* Watermark typography in Hero UI style */}
          <div
            className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[80px] font-black text-white/[0.04] tracking-widest rotate-90 hidden lg:block"
            style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
          >
            ENDURANCE
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl p-8 sm:p-14 lg:p-18 space-y-6">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-extrabold text-[#38BDF8] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                06.
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2469E5]/30 border border-[#2469E5]/50 text-[11px] font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                <span>UNINTERRUPTED OPERATION // 24/7/365</span>
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              YOUR AI BEE NEVER CLOCKS OUT.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              While your team rests, your autonomous Bee qualifies inbound prospects, books high-ticket consultations, and executes CRM updates without human drag.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Hero UI Pill Button with Inset Dark Arrow Square */}
              <button
                onClick={onOpenDayTimeline}
                className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold pl-6 pr-2 py-2 rounded-full shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <span>SIMULATE A DAY WITH YOUR BEE</span>
                <span className="w-8 h-8 rounded-lg bg-[#1B1F27] text-white flex items-center justify-center group-hover:bg-[#2469E5] transition-colors shadow-xs">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>ACTIVE AUTONOMOUS CYCLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeeRelaxBanner;
