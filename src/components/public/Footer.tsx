import React from 'react';
import { Link } from '../../context/RouterContext';
import { BeezentLogo } from '../shared/BeezentLogo';
import { Shield, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0B0F19] text-slate-400 overflow-hidden pt-16 sm:pt-20 pb-12 border-t border-slate-800">
      {/* Subtle radial glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#0282EB]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid matching prompt specification */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          
          {/* Column 1: BEEZENTS (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block" aria-label="BEEZENTS Home">
              <BeezentLogo variant="white" size="md" />
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              BEEZENTS is a premium AI automation agency building autonomous agents, deterministic workflows, and intelligent data solutions for modern enterprise scale.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              {/* X / Twitter */}
              <a
                href="https://x.com/beezents"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#0282EB] hover:border-[#0282EB]/40 hover:bg-slate-800 transition-colors"
                aria-label="Twitter"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/beezents"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#0282EB] hover:border-[#0282EB]/40 hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64s1.64-.73 1.64-1.64c0-.91-.73-1.64-1.64-1.64z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/beezents"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#0282EB] hover:border-[#0282EB]/40 hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* Status Indicator */}
              <div className="ml-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-white font-mono"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/autonomous-agents" className="hover:text-[#0282EB] transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/services/workflow-automation" className="hover:text-[#0282EB] transition-colors">
                  AI Automation
                </Link>
              </li>
              <li>
                <Link href="/services/rag-knowledge-systems" className="hover:text-[#0282EB] transition-colors">
                  RAG Systems
                </Link>
              </li>
              <li>
                <Link href="/services/data-analytics" className="hover:text-[#0282EB] transition-colors">
                  Data & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-white font-mono"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/solutions/ecommerce-automation" className="hover:text-[#0282EB] transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/solutions/saas-customer-support" className="hover:text-[#0282EB] transition-colors">
                  SaaS
                </Link>
              </li>
              <li>
                <Link href="/solutions/business-operations" className="hover:text-[#0282EB] transition-colors">
                  Operations
                </Link>
              </li>
              <li>
                <Link href="/solutions/custom-enterprise-ai" className="hover:text-[#0282EB] transition-colors">
                  Custom AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-white font-mono"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#0282EB] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-[#0282EB] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#ai-lab" className="hover:text-[#0282EB] transition-colors">
                  AI Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0282EB] transition-colors">
                  Contact
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#0282EB] font-mono"
                >
                  <Shield className="w-3.5 h-3.5 text-[#0282EB]" />
                  <span>CMS Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 BEEZENTS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
