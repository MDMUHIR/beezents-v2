import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import sphereImage from "../../assets/images/BEEZENT LOGO.png";
import mascotImage from "../../assets/images/ai_bee_mascot_1788367806249.jpg";
import { useRouter } from "../../context/RouterContext";
import { BeezentLogo } from "../shared/BeezentLogo";

interface BeeHeroProps {
  onOpenDemoModal: () => void;
  onOpenDayTimeline: () => void;
}

const HEADLINES = {
  automate: ["AUTOMATING", "THE", "WORKFLOWS", "FOR", "YOUR", "BUSINESS"],
  building: ["BUILDING", "INTELLIGENT", "SOLUTIONS", "FOR", "YOUR", "BUSINESS"],
} as const;

// Ticking telemetry numbers so the dark panel feels alive rather than static.
function useLiveMetric(base: number, jitter: number, decimals = 1) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() * 2 - 1) * jitter);
    }, 2200);
    return () => clearInterval(id);
  }, [base, jitter]);
  return value.toFixed(decimals);
}

// A button that leans a few pixels toward the cursor while hovered.
function MagneticButton({
  children,
  onClick,
  className,
  style,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy, ...style }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export const BeeHero: React.FC<BeeHeroProps> = ({
  onOpenDemoModal,
  onOpenDayTimeline,
}) => {
  const { navigate } = useRouter();
  const [headlineMode, setHeadlineMode] = useState<"building" | "automate">(
    "building",
  );
  const [brandNameMode, setBrandNameMode] = useState<"TestiQA" | "Beezent">(
    "TestiQA",
  );
  const [showMascot, setShowMascot] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 60, damping: 18 });
  const spy = useSpring(py, { stiffness: 60, damping: 18 });

  const sphereRotateY = useTransform(spx, [0, 1], [-40, 40]);
  const sphereRotateX = useTransform(spy, [0, 1], [15, -15]);
  const glowX = useTransform(spx, (v) => `${v * 100}%`);
  const glowY = useTransform(spy, (v) => `${v * 100}%`);

  const accuracy = useLiveMetric(99.8, 0.15, 1);
  const latency = useLiveMetric(940, 180, 0);

  // Auto-advance the headline every few seconds; any manual click restarts the timer.
  useEffect(() => {
    const id = setInterval(() => {
      setHeadlineMode((prev) =>
        prev === "building" ? "automate" : "building",
      );
    }, 5000);
    return () => clearInterval(id);
  }, [headlineMode]);

  const handlePointerMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const scrollToSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/solutions");
    }
  };

  const words = HEADLINES[headlineMode];

  return (
    <section className="relative overflow-hidden bg-slate-50/60 select-none">
      <div className="mx-auto relative">
        <div
          ref={cardRef}
          onMouseMove={handlePointerMove}
          className="  overflow-hidden relative"
        >
          {/* Faint dot-grid texture across the whole card, for depth without noise */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#1E2024 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* ========================================================
              HERO MAIN BODY
             ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] relative">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-20 bg-white/95 lg:bg-transparent">
              <div className="space-y-6">
                {/* Segmented mode switch — replaces the hidden text-link toggle with a visible control */}
                <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100/70 p-1 text-[11px] font-semibold tracking-wide">
                  {(["building", "automate"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setHeadlineMode(mode)}
                      className={`relative px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                        headlineMode === mode
                          ? "text-white"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {headlineMode === mode && (
                        <motion.span
                          layoutId="mode-pill"
                          className="absolute inset-0 rounded-full bg-[#2469E5]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">
                        {mode === "building" ? "Building" : "Automation"}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Headline with a directional crossfade between the two modes */}
                <div
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-extrabold text-[#22262B] tracking-tight leading-[1.06] uppercase"
                  style={{
                    fontFamily: "'Orbitron', 'Chakra Petch', sans-serif",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={headlineMode}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {words.slice(0, -1).map((w) => (
                        <div key={w}>{w}</div>
                      ))}
                      <div className="text-[#2469E5] flex items-center gap-3">
                        <span>{words[words.length - 1]}</span>
                        <span className="inline-block w-3 h-3 rounded-full bg-[#2469E5]/20 border border-[#2469E5]" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="max-w-md text-sm sm:text-base text-slate-500 font-normal leading-relaxed pt-1">
                  Intelligent autonomous AI systems engineered to verify,
                  automate, and orchestrate critical customer workflows with
                  zero latency and 24/7 reliability.
                </p>
              </div>

              <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-6">
                <button
                  onClick={scrollToSolutions}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 tracking-wider uppercase cursor-pointer group"
                >
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>

                <MagneticButton
                  onClick={onOpenDemoModal}
                  className="inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#2469E5] hover:bg-[#1b58ca] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg shadow-blue-500/25 transition-colors cursor-pointer"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span>Book a Demo</span>
                  <span className="w-8 h-8 rounded-lg bg-[#1B1F27] text-white flex items-center justify-center shadow-xs">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </MagneticButton>

                <button
                  onClick={onOpenDayTimeline}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#2469E5] transition-colors cursor-pointer"
                >
                  <span>Interactive Day Simulator</span>
                  <ChevronDown className="w-3 h-3 -rotate-90" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: dark panel with a cursor-tracking glow */}
            <div className="lg:col-span-4 bg-[#2B2F38] relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
              <motion.div
                className="pointer-events-none absolute -inset-1"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--gx) var(--gy), rgba(56,189,248,0.18), transparent 65%)",
                  // @ts-ignore custom props driven by motion values below
                  "--gx": glowX,
                  "--gy": glowY,
                }}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none text-white/15 font-black text-6xl sm:text-7xl lg:text-[88px] tracking-widest uppercase hidden sm:block"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                {headlineMode === "building" ? "BUILDING" : "AUTOMATION"}
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
                <div
                  className="flex items-center gap-2 group cursor-pointer"
                  title="Autonomous AI Bee, always on shift"
                >
                  <BeezentLogo variant="white" size="sm" />
                  <span className="font-mono text-[11px] text-[#38BDF8] group-hover:text-white transition-colors">
                    AUTONOMOUS_BEE // ACTIVE
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

             
            </div>

            {/* ========================================================
                3. CENTERPIECE 3D SPHERE — now tilts toward the cursor
               ======================================================== */}
            <div className="lg:absolute lg:right-[14%] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[480px] xl:w-[540px] pointer-events-none z-20 flex items-center justify-center p-4 lg:p-0">
              <div
                className="relative w-full max-w-[420px] lg:max-w-none aspect-square flex items-center justify-center"
                style={{ perspective: 900 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2469E5]/15 via-cyan-400/15 to-transparent rounded-full blur-3xl" />

                <motion.div
                  style={{
                    rotateX: sphereRotateX,
                    rotateY: sphereRotateY,
                    transformStyle: "preserve-3d",
                  }}
                  
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-[85%] h-[85%] flex items-center justify-center pointer-events-auto"
                >
                  <img
                    src={sphereImage}
                    alt="Futuristic 3D Labyrinth Sphere Core"
                    className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] mix-blend-multiply select-none"
                  />

                  <svg
                    className="absolute inset-0 w-full h-full text-slate-400/30 pointer-events-none"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <polygon
                      points="50,5 90,25 90,75 50,95 10,75 10,25"
                      stroke="currentColor"
                      strokeWidth="0.4"
                      strokeDasharray="1.5 1.5"
                    />
                    <polygon
                      points="50,15 80,30 80,70 50,85 20,70 20,30"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                    <line
                      x1="50"
                      y1="5"
                      x2="50"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                    <line
                      x1="90"
                      y1="25"
                      x2="80"
                      y2="30"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                    <line
                      x1="90"
                      y1="75"
                      x2="80"
                      y2="70"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                    <line
                      x1="50"
                      y1="95"
                      x2="50"
                      y2="85"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                    <line
                      x1="10"
                      y1="75"
                      x2="20"
                      y2="70"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                    <line
                      x1="10"
                      y1="25"
                      x2="20"
                      y2="30"
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                  </svg>
                </motion.div>

              

           
                <motion.div
                  animate={{ y: [-4, 4, -4], x: [2, -2, 2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-2 left-16 w-8 h-8 rounded-full bg-white shadow-lg border border-slate-200 pointer-events-none"
                />
                <motion.div
                  animate={{ y: [4, -4, 4], x: [-3, 3, -3] }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-12 left-10 w-5 h-5 rounded-full bg-white/80 backdrop-blur-xs shadow-md border border-slate-300 pointer-events-none"
                />
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/3 -right-4 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 shadow-xl pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeeHero;
