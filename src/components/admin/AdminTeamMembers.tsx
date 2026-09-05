import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { TeamMember, TeamMemberCategory } from '../../types';
import { Edit2, Plus, Trash2, X } from 'lucide-react';

export const AdminTeamMembers: React.FC = () => {
  const { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } = useDatabase();
  const members = getTeamMembers(true);
  const initialForm = { name: '', slug: '', role: '', bio: '', avatarUrl: '', category: 'talent' as TeamMemberCategory, featured: false, sortOrder: 0, status: 'PUBLISHED' as 'PUBLISHED' | 'DRAFT' };
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openCreate = () => { setEditingId(null); setForm({ ...initialForm, sortOrder: members.length }); setModalOpen(true); };
  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({ name: member.name, slug: member.slug, role: member.role, bio: member.bio || '', avatarUrl: member.avatarUrl || '', category: member.category, featured: member.featured, sortOrder: member.sortOrder, status: member.status });
    setModalOpen(true);
  };
  const save = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { ...form, name: form.name.trim(), slug: form.slug.trim() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') };
    if (editingId) updateTeamMember(editingId, data); else createTeamMember(data);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4"><div><h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Team Members</h1><p className="mt-1 text-xs text-slate-500">Manage published leadership and talent profiles.</p></div><button onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-[#0282EB] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1d58c4]"><Plus className="h-4 w-4" /> New Member</button></div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs"><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Member</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{members.map(member => <tr key={member.id}><td className="px-4 py-3"><div className="font-bold text-slate-900">{member.name}</div><div className="text-[11px] text-slate-500">/{member.slug}</div></td><td className="px-4 py-3 text-slate-700">{member.role}</td><td className="px-4 py-3 capitalize text-slate-600">{member.category}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${member.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{member.status}</span></td><td className="px-4 py-3 text-right"><button onClick={() => openEdit(member)} className="mr-2 rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-[#0282EB]"><Edit2 className="h-4 w-4" /></button><button onClick={() => confirm(`Delete ${member.name}?`) && deleteTeamMember(member.id)} className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div></div>

      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"><div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4"><h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Team Member' : 'New Team Member'}</h2><button onClick={() => setModalOpen(false)} className="rounded-lg p-1.5 text-slate-400"><X className="h-5 w-5" /></button></div><form onSubmit={save} className="space-y-4"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><input required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" /><input required placeholder="Role / designation" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" /></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><input placeholder="slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" /><input type="url" placeholder="Avatar URL" value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" /></div><textarea rows={4} placeholder="Biography" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-hidden focus:border-[#0282EB]" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as TeamMemberCategory })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"><option value="leadership">Leadership</option><option value="talent">Talent</option></select><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'PUBLISHED' | 'DRAFT' })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option></select><input type="number" min={0} value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} className="rounded-xl border border-slate-200 px-3 py-2 text-xs" /></div><label className="flex items-center gap-2 text-xs font-semibold text-slate-700"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 rounded text-[#0282EB]" /> Featured member</label><div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button><button type="submit" className="rounded-xl bg-[#0282EB] px-5 py-2 text-xs font-semibold text-white">Save Member</button></div></form></div></div>}
    </div>
  );
};

export default AdminTeamMembers;
