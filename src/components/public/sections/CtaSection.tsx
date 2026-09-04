import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { useRouter } from '../../../context/RouterContext';

interface CtaSectionProps {
  onOpenDemoModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenDemoModal }) => {
  const { navigate } = useRouter();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B0F19] to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0282EB]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#00C6D7]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono font-bold text-[#0282EB] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                START YOUR AI TRANSFORMATION
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase"
                style={{ fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif" }}
              >
                READY TO TRANSFORM
                <br />
                YOUR BUSINESS?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Let's build something amazing together. Schedule a call to discuss how AI can automate your workflows and scale operations.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenDemoModal}
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#0282EB] hover:bg-[#026fc9] text-white text-sm sm:text-base font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule a Free Call</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => navigate('/case-studies')}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm sm:text-base font-semibold px-6 py-4 rounded-xl border border-slate-700 transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Case Studies</span>
                </button>
              </div>
            </div>

            {/* Right: 3D Platform & Bee Illustration */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] flex items-center justify-center">
                
                {/* Glowing Pedestal Disc */}
                <div
                  className="absolute bottom-8 w-[240px] h-[55px] rounded-[100%] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-[#00C6D7]/60"
                  style={{
                    transform: 'rotateX(60deg)',
                    boxShadow: '0 0 35px rgba(0, 198, 215, 0.4), inset 0 0 15px rgba(0, 198, 215, 0.3)',
                  }}
                />

                {/* Inner Blue Ring on Platform */}
                <div
                  className="absolute bottom-10 w-[200px] h-[48px] rounded-[100%] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 border border-[#0282EB]/80"
                  style={{
                    transform: 'rotateX(60deg)',
                    boxShadow: '0 0 20px rgba(2, 130, 235, 0.4)',
                  }}
                />

                {/* 3D Hovering Bee Mascot */}
                <motion.div
                  animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-[220px] h-[220px]"
                >
                  <svg viewBox="0 0 512 512" className="w-full h-full filter drop-shadow-[0_15px_25px_rgba(2,130,235,0.4)]" fill="none">
                    <defs>
                      <linearGradient id="ctaBeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="40%" stopColor="#0282EB" />
                        <stop offset="100%" stopColor="#0052CC" />
                      </linearGradient>
                      <linearGradient id="ctaWing" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#67E8F9" />
                        <stop offset="100%" stopColor="#0282EB" />
                      </linearGradient>
                    </defs>

                    {/* Antennae */}
                    <line x1="228" y1="148" x2="175" y2="100" stroke="url(#ctaBeeGrad)" strokeWidth="15" strokeLinecap="round" />
                    <circle cx="174" cy="98" r="20" fill="#38BDF8" />
                    <line x1="284" y1="148" x2="337" y2="100" stroke="url(#ctaBeeGrad)" strokeWidth="15" strokeLinecap="round" />
                    <circle cx="338" cy="98" r="20" fill="#38BDF8" />

                    {/* Stalks */}
                    <line x1="168" y1="300" x2="114" y2="354" stroke="url(#ctaBeeGrad)" strokeWidth="15" strokeLinecap="round" />
                    <circle cx="112" cy="356" r="17" fill="#38BDF8" />
                    <line x1="344" y1="300" x2="398" y2="354" stroke="url(#ctaBeeGrad)" strokeWidth="15" strokeLinecap="round" />
                    <circle cx="400" cy="356" r="17" fill="#38BDF8" />

                    {/* Head */}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M 256 122 C 280.85 122 301 142.15 301 167 C 301 191.85 280.85 212 256 212 C 231.15 212 211 191.85 211 167 C 211 142.15 231.15 122 256 122 Z M 256 148 C 266.49 148 275 156.51 275 167 C 275 177.49 266.49 186 256 186 C 245.51 186 237 177.49 237 167 C 237 156.51 245.51 148 256 148 Z"
                      fill="url(#ctaBeeGrad)"
                    />

                    {/* Wings */}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M 215 240 C 205 215 178 185 130 182 C 78 178 40 205 25 240 C 12 270 28 298 62 300 C 115 304 185 272 215 240 Z M 165 238 C 145 256 95 275 66 272 C 48 270 42 252 50 236 C 58 218 84 206 124 208 C 150 210 162 225 165 238 Z"
                      fill="url(#ctaWing)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M 297 240 C 307 215 334 185 382 182 C 434 178 472 205 487 240 C 500 270 484 298 450 300 C 397 304 327 272 297 240 Z M 347 238 C 367 256 417 275 446 272 C 464 270 470 252 462 236 C 454 218 428 206 388 208 C 362 210 350 225 347 238 Z"
                      fill="url(#ctaWing)"
                    />

                    {/* Body */}
                    <path d="M 205 270 C 205 242 307 242 307 270 Z" fill="url(#ctaBeeGrad)" />
                    <rect x="180" y="284" width="152" height="26" rx="13" fill="url(#ctaBeeGrad)" />
                    <rect x="186" y="324" width="140" height="26" rx="13" fill="url(#ctaBeeGrad)" />
                    <rect x="198" y="364" width="116" height="26" rx="13" fill="url(#ctaBeeGrad)" />
                    <path d="M 228 404 L 284 404 L 256 448 Z" fill="url(#ctaBeeGrad)" />
                  </svg>
                </motion.div>

                {/* Floating Metric Pill */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-2 -left-2 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 shadow-xl flex items-center gap-2 text-white text-xs font-mono"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Swarm Status: Active</span>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default CtaSection;
