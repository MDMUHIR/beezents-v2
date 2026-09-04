import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Circle,
  Sparkles,
} from "lucide-react";
import { Link } from "../../context/RouterContext";
import beeAsset from "../../assets/images/BEEZENT LOGO.png";

export const PRIMARY = "#0282EB";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div
    className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<{
  children: React.ReactNode;
  light?: boolean;
}> = ({ children, light = false }) => (
  <div
    className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? "text-cyan-300" : "text-[#0282EB]"}`}
  >
    <span className={`h-px w-7 ${light ? "bg-cyan-300/70" : "bg-[#0282EB]"}`} />
    <span>{children}</span>
  </div>
);

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}> = ({ eyebrow, title, description, align = "left", light = false }) => (
  <div
    className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl`}
  >
    <Eyebrow light={light}>{eyebrow}</Eyebrow>
    <h2
      className={`mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl ${light ? "text-white" : "text-[#111827]"}`}
    >
      {title}
    </h2>
    {description && (
      <p
        className={`mt-5 max-w-xl text-base leading-7 ${align === "center" ? "mx-auto" : ""} ${light ? "text-slate-300" : "text-[#94A3B8]"}`}
      >
        {description}
      </p>
    )}
  </div>
);

export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ActionButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "text";
  arrow?: "right" | "up" | "none";
  className?: string;
}> = ({
  children,
  href,
  onClick,
  variant = "primary",
  arrow = "right",
  className = "",
}) => {
  const styles = {
    primary:
      "bg-[#0282EB] text-white hover:bg-[#006dca] focus-visible:ring-[#0282EB]/30",
    secondary:
      "border border-[#E5E7EB] bg-white text-[#111827] hover:border-[#0282EB] hover:text-[#0282EB] focus-visible:ring-[#0282EB]/20",
    text: "text-[#0282EB] hover:text-[#006dca] focus-visible:ring-[#0282EB]/20",
  }[variant];
  const content = (
    <>
      <span>{children}</span>
      {arrow === "right" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
      {arrow === "up" && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );
  const classNames = `group inline-flex min-h-11 items-center justify-center gap-2 rounded-[11px] px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 ${styles} ${className}`;

  if (href) {
    return href.startsWith("http") ? (
      <a href={href} className={classNames} target="_blank" rel="noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classNames}>
      {content}
    </button>
  );
};

export const BeeVisual: React.FC<{ compact?: boolean; className?: string }> = ({
  compact = false,
  className = "",
}) => (
  <div
    className={`relative isolate overflow-hidden ${compact ? "min-h-[290px]" : "min-h-[550px]"} ${className}`}
    aria-label="BEEZENTS futuristic bee visual"
  >
    <div className="absolute inset-0 bg-[#101820]" />
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2,130,235,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(2,130,235,.18) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }}
    />
    <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
    <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0282EB]/25 border-dashed" />
    <div className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0282EB]/25 blur-[70px]" />
    <div className="absolute left-[15%] top-[24%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_5px_rgba(0,198,215,.4)]" />
    <div className="absolute right-[17%] top-[35%] h-1 w-1 rounded-full bg-white shadow-[0_0_16px_4px_rgba(255,255,255,.45)]" />
    <div className="absolute bottom-[25%] left-[24%] h-1 w-1 rounded-full bg-[#0282EB] shadow-[0_0_16px_4px_rgba(2,130,235,.5)]" />
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 190C140 170 168 228 238 236M365 105C416 172 472 174 570 152M108 456C182 390 228 408 278 446M390 380C464 340 506 370 570 426"
        stroke="#00C6D7"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
      <circle cx="238" cy="236" r="4" fill="#00C6D7" />
      <circle cx="365" cy="105" r="3" fill="#0282EB" />
      <circle cx="390" cy="380" r="4" fill="#0282EB" />
    </svg>
    <motion.div
      className="absolute left-1/2 top-[45%] w-[min(62%,360px)] -translate-x-1/2 -translate-y-1/2"
      animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 scale-75 rounded-full bg-[#0282EB]/35 blur-3xl" />
      <img
        src={beeAsset}
        alt="BEEZENTS bee"
        className="relative z-10 w-full object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,.55)]"
      />
      <div className="absolute -bottom-3 left-1/2 h-5 w-[70%] -translate-x-1/2 rounded-[50%] bg-[#0282EB]/45 blur-xl" />
    </motion.div>
    <div className="absolute bottom-[10%] left-1/2 w-[57%] -translate-x-1/2 [transform:perspective(500px)_rotateX(62deg)]">
      <div className="h-16 rounded-full border border-cyan-300/35 bg-gradient-to-r from-[#0282EB]/35 via-cyan-300/20 to-[#0282EB]/35 shadow-[0_0_45px_rgba(2,130,235,.45)]" />
    </div>
    {!compact && (
      <>
        <div className="absolute left-5 top-7 w-40 border border-white/10 bg-white/[0.07] p-3 backdrop-blur-md sm:left-8 sm:top-10">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-slate-400">
            <span>Live system</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-3 font-display text-xl font-semibold text-white">
            120+
          </div>
          <div className="text-[10px] text-cyan-200">AI agents deployed</div>
        </div>
        <div className="absolute bottom-8 right-5 w-44 border border-white/10 bg-white/[0.07] p-3 backdrop-blur-md sm:bottom-12 sm:right-8">
          <div className="text-[9px] uppercase tracking-[0.16em] text-slate-400">
            Efficiency index
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-xl font-semibold text-white">
              8.5K
            </span>
            <span className="mb-1 text-[10px] text-cyan-200">hrs saved</span>
          </div>
          <div className="mt-3 h-1 bg-white/10">
            <div className="h-full w-[78%] bg-gradient-to-r from-[#0282EB] to-[#00C6D7]" />
          </div>
        </div>
      </>
    )}
  </div>
);

export const ServiceIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EFF7FF] text-[#0282EB] ring-1 ring-[#0282EB]/10">
    {icon}
  </div>
);

export const CheckList: React.FC<{ items: string[]; light?: boolean }> = ({
  items,
  light = false,
}) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li
        key={item}
        className={`flex items-start gap-3 text-sm leading-6 ${light ? "text-slate-300" : "text-[#94A3B8]"}`}
      >
        <span
          className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${light ? "bg-cyan-300/15 text-cyan-300" : "bg-[#EFF7FF] text-[#0282EB]"}`}
        >
          <Check className="h-3 w-3" />
        </span>
        {item}
      </li>
    ))}
  </ul>
);

export const DataGlyph: React.FC<{ kind?: "nodes" | "bars" | "orbit" }> = ({
  kind = "nodes",
}) => (
  <div className="relative h-36 overflow-hidden rounded-[14px] bg-[#F7FAFC]">
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage: "radial-gradient(#d9e7f5 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
    {kind === "bars" && (
      <div className="absolute inset-x-7 bottom-6 flex h-20 items-end gap-2">
        {[40, 64, 52, 88, 72, 100, 82].map((height, index) => (
          <motion.span
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="flex-1 bg-gradient-to-t from-[#0282EB] to-cyan-300"
          />
        ))}
      </div>
    )}
    {kind === "nodes" && (
      <>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 144"
          fill="none"
        >
          <path
            d="M45 98 128 54l70 30 82-58 48 54"
            stroke="#0282EB"
            strokeOpacity=".45"
          />
          <path
            d="m128 54 22 58 48-28 82-58"
            stroke="#00C6D7"
            strokeOpacity=".35"
          />
        </svg>
        {[
          [45, 98],
          [128, 54],
          [198, 84],
          [280, 26],
          [328, 80],
          [150, 112],
        ].map(([x, y], index) => (
          <span
            key={index}
            className="absolute h-2.5 w-2.5 rounded-full bg-[#0282EB] shadow-[0_0_12px_rgba(2,130,235,.55)]"
            style={{ left: `${x / 4}%`, top: `${y / 1.44}%` }}
          />
        ))}
      </>
    )}
    {kind === "orbit" && (
      <>
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0282EB]/60" />
        <div className="absolute left-1/2 top-1/2 h-32 w-56 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[50%] border border-cyan-300/60" />
        <div className="absolute left-1/2 top-1/2 h-56 w-32 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border border-[#0282EB]/30" />
        <Sparkles className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-[#0282EB]" />
      </>
    )}
  </div>
);

export const MiniLogo: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[#94A3B8]">
    <Circle className="h-3 w-3 fill-[#0282EB] text-[#0282EB]" />
    {children}
  </div>
);
