import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Quote } from 'lucide-react';

export const BeeTestimonial: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#1B1F27] text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle blue accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#2469E5]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Watermark in background */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[100px] font-black text-white/[0.02] tracking-widest hidden md:block"
        style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
      >
        PROOF
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Telemetry Header */}
        <div className="flex items-center justify-center gap-3 mb-10 text-center">
          <span
            className="text-sm font-extrabold text-[#38BDF8] tracking-widest font-mono"
            style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
          >
            08.
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#38BDF8] bg-[#2469E5]/20 border border-[#2469E5]/40 px-3 py-1 rounded-full">
            VERIFIED VALIDATION // OPERATIONAL IMPACT
          </span>
        </div>

        {/* Testimonial Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white text-center tracking-tight leading-relaxed sm:leading-relaxed max-w-3xl mx-auto"
          style={{ fontFamily: "'Chakra Petch', sans-serif" }}
        >
          "Beezent transformed our customer intake architecture in under two weeks. Our AI Bee handles <span className="text-[#38BDF8]">80%+ of incoming inquiries</span>, books verified meetings directly on our reps' calendars, and synchronizes HubSpot instantly without missing a beat."
        </motion.blockquote>

        {/* Author / Client Details */}
        <div className="mt-10 flex flex-col items-center justify-center text-center">
          <div
            className="font-black text-white text-base sm:text-lg tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
          >
            MARCUS VANCE
          </div>
          <div className="text-xs sm:text-sm text-slate-400 font-mono mt-1 flex flex-wrap items-center justify-center gap-2">
            <span>HEAD OF GROWTH, APEX LOGISTICS</span>
            <span className="text-slate-600">/</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              VERIFIED CLIENT AUDIT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeeTestimonial;
