import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { MediaItem } from '../../types';
import {
  Upload,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Search,
  X
} from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { getMediaItems, addMediaItem, deleteMediaItem } = useDatabase();
  const mediaItems = getMediaItems();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newMedia, setNewMedia] = useState({
    name: '',
    url: '',
    type: 'IMAGE' as 'IMAGE' | 'DOCUMENT',
    alt: '',
  });

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.name.trim() || !newMedia.url.trim()) return;

    addMediaItem({
      name: newMedia.name.trim(),
      url: newMedia.url.trim(),
      type: newMedia.type,
      size: '1.2 MB',
      alt: newMedia.alt.trim() || newMedia.name.trim(),
    });

    setNewMedia({
      name: '',
      url: '',
      type: 'IMAGE',
      alt: '',
    });
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete media asset "${name}"?`)) {
      deleteMediaItem(id);
    }
  };

  const filteredMedia = mediaItems.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.alt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Media & Asset Library</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage imagery, architecture diagrams, and logos used across public case studies and blogs</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search media files by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Total: {filteredMedia.length} assets
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
              <img
                src={item.url}
                alt={item.alt || item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="p-1 text-white hover:text-blue-300 rounded"
                  title="Copy Image URL"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-1 text-white hover:text-red-400 rounded"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3.5">
              <div className="font-bold text-slate-800 text-xs truncate" title={item.name}>
                {item.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                <span>{item.size || 'Web Asset'}</span>
                <span>{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Add Media Asset</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Asset Title / Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Multi-Agent DAG Topology Diagram"
                  value={newMedia.name}
                  onChange={e => setNewMedia({ ...newMedia, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newMedia.url}
                  onChange={e => setNewMedia({ ...newMedia, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alt Text Description
                </label>
                <input
                  type="text"
                  placeholder="Accessible description for search engines"
                  value={newMedia.alt}
                  onChange={e => setNewMedia({ ...newMedia, alt: e.target.value })}
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
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminMedia;
