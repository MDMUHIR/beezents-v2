import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useRouter } from '../../context/RouterContext';
import { Solution, SolutionCategory } from '../../types';
import { buildSolutionPayload } from '../../lib/api/cms';
import { parseYouTubeUrl } from '../../lib/media/youtube';
import { ImageUpload, type ImageFieldValue } from './media/ImageUpload';
import { VideoUpload, emptyDemoVideoValue, type DemoVideoValue } from './media/VideoUpload';
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
  Sparkles,
  FileText,
  Settings2,
  Image as ImageIcon,
  Video,
  ExternalLink,
} from 'lucide-react';

interface ExistingSolutionMedia {
  imageUrl: string | null;
  demoType: 'upload' | 'youtube' | null;
  demoUrl: string | null;
}

const emptyExistingMedia = (): ExistingSolutionMedia => ({ imageUrl: null, demoType: null, demoUrl: null });

export const AdminSolutions: React.FC = () => {
  const { getSolutions, getSolutionCategories, api, saveEntityWithUpload, deleteSolution, updateSolution, createSolutionCategory, updateSolutionCategory, deleteSolutionCategory, logout } = useDatabase();
  const { navigate } = useRouter();
  const solutions = getSolutions(true);
  const solutionCategories = getSolutionCategories();
  const remoteCategoryIds = (ids: string[]) => ids.filter(id => id && !id.startsWith('local-'));

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '', sortOrder: 0 });

  const initialForm = {
    title: '',
    slug: '',
    categoryIds: remoteCategoryIds(solutionCategories.slice(0, 1).map(category => category.id)),
    shortDescription: '',
    fullDescription: '',
    sortOrder: 0,
    featured: false,
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);
  const [imageMedia, setImageMedia] = useState<ImageFieldValue>({ file: null, removed: false });
  const [demoVideo, setDemoVideo] = useState<DemoVideoValue>(emptyDemoVideoValue());
  const [existingMedia, setExistingMedia] = useState<ExistingSolutionMedia>(emptyExistingMedia());
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const openCreateCategoryModal = () => {
    setEditingCategoryId(null);
    setCategoryForm({ name: '', slug: '', description: '', sortOrder: solutionCategories.length });
    setCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category: SolutionCategory) => {
    setEditingCategoryId(category.id);
    setCategoryForm({ name: category.name, slug: category.slug, description: category.description || '', sortOrder: category.sortOrder });
    setCategoryModalOpen(true);
  };

  const handleCategorySave = async (event: React.FormEvent) => {
    event.preventDefault();
    const slug = categoryForm.slug.trim() || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const payload = { ...categoryForm, name: categoryForm.name.trim(), slug };
    const saved = editingCategoryId
      ? await updateSolutionCategory(editingCategoryId, payload)
      : await createSolutionCategory(payload);
    if (saved) setCategoryModalOpen(false);
  };

  const handleCategoryDelete = async (category: SolutionCategory) => {
    if (category.id.startsWith('local-')) return;
    if (confirm(`Delete solution category "${category.name}"? Solutions will not be deleted.`)) {
      await deleteSolutionCategory(category.id);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageMedia({ file: null, removed: false });
    setDemoVideo(emptyDemoVideoValue());
    setExistingMedia(emptyExistingMedia());
    setFormError(null);
    setFieldErrors({});
    setUploadProgress(null);
    setSaveSuccess(null);
    setModalOpen(true);
  };

  const openEditModal = (s: Solution) => {
    setEditingId(s.id);
    setFormData({
      title: s.title,
      slug: s.slug,
      categoryIds: remoteCategoryIds(s.categoryIds || s.categories?.map(category => category.id) || (s.categoryId ? [s.categoryId] : solutionCategories.filter(category => category.slug === s.categorySlug).map(category => category.id))),
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription || s.description,
      sortOrder: s.sortOrder || 0,
      featured: s.featured,
      status: s.status,
    });
    setImageMedia({ file: null, removed: false });
    setFormError(null);
    setFieldErrors({});
    setUploadProgress(null);
    setSaveSuccess(null);

    const demoType: 'upload' | 'youtube' | null = s.demoVideoType || (s.demoVideoUrl ? 'upload' : null);
    setExistingMedia({
      imageUrl: s.imageUrl || s.visual || null,
      demoType,
      demoUrl: s.demoVideoUrl || null,
    });
    setDemoVideo(
      demoType === 'youtube'
        ? { mode: 'youtube', file: null, youtubeUrl: s.demoVideoUrl || '', removed: false }
        : demoType === 'upload'
          ? { mode: 'upload', file: null, youtubeUrl: '', removed: false }
          : emptyDemoVideoValue(),
    );
    setModalOpen(true);

    void api.getAdminSolution(s.id).then(response => {
      if (!response.success || !response.data) return;
      const raw = response.data as Record<string, unknown>;
      const imageObj = raw.image as Record<string, unknown> | undefined;
      const imageUrlRaw = typeof raw.image_url === 'string' && raw.image_url
        ? raw.image_url
        : imageObj?.url || imageObj?.public_url || raw.visual;
      const videoUrlRaw = typeof raw.demo_video_url === 'string' && raw.demo_video_url ? raw.demo_video_url : null;
      const typeRaw = raw.demo_video_type === 'youtube' ? 'youtube' as const : videoUrlRaw ? 'upload' as const : null;
      setExistingMedia(prev => ({
        imageUrl: (typeof imageUrlRaw === 'string' && imageUrlRaw ? imageUrlRaw : prev.imageUrl),
        demoType: typeRaw || prev.demoType,
        demoUrl: videoUrlRaw || prev.demoUrl,
      }));
      setDemoVideo(prev => {
        if (prev.mode === null && typeRaw) {
          return typeRaw === 'youtube'
            ? { mode: 'youtube', file: null, youtubeUrl: videoUrlRaw || '', removed: false }
            : { mode: 'upload', file: null, youtubeUrl: '', removed: false };
        }
        return prev;
      });
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);
    setFieldErrors({});
    setSaveSuccess(null);

    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const parsedYoutube = demoVideo.mode === 'youtube' ? parseYouTubeUrl(demoVideo.youtubeUrl) : null;
    const demoDelta = demoVideo.removed
      ? { action: 'remove' as const }
      : demoVideo.mode === 'upload'
        ? demoVideo.file
          ? { action: 'file' as const }
          : { action: 'keep' as const }
        : demoVideo.mode === 'youtube'
          ? parsedYoutube && parsedYoutube.valid && parsedYoutube.normalizedUrl
            ? { action: 'youtube' as const, url: parsedYoutube.normalizedUrl }
            : null
          : { action: 'keep' as const };

    if (demoVideo.mode === 'youtube' && demoDelta === null) {
      setFormError('Enter a valid YouTube link, or switch back to Upload Video.');
      setFieldErrors({ demo_video_url: 'The YouTube link is not valid.' });
      return;
    }

    const payload = buildSolutionPayload({
      data: {
        title: formData.title,
        slug: generatedSlug,
        categoryIds: formData.categoryIds,
        shortDescription: formData.shortDescription,
        description: formData.fullDescription,
        fullDescription: formData.fullDescription,
        sortOrder: formData.sortOrder ?? solutions.length + 1,
        featured: formData.featured,
        status: formData.status,
      },
      isCreate: !editingId,
      image: imageMedia.file ? 'replace' : imageMedia.removed ? 'remove' : 'keep',
      demoVideo: demoDelta ?? { action: 'keep' },
    });

    const files = {
      image_file: imageMedia.file,
      demo_video_file: demoVideo.mode === 'upload' ? demoVideo.file : null,
    };

    setSubmitting(true);
    setUploadProgress(0);
    const result = await saveEntityWithUpload('solution', editingId, payload, files, fraction => setUploadProgress(fraction));
    setSubmitting(false);
    setUploadProgress(null);

    if (!result.success) {
      if (result.code === 'auth') {
        logout();
        navigate('/admin/login');
        return;
      }
      setFormError(result.error || 'The solution could not be saved. Please try again.');
      setFieldErrors(result.fieldErrors || {});
      return;
    }

    setSaveSuccess(editingId ? 'Solution updated successfully.' : 'Solution created successfully.');
    setTimeout(() => {
      setModalOpen(false);
      setSaveSuccess(null);
    }, 350);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete solution "${title}"?`)) {
      deleteSolution(id);
    }
  };

  const filtered = solutions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const imageError = fieldErrors.image_file || fieldErrors.image_media_id || null;
  const demoError = fieldErrors.demo_video_file || fieldErrors.demo_video_url || fieldErrors.demo_video_type || null;
  const slugError = fieldErrors.slug || null;
  const titleError = fieldErrors.name || fieldErrors.title || null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Solutions Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage ready-to-deploy enterprise AI products and blueprints</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Solution</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Solution Categories</h2>
            <p className="text-[11px] text-slate-500">Assign one or more categories to each solution.</p>
          </div>
          <button onClick={openCreateCategoryModal} className="rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white hover:bg-slate-700">New Category</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {solutionCategories.map(category => (
            <div key={category.id} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
              <span className="font-semibold text-slate-800">{category.name}</span>
              {!category.id.startsWith('local-') && (
                <>
                  <button onClick={() => openEditCategoryModal(category)} className="text-[#0282EB] hover:underline">Edit</button>
                  <button onClick={() => void handleCategoryDelete(category)} className="text-red-600 hover:underline">Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search solutions by title or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {solutions.length} solutions
        </div>
      </div>

      {/* Solutions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Solution Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Integrations</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{s.title}</div>
                    <div className="text-[11px] text-slate-500">/{s.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{s.category}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {s.integrations.slice(0, 3).map(integ => (
                        <span key={integ} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm">
                          {integ}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => updateSolution(s.id, { featured: !s.featured })}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        s.featured
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
                        s.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 text-slate-500 hover:text-[#0282EB] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Solution"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.title)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Solution"
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
                  {editingId ? 'Edit Solution' : 'Create Solution'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Solution details and media are saved in a single request.
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
                  <Sparkles className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Basic Information</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="solution-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Solution Title *
                    </label>
                    <input
                      id="solution-title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      aria-invalid={Boolean(titleError)}
                      aria-describedby={titleError ? 'solution-title-error' : undefined}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:border-[#0282EB] outline-hidden ${titleError ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {titleError && <p id="solution-title-error" role="alert" className="text-[11px] text-red-600 mt-1">{titleError}</p>}
                  </div>

                  <div>
                    <label htmlFor="solution-slug" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Slug (URL Key)
                    </label>
                    <input
                      id="solution-slug"
                      type="text"
                      value={formData.slug}
                      placeholder="auto-generated-if-empty"
                      onChange={e => setFormData({ ...formData, slug: e.target.value })}
                      aria-invalid={Boolean(slugError)}
                      aria-describedby={slugError ? 'solution-slug-error' : undefined}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:border-[#0282EB] outline-hidden ${slugError ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {slugError && <p id="solution-slug-error" role="alert" className="text-[11px] text-red-600 mt-1">{slugError}</p>}
                  </div>
                </div>
              </section>

              {/* Description */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Description</h4>
                </div>
                <div>
                  <label htmlFor="solution-short-description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Description *
                  </label>
                  <textarea
                    id="solution-short-description"
                    rows={2}
                    required
                    value={formData.shortDescription}
                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="solution-description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Description *
                  </label>
                  <textarea
                    id="solution-description"
                    rows={3}
                    required
                    value={formData.fullDescription}
                    onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </section>

              {/* Categories */}
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Categories</h4>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                  {solutionCategories.length > 0 ? solutionCategories.map(category => (
                    <label key={category.id} className="flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(category.id)}
                        onChange={e => {
                          const categoryIds = e.target.checked
                            ? [...formData.categoryIds, category.id]
                            : formData.categoryIds.filter(id => id !== category.id);
                          setFormData({ ...formData, categoryIds });
                        }}
                        className="h-4 w-4 rounded text-[#0282EB]"
                      />
                      <span>{category.name}</span>
                    </label>
                  )) : (
                    <span className="text-xs text-slate-500">Create a category before assigning it.</span>
                  )}
                </div>
              </section>

              {/* Publishing */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Publishing</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label htmlFor="solution-status" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                    <select
                      id="solution-status"
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
                      id="solFeatured"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-[#0282EB] rounded-sm"
                    />
                    <label htmlFor="solFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Feature on Homepage
                    </label>
                  </div>

                  <div>
                    <label htmlFor="solution-sort-order" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Sort Order
                    </label>
                    <input
                      id="solution-sort-order"
                      type="number"
                      min={0}
                      value={formData.sortOrder}
                      onChange={e => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                </div>
              </section>

              {/* Solution Image */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Solution Image</h4>
                </div>
                <ImageUpload
                  id="solution-image"
                  label="Solution Image"
                  hint="JPG · PNG · GIF · WebP · AVIF · Max 10 MiB"
                  existingUrl={existingMedia.imageUrl}
                  value={imageMedia}
                  onChange={setImageMedia}
                  error={imageError}
                  disabled={submitting}
                />
              </section>

              {/* Demo Video */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Demo Video</h4>
                </div>
                <VideoUpload
                  id="solution-demo-video"
                  existing={
                    existingMedia.demoType || existingMedia.demoUrl
                      ? { type: existingMedia.demoType, mediaUrl: existingMedia.demoUrl, youtubeUrl: existingMedia.demoUrl }
                      : null
                  }
                  value={demoVideo}
                  onChange={setDemoVideo}
                  error={demoError}
                  disabled={submitting}
                />
              </section>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Saved with your media in one request.
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
                        {editingId ? 'Save Changes' : 'Create Solution'}
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

      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">{editingCategoryId ? 'Edit Solution Category' : 'New Solution Category'}</h3>
              <button onClick={() => setCategoryModalOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:text-slate-800" aria-label="Close dialog"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCategorySave} className="space-y-4">
              <input required placeholder="Category name" value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" />
              <input required placeholder="category-slug" value={categoryForm.slug} onChange={e => setCategoryForm({ ...categoryForm, slug: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" />
              <textarea placeholder="Description (optional)" value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" rows={3} />
              <input type="number" min={0} placeholder="Sort order" value={categoryForm.sortOrder} onChange={e => setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" />
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setCategoryModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="rounded-xl bg-[#0282EB] px-5 py-2 text-xs font-semibold text-white">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminSolutions;