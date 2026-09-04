import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { AdminUser, AdminRole } from '../../types';
import {
  Plus,
  Search,
  Shield,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  X,
  KeyRound
} from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { getUsers, createUser, updateUser, deleteUser, auth } = useDatabase();
  const users = getUsers();

  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: AdminRole.ADMIN,
    password: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    createUser({
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      password: newUser.password.trim() || 'admin123',
    });

    setNewUser({
      name: '',
      email: '',
      role: AdminRole.ADMIN,
      password: '',
    });
    setModalOpen(false);
  };

  const handleToggleStatus = (u: AdminUser) => {
    if (u.id === auth.user?.id) {
      alert('You cannot deactivate your own administrative account.');
      return;
    }
    const newStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    updateUser(u.id, { status: newStatus as any });
  };

  const handleDelete = (u: AdminUser) => {
    if (u.id === auth.user?.id) {
      alert('You cannot delete your own administrative account.');
      return;
    }
    if (confirm(`Are you sure you want to remove user "${u.name}"?`)) {
      deleteUser(u.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Users & Access Control</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage authorized team members, roles, and administrative permissions</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Admin User</span>
        </button>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Super Admin</div>
          <div className="text-xs text-slate-500 mt-1">Full access to settings, user management, and content mutations</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Admin</div>
          <div className="text-xs text-slate-500 mt-1">Manage all projects, case studies, services, blog, and inquiries</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Editor</div>
          <div className="text-xs text-slate-500 mt-1">Create and publish engineering publications and portfolio items</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Login</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{u.name}</span>
                          {u.id === auth.user?.id && (
                            <span className="text-[10px] bg-blue-100 text-[#0282EB] px-1.5 py-0.2 rounded-sm font-bold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === AdminRole.SUPER_ADMIN
                          ? 'bg-blue-100 text-blue-800'
                          : u.role === AdminRole.ADMIN
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                        u.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{u.status}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {u.id !== auth.user?.id && (
                      <button
                        onClick={() => handleDelete(u)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Add Authorized User</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan.lee@beezent.ai"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  System Role
                </label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value as AdminRole })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#0282EB] outline-hidden"
                >
                  <option value={AdminRole.SUPER_ADMIN}>Super Admin (Full System Privileges)</option>
                  <option value={AdminRole.ADMIN}>Admin (Content & Inquiries)</option>
                  <option value={AdminRole.EDITOR}>Editor (Content Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Temporary Password
                </label>
                <input
                  type="password"
                  placeholder="Default: admin123"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold shadow-xs"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminUsers;
