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
  TrendingUp,
  Workflow,
  Quote,
  Building
} from 'lucide-react';

export const CaseStudyDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getCaseStudyBySlug, loadCaseStudyBySlug, getProjects } = useDatabase();
  const cachedCaseStudy = getCaseStudyBySlug(slug);
  const [remoteCaseStudy, setRemoteCaseStudy] = React.useState<typeof cachedCaseStudy>(cachedCaseStudy);
  const [isLoading, setIsLoading] = React.useState(!cachedCaseStudy);

  React.useEffect(() => {
    let active = true;
    setIsLoading(!getCaseStudyBySlug(slug));
    void loadCaseStudyBySlug(slug).then(result => {
      if (active) {
        setRemoteCaseStudy(result);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, [slug]);

  const caseStudy = remoteCaseStudy || cachedCaseStudy;

  if (isLoading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500">Loading case study...</div>;
  }

  if (!caseStudy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Case Study Not Found</h2>
        <p className="text-slate-500 mt-2">The requested case study could not be found.</p>
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
      </div>
    );
  }

  const allProjects = getProjects();
  const relatedProject = caseStudy.relatedProjectId
    ? allProjects.find(p => p.id === caseStudy.relatedProjectId)
    : undefined;

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/case-studies" className="hover:text-[#0282EB] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Case Studies
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{caseStudy.client}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  {caseStudy.industry}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Client: {caseStudy.client}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {caseStudy.title}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {caseStudy.summary}
              </p>

              {/* Verified Result Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                {caseStudy.measurableResults.map((res, i) => (
                  <div key={i} className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                    <div className="text-2xl font-black text-[#0282EB]">{res.metric}</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{res.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3">
                <img
                  src={caseStudy.coverImage}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Content */}
      <section className="py-16 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-red-600">The Problem Context</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The Operational Bottleneck</h2>
              <p className="text-slate-700 leading-relaxed text-base">
                {caseStudy.challenge}
              </p>
            </div>

            {/* Strategic Objectives */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Engagement Objectives</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Architecture */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB]">The Engineering Architecture</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">How Beezent Solved It</h2>
              <p className="text-slate-700 leading-relaxed text-base">
                {caseStudy.solution}
              </p>
              <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200 mt-4 space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">System Architecture:</div>
                <p className="text-xs text-slate-600 font-mono leading-relaxed">
                  {caseStudy.architectureDetails}
                </p>
              </div>
            </div>

            {/* Client Testimonial Banner */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 rounded-3xl p-8 lg:p-10 border border-blue-200/90 relative">
              <Quote className="w-10 h-10 text-blue-300/80 mb-4" />
              <p className="text-lg font-medium text-slate-800 italic leading-relaxed mb-6">
                "{caseStudy.testimonial.quote}"
              </p>
              <div>
                <div className="font-extrabold text-slate-900 text-sm">{caseStudy.testimonial.author}</div>
                <div className="text-xs font-semibold text-slate-600">
                  {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0282EB]" />
                <span>Technologies Deployed</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-semibold bg-[#F8FAFC] text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Project */}
            {relatedProject && (
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Related Codebase</div>
                <h4 className="text-base font-bold text-slate-900">{relatedProject.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{relatedProject.shortDescription}</p>
                <Link
                  href={`/projects/${relatedProject.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0282EB] hover:underline pt-2"
                >
                  <span>Explore Implementation Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-lg space-y-4">
              <h3 className="text-xl font-bold">Drive Measurable Growth</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learn how our deterministic AI pipelines can deliver identical operational breakthroughs for your team.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-xs py-3.5 rounded-xl transition-colors"
              >
                <span>Request Case Study Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CaseStudyDetailPage;
