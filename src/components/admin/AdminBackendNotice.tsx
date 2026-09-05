import React from 'react';
import { Server, ShieldAlert } from 'lucide-react';

interface AdminBackendNoticeProps {
  title: string;
  detail: string;
}

export const AdminBackendNotice: React.FC<AdminBackendNoticeProps> = ({ title, detail }) => (
  <div className="max-w-2xl mx-auto py-16">
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
        <ShieldAlert className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-slate-900">{title}</h1>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">{detail}</p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700">
        <Server className="h-4 w-4 text-amber-600" />
        <span>Not included in the documented FastAPI contract</span>
      </div>
    </div>
  </div>
);

export default AdminBackendNotice;
