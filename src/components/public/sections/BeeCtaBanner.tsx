import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface BeeCtaBannerProps {
  onOpenDemoModal: () => void;
}

export const BeeCtaBanner: React.FC<BeeCtaBannerProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="book-demo" className="py-20 lg:py-28 bg-[#EDF0F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl lg:rounded-[32px] bg-[#1B1F27] text-white p-10 sm:p-16 lg:p-20 overflow-hidden shadow-2xl border border-slate-700/80 text-center"
        >
          {/* Ambient blue glow circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#0282EB]/20 blur-[130px] pointer-events-none rounded-full" />

          {/* Watermark in background */}
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none text-[120px] sm:text-[160px] font-black text-white/[0.02] tracking-widest"
            style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
          >
            DEPLOY
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span
                className="text-sm font-extrabold text-[#38BDF8] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                09.
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0282EB]/20 border border-[#0282EB]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RAPID ONBOARDING // 14-DAY PRODUCTION SPRINT</span>
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              PUT YOUR OPERATIONAL DRAG ON AUTOPILOT.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Schedule a 20-minute technical discovery session. We will build a customized live architecture preview demonstrating an autonomous Bee executing your exact workflow.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center gap-3 bg-[#0282EB] hover:bg-[#1b58ca] text-white text-sm font-bold pl-6 pr-2 py-2 rounded-full shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <span>BOOK TECHNICAL DISCOVERY</span>
                <span className="w-8 h-8 rounded-lg bg-white text-[#0282EB] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-6 text-xs font-mono text-slate-400">
              <span>SLOTS: OPEN FOR SPRINT</span>
              <span>·</span>
              <span>NO OBLIGATION ARCHITECTURE AUDIT</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default BeeCtaBanner;
