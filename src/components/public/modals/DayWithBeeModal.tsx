import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Clock, CheckCircle2, MessageSquare, Calendar, Workflow, Sparkles } from 'lucide-react';
import { BeezentLogo } from '../../shared/BeezentLogo';

interface DayWithBeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const DayWithBeeModal: React.FC<DayWithBeeModalProps> = ({
  isOpen,
  onClose,
  onOpenDemo,
}) => {
  if (!isOpen) return null;

  const timeline = [
    {
      time: '02:14 AM',
      title: 'Inbound Web Lead Captured & Qualified',
      desc: 'A prospect in London visits your pricing page. The AI Bee greets them in under 2 seconds, answers compliance queries, and gathers company size details.',
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      badge: 'Night Shift Autopilot',
    },
    {
      time: '07:30 AM',
      title: 'Morning Meeting Slot Reserved',
      desc: 'The Bee detects an open slot on your calendar and books a 30-minute discovery call, generating calendar invites with Zoom links for both attendees.',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      badge: 'Calendar Synchronization',
    },
    {
      time: '11:45 AM',
      title: 'CRM Record & Dossier Built',
      desc: 'All notes from the interaction are populated directly into HubSpot / Salesforce with enriched company data and priority intent scoring.',
      icon: <Workflow className="w-4 h-4 text-[#0282EB]" />,
      badge: 'Zero Manual Data Entry',
    },
    {
      time: '03:15 PM',
      title: 'Dormant Client Follow-Up Dispatched',
      desc: 'The Bee identifies 4 proposals awaiting client response from last week and triggers personalized, polite follow-ups, prompting 2 instant replies.',
      icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
      badge: 'Automated Pipeline Velocity',
    },
    {
      time: '08:00 PM',
      title: 'Daily Operations Digest Delivered',
      desc: 'A comprehensive summary is compiled and posted to your private Slack channel with total leads captured, calls booked, and revenue pipeline added.',
      icon: <Sparkles className="w-4 h-4 text-[#38BDF8]" />,
      badge: 'Executive Visibility',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between border-b border-slate-100 bg-[#F8FAFC]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 px-2.5 py-1 rounded-full">
                24-Hour Operation Timeline
              </span>
              <div className="flex items-center gap-2.5 mt-2">
                <BeezentLogo variant="mark" size="sm" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  A Day With Your AI Bee Running the Show
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline List */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4 sm:gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                    {item.icon}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-slate-200 my-1" />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-black text-[#0282EB] tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Call to Action */}
          <div className="px-6 sm:px-8 py-5 bg-[#070D1E] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-300">
              Ready to give your team back 40+ hours every month?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenDemo();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0282EB] hover:bg-[#026fc9] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors cursor-pointer"
            >
              Book a Free Demo Call
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default DayWithBeeModal;
