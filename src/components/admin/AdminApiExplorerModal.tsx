import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  Layers,
  Server,
  KeyRound,
  Shield,
  Send,
  X,
  Database,
  ExternalLink,
  Code
} from 'lucide-react';

interface EndpointDef {
  id: string;
  category: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  name: string;
  description: string;
  defaultPayload?: any;
  defaultParams?: Record<string, string>;
}

const ENDPOINTS: EndpointDef[] = [
  // health
  {
    id: 'health-v1',
    category: 'health',
    method: 'GET',
    path: '/api/v1/health',
    name: 'Health',
    description: 'General API health verification',
  },
  {
    id: 'health-db',
    category: 'health',
    method: 'GET',
    path: '/api/v1/health/db',
    name: 'Db Health',
    description: 'PostgreSQL database connectivity status check',
  },
  {
    id: 'health-root',
    category: 'health',
    method: 'GET',
    path: '/health',
    name: 'Root Health',
    description: 'Top-level application root liveness probe',
  },

  // auth
  {
    id: 'auth-register',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/register',
    name: 'Register',
    description: 'Register a user account; new accounts always receive the user role',
    defaultPayload: {
      email: 'user@example.com',
      password: 'strongpass123',
      full_name: 'Jane Doe',
    },
  },
  {
    id: 'auth-login',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/login',
    name: 'Login',
    description: 'Authenticate with email and password; the server sets an HTTP-only session cookie',
    defaultPayload: {
      email: 'MBadmin@beezents.com',
      password: 'Bee@MB',
    },
  },
  {
    id: 'auth-logout',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/logout',
    name: 'Logout',
    description: 'Invalidate current session and revoke tokens',
  },
  {
    id: 'auth-me',
    category: 'auth',
    method: 'GET',
    path: '/api/v1/auth/me',
    name: 'Me',
    description: 'Retrieve current authenticated user context',
  },

  // development
  {
    id: 'dev-staff',
    category: 'development',
    method: 'GET',
    path: '/api/v1/dev/staff',
    name: 'Staff Only',
    description: 'Staff-restricted diagnostic route for permission checking',
  },
  {
    id: 'dev-admin',
    category: 'development',
    method: 'GET',
    path: '/api/v1/dev/admin',
    name: 'Admin Only',
    description: 'Super Admin diagnostic route for elevated permission check',
  },

  // projects
  {
    id: 'projects-list',
    category: 'projects',
    method: 'GET',
    path: '/api/v1/projects',
    name: 'List Projects',
    description: 'Public list of active portfolio projects and deployments',
  },
  {
    id: 'projects-slug',
    category: 'projects',
    method: 'GET',
    path: '/api/v1/projects/{slug}',
    name: 'Get Project',
    description: 'Fetch single public project by slug identifier',
    defaultParams: { slug: 'aegis-core-orchestration' },
  },

  // case-studies
  {
    id: 'case-studies-list',
    category: 'case-studies',
    method: 'GET',
    path: '/api/v1/case-studies',
    name: 'List Case Studies',
    description: 'Public list of published enterprise case studies',
  },
  {
    id: 'case-studies-slug',
    category: 'case-studies',
    method: 'GET',
    path: '/api/v1/case-studies/{slug}',
    name: 'Get Case Study',
    description: 'Fetch detailed case study architectural breakdown by slug',
    defaultParams: { slug: 'apex-global-logistics-multi-agent-system' },
  },

  // services
  {
    id: 'services-list',
    category: 'services',
    method: 'GET',
    path: '/api/v1/services',
    name: 'List Services',
    description: 'Public list of service tiers and capabilities',
  },
  {
    id: 'services-slug',
    category: 'services',
    method: 'GET',
    path: '/api/v1/services/{slug}',
    name: 'Get Service',
    description: 'Fetch single service detail specifications by slug',
    defaultParams: { slug: 'ai-agents-systems' },
  },

  // solutions
  {
    id: 'solutions-list',
    category: 'solutions',
    method: 'GET',
    path: '/api/v1/solutions',
    name: 'List Solutions',
    description: 'Public list of tailored industry solutions',
  },
  {
    id: 'solutions-slug',
    category: 'solutions',
    method: 'GET',
    path: '/api/v1/solutions/{slug}',
    name: 'Get Solution',
    description: 'Fetch specific industry solution blueprint by slug',
    defaultParams: { slug: 'intelligent-support-ops' },
  },

  // leads
  {
    id: 'leads-create',
    category: 'leads',
    method: 'POST',
    path: '/api/v1/leads',
    name: 'Create Lead',
    description: 'Ingest new enterprise client inquiry or contact lead',
    defaultPayload: {
      name: 'Sarah Jenkins',
      email: 's.jenkins@meridian-capital.io',
      company: 'Meridian Capital Partners',
      phone: '+1 (555) 234-8901',
       service: 'AI Agents',
       source: 'website',
      message: 'Looking to deploy deterministic multi-agent pipeline for autonomous financial audit review.',
    },
  },

  // admin-projects
  {
    id: 'admin-projects-list',
    category: 'admin-projects',
    method: 'GET',
    path: '/api/v1/admin/projects',
    name: 'List Projects',
    description: 'Admin list of all portfolio projects (including drafts)',
  },
  {
    id: 'admin-projects-create',
    category: 'admin-projects',
    method: 'POST',
    path: '/api/v1/admin/projects',
    name: 'Create Project',
    description: 'Create new project record via admin CMS',
    defaultPayload: {
      title: 'Neural Risk Sentinel',
      slug: 'neural-risk-sentinel',
      shortDescription: 'Autonomous anomaly detection for high-frequency trading streams.',
      fullDescription: 'Real-time multi-agent oversight detecting microsecond deviations across liquidity clusters.',
      projectType: 'AI Solutions',
      industry: 'Quantitative Finance',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      technologies: ['FastAPI', 'PyTorch', 'Rust', 'Kafka'],
      servicesUsed: ['AI Agents & Systems', 'AI Automation Engineering'],
      completionDate: 'Q3 2026',
      status: 'PUBLISHED',
      featured: true,
      sortOrder: 1,
      overview: 'High-throughput monitoring system.',
      challenge: 'High latency and noisy false positives in traditional heuristic scanners.',
      solution: 'Decoupled agent pipeline streaming directly through low-latency message buses.',
      implementation: 'Deployed across bare-metal GPU clusters with sub-millisecond response guarantees.',
      results: ['99.98% anomaly capture precision', '74% reduction in false-positive alerting'],
    },
  },
  {
    id: 'admin-projects-get',
    category: 'admin-projects',
    method: 'GET',
    path: '/api/v1/admin/projects/{project_id}',
    name: 'Get Project',
    description: 'Retrieve project by internal ID for editing',
    defaultParams: { project_id: 'prj-1' },
  },
  {
    id: 'admin-projects-patch',
    category: 'admin-projects',
    method: 'PATCH',
    path: '/api/v1/admin/projects/{project_id}',
    name: 'Update Project',
    description: 'Partially update project attributes',
    defaultParams: { project_id: 'prj-1' },
    defaultPayload: { featured: true, status: 'PUBLISHED' },
  },
  {
    id: 'admin-projects-delete',
    category: 'admin-projects',
    method: 'DELETE',
    path: '/api/v1/admin/projects/{project_id}',
    name: 'Delete Project',
    description: 'Permanently remove project from CMS',
    defaultParams: { project_id: 'prj-test' },
  },

  // admin-services
  {
    id: 'admin-services-list',
    category: 'admin-services',
    method: 'GET',
    path: '/api/v1/admin/services',
    name: 'List Services',
    description: 'Admin list of all service packages and pricing tiers',
  },
  {
    id: 'admin-services-create',
    category: 'admin-services',
    method: 'POST',
    path: '/api/v1/admin/services',
    name: 'Create Service',
    description: 'Create new agency service offering',
    defaultPayload: {
      title: 'Autonomous Multi-Agent Architecture',
      slug: 'autonomous-multi-agent-architecture',
      shortDescription: 'Self-healing, goal-driven agents with deterministic validation.',
      fullDescription: 'Comprehensive systems engineering for enterprise orchestration DAGs.',
      icon: 'Cpu',
      features: ['Hierarchical State Machine', 'Semantic Memory Buffers', 'Deterministic Tool Handlers'],
      benefits: ['Zero-prompt hallucination drift', 'Linear operational scale'],
      technologies: ['LangGraph', 'Python', 'FastAPI', 'PostgreSQL'],
      process: [
        { step: 1, title: 'Workflow Decomposition', description: 'Analyze business processes.' },
        { step: 2, title: 'Agent Graph Synthesis', description: 'Design deterministic DAG topology.' }
      ],
      status: 'PUBLISHED',
      sortOrder: 1,
    },
  },
  {
    id: 'admin-services-get',
    category: 'admin-services',
    method: 'GET',
    path: '/api/v1/admin/services/{service_id}',
    name: 'Get Service',
    description: 'Retrieve service details by ID',
    defaultParams: { service_id: 'srv-1' },
  },
  {
    id: 'admin-services-patch',
    category: 'admin-services',
    method: 'PATCH',
    path: '/api/v1/admin/services/{service_id}',
    name: 'Update Service',
    description: 'Update service parameters',
    defaultParams: { service_id: 'srv-1' },
    defaultPayload: { sortOrder: 1 },
  },
  {
    id: 'admin-services-delete',
    category: 'admin-services',
    method: 'DELETE',
    path: '/api/v1/admin/services/{service_id}',
    name: 'Delete Service',
    description: 'Delete service tier from catalog',
    defaultParams: { service_id: 'srv-test' },
  },

  // admin-solutions
  {
    id: 'admin-solutions-list',
    category: 'admin-solutions',
    method: 'GET',
    path: '/api/v1/admin/solutions',
    name: 'List Solutions',
    description: 'Admin list of industry solution blueprints',
  },
  {
    id: 'admin-solutions-create',
    category: 'admin-solutions',
    method: 'POST',
    path: '/api/v1/admin/solutions',
    name: 'Create Solution',
    description: 'Publish new enterprise solution architecture',
    defaultPayload: {
      title: 'Automated Invoice Reconciliation Mesh',
      slug: 'automated-invoice-reconciliation-mesh',
      category: 'Fintech Operations',
      shortDescription: 'Multi-modal optical extraction matched against ERP ledger entries.',
      description: 'End-to-end autonomous accounts payable reconciliation with ERP validation.',
      businessProblem: 'Manual three-way matching consumes 120+ operational hours weekly.',
      solution: 'Vision-grounded agents extract line items and verify purchase order discrepancies.',
      features: ['Multi-currency OCR', 'ERP Webhook Sync', 'Discrepancy Escalation'],
      benefits: ['94% auto-approval rate', 'Same-day vendor clearing'],
      workflow: [{ step: 1, title: 'Document Ingestion', description: 'Secure PDF parsing via OCR.' }],
      integrations: ['NetSuite', 'SAP', 'QuickBooks Enterprise'],
      technologies: ['Gemini Flash', 'FastAPI', 'PostgreSQL'],
      status: 'PUBLISHED',
      featured: true,
    },
  },
  {
    id: 'admin-solutions-get',
    category: 'admin-solutions',
    method: 'GET',
    path: '/api/v1/admin/solutions/{solution_id}',
    name: 'Get Solution',
    description: 'Retrieve solution by ID',
    defaultParams: { solution_id: 'sol-1' },
  },
  {
    id: 'admin-solutions-patch',
    category: 'admin-solutions',
    method: 'PATCH',
    path: '/api/v1/admin/solutions/{solution_id}',
    name: 'Update Solution',
    description: 'Update solution details',
    defaultParams: { solution_id: 'sol-1' },
    defaultPayload: { featured: true },
  },
  {
    id: 'admin-solutions-delete',
    category: 'admin-solutions',
    method: 'DELETE',
    path: '/api/v1/admin/solutions/{solution_id}',
    name: 'Delete Solution',
    description: 'Delete solution blueprint',
    defaultParams: { solution_id: 'sol-test' },
  },

  // admin-case-studies
  {
    id: 'admin-case-studies-list',
    category: 'admin-case-studies',
    method: 'GET',
    path: '/api/v1/admin/case-studies',
    name: 'List Case Studies',
    description: 'Admin list of case studies with metrics',
  },
  {
    id: 'admin-case-studies-create',
    category: 'admin-case-studies',
    method: 'POST',
    path: '/api/v1/admin/case-studies',
    name: 'Create Case Study',
    description: 'Draft or publish new client transformation case study',
    defaultPayload: {
      title: 'Scaling Real-Time Risk Verification for Apex Global',
      slug: 'scaling-real-time-risk-verification-apex-global',
      client: 'Apex Global Logistics',
      industry: 'Supply Chain & Logistics',
      summary: 'Autonomous validation agent mesh auditing 45,000 daily customs waybills.',
      challenge: 'High volume of international regulatory updates resulting in clearance bottlenecks.',
      objectives: ['Reduce clearance audit time under 60 seconds', 'Zero non-compliance violations'],
      solution: 'Custom DAG agent architecture validating harmonized tariff codes with real-time audit trail.',
      architectureDescription: 'High-concurrency microservices communicating over Redis Streams.',
      implementation: 'Phased 8-week migration with active shadow verification mode.',
      workflowSteps: [{ title: 'Manifest Stream Ingestion', description: 'Parsing real-time freight feeds.' }],
      technologies: ['FastAPI', 'Redis', 'Docker', 'PostgreSQL'],
      measurableResults: [
        { metric: '94%', label: 'Audit Speedup' },
        { metric: '0', label: 'Customs Infractions' },
      ],
      testimonial: {
        quote: 'Beezent re-architected our clearance workflow in weeks, eliminating our inspection backlog completely.',
        author: 'Marcus Vance',
        role: 'VP of Global Logistics',
        company: 'Apex Global Logistics',
      },
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      relatedServices: ['AI Agents & Systems'],
      featured: true,
      status: 'PUBLISHED',
    },
  },
  {
    id: 'admin-case-studies-get',
    category: 'admin-case-studies',
    method: 'GET',
    path: '/api/v1/admin/case-studies/{case_study_id}',
    name: 'Get Case Study',
    description: 'Retrieve case study by ID',
    defaultParams: { case_study_id: 'cs-1' },
  },
  {
    id: 'admin-case-studies-patch',
    category: 'admin-case-studies',
    method: 'PATCH',
    path: '/api/v1/admin/case-studies/{case_study_id}',
    name: 'Update Case Study',
    description: 'Update case study metrics and status',
    defaultParams: { case_study_id: 'cs-1' },
    defaultPayload: { featured: true },
  },
  {
    id: 'admin-case-studies-delete',
    category: 'admin-case-studies',
    method: 'DELETE',
    path: '/api/v1/admin/case-studies/{case_study_id}',
    name: 'Delete Case Study',
    description: 'Delete case study record',
    defaultParams: { case_study_id: 'cs-test' },
  },

  // admin-leads
  {
    id: 'admin-leads-list',
    category: 'admin-leads',
    method: 'GET',
    path: '/api/v1/admin/leads',
    name: 'List Leads',
    description: 'Admin view of all prospective client submissions and statuses',
  },
  {
    id: 'admin-leads-get',
    category: 'admin-leads',
    method: 'GET',
    path: '/api/v1/admin/leads/{lead_id}',
    name: 'Get Lead',
    description: 'Fetch full lead details, contact info, and internal notes',
    defaultParams: { lead_id: 'inq-1' },
  },
  {
    id: 'admin-leads-patch',
    category: 'admin-leads',
    method: 'PATCH',
    path: '/api/v1/admin/leads/{lead_id}',
    name: 'Update Lead',
    description: 'Update lead status or pipeline state',
    defaultParams: { lead_id: 'inq-1' },
     defaultPayload: { status: 'contacted' },
  },
  {
    id: 'admin-leads-delete',
    category: 'admin-leads',
    method: 'DELETE',
    path: '/api/v1/admin/leads/{lead_id}',
    name: 'Delete Lead',
    description: 'Remove lead record',
    defaultParams: { lead_id: 'inq-test' },
  },

  // admin-files
  {
    id: 'admin-files-list',
    category: 'admin-files',
    method: 'GET',
    path: '/api/v1/admin/files',
    name: 'List Media',
    description: 'List uploaded media assets, images, and diagrams',
  },
  {
    id: 'admin-files-upload',
    category: 'admin-files',
    method: 'POST',
    path: '/api/v1/admin/files',
    name: 'Upload Media',
     description: 'Upload media using multipart form data with file, folder, and alt_text fields',
  },
  {
    id: 'admin-files-get',
    category: 'admin-files',
    method: 'GET',
    path: '/api/v1/admin/files/{media_id}',
    name: 'Get Media',
    description: 'Retrieve media asset metadata',
    defaultParams: { media_id: 'med-1' },
  },
  {
    id: 'admin-files-patch',
    category: 'admin-files',
    method: 'PATCH',
    path: '/api/v1/admin/files/{media_id}',
    name: 'Update Media',
    description: 'Update media alt text or naming',
    defaultParams: { media_id: 'med-1' },
     defaultPayload: { alt_text: 'Updated accessible description' },
  },
  {
    id: 'admin-files-delete',
    category: 'admin-files',
    method: 'DELETE',
    path: '/api/v1/admin/files/{media_id}',
    name: 'Delete Media',
    description: 'Remove media asset from storage',
    defaultParams: { media_id: 'med-test' },
  },
];

const CATEGORIES = [
  'ALL',
  'health',
  'auth',
  'development',
  'projects',
  'case-studies',
  'services',
  'solutions',
  'leads',
  'admin-projects',
  'admin-services',
  'admin-solutions',
  'admin-case-studies',
  'admin-leads',
  'admin-files',
];

export const AdminApiExplorerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { api, apiBaseUrl, setApiBaseUrl, resetApiBaseUrl, apiHealth, checkApiHealth, syncWithApi, isSyncing } =
    useDatabase();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointDef>(ENDPOINTS[0]);
  const [paramInputs, setParamInputs] = useState<Record<string, string>>(
    ENDPOINTS[0].defaultParams || {}
  );
  const [payloadInput, setPayloadInput] = useState<string>(
    ENDPOINTS[0].defaultPayload ? JSON.stringify(ENDPOINTS[0].defaultPayload, null, 2) : ''
  );
  const [tempBaseUrl, setTempBaseUrl] = useState(apiBaseUrl);

  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: number;
    statusText?: string;
    durationMs: number;
    url: string;
    method: string;
    success: boolean;
    data?: any;
    error?: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectEndpoint = (endpoint: EndpointDef) => {
    setSelectedEndpoint(endpoint);
    setParamInputs(endpoint.defaultParams || {});
    setPayloadInput(endpoint.defaultPayload ? JSON.stringify(endpoint.defaultPayload, null, 2) : '');
    setExecutionResult(null);
  };

  const getResolvedPath = (endpoint: EndpointDef, params: Record<string, string>): string => {
    let path = endpoint.path;
    Object.entries(params).forEach(([key, val]) => {
      path = path.replace(`{${key}}`, encodeURIComponent(val || `{${key}}`));
    });
    return path;
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionResult(null);

    const startTime = performance.now();
    const resolvedPath = getResolvedPath(selectedEndpoint, paramInputs);

    let parsedBody: any = undefined;
    if (selectedEndpoint.method !== 'GET' && selectedEndpoint.method !== 'DELETE' && payloadInput.trim()) {
      try {
        parsedBody = JSON.parse(payloadInput);
      } catch (err: any) {
        setIsExecuting(false);
        setExecutionResult({
          status: 400,
          statusText: 'JSON Syntax Error',
          durationMs: 0,
          url: `${apiBaseUrl}${resolvedPath}`,
          method: selectedEndpoint.method,
          success: false,
          error: `Invalid JSON Payload: ${err.message}`,
        });
        return;
      }
    }

    try {
      const res = await (api as any).request(resolvedPath, {
        method: selectedEndpoint.method,
        body: parsedBody,
      });

      const durationMs = Math.round(performance.now() - startTime);

      setExecutionResult({
        status: res.status || (res.success ? 200 : 0),
        statusText: res.success ? 'OK' : 'Error',
        durationMs,
        url: `${apiBaseUrl}${resolvedPath}`,
        method: selectedEndpoint.method,
        success: res.success,
        data: res.data,
        error: res.error,
      });

      if (res.success) {
        checkApiHealth();
      }
    } catch (err: any) {
      const durationMs = Math.round(performance.now() - startTime);
      setExecutionResult({
        status: 0,
        statusText: 'Network Exception',
        durationMs,
        url: `${apiBaseUrl}${resolvedPath}`,
        method: selectedEndpoint.method,
        success: false,
        error: err.message || 'Unknown network error',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopyResult = () => {
    if (!executionResult) return;
    const text = JSON.stringify(executionResult.data || { error: executionResult.error }, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveBaseUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setApiBaseUrl(tempBaseUrl.trim());
  };

  const handleTriggerSync = async () => {
    setSyncStatus('Syncing...');
    const res = await syncWithApi();
    setSyncStatus(res.message || (res.success ? 'Synced!' : 'Sync failed'));
    setTimeout(() => setSyncStatus(null), 4000);
  };

  const filteredEndpoints = ENDPOINTS.filter(
    ep => selectedCategory === 'ALL' || ep.category === selectedCategory
  );

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'POST':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PATCH':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DELETE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 text-[#38BDF8] rounded-xl border border-blue-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold tracking-tight">API Command & Diagnostics Console</h2>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  REST v1
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Targeting <code className="font-mono text-blue-300">{apiBaseUrl}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              title="Sync app records with remote API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : syncStatus || 'Sync Database'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Base URL Bar */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <form onSubmit={handleSaveBaseUrl} className="flex items-center gap-2 flex-1 min-w-[300px]">
            <span className="font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#0282EB]" />
              <span>API Base URL:</span>
            </span>
            <input
              type="text"
              value={tempBaseUrl}
              onChange={e => setTempBaseUrl(e.target.value)}
              className="flex-1 font-mono text-xs px-3 py-1.5 bg-white rounded-lg border border-slate-300 focus:border-[#0282EB] focus:ring-1 focus:ring-[#0282EB] outline-hidden"
              placeholder="http://localhost:8000"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#0282EB] text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                const def = resetApiBaseUrl();
                setTempBaseUrl(def);
              }}
              className="px-2.5 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg font-medium transition-colors"
               title="Reset to default backend URL"
            >
              Default
            </button>
          </form>

          {/* Health Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Status:</span>
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                apiHealth.status === 'online'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : apiHealth.status === 'checking'
                  ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  apiHealth.status === 'online'
                    ? 'bg-emerald-500'
                    : apiHealth.status === 'checking'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              />
              <span className="capitalize">{apiHealth.status}</span>
            </div>
            <button
              type="button"
              onClick={() => checkApiHealth()}
              className="p-1 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-200"
              title="Recheck Health"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Workspace Body: Left Endpoint List + Right Execution Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: Category Pills & Endpoints */}
          <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0 overflow-hidden">
            {/* Category Filter Chips */}
            <div className="p-3 border-b border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Endpoints List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredEndpoints.map(ep => {
                const active = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleSelectEndpoint(ep)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all flex flex-col gap-1 border ${
                      active
                        ? 'bg-blue-50 border-blue-300 shadow-2xs'
                        : 'bg-white border-transparent hover:bg-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <span
                          className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-sm border shrink-0 ${getMethodBadgeClass(
                            ep.method
                          )}`}
                        >
                          {ep.method}
                        </span>
                        <span
                          className={`text-xs font-bold truncate ${
                            active ? 'text-[#0282EB]' : 'text-slate-800'
                          }`}
                        >
                          {ep.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {ep.category}
                      </span>
                    </div>
                    <code className="text-[11px] text-slate-500 font-mono truncate">
                      {ep.path}
                    </code>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Execution Canvas */}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 bg-white space-y-6">
            {/* Selected Endpoint Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-black px-2.5 py-1 rounded-md border ${getMethodBadgeClass(
                      selectedEndpoint.method
                    )}`}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedEndpoint.name}
                  </h3>
                </div>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="px-4 py-2 bg-[#0282EB] hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all"
                >
                  {isExecuting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isExecuting ? 'Requesting...' : 'Send Request'}</span>
                </button>
              </div>

              <div className="font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-xl flex items-center justify-between overflow-x-auto">
                <span className="text-slate-400 select-none mr-2">{apiBaseUrl}</span>
                <span className="text-blue-300 font-bold flex-1 truncate">
                  {getResolvedPath(selectedEndpoint, paramInputs)}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedEndpoint.description}
              </p>
            </div>

            {/* Path Parameters (if any) */}
            {selectedEndpoint.path.includes('{') && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  URL Path Parameters
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(selectedEndpoint.defaultParams || {}).map(paramKey => (
                    <div key={paramKey} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <label className="block text-[11px] font-mono text-slate-500 mb-1">
                        {`{${paramKey}}`}
                      </label>
                      <input
                        type="text"
                        value={paramInputs[paramKey] || ''}
                        onChange={e =>
                          setParamInputs({ ...paramInputs, [paramKey]: e.target.value })
                        }
                        className="w-full font-mono text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg outline-hidden focus:border-[#0282EB]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Body (for POST / PATCH) */}
            {selectedEndpoint.method !== 'GET' && selectedEndpoint.method !== 'DELETE' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Request JSON Body
                  </label>
                  {selectedEndpoint.defaultPayload && (
                    <button
                      onClick={() =>
                        setPayloadInput(JSON.stringify(selectedEndpoint.defaultPayload, null, 2))
                      }
                      className="text-[11px] text-[#0282EB] hover:underline font-semibold"
                    >
                      Reset Payload Template
                    </button>
                  )}
                </div>
                <textarea
                  rows={7}
                  value={payloadInput}
                  onChange={e => setPayloadInput(e.target.value)}
                  className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-300 rounded-xl border border-slate-800 outline-hidden focus:ring-2 focus:ring-[#0282EB]"
                  placeholder='{ "key": "value" }'
                />
              </div>
            )}

            {/* Execution Response Inspector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live Server Response
                  </label>
                  {executionResult && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        executionResult.success
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      HTTP {executionResult.status} ({executionResult.durationMs}ms)
                    </span>
                  )}
                </div>

                {executionResult && (
                  <button
                    onClick={handleCopyResult}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                )}
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 min-h-[160px] text-xs font-mono overflow-x-auto text-slate-300">
                {isExecuting ? (
                  <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                    <span>Dispatched request to {apiBaseUrl}...</span>
                  </div>
                ) : executionResult ? (
                  <div>
                    {executionResult.error && (
                      <div className="mb-3 p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                          <span>Request Unsuccessful</span>
                        </div>
                        <p className="text-slate-300">{executionResult.error}</p>
                      </div>
                    )}
                    <pre className="text-slate-100 text-[11px] leading-relaxed whitespace-pre-wrap">
                      {JSON.stringify(executionResult.data || { error: executionResult.error }, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-slate-500 space-y-1">
                    <Code className="w-6 h-6 text-slate-600" />
                    <span>Click "Send Request" above to execute this endpoint.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Connectivity / CORS Troubleshooting Note */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-slate-600 flex items-start gap-3">
              <Shield className="w-4 h-4 text-[#0282EB] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-900">Local Network API Access Note:</span>
                <p className="text-[11px] leading-relaxed">
                   The frontend uses cookie credentials, so configure FastAPI CORS with this frontend origin and <code>allow_credentials=true</code>. Use HTTPS for production to keep the session cookie secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
