import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Bot,
  Database,
  Cpu,
  GitBranch,
  ArrowRight,
  Zap,
  CheckCircle2,
  Play,
  RotateCcw,
  Copy,
  Check,
  Loader2,
  Terminal,
  Code2,
} from "lucide-react";
import { useRouter } from "../../../context/RouterContext";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type TabId = "agents" | "rag" | "automation" | "workflows";

interface PipelineNode {
  name: string;
  detail: string; // what the stage does (shown when expanded)
  log: string; // line printed in the live run
  ms: number; // stage latency; stages sum to the architecture latency
}

interface Architecture {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  latency: number; // ms
  reliability: number;
  reliabilitySuffix: string;
  reliabilityDecimals: number;
  nodes: PipelineNode[];
  trigger: string; // first line of the live run
  result: string; // last line of the live run
  code: string;
}

const ARCHITECTURES: Architecture[] = [
  {
    id: "agents",
    label: "AI Agents",
    icon: <Bot className="w-4 h-4" />,
    tag: "AUTONOMOUS ORCHESTRATION",
    title: "Multi-Agent Collaborative Swarm",
    description:
      "Self-healing autonomous agents that plan, execute, critique, and optimize complex operational routines with deterministic guardrails.",
    latency: 340,
    reliability: 99.2,
    reliabilitySuffix: "%",
    reliabilityDecimals: 1,
    trigger: "webhook.inbound_order received (order #48213)",
    result: "Order fulfilled. Invoice reconciled, customer notified.",
    nodes: [
      {
        name: "Strategic Planner",
        detail:
          "Breaks the incoming goal into ordered tasks and assigns each one to the right worker agent.",
        log: "Planned 3 tasks: lookup customer, dispatch email, reconcile invoice",
        ms: 60,
      },
      {
        name: "Data Retriever",
        detail:
          "Pulls the context each task needs from your CRM, inbox and billing tools before anything runs.",
        log: "Fetched customer record and open invoice from CRM",
        ms: 90,
      },
      {
        name: "Execution Worker",
        detail:
          "Carries out the tasks. Failed steps retry up to 3 times, and sensitive actions wait for human approval.",
        log: "Sent confirmation email, matched invoice INV-2291 (retries: 0)",
        ms: 130,
      },
      {
        name: "Quality Critic",
        detail:
          "Checks every result against the original goal and your rules, and sends anything doubtful back to the planner.",
        log: "Output verified against guardrails: passed",
        ms: 60,
      },
    ],
    code: `const agentSwarm = new BeezentSwarm({
  orchestrator: 'DeterministicPlanner',
  workers: ['CRMWorker', 'EmailDispatcher', 'InvoiceReconciler'],
  guardrails: { maxExecutionRetries: 3, humanInTheLoop: true }
});
await agentSwarm.run({ trigger: 'webhook.inbound_order' });`,
  },
  {
    id: "rag",
    label: "RAG Systems",
    icon: <Database className="w-4 h-4" />,
    tag: "HYBRID RETRIEVAL",
    title: "Dense & Sparse Vector Retrieval Engine",
    description:
      "Fast semantic search across millions of internal documents, PDFs, tickets, and spreadsheets, with every answer tied to its source.",
    latency: 110,
    reliability: 99.8,
    reliabilitySuffix: "%",
    reliabilityDecimals: 1,
    trigger: 'query received: "Q4 revenue drivers"',
    result: "Answer returned with 5 verified citations.",
    nodes: [
      {
        name: "Chunk Embedder",
        detail:
          "Turns the question into a vector so it can be matched by meaning, not just by keywords.",
        log: "Query embedded (text-embedding-3-large, 3072 dims)",
        ms: 20,
      },
      {
        name: "HNSW Vector Index",
        detail:
          "Finds the closest passages across every indexed document using an approximate nearest-neighbour graph.",
        log: "Retrieved 40 candidate passages from 2.3M chunks",
        ms: 30,
      },
      {
        name: "BM25 Reranker",
        detail:
          "Blends keyword scoring with semantic scoring and keeps only the best matches.",
        log: "Reranked candidates, kept top 5",
        ms: 40,
      },
      {
        name: "Citation Synthesizer",
        detail:
          "Writes the answer from the retrieved passages only, and drops any claim it cannot cite.",
        log: "Answer drafted, 5/5 claims traced to a source",
        ms: 20,
      },
    ],
    code: `const retrievalPipeline = new HybridRAG({
  embeddings: 'text-embedding-3-large',
  reranker: 'CohereRerank-v3',
  topK: 5,
  sourceVerification: 'StrictHallucinationGuard'
});
const response = await retrievalPipeline.query('Q4 revenue drivers');`,
  },
  {
    id: "automation",
    label: "AI Automation",
    icon: <Cpu className="w-4 h-4" />,
    tag: "EVENT-DRIVEN RESILIENCE",
    title: "Zero-Touch Event Processing Mesh",
    description:
      "End-to-end sync between legacy ERPs, modern SaaS APIs, and unstructured email, merged into one audited event stream.",
    latency: 85,
    reliability: 100,
    reliabilitySuffix: "% audited",
    reliabilityDecimals: 0,
    trigger: "event received from Shopify: order.created",
    result: "Order synced to Salesforce and Zendesk. Audit entry written.",
    nodes: [
      {
        name: "Webhook Ingestion",
        detail:
          "Receives events from every connected system and rate-limits traffic to 2,500 events per second.",
        log: "Accepted event shopify/order.created",
        ms: 15,
      },
      {
        name: "Schema Normalizer",
        detail:
          "Converts each source format into one shared schema, so downstream steps never care where data came from.",
        log: "Mapped 14 fields to the unified order schema",
        ms: 20,
      },
      {
        name: "Enrichment Transform",
        detail:
          "Adds missing details such as customer tier or region by looking them up in your other systems.",
        log: "Enriched with customer tier and shipping region",
        ms: 25,
      },
      {
        name: "Sync Dispatcher",
        detail:
          "Writes the result to every target system. Anything that fails goes to a persistent dead-letter queue for replay.",
        log: "Delivered to Salesforce and Zendesk (0 dead-lettered)",
        ms: 25,
      },
    ],
    code: `const pipelineMesh = new EventMesh({
  sources: ['Salesforce', 'Shopify', 'Zendesk'],
  rateLimitTPS: 2500,
  dlq: 'PersistentAuditDeadLetter'
});
pipelineMesh.pipe(autoReconcileOrders);`,
  },
  {
    id: "workflows",
    label: "Intelligent Workflows",
    icon: <GitBranch className="w-4 h-4" />,
    tag: "ADAPTIVE LOGIC",
    title: "Dynamic Decision Graphs",
    description:
      "Routing that changes the workflow path in real time based on sentiment, risk thresholds, and your business rules.",
    latency: 190,
    reliability: 98.9,
    reliabilitySuffix: "%",
    reliabilityDecimals: 1,
    trigger: "new lead received: Northwind Traders",
    result: "Lead routed to the standard autonomous pipeline.",
    nodes: [
      {
        name: "Context Evaluator",
        detail:
          "Reads the lead, its history and the tone of the message to build a complete picture.",
        log: "Context built: positive sentiment, existing customer",
        ms: 40,
      },
      {
        name: "Risk Gatekeeper",
        detail:
          "Scores the lead against your risk thresholds. High scores branch to a human.",
        log: "Risk score 0.18 (threshold 0.60): standard path",
        ms: 50,
      },
      {
        name: "Dynamic Router",
        detail:
          "Chooses the next branch: senior staff for high-risk leads, the autonomous pipeline for the rest.",
        log: "Routed to autonomous pipeline",
        ms: 60,
      },
      {
        name: "Telemetry Logger",
        detail:
          "Records the path taken and why, so every decision can be reviewed later.",
        log: "Decision trace saved (id: dg-77f2)",
        ms: 40,
      },
    ],
    code: `const dynamicGraph = new WorkflowGraph()
  .addNode('evaluateRisk', riskScorer)
  .addBranch('highRisk', routeToSeniorStaff)
  .addBranch('standard', routeToAutonomousPipeline);
await dynamicGraph.execute(incomingLead);`,
  },
];

/** Real stage latencies are tens of milliseconds. Playback is slowed so people can follow it. */
const PLAYBACK_SLOWDOWN = 6;
const STEP_PAUSE_MS = 350;

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */

function useCountUp(target: number, reduced: boolean, duration = 800) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, duration]);

  return value;
}

interface MetricProps {
  label: string;
  target: number;
  decimals?: number;
  suffix?: string;
  valueClass?: string;
  reduced: boolean;
}

const Metric: React.FC<MetricProps> = ({
  label,
  target,
  decimals = 0,
  suffix = "",
  valueClass = "text-[#111827]",
  reduced,
}) => {
  const value = useCountUp(target, reduced);
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
      <div className="text-[11px] font-mono uppercase text-[#0282EB] font-semibold">
        {label}
      </div>
      <div
        className={`text-xl font-bold font-mono mt-1 tabular-nums ${valueClass}`}
      >
        {value.toFixed(decimals)}
        {suffix}
      </div>
    </div>
  );
};

/* Lightweight syntax highlighter (no dependencies) */
const TOKEN_RE =
  /(\/\/.*$|'[^']*'|\b(?:const|await|new|true|false)\b|\b[A-Z][A-Za-z0-9]*\b|\b\d+\b)/g;

function highlightLine(line: string): React.ReactNode[] {
  return line.split(TOKEN_RE).map((part, i) => {
    if (!part) return null;
    let cls = "";
    if (part.startsWith("//")) cls = "text-slate-500 italic";
    else if (part.startsWith("'")) cls = "text-emerald-300";
    else if (/^(const|await|new|true|false)$/.test(part)) cls = "text-sky-400";
    else if (/^[A-Z]/.test(part)) cls = "text-violet-300";
    else if (/^\d+$/.test(part)) cls = "text-amber-300";
    return cls ? (
      <span key={i} className={cls}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

type RunStatus = "idle" | "running" | "done";
type LogKind = "info" | "ok" | "step";

interface LogLine {
  id: number;
  at: number; // ms since the run started (simulated, unslowed)
  kind: LogKind;
  text: string;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export const AILabSection: React.FC = () => {
  const { navigate } = useRouter();
  const reduced = useReducedMotion() ?? false;

  const [activeTab, setActiveTab] = useState<TabId>("agents");
  const [view, setView] = useState<"spec" | "run">("spec");
  const [selectedNode, setSelectedNode] = useState(0);
  const [status, setStatus] = useState<RunStatus>("idle");
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [completed, setCompleted] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [copied, setCopied] = useState(false);

  const timers = useRef<number[]>([]);
  const logId = useRef(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const current =
    ARCHITECTURES.find((a) => a.id === activeTab) ?? ARCHITECTURES[0];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const resetRun = useCallback(() => {
    clearTimers();
    setStatus("idle");
    setActiveNode(null);
    setCompleted(0);
    setLogs([]);
  }, [clearTimers]);

  // Reset everything when switching architecture; clean up on unmount
  useEffect(() => {
    resetRun();
    setSelectedNode(0);
    setView("spec");
    setCopied(false);
  }, [activeTab, resetRun]);

  useEffect(() => clearTimers, [clearTimers]);

  // Keep the terminal pinned to the newest line (scrolls the box, not the page)
  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  const pushLog = useCallback((at: number, kind: LogKind, text: string) => {
    logId.current += 1;
    const id = logId.current;
    setLogs((prev) => [...prev, { id, at, kind, text }]);
  }, []);

  const runSimulation = useCallback(() => {
    const arch = current;
    resetRun();
    setView("run");
    setStatus("running");
    pushLog(0, "info", arch.trigger);

    let elapsed = 0;

    const step = (i: number) => {
      if (i >= arch.nodes.length) {
        setActiveNode(null);
        setCompleted(arch.nodes.length);
        setStatus("done");
        pushLog(elapsed, "ok", arch.result);
        return;
      }
      const node = arch.nodes[i];
      setActiveNode(i);
      setSelectedNode(i);
      setCompleted(i);
      pushLog(elapsed, "step", `${node.name}: ${node.log}`);
      elapsed += node.ms;

      const wait = reduced ? 250 : node.ms * PLAYBACK_SLOWDOWN + STEP_PAUSE_MS;
      timers.current.push(window.setTimeout(() => step(i + 1), wait));
    };

    timers.current.push(window.setTimeout(() => step(0), reduced ? 100 : 500));
  }, [current, pushLog, reduced, resetRun]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      timers.current.push(window.setTimeout(() => setCopied(false), 1800));
    } catch {
      setCopied(false);
    }
  };

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = ARCHITECTURES.length - 1;
    let next = index;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    const target = ARCHITECTURES[next];
    setActiveTab(target.id);
    tabRefs.current[target.id]?.focus();
  };

  const progress =
    status === "done" ? 100 : (completed / current.nodes.length) * 100;
  const codeLines = current.code.split("\n");
  const fade = reduced ? { duration: 0 } : { duration: 0.25 };

  return (
    <section
      id="ai-lab"
      className="scroll-mt-16 py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden"
    >
      {/* Subtle dot grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs sm:text-[13px] font-bold font-mono uppercase tracking-widest text-[#0282EB]">
            AI LAB
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-tight leading-tight uppercase font-orbitron">
            EXPLORE EXPERIMENTAL AI ARCHITECTURES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#1F2937] font-normal leading-relaxed">
            We continuously test and deploy next-generation AI architectures to
            keep our clients ahead of the curve. Pick one, inspect its stages,
            then run it.
          </p>
        </div>

        {/* Architecture selector */}
        <div
          role="tablist"
          aria-label="AI architectures"
          className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-100 pb-4"
        >
          {ARCHITECTURES.map((tab, index) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                role="tab"
                id={`ailab-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="ailab-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB] ${
                  selected
                    ? "text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#0282EB]"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="ailab-tab-pill"
                    className="absolute inset-0 rounded-xl bg-[#0282EB] shadow-md shadow-blue-500/20"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Showcase */}
        <div
          id="ailab-panel"
          role="tabpanel"
          aria-labelledby={`ailab-tab-${activeTab}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: details + interactive pipeline */}
          <div className="lg:col-span-6 bg-slate-50/70 backdrop-blur-sm rounded-3xl p-7 sm:p-9 border border-slate-200 flex flex-col justify-between">
            <div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={fade}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-[11px] font-mono font-bold text-[#0282EB] uppercase tracking-wider mb-4">
                    <Zap className="w-3.5 h-3.5" />
                    {current.tag}
                  </div>

                  <h3 className="text-2xl font-bold text-[#111827] tracking-tight mb-3 font-display">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed mb-6">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-7">
                <Metric
                  key={`lat-${current.id}`}
                  label="Pipeline Latency"
                  target={current.latency}
                  suffix="ms avg"
                  reduced={reduced}
                />
                <Metric
                  key={`rel-${current.id}`}
                  label="Execution Reliability"
                  target={current.reliability}
                  decimals={current.reliabilityDecimals}
                  suffix={current.reliabilitySuffix}
                  valueClass="text-emerald-600"
                  reduced={reduced}
                />
              </div>

              {/* Pipeline stepper */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono uppercase text-[#0282EB] font-semibold">
                  Orchestration Nodes
                </div>
                <div className="text-[11px] text-slate-500">
                  Select a node to see what it does
                </div>
              </div>

              <ol className="relative">
                {current.nodes.map((node, i) => {
                  const isActive = activeNode === i;
                  const isDone = i < completed;
                  const isSelected = selectedNode === i;
                  const isLast = i === current.nodes.length - 1;

                  return (
                    <li
                      key={`${current.id}-${node.name}`}
                      className="relative pl-12 pb-3 last:pb-0"
                    >
                      {/* Connector */}
                      {!isLast && (
                        <>
                          <span
                            aria-hidden="true"
                            className="absolute left-[15px] top-9 -bottom-0.5 w-0.5 bg-slate-200 rounded"
                          />
                          <motion.span
                            aria-hidden="true"
                            className="absolute left-[15px] top-9 -bottom-0.5 w-0.5 bg-[#0282EB] rounded origin-top"
                            initial={false}
                            animate={{ scaleY: isDone ? 1 : 0 }}
                            transition={
                              reduced
                                ? { duration: 0 }
                                : { duration: 0.35, ease: "easeOut" }
                            }
                          />
                        </>
                      )}

                      {/* Marker */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-colors duration-300 ${
                          isDone
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : isActive
                              ? "bg-[#0282EB] border-[#0282EB] text-white"
                              : isSelected
                                ? "bg-white border-[#0282EB] text-[#0282EB]"
                                : "bg-white border-slate-300 text-slate-500"
                        }`}
                      >
                        {isActive && !reduced && (
                          <span className="absolute inset-0 rounded-full bg-[#0282EB] opacity-40 animate-ping" />
                        )}
                        <span className="relative">
                          {isDone ? <Check className="w-4 h-4" /> : i + 1}
                        </span>
                      </span>

                      {/* Node card */}
                      <button
                        type="button"
                        onClick={() => setSelectedNode(i)}
                        aria-expanded={isSelected}
                        className={`w-full text-left rounded-xl border px-4 py-3 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0282EB] ${
                          isActive
                            ? "bg-blue-50 border-[#0282EB] shadow-sm shadow-blue-500/10"
                            : isSelected
                              ? "bg-white border-[#0282EB]/60"
                              : "bg-white border-slate-200/80 hover:border-[#0282EB]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-[#111827]">
                            {node.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                            {node.ms}ms
                          </span>
                        </div>

                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.p
                              key="detail"
                              initial={
                                reduced ? false : { height: 0, opacity: 0 }
                              }
                              animate={{ height: "auto", opacity: 1 }}
                              exit={
                                reduced
                                  ? { opacity: 0 }
                                  : { height: 0, opacity: 0 }
                              }
                              transition={fade}
                              className="overflow-hidden text-[13px] leading-relaxed text-slate-600"
                            >
                              <span className="block pt-2">{node.detail}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0282EB] hover:text-[#026fc9] group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0282EB] rounded"
              >
                <span>Deploy this architecture</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right: spec + live run terminal */}
          <div className="lg:col-span-6 bg-[#0B0F19] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl flex flex-col overflow-hidden min-h-[460px]">
            {/* Window chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-400 ml-2 truncate">
                  {activeTab}_architecture_spec.ts
                </span>
              </div>

              {/* View switch */}
              <div
                role="group"
                aria-label="Terminal view"
                className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5"
              >
                {(
                  [
                    {
                      id: "spec",
                      label: "Spec",
                      icon: <Code2 className="w-3.5 h-3.5" />,
                    },
                    {
                      id: "run",
                      label: "Live run",
                      icon: <Terminal className="w-3.5 h-3.5" />,
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={view === opt.id}
                    onClick={() => setView(opt.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0282EB] ${
                      view === opt.id
                        ? "bg-slate-700 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 flex flex-col">
              <AnimatePresence mode="wait" initial={false}>
                {view === "spec" ? (
                  <motion.div
                    key={`spec-${current.id}`}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fade}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                        SANDBOX READY
                      </span>
                      <button
                        type="button"
                        onClick={copyCode}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer rounded px-2 py-1 focus-visible:outline-2 focus-visible:outline-[#0282EB]"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy code
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="font-mono text-xs sm:text-[13px] text-slate-300 overflow-x-auto p-2 leading-relaxed">
                      <code>
                        {codeLines.map((line, i) => (
                          <div key={i} className="flex">
                            <span
                              aria-hidden="true"
                              className="select-none w-6 shrink-0 text-right pr-3 text-slate-600"
                            >
                              {i + 1}
                            </span>
                            <span className="whitespace-pre">
                              {highlightLine(line)}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>

                    <div className="mt-auto pt-6">
                      <button
                        type="button"
                        onClick={runSimulation}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0282EB] hover:bg-[#026fc9] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <Play className="w-4 h-4" />
                        Run this architecture
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`run-${current.id}`}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fade}
                    className="flex-1 flex flex-col"
                  >
                    {/* Run controls + progress */}
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        type="button"
                        onClick={runSimulation}
                        disabled={status === "running"}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0282EB] hover:bg-[#026fc9] disabled:bg-slate-700 disabled:text-slate-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {status === "running" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Running
                          </>
                        ) : status === "done" ? (
                          <>
                            <RotateCcw className="w-4 h-4" />
                            Run again
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Run simulation
                          </>
                        )}
                      </button>

                      <div
                        className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden"
                        role="progressbar"
                        aria-label="Simulation progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(progress)}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#0282EB] to-emerald-400"
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { duration: 0.4, ease: "easeOut" }
                          }
                        />
                      </div>
                    </div>

                    {/* Log output */}
                    <div
                      ref={terminalRef}
                      aria-live="polite"
                      className="flex-1 min-h-[240px] max-h-[320px] overflow-y-auto rounded-xl bg-black/40 border border-slate-800 p-4 font-mono text-xs leading-relaxed"
                    >
                      {logs.length === 0 ? (
                        <p className="text-slate-500">
                          No run yet. Press &ldquo;Run simulation&rdquo; to
                          watch a sample request move through each node.
                        </p>
                      ) : (
                        <ul className="space-y-1.5">
                          {logs.map((line) => (
                            <motion.li
                              key={line.id}
                              initial={reduced ? false : { opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex gap-3"
                            >
                              <span className="text-slate-600 shrink-0 tabular-nums w-14 text-right">
                                +{line.at}ms
                              </span>
                              <span
                                className={
                                  line.kind === "ok"
                                    ? "text-emerald-400"
                                    : line.kind === "step"
                                      ? "text-slate-200"
                                      : "text-sky-400"
                                }
                              >
                                {line.kind === "ok" && "✓ "}
                                {line.text}
                              </span>
                            </motion.li>
                          ))}
                          {status === "running" && (
                            <li className="flex gap-3 text-slate-500">
                              <span className="w-14" />
                              <span className={reduced ? "" : "animate-pulse"}>
                                ▍
                              </span>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>

                    <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                      Sample data for illustration. Playback is slowed down so
                      you can follow each stage; timestamps show the typical
                      real latency.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Validated against Beezent Core v3.4
              </span>
              <span className="text-slate-500">TypeScript 5.x</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILabSection;
