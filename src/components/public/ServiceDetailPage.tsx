import React from "react";
import { Link } from "../../context/RouterContext";
import { useDatabase } from "../../context/DatabaseContext";
import { SafeImage } from "../shared/SafeImage";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  Bot,
  Sparkles,
  Layers,
  Code2,
  Compass,
  ChevronRight,
  Star,
} from "lucide-react";

const NAV_OFFSET = 64;

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
  Code2: <Code2 className="w-7 h-7" />,
  Layers: <Layers className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />,
};

/* -------------------------------------------------------------------------- */
/*  Small accessible segmented tabs (challenge / approach)                    */
/* -------------------------------------------------------------------------- */

interface TabItem {
  id: string;
  label: string;
}

const SegmentedTabs: React.FC<{
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  idPrefix: string;
  label: string;
}> = ({ tabs, value, onChange, idPrefix, label }) => {
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    document.getElementById(`${idPrefix}-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200"
    >
      {tabs.map((tab, i) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            id={`${idPrefix}-tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB] ${
              selected
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export const ServiceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getServiceBySlug, loadServiceBySlug, getProjects } = useDatabase();
  const cachedService = getServiceBySlug(slug);
  const [remoteService, setRemoteService] =
    React.useState<typeof cachedService>(cachedService);
  const [isLoading, setIsLoading] = React.useState(!cachedService);

  const [viewpoint, setViewpoint] = React.useState<"challenge" | "approach">(
    "challenge",
  );
  const [activeStep, setActiveStep] = React.useState(0);

  // Load the service and reset interactive state when the slug changes
  React.useEffect(() => {
    let active = true;
    const cached = getServiceBySlug(slug);
    setRemoteService(cached);
    setIsLoading(!cached);
    setViewpoint("challenge");
    setActiveStep(0);

    loadServiceBySlug(slug)
      .then((result) => {
        if (active) {
          setRemoteService(result);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const service = remoteService || cachedService;

  const steps = service?.process ?? [];
  const technologies = service?.technologies ?? [];

  const relatedProjects = React.useMemo(() => {
    if (!service) return [];
    return getProjects().filter(
      (p) =>
        p.servicesUsed?.includes(service.title) ||
        p.relatedServiceIds?.includes(service.id),
    );
  }, [service?.id, service?.title]);

  const scrollToSection = (id: string) => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
  };

  /* ------------------------------ Loading / 404 ----------------------------- */

  if (isLoading) {
    return (
      <div
        role="status"
        className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500"
      >
        Loading service…
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Service not found</h2>
        <p className="text-slate-500 mt-2">
          This service isn't in our catalog. It may have been renamed or
          removed.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> View all services
        </Link>
      </div>
    );
  }

  const scrollMargin = { scrollMarginTop: NAV_OFFSET + 24 };

  const hasViewpoint = Boolean(service.problemStatement || service.ourApproach);
  const challengeText =
    service.problemStatement ||
    "Manual workflows, legacy data silos, and non-deterministic chatbots fail under real production load.";
  const approachText =
    service.ourApproach ||
    "We build typed state machines with schema-enforced validation, fallback queues, and full telemetry.";

  return (
    <div className="w-full bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-slate-500 min-w-0 mb-10"
          >
            <Link
              href="/services"
              className="hover:text-[#0282EB] flex items-center gap-1 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Services
            </Link>
            <span aria-hidden className="shrink-0">
              /
            </span>
            <span
              aria-current="page"
              className="text-slate-900 font-semibold truncate min-w-0"
            >
              {service.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div
              className={service.heroVisual ? "lg:col-span-7" : "lg:col-span-9"}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0282EB] flex items-center justify-center mb-6">
                {iconMap[service.icon] || <Bot className="w-7 h-7" />}
              </div>

              {(service.categories?.length || service.featured) && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {service.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" aria-hidden />
                      Featured
                    </span>
                  )}
                  {service.categories?.map(category => (
                    <Link
                      key={category.id}
                      href={`/services/category/${category.slug}`}
                      className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 hover:bg-blue-50 hover:text-[#0282EB] hover:border-blue-200 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-slate-900 tracking-tight leading-[1.08]">
                {service.title}
              </h1>

              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB]"
                >
                  <span>{service.ctaText || "Talk to an architect"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {steps.length > 0 && (
                  <button
                    type="button"
                    onClick={() => scrollToSection("process")}
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-[#0282EB] text-sm font-semibold px-3 py-3 rounded-full focus-visible:outline-2 focus-visible:outline-[#0282EB]"
                  >
                    <span>See how we work</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {service.heroVisual && (
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-4/3">
                  <SafeImage
                    src={service.heroVisual}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* -------- Main column -------- */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section id="overview" style={scrollMargin}>
              <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
                Overview
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed whitespace-pre-line max-w-[68ch]">
                {service.fullDescription}
              </p>

              {/* Challenge / approach toggle */}
              {hasViewpoint && (
                <div className="mt-8">
                  <SegmentedTabs
                    idPrefix="viewpoint"
                    label="Challenge or approach"
                    value={viewpoint}
                    onChange={(id) =>
                      setViewpoint(id as "challenge" | "approach")
                    }
                    tabs={[
                      { id: "challenge", label: "The challenge" },
                      { id: "approach", label: "Our approach" },
                    ]}
                  />
                  <div
                    role="tabpanel"
                    id={`viewpoint-panel-${viewpoint}`}
                    aria-labelledby={`viewpoint-tab-${viewpoint}`}
                    className={`mt-4 rounded-2xl border p-6 ${
                      viewpoint === "challenge"
                        ? "bg-red-50/60 border-red-200/70"
                        : "bg-blue-50/60 border-blue-200/70"
                    }`}
                  >
                    <p className="text-slate-800 leading-relaxed max-w-[68ch]">
                      {viewpoint === "challenge" ? challengeText : approachText}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Process */}
            {steps.length > 0 && (
              <section id="process" style={scrollMargin}>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
                    How we work
                  </h2>
                  <span className="text-sm text-slate-500" aria-live="polite">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>

                <ol className="mt-6">
                  {steps.map((step, i) => {
                    const isActive = i === activeStep;
                    const isDone = i < activeStep;
                    const isLast = i === steps.length - 1;
                    const panelId = `process-panel-${i}`;

                    return (
                      <li
                        key={step.step}
                        className="grid grid-cols-[2.25rem_1fr] gap-x-4"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveStep(i)}
                          aria-expanded={isActive}
                          aria-controls={panelId}
                          className="col-span-2 flex items-center gap-4 py-1.5 text-left rounded-lg group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB]"
                        >
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold border transition-colors ${
                              isActive
                                ? "bg-[#0282EB] border-[#0282EB] text-white"
                                : isDone
                                  ? "bg-blue-50 border-[#0282EB] text-[#0282EB]"
                                  : "bg-white border-slate-300 text-slate-500 group-hover:border-[#0282EB]"
                            }`}
                          >
                            {isDone ? (
                              <Check className="w-4 h-4" aria-hidden />
                            ) : (
                              step.step
                            )}
                          </span>
                          <span
                            className={`text-base font-bold transition-colors ${
                              isActive
                                ? "text-slate-900"
                                : "text-slate-600 group-hover:text-slate-900"
                            }`}
                          >
                            {step.title}
                          </span>
                        </button>

                        {/* connector line */}
                        <div
                          className="flex justify-center min-h-3"
                          aria-hidden
                        >
                          {!isLast && (
                            <span
                              className={`w-px h-full transition-colors ${
                                isDone ? "bg-[#0282EB]" : "bg-slate-200"
                              }`}
                            />
                          )}
                        </div>

                        {/* collapsible detail */}
                        <div
                          id={panelId}
                          aria-hidden={!isActive}
                          className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pt-1 pb-6">
                              <p className="text-sm text-slate-600 leading-relaxed max-w-[62ch]">
                                {step.description}
                              </p>
                              <div className="mt-4 flex items-center gap-4">
                                {!isLast ? (
                                  <button
                                    type="button"
                                    tabIndex={isActive ? 0 : -1}
                                    onClick={() => setActiveStep(i + 1)}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0282EB] hover:text-[#1d58c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB] rounded"
                                  >
                                    Next step{" "}
                                    <ChevronRight
                                      className="w-4 h-4"
                                      aria-hidden
                                    />
                                  </button>
                                ) : (
                                  <Link
                                    href="/contact"
                                    tabIndex={isActive ? 0 : -1}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0282EB] hover:text-[#1d58c4]"
                                  >
                                    Start with step 1{" "}
                                    <ArrowRight
                                      className="w-4 h-4"
                                      aria-hidden
                                    />
                                  </Link>
                                )}
                                {i > 0 && (
                                  <button
                                    type="button"
                                    tabIndex={isActive ? 0 : -1}
                                    onClick={() => setActiveStep(i - 1)}
                                    className="text-sm font-medium text-slate-500 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB] rounded"
                                  >
                                    Back
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {/* Related projects */}
            {relatedProjects.length > 0 && (
              <section id="projects" style={scrollMargin}>
                <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
                  Projects using this service
                </h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedProjects.slice(0, 4).map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="group flex flex-col justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#0282EB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB]"
                    >
                      <div>
                        <div className="text-base font-bold text-slate-900 group-hover:text-[#0282EB] transition-colors line-clamp-1">
                          {project.title}
                        </div>
                        <div className="mt-1.5 text-sm text-slate-500 line-clamp-2">
                          {project.shortDescription}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0282EB]">
                        View project
                        <ArrowRight
                          className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* -------- Sidebar -------- */}
          <aside className="lg:col-span-4">
            <div
              className="lg:sticky bg-white rounded-2xl border border-slate-200 p-6 space-y-6"
              style={{ top: NAV_OFFSET + 24 }}
            >
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Ready to scope this?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Walk through your workflows and integrations with an
                  architect, and leave with a deployment plan.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white font-semibold text-sm py-3 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB]"
                >
                  <span>Book a strategy call</span>
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              </div>

              {technologies.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#0282EB]" aria-hidden />
                    Built with
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <li
                        key={tech}
                        className="text-xs font-semibold bg-[#F8FAFC] text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;