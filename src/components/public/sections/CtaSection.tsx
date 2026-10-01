import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useRouter } from "../../../context/RouterContext";

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

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase font-orbitron">
                READY TO TRANSFORM
                <br />
                YOUR BUSINESS?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Let's build something amazing together. Schedule a call to
                discuss how AI can automate your workflows and scale operations.
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
                  onClick={() => navigate("/case-studies")}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm sm:text-base font-semibold px-6 py-4 rounded-xl border border-slate-700 transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Case Studies</span>
                </button>
              </div>
            </div>

            {/* Right: 3D Platform & Bee Illustration */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
              <div className="relative w-[min(280px,100%)] sm:w-[320px] aspect-square flex items-center justify-center">
                {/* Glowing Pedestal Disc */}
                <div
                  className="absolute bottom-8 w-[min(240px,90%)] h-[55px] rounded-[100%] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-[#00C6D7]/60"
                  style={{
                    transform: "rotateX(60deg)",
                    boxShadow:
                      "0 0 35px rgba(0, 198, 215, 0.4), inset 0 0 15px rgba(0, 198, 215, 0.3)",
                  }}
                />

                {/* Inner Blue Ring on Platform */}
                <div
                  className="absolute bottom-10 w-[min(200px,75%)] h-[48px] rounded-[100%] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 border border-[#0282EB]/80"
                  style={{
                    transform: "rotateX(60deg)",
                    boxShadow: "0 0 20px rgba(2, 130, 235, 0.4)",
                  }}
                />

                {/* 3D Hovering Bee Mascot */}
                <motion.div
                  animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 w-[min(220px,85%)] aspect-square select-none pointer-events-none"
                >
                  <img
                    src="/logo/beezent-logo.svg "
                    alt="Bee Mascot 3D Illustration"
                  ></img>
                </motion.div>

                {/* Floating Metric Pill */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-2 -left-1 sm:-left-2 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 shadow-xl flex items-center gap-2 text-white text-xs font-mono"
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
