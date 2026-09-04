import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2, Send, Loader2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { getSettings, submitInquiry } = useDatabase();
  const settings = getSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'AI Agents',
    budgetRange: '$25k - $50k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const projectTypes = [
    'AI Agents & Multi-Agent DAGs',
    'AI Workflow Automation',
    'Custom Enterprise AI Solutions',
    'Web & Software Engineering',
    'Legacy System AI Integration',
    'Strategic AI Consulting & Audit',
    'Other Custom Requirement',
  ];

  const budgetRanges = [
    'Under $25k',
    '$25k - $50k',
    '$50k - $100k',
    '$100k - $250k',
    '$250k+',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields (Name, Email, and Message).');
      return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        message: formData.message.trim(),
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              CONFIDENTIAL ARCHITECTURAL CONSULTATION
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Start a Project with The Beezent
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Tell us about your automation objectives, technical constraints, or data sources. Our senior systems architects review every submission within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xs">
            {submittedSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Received Successfully</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to The Beezent. A principal systems architect has been assigned to review your requirements and will contact you at{' '}
                  <span className="font-semibold text-slate-800">{formData.email}</span> within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        projectType: 'AI Agents',
                        budgetRange: '$25k - $50k',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0282EB] hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Project Brief</h2>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Primary Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm bg-white transition-all"
                    >
                      {projectTypes.map(pt => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm bg-white transition-all"
                    >
                      {budgetRanges.map(br => (
                        <option key={br} value={br}>
                          {br}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Project Scope & Objectives <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your current manual bottlenecks, desired automated outputs, integrations (e.g. Salesforce, SAP, Slack), and target timeline..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 outline-hidden text-sm transition-all resize-y"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mutual NDA protected. We never train public models on client briefs.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] disabled:bg-blue-300 text-white font-semibold text-sm py-4 rounded-xl shadow-md transition-all active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Project Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to AI Architects</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Info & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Direct Contact</h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase">Architecture Team Email</div>
                    <a href={`mailto:${settings.contactEmail}`} className="text-[#0282EB] hover:underline font-medium">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase">Phone</div>
                    <span className="text-slate-800 font-medium">{settings.contactPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase">Headquarters</div>
                    <span className="text-slate-800 font-medium">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#0282EB] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase">Response Window</div>
                    <span className="text-slate-800 font-medium">&lt; 24 Business Hours guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/70 rounded-3xl p-8 border border-blue-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0282EB]" />
                <span>Our Enterprise Guarantee</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0282EB] shrink-0 mt-0.5" />
                  <span>Direct contact with senior architects, not account managers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0282EB] shrink-0 mt-0.5" />
                  <span>Technical feasibility and latency audit included in consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0282EB] shrink-0 mt-0.5" />
                  <span>Standard mutual non-disclosure agreement (NDA) before deep-dive</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactPage;
