import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRouter, Link } from "../../context/RouterContext";
import { useDatabase } from "../../context/DatabaseContext";
import { useModals } from "../../context/ModalContext";
import { BeezentLogo } from "../shared/BeezentLogo";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Shield,
} from "lucide-react";

function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
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

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export const Navbar: React.FC = () => {
  const { path, navigate } = useRouter();
  const { auth } = useDatabase();
  const { openDemo } = useModals();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setSolutionsDropdown(false);
  }, [path]);

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      hasDropdown: true,
      subItems: [
        { label: "AI Agents", href: "/services/autonomous-agents" },
        { label: "AI Automation", href: "/services/workflow-automation" },
        { label: "RAG Systems", href: "/services/rag-knowledge-systems" },
        { label: "Data & Analytics", href: "/services/data-analytics" },
      ],
    },
    {
      label: "Solutions",
      href: "/solutions",
      hasDropdown: true,
      subItems: [
        {
          label: "E-commerce Automation",
          href: "/solutions/ecommerce-automation",
        },
        {
          label: "SaaS Intelligent Support",
          href: "/solutions/saas-customer-support",
        },
        {
          label: "Business Operations",
          href: "/solutions/business-operations",
        },
        { label: "Custom AI Systems", href: "/solutions/custom-enterprise-ai" },
      ],
    },
    { label: "Case Studies", href: "/case-studies" },
    { label: "AI Lab", href: "/#ai-lab" },
    { label: "About Us", href: "/about" },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (path !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      navigate(href);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return path === "/" || path === "";
    if (href.startsWith("/#")) return false;
    return path.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs py-3"
          : "bg-white/90 backdrop-blur-xs border-b border-slate-100/60 py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Official Brand Logo with Bee Emblem & BEEZENTS Wordmark */}
        <Link
          href="/"
          className="group focus:outline-hidden"
          aria-label="Beezent Home"
        >
          <BeezentLogo size="md" />
        </Link>

        {/* Center: Desktop Navigation Links matching reference screenshot */}
        <nav
          className="hidden lg:flex items-center gap-7 text-sm font-medium"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            if (item.hasDropdown) {
              const isDropdownOpen =
                item.label === "Services"
                  ? servicesDropdown
                  : solutionsDropdown;
              const setDropdown =
                item.label === "Services"
                  ? setServicesDropdown
                  : setSolutionsDropdown;

              return (
                <div
                  key={item.label}
                  className="relative group py-2"
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`inline-flex items-center gap-1 transition-colors hover:text-[#0282EB] ${
                      active ? "text-[#0282EB] font-semibold" : "text-[#1F2937]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#0282EB] transition-transform group-hover:rotate-180" />
                  </a>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full -left-4 w-60 bg-white rounded-2xl p-2 shadow-xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.subItems?.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(sub.href);
                            setDropdown(false);
                          }}
                          className="block px-3.5 py-2 rounded-xl text-xs font-medium text-[#1F2937] hover:text-[#0282EB] hover:bg-blue-50/70 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                      <div className="mt-1 pt-1 border-t border-slate-100 px-3.5 py-1.5">
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="text-[11px] font-semibold text-[#0282EB] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Explore all {item.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={item.label} className="relative py-2">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors hover:text-[#0282EB] relative py-1 ${
                    active ? "text-[#0282EB] font-semibold" : "text-[#1F2937]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0282EB] rounded-full" />
                  )}
                </a>
              </div>
            );
          })}
        </nav>

        {/* Right: Compact CTA button + discreet Admin link */}
        <div className="hidden sm:flex items-center gap-3">
          <MagneticButton
            onClick={openDemo}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2B2F38] hover:bg-[#363C48] text-white text-xs font-semibold border border-[#2B2F38] backdrop-blur-md transition-colors cursor-pointer"
          >
            <span>Get in touch</span>
            <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={openDemo}
            className="text-xs font-semibold bg-[#0282EB] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1"
          >
            <span>Talk</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-[#0282EB] font-semibold"
                      : "text-[#1F2937] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDemo();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0282EB] text-white text-center font-semibold py-3 rounded-xl shadow-xs cursor-pointer text-sm"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
