import React from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import {
  FolderGit2,
  BookOpen,
  Cpu,
  Sparkles,
  FileText,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    auth,
    getInquiries,
    getProjects,
    getCaseStudies,
    getServices,
    getSolutions,
    getBlogPosts
  } = useDatabase();

  const inquiries = getInquiries();
  const projects = getProjects(true);
  const caseStudies = getCaseStudies(true);
  const services = getServices(true);
  const solutions = getSolutions(true);
  const blogPosts = getBlogPosts(true);

  const newInquiries = inquiries.filter(i => i.status === 'New');
  const recentInquiries = inquiries.slice(0, 5);

  const stats = [
    {
      title: 'Inbound Inquiries',
      value: inquiries.length,
      sub: `${newInquiries.length} pending review`,
      highlight: newInquiries.length > 0,
      icon: <Mail className="w-5 h-5" />,
      href: '/admin/inquiries',
    },
    {
      title: 'Active Projects',
      value: projects.length,
      sub: `${projects.filter(p => p.featured).length} featured on home`,
      icon: <FolderGit2 className="w-5 h-5" />,
      href: '/admin/projects',
    },
    {
      title: 'Case Studies',
      value: caseStudies.length,
      sub: `${caseStudies.filter(c => c.status === 'PUBLISHED').length} published live`,
      icon: <BookOpen className="w-5 h-5" />,
      href: '/admin/case-studies',
    },
    {
      title: 'Core Services',
      value: services.length,
      sub: 'Architectural offerings',
      icon: <Cpu className="w-5 h-5" />,
      href: '/admin/services',
    },
    {
      title: 'AI Solutions',
      value: solutions.length,
      sub: 'Pre-engineered systems',
      icon: <Sparkles className="w-5 h-5" />,
      href: '/admin/solutions',
    },
    {
      title: 'Publications',
      value: blogPosts.length,
      sub: 'Engineering articles',
      icon: <FileText className="w-5 h-5" />,
      href: '/admin/blog',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#0282EB]">System Overview</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Welcome back, {auth.user?.name || 'Administrator'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Role: <span className="font-bold text-slate-800">{auth.user?.role}</span> • Beezent Content Management System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Manage Inquiries</span>
            {newInquiries.length > 0 && (
              <span className="bg-white text-[#0282EB] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {newInquiries.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(st => (
          <Link
            key={st.title}
            href={st.href}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 group-hover:text-[#0282EB] transition-colors">{st.icon}</span>
                {st.highlight && (
                  <span className="w-2 h-2 rounded-full bg-[#0282EB] animate-ping" />
                )}
              </div>
              <div className="text-2xl font-black text-slate-900">{st.value}</div>
              <div className="text-xs font-bold text-slate-700 mt-1">{st.title}</div>
            </div>
            <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
              {st.sub}
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Section: Recent Inquiries + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inbound Leads */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Inbound Inquiries</h2>
              <p className="text-xs text-slate-500">Contact form leads awaiting evaluation</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-[#0282EB] hover:underline flex items-center gap-1"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Lead / Company</th>
                  <th className="py-3 px-3">Project Type</th>
                  <th className="py-3 px-3">Budget</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{inq.name}</div>
                      <div className="text-[11px] text-slate-500">{inq.company || inq.email}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-700">{inq.projectType}</td>
                    <td className="py-3.5 px-3 text-slate-600">{inq.budgetRange}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === 'New'
                            ? 'bg-blue-100 text-[#0282EB]'
                            : inq.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'Closed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>

            <div className="space-y-2">
              <Link
                href="/admin/projects"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FolderGit2 className="w-4 h-4 text-[#0282EB]" />
                  <span>Create New Project</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/admin/case-studies"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#0282EB]" />
                  <span>Add Case Study</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/admin/blog"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#0282EB]" />
                  <span>Publish New Article</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/admin/media"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#0282EB]" />
                  <span>Media Assets Library</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-sm space-y-3">
            <h4 className="text-sm font-bold">Client Site Status</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All live pages read directly from the persistent database store. Any change published in this CMS reflects instantly on the public website.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] hover:underline pt-1"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
