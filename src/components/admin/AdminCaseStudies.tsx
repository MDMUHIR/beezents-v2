import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { CaseStudy } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  X,
  Check
} from 'lucide-react';

export const AdminCaseStudies: React.FC = () => {
  const { getCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy } = useDatabase();
  const caseStudies = getCaseStudies(true);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    title: '',
    slug: '',
    client: '',
    industry: 'Financial Technology',
    summary: '',
    challenge: '',
    objectives: 'Reduce cycle time\nEnsure zero data leakage\nEliminate manual entry defects',
    solution: '',
    architectureDetails: 'Multi-tenant LangGraph state machine with pgvector indexing',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    metrics: '-84% Cycle Time, 99.4% Accuracy, 12,000+ Docs Processed, $1.4M Annual Savings',
    quote: '',
    quoteAuthor: '',
    quoteRole: '',
    quoteCompany: '',
    technologies: 'LangGraph, FastAPI, Python, Qdrant, PostgreSQL, React',
    featured: false,
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (cs: CaseStudy) => {
    setEditingId(cs.id);
    const metricsStr = cs.measurableResults.map(m => `${m.metric} ${m.label}`).join(', ');
    setFormData({
      title: cs.title,
      slug: cs.slug,
      client: cs.client,
      industry: cs.industry,
      summary: cs.summary,
      challenge: cs.challenge,
      objectives: cs.objectives.join('\n'),
      solution: cs.solution,
      architectureDetails: cs.architectureDetails,
      coverImage: cs.coverImage,
      metrics: metricsStr,
      quote: cs.testimonial.quote,
      quoteAuthor: cs.testimonial.author,
      quoteRole: cs.testimonial.role,
      quoteCompany: cs.testimonial.company,
      technologies: cs.technologies.join(', '),
      featured: cs.featured,
      status: cs.status,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const objectivesArray = formData.objectives.split('\n').map(o => o.trim()).filter(Boolean);
    
    // Parse metrics string like "-84% Cycle Time, 99.4% Accuracy"
    const parsedResults = formData.metrics.split(',').map(item => {
      const parts = item.trim().split(' ');
      const metric = parts[0] || '100%';
      const label = parts.slice(1).join(' ') || 'Optimization';
      return { metric, label };
    });

    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const caseData = {
      title: formData.title,
      slug: generatedSlug,
      client: formData.client,
      industry: formData.industry,
      summary: formData.summary,
      challenge: formData.challenge,
      objectives: objectivesArray,
      solution: formData.solution,
      architectureDetails: formData.architectureDetails,
      measurableResults: parsedResults,
      coverImage: formData.coverImage,
      technologies: techArray,
      testimonial: {
        quote: formData.quote,
        author: formData.quoteAuthor,
        role: formData.quoteRole,
        company: formData.quoteCompany || formData.client,
      },
      featured: formData.featured,
      status: formData.status,
    };

    if (editingId) {
      updateCaseStudy(editingId, caseData);
    } else {
      createCaseStudy(caseData);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete case study "${title}"?`)) {
      deleteCaseStudy(id);
    }
  };

  const filteredCaseStudies = caseStudies.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Case Studies Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage verified business outcomes and client testimonials</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title or client name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredCaseStudies.length} of {caseStudies.length} case studies
        </div>
      </div>

      {/* Case Studies Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Case Study</th>
                <th className="py-3.5 px-4">Client / Industry</th>
                <th className="py-3.5 px-4">Key Metrics</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCaseStudies.map(cs => (
                <tr key={cs.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cs.coverImage}
                        alt={cs.title}
                        className="w-12 h-10 rounded-lg object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{cs.title}</div>
                        <div className="text-[11px] text-slate-500">/{cs.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{cs.client}</div>
                    <div className="text-[11px] text-slate-500">{cs.industry}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#0282EB]">
                      {cs.measurableResults[0]?.metric} {cs.measurableResults[0]?.label}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => updateCaseStudy(cs.id, { featured: !cs.featured })}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        cs.featured
                          ? 'bg-amber-50 border-amber-200 text-amber-600'
                          : 'bg-slate-50 border-slate-200 text-slate-300 hover:text-slate-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cs.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cs.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(cs)}
                        className="p-1.5 text-slate-500 hover:text-[#0282EB] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Case Study"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cs.id, cs.title)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? 'Edit Case Study' : 'Create New Case Study'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Executive Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Challenge / Problem *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.challenge}
                  onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Solution Architecture *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Measurable Metrics (comma separated: e.g. "-84% Cycle Time, 99.4% Accuracy")
                </label>
                <input
                  type="text"
                  value={formData.metrics}
                  onChange={e => setFormData({ ...formData, metrics: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              {/* Testimonial */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Client Testimonial</div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Quote</label>
                  <textarea
                    rows={2}
                    value={formData.quote}
                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={formData.quoteAuthor}
                      onChange={e => setFormData({ ...formData, quoteAuthor: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Author Role</label>
                    <input
                      type="text"
                      value={formData.quoteRole}
                      onChange={e => setFormData({ ...formData, quoteRole: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="csFeatured"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#0282EB] rounded-sm"
                  />
                  <label htmlFor="csFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold shadow-xs"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminCaseStudies;
