import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  ArrowRight,
  Sparkles,
  Calculator,
  Shield,
  Clock,
  Zap,
  HelpCircle,
  BarChart,
  PhoneCall,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export const PricingPage: React.FC = () => {
  const { openDemo } = useModals();
  const [annualBilling, setAnnualBilling] = useState(false);

  // Interactive ROI Calculator State
  const [inquiriesPerMonth, setInquiriesPerMonth] = useState(350);
  const [minutesPerInquiry, setMinutesPerInquiry] = useState(20);
  const [hourlyWage, setHourlyWage] = useState(38);

  // Calculations
  const hoursSavedPerMonth = Math.round((inquiriesPerMonth * minutesPerInquiry) / 60);
  const monthlySavingsValue = Math.round(hoursSavedPerMonth * hourlyWage);
  const annualSavingsValue = monthlySavingsValue * 12;

  const comparisonRows = [
    {
      feature: 'Dedicated AI Bee Workflows',
      starter: '1 Core Workflow',
      growth: 'Unlimited Workflows',
      custom: 'Multi-Department Fleet',
    },
    {
      feature: 'Integration Channels',
      starter: 'Web Chat or Email',
      growth: 'Web + SMS + CRM + Email',
      custom: 'Custom Omnichannel + Voice',
    },
    {
      feature: 'Calendar & Scheduling Engine',
      starter: 'Google Calendar or Outlook',
      growth: 'Full 2-Way Sync + Multi-Rep Routing',
      custom: 'Advanced Round-Robin & Complex Logic',
    },
    {
      feature: 'CRM & Pipeline Automation',
      starter: 'Basic Contact Creation',
      growth: 'Full Deal Stages & Note Syncing',
      custom: 'Custom Field Mapping & Bidirectional',
    },
    {
      feature: 'Response Latency SLA',
      starter: '< 3.0 seconds',
      growth: '< 1.5 seconds',
      custom: '< 800ms Dedicated VPC',
    },
    {
      feature: 'Custom Knowledge Vectors & RAG',
      starter: 'Up to 25 documents',
      growth: 'Unlimited documents & URLs',
      custom: 'Live Database Querying & APIs',
    },
    {
      feature: 'Support & Maintenance',
      starter: 'Standard Email (24h SLA)',
      growth: 'Priority Slack Channel (4h SLA)',
      custom: '24/7 Dedicated Solutions Engineer',
    },
    {
      feature: 'Model Fine-Tuning & Prompt Audits',
      starter: 'Quarterly',
      growth: 'Bi-Weekly',
      custom: 'Continuous Automated Auditing',
    },
  ];

  return (
    <div className="w-full bg-white selection:bg-blue-100 selection:text-[#0282EB]">
      {/* 1. Pricing Hero */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold uppercase tracking-wider text-[#0282EB]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT VALUE PRICING</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
              Invest in Automated Systems, Not Endless Headcount.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Every plan includes professional custom setup, bespoke integration with your CRM, and ongoing engineering support.
            </p>

            {/* Annual Billing Toggle */}
            <div className="pt-6 flex items-center justify-center gap-3">
              <span
                className={`text-sm font-semibold cursor-pointer ${
                  !annualBilling ? 'text-slate-900' : 'text-slate-400'
                }`}
                onClick={() => setAnnualBilling(false)}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setAnnualBilling(!annualBilling)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer ${
                  annualBilling ? 'bg-[#0282EB]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    annualBilling ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`text-sm font-semibold flex items-center gap-1.5 cursor-pointer ${
                  annualBilling ? 'text-slate-900' : 'text-slate-400'
                }`}
                onClick={() => setAnnualBilling(true)}
              >
                <span>Annual</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Save 2 Months
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Three Main Plan Cards */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between"
            >
              <div>
                <div className="text-xl font-bold text-slate-900 mb-1">Starter Bee</div>
                <p className="text-xs text-slate-500 mb-6">
                  Perfect for automating your first core funnel or intake pipeline.
                </p>

                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900">$1,499</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    one-time setup · then {annualBilling ? '$249/mo (billed annually)' : '$299/mo'}
                  </div>
                </div>

                <div className="h-px bg-slate-200/80 mb-6" />

                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>1 Custom AI Bee workflow</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Web chat or inbound email capture</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Google Calendar or Outlook 2-way sync</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Verified knowledge base grounding (RAG)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Full setup in 10-14 business days</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={openDemo}
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                >
                  Choose Starter
                </button>
              </div>
            </motion.div>

            {/* Growth Plan - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-3xl bg-[#070D1E] text-white border border-slate-800 p-8 sm:p-9 flex flex-col justify-between shadow-2xl relative lg:-translate-y-3"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0282EB] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                MOST POPULAR
              </div>

              <div>
                <div className="text-xl font-bold text-white mb-1">Growth Bee Fleet</div>
                <p className="text-xs text-slate-400 mb-6">
                  For growing companies scaling multi-channel response and operations.
                </p>

                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-black text-white">$3,499</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    one-time setup · then {annualBilling ? '$699/mo (billed annually)' : '$799/mo'}
                  </div>
                </div>

                <div className="h-px bg-slate-800 mb-6" />

                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Unlimited AI Bee workflows & branches</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Multi-channel (Web, SMS, CRM, Slack)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>HubSpot / Salesforce bidirectional sync</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Multi-representative smart calendar routing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Priority dedicated Slack channel (4h SLA)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Bi-weekly prompt tuning & model audits</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={openDemo}
                  className="w-full py-3.5 px-6 rounded-full bg-[#0282EB] hover:bg-[#1b58ca] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
                >
                  Choose Growth
                </button>
              </div>
            </motion.div>

            {/* Custom Plan */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between"
            >
              <div>
                <div className="text-xl font-bold text-slate-900 mb-1">Custom Enterprise</div>
                <p className="text-xs text-slate-500 mb-6">
                  For multi-location enterprises requiring private VPC and bespoke models.
                </p>

                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900">Custom Scope</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    tailored to your exact operational infrastructure
                  </div>
                </div>

                <div className="h-px bg-slate-200/80 mb-6" />

                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Full-stack automation across all legacy tools</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Dedicated solutions engineering team</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Private cloud deployment & strict HIPAA/SOC2</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>Live phone voice agent integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#0282EB] shrink-0" />
                    <span>24/7 emergency incident coverage</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={openDemo}
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                >
                  Book Enterprise Consult
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Interactive ROI & Savings Calculator */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 inline-block px-3 py-1 rounded-full mb-3">
                  ROI CALCULATOR
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Calculate What Busywork Is Really Costing You
                </h2>
                <p className="text-slate-600 text-base mt-2">
                  Adjust the sliders based on your monthly inquiries and team economics to see your potential time and capital savings.
                </p>
              </div>

              <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 mb-2">
                    <span>Monthly Inbound Inquiries</span>
                    <span className="font-mono text-[#0282EB]">{inquiriesPerMonth} leads/mo</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="25"
                    value={inquiriesPerMonth}
                    onChange={e => setInquiriesPerMonth(Number(e.target.value))}
                    className="w-full accent-[#0282EB] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>50</span>
                    <span>1,000</span>
                    <span>2,000+</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 mb-2">
                    <span>Minutes Spent Per Inquiry (Admin + Follow-up)</span>
                    <span className="font-mono text-[#0282EB]">{minutesPerInquiry} minutes</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={minutesPerInquiry}
                    onChange={e => setMinutesPerInquiry(Number(e.target.value))}
                    className="w-full accent-[#0282EB] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>5 mins</span>
                    <span>30 mins</span>
                    <span>60 mins</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 mb-2">
                    <span>Average Team Member Cost ($/hour)</span>
                    <span className="font-mono text-[#0282EB]">${hourlyWage}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="2"
                    value={hourlyWage}
                    onChange={e => setHourlyWage(Number(e.target.value))}
                    className="w-full accent-[#0282EB] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>$20/hr</span>
                    <span>$60/hr</span>
                    <span>$120/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Results Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#070D1E] text-white p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
                    ESTIMATED RECOVERY
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Time Given Back Every Month
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                      {hoursSavedPerMonth} <span className="text-xl font-normal text-slate-400">hours/mo</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Monthly Productivity Value Saved
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-[#38BDF8] mt-1">
                      ${monthlySavingsValue.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Projected Annual Value
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                      ${annualSavingsValue.toLocaleString()} / year
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Based on automated qualification, immediate calendar booking, and CRM sync.
                    </div>
                  </div>
                </div>

                <button
                  onClick={openDemo}
                  className="w-full py-3.5 rounded-full bg-[#0282EB] hover:bg-[#1b58ca] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  Lock In Your System ROI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Feature Comparison Table */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 inline-block px-3 py-1 rounded-full">
              PLAN MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Compare Features Across Plans
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-slate-200 text-sm">
                  <th className="py-4 px-6 font-bold text-slate-900 w-1/3">Capability</th>
                  <th className="py-4 px-6 font-bold text-slate-900">Starter</th>
                  <th className="py-4 px-6 font-bold text-[#0282EB] bg-blue-50/50 rounded-t-xl">Growth</th>
                  <th className="py-4 px-6 font-bold text-slate-900">Custom Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">{row.feature}</td>
                    <td className="py-4 px-6">{row.starter}</td>
                    <td className="py-4 px-6 font-medium text-[#0282EB] bg-blue-50/30">{row.growth}</td>
                    <td className="py-4 px-6">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Bottom Consultation Banner */}
      <section className="py-20 lg:py-28 bg-[#070D1E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#0282EB]/20 border border-[#0282EB]/30 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
            HAVE QUESTIONS ABOUT YOUR INFRASTRUCTURE?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Not Sure Which Plan Matches Your Stack?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Book a 20-minute architecture review. We’ll examine your CRM, calendar, and lead flow to tell you exactly what you need.
          </p>
          <div className="pt-2">
            <button
              onClick={openDemo}
              className="px-8 py-4 rounded-full bg-[#0282EB] hover:bg-[#1b58ca] text-white text-base font-semibold shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              Book a Free Architecture Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default PricingPage;
