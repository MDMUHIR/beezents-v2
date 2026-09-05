import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Cpu, Database, TrendingUp } from 'lucide-react';
import { useRouter } from '../../../context/RouterContext';
import { useDatabase } from '../../../context/DatabaseContext';

export const ServicesSection: React.FC = () => {
  const { navigate } = useRouter();
  const { getServices } = useDatabase();

  const fallbackServices = [
    {
      id: 'ai-agents',
      title: 'AI AGENTS',
      description:
        'Custom AI agents that automate tasks, assist teams, and enhance customer experiences.',
      href: '/services/autonomous-agents',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0282EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: 'ai-automation',
      title: 'AI AUTOMATION',
      description:
        'Streamline workflows and eliminate repetitive tasks with intelligent automation.',
      href: '/services/workflow-automation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0282EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <path d="M10 6.5h4" />
          <path d="M17.5 10v4" />
          <path d="M6.5 10v4a3.5 3.5 0 0 0 3.5 3.5h4" />
        </svg>
      ),
    },
    {
      id: 'rag-systems',
      title: 'RAG SYSTEMS',
      description:
        'Build smart retrieval systems that provide accurate answers from your data.',
      href: '/services/rag-knowledge-systems',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0282EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      id: 'data-analytics',
      title: 'DATA & ANALYTICS',
      description:
        'Turn data into insights and drive decisions with advanced analytics and dashboards.',
      href: '/services/data-analytics',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0282EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18 9l-5 5-4-4-6 6" />
          <circle cx="18" cy="9" r="2" fill="#0282EB" />
        </svg>
      ),
    },
  ];
  const cmsServices = getServices();
  const services = cmsServices.length
    ? cmsServices.slice(0, 4).map((service, index) => ({
        id: service.id,
        title: service.title.toUpperCase(),
        description: service.shortDescription,
        href: `/services/${service.slug}`,
        icon: fallbackServices[index % fallbackServices.length].icon,
      }))
    : fallbackServices;

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-slate-100 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold font-mono uppercase tracking-widest text-[#0282EB]">
              WHAT WE DO
            </span>
            <h2
              className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-tight leading-tight uppercase"
              style={{ fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif" }}
            >
              AI SOLUTIONS THAT DRIVE REAL RESULTS
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#1F2937] font-normal leading-relaxed">
              From intelligent automation to custom AI agents, we deliver solutions that create measurable impact.
            </p>
          </div>

          <a
            href="/services"
            onClick={e => {
              e.preventDefault();
              navigate('/services');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0282EB] hover:text-[#026fc9] group shrink-0"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => navigate(item.href)}
              className="group relative bg-white  p-6 sm:p-7 border border-slate-200 hover:border-[#0282EB] hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Minimal Line Icon with subtle blue background */}
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100/70 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-[#111827] tracking-tight mb-2.5 font-mono uppercase group-hover:text-[#0282EB] transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#1F2937] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Learn More Arrow */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0282EB] group-hover:text-[#026fc9]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default ServicesSection;
