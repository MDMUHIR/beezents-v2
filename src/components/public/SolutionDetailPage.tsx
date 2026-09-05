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
  Workflow,
  Sparkles,
  Database
} from 'lucide-react';

export const SolutionDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getSolutionBySlug, loadSolutionBySlug, getProjects } = useDatabase();
  const cachedSolution = getSolutionBySlug(slug);
  const [remoteSolution, setRemoteSolution] = React.useState<typeof cachedSolution>(cachedSolution);
  const [isLoading, setIsLoading] = React.useState(!cachedSolution);

  React.useEffect(() => {
    let active = true;
    setIsLoading(!getSolutionBySlug(slug));
    void loadSolutionBySlug(slug).then(result => {
      if (active) {
        setRemoteSolution(result);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, [slug]);

  const solution = remoteSolution || cachedSolution;

  if (isLoading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500">Loading solution...</div>;
  }

  if (!solution) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Solution Not Found</h2>
        <p className="text-slate-500 mt-2">The requested solution blueprint could not be found.</p>
        <Link href="/solutions" className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to All Solutions
        </Link>
      </div>
    );
  }

  const allProjects = getProjects();
  const relatedProjects = allProjects.filter(p =>
    p.industry?.toLowerCase() === solution.category?.toLowerCase() ||
    p.technologies?.some(t => solution.technologies?.includes(t))
  );

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/solutions" className="hover:text-[#0282EB] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Solutions
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{solution.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB]">
                {solution.category}
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {solution.title}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {solution.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md transition-all"
                >
                  <span>Request Custom Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {solution.visual && (
              <div className="lg:col-span-4">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3">
                  <img
                    src={solution.visual}
                    alt={solution.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Specification</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {solution.fullDescription}
              </p>
            </div>

            {/* Problem & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50/60 rounded-3xl p-8 border border-amber-200/80">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">The Operational Deficit</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Legacy Flaw</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {solution.problemSolved}
                </p>
              </div>

              <div className="bg-blue-50/60 rounded-3xl p-8 border border-blue-200/80">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] mb-2">The Autonomous Solution</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Beezent Architecture</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {solution.howItWorks}
                </p>
              </div>
            </div>

            {/* Workflow Diagram representation */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
                <Workflow className="w-6 h-6 text-[#0282EB]" />
                <span>Deterministic Execution Pipeline</span>
              </h2>

              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 space-y-4 font-mono text-xs text-slate-800">
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span>[Input Event]: Inbound webhook / user interaction</span>
                  <span className="text-emerald-600 font-bold">Validated</span>
                </div>
                <div className="text-center text-slate-400">↓ Pydantic Input Schema Sanitization</div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span>[Agent Router]: Multi-vector semantic embedding search</span>
                  <span className="text-[#0282EB] font-bold">&lt; 15ms</span>
                </div>
                <div className="text-center text-slate-400">↓ Tool-calling with strict state enforcement</div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span>[Action Execution]: Transactional ERP/CRM webhook update</span>
                  <span className="text-indigo-600 font-bold">Guaranteed Idempotent</span>
                </div>
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Key Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Benefits */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Verifiable ROI Metrics</h2>
              <div className="space-y-3.5">
                {solution.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/40 border border-blue-100">
                    <Zap className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Integrations Card */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#0282EB]" />
                <span>Supported Integrations</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {solution.integrations.map(integ => (
                  <span
                    key={integ}
                    className="text-xs font-semibold bg-[#F8FAFC] text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    {integ}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0282EB]" />
                <span>Technical Stack</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {solution.technologies.map(tech => (
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
              <h3 className="text-xl font-bold">Deploy in 3-4 Weeks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We configure this solution tailored to your custom schemas and security requirements in our enterprise sprint.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-xs py-3.5 rounded-xl transition-colors"
              >
                <span>Request Custom Scoping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SolutionDetailPage;
