import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const logos = [
  {
    name: "logoipsum",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M11 16L15 20L21 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "logoipsum",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
        <rect x="4" y="4" width="10" height="10" rx="2" fill="currentColor" />
        <rect x="18" y="4" width="10" height="10" rx="2" fill="currentColor" />
        <rect x="4" y="18" width="10" height="10" rx="2" fill="currentColor" />
        <rect x="18" y="18" width="10" height="10" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LOGOIPSUM",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
        <circle cx="16" cy="16" r="13" fill="currentColor" />
        <path d="M17 7L11 17H16L14 25L21 15H16L17 7Z" fill="white" />
      </svg>
    ),
  },
  {
    name: "logoipsum",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
        <path
          d="M6 24V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V24"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M12 24V15C12 12.791 13.791 11 16 11C18.209 11 20 12.791 20 15V24"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "logoipsum",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M13 10L22 16L13 22V10Z" fill="currentColor" />
      </svg>
    ),
  },
];

export const TrustLogos: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-[#E5E7EB] bg-white ">
      {/* Subtle brand glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-[#0282EB]/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Trust statement */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0282EB]/15 bg-[#0282EB]/[0.06]">
              <CheckCircle2
                className="h-[18px] w-[18px] text-[#0282EB]"
                strokeWidth={2}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#111827]">
                  Trusted by
                </span>

                <span className="rounded-full bg-[#0282EB]/[0.07] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0282EB]">
                  50+ clients
                </span>
              </div>

              <p className="mt-1 text-xs text-[#94A3B8]">
                Innovative teams building smarter businesses.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden h-10 w-px bg-[#E5E7EB] lg:block" />

          {/* Logos */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex w-full items-center justify-between gap-7 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-10 lg:gap-8">
              {logos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="group flex shrink-0 items-center gap-2.5 text-[#9CA3AF] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0282EB]"
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {logo.mark}
                  </div>

                  <span
                    className={`text-sm font-bold tracking-tight transition-colors duration-300 sm:text-[15px] ${
                      index === 2
                        ? "font-mono uppercase tracking-[0.08em]"
                        : "font-sans"
                    }`}
                  >
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* More indicator */}
          <div className="hidden shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8] xl:flex">
            <span>And more</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#0282EB]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
