import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { BeezentLogo } from '../shared/BeezentLogo';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Loader2, KeyRound } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { navigate } = useRouter();
  const { login, auth } = useDatabase();

  const [email, setEmail] = useState('MBadmin@beezents.com');
  const [password, setPassword] = useState('Bee@MB');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Bee@MB');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <BeezentLogo size="lg" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            CMS Admin Authentication
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Authorized personnel only. Role-based access control enforced.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@beezent.ai"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-hidden transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0282EB] focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-hidden transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0282EB] hover:bg-[#1d58c4] disabled:bg-blue-300 text-white font-semibold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99] mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to CMS Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Development seed account. Enable SEED_DEV_ADMIN in the backend first. */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#0282EB]" />
               <span>Development Seed Account</span>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickFill('MBadmin@beezents.com')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200 text-xs flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-800">Development Admin</div>
                  <div className="text-[10px] text-slate-500">MBadmin@beezents.com</div>
                </div>
                <span className="text-[10px] bg-blue-100 text-[#0282EB] px-2 py-0.5 rounded-sm font-bold">
                  All Perms
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
