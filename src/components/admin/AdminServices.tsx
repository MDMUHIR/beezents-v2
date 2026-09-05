import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Service, ServiceCategory } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  Bot,
  Cpu,
  Sparkles,
  Code2,
  Layers,
  Compass
} from 'lucide-react';

const icons = ['Bot', 'Cpu', 'Sparkles', 'Code2', 'Layers', 'Compass'];

export const AdminServices: React.FC = () => {
  const { getServices, getServiceCategories, createService, updateService, deleteService, reorderServices, createServiceCategory, updateServiceCategory, deleteServiceCategory } = useDatabase();
  const services = getServices(true);
  const serviceCategories = getServiceCategories();
  const remoteCategoryIds = (ids: string[]) => ids.filter(id => id && !id.startsWith('local-'));

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '', sortOrder: 0 });

  const initialForm = {
    title: '',
    slug: '',
    categoryIds: remoteCategoryIds(serviceCategories.slice(0, 1).map(category => category.id)),
    shortDescription: '',
    fullDescription: '',
    icon: 'Bot',
    features: 'High-throughput execution\nDeterministic guardrails\nState persistence',
    benefits: 'Eliminates repetitive manual workflows\nGuaranteed uptime SLA',
    technologies: 'Python, FastAPI, LangGraph, Redis, PostgreSQL',
    ctaText: 'Schedule Engineering Discovery',
    status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT',
  };

  const [formData, setFormData] = useState(initialForm);

  const openCreateCategoryModal = () => {
    setEditingCategoryId(null);
    setCategoryForm({ name: '', slug: '', description: '', sortOrder: serviceCategories.length });
    setCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category: ServiceCategory) => {
    setEditingCategoryId(category.id);
    setCategoryForm({ name: category.name, slug: category.slug, description: category.description || '', sortOrder: category.sortOrder });
    setCategoryModalOpen(true);
  };

  const handleCategorySave = async (event: React.FormEvent) => {
    event.preventDefault();
    const slug = categoryForm.slug.trim() || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const payload = { ...categoryForm, name: categoryForm.name.trim(), slug };
    const saved = editingCategoryId ? await updateServiceCategory(editingCategoryId, payload) : await createServiceCategory(payload);
    if (saved) setCategoryModalOpen(false);
  };

  const handleCategoryDelete = async (category: ServiceCategory) => {
    if (category.id.startsWith('local-')) return;
    if (confirm(`Delete service category "${category.name}"? Services will not be deleted.`)) await deleteServiceCategory(category.id);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingId(s.id);
    setFormData({
      title: s.title,
      slug: s.slug,
      categoryIds: remoteCategoryIds(s.categoryIds || s.categories?.map(category => category.id) || (s.categoryId ? [s.categoryId] : serviceCategories.filter(category => category.slug === s.categorySlug).map(category => category.id))),
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      icon: s.icon,
      features: s.features.join('\n'),
      benefits: s.benefits.join('\n'),
      technologies: s.technologies.join(', '),
      ctaText: s.ctaText || 'Schedule Engineering Discovery',
      status: s.status,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const featureArray = formData.features.split('\n').map(f => f.trim()).filter(Boolean);
    const benefitsArray = formData.benefits.split('\n').map(b => b.trim()).filter(Boolean);
    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const defaultProcess = [
      { step: 1, title: 'Workflow Decomposition', description: 'Deconstruct target operational bottlenecks into atomic tasks and deterministic schemas.' },
      { step: 2, title: 'State & Guardrail Engineering', description: 'Construct persistent checkpoint mechanisms and typed validation boundaries.' },
      { step: 3, title: 'Golden Dataset Benchmarking', description: 'Subject pipeline to comprehensive edge cases and adversarial inputs.' },
      { step: 4, title: 'VPC Deployment & Telemetry', description: 'Deploy within your secure perimeter with distributed OpenTelemetry tracing.' },
    ];

    if (editingId) {
      updateService(editingId, {
        title: formData.title,
        slug: generatedSlug,
        categoryIds: formData.categoryIds,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        icon: formData.icon,
        features: featureArray,
        benefits: benefitsArray,
        technologies: techArray,
        ctaText: formData.ctaText,
        status: formData.status,
      });
    } else {
      createService({
        title: formData.title,
        slug: generatedSlug,
        categoryIds: formData.categoryIds,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        icon: formData.icon,
        features: featureArray,
        benefits: benefitsArray,
        technologies: techArray,
        process: defaultProcess,
        ctaText: formData.ctaText,
        sortOrder: services.length + 1,
        status: formData.status,
      });
    }

    setModalOpen(false);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newServices = [...services];
    const [moved] = newServices.splice(index, 1);
    newServices.splice(targetIndex, 0, moved);

    reorderServices(newServices.map(s => s.id));
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete service "${title}"?`)) {
      deleteService(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Services Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure core service architectures, deliverables, and display order</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Service Categories</h2>
            <p className="text-[11px] text-slate-500">Assign one or more categories to each service.</p>
          </div>
          <button onClick={openCreateCategoryModal} className="rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white hover:bg-slate-700">New Category</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map(category => (
            <div key={category.id} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
              <span className="font-semibold text-slate-800">{category.name}</span>
              {!category.id.startsWith('local-') && <><button onClick={() => openEditCategoryModal(category)} className="text-[#0282EB] hover:underline">Edit</button><button onClick={() => void handleCategoryDelete(category)} className="text-red-600 hover:underline">Delete</button></>}
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Key Features</th>
                <th className="py-3.5 px-4">Tech Stack</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((s, index) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-sm hover:bg-slate-100"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveOrder(index, 'down')}
                        disabled={index === services.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-sm hover:bg-slate-100"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-slate-500 ml-1">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{s.title}</div>
                    <div className="text-[11px] text-slate-500 max-w-xs truncate">{s.shortDescription}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-700 max-w-xs truncate">
                      {s.features.join(', ')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {s.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
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
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.title)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Service"
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
                {editingId ? 'Edit Service Architecture' : 'Create New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Name *
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
                    Icon Identifier
                  </label>
                  <select
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                  >
                    {icons.map(ic => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Value Proposition *
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Categories</label>
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                  {serviceCategories.length > 0 ? serviceCategories.map(category => (
                    <label key={category.id} className="flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(category.id)}
                        onChange={e => setFormData({ ...formData, categoryIds: e.target.checked ? [...formData.categoryIds, category.id] : formData.categoryIds.filter(id => id !== category.id) })}
                        className="h-4 w-4 rounded text-[#0282EB]"
                      />
                      <span>{category.name}</span>
                    </label>
                  )) : <span className="text-xs text-slate-500">Create a category before assigning it.</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Architectural Specification *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDescription}
                  onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Features & Deliverables (one per line)
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
                    Business Benefits (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.benefits}
                    onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>
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
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={e => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Publication Status
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
                  Save Service
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
              <h3 className="text-xl font-bold text-slate-900">{editingCategoryId ? 'Edit Service Category' : 'New Service Category'}</h3>
              <button onClick={() => setCategoryModalOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:text-slate-800"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCategorySave} className="space-y-4">
              <input required placeholder="Category name" value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" />
              <input required placeholder="category-slug" value={categoryForm.slug} onChange={e => setCategoryForm({ ...categoryForm, slug: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" />
              <textarea placeholder="Description (optional)" value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" rows={3} />
              <input type="number" min={0} value={categoryForm.sortOrder} onChange={e => setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" />
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
export default AdminServices;
