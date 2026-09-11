import React, { useState } from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const SolutionsPage: React.FC<{ categorySlug?: string }> = ({ categorySlug }) => {
  const { getSolutions, getSolutionCategories, loadSolutionCategoryBySlug } = useDatabase();
  const solutions = getSolutions();
  const solutionCategories = getSolutionCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || 'ALL');

  React.useEffect(() => {
    setSelectedCategory(categorySlug || 'ALL');
    if (categorySlug) void loadSolutionCategoryBySlug(categorySlug);
  }, [categorySlug]);

  const filteredSolutions = selectedCategory === 'ALL'
    ? solutions
    : solutions.filter(s => (s.categorySlug || (s.category || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) === selectedCategory);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              ENTERPRISE-READY PRODUCT SUITE
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pre-Architected AI Solutions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Accelerate your time-to-value with our battle-tested AI solution frameworks. Engineered for zero-data leakage, sub-second latency, and deterministic integration into existing enterprise stacks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {[{ slug: 'ALL', name: 'All Solutions' }, ...solutionCategories].map(category => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                aria-pressed={selectedCategory === category.slug}
                className={`px-4 py-2.5 min-h-10 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2 ${
                  selectedCategory === category.slug
                    ? 'bg-[#0282EB] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {filteredSolutions.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 py-16 text-center">
            <p className="text-sm text-slate-500">No solutions in this category yet.</p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="mt-4 text-xs font-bold text-[#0282EB] hover:underline"
            >
              View all solutions
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map(solution => (
            <Link
              key={solution.id}
              href={`/solutions/${solution.slug}`}
              className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2"
            >
              <div>
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 truncate">
                    {solution.category || 'Solution'}
                  </span>
                  {solution.featured && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 shrink-0">
                      High Impact
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#0282EB] transition-colors line-clamp-2">
                  {solution.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {solution.shortDescription}
                </p>

                {(solution.features || []).length > 0 && (
                  <div className="border-t border-slate-100 pt-4 mb-6 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Core Features</div>
                    {solution.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0282EB] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(solution.integrations || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {solution.integrations.slice(0, 4).map(integ => (
                      <span
                        key={integ}
                        className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {integ}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span className="inline-flex items-center justify-between w-full bg-[#F8FAFC] group-hover:bg-blue-50 text-slate-800 group-hover:text-[#0282EB] font-semibold text-xs px-4 py-3 rounded-xl border border-slate-200 group-hover:border-blue-200 transition-all min-h-10">
                <span>View System Architecture</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-slate-200 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Not Sure Which Framework Fits?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Our solution architects will map your current tooling and data flows to the right framework — no obligation.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-md transition-all"
            >
              <span>Talk to an Architect</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SolutionsPage;