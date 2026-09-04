import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Workflow,
  Search,
  ArrowRight,
  ArrowUpRight,
  Send,
  Calendar,
  CheckCircle2,
  Sparkles,
  Bot,
  Cpu
} from 'lucide-react';
import { BeezentLogo } from '../../shared/BeezentLogo';

export const BeeSolutions: React.FC = () => {
  // Live Chat Simulator State
  const [messages, setMessages] = useState<Array<{ sender: 'bee' | 'user'; text: string; time?: string }>>([
    {
      sender: 'bee',
      text: "Hi! I'm your business AI Bee. I can check service pricing, qualify requirements, or book a meeting directly onto the calendar.",
      time: 'Just now',
    },
    {
      sender: 'user',
      text: 'Can you book me in for a workflow demo this Thursday?',
      time: '1m ago',
    },
    {
      sender: 'bee',
      text: 'Certainly! I have open demo slots this Thursday at 10:30 AM and 2:00 PM EST. Which works best?',
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text, time: 'Just now' }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Dynamic response from the Bee
    setTimeout(() => {
      let reply = "I've locked that into our calendar and sent the invite with prep notes straight to your inbox!";
      const lower = text.toLowerCase();
      if (lower.includes('pricing') || lower.includes('cost')) {
        reply = "Our Starter Bee starts at $1,499 setup, and Growth is $3,499 for full multi-channel integration. Would you like me to book a tailored walkthrough?";
      } else if (lower.includes('tools') || lower.includes('crm') || lower.includes('integrate')) {
        reply = "We connect natively with HubSpot, Salesforce, Slack, Gmail, Google Calendar, Notion, Stripe, and custom Webhooks!";
      } else if (lower.includes('thursday') || lower.includes('10:30') || lower.includes('2:00') || lower.includes('time') || lower.includes('book')) {
        reply = "Confirmed! I have locked in Thursday at 10:30 AM EST. A calendar invitation with Zoom details has been dispatched.";
      }

      setMessages(prev => [...prev, { sender: 'bee', text: reply, time: 'Just now' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#EDF0F4] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Hero UI Orbitron and Indexing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-extrabold text-[#2469E5] tracking-widest font-mono"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', monospace" }}
              >
                03.
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                SYSTEM CAPABILITIES // AUTONOMOUS AGENTS
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              SPECIALIZED AI BEES BUILT FOR ACTION.
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            Every AI Bee is custom engineered around your operational architecture — these are the foundational modules deployed to your stack.
          </p>
        </div>

        {/* Top 2-Column Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Card: Discovery & Bee Design */}
          <div className="lg:col-span-6 rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2469E5] shadow-2xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                      style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                    >
                      DISCOVERY & ARCHITECTURE
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      SPEC // DETERMINISTIC DESIGN
                    </div>
                  </div>
                </div>

                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-blue-50 text-[#2469E5] border border-blue-200/70 text-[11px] font-mono font-semibold">
                  RAPID ONBOARDING
                </span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                We map how customers interact with your brand, isolate where operational latency accumulates, and design the exact rule engines, conversations, and tool triggers your business requires.
              </p>
            </div>

            {/* Visual Workflow Diagram in Hero UI Style */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
                <span>EXECUTION PIPELINE</span>
                <span className="text-[#2469E5]">VERIFIED</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 items-center text-center">
                <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
                  <div className="text-xs font-extrabold text-slate-900 font-mono">INTAKE</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium">Customer Trigger</div>
                </div>
                <div className="flex flex-col items-center justify-center text-[#2469E5] group cursor-pointer" title="AI Bee Automated Router">
                  <BeezentLogo variant="mark" size="sm" />
                  <span className="text-[10px] font-mono font-bold uppercase mt-1 tracking-wider text-[#2469E5]">AI BEE</span>
                </div>
                <div className="bg-blue-50/80 border border-blue-200 p-3.5 rounded-xl">
                  <div className="text-xs font-extrabold text-[#2469E5] font-mono">OUTCOME</div>
                  <div className="text-[11px] text-slate-600 mt-1 font-medium">Automated Action</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Interactive Live Simulator "Meet Your AI Bee" - Hero Charcoal Styling */}
          <div className="lg:col-span-6 rounded-3xl lg:rounded-[32px] bg-[#1B1F27] text-white border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Watermark typography in Hero UI style */}
            <div
              className="absolute -right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[70px] font-black text-white/[0.03] tracking-widest rotate-90"
              style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
            >
              SIMULATION
            </div>

            {/* Header of Chat Simulator */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-700/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2469E5]/20 border border-[#2469E5]/40 flex items-center justify-center">
                  <BeezentLogo variant="white" size="sm" />
                </div>
                <div>
                  <div
                    className="text-sm font-bold text-white flex items-center gap-2"
                    style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
                  >
                    <span>MEET YOUR AI BEE</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">LATENCY &lt; 850MS // LIVE PREVIEW</div>
                </div>
              </div>

              <div className="text-[11px] font-mono font-semibold text-[#38BDF8] bg-[#2469E5]/20 px-2.5 py-1 rounded-full border border-[#2469E5]/40">
                24/7 AUTOPILOT
              </div>
            </div>

            {/* Chat message bubbles */}
            <div className="relative z-10 my-6 space-y-3.5 max-h-[260px] overflow-y-auto pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#2469E5] text-white rounded-br-xs shadow-md'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-300 rounded-2xl px-4 py-2 text-xs flex items-center gap-1.5 border border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="relative z-10 flex flex-wrap gap-2 mb-3">
              {['What is the pricing?', 'Which tools connect?', 'Confirm Thursday 10:30 AM'].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] font-mono font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar with Inset Square Arrow Button */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="relative z-10 relative flex items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask about pricing, setup, or integrations..."
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm rounded-full pl-4 pr-12 py-3 border border-slate-700 focus:outline-hidden focus:border-[#2469E5] font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-1.5 w-8 h-8 rounded-full bg-[#2469E5] hover:bg-[#1b58ca] disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom 3-Column Feature Cards in Hero UI Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 hover:border-[#2469E5]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2469E5] shadow-2xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  [MOD_01]
                </span>
              </div>
              <h4
                className="text-lg sm:text-xl font-black text-slate-900 mb-2.5 tracking-tight"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                LEAD CAPTURE & BOOKING
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Qualifies every inbound inquiry, answers high-intent questions instantly, and books meetings directly on team calendars.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>CHANNEL // WEB & EMAIL</span>
              <span className="text-emerald-500 font-bold">24/7 ACTIVE</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 hover:border-[#2469E5]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2469E5] shadow-2xs">
                  <Workflow className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  [MOD_02]
                </span>
              </div>
              <h4
                className="text-lg sm:text-xl font-black text-slate-900 mb-2.5 tracking-tight"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                CRM & WORKFLOW AUTOMATION
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Synchronizes customer data bi-directionally across your stack, triggering pipeline stages and administrative tasks automatically.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>SYNC // REAL-TIME WEBHOOKS</span>
              <span className="text-emerald-500 font-bold">ZERO LAG</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl lg:rounded-[32px] bg-white border border-slate-200/90 hover:border-[#2469E5]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2469E5] shadow-2xs">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  [MOD_03]
                </span>
              </div>
              <h4
                className="text-lg sm:text-xl font-black text-slate-900 mb-2.5 tracking-tight"
                style={{ fontFamily: "'Orbitron', 'Chakra Petch', sans-serif" }}
              >
                GROUNDED KNOWLEDGE AGENT
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Answers intricate operational and product queries strictly grounded in your proprietary documentation and validated business rules.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>INDEX // VECTOR EMBEDDINGS</span>
              <span className="text-emerald-500 font-bold">100% ACCURATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeeSolutions;
