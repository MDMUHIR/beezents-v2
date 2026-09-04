import React from "react";
import { motion } from "motion/react";

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: "50+",
      label: "Projects Delivered",
      glow: "from-blue-500/20 to-cyan-500/20",
    },
    {
      value: "30+",
      label: "Happy Clients",
      glow: "from-cyan-500/20 to-blue-500/20",
    },
    {
      value: "120+",
      label: "AI Agents Deployed",
      glow: "from-blue-500/20 to-indigo-500/20",
    },
    {
      value: "8.5K+",
      label: "Hours Automated",
      glow: "from-blue-500/20 to-sky-500/20",
    },
  ];

  return (
    <section
      aria-labelledby="impact-heading"
      className="border-slate-800/80 bg-[#282829]  relative"
    >
      <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-[#0282EB]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#00C6D7]/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        {/* Ambient glows and grid texture keep the panel dimensional without adding noise. */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.25) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                className={`group relative border-slate-700/70 px-4 py-5 first:pl-0 sm:px-6 sm:py-6 lg:py-2 ${
                  idx % 2 === 1 ? "border-l" : ""
                } ${idx >= 2 ? "border-t" : ""} ${idx > 0 ? "lg:border-l" : ""} lg:border-t-0`}
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -inset-2 z-0 rounded-2xl bg-gradient-to-br ${item.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                />
                <dt className="relative z-10 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400 sm:text-xs">
                  {item.label}
                </dt>
                <dd
                  className="relative z-10 mt-2 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                  style={{
                    fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif",
                  }}
                >
                  {item.value}
                </dd>
                <div className="relative z-10 mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#0282EB] to-[#38BDF8] transition-all duration-300 group-hover:w-16" />
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
export default StatsSection;
