import React, { useState } from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowRight, Bot, Zap, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { getSolutions } = useDatabase();
  const solutions = getSolutions();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(solutions.map(s => s.category)))];

  const filteredSolutions = selectedCategory === 'ALL'
    ? solutions
    : solutions.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              ENTERPRISE-READY PRODUCT SUITE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pre-Architected AI Solutions
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Accelerate your time-to-value with our battle-tested AI solution frameworks. Engineered for zero-data leakage, sub-second latency, and deterministic integration into existing enterprise stacks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0282EB] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'ALL' ? 'All Solutions' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map(solution => (
            <div
              key={solution.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                    {solution.category}
                  </span>
                  {solution.featured && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      High Impact
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#0282EB] transition-colors">
                  {solution.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {solution.shortDescription}
                </p>

                <div className="border-t border-slate-100 pt-4 mb-6 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Core Features</div>
                  {solution.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0282EB] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

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
              </div>

              <Link
                href={`/solutions/${solution.slug}`}
                className="inline-flex items-center justify-between w-full bg-[#F8FAFC] hover:bg-blue-50 text-slate-800 hover:text-[#0282EB] font-semibold text-xs px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-200 transition-all"
              >
                <span>View System Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default SolutionsPage;
