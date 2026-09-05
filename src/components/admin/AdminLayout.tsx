import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { BeezentLogo } from '../shared/BeezentLogo';
import { AdminApiExplorerModal } from './AdminApiExplorerModal';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Cpu,
  Sparkles,
  Users,
  Mail,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Shield,
  Bell,
  Terminal
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { path, navigate } = useRouter();
  const { auth, logout, getInquiries, apiBaseUrl, apiHealth, mutationError, clearMutationError } = useDatabase();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isApiExplorerOpen, setIsApiExplorerOpen] = useState(false);

  const inquiries = getInquiries();
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const navItems = [
    { label: 'Overview', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Projects', href: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Case Studies', href: '/admin/case-studies', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Services', href: '/admin/services', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Solutions', href: '/admin/solutions', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Team Members', href: '/admin/team-members', icon: <Users className="w-4 h-4" /> },
    {
      label: 'Inquiries',
      href: '/admin/inquiries',
      icon: <Mail className="w-4 h-4" />,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
    },
    { label: 'Media Library', href: '/admin/media', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Settings & SEO', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return path === '/admin';
    return path.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-40 sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle Admin Menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/admin" className="flex items-center gap-3">
            <BeezentLogo variant="white" size="sm" />
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider bg-[#0282EB] text-white px-2 py-0.5 rounded-sm">
              CMS Engine
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* API Status & Explorer Launcher */}
          <button
            onClick={() => setIsApiExplorerOpen(true)}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-2xs"
            title={`Connected to ${apiBaseUrl} (Click to open API Explorer)`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                apiHealth.status === 'online'
                  ? 'bg-emerald-400 shadow-xs shadow-emerald-500/50'
                  : apiHealth.status === 'checking'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-400'
              }`}
            />
            <span className="font-mono text-[11px] font-bold text-slate-200 hidden sm:inline">
              API: {apiBaseUrl.replace(/^https?:\/\//, '')}
            </span>
            <span className="font-mono text-[11px] font-bold text-slate-200 sm:hidden">
              API
            </span>
            <Terminal className="w-3 h-3 text-[#38BDF8]" />
          </button>

          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="Open live public website"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
          </Link>

          {auth.user && (
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-blue-400">
                {auth.user.name.charAt(0)}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-white leading-tight">{auth.user.name}</div>
                <div className="text-[10px] text-slate-400">{auth.user.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Sign out of CMS"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col justify-between p-4 shrink-0">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Content & Operations
            </div>
            {navItems.map(item => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-50 text-[#0282EB] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? 'text-[#0282EB]' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-[#0282EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick System Info in sidebar footer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#0282EB]" />
              <span>Beezent CMS v2.4</span>
            </div>
            <div>Full Local Persistence</div>
            <div className="text-[10px] text-emerald-600 font-medium">● Storage Synced</div>
          </div>
        </aside>

        {/* Mobile Sidebar overlay */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-slate-900/60" onClick={() => setMobileNavOpen(false)} />
            <div className="relative w-64 bg-white h-full p-4 flex flex-col justify-between z-10 animate-in slide-in-from-left">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <BeezentLogo size="sm" />
                  <button onClick={() => setMobileNavOpen(false)} className="p-1 text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {navItems.map(item => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-blue-50 text-[#0282EB] font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={active ? 'text-[#0282EB]' : 'text-slate-400'}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="bg-[#0282EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-red-600 font-semibold bg-red-50 hover:bg-red-100 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Admin Body Content */}
         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
           <div className="max-w-[1440px] mx-auto">
             {mutationError && (
               <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-800" role="alert">
                 <span>{mutationError}</span>
                 <button onClick={clearMutationError} className="font-bold text-rose-600 hover:text-rose-900" aria-label="Dismiss error">
                   <X className="h-4 w-4" />
                 </button>
               </div>
             )}
             {children}
           </div>
         </main>
      </div>

      {/* Interactive REST API Diagnostics Modal */}
      <AdminApiExplorerModal
        isOpen={isApiExplorerOpen}
        onClose={() => setIsApiExplorerOpen(false)}
      />
    </div>
  );
};
export default AdminLayout;
