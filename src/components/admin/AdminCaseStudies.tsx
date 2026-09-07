import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useRouter } from '../../context/RouterContext';
import { CaseStudy } from '../../types';
import { buildCaseStudyPayload } from '../../lib/api/cms';
import { ImageUpload, type ImageFieldValue } from './media/ImageUpload';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  X,
  AlertCircle,
  Loader2,
  Upload,
  CheckCircle2,
  Save,
  BookOpen,
  FileText,
  FolderGit2,
  TrendingUp,
  SearchCheck,
  Settings2,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';

interface ExistingCaseStudyMedia {
  imageUrl: string | null;
}

const emptyExistingMedia = (): ExistingCaseStudyMedia => ({ imageUrl: null });

export const AdminCaseStudies: React.FC = () => {
  const { getCaseStudies, getProjects, api, saveEntityWithUpload, deleteCaseStudy, updateCaseStudy, logout } = useDatabase();
  const { navigate } = useRouter();
  const caseStudies = getCaseStudies(true);
  const projects = getProjects(true);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    title: '',
    slug: '',
    projectId: '',
    summary: '',
    challenge: '',
    solution: '',
    implementation: '',
    results: '',
    metrics: '',
    technologies: '',
    seoTitle: '',
    seoDescription: '',
    featured: false,
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);
  const [imageMedia, setImageMedia] = useState<ImageFieldValue>({ file: null, removed: false });
  const [existingMedia, setExistingMedia] = useState<ExistingCaseStudyMedia>(emptyExistingMedia());
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageMedia({ file: null, removed: false });
    setExistingMedia(emptyExistingMedia());
    setFormError(null);
    setFieldErrors({});
    setUploadProgress(null);
    setSaveSuccess(null);
    setModalOpen(true);
  };

  const openEditModal = (cs: CaseStudy) => {
    setEditingId(cs.id);
    setFormData({
      title: cs.title,
      slug: cs.slug,
      projectId: cs.relatedProjectId || '',
      summary: cs.summary,
      challenge: cs.challenge,
      solution: cs.solution,
      implementation: cs.implementation,
      results: '',
      metrics: cs.measurableResults.map(m => `${m.metric} ${m.label}`.trim()).join(', '),
      technologies: cs.technologies.join(', '),
      seoTitle: cs.seoTitle || '',
      seoDescription: cs.seoDescription || '',
      featured: cs.featured,
      status: cs.status,
    });
    setImageMedia({ file: null, removed: false });
    setExistingMedia({ imageUrl: cs.coverImage || null });
    setFormError(null);
    setFieldErrors({});
    setUploadProgress(null);
    setSaveSuccess(null);
    setModalOpen(true);

    void api.getAdminCaseStudy(cs.id).then(response => {
      if (!response.success || !response.data) return;
      const raw = response.data as Record<string, unknown>;
      const imageObj = raw.image as Record<string, unknown> | undefined;
      const imageUrlRaw = typeof raw.image_url === 'string' && raw.image_url
        ? raw.image_url
        : imageObj?.url || imageObj?.public_url || raw.cover_image;
      if (typeof imageUrlRaw === 'string' && imageUrlRaw) {
        setExistingMedia({ imageUrl: imageUrlRaw });
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);
    setFieldErrors({});
    setSaveSuccess(null);

    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const resultsArray = formData.results.split('\n').map(r => r.trim()).filter(Boolean);
    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Parse metrics string like "-84% Cycle Time, 99.4% Accuracy"
    const parsedMetrics = formData.metrics.split(',').map(item => {
      const parts = item.trim().split(' ');
      const metric = parts[0] || '100%';
      const label = parts.slice(1).join(' ') || 'Optimization';
      return { metric, label };
    }).filter(item => item.metric !== '100%' || item.label !== 'Optimization');

    const existing = caseStudies.find(c => c.id === editingId);
    const payload = buildCaseStudyPayload({
      data: {
        title: formData.title,
        slug: generatedSlug,
        relatedProjectId: formData.projectId || null,
        summary: formData.summary,
        challenge: formData.challenge,
        solution: formData.solution,
        implementation: formData.implementation,
        measurableResults: parsedMetrics,
        technologies: techArray,
        featured: formData.featured,
        status: formData.status,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        publishDate: existing?.publishDate,
      },
      results: resultsArray,
      isCreate: !editingId,
      image: imageMedia.file ? 'replace' : imageMedia.removed ? 'remove' : 'keep',
    });

    const files = {
      image_file: imageMedia.file,
    };

    setSubmitting(true);
    setUploadProgress(0);
    const result = await saveEntityWithUpload('case-study', editingId, payload, files, fraction => setUploadProgress(fraction));
    setSubmitting(false);
    setUploadProgress(null);

    if (!result.success) {
      if (result.code === 'auth') {
        logout();
        navigate('/admin/login');
        return;
      }
      setFormError(result.error || 'The case study could not be saved. Please try again.');
      setFieldErrors(result.fieldErrors || {});
      return;
    }

    setSaveSuccess(editingId ? 'Case study updated successfully.' : 'Case study created successfully.');
    setTimeout(() => {
      setModalOpen(false);
      setSaveSuccess(null);
    }, 350);
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

  const imageError = fieldErrors.image_file || fieldErrors.image_media_id || null;
  const slugError = fieldErrors.slug || null;
  const titleError = fieldErrors.title || null;
  const projectError = fieldErrors.project_id || null;

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
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingId ? 'Edit Case Study' : 'Create Case Study'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Case study details and image are saved in a single request.
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-800" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}
            {saveSuccess && (
              <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800" role="status">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{saveSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
              {/* Basic Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Basic Information</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="case-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Title *
                    </label>
                    <input
                      id="case-title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      aria-invalid={Boolean(titleError)}
                      aria-describedby={titleError ? 'case-title-error' : undefined}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:border-[#0282EB] outline-hidden ${titleError ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {titleError && <p id="case-title-error" role="alert" className="text-[11px] text-red-600 mt-1">{titleError}</p>}
                  </div>

                  <div>
                    <label htmlFor="case-slug" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Slug (URL Key)
                    </label>
                    <input
                      id="case-slug"
                      type="text"
                      value={formData.slug}
                      placeholder="auto-generated-if-empty"
                      onChange={e => setFormData({ ...formData, slug: e.target.value })}
                      aria-invalid={Boolean(slugError)}
                      aria-describedby={slugError ? 'case-slug-error' : undefined}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:border-[#0282EB] outline-hidden ${slugError ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {slugError && <p id="case-slug-error" role="alert" className="text-[11px] text-red-600 mt-1">{slugError}</p>}
                  </div>
                </div>
              </section>

              {/* Case Study Content */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Case Study Content</h4>
                </div>
                <div>
                  <label htmlFor="case-summary" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Executive Summary *
                  </label>
                  <textarea
                    id="case-summary"
                    rows={2}
                    required
                    value={formData.summary}
                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="case-challenge" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Challenge / Problem *
                  </label>
                  <textarea
                    id="case-challenge"
                    rows={3}
                    required
                    value={formData.challenge}
                    onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="case-solution" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Solution Architecture *
                  </label>
                  <textarea
                    id="case-solution"
                    rows={3}
                    required
                    value={formData.solution}
                    onChange={e => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="case-implementation" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Implementation
                  </label>
                  <textarea
                    id="case-implementation"
                    rows={3}
                    value={formData.implementation}
                    onChange={e => setFormData({ ...formData, implementation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </section>

              {/* Project Relationship */}
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Project Relationship</h4>
                </div>
                <div>
                  <label htmlFor="case-project" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Related Project
                  </label>
                  <select
                    id="case-project"
                    value={formData.projectId}
                    onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                    aria-invalid={Boolean(projectError)}
                    aria-describedby={projectError ? 'case-project-error' : undefined}
                    className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:border-[#0282EB] outline-hidden ${projectError ? 'border-red-400' : 'border-slate-200'}`}
                  >
                    <option value="">No related project</option>
                    {projects.filter(p => !p.id.startsWith('local-')).map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  {projectError && <p id="case-project-error" role="alert" className="text-[11px] text-red-600 mt-1">{projectError}</p>}
                </div>
              </section>

              {/* Results & Metrics */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Results & Metrics</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="case-results" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Results (one per line)
                    </label>
                    <textarea
                      id="case-results"
                      rows={3}
                      placeholder={'Reduced processing time by 84%\n12,000+ documents processed'}
                      value={formData.results}
                      onChange={e => setFormData({ ...formData, results: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="case-metrics" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Metrics (comma separated)
                    </label>
                    <input
                      id="case-metrics"
                      type="text"
                      placeholder={'-84% Cycle Time, 99.4% Accuracy'}
                      value={formData.metrics}
                      onChange={e => setFormData({ ...formData, metrics: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="case-technologies" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Technologies (comma separated)
                  </label>
                  <input
                    id="case-technologies"
                    type="text"
                    value={formData.technologies}
                    onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </section>

              {/* SEO */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <SearchCheck className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">SEO</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="case-seo-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      SEO Title
                    </label>
                    <input
                      id="case-seo-title"
                      type="text"
                      value={formData.seoTitle}
                      onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                  <div>
                    <label htmlFor="case-seo-description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      SEO Description
                    </label>
                    <input
                      id="case-seo-description"
                      type="text"
                      value={formData.seoDescription}
                      onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                </div>
              </section>

              {/* Publishing */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Publishing</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label htmlFor="case-status" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                    <select
                      id="case-status"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as 'PUBLISHED' | 'DRAFT' })}
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
              </section>

              {/* Case Study Image */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Case Study Image</h4>
                </div>
                <ImageUpload
                  id="case-image"
                  label="Case Study Image"
                  hint="JPG · PNG · GIF · WebP · AVIF · Max 10 MiB"
                  existingUrl={existingMedia.imageUrl}
                  value={imageMedia}
                  onChange={setImageMedia}
                  error={imageError}
                  disabled={submitting}
                />
              </section>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Saved with your image in one request.
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    disabled={submitting}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold shadow-xs disabled:opacity-60 disabled:cursor-not-allowed min-w-36 justify-center"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        {editingId ? <Save className="w-4 h-4" aria-hidden="true" /> : <Upload className="w-4 h-4" aria-hidden="true" />}
                        {editingId ? 'Save Changes' : 'Create Case Study'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {uploadProgress !== null && submitting && (
                <div className="space-y-1.5" aria-live="polite">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Uploading media…</span>
                    <span className="font-bold text-slate-700">{Math.round(uploadProgress * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={Math.round(uploadProgress * 100)} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-[#0282EB] transition-[width] duration-200" style={{ width: `${Math.round(uploadProgress * 100)}%` }} />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminCaseStudies;