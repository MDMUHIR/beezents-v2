import React, { useState } from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowRight, ExternalLink, Sparkles, Filter } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { getProjects } = useDatabase();
  const projects = getProjects();

  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');

  const industries = ['ALL', ...Array.from(new Set(projects.map(p => p.industry)))];

  const filteredProjects = selectedIndustry === 'ALL'
    ? projects
    : projects.filter(p => p.industry === selectedIndustry);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              PORTFOLIO OF REAL WORK
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Featured Client Implementations
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Explore production architectures we've designed and shipped. Every project represents real business value, reliable uptime, and rigorous AI systems engineering.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedIndustry === ind
                    ? 'bg-[#0282EB] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {ind === 'ALL' ? 'All Industries' : ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {project.industry}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-[#0282EB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0282EB] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0282EB] hover:underline"
                >
                  <span>Technical Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  >
                    <span>External</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default ProjectsPage;
