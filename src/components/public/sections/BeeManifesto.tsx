import React from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck } from 'lucide-react';

export const BeeManifesto: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl lg:rounded-[32px] bg-[#1B1F27] text-white p-8 sm:p-14 lg:p-18 border border-slate-700/80 shadow-2xl overflow-hidden"
        >
          {/* Subtle blue ambient blur */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2469E5]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Telemetry Row */}
          <div className="relative z-10 flex items-center justify-between pb-8 border-b border-slate-700/70 mb-8">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#38BDF8]">
              <Terminal className="w-4 h-4 text-[#2469E5]" />
              <span className="uppercase tracking-widest font-bold">SYSTEM_DOCTRINE // PHILOSOPHY</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DETERMINISTIC ARCHITECTURE</span>
            </div>
          </div>

          {/* Quote Text */}
          <p
            className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-relaxed max-w-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            “We study how your business runs, design an AI Bee around it, and connect the tools it needs to act — not just answer. Strategy alone doesn’t save you time;{' '}
            <span
              className="text-[#38BDF8] underline decoration-[#2469E5] decoration-4 underline-offset-8 font-black"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              a working system does.
            </span>”
          </p>

          {/* Bottom attribution */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>BEEZENT DEPLOYMENT MANIFESTO</span>
            <span className="text-[#2469E5] font-bold">VERSION // 2026.4</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default BeeManifesto;
