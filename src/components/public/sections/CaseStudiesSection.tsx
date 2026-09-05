import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "../../../context/RouterContext";
import { Container, DataGlyph, Reveal, SectionHeading } from "../SiteUI";
import { useDatabase } from "../../../context/DatabaseContext";

const fallbackStudies = [
  {
    category: "AI AUTOMATION",
    title: "E-commerce Order Automation",
    text: "Automated order processing and customer notifications, reducing manual work by 70%.",
    href: "/case-studies/autonomous-inventory-demand-intelligence",
    kind: "bars" as const,
  },
  {
    category: "AI AGENTS",
    title: "AI Support Agent for SaaS",
    text: "Built an AI support agent that resolves customer queries instantly.",
    href: "/case-studies/omni-channel-agentic-support-infrastructure",
    kind: "nodes" as const,
  },
  {
    category: "RAG SYSTEMS",
    title: "Intelligent Document Search",
    text: "Implemented a RAG system for enterprise knowledge retrieval.",
    href: "/case-studies/real-time-document-compliance-pipeline",
    kind: "orbit" as const,
  },
];

export const CaseStudiesSection: React.FC = () => {
  const { getCaseStudies } = useDatabase();
  const cmsStudies = getCaseStudies();
  const studies = cmsStudies.length
    ? cmsStudies.slice(0, 3).map((study, index) => ({
        category: study.industry || 'CASE STUDY',
        title: study.title,
        text: study.summary,
        href: `/case-studies/${study.slug}`,
        kind: fallbackStudies[index % fallbackStudies.length].kind,
      }))
    : fallbackStudies;

  return (
    <section id="case-studies" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Our work"
          title="Case studies"
          description="Real projects. Real impact. A look at how practical intelligence moves businesses forward."
        />
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0282EB]"
        >
          Explore case studies{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {studies.map((study, index) => (
          <Reveal key={study.title} delay={index * 0.08}>
            <Link href={study.href} className="group block">
              <div className="border border-[#E5E7EB] bg-[#F7FAFC] p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#0282EB]/45 group-hover:shadow-[0_18px_40px_rgba(2,130,235,.09)]">
                <DataGlyph kind={study.kind} />
              </div>
              <div className="pt-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0282EB]">
                  {study.category}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em] text-[#111827]">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
                  {study.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
                  Read case study{" "}
                  <ArrowUpRight className="h-4 w-4 text-[#0282EB] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
    </section>
  );
};

export default CaseStudiesSection;
