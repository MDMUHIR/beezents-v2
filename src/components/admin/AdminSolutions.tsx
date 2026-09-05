import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Solution, SolutionCategory } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  X
} from 'lucide-react';

export const AdminSolutions: React.FC = () => {
  const { getSolutions, getSolutionCategories, createSolution, updateSolution, deleteSolution, createSolutionCategory, updateSolutionCategory, deleteSolutionCategory } = useDatabase();
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
    category: solutionCategories[0]?.name || 'Workflow Automation',
    categoryIds: remoteCategoryIds(solutionCategories.slice(0, 1).map(category => category.id)),
    shortDescription: '',
    fullDescription: '',
    problemSolved: '',
    howItWorks: '',
    features: 'Deterministic workflow execution\nERP and CRM tool-calling\nHuman-in-the-loop escalation',
    benefits: 'Reduces operational overhead by 70%\nGuaranteed zero data leakage',
    integrations: 'Salesforce, HubSpot, Slack, PostgreSQL',
    technologies: 'LangGraph, FastAPI, Python, Redis',
    visual: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);

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
    setModalOpen(true);
  };

  const openEditModal = (s: Solution) => {
    setEditingId(s.id);
    setFormData({
      title: s.title,
      slug: s.slug,
      category: s.category,
      categoryIds: remoteCategoryIds(s.categoryIds || s.categories?.map(category => category.id) || (s.categoryId ? [s.categoryId] : solutionCategories.filter(category => category.slug === s.categorySlug).map(category => category.id))),
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      problemSolved: s.problemSolved,
      howItWorks: s.howItWorks,
      features: s.features.join('\n'),
      benefits: s.benefits.join('\n'),
      integrations: s.integrations.join(', '),
      technologies: s.technologies.join(', '),
      visual: s.visual || '',
      featured: s.featured,
      status: s.status,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const featArray = formData.features.split('\n').map(f => f.trim()).filter(Boolean);
    const benArray = formData.benefits.split('\n').map(b => b.trim()).filter(Boolean);
    const integArray = formData.integrations.split(',').map(i => i.trim()).filter(Boolean);
    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);

    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const solData = {
      title: formData.title,
      slug: generatedSlug,
      category: formData.category,
      categoryIds: formData.categoryIds,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      problemSolved: formData.problemSolved,
      howItWorks: formData.howItWorks,
      features: featArray,
      benefits: benArray,
      integrations: integArray,
      technologies: techArray,
      visual: formData.visual,
      featured: formData.featured,
      status: formData.status,
    };

    if (editingId) {
      updateSolution(editingId, solData);
    } else {
      createSolution(solData);
    }

    setModalOpen(false);
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
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? 'Edit AI Solution Blueprint' : 'Create New Solution Blueprint'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Solution Title *
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
                    Category
                  </label>
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
                            const first = solutionCategories.find(item => item.id === categoryIds[0]);
                            setFormData({ ...formData, categoryIds, category: first?.name || formData.category });
                          }}
                          className="h-4 w-4 rounded text-[#0282EB]"
                        />
                        <span>{category.name}</span>
                      </label>
                    )) : (
                      <span className="text-xs text-slate-500">Create a category before assigning it.</span>
                    )}
                  </div>
                </div>
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
                  Full Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDescription}
                  onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Problem Solved
                  </label>
                  <textarea
                    rows={2}
                    value={formData.problemSolved}
                    onChange={e => setFormData({ ...formData, problemSolved: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    How It Works / Execution
                  </label>
                  <textarea
                    rows={2}
                    value={formData.howItWorks}
                    onChange={e => setFormData({ ...formData, howItWorks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
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
                    Benefits (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.benefits}
                    onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Integrations (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.integrations}
                    onChange={e => setFormData({ ...formData, integrations: e.target.value })}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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
                    id="solFeatured"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#0282EB] rounded-sm"
                  />
                  <label htmlFor="solFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">
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
                  Save Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">{editingCategoryId ? 'Edit Solution Category' : 'New Solution Category'}</h3>
              <button onClick={() => setCategoryModalOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:text-slate-800"><X className="h-5 w-5" /></button>
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
