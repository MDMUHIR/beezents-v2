import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Clock,
  Building,
  Activity
} from 'lucide-react';

export const ProjectDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getProjectBySlug, getCaseStudies } = useDatabase();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-slate-500 mt-2">The requested project could not be found.</p>
        <Link href="/projects" className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to All Projects
        </Link>
      </div>
    );
  }

  // Find linked case study if any
  const allCaseStudies = getCaseStudies();
  const linkedCaseStudy = project.caseStudyId
    ? allCaseStudies.find(c => c.id === project.caseStudyId)
    : allCaseStudies.find(c => c.client.toLowerCase() === project.client?.toLowerCase());

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/projects" className="hover:text-[#0282EB] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Projects
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{project.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  {project.industry}
                </span>
                {project.client && (
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    Client: {project.client}
                  </span>
                )}
                {project.timeline && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {project.timeline}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {project.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md transition-all"
                >
                  <span>Build a Similar System</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#0282EB] text-sm font-semibold px-4 py-3"
                  >
                    <span>View Public Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Project Overview</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {project.fullDescription}
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50/50 rounded-3xl p-8 border border-red-200/70">
                <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">The Engineering Challenge</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Problem Context</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-200/70">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] mb-2">Architected Solution</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">The Beezent Execution</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Key Architectural Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Measurable Results */}
            {project.results && project.results.length > 0 && (
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Verified Performance Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.results.map((res, i) => (
                    <div key={i} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
                      <Activity className="w-5 h-5 text-[#0282EB] mx-auto mb-2" />
                      <div className="text-xs font-bold text-slate-800">{res}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">System Interfaces & Telemetry</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                      <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0282EB]" />
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-semibold bg-[#F8FAFC] text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Linked Case Study */}
            {linkedCaseStudy && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-3xl p-7 border border-blue-200/80 shadow-xs space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB]">In-Depth Case Study</div>
                <h4 className="text-base font-bold text-slate-900">{linkedCaseStudy.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{linkedCaseStudy.summary}</p>
                <Link
                  href={`/case-studies/${linkedCaseStudy.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0282EB] hover:underline pt-2"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-lg space-y-4">
              <h3 className="text-xl font-bold">Have a Similar Requirement?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We can adapt this architectural blueprint to your specific systems, databases, and governance models.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-xs py-3.5 rounded-xl transition-colors"
              >
                <span>Initiate Project Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProjectDetailPage;
