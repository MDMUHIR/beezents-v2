import React, { useState } from "react";
import { Link } from "../../context/RouterContext";
import { useDatabase } from "../../context/DatabaseContext";
import { SafeImage } from "../shared/SafeImage";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  Filter,
  Layers,
} from "lucide-react";

export const ProjectsPage: React.FC<{ categorySlug?: string }> = ({
  categorySlug,
}) => {
  const { getProjects, getProjectCategories, loadProjectCategoryBySlug } =
    useDatabase();
  const projects = getProjects();
  const projectCategories = getProjectCategories();

  const [selectedIndustry, setSelectedIndustry] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState(
    categorySlug || "ALL",
  );

  const industries = [
    "ALL",
    ...Array.from(new Set(projects.map((p) => p.industry).filter(Boolean))),
  ];

  React.useEffect(() => {
    setSelectedCategory(categorySlug || "ALL");
    if (categorySlug) void loadProjectCategoryBySlug(categorySlug);
  }, [categorySlug]);

  const categoryFiltered =
    selectedCategory === "ALL"
      ? projects
      : projects.filter(
          (project) =>
            (project.categorySlug ||
              project.category
                ?.toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")) === selectedCategory,
        );

  const filteredProjects =
    selectedIndustry === "ALL"
      ? categoryFiltered
      : categoryFiltered.filter((p) => p.industry === selectedIndustry);

  const filterPill = (active: boolean) =>
    `px-3.5 py-2.5 min-h-10 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2 ${
      active
        ? "bg-[#0282EB] text-white shadow-sm"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
    }`;

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-bold uppercase tracking-wider text-[#0282EB] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Portfolio of Real Work
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Featured Client Implementations
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Explore production architectures we’ve designed and shipped. Every
              project represents real business value, reliable uptime, and
              rigorous systems engineering.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-8 sm:mt-10 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Category
              </span>
              {[
                { slug: "ALL", name: "All Projects" },
                ...projectCategories,
              ].map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  aria-pressed={selectedCategory === category.slug}
                  className={filterPill(selectedCategory === category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Industries */}
            {industries.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline-flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  Industry
                </span>
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    aria-pressed={selectedIndustry === ind}
                    className={filterPill(selectedIndustry === ind)}
                  >
                    {ind === "ALL" ? "All Industries" : ind}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 py-20 text-center">
              <p className="text-slate-500 text-sm">
                No projects match the selected filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSelectedIndustry("ALL");
                }}
                className="mt-4 text-sm font-semibold text-[#0282EB] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2 rounded-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <SafeImage
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {project.industry && (
                        <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          {project.industry}
                        </span>
                      )}
                      {project.featured && (
                        <span className="bg-[#0282EB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0282EB] transition-colors line-clamp-2">
                        {project.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(project.technologies || []).slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-1 rounded-md border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.technologies?.length || 0) > 4 && (
                          <span className="text-[11px] font-medium text-slate-400 px-1 py-1">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-[#0282EB] group-hover:underline">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors py-2"
                        >
                          Live Demo
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;