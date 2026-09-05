import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import { BeezentLogo } from '../../shared/BeezentLogo';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const { submitInquiry } = useDatabase();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('Lead Capture & Booking');
  const [selectedDay, setSelectedDay] = useState('Thursday');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      await submitInquiry({
        name: name.trim(), email: email.trim(), company: company.trim(), phone: '', projectType: useCase, budgetRange: 'Not specified',
        message: `Booked demo for ${selectedDay} at ${selectedTime} (EST). Primary use case: ${useCase}.`,
      });
      setSubmitted(true);
    } catch {
      window.alert('We could not submit your demo request. Please try again.');
    }
    setTimeout(() => {
      // Auto close after 3 seconds if user hasn't closed it
    }, 3000);
  };

  const days = ['Wednesday', 'Thursday', 'Friday', 'Next Monday'];
  const times = ['09:30 AM', '10:30 AM', '02:00 PM', '04:15 PM'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 px-2.5 py-1 rounded-full">
                Interactive Architecture Walkthrough
              </span>
              <div className="flex items-center gap-2.5 mt-2">
                <BeezentLogo variant="mark" size="sm" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Book a Free AI Bee Demo
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                You're On the Calendar!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We have reserved your slot for <strong>{selectedDay} at {selectedTime}</strong>. A calendar invite with live demo link has been dispatched to <strong>{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#0282EB] text-white font-semibold rounded-xl text-sm hover:bg-[#026fc9] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              {/* Day Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0282EB]" />
                  <span>Choose Day</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {days.map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        selectedDay === d
                          ? 'bg-[#0282EB] text-white border-[#0282EB] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0282EB]" />
                  <span>Choose Time Slot (EST)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {times.map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        selectedTime === t
                          ? 'bg-[#0282EB] text-white border-[#0282EB] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-[#0282EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-[#0282EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Acme Health or Apex Logistics"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-[#0282EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Primary Use Case
                </label>
                <select
                  value={useCase}
                  onChange={e => setUseCase(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-[#0282EB]"
                >
                  <option>Lead Capture & Automated Booking</option>
                  <option>Workflow & CRM Integration</option>
                  <option>FAQ & Internal Knowledge Assistant</option>
                  <option>Voice & Customer Support Agent</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0282EB] hover:bg-[#026fc9] text-white font-semibold text-sm shadow-md hover:shadow-blue-500/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirm Free Demo Call</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default BookDemoModal;
