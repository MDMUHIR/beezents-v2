import React from "react";
import { Link } from "../../context/RouterContext";
import { useDatabase } from "../../context/DatabaseContext";
import { DemoVideoEmbed } from "../shared/DemoVideoEmbed";
import { SafeImage } from "../shared/SafeImage";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Clock,
  Activity,
  Video,
} from "lucide-react";

export const ProjectDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getProjectBySlug, loadProjectBySlug, getCaseStudies } = useDatabase();
  const cachedProject = getProjectBySlug(slug);
  const [remoteProject, setRemoteProject] =
    React.useState<typeof cachedProject>(cachedProject);
  const [isLoading, setIsLoading] = React.useState(!cachedProject);

  React.useEffect(() => {
    let active = true;
    setIsLoading(!getProjectBySlug(slug));
    void loadProjectBySlug(slug).then((result) => {
      if (active) {
        setRemoteProject(result);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const project = remoteProject || cachedProject;

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-slate-500 mt-2">
          The requested project could not be found.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Projects
        </Link>
      </div>
    );
  }

  // Find linked case study if any
  const allCaseStudies = getCaseStudies();
  const linkedCaseStudy = project.relatedCaseStudyId
    ? allCaseStudies.find((c) => c.id === project.relatedCaseStudyId)
    : allCaseStudies.find(
        (c) => c.client?.toLowerCase() === project.client?.toLowerCase(),
      );

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link
            href="/projects"
            className="hover:text-[#0282EB] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Projects
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[60vw] sm:max-w-none">
            {project.title}
          </span>
        </div>
      </div>

      {/* Hero + Video (side-by-side on desktop, stacked on mobile) */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Text content */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  {project.industry}
                </span>
                {project.client && (
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {project.client}
                  </span>
                )}
                {project.timeline && (
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {project.timeline}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {project.shortDescription}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-sm transition-colors"
                >
                  Build a Similar System
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#0282EB] text-sm font-semibold px-3 py-2.5 transition-colors"
                  >
                    View Public Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Video */}
            {project.demoVideoUrl && (
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <div className="px-4 sm:px-5 py-3 border-b border-slate-200 flex items-center gap-2 bg-white">
                    <Video className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">
                      Project Walkthrough
                    </span>
                  </div>
                  <div className="aspect-video w-full bg-slate-100">
                    <DemoVideoEmbed
                      url={project.demoVideoUrl}
                      type={project.demoVideoType}
                      title={`${project.title} demo video`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3 sm:mb-4">
                  Project Overview
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {project.fullDescription}
                </p>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-2">
                    The Challenge
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    Problem Context
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] mb-2">
                    The Solution
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    Architectural Approach
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4 sm:mb-5">
                  Key Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features?.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#0282EB] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {(!project.features || project.features.length === 0) && (
                    <p className="text-sm text-slate-500 col-span-full">Capability details are being finalized.</p>
                  )}
                </div>
              </div>

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4 sm:mb-5">
                    Performance Metrics
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {project.results.map((res, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center"
                      >
                        <Activity className="w-4.5 h-4.5 text-[#0282EB] mx-auto mb-2" />
                        <div className="text-xs font-semibold text-slate-800 leading-snug">
                          {res}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Screenshots */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4 sm:mb-5">
                    System Interfaces
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                      >
                        <SafeImage
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-44 sm:h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-5 sm:space-y-6">
              {/* Tech Stack */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#0282EB]" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded-md border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linked Case Study */}
              {linkedCaseStudy && (
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] mb-2">
                    Related Case Study
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {linkedCaseStudy.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {linkedCaseStudy.summary}
                  </p>
                  <Link
                    href={`/case-studies/${linkedCaseStudy.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0282EB] hover:underline"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* CTA */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  Have a similar requirement?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We can adapt this architecture to your systems, data models,
                  and compliance requirements.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-xs py-3 rounded-xl transition-colors"
                >
                  Schedule a Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
