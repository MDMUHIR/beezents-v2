import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Zap, Layers, Network, Activity } from 'lucide-react';

export const HeroAiVisual: React.FC = () => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 6);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center select-none">
      {/* Background Soft Glow Accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/60 via-indigo-50/40 to-cyan-100/50 rounded-full filter blur-3xl -z-10 transform scale-90" />
      <div className="absolute w-72 h-72 rounded-full bg-[#0282EB]/10 filter blur-2xl top-12 -right-8 animate-pulse" />

      {/* Main Coordinate Grid Frame */}
      <div className="relative w-full h-full p-4 flex items-center justify-center">
        {/* Concentric Hexagonal Orbit Rings */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 500 500">
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0282EB" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0282EB" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="circuitLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0282EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Outer Rotating Dotted Hexagon Orbit */}
          <polygon
            points="250,30 430,135 430,365 250,470 70,365 70,135"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="origin-center"
          />

          {/* Mid Hexagon Orbit */}
          <polygon
            points="250,80 395,165 395,335 250,420 105,335 105,165"
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth="1.5"
          />

          {/* Synaptic Radial Vectors connecting core to nodes */}
          <line x1="250" y1="250" x2="250" y2="80" stroke="url(#circuitLine)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="395" y2="165" stroke="url(#circuitLine)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="395" y2="335" stroke="url(#circuitLine)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="250" y2="420" stroke="url(#circuitLine)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="105" y2="335" stroke="url(#circuitLine)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="105" y2="165" stroke="url(#circuitLine)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Precision Nodes */}
          <circle cx="250" cy="80" r="4" fill="#0282EB" />
          <circle cx="395" cy="165" r="4" fill="#38BDF8" />
          <circle cx="395" cy="335" r="4" fill="#0282EB" />
          <circle cx="250" cy="420" r="4" fill="#38BDF8" />
          <circle cx="105" cy="335" r="4" fill="#0282EB" />
          <circle cx="105" cy="165" r="4" fill="#38BDF8" />
        </svg>

        {/* Central Hexagonal Intelligent Neural Core */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-44 h-44 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-200/80 shadow-2xl shadow-blue-500/10 flex flex-col items-center justify-center p-4 text-center"
        >
          {/* Inner Hexagonal Shield */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0282EB] to-[#1447A6] flex items-center justify-center shadow-lg shadow-blue-500/25 mb-2.5">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
              <polygon points="32,6 55,19 55,45 32,58 9,45 9,19" fill="#1447A6" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="32" cy="32" r="5" fill="#FFFFFF" />
              <line x1="32" y1="14" x2="32" y2="27" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="32" y1="37" x2="32" y2="50" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="17" y1="23" x2="28" y2="30" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="47" y1="23" x2="36" y2="30" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="17" y1="41" x2="28" y2="34" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="47" y1="41" x2="36" y2="34" stroke="#38BDF8" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Beezent AI Core</span>
          <span className="text-[10px] font-medium text-slate-500 mt-0.5">Autonomous State Machine</span>
        </motion.div>

        {/* Floating Telemetry Badge 1: Top Left */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-lg shadow-slate-200/50 px-3.5 py-2.5 flex items-center gap-2.5 text-xs"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0282EB] flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-[11px] leading-tight">Dynamic Tool Dispatch</div>
            <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Latency: 24ms
            </div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge 2: Top Right */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-12 right-2 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-lg shadow-slate-200/50 px-3.5 py-2.5 flex items-center gap-2.5 text-xs"
        >
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-[11px] leading-tight">Deterministic Guardrails</div>
            <div className="text-[10px] text-slate-500 font-medium">99.4% Accuracy</div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge 3: Bottom Left */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-10 left-2 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-lg shadow-slate-200/50 px-3.5 py-2.5 flex items-center gap-2.5 text-xs"
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-[11px] leading-tight">Multi-Agent DAG</div>
            <div className="text-[10px] text-slate-500 font-medium">6 Active Workers</div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge 4: Bottom Right */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-12 right-4 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-lg shadow-slate-200/50 px-3.5 py-2.5 flex items-center gap-2.5 text-xs"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-[11px] leading-tight">Real-Time Telemetry</div>
            <div className="text-[10px] text-emerald-600 font-medium">100% Zero-Leakage</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default HeroAiVisual;
