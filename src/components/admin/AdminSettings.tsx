import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { AdminApiExplorerModal } from './AdminApiExplorerModal';
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Share2,
  Server,
  Activity,
  RefreshCw,
  Terminal,
  Database,
  Check,
  AlertCircle
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const {
    getSettings,
    updateSettings,
    resetToSeedData,
    apiBaseUrl,
    setApiBaseUrl,
    resetApiBaseUrl,
    apiHealth,
    checkApiHealth,
    syncWithApi,
    isSyncing,
  } = useDatabase();
  const settings = getSettings();

  const [apiUrlInput, setApiUrlInput] = useState(apiBaseUrl);
  const [apiSaveFeedback, setApiSaveFeedback] = useState<string | null>(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    siteName: settings.siteName,
    tagline: settings.tagline,
    description: settings.description,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    address: settings.address,
    workingHours: settings.workingHours || 'Monday – Friday: 9:00 AM – 6:00 PM EST',
    socialLinks: { ...settings.socialLinks },
    metaTitle: settings.seoDefaults?.metaTitle || 'The Beezent | Enterprise AI Agency & Systems Engineering',
    metaDescription: settings.seoDefaults?.metaDescription || 'Architecting deterministic multi-agent DAGs, intelligent workflow automations, and resilient AI systems for scaling enterprises.',
    ogImage: settings.seoDefaults?.ogImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName: formData.siteName,
      tagline: formData.tagline,
      description: formData.description,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      address: formData.address,
      workingHours: formData.workingHours,
      socialLinks: formData.socialLinks,
      seoDefaults: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        ogImage: formData.ogImage,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetToSeedData();
    setResetConfirmOpen(false);
    window.location.reload();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System & Agency Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure global contact endpoints, SEO metadata, and data persistence</p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0282EB]" />
            <span>Brand Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Agency Name
              </label>
              <input
                type="text"
                required
                value={formData.siteName}
                onChange={e => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Mission Statement / Agency Bio
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#0282EB]" />
            <span>Global Contact Endpoints</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Inquiry Email Address
              </label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Direct Telephone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Office Headquarters Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#0282EB]" />
            <span>Social Profile Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin || ''}
                onChange={e => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter || ''}
                onChange={e => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                GitHub Organization URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.github || ''}
                onChange={e => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, github: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0282EB]" />
            <span>Default Meta & OpenGraph SEO</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Default Meta Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={formData.metaDescription}
              onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              OpenGraph Preview Image URL
            </label>
            <input
              type="url"
              value={formData.ogImage}
              onChange={e => setFormData({ ...formData, ogImage: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0282EB] outline-hidden"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md transition-all active:scale-[0.99]"
          >
            <Save className="w-4 h-4" />
            <span>Save All System Settings</span>
          </button>
        </div>
      </form>

      {/* Backend API Configuration & Health Monitoring Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-[#0282EB] rounded-2xl border border-blue-100">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Backend REST API Integration
              </h3>
              <p className="text-xs text-slate-500">
                Connection endpoints for services, solutions, projects, case studies, auth, and leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                apiHealth.status === 'online'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : apiHealth.status === 'checking'
                  ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  apiHealth.status === 'online'
                    ? 'bg-emerald-500'
                    : apiHealth.status === 'checking'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              />
              <span className="capitalize">{apiHealth.status}</span>
            </span>

            <button
              type="button"
              onClick={() => checkApiHealth()}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
              title="Refresh Health Status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Base URL Configuration */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Target Base API URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={apiUrlInput}
              onChange={e => setApiUrlInput(e.target.value)}
               placeholder="http://localhost:8000"
              className="flex-1 font-mono text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0282EB] outline-hidden"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setApiBaseUrl(apiUrlInput.trim());
                  setApiSaveFeedback('Base URL updated');
                  setTimeout(() => setApiSaveFeedback(null), 3000);
                }}
                className="px-4 py-2.5 bg-[#0282EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Apply URL
              </button>
              <button
                type="button"
                onClick={() => {
                  const def = resetApiBaseUrl();
                  setApiUrlInput(def);
                  setApiSaveFeedback('Reset to default');
                  setTimeout(() => setApiSaveFeedback(null), 3000);
                }}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Reset Default
              </button>
            </div>
          </div>
          {apiSaveFeedback && (
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{apiSaveFeedback}</span>
            </p>
          )}
        </div>

        {/* Live Probes / Diagnostic Endpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Root Health</span>
              <code className="text-[10px] font-mono text-slate-400">GET /health</code>
            </div>
            <div className="text-xs font-mono text-slate-600 truncate">
              {apiHealth.rootHealth ? JSON.stringify(apiHealth.rootHealth) : apiHealth.status === 'online' ? 'Status: 200 OK' : 'Unreachable'}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">API Health</span>
              <code className="text-[10px] font-mono text-slate-400">GET /api/v1/health</code>
            </div>
            <div className="text-xs font-mono text-slate-600 truncate">
              {apiHealth.apiHealth ? JSON.stringify(apiHealth.apiHealth) : apiHealth.status === 'online' ? 'Status: 200 OK' : 'Unreachable'}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Database Health</span>
              <code className="text-[10px] font-mono text-slate-400">GET /api/v1/health/db</code>
            </div>
            <div className="text-xs font-mono text-slate-600 truncate">
              {apiHealth.dbHealth ? JSON.stringify(apiHealth.dbHealth) : apiHealth.status === 'online' ? 'Status: 200 OK' : 'Unreachable'}
            </div>
          </div>
        </div>

        {/* Actions & Explorer Launcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsExplorerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#38BDF8]" />
              <span>Launch API Explorer & Test Suite</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                setSyncFeedback('Synchronizing...');
                const res = await syncWithApi();
                setSyncFeedback(res.message || (res.success ? 'Synced!' : 'Failed'));
                setTimeout(() => setSyncFeedback(null), 4000);
              }}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0282EB] rounded-xl text-xs font-bold border border-blue-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : syncFeedback || 'Sync with Backend API'}</span>
            </button>
          </div>

          {apiHealth.lastChecked && (
            <span className="text-[11px] text-slate-400">
              Last checked: {apiHealth.lastChecked}
            </span>
          )}
        </div>
      </div>

      {/* Danger Zone: Reset to Default Data */}
      <div className="bg-red-50/50 rounded-3xl p-6 sm:p-8 border border-red-200 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-red-900">Database Restoration & Seed State</h3>
            <p className="text-xs text-red-700 mt-1 leading-relaxed">
              If you wish to restore all initial demo projects, case studies, services, blog articles, and inquiries to their factory seed state, use this trigger.
            </p>
            <button
              type="button"
              onClick={() => setResetConfirmOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Database to Seed State</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h4 className="text-lg font-bold text-slate-900">Confirm Factory Data Reset</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will overwrite all local modifications and restore the original seed content for The Beezent. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REST API Diagnostics Modal */}
      <AdminApiExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />
    </div>
  );
};
export default AdminSettings;
