import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Bot,
  Sparkles,
  Code2,
  Compass,
  ChevronRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Code2: <Code2 className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  Compass: <Compass className="w-8 h-8" />,
};

export const ServiceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getServiceBySlug, getProjects } = useDatabase();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Service Not Found</h2>
        <p className="text-slate-500 mt-2">The requested service could not be located in our catalog.</p>
        <Link href="/services" className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>
      </div>
    );
  }

  // Find related projects
  const allProjects = getProjects();
  const relatedProjects = allProjects.filter(p =>
    p.servicesUsed?.includes(service.title) || p.relatedServiceIds?.includes(service.id)
  );

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb & Navigation */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/services" className="hover:text-[#0282EB] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Services
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{service.title}</span>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0282EB] flex items-center justify-center shadow-xs">
                {iconMap[service.icon] || <Bot className="w-8 h-8" />}
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {service.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md transition-all"
                >
                  <span>{service.ctaText || 'Consult with an Architect'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#architecture-overview"
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#0282EB] text-sm font-semibold px-4 py-3"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {service.heroVisual && (
              <div className="lg:col-span-4">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3">
                  <img
                    src={service.heroVisual}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW / PROBLEM & APPROACH ================= */}
      <section id="architecture-overview" className="py-16 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview & Architecture</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {service.fullDescription}
              </p>
            </div>

            {/* Problem & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50/50 rounded-3xl p-8 border border-red-200/70">
                <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">The Challenge</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">The Enterprise Bottleneck</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.problemStatement || 'Manual workflows, legacy data silos, and non-deterministic chatbots fail when subjected to real production loads.'}
                </p>
              </div>

              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-200/70">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] mb-2">Our Engineering Approach</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Deterministic Stability</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.ourApproach || 'We construct typed state machines with schema-enforced validation, fallback queues, and comprehensive telemetry.'}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Key Capabilities & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Business Impact & Outcomes</h2>
              <div className="space-y-3.5">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/40 border border-blue-100">
                    <Zap className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Execution Process</h2>
              <div className="space-y-6">
                {service.process.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0282EB] font-bold text-sm flex items-center justify-center shrink-0 border border-blue-200">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack Card */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0282EB]" />
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-semibold bg-[#F8FAFC] text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-lg space-y-4">
              <h3 className="text-xl font-bold">Ready to Implement?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our systems architects to scope your target workflows, review integrations, and plan deployment.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-xs py-3.5 rounded-xl transition-colors"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {relatedProjects.slice(0, 2).map(project => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="block p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-blue-50/50 border border-slate-200 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0282EB] line-clamp-1">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {project.shortDescription}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServiceDetailPage;
