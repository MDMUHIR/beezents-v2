import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Project } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  Check,
  X,
  Upload,
  AlertCircle
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const { getProjects, createProject, updateProject, deleteProject } = useDatabase();
  const projects = getProjects(true);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    client: '',
    industry: 'Financial Technology',
    timeline: '6 Weeks',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: 'LangGraph, Python, FastAPI, PostgreSQL, Next.js',
    features: 'Deterministic tool routing\nContinuous state checkpoints\nMulti-tier validation',
    results: '87% manual review compression\n99.4% task completion accuracy',
    liveUrl: '',
    featured: false,
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      client: project.client || '',
      industry: project.industry,
      timeline: project.timeline || '',
      coverImage: project.coverImage,
      technologies: project.technologies.join(', '),
      features: project.features.join('\n'),
      results: project.results?.join('\n') || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured,
      status: project.status,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const featureArray = formData.features.split('\n').map(f => f.trim()).filter(Boolean);
    const resultsArray = formData.results.split('\n').map(r => r.trim()).filter(Boolean);

    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingId) {
      updateProject(editingId, {
        title: formData.title,
        slug: generatedSlug,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        client: formData.client,
        industry: formData.industry,
        timeline: formData.timeline,
        coverImage: formData.coverImage,
        technologies: techArray,
        features: featureArray,
        results: resultsArray,
        liveUrl: formData.liveUrl,
        featured: formData.featured,
        status: formData.status,
      });
    } else {
      createProject({
        title: formData.title,
        slug: generatedSlug,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        client: formData.client,
        industry: formData.industry,
        timeline: formData.timeline,
        coverImage: formData.coverImage,
        technologies: techArray,
        features: featureArray,
        results: resultsArray,
        liveUrl: formData.liveUrl,
        featured: formData.featured,
        status: formData.status,
        sortOrder: projects.length + 1,
      });
    }

    setModalOpen(false);
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
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Title *
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
                    Slug (URL Key)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    placeholder="auto-generated-if-empty"
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Description & Architecture *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDescription}
                  onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Results & Impact (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.results}
                    onChange={e => setFormData({ ...formData, results: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
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
                    id="featuredCheckbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#0282EB] rounded-sm"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminProjects;
