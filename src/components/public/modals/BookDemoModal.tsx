import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CalendarDays,
  Clock,
  CheckCircle2,
  Send,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import { BeezentLogo } from '../../shared/BeezentLogo';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/* Timezone helpers                                                    */
/* ------------------------------------------------------------------ */

const FALLBACK_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const TIMEZONES: string[] = (() => {
  try {
    const list = Intl.supportedValuesOf('timeZone');
    if (list.length) return list;
  } catch {
    /* older browsers */
  }
  return FALLBACK_TIMEZONES;
})();

function defaultTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

/** Current GMT offset for a timezone, e.g. "GMT-4" */
function tzOffsetLabel(tz: string): string {
  const part = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  }).formatToParts(new Date());
  return part.find(p => p.type === 'timeZoneName')?.value || '';
}

/**
 * Builds the UTC instant for `hour:minute` on `calendarDate`'s calendar day
 * interpreted inside `tz`. Handles DST via a two-pass correction loop.
 */
function zonedInstant(calendarDate: Date, tz: string, hour: number, minute: number): Date {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const wallOf = (d: Date) => {
    const p = fmt.formatToParts(d);
    const get = (t: string) => Number(p.find(x => x.type === t)?.value || 0);
    const h = get('hour');
    return { y: get('year'), m: get('month'), d: get('day'), h: h === 24 ? 0 : h, mi: get('minute') };
  };
  const base = wallOf(calendarDate);
  let guess = new Date(Date.UTC(base.y, base.m - 1, base.d, hour, minute));
  for (let i = 0; i < 3; i++) {
    const cur = wallOf(guess);
    const diff = cur.h * 60 + cur.mi - (hour * 60 + minute);
    if (diff === 0) break;
    guess = new Date(guess.getTime() - diff * 60000);
  }
  return guess;
}

function formatTime(instant: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' }).format(instant);
}

function formatDayShort(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' }).format(date);
}

function formatDayLong(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' }).format(date);
}

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

function nextBusinessDay(from: Date, offset: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + offset);
  while (isWeekend(d)) d.setDate(d.getDate() + 1);
  return d;
}

/* ------------------------------------------------------------------ */
/* Calendar helpers                                                    */
/* ------------------------------------------------------------------ */

const SLOT_START_HOUR = 9;
const SLOT_END_HOUR = 17; // last slot starts at 16:30

function buildMonthCells(viewDate: Date): Array<Date | null> {
  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < new Date(y, m, 1).getDay(); i++) cells.push(null);
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isSameCalendarDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildSlots(date: Date, tz: string): Array<{ hour: number; minute: number; instant: Date }> {
  const now = Date.now();
  const slots: Array<{ hour: number; minute: number; instant: Date }> = [];
  for (let h = SLOT_START_HOUR; h < SLOT_END_HOUR; h++) {
    for (const minute of [0, 30]) {
      const instant = zonedInstant(date, tz, h, minute);
      if (instant.getTime() <= now) continue;
      slots.push({ hour: h, minute, instant });
    }
  }
  return slots;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const { submitInquiry } = useDatabase();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('Lead Capture & Automated Booking');
  const [timezone, setTimezone] = useState<string>(defaultTimezone);
  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ hour: number; minute: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Reset to sensible defaults every time the modal opens.
  useEffect(() => {
    if (!isOpen) return;
    const tz = defaultTimezone();
    setTimezone(tz);
    const first = nextBusinessDay(new Date(), 1);
    setSelectedDate(first);
    setViewDate(new Date(first.getFullYear(), first.getMonth(), 1));
    setSelectedSlot(null);
    setSubmitted(false);
  }, [isOpen]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewDate),
    [viewDate],
  );

  const todayStart = zonedInstant(new Date(), timezone, 0, 0).getTime();
  const maxMonth = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }, []);

  const cells = useMemo(() => buildMonthCells(viewDate), [viewDate]);

  const slots = useMemo(
    () => (selectedDate ? buildSlots(selectedDate, timezone) : []),
    [selectedDate, timezone],
  );

  const moveMonth = (delta: number) => {
    setViewDate(prev => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + delta, 1);
      const now = new Date();
      const min = new Date(now.getFullYear(), now.getMonth(), 1);
      if (next < min || next > maxMonth) return prev;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedDate || !selectedSlot) return;

    const instant = zonedInstant(selectedDate, timezone, selectedSlot.hour, selectedSlot.minute);
    const dateLabel = formatDayLong(selectedDate, timezone);
    const timeLabel = formatTime(instant, timezone);

    try {
      await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        phone: '',
        projectType: useCase,
        budgetRange: 'Not specified',
        message: `Booked demo for ${dateLabel} at ${timeLabel} (${timezone}). Primary use case: ${useCase}.`,
      });
      setSubmitted(true);
    } catch {
      window.alert('We could not submit your demo request. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Book a Free AI Bee Demo"
      >
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
          className="relative w-full max-w-[860px] rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto max-h-[calc(100dvh-2rem)] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white z-10">
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
              aria-label="Close"
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
              <h4 className="text-2xl font-bold text-slate-900">You're On the Calendar!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We have reserved your slot for{' '}
                <strong>
                  {selectedDate && selectedSlot
                    ? `${formatDayLong(selectedDate, timezone)} at ${formatTime(
                        zonedInstant(selectedDate, timezone, selectedSlot.hour, selectedSlot.minute),
                        timezone,
                      )} (${timezone})`
                    : ''}
                </strong>
                . A calendar invite with live demo link has been dispatched to{' '}
                <strong>{email}</strong>.
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
            <form onSubmit={handleSubmit} className="grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* LEFT: timezone + month calendar */}
              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0282EB]" />
                    <span>Timezone</span>
                  </label>
                  <select
                    value={timezone}
                    onChange={e => {
                      setTimezone(e.target.value);
                      setSelectedSlot(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-[#0282EB]"
                  >
                    {TIMEZONES.map(tz => (
                      <option key={tz} value={tz}>
                        {tz} ({tzOffsetLabel(tz)})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Times below are shown in {timezone} ({tzOffsetLabel(timezone)}).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#0282EB]" />
                    <span>Choose a Date</span>
                  </label>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                      <button
                        type="button"
                        onClick={() => moveMonth(-1)}
                        aria-label="Previous month"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0282EB] hover:bg-blue-50 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold text-slate-800">{monthLabel}</span>
                      <button
                        type="button"
                        onClick={() => moveMonth(1)}
                        aria-label="Next month"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0282EB] hover:bg-blue-50 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 text-center">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {d}
                        </div>
                      ))}
                      {cells.map((cell, i) => {
                        const disabled =
                          !cell ||
                          isWeekend(cell) ||
                          zonedInstant(cell, timezone, 0, 0).getTime() < todayStart;
                        const selected = isSameCalendarDay(cell, selectedDate);
                        return (
                          <button
                            type="button"
                            key={i}
                            disabled={!!disabled}
                            onClick={() => {
                              if (!cell) return;
                              setSelectedDate(cell);
                              setSelectedSlot(null);
                            }}
                            className={`aspect-square text-xs font-semibold transition-all cursor-pointer ${
                              selected
                                ? 'bg-[#0282EB] text-white shadow-xs rounded-full'
                                : disabled
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-700 hover:bg-blue-50 hover:text-[#0282EB] rounded-full'
                            }`}
                          >
                            {cell?.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: time slots + details */}
              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0282EB]" />
                    <span>Choose a Time</span>
                  </label>
                  {selectedDate && (
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      {formatDayLong(selectedDate, timezone)}
                    </p>
                  )}
                  {slots.length === 0 ? (
                    <p className="text-xs text-slate-400 py-3">
                      No remaining slots for this day. Pick another date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map(slot => {
                        const active =
                          selectedSlot?.hour === slot.hour && selectedSlot?.minute === slot.minute;
                        return (
                          <button
                            type="button"
                            key={`${slot.hour}:${slot.minute}`}
                            onClick={() => setSelectedSlot({ hour: slot.hour, minute: slot.minute })}
                            className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                              active
                                ? 'bg-[#0282EB] text-white border-[#0282EB] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {formatTime(slot.instant, timezone)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!selectedSlot}
                    className="w-full py-3.5 rounded-xl bg-[#0282EB] hover:bg-[#026fc9] text-white font-semibold text-sm shadow-md hover:shadow-blue-500/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0282EB] disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    <span>Confirm Free Demo Call</span>
                    <Send className="w-4 h-4" />
                  </button>
                  <p className="mt-2 text-[11px] text-slate-400 text-center">
                    {selectedSlot && selectedDate
                      ? `${formatDayLong(selectedDate, timezone)} at ${formatTime(
                          zonedInstant(selectedDate, timezone, selectedSlot.hour, selectedSlot.minute),
                          timezone,
                        )} (${timezone})`
                      : 'Select a date and time slot to continue.'}
                  </p>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default BookDemoModal;