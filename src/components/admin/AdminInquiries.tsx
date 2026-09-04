import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Inquiry } from '../../types';
import {
  Mail,
  Search,
  Filter,
  Trash2,
  Clock,
  Phone,
  Building,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const { getInquiries, updateInquiryStatus, addInquiryNote, deleteInquiry } = useDatabase();
  const inquiries = getInquiries();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [newNote, setNewNote] = useState('');

  const statuses: Inquiry['status'][] = ['New', 'In Progress', 'Contacted', 'Closed', 'Archived'];

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.projectType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || inq.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (status: Inquiry['status']) => {
    if (!activeInquiry) return;
    updateInquiryStatus(activeInquiry.id, status);
    setActiveInquiry({ ...activeInquiry, status });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry || !newNote.trim()) return;

    addInquiryNote(activeInquiry.id, newNote.trim());
    setActiveInquiry({
      ...activeInquiry,
      notes: [...(activeInquiry.notes || []), newNote.trim()],
    });
    setNewNote('');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      deleteInquiry(id);
      if (activeInquiry?.id === id) {
        setActiveInquiry(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Inbound Project Inquiries</h1>
          <p className="text-xs text-slate-500 mt-0.5">Evaluate architectural inquiries, adjust pipeline status, and record internal notes</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search leads by name, company, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedStatus === 'ALL'
                ? 'bg-[#0282EB] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({inquiries.length})
          </button>
          {statuses.map(st => {
            const count = inquiries.filter(i => i.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedStatus === st
                    ? 'bg-[#0282EB] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inquiries Grid / Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table View */}
        <div className={`${activeInquiry ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Requirement</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map(inq => (
                  <tr
                    key={inq.id}
                    onClick={() => setActiveInquiry(inq)}
                    className={`cursor-pointer transition-colors ${
                      activeInquiry?.id === inq.id ? 'bg-blue-50/60 font-medium' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{inq.name}</div>
                      <div className="text-[11px] text-slate-500">{inq.company || inq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 max-w-[150px] truncate">
                      {inq.projectType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{inq.budgetRange}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === 'New'
                            ? 'bg-blue-100 text-[#0282EB]'
                            : inq.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'Closed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inq.status === 'Contacted'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(inq.id, inq.name);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Inquiry Detail Drawer */}
        {activeInquiry && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeInquiry.status === 'New'
                      ? 'bg-blue-100 text-[#0282EB]'
                      : activeInquiry.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : activeInquiry.status === 'Closed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {activeInquiry.status}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{activeInquiry.name}</h3>
                <div className="text-xs text-slate-500">{activeInquiry.company || 'Private Inquiry'}</div>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0282EB]" /> Email
                </span>
                <a
                  href={`mailto:${activeInquiry.email}?subject=The%20Beezent%20-%20Project%20Inquiry%20Response`}
                  className="font-bold text-[#0282EB] hover:underline"
                >
                  {activeInquiry.email}
                </a>
              </div>

              {activeInquiry.phone && (
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0282EB]" /> Phone
                  </span>
                  <span className="font-bold text-slate-800">{activeInquiry.phone}</span>
                </div>
              )}

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Project Type</span>
                <span className="font-bold text-slate-800">{activeInquiry.projectType}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Budget Range</span>
                <span className="font-bold text-[#0282EB]">{activeInquiry.budgetRange}</span>
              </div>
            </div>

            {/* Lead Message */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Project Message</div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {activeInquiry.message}
              </div>
            </div>

            {/* Status Selector */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Update Pipeline Status</div>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeInquiry.status === st
                        ? 'bg-[#0282EB] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0282EB]" />
                <span>Internal Architecture Notes</span>
              </div>

              {activeInquiry.notes && activeInquiry.notes.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activeInquiry.notes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-slate-700">
                      {note}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No internal notes added yet.</div>
              )}

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add note (e.g. Sent scoping invite)..."
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  Post Note
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminInquiries;
