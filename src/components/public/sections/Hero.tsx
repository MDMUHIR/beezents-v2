import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "../../../context/RouterContext";

const HEADLINES = {
  automate: ["AUTOMATING", "THE", "WORKFLOWS", "FOR", "YOUR", "BUSINESS"],
  building: ["BUILDING", "INTELLIGENT", "SOLUTIONS", "FOR", "YOUR", "BUSINESS"],
} as const;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    title: "AI agents",
    text: "Software teammates that read, decide and act across your tools.",
    icon: (
      <>
        <rect x="4" y="8" width="16" height="11" rx="3" />
        <path d="M12 8V5" />
        <circle cx="12" cy="3.8" r="1.2" />
        <circle cx="9" cy="13.5" r="1" />
        <circle cx="15" cy="13.5" r="1" />
      </>
    ),
  },
  {
    title: "Automation",
    text: "Repetitive multi-step work, handled from start to finish.",
    icon: (
      <>
        <circle cx="5.5" cy="6" r="2.5" />
        <circle cx="18.5" cy="12" r="2.5" />
        <circle cx="5.5" cy="18" r="2.5" />
        <path d="M8 6h4a3 3 0 0 1 3 3v.5M8 18h4a3 3 0 0 0 3-3v-.5" />
      </>
    ),
  },
  {
    title: "Copilots",
    text: "Chat and assistant tools built around how your team works.",
    icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  },
  {
    title: "Knowledge",
    text: "Answers grounded in your own documents, not guesses.",
    icon: (
      <>
        <ellipse cx="12" cy="5.5" rx="8" ry="3" />
        <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
  },
  {
    title: "Voice",
    text: "Agents that answer calls, book appointments and take notes.",
    icon: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
  },
  {
    title: "Vision",
    text: "Systems that read images, scans, forms and video.",
    icon: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Chatbots",
    text: "Customer-facing assistants for websites, support and sales.",
    icon: (
      <>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
        <circle cx="8.5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="15.5" cy="12" r="1" />
      </>
    ),
  },
  {
    title: "RAG",
    text: "Retrieval pipelines over your enterprise documents, APIs and data.",
    icon: (
      <>
        <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7z" />
        <path d="M14 3v4h4" />
        <circle cx="11" cy="12" r="3" />
        <path d="M13.3 14.3 16 17" />
      </>
    ),
  },
];

const TOOLS = [
  "Gmail",
  "Google Calendar",
  "Google Sheets",
  "Google Drive",
  "Slack",
  "Notion",
  "HubSpot",
  "Salesforce",
  "Airtable",
  "Facebook",
  "WhatsApp",
  "Zapier",
  "n8n",
];
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
/* ------------------------------------------------------------------ */
/* Honeycomb geometry (pointy-top hexagons, axial coordinates)         */
/* ------------------------------------------------------------------ */
const R = 60;
const CELL_RADIUS = R - 3; // leaves a 3px gap between cells
const HUB_RADIUS = 60; // centre polygon is clearly bigger than the service cells
const HUB_GRADIENT_ID = "beezent-hub-gradient";
const HUB_GLOW_ID = "beezent-hub-glow";

const toXY = (q: number, r: number): [number, number] => [
  R * Math.sqrt(3) * (q + r / 2),
  R * 1.5 * r,
];

function hexPoints(cx: number, cy: number, radius: number) {
  const pts: string[] = [];
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 180) * (60 * k + 30);
    pts.push(
      `${(cx + radius * Math.cos(a)).toFixed(1)},${(cy + radius * Math.sin(a)).toFixed(1)}`,
    );
  }
  return pts.join(" ");
}

// Brand colours sampled from the logo: deep blue -> blue -> cyan
const STOPS = ["#013498", "#005BD8", "#00BDD2"].map((h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]);
function colorAt(x: number) {
  const t = Math.max(0, Math.min(1, (x + 210) / 420));
  const [a, b, u] =
    t < 0.5 ? [STOPS[0], STOPS[1], t * 2] : [STOPS[1], STOPS[2], (t - 0.5) * 2];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * u));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// Ring 1: the six inner service cells, clockwise from top-right
const RING1 = [
  [1, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [0, -1],
].map(([q, r], i) => {
  const [x, y] = toXY(q, r);
  return {
    x,
    y,
    color: colorAt(x),
    service: SERVICES[i],
    delay: 0.12 + i * 0.07,
  };
});

// Outer service cells promoted from ring 2: Chatbots (right), RAG (left)
const RING1_OUTER = [
  { q: 2, r: 0, service: SERVICES[6] },
  { q: -2, r: 0, service: SERVICES[7] },
].map(({ q, r, service }, i) => {
  const [x, y] = toXY(q, r);
  return { x, y, color: colorAt(x), service, delay: 0.6 + i * 0.04 };
});

const SERVICE_CELLS = [...RING1, ...RING1_OUTER];

// Ring 2: decorative cells (solid, tinted or outline only), keeping the
// original layout with the two promoted cells (right/left) removed
const RING2 = [
  [-1, -1, "f"],
  [1, -2, "o"],
  [0, -2, "t"],
  [2, -2, "o"],
  [2, -1, "o"],
  [1, 1, "t"],
  [0, 2, "o"],
  [-2, 2, "f"],
  [-1, 2, "o"],
  [-2, 1, "t"],
].map(([q, r, kind]: [number, number, string], i) => {
  const [x, y] = toXY(q, r);
  return { x, y, color: colorAt(x), kind, delay: 0.55 + i * 0.04 };
});

/* ------------------------------------------------------------------ */
/* Shared Tailwind fragments                                           */
/* ------------------------------------------------------------------ */
const CELL_BASE = `
  outline-none [transform-box:fill-box] origin-center
  animate-[cellIn_0.7s_cubic-bezier(0.2,0.8,0.2,1)_both] [animation-delay:var(--d)]
  motion-reduce:animate-none
  [&>polygon]:transition-[fill,stroke,stroke-width] [&>polygon]:duration-200
`;

/* ------------------------------------------------------------------ */
/* Hive                                                                */
/* ------------------------------------------------------------------ */
function Hive({ logoSrc }: { logoSrc: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);

  // Tighter crop on small screens so labels stay readable
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 619px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const current = active === null ? null : SERVICE_CELLS[active].service;

  return (
    <div className="relative">
      <svg
        className="block w-full h-auto overflow-hidden"
        viewBox={compact ? "-172 -172 344 344" : "-270 -250 540 500"}
        role="group"
        aria-label="Eight things Beezent builds, arranged as a honeycomb around the Beezent bee"
      >
        <defs>
          <linearGradient
            id={HUB_GRADIENT_ID}
            gradientUnits="userSpaceOnUse"
            x1="-60"
            y1="0"
            x2="60"
            y2="0"
          >
            <stop offset="0" stopColor="#013498" />
            <stop offset=".55" stopColor="#005BD8" />
            <stop offset="1" stopColor="#00BDD2" />
          </linearGradient>
          <radialGradient id={HUB_GLOW_ID} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#00BDD2" stopOpacity="0.55" />
            <stop offset="1" stopColor="#005BD8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* decorative ring */}
        {RING2.map((c, i) => (
          <g
            key={i}
            className={`${CELL_BASE} ${c.kind === "f" ? "[&>polygon]:fill-[var(--c)] [&>polygon]:stroke-none [&>circle]:fill-white" : c.kind === "t" ? "[&>polygon]:fill-[var(--c)] [&>polygon]:[fill-opacity:0.14] [&>polygon]:stroke-none" : "[&>polygon]:[fill:none] [&>polygon]:stroke-[#e1e8f5] dark:[&>polygon]:stroke-[#1e3266] [&>polygon]:stroke-[1.5]"}`}
            style={
              {
                "--c": c.color,
                "--d": `${c.delay.toFixed(2)}s`,
              } as React.CSSProperties
            }
          >
            <polygon points={hexPoints(c.x, c.y, CELL_RADIUS)} />
            {c.kind === "f" && (
              <circle cx={c.x.toFixed(1)} cy={c.y.toFixed(1)} r="4" />
            )}
          </g>
        ))}

        {/* centre: the bee with pulsing energy glow */}
        <g
          className={`${CELL_BASE} [&>polygon]:fill-white`}
          style={{ "--d": "0s" } as React.CSSProperties}
        >
          <circle
            cx="0"
            cy="0"
            r="66"
            fill={`url(#${HUB_GLOW_ID})`}
            className="[transform-box:fill-box] origin-center animate-[hubPulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none"
          />
          <polygon
            points={hexPoints(0, 0, HUB_RADIUS)}
            stroke={`url(#${HUB_GRADIENT_ID})`}
            strokeWidth="3"
          />
          <image
            href={logoSrc}
            x="-34"
            y="-28"
            width="68"
            height="55"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* service cells */}
        {SERVICE_CELLS.map((c, i) => {
          const show = () => setActive(i);
          const on = active === i;
          return (
            <g
              key={c.service.title}
              className={`
                  ${CELL_BASE} cursor-pointer
                  [&>polygon]:fill-white dark:[&>polygon]:fill-[#0e2049]
                  [&>polygon]:[stroke:var(--c)] [&>polygon]:[stroke-opacity:0.5] [&>polygon]:stroke-[1.5]
                  [&>text]:text-[12.5px] [&>text]:font-semibold [&>text]:fill-[#0a1b3d]
                  dark:[&>text]:fill-[#eaf1ff] [&>text]:[text-anchor:middle]
                  [&>text]:transition-[fill] [&>text]:duration-200
                  hover:[&>polygon]:fill-[var(--c)] hover:[&>polygon]:[stroke-opacity:1]
                  hover:[&_.ico]:[stroke:#fff] hover:[&>text]:fill-white
                  hover:drop-shadow-[0_0_10px_var(--c)]
                  focus-visible:outline-3 focus-visible:outline-offset-3
                  focus-visible:outline-[#005bd8] dark:focus-visible:outline-[#5aa6ff] focus-visible:rounded-lg
                  ${on ? "[&>polygon]:fill-[var(--c)] [&>polygon]:[stroke-opacity:1] [&_.ico]:[stroke:#fff] [&>text]:fill-white" : ""}
                `}
              style={
                {
                  "--c": c.color,
                  "--d": `${c.delay.toFixed(2)}s`,
                } as React.CSSProperties
              }
              tabIndex={0}
              role="button"
              aria-label={`${c.service.title}: ${c.service.text}`}
              onMouseEnter={show}
              onFocus={show}
              onClick={show}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  show();
                }
              }}
            >
              <polygon points={hexPoints(c.x, c.y, CELL_RADIUS)} />
              <g
                className="ico [fill:none] [stroke:var(--c)] [stroke-width:1.7] [stroke-linecap:round] [stroke-linejoin:round] transition-[stroke] duration-200"
                transform={`translate(${(c.x - 18).toFixed(1)},${(c.y - 31).toFixed(1)}) scale(1.5)`}
              >
                {c.service.icon}
              </g>
              <text x={c.x.toFixed(1)} y={(c.y + 30).toFixed(1)}>
                {c.service.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* terminal-style status card */}
      <div
        className="mt-2 rounded-2xl overflow-hidden bg-[#0b1a3e] border border-[#1e3266] shadow-[0_16px_48px_-18px_rgba(2,20,60,0.55)]"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1e3266] bg-[#0e2049]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-chakra text-[10px] tracking-[0.22em] uppercase text-[#98a8cb]">
            beezent-agent --status
          </span>
          <span className="ml-auto font-chakra text-[10px] text-[#00BDD2] animate-pulse">
            ●
          </span>
        </div>
        <div className="px-4 py-3.5 min-h-[84px]">
          {current ? (
            <>
              <b className="block font-orbitron font-semibold text-[1.05rem] text-[#eaf1ff]">
                <span className="text-[#00BDD2] mr-2 font-chakra">&gt;</span>
                {current.title}
              </b>
              <p className="m-0 mt-1 text-[0.95rem] leading-[1.5] text-[#c3cfea]">
                {current.text}{" "}
                <a
                  href="#services"
                  className="text-[#5aa6ff] font-semibold underline-offset-[3px] hover:text-[#7db8ff]"
                >
                  See the service
                </a>
              </p>
            </>
          ) : (
            <>
              <b className="block font-orbitron font-semibold text-[1.05rem] text-[#eaf1ff]">
                <span className="text-[#00BDD2] mr-2 font-chakra">&gt;</span>
                What do you need built?
              </b>
              <p className="m-0 mt-1 text-[0.95rem] leading-[1.5] text-[#c3cfea]">
                Hover or tap a cell to see what we build.
                <span className="ml-1.5 inline-block w-2 h-4 align-text-bottom bg-[#5aa6ff] animate-[blink_1.1s_step-end_infinite]" />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
interface HeroProps {
  logoSrc?: string;
  onOpenDemoModal?: () => void;
  onOpenDayTimeline?: () => void;
}

const BTN_BASE =
  "inline-flex items-center justify-center px-[26px] py-[14px] rounded-full border-[1.5px] border-transparent font-semibold text-base leading-[1.2] no-underline cursor-pointer transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#005bd8] dark:focus-visible:outline-[#5aa6ff] focus-visible:rounded-md";

export function Hero({
  logoSrc = "/logo/Beezents-logo.png",
  onOpenDemoModal,
  onOpenDayTimeline,
}: HeroProps) {
  const [headlineMode, setHeadlineMode] = useState<"building" | "automate">(
    "building",
  );

  useEffect(() => {
    const id = setInterval(() => {
      setHeadlineMode((prev) =>
        prev === "building" ? "automate" : "building",
      );
    }, 5000);
    return () => clearInterval(id);
  }, [headlineMode]);

  const words = HEADLINES[headlineMode];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-[#071230] text-[#0a1b3d] dark:text-[#eaf1ff] font-sans text-[1.0625rem] leading-[1.6] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,80px)]"
    >
      {/* ambient tech background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(2,130,235,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(2,130,235,0.6)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#005BD8]/15 blur-3xl animate-[float_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#00BDD2]/10 blur-3xl animate-[float_11s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#00BDD2]/40 to-transparent opacity-20 animate-[scan_8s_linear_infinite]" />
      </div>

      <div className="relative max-w-[1440px]  mx-auto px-[clamp(20px,4vw,40px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] gap-[clamp(24px,4vw,64px)] items-center">
          <div>
            {/* live status HUD */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-chakra text-[11px] tracking-[0.18em] uppercase text-[#5b6987] dark:text-[#98a8cb]">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Systems Online
                </span>
              </span>
            </div>

            <div
              className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-extrabold text-[#22262B] dark:text-[#eaf1ff] tracking-tight leading-[1.06] uppercase"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
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
                  <div className="text-[#2469E5] dark:text-[#5aa6ff] flex items-center gap-3">
                    <span>{words[words.length - 1]}</span>
                    <span className="inline-block w-3 h-3 rounded-full bg-[#2469E5]/20 dark:bg-[#5aa6ff]/20 border border-[#2469E5] dark:border-[#5aa6ff]" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-[26px] max-w-[46ch] text-[1.125rem] text-[#3a4a6b] dark:text-[#c3cfea]">
              Intelligent autonomous AI systems engineered to verify, automate,
              and orchestrate critical customer workflows with zero latency and
              24/7 reliability.
            </p>
            <div className="flex flex-wrap gap-3 mt-[34px]">
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
              <a
                href="/"
                className={`${BTN_BASE} text-[#0a1b3d] dark:text-[#eaf1ff] border-[#e1e8f5] dark:border-[#1e3266] bg-transparent hover:border-[#005bd8] dark:hover:border-[#5aa6ff]`}
              >
                See our work
              </a>
            </div>
            {onOpenDayTimeline && (
              <button
                onClick={onOpenDayTimeline}
                className=" hidden sm:inline-flex items-center gap-1 mt-5 p-0 bg-transparent border-none text-[0.95rem] font-medium text-[#5b6987] dark:text-[#98a8cb] hover:text-[#005bd8] dark:hover:text-[#5aa6ff] cursor-pointer"
              >
                <span>Interactive Day Simulator</span>
                <ChevronDown className=" -rotate-90" />
              </button>
            )}
          </div>

          <Hive logoSrc={logoSrc} />
        </div>

        <div className="hidden sm:flex items-center gap-6 mt-[clamp(40px,5vw,64px)] pt-[26px] border-t border-[#e1e8f5] dark:border-[#1e3266] text-[0.98rem] text-[#5b6987] dark:text-[#98a8cb] overflow-hidden">
          <strong className="shrink-0 font-semibold text-[#0a1b3d] dark:text-[#eaf1ff]">
            Works with the tools you already use:
          </strong>
          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 24px, black calc(100% - 24px), transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 24px, black calc(100% - 24px), transparent)",
            }}
          >
            <div className="flex items-center gap-7 w-max whitespace-nowrap animate-[marquee_28s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused]">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="font-chakra font-medium tracking-wider text-[#3a4a6b] dark:text-[#c3cfea] before:content-['['] before:text-[#005bd8]/60 before:mr-1.5 after:content-[']'] after:text-[#005bd8]/60 after:ml-1.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
