import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useRouter } from '../../context/RouterContext';
import { Project, ProjectCategory, ProjectType } from '../../types';
import { buildProjectPayload } from '../../lib/api/cms';
import { parseYouTubeUrl } from '../../lib/media/youtube';
import { ImageUpload, type ImageFieldValue } from './media/ImageUpload';
import { VideoUpload, emptyDemoVideoValue, type DemoVideoValue } from './media/VideoUpload';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  X,
  AlertCircle,
  Loader2,
  Upload,
  CheckCircle2,
  Save,
  FolderGit2,
  FileText,
  Briefcase,
  Image as ImageIcon,
  Video,
  Globe,
  Settings2,
} from 'lucide-react';

interface ExistingProjectMedia {
  coverUrl: string | null;
  demoType: 'upload' | 'youtube' | null;
  demoUrl: string | null;
}

const emptyExistingMedia = (): ExistingProjectMedia => ({ coverUrl: null, demoType: null, demoUrl: null });

export const AdminProjects: React.FC = () => {
  const { getProjects, getProjectCategories, api, saveEntityWithUpload, deleteProject, updateProject, createProjectCategory, updateProjectCategory, deleteProjectCategory, logout } = useDatabase();
  const { navigate } = useRouter();
  const projects = getProjects(true);
  const projectCategories = getProjectCategories();
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
    categoryIds: remoteCategoryIds(projectCategories.slice(0, 1).map(category => category.id)),
    shortDescription: '',
    fullDescription: '',
    client: '',
    industry: 'Financial Technology',
    projectType: 'Other' as ProjectType | '',
    technologies: '',
    results: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);
  const [coverMedia, setCoverMedia] = useState<ImageFieldValue>({ file: null, removed: false });
  const [demoVideo, setDemoVideo] = useState<DemoVideoValue>(emptyDemoVideoValue());
  const [existingMedia, setExistingMedia] = useState<ExistingProjectMedia>(emptyExistingMedia());
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const openCreateCategoryModal = () => {
    setEditingCategoryId(null);
    setCategoryForm({ name: '', slug: '', description: '', sortOrder: projectCategories.length });
    setCategoryModalOpen(true);
  };
  const openEditCategoryModal = (category: ProjectCategory) => {
    setEditingCategoryId(category.id);
    setCategoryForm({ name: category.name, slug: category.slug, description: category.description || '', sortOrder: category.sortOrder });
    setCategoryModalOpen(true);
  };
  const handleCategorySave = async (event: React.FormEvent) => {
    event.preventDefault();
    const slug = categoryForm.slug.trim() || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const payload = { ...categoryForm, name: categoryForm.name.trim(), slug };
    const saved = editingCategoryId ? await updateProjectCategory(editingCategoryId, payload) : await createProjectCategory(payload);
    if (saved) setCategoryModalOpen(false);
  };
  const handleCategoryDelete = async (category: ProjectCategory) => {
    if (category.id.startsWith('local-')) return;
    if (confirm(`Delete project category "${category.name}"? Projects will not be deleted.`)) await deleteProjectCategory(category.id);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setCoverMedia({ file: null, removed: false });
    setDemoVideo(emptyDemoVideoValue());
    setExistingMedia(emptyExistingMedia());
    setFormError(null);
    setFieldErrors({});
    setUploadProgress(null);
    setSaveSuccess(null);
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      categoryIds: remoteCategoryIds(project.categoryIds || project.categories?.map(category => category.id) || (project.categoryId ? [project.categoryId] : projectCategories.filter(category => category.slug === project.categorySlug).map(category => category.id))),
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      client: project.client || '',
      industry: project.industry,
      projectType: (project.projectType || 'Other') as ProjectType | '',
      technologies: project.technologies.join(', '),
      results: project.results?.join('\n') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      status: project.status,
    });
    setCoverMedia({ file: null, removed: false });
    setFormError(null);
    setFieldErrors({});
    setUploadProgress(null);
    setSaveSuccess(null);

    const demoType: 'upload' | 'youtube' | null = project.demoVideoType || (project.demoVideoUrl ? 'upload' : null);
    setExistingMedia({
      coverUrl: project.coverImage || null,
      demoType,
      demoUrl: project.demoVideoUrl || null,
    });
    setDemoVideo(
      demoType === 'youtube'
        ? { mode: 'youtube', file: null, youtubeUrl: project.demoVideoUrl || '', removed: false }
        : demoType === 'upload'
          ? { mode: 'upload', file: null, youtubeUrl: '', removed: false }
          : emptyDemoVideoValue(),
    );
    setModalOpen(true);

    // Enrich from the admin detail endpoint so the media type is accurate
    // even when the list response was slim.
    void api.getAdminProject(project.id).then(response => {
      if (!response.success || !response.data) return;
      const raw = response.data as Record<string, unknown>;
      const coverUrlRaw = typeof raw.cover_image === 'string' && raw.cover_image
        ? raw.cover_image
        : (raw.cover_media as Record<string, unknown> | undefined)?.url;
      const videoUrlRaw = typeof raw.demo_video_url === 'string' && raw.demo_video_url ? raw.demo_video_url : null;
      const typeRaw = raw.demo_video_type === 'youtube' ? 'youtube' as const : videoUrlRaw ? 'upload' as const : null;
      setExistingMedia(prev => ({
        coverUrl: (typeof coverUrlRaw === 'string' && coverUrlRaw ? coverUrlRaw : prev.coverUrl),
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

    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const resultsArray = formData.results.split('\n').map(r => r.trim()).filter(Boolean);
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

    const payload = buildProjectPayload({
      data: {
        title: formData.title,
        slug: generatedSlug,
        categoryIds: formData.categoryIds,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        client: formData.client,
        clientName: formData.client,
        industry: formData.industry,
        projectType: (formData.projectType || 'Other') as ProjectType,
        technologies: techArray,
        results: resultsArray,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured,
        status: formData.status,
      },
      isCreate: !editingId,
      cover: coverMedia.file ? 'replace' : coverMedia.removed ? 'remove' : 'keep',
      demoVideo: demoDelta ?? { action: 'keep' },
    });

    const files = {
      cover_file: coverMedia.file,
      demo_video_file: demoVideo.mode === 'upload' ? demoVideo.file : null,
    };

    setSubmitting(true);
    setUploadProgress(0);
    const result = await saveEntityWithUpload('project', editingId, payload, files, fraction => setUploadProgress(fraction));
    setSubmitting(false);
    setUploadProgress(null);

    if (!result.success) {
      if (result.code === 'auth') {
        logout();
        navigate('/admin/login');
        return;
      }
      setFormError(result.error || 'The project could not be saved. Please try again.');
      setFieldErrors(result.fieldErrors || {});
      return;
    }

    setSaveSuccess(editingId ? 'Project updated successfully.' : 'Project created successfully.');
    setTimeout(() => {
      setModalOpen(false);
      setSaveSuccess(null);
    }, 350);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      deleteProject(id);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.industry.toLowerCase().includes(search.toLowerCase())
  );

  const coverError = fieldErrors.cover_file || fieldErrors.cover_media_id || null;
  const demoError = fieldErrors.demo_video_file || fieldErrors.demo_video_url || fieldErrors.demo_video_type || null;
  const slugError = fieldErrors.slug || null;
  const titleError = fieldErrors.title || null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Projects Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage featured engineering case projects and deliverables</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div><h2 className="text-sm font-bold text-slate-900">Project Categories</h2><p className="text-[11px] text-slate-500">Assign one or more categories to each project.</p></div>
          <button onClick={openCreateCategoryModal} className="rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white hover:bg-slate-700">New Category</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map(category => <div key={category.id} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"><span className="font-semibold text-slate-800">{category.name}</span>{!category.id.startsWith('local-') && <><button onClick={() => openEditCategoryModal(category)} className="text-[#0282EB] hover:underline">Edit</button><button onClick={() => void handleCategoryDelete(category)} className="text-red-600 hover:underline">Delete</button></>}</div>)}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title, industry, or tech..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Industry / Client</th>
                <th className="py-3.5 px-4">Technologies</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-12 h-10 rounded-lg object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{p.title}</div>
                        <div className="text-[11px] text-slate-500">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{p.industry}</div>
                    <div className="text-[11px] text-slate-500">{p.client || 'Internal Product'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm">
                          {tech}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{p.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => updateProject(p.id, { featured: !p.featured })}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        p.featured
                          ? 'bg-amber-50 border-amber-200 text-amber-600'
                          : 'bg-slate-50 border-slate-200 text-slate-300 hover:text-slate-500'
                      }`}
                      title={p.featured ? 'Featured on homepage' : 'Mark as featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-slate-500 hover:text-[#0282EB] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Project"
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
                  {editingId ? 'Edit Project' : 'Create Project'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Project details and media are saved in a single request.
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
                  <Settings2 className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Basic Information</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="project-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Title *
                    </label>
                    <input
                      id="project-title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      aria-invalid={Boolean(titleError)}
                      aria-describedby={titleError ? 'project-title-error' : undefined}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:border-[#0282EB] outline-hidden ${titleError ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {titleError && <p id="project-title-error" role="alert" className="text-[11px] text-red-600 mt-1">{titleError}</p>}
                  </div>

                  <div>
                    <label htmlFor="project-slug" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Slug (URL Key)
                    </label>
                    <input
                      id="project-slug"
                      type="text"
                      value={formData.slug}
                      placeholder="auto-generated-if-empty"
                      onChange={e => setFormData({ ...formData, slug: e.target.value })}
                      aria-invalid={Boolean(slugError)}
                      aria-describedby={slugError ? 'project-slug-error' : undefined}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:border-[#0282EB] outline-hidden ${slugError ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {slugError && <p id="project-slug-error" role="alert" className="text-[11px] text-red-600 mt-1">{slugError}</p>}
                  </div>
                </div>
              </section>

              {/* Content */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Content</h4>
                </div>
                <div>
                  <label htmlFor="project-short-description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Description *
                  </label>
                  <textarea
                    id="project-short-description"
                    rows={2}
                    required
                    value={formData.shortDescription}
                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="project-description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description & Architecture *
                  </label>
                  <textarea
                    id="project-description"
                    rows={4}
                    required
                    value={formData.fullDescription}
                    onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </section>

              {/* Project Details */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Project Details</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="project-industry" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Industry
                    </label>
                    <input
                      id="project-industry"
                      type="text"
                      value={formData.industry}
                      onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-client" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Client
                    </label>
                    <input
                      id="project-client"
                      type="text"
                      value={formData.client}
                      onChange={e => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-type" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Type
                    </label>
                    <select
                      id="project-type"
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value as ProjectType })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                    >
                      <option value="AI Agents">AI Agents</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="Software Development">Software Development</option>
                      <option value="AI Integration">AI Integration</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="project-technologies" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Technologies (comma separated)
                    </label>
                    <input
                      id="project-technologies"
                      type="text"
                      value={formData.technologies}
                      onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-results" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Results & Impact (one per line)
                    </label>
                    <textarea
                      id="project-results"
                      rows={2}
                      value={formData.results}
                      onChange={e => setFormData({ ...formData, results: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="project-live-url" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Live Demo URL
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
                      <input
                        id="project-live-url"
                        type="url"
                        placeholder="https://..."
                        value={formData.liveUrl}
                        onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="project-github-url" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      GitHub URL
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
                      <input
                        id="project-github-url"
                        type="url"
                        placeholder="https://github.com/..."
                        value={formData.githubUrl}
                        onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Categories */}
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Categories</h4>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                  {projectCategories.length > 0 ? projectCategories.map(category => <label key={category.id} className="flex items-center gap-2 text-xs text-slate-700"><input type="checkbox" checked={formData.categoryIds.includes(category.id)} onChange={e => setFormData({ ...formData, categoryIds: e.target.checked ? [...formData.categoryIds, category.id] : formData.categoryIds.filter(id => id !== category.id) })} className="h-4 w-4 rounded text-[#0282EB]" /><span>{category.name}</span></label>) : <span className="text-xs text-slate-500">Create a category before assigning it.</span>}
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
                    <label htmlFor="project-status" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <select
                      id="project-status"
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
                      id="featuredCheckbox"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-[#0282EB] rounded-sm"
                    />
                    <label htmlFor="featuredCheckbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Feature on Homepage
                    </label>
                  </div>
                </div>
              </section>

              {/* Cover Image */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#0282EB]" aria-hidden="true" />
                  <h4 className="text-sm font-bold text-slate-900">Cover Image</h4>
                </div>
                <ImageUpload
                  id="project-cover"
                  label="Cover Image"
                  hint="JPG · PNG · GIF · WebP · AVIF · Max 10 MiB"
                  existingUrl={existingMedia.coverUrl}
                  value={coverMedia}
                  onChange={setCoverMedia}
                  error={coverError}
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
                  id="project-demo-video"
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
                        {editingId ? 'Save Changes' : 'Create Project'}
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
              <h3 className="text-xl font-bold text-slate-900">{editingCategoryId ? 'Edit Project Category' : 'New Project Category'}</h3>
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
export default AdminProjects;