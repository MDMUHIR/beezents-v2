import React from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { Bot, Cpu, Sparkles, Code2, Layers, Compass, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
  Code2: <Code2 className="w-7 h-7" />,
  Layers: <Layers className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />,
};

export const ServicesPage: React.FC<{ categorySlug?: string }> = ({ categorySlug }) => {
  const { getServices, getServiceCategories, loadServiceCategoryBySlug } = useDatabase();
  const services = getServices();
  const serviceCategories = getServiceCategories();
  const [selectedCategory, setSelectedCategory] = React.useState(categorySlug || 'ALL');

  React.useEffect(() => {
    setSelectedCategory(categorySlug || 'ALL');
    if (categorySlug) void loadServiceCategoryBySlug(categorySlug);
  }, [categorySlug]);

  const filteredServices = selectedCategory === 'ALL'
    ? services
    : services.filter(service => (service.categorySlug || service.category?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) === selectedCategory);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <Zap className="w-3.5 h-3.5" />
              FULL-SPECTRUM AI CAPABILITIES
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Enterprise AI Engineering Services
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              We design, build, and deploy production-grade artificial intelligence systems. From autonomous multi-agent state machines to custom fine-tuned SLMs and high-throughput web applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[{ slug: 'ALL', name: 'All Services' }, ...serviceCategories].map(category => (
                <button key={category.slug} onClick={() => setSelectedCategory(category.slug)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${selectedCategory === category.slug ? 'bg-[#0282EB] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0282EB] flex items-center justify-center group-hover:bg-[#0282EB] group-hover:text-white transition-colors duration-200">
                    {iconMap[service.icon] || <Bot className="w-7 h-7" />}
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    0{service.sortOrder}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#0282EB] transition-colors">
                  {service.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                <div className="border-t border-slate-100 pt-5 mb-6 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Deliverables</div>
                  {service.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0282EB] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {service.technologies.slice(0, 5).map(tech => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center justify-between w-full bg-[#F8FAFC] hover:bg-blue-50 text-slate-800 hover:text-[#0282EB] font-semibold text-xs px-5 py-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-all"
              >
                <span>View Full Service Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Need a Custom AI Architecture Assessment?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Discuss your technical requirements with our engineering leads. We evaluate data readiness, safety constraints, and estimated latency budgets.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-md transition-all"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServicesPage;
