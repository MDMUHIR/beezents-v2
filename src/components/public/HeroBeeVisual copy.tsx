import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Activity } from 'lucide-react';

export const HeroBeeVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax motion values (normalized -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Damped spring physics for a silky smooth, luxurious feel
  const springConfig = { damping: 24, stiffness: 100, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax transforms for the Bee Mascot (Primary Focal Point)
  const beeRotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const beeRotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const beeTranslateX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const beeTranslateY = useTransform(smoothY, [-0.5, 0.5], [-22, 22]);

  // Parallax for Pedestal (Deeper Plane, subtle tilt and shift)
  const pedestalX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const pedestalY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
  const pedestalRotateX = useTransform(smoothY, [-0.5, 0.5], [64, 60]);

  // Parallax for Floating UI Cards (Foreground Plane, accentuated movement)
  const topCardX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const topCardY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);
  const bottomCardX = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const bottomCardY = useTransform(smoothY, [-0.5, 0.5], [22, -22]);

  // Parallax for Dark Back Panel (Background Plane, opposing movement)
  const panelX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const panelY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // Parallax for Ambient Particles (Multi-depth layers)
  const particlesFarX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const particlesFarY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const particlesNearX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const particlesNearY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[540px] sm:h-[600px] lg:h-[650px] flex items-center justify-center select-none overflow-visible perspective-[1200px]"
    >
      {/* ========================================================
          1. SOFT RADIAL GLOW PARTICLES (Background Layer)
         ======================================================== */}
      <motion.div
        style={{ x: particlesFarX, y: particlesFarY }}
        className="absolute inset-0 pointer-events-none z-0 overflow-visible"
      >
        {/* Soft Radial Ambient Aura 1: Deep Electric Blue */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#0282EB]/15 blur-[80px] pointer-events-none" />

        {/* Soft Radial Ambient Aura 2: Cyan Radiance */}
        <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-[#00C6D7]/18 blur-[70px] pointer-events-none" />

        {/* Soft Radial Ambient Aura 3: Deep Brand Blue Accent */}
        <div className="absolute bottom-1/4 left-1/3 w-44 h-44 rounded-full bg-[#0282EB]/15 blur-[60px] pointer-events-none" />

        {/* Floating Particle: Large Cyan Glow Orb */}
        <motion.div
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            opacity: [0.35, 0.65, 0.35],
            scale: [0.95, 1.15, 0.95],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-12 w-14 h-14 rounded-full bg-gradient-to-tr from-[#00C6D7]/30 to-[#38BDF8]/40 blur-md"
        />

        {/* Floating Particle: Electric Blue Specular Node */}
        <motion.div
          animate={{
            y: [10, -10, 10],
            x: [8, -8, 8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-36 right-20 w-8 h-8 rounded-full bg-[#0282EB]/30 blur-xs"
        />

        {/* Floating Particle: Soft Blue Shimmer Orb */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            scale: [0.9, 1.25, 0.9],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-36 left-20 w-6 h-6 rounded-full bg-[#0282EB]/35 blur-xs"
        />

        {/* Floating Particle: Deep Indigo Floating Bead */}
        <motion.div
          animate={{
            y: [12, -12, 12],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-28 right-32 w-10 h-10 rounded-full bg-[#0282EB]/25 blur-sm"
        />
      </motion.div>

      {/* ========================================================
          2. DARK CONTRASTING UPPER-RIGHT PANEL (Background Parallax)
         ======================================================== */}
      <motion.div
        style={{ x: panelX, y: panelY }}
        className="absolute -top-6 -right-6 lg:-right-10 w-[55%] sm:w-[50%] lg:w-[48%] h-[82%] bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#030712] rounded-3xl lg:rounded-l-[36px] rounded-r-none border-l border-y border-slate-800/80 shadow-2xl p-5 sm:p-6 overflow-hidden hidden sm:flex flex-col justify-between z-0"
      >
        {/* Ambient cyan/blue glow in dark panel */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#0282EB]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-[#00C6D7]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Large Faint Vertical Typography Watermark "BEEZENTS" */}
        <div className="absolute right-4 top-8 bottom-8 flex items-center pointer-events-none select-none opacity-[0.08] z-0">
          <span
            className="font-black text-6xl lg:text-7xl xl:text-8xl tracking-widest text-white uppercase"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif",
            }}
          >
            BEEZENTS
          </span>
        </div>

        {/* Top Dark Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-[88%] bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/60 p-3 shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] font-mono text-slate-400 ml-1">agent_orchestrator.ts</span>
            </div>
            <span className="text-[9px] font-mono text-[#38BDF8] flex items-center gap-1">
              <Activity className="w-2.5 h-2.5" /> RUNNING
            </span>
          </div>
          <div className="font-mono text-[10px] space-y-1 text-slate-300">
            <p className="text-slate-500">// Deploying enterprise swarm</p>
            <p>
              <span className="text-pink-400">const</span> <span className="text-blue-300">swarm</span> ={' '}
              <span className="text-amber-300">new BeezentAgent</span>&#40;&#41;;
            </p>
            <p className="text-emerald-400">await swarm.executePipeline(&#123; mode: 'autonomous' &#125;);</p>
          </div>
        </motion.div>

        {/* Bottom Dark Analytics Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-[84%] bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/60 p-3 shadow-lg space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Autonomous Efficiency
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400">+94.8%</span>
          </div>
          {/* Mini multi-bar chart */}
          <div className="flex items-end gap-1.5 h-10 pt-1">
            {[45, 60, 52, 78, 65, 88, 95, 82, 100].map((val, idx) => (
              <div key={idx} className="flex-1 bg-slate-800 rounded-t-xs h-full flex items-end">
                <div
                  className="w-full rounded-t-xs bg-gradient-to-t from-[#0282EB] to-[#38BDF8]"
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================
          3. FUTURISTIC 3D GLOWING PEDESTAL / PLATFORM (Mid-Ground Parallax)
         ======================================================== */}
      <motion.div
        style={{ x: pedestalX, y: pedestalY }}
        className="absolute bottom-6 sm:bottom-10 lg:bottom-12 w-[340px] sm:w-[420px] lg:w-[480px] h-[140px] flex items-center justify-center z-10 pointer-events-none"
      >
        {/* Soft Drop Shadow under pedestal */}
        <div className="absolute bottom-2 w-[85%] h-14 rounded-full bg-slate-900/25 blur-2xl transform scale-y-50" />
        <div className="absolute bottom-5 w-[70%] h-8 rounded-full bg-slate-900/20 blur-xl transform scale-y-40" />

        {/* Platform Bottom Layer / Base Disc */}
        <motion.div
          style={{ rotateX: pedestalRotateX }}
          className="absolute bottom-4 w-[320px] sm:w-[390px] lg:w-[440px] h-[72px] rounded-[100%] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-xl border border-slate-300"
        />

        {/* Platform Mid Disc with Glowing Cyan Neon Ring */}
        <motion.div
          style={{
            rotateX: pedestalRotateX,
            boxShadow: '0 0 32px rgba(0, 198, 215, 0.5), inset 0 0 16px rgba(0, 198, 215, 0.4)',
            border: '2px solid rgba(0, 198, 215, 0.85)',
          }}
          className="absolute bottom-7 w-[300px] sm:w-[365px] lg:w-[415px] h-[68px] rounded-[100%] bg-gradient-to-b from-white via-slate-100 to-slate-200"
        />

        {/* Platform Upper Tier with Glowing Brand Blue Neon Ring */}
        <motion.div
          style={{
            rotateX: pedestalRotateX,
            boxShadow:
              '0 0 28px rgba(2, 130, 235, 0.45), inset 0 2px 6px rgba(255, 255, 255, 0.9), inset 0 -2px 6px rgba(2, 130, 235, 0.3)',
            border: '2px solid rgba(2, 130, 235, 0.85)',
          }}
          className="absolute bottom-11 w-[260px] sm:w-[325px] lg:w-[370px] h-[62px] rounded-[100%] bg-gradient-to-b from-white via-slate-50 to-slate-200"
        />

        {/* Concentric Surface Reflection on Pedestal */}
        <motion.div
          style={{ rotateX: pedestalRotateX }}
          className="absolute bottom-12 w-[220px] sm:w-[270px] lg:w-[310px] h-[52px] rounded-[100%] bg-gradient-to-br from-white/90 via-slate-100/50 to-transparent"
        />
      </motion.div>

      {/* ========================================================
          4. OFFICIAL BEEZENTS 3D BEE MASCOT (Interactive Parallax & Float)
         ======================================================== */}
      <motion.div
        style={{
          x: beeTranslateX,
          y: beeTranslateY,
          rotateX: beeRotateX,
          rotateY: beeRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-20 w-[300px] sm:w-[360px] lg:w-[410px] h-[300px] sm:h-[360px] lg:h-[410px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Continuous organic float motion container */}
        <motion.div
          animate={{
            y: [-9, 9, -9],
            rotateZ: [-1.2, 1.2, -1.2],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Multi-layered Soft Radial Glow Core behind Bee Mascot */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#0282EB]/40 via-[#00C6D7]/30 to-[#38BDF8]/20 blur-3xl pointer-events-none -z-10" />
          <motion.div
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-[#00C6D7]/35 via-[#0282EB]/25 to-[#0052CC]/30 blur-2xl pointer-events-none -z-10"
          />

          {/* 3D Specular Lighting & Shader Elements for the Official Bee */}
          <svg
            viewBox="0 0 512 512"
            className="w-full h-full filter drop-shadow-[0_24px_36px_rgba(0,82,204,0.42)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 3D Metallic Gradient - Body Bars */}
              <linearGradient id="bee3dBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="25%" stopColor="#0080FF" />
                <stop offset="70%" stopColor="#0052CC" />
                <stop offset="100%" stopColor="#003399" />
              </linearGradient>

              {/* Specular Ridge Light */}
              <linearGradient id="specularRim" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0052CC" stopOpacity="0.1" />
              </linearGradient>

              {/* Wing 3D Glossy Aero Loops */}
              <linearGradient id="bee3dWingL" x1="0%" y1="20%" x2="100%" y2="90%">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="45%" stopColor="#0091FF" />
                <stop offset="90%" stopColor="#0052CC" />
              </linearGradient>

              <linearGradient id="bee3dWingR" x1="100%" y1="20%" x2="0%" y2="90%">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="45%" stopColor="#0091FF" />
                <stop offset="90%" stopColor="#0052CC" />
              </linearGradient>

              {/* Antennae Chrome Gradient */}
              <linearGradient id="antennaL" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0052CC" />
                <stop offset="50%" stopColor="#0080FF" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              <linearGradient id="antennaR" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0052CC" />
                <stop offset="50%" stopColor="#0080FF" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Spherical Specular Highlight Radial */}
              <radialGradient id="sphereShine" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#0052CC" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#002266" />
              </radialGradient>

              {/* Radial glow filter for antenna nodes */}
              <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Top Left Antenna Stalk & Glowing Spherical Node */}
            <line
              x1="228"
              y1="148"
              x2="175"
              y2="100"
              stroke="url(#antennaL)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <circle cx="174" cy="98" r="22" fill="url(#sphereShine)" filter="url(#nodeGlow)" />
            <circle cx="168" cy="92" r="6" fill="#FFFFFF" fillOpacity="0.9" />

            {/* Top Right Antenna Stalk & Glowing Spherical Node */}
            <line
              x1="284"
              y1="148"
              x2="337"
              y2="100"
              stroke="url(#antennaR)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <circle cx="338" cy="98" r="22" fill="url(#sphereShine)" filter="url(#nodeGlow)" />
            <circle cx="332" cy="92" r="6" fill="#FFFFFF" fillOpacity="0.9" />

            {/* Lower Left Stalk & Spherical Node */}
            <line
              x1="168"
              y1="300"
              x2="114"
              y2="354"
              stroke="url(#antennaL)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <circle cx="112" cy="356" r="19" fill="url(#sphereShine)" filter="url(#nodeGlow)" />
            <circle cx="107" cy="351" r="5" fill="#FFFFFF" fillOpacity="0.9" />

            {/* Lower Right Stalk & Spherical Node */}
            <line
              x1="344"
              y1="300"
              x2="398"
              y2="354"
              stroke="url(#antennaR)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <circle cx="400" cy="356" r="19" fill="url(#sphereShine)" filter="url(#nodeGlow)" />
            <circle cx="395" cy="351" r="5" fill="#FFFFFF" fillOpacity="0.9" />

            {/* Head: Donut Ring with 3D Depth */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 256 122 C 280.85 122 301 142.15 301 167 C 301 191.85 280.85 212 256 212 C 231.15 212 211 191.85 211 167 C 211 142.15 231.15 122 256 122 Z M 256 148 C 266.49 148 275 156.51 275 167 C 275 177.49 266.49 186 256 186 C 245.51 186 237 177.49 237 167 C 237 156.51 245.51 148 256 148 Z"
              fill="url(#bee3dBody)"
            />
            {/* Head Specular Crescent Arc */}
            <path
              d="M 230 134 C 242 126 268 126 280 134"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />

            {/* Left Wing (3D Aerodynamic Loop with specular highlights) */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 215 240 C 205 215 178 185 130 182 C 78 178 40 205 25 240 C 12 270 28 298 62 300 C 115 304 185 272 215 240 Z M 165 238 C 145 256 95 275 66 272 C 48 270 42 252 50 236 C 58 218 84 206 124 208 C 150 210 162 225 165 238 Z"
              fill="url(#bee3dWingL)"
            />
            <path
              d="M 45 220 C 70 190 120 186 160 195"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />

            {/* Right Wing (3D Aerodynamic Loop with specular highlights) */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 297 240 C 307 215 334 185 382 182 C 434 178 472 205 487 240 C 500 270 484 298 450 300 C 397 304 327 272 297 240 Z M 347 238 C 367 256 417 275 446 272 C 464 270 470 252 462 236 C 454 218 428 206 388 208 C 362 210 350 225 347 238 Z"
              fill="url(#bee3dWingR)"
            />
            <path
              d="M 467 220 C 442 190 392 186 352 195"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />

            {/* Body Segments (Layered 3D Ribs) */}
            {/* Segment 1: Curved dome cap */}
            <path d="M 205 270 C 205 242 307 242 307 270 Z" fill="url(#bee3dBody)" />
            <path
              d="M 220 256 C 240 248 272 248 292 256"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />

            {/* Segment 2: Rounded horizontal bar */}
            <rect x="180" y="284" width="152" height="26" rx="13" fill="url(#bee3dBody)" />
            <line
              x1="195"
              y1="290"
              x2="317"
              y2="290"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />

            {/* Segment 3: Rounded horizontal bar */}
            <rect x="186" y="324" width="140" height="26" rx="13" fill="url(#bee3dBody)" />
            <line
              x1="200"
              y1="330"
              x2="312"
              y2="330"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />

            {/* Segment 4: Rounded horizontal bar */}
            <rect x="198" y="364" width="116" height="26" rx="13" fill="url(#bee3dBody)" />
            <line
              x1="210"
              y1="370"
              x2="302"
              y2="370"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />

            {/* Segment 5: Tail stinger triangle */}
            <path d="M 228 404 L 284 404 L 256 448 Z" fill="url(#bee3dBody)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ========================================================
          5. FLOATING UI / DATA CARDS (Foreground Parallax)
         ======================================================== */}

      {/* Top Floating Card: "AI Agents Deployed / 120+" with Sparkline */}
      <motion.div
        style={{ x: topCardX, y: topCardY }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-12 left-4 sm:left-6 lg:left-10 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-slate-200/80 min-w-[155px] sm:min-w-[170px]"
      >
        <div className="text-[11px] font-semibold text-[#0282EB]">AI Agents Deployed</div>
        <div className="flex items-baseline justify-between mt-1">
          <span
            className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            120+
          </span>
          {/* Blue Accent Sparkline Curve */}
          <svg width="64" height="24" viewBox="0 0 64 24" fill="none" className="ml-2">
            <path
              d="M 2 20 Q 18 18 26 12 T 42 10 T 62 4"
              stroke="#0282EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="62" cy="4" r="2.5" fill="#0282EB" />
          </svg>
        </div>
      </motion.div>

      {/* Bottom Floating Card: "Automation Hours Saved / 8,450+" with Sparkline */}
      <motion.div
        style={{ x: bottomCardX, y: bottomCardY }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-2 sm:right-6 lg:right-8 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-slate-200/80 min-w-[175px] sm:min-w-[190px]"
      >
        <div className="text-[11px] font-semibold text-[#0282EB]">Automation Hours Saved</div>
        <div className="flex items-baseline justify-between mt-1">
          <span
            className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            8,450+
          </span>
          {/* Blue Accent Sparkline Curve */}
          <svg width="68" height="24" viewBox="0 0 68 24" fill="none" className="ml-2">
            <path
              d="M 2 22 Q 16 19 28 14 T 48 11 T 66 3"
              stroke="#0282EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="66" cy="3" r="2.5" fill="#0282EB" />
          </svg>
        </div>
      </motion.div>

      {/* ========================================================
          6. SOFT RADIAL GLOW PARTICLES (Foreground Depth Layer)
         ======================================================== */}
      <motion.div
        style={{ x: particlesNearX, y: particlesNearY }}
        className="absolute inset-0 pointer-events-none z-30 overflow-visible"
      >
        {/* Crisp Glowing Cyan Accent Node (Floating Foreground) */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 right-[32%] w-3 h-3 rounded-full bg-[#00C6D7] shadow-[0_0_14px_#00C6D7]"
        />

        {/* Small Glowing Blue Accent Sphere (Floating Foreground) */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute bottom-28 left-[45%] w-3.5 h-3.5 rounded-full bg-[#0282EB] shadow-[0_0_16px_#0282EB]"
        />

        {/* Soft Radial Micro Sparkle (Foreground Upper Left) */}
        <motion.div
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute top-20 left-[28%] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#38BDF8]"
        />
      </motion.div>

      {/* ========================================================
          7. FLOATING 3D GLOSSY SPHERES
         ======================================================== */}
      {/* Glossy Dark Chrome Sphere (Left) */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-6 sm:left-14 bottom-28 w-11 h-11 sm:w-14 sm:h-14 rounded-full z-20 shadow-xl"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #475569 0%, #1E293B 45%, #090D16 100%)',
          boxShadow: '0 12px 24px -4px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.4)',
        }}
      />

      {/* Smooth Pearl White Sphere (Upper Center-Left) */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute left-24 sm:left-32 top-32 w-8 h-8 sm:w-10 sm:h-10 rounded-full z-20 shadow-md"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F1F5F9 55%, #CBD5E1 100%)',
          boxShadow: '0 8px 16px -2px rgba(15,23,42,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
        }}
      />

      {/* Glossy Pearl White Sphere (Far Right Dark Edge) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute right-3 sm:right-10 top-24 w-7 h-7 sm:w-9 sm:h-9 rounded-full z-20 shadow-md hidden sm:block"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #E2E8F0 60%, #94A3B8 100%)',
          boxShadow: '0 6px 14px -2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Fine Cyan Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 500 500">
        <line
          x1="120"
          y1="180"
          x2="175"
          y2="220"
          stroke="#00C6D7"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.4"
        />
        <line
          x1="360"
          y1="340"
          x2="420"
          y2="380"
          stroke="#0282EB"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
};
export default HeroBeeVisual;
