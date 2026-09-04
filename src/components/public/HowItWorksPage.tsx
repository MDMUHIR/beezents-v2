import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Cpu,
  Layers,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Workflow,
  Clock,
  Database,
  Calendar,
  Zap,
  HelpCircle,
  BarChart3,
  Bot
} from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export const HowItWorksPage: React.FC = () => {
  const { openDemo } = useModals();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discovery & Workflow Audit',
      subtitle: 'Mapping your customer journeys and operational friction points',
      duration: 'Days 1 – 3',
      icon: <Compass className="w-6 h-6 text-[#0282EB]" />,
      description:
        'We review your existing customer intake channels, response times, inquiry types, and internal handoffs. We identify the exact points where leads go cold or repetitive admin slows your team down.',
      deliverables: [
        'Complete Customer Journey & Inbound Funnel Map',
        'Automation Opportunity & ROI Assessment',
        'System Access & Integration Scope Definition',
        'Custom Conversation Guidelines & Persona Brief',
      ],
      diagram: 'Input Channels → Intake Funnel Audit → Prioritized Automations',
    },
    {
      num: '02',
      title: 'Bee Architecture & Rule Design',
      subtitle: 'Engineering deterministic logic, guardrails, and verified responses',
      duration: 'Days 4 – 7',
      icon: <Cpu className="w-6 h-6 text-[#38BDF8]" />,
      description:
        'We design the intelligence behind your Bee. Using your pricing schedules, service documentation, FAQs, and qualifying criteria, we build conversational flows that ask the right questions and never hallucinate.',
      deliverables: [
        'Deterministic Conversation Trees & Qualification Logic',
        'Grounded Knowledge Retrieval Vector Base',
        'Hallucination-Proof Safety Guardrails',
        'Escalation Thresholds & Human-in-the-Loop Triggers',
      ],
      diagram: 'Document Embeddings + Verification Gates + Intent Routing',
    },
    {
      num: '03',
      title: 'Tool & System Integration',
      subtitle: 'Connecting your CRM, calendar, email, and internal webhooks',
      duration: 'Days 8 – 11',
      icon: <Layers className="w-6 h-6 text-[#0282EB]" />,
      description:
        'A smart assistant is only as good as what it can execute. We link your AI Bee directly to Google Calendar, Outlook, HubSpot, Salesforce, Slack, Notion, Stripe, or proprietary APIs so every conversation ends in action.',
      deliverables: [
        'Two-Way Calendar Synchronization with Buffer Rules',
        'CRM Auto-Contact & Lead Stage Pipelines',
        'Instant Multi-Channel Notification Webhooks',
        'Secure Token Authentication & API Bridges',
      ],
      diagram: 'AI Core ⇄ Calendar ⇄ CRM ⇄ Slack Notifications',
    },
    {
      num: '04',
      title: 'Staged Launch & Performance Tuning',
      subtitle: 'Going live under close supervision with continuous optimization',
      duration: 'Days 12 – 14',
      icon: <Rocket className="w-6 h-6 text-[#10B981]" />,
      description:
        'We roll out your AI Bee in a controlled environment, auditing initial interactions in real time. We tweak response phrasing, verify booking precision, and deliver executive dashboard analytics.',
      deliverables: [
        'Production Deployment to Web & Messaging Channels',
        'Real-Time Transcripts & Resolution Analytics',
        'Staff Onboarding & Handoff Walkthrough Session',
        'Weekly Tuning & Continual Model Improvements',
      ],
      diagram: 'Live Traffic → Automated Resolutions → Continuous Optimization',
    },
  ];

  const faqs = [
    {
      q: 'How long does a typical deployment take?',
      a: 'Most single-workflow AI Bees (such as Lead Capture & Automated Scheduling) are completely designed, integrated, tested, and live within 10 to 14 business days.',
    },
    {
      q: 'Does an AI Bee replace our existing team members?',
      a: 'No. The AI Bee handles repetitive, low-leverage chores—such as answering "what is your pricing", asking qualification questions, and scheduling calendar calls—so your human team focuses purely on closing deals and delivering great work.',
    },
    {
      q: 'How do you ensure the AI Bee does not make things up?',
      a: 'We use strict retrieval-augmented generation (RAG) coupled with deterministic intent classifiers and rule-based fallback protocols. If an inquiry falls outside your verified company docs, the Bee politely gathers details and alerts your human staff.',
    },
    {
      q: 'What systems can you integrate with?',
      a: 'We integrate with HubSpot, Salesforce, Pipedrive, Google Calendar, Office 365, Slack, Microsoft Teams, Stripe, Zapier, Make, Notion, and custom REST/GraphQL APIs.',
    },
  ];

  return (
    <div className="w-full bg-white selection:bg-blue-100 selection:text-[#0282EB]">
      {/* 1. Page Header Hero */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold uppercase tracking-wider text-[#0282EB] mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BEEZENT METHODOLOGY</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              From Operational Friction to Autonomous Execution.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              We do not sell generic chatbots or one-size-fits-all scripts. We engineer customized AI Bees built to reflect your exact operational workflows, connecting the tools you already rely on.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openDemo}
                className="inline-flex items-center gap-2.5 bg-[#0282EB] hover:bg-[#1b58ca] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Book a Workflow Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero infrastructure overhaul required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive 4-Phase Deployment Journey */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 inline-block px-3 py-1 rounded-full mb-3">
              FOUR-PHASE SPRINT
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How We Take Your Business from Manual to Autopilot
            </h2>
            <p className="text-slate-600 text-base mt-3">
              A rapid 2-week implementation sprint with deterministic quality gates at every stage.
            </p>
          </motion.div>

          {/* Phase Navigator Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {steps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#070D1E] text-white border-slate-900 shadow-lg'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      activeStep === idx ? 'text-[#38BDF8]' : 'text-[#0282EB]'
                    }`}
                  >
                    PHASE {step.num}
                  </span>
                  <span className="text-[11px] opacity-75 font-medium">{step.duration}</span>
                </div>
                <div className="font-bold text-sm truncate">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Detailed Active Step Display */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-8 sm:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0282EB] tracking-wider uppercase">
                      Timeline: {steps[activeStep].duration}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {steps[activeStep].description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Deliverables & Milestones
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[activeStep].deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Schematic Blueprint Box */}
              <div className="lg:col-span-5 bg-[#070D1E] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                    <span className="text-slate-400 font-mono">FLOW_DIAGRAM.SCHEMATIC</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>

                  <div className="py-8 space-y-4 font-mono text-xs text-slate-300">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <div className="text-slate-500 text-[10px]">CURRENT PIPELINE</div>
                      <div className="text-[#38BDF8] font-bold mt-1">
                        {steps[activeStep].diagram}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Reliability Target</span>
                        <span className="text-white font-bold">99.9% Deterministic</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Latency Benchmark</span>
                        <span className="text-white font-bold">&lt; 1,200ms</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Human Intervention</span>
                        <span className="text-white font-bold">Exception-only</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Ready to examine this phase?</span>
                  <button
                    onClick={openDemo}
                    className="text-xs font-semibold text-[#38BDF8] hover:text-white underline cursor-pointer"
                  >
                    Schedule Walkthrough →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. The 3 Architectural Pillars */}
      <section className="py-20 lg:py-28 bg-[#070D1E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#0282EB]/20 border border-[#0282EB]/30 text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-3">
              ENGINEERING FOUNDATION
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Built Like Mission-Critical Software, Not a Toy.
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Every Beezent system is constructed on top of three core engineering principles that protect your brand reputation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0282EB]/20 text-[#38BDF8] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">1. Verified Knowledge Grounding</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your Bee only speaks from verified enterprise assets—service catalogs, terms of service, and company docs. It is explicitly programmed to decline answers when data is missing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0282EB]/20 text-[#38BDF8] flex items-center justify-center">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">2. Two-Way Action Execution</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Chatting is only half the battle. Your Bee is authorized to create CRM contacts, query live calendar openings, dispatch calendar invites, and fire off Slack notifications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0282EB]/20 text-[#38BDF8] flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">3. Smooth Human Handoff</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                When an inquiry exceeds predefined complexity limits or requests human intervention, the Bee tags the conversation, logs the context, and routes it directly to your staff.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 inline-block px-3 py-1 rounded-full">
              COMMON QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Implementation
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed pl-7.5">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Banner */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#070D1E] text-white p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Let’s Map Your First AI Bee Together.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Book a 20-minute architecture session with our engineering team. We’ll show you a simulated live Bee configured for your exact workflow.
              </p>
              <div className="pt-2">
                <button
                  onClick={openDemo}
                  className="bg-[#0282EB] hover:bg-[#1b58ca] text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  Book a Free Discovery Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default HowItWorksPage;
