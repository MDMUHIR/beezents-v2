import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Database, Cpu, GitBranch, ArrowRight, Zap, CheckCircle2, Terminal } from 'lucide-react';
import { useRouter } from '../../../context/RouterContext';

export const AILabSection: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'agents' | 'rag' | 'automation' | 'workflows'>('agents');

  const architectures = [
    {
      id: 'agents' as const,
      label: 'AI Agents',
      icon: <Bot className="w-4 h-4" />,
      tag: 'AUTONOMOUS ORCHESTRATION',
      title: 'Multi-Agent Collaborative Swarm',
      description:
        'Self-healing autonomous agents that plan, execute, critique, and optimize complex operational routines with deterministic guardrails.',
      latency: '340ms avg',
      accuracy: '99.2%',
      nodes: ['Strategic Planner', 'Data Retriever', 'Execution Worker', 'Quality Critic'],
      code: `const agentSwarm = new BeezentSwarm({
  orchestrator: 'DeterministicPlanner',
  workers: ['CRMWorker', 'EmailDispatcher', 'InvoiceReconciler'],
  guardrails: { maxExecutionRetries: 3, humanInTheLoop: true }
});
await agentSwarm.run({ trigger: 'webhook.inbound_order' });`,
    },
    {
      id: 'rag' as const,
      label: 'RAG Systems',
      icon: <Database className="w-4 h-4" />,
      tag: 'HYBRID RETRIEVAL',
      title: 'Dense & Sparse Vector Retrieval Engine',
      description:
        'Sub-millisecond semantic search across millions of fragmented internal enterprise documents, PDFs, tickets, and spreadsheets with zero hallucinations.',
      latency: '110ms avg',
      accuracy: '99.8%',
      nodes: ['Chunk Embedder', 'HNSW Vector Index', 'BM25 Reranker', 'Citation Synthesizer'],
      code: `const retrievalPipeline = new HybridRAG({
  embeddings: 'text-embedding-3-large',
  reranker: 'CohereRerank-v3',
  topK: 5,
  sourceVerification: 'StrictHallucinationGuard'
});
const response = await retrievalPipeline.query('Q4 revenue drivers');`,
    },
    {
      id: 'automation' as const,
      label: 'AI Automation',
      icon: <Cpu className="w-4 h-4" />,
      tag: 'EVENT-DRIVEN RESILIENCE',
      title: 'Zero-Touch Event Processing Mesh',
      description:
        'End-to-end synchronization connecting legacy ERPs, modern SaaS APIs, and unformatted email inputs into unified, audited event streams.',
      latency: '85ms avg',
      accuracy: '100% audited',
      nodes: ['Webhook Ingestion', 'Schema Normalizer', 'Enrichment Transform', 'Sync Dispatcher'],
      code: `const pipelineMesh = new EventMesh({
  sources: ['Salesforce', 'Shopify', 'Zendesk'],
  rateLimitTPS: 2500,
  dlq: 'PersistentAuditDeadLetter'
});
pipelineMesh.pipe(autoReconcileOrders);`,
    },
    {
      id: 'workflows' as const,
      label: 'Intelligent Workflows',
      icon: <GitBranch className="w-4 h-4" />,
      tag: 'ADAPTIVE LOGIC',
      title: 'Dynamic Decision Graphs',
      description:
        'Conditional routing engines that dynamically adapt workflow branches based on real-time sentiment, risk thresholds, and business rules.',
      latency: '190ms avg',
      accuracy: '98.9%',
      nodes: ['Context Evaluator', 'Risk Gatekeeper', 'Dynamic Router', 'Telemetry Logger'],
      code: `const dynamicGraph = new WorkflowGraph()
  .addNode('evaluateRisk', riskScorer)
  .addBranch('highRisk', routeToSeniorStaff)
  .addBranch('standard', routeToAutonomousPipeline);
await dynamicGraph.execute(incomingLead);`,
    },
  ];

  const current = architectures.find(a => a.id === activeTab) || architectures[0];

  return (
    <section id="ai-lab" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs sm:text-[13px] font-bold font-mono uppercase tracking-widest text-[#0282EB]">
            AI LAB
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-tight leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif" }}
          >
            EXPLORE EXPERIMENTAL AI ARCHITECTURES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#1F2937] font-normal leading-relaxed">
            We continuously test and deploy next-generation AI architectures to keep our clients ahead of the curve.
          </p>
        </div>

        {/* Interactive Architecture Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-100 pb-4">
          {architectures.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0282EB] text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#0282EB]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Showcase Panel with Visual Diagram & Live Architecture Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Architecture Details & Pipeline Nodes */}
          <div className="lg:col-span-6 bg-slate-50/60 rounded-3xl p-7 sm:p-9 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-[11px] font-mono font-bold text-[#0282EB] uppercase tracking-wider mb-4">
                <Zap className="w-3.5 h-3.5" />
                {current.tag}
              </div>

              <h3
                className="text-2xl font-bold text-[#111827] tracking-tight mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Metrics Badge Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-[11px] font-mono uppercase text-[#0282EB] font-semibold">Pipeline Latency</div>
                  <div className="text-xl font-bold font-mono text-[#111827] mt-1">{current.latency}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-[11px] font-mono uppercase text-[#0282EB] font-semibold">Execution Reliability</div>
                  <div className="text-xl font-bold font-mono text-emerald-600 mt-1">{current.accuracy}</div>
                </div>
              </div>

              {/* Sequential Nodes */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-[#0282EB] font-semibold mb-2">Orchestration Nodes</div>
                <div className="grid grid-cols-2 gap-2">
                  {current.nodes.map((node, i) => (
                    <div
                      key={node}
                      className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200/80 text-xs font-medium text-[#1F2937]"
                    >
                      <span className="w-4 h-4 rounded-full bg-blue-50 text-[#0282EB] flex items-center justify-center font-mono text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <span className="truncate">{node}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0282EB] hover:text-[#026fc9] group cursor-pointer"
              >
                <span>Deploy this architecture</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right: Futuristic Code & Execution Terminal */}
          <div className="lg:col-span-6 bg-[#0B0F19] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {activeTab}_architecture_spec.ts
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  SANDBOX READY
                </span>
              </div>

              <pre className="font-mono text-xs text-slate-300 overflow-x-auto p-2 leading-relaxed">
                <code>{current.code}</code>
              </pre>
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
