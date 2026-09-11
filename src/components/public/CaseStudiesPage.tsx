import React from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { SafeImage } from '../shared/SafeImage';
import { ArrowRight, TrendingUp, Quote } from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const { getCaseStudies } = useDatabase();
  const caseStudies = getCaseStudies();

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              VERIFIED BUSINESS IMPACT
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Client Case Studies
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Read how leading enterprises replace fragmented manual workflows with Beezent's deterministic AI automation pipelines and custom autonomous systems.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {caseStudies.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 py-20 text-center">
            <p className="text-sm text-slate-500">
              Case studies are being prepared. Check back soon.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0282EB] hover:underline"
            >
              Request a case study
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <div className="space-y-10 lg:space-y-12">
          {caseStudies.map(cs => (
            <Link
              key={cs.id}
              href={`/case-studies/${cs.slug}`}
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  {cs.industry && (
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      {cs.industry}
                    </span>
                  )}
                  {cs.client && (
                    <span className="text-xs font-semibold text-slate-500">
                      Client: {cs.client}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-[#0282EB] transition-colors">
                  {cs.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {cs.summary}
                </p>

                {/* Measurable Results */}
                {cs.measurableResults && cs.measurableResults.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {cs.measurableResults.slice(0, 4).map((res, i) => (
                      <div key={i} className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200">
                        <div className="text-xl font-extrabold text-[#0282EB]">{res.metric}</div>
                        <div className="text-[11px] font-bold text-slate-700 mt-0.5">{res.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Testimonial Quote */}
                {cs.testimonial?.quote && (
                  <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#0282EB] text-xs text-slate-700 italic">
                    "{cs.testimonial.quote}"
                    <div className="mt-1.5 font-bold not-italic text-slate-900">
                      — {cs.testimonial.author}
                      {cs.testimonial.role && (
                        <span className="font-medium text-slate-500">, {cs.testimonial.role}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-bold px-6 py-3 rounded-full transition-all group-hover:bg-[#1d58c4]">
                    <span>Read In-Depth Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-64 sm:h-72 lg:h-80 bg-slate-100">
                  <SafeImage
                    src={cs.coverImage}
                    alt={cs.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default CaseStudiesPage;