import { AppDatabase } from '../types';

export const initialDatabase: AppDatabase = {
  services: [
    {
      id: 'srv-1',
      title: 'AI Agent Development',
      slug: 'ai-agent-development',
      shortDescription: 'Autonomous, goal-driven AI agents engineered to execute complex multi-step workflows with tool execution and verification.',
      fullDescription: 'We design and deploy production-grade autonomous agents that do not simply answer questions—they plan, reason, invoke internal APIs, query databases, and execute mission-critical tasks autonomously with stringent safety guardrails.',
      icon: 'Bot',
      heroVisual: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Deterministic multi-agent state machines with LangGraph & custom orchestrators',
        'Dynamic tool & function calling with schema validation',
        'Long-term semantic memory & context compression',
        'Sandboxed code execution and safe API dispatch',
        'Human-in-the-loop escalation gates for sensitive actions',
        'Full tracing, latency monitoring, and token efficiency telemetry'
      ],
      benefits: [
        'Eliminate repetitive operational overhead by delegating to autonomous workers',
        'Scale execution 24/7 with sub-second response times',
        'Maintain complete visibility with step-by-step reasoning logs and audit trails',
        'Seamless integration with your existing ERP, CRM, and proprietary APIs'
      ],
      technologies: ['LangGraph', 'Python', 'TypeScript', 'FastAPI', 'Claude 3.7 / GPT-4o / Gemini 2.5', 'PostgreSQL', 'Redis', 'Qdrant'],
      process: [
        { step: 1, title: 'Workflow Decomposition', description: 'We map your target operational workflow into atomic tasks, tool definitions, and failure modes.' },
        { step: 2, title: 'State & Memory Architecture', description: 'Design persistent state schemas, session memory, and contextual retrieval pipelines.' },
        { step: 3, title: 'Safety & Guardrail Implementation', description: 'Build strict validation filters, output verification checks, and human fallback routines.' },
        { step: 4, title: 'Integration & Load Testing', description: 'Connect agent executors to staging APIs and stress test across edge-case scenarios.' },
        { step: 5, title: 'Production Deployment & Tracing', description: 'Roll out with comprehensive telemetry, latency budgets, and real-time observability.' }
      ],
      problemStatement: 'Modern businesses lose thousands of engineering and operational hours on manual cross-system tasks that traditional rule-based software cannot handle.',
      ourApproach: 'We combine probabilistic LLM reasoning with deterministic code guardrails to guarantee 99%+ reliability on real enterprise execution paths.',
      ctaText: 'Deploy Custom AI Agents',
      seoTitle: 'AI Agent Development Services | The Beezent',
      seoDescription: 'Enterprise AI Agent development by The Beezent. We engineer autonomous agents that execute multi-step business workflows with tool calling and safety guardrails.',
      status: 'PUBLISHED',
      sortOrder: 1,
      createdAt: '2025-01-10T10:00:00Z',
      updatedAt: '2025-02-15T14:30:00Z'
    },
    {
      id: 'srv-2',
      title: 'AI Automation',
      slug: 'ai-automation',
      shortDescription: 'End-to-end intelligent pipeline automation connecting your systems, unstructured data, and business operations.',
      fullDescription: 'Move beyond rigid Zapier recipes. We construct adaptive cognitive automation pipelines that ingest messy unstructured emails, documents, tickets, and sensor streams, process them through specialized AI models, and sync data directly into core business tools.',
      icon: 'Cpu',
      heroVisual: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Intelligent document and OCR ingestion pipelines',
        'Event-driven asynchronous workflow queues',
        'Automatic data reconciliation and anomaly alerting',
        'Bi-directional sync across legacy and modern platforms',
        'Zero-data-leakage compliance boundaries'
      ],
      benefits: [
        'Drastically lower turnaround time from hours to seconds',
        'Zero transcription and data-entry errors across core ledgers',
        'Unblock cross-departmental bottlenecks without adding headcount',
        'Self-healing workflows that flag and isolate ambiguities'
      ],
      technologies: ['Apache Kafka', 'Temporal', 'Node.js', 'Docling', 'LangChain', 'PostgreSQL', 'Docker'],
      process: [
        { step: 1, title: 'Process Audit', description: 'Identify data silos, repetitive touchpoints, and friction points across departments.' },
        { step: 2, title: 'Data Pipeline Design', description: 'Engineer ingestion routes, parsing schemas, and fallback queues.' },
        { step: 3, title: 'Model Fine-tuning & Extraction', description: 'Calibrate extraction models on real organizational documents and logs.' },
        { step: 4, title: 'Production Cutover', description: 'Deploy resilient workers with automatic retries and dead-letter queues.' }
      ],
      problemStatement: 'Manual data extraction, invoice matching, and cross-platform syncing drain executive focus and introduce expensive downstream errors.',
      ourApproach: 'We build event-driven pipelines that treat unstructured data as first-class citizens, routing and converting it into structured database records seamlessly.',
      ctaText: 'Automate Your Core Operations',
      seoTitle: 'Enterprise AI Automation Solutions | The Beezent',
      seoDescription: 'Intelligent AI automation services for enterprise operations. Streamline document ingestion, cross-system syncing, and automated data reconciliation.',
      status: 'PUBLISHED',
      sortOrder: 2,
      createdAt: '2025-01-12T10:00:00Z',
      updatedAt: '2025-02-14T12:00:00Z'
    },
    {
      id: 'srv-3',
      title: 'Custom AI Solutions',
      slug: 'custom-ai-solutions',
      shortDescription: 'Tailored machine learning models, custom RAG architectures, and proprietary AI systems designed around your proprietary data.',
      fullDescription: 'When off-the-shelf APIs fall short, we build bespoke AI engines. From domain-adapted embedding spaces and hybrid vector search to fine-tuned SLMs (Small Language Models) for edge deployment, we architect defensible AI assets.',
      icon: 'Sparkles',
      heroVisual: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Domain-specific Small Language Model (SLM) distillation & fine-tuning',
        'Advanced hybrid RAG (Dense + Sparse BM25 + Cross-Encoder re-ranking)',
        'Proprietary dataset curation and automated synthetic data generation',
        'On-premise / VPC private model deployment for complete privacy',
        'Custom scoring, recommendation, and predictive algorithmic engines'
      ],
      benefits: [
        'Total intellectual property ownership over your model weights and pipelines',
        'Drastically lower token expenditure through model distillation',
        '100% data sovereignty keeping sensitive customer information within your VPC',
        'Unmatched domain accuracy compared to general-purpose base models'
      ],
      technologies: ['PyTorch', 'vLLM', 'Hugging Face', 'Ollama', 'Milvus', 'Pgvector', 'Triton Inference Server'],
      process: [
        { step: 1, title: 'Data Valuation & Strategy', description: 'Analyze your proprietary datasets, labeling requirements, and privacy constraints.' },
        { step: 2, title: 'Architecture Selection', description: 'Determine optimal approach: hybrid retrieval, LoRA adapter fine-tuning, or distillation.' },
        { step: 3, title: 'Training & Benchmark Validation', description: 'Train and evaluate models against strict golden test sets and regression suites.' },
        { step: 4, title: 'High-Throughput Serving', description: 'Deploy onto GPU clusters with dynamic batching and sub-50ms inference latency.' }
      ],
      problemStatement: 'Generic AI models hallucinate on specialized internal terminology, lack context, and pose enterprise data governance risks.',
      ourApproach: 'We tailor the entire machine learning stack to your proprietary business vocabulary, operating securely inside your dedicated infrastructure.',
      ctaText: 'Architect Custom AI',
      seoTitle: 'Custom AI Solutions & Machine Learning Engineering | The Beezent',
      seoDescription: 'Bespoke AI system architecture, enterprise RAG, model fine-tuning, and private VPC deployment engineered by The Beezent.',
      status: 'PUBLISHED',
      sortOrder: 3,
      createdAt: '2025-01-15T11:00:00Z',
      updatedAt: '2025-02-18T09:00:00Z'
    },
    {
      id: 'srv-4',
      title: 'Web & Software Development',
      slug: 'web-software-development',
      shortDescription: 'Modern, high-velocity web platforms, full-stack architectures, and AI-native user interfaces built to scale.',
      fullDescription: 'AI models are only as valuable as the software delivering them. We develop mission-critical web applications, intuitive client portals, high-throughput backend APIs, and real-time collaborative interfaces using modern engineering standards.',
      icon: 'Code2',
      heroVisual: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Next.js App Router & React full-stack production architectures',
        'High-concurrency Node.js & Go microservices',
        'Real-time streaming and WebSocket collaborative protocols',
        'Micro-frontend design systems and accessible Tailwind component libraries',
        'Automated CI/CD, containerized Kubernetes/Cloud Run orchestration'
      ],
      benefits: [
        'Sub-second page transitions and 95+ Core Web Vitals performance',
        'Robust type safety across backend and frontend layers',
        'Enterprise-grade security, OAuth, RBAC, and encryption at rest',
        'Future-proof architectures built for rapid iteration'
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'GraphQL'],
      process: [
        { step: 1, title: 'System Architecture', description: 'Define database schemas, API contracts, and component design systems.' },
        { step: 2, title: 'Iterative Engineering', description: 'Bi-weekly sprint deliveries with live staging environments and automated tests.' },
        { step: 3, title: 'Performance & Security Audit', description: 'Penetration testing, accessibility compliance, and latency profiling.' },
        { step: 4, title: 'Zero-Downtime Launch', description: 'Blue-green production deployments backed by 24/7 telemetry.' }
      ],
      problemStatement: 'Clunky interfaces and legacy backends handicap modern AI capabilities, frustrating end-users and limiting product adoption.',
      ourApproach: 'We craft clean, responsive, resilient software systems that present complex AI capabilities with seamless consumer-grade polish.',
      ctaText: 'Build Scalable Software',
      seoTitle: 'Full-Stack Web & Software Engineering | The Beezent',
      seoDescription: 'High-performance web and software development by The Beezent. We build AI-native applications, scalable cloud backends, and robust enterprise platforms.',
      status: 'PUBLISHED',
      sortOrder: 4,
      createdAt: '2025-01-18T14:00:00Z',
      updatedAt: '2025-02-20T16:00:00Z'
    },
    {
      id: 'srv-5',
      title: 'AI Integration',
      slug: 'ai-integration',
      shortDescription: 'Seamlessly infuse state-of-the-art AI capabilities into existing enterprise software, CRMs, and operational pipelines.',
      fullDescription: 'You do not need to rewrite your legacy tech stack to benefit from modern AI. We integrate intelligent capabilities directly into your existing Salesforce, SAP, HubSpot, custom SQL databases, and internal dashboards with minimal friction and zero disruption.',
      icon: 'Layers',
      heroVisual: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Secure API middleware and proxy routing',
        'Enterprise Single Sign-On (SSO) & role-based data access filters',
        'Legacy database semantic search bridging',
        'Webhook listeners and bi-directional synchronizers',
        'Audit logging and token cost quota enforcement'
      ],
      benefits: [
        'Unlock intelligent automation without risky migrations or rewrites',
        'Empower existing staff in the tools they already use daily',
        'Protect sensitive databases with fine-grained permission boundaries',
        'Rapid time-to-value within weeks rather than quarters'
      ],
      technologies: ['REST APIs', 'GraphQL', 'Kafka', 'OAuth 2.0 / SAML', 'Python', 'Redis', 'AWS / GCP'],
      process: [
        { step: 1, title: 'Integration Discovery', description: 'Analyze existing API endpoints, data schemas, and security boundaries.' },
        { step: 2, title: 'Middleware Construction', description: 'Develop secure proxy gateways that sanitize inputs and route to AI engines.' },
        { step: 3, title: 'Pilot Validation', description: 'Deploy integration to a test cohort to benchmark accuracy and system load.' },
        { step: 4, title: 'Enterprise Rollout', description: 'Full production activation with rate-limiting and comprehensive metrics.' }
      ],
      problemStatement: 'Legacy enterprise systems store valuable data but remain static, difficult to navigate, and disconnected from modern intelligence.',
      ourApproach: 'We build lightweight, secure integration layers that transform legacy databases into active, intelligent participants in daily workflows.',
      ctaText: 'Integrate AI Systems',
      seoTitle: 'Enterprise AI Integration Services | The Beezent',
      seoDescription: 'Connect advanced AI models and automation directly into your existing CRM, ERP, and databases with The Beezent integration engineering.',
      status: 'PUBLISHED',
      sortOrder: 5,
      createdAt: '2025-01-20T09:00:00Z',
      updatedAt: '2025-02-22T11:00:00Z'
    },
    {
      id: 'srv-6',
      title: 'AI Consulting',
      slug: 'ai-consulting',
      shortDescription: 'Strategic AI roadmapping, feasibility studies, model selection, architecture validation, and governance advisory.',
      fullDescription: 'Cut through the AI hype. We help founders, CTOs, and enterprise leadership formulate concrete, high-ROI AI roadmaps, validate technical feasibility before investing capital, and establish ethical, compliant data practices.',
      icon: 'Compass',
      heroVisual: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Comprehensive AI Opportunity & Feasibility Assessment',
        'Total Cost of Ownership (TCO) modeling & GPU resource planning',
        'Data readiness and hygiene architecture audits',
        'AI security, prompt injection defenses, and compliance reviews',
        'Vendor and foundational model comparative evaluation'
      ],
      benefits: [
        'Avoid expensive dead-end AI initiatives with pragmatic technical validation',
        'Align engineering investments directly with measurable business ROI',
        'Establish reliable risk mitigation against hallucination and data leakage',
        'Accelerate executive consensus with clear architectural blueprints'
      ],
      technologies: ['Architecture Blueprints', 'Benchmarking Frameworks', 'Security Auditing', 'TCO Modeling'],
      process: [
        { step: 1, title: 'Executive Alignment', description: 'Define core business objectives, competitive pressures, and success criteria.' },
        { step: 2, title: 'Technical Discovery', description: 'Audit existing data assets, compute infrastructure, and engineering workflows.' },
        { step: 3, title: 'Architecture & ROI Blueprint', description: 'Deliver concrete implementation roadmap with stack choices and cost projections.' },
        { step: 4, title: 'Advisory & Execution Support', description: 'Provide ongoing technical oversight and architectural steering during execution.' }
      ],
      problemStatement: 'Companies waste millions on unfocused AI pilots that never graduate to production because they lacked architectural rigor from day one.',
      ourApproach: 'We provide sober, engineering-first advisory grounded in production reality, not marketing promises.',
      ctaText: 'Book an AI Strategy Session',
      seoTitle: 'Strategic AI Consulting & Advisory | The Beezent',
      seoDescription: 'Pragmatic AI consulting for ambitious businesses. Validate technical feasibility, plan enterprise AI architectures, and accelerate ROI with The Beezent.',
      status: 'PUBLISHED',
      sortOrder: 6,
      createdAt: '2025-01-22T13:00:00Z',
      updatedAt: '2025-02-24T15:00:00Z'
    }
  ],

  solutions: [
    {
      id: 'sol-1',
      title: 'AI Customer Support',
      slug: 'ai-customer-support',
      category: 'Customer Experience',
      shortDescription: 'Autonomous multi-tier customer support agent resolving complex inquiries with live system actions.',
      description: 'An enterprise-grade support agent capable of resolving 70%+ of tier-1 and tier-2 customer inquiries end-to-end. Rather than simply quoting documentation, this agent queries shipping databases, processes refund validations, and updates CRM records with verified accuracy.',
      businessProblem: 'Customer support teams are overwhelmed with repetitive tickets, leading to slow response times, burnt-out agents, and customer churn.',
      solution: 'An intelligent support agent equipped with direct API tools to inspect accounts, execute allowed modifications, and smoothly escalate edge cases to human reps with full context summaries.',
      features: [
        'Live order tracking, modification, and refund calculation',
        'Multi-lingual real-time resolution across 40+ languages',
        'Sentiment analysis and urgent churn risk prioritization',
        'Seamless human agent handoff with instant context briefing',
        'Automated ticket categorization and tag updating'
      ],
      benefits: [
        'Sub-10 second first response time around the clock',
        'Up to 75% reduction in tier-1 ticket volume reaching human agents',
        'CSAT scores consistently exceeding 94%',
        'Zero ramp-up time during seasonal demand spikes'
      ],
      workflow: [
        { step: 1, title: 'Inquiry Ingestion', description: 'Message received via live chat, email, or WhatsApp, and parsed for intent.' },
        { step: 2, title: 'Customer Authentication', description: 'Secure token verification checks user tier and active transactions.' },
        { step: 3, title: 'Tool Execution', description: 'Agent queries backend order management and CRM systems.' },
        { step: 4, title: 'Resolution & Audit', description: 'Executes verified resolution, informs customer, and logs audit trail.' }
      ],
      integrations: ['Zendesk', 'Intercom', 'Freshdesk', 'Shopify', 'Salesforce', 'Stripe'],
      technologies: ['FastAPI', 'LangGraph', 'Claude 3.5 Sonnet', 'Redis', 'PostgreSQL'],
      visual: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      relatedProjectIds: ['prj-2'],
      ctaText: 'Deploy AI Support Agent',
      seoTitle: 'Enterprise AI Customer Support Agent | The Beezent',
      seoDescription: 'Autonomous customer support agent that resolves inquiries and executes system actions with zero wait times. Built by The Beezent.',
      status: 'PUBLISHED',
      featured: true,
      createdAt: '2025-01-10T10:00:00Z',
      updatedAt: '2025-02-15T12:00:00Z'
    },
    {
      id: 'sol-2',
      title: 'AI Sales Agent',
      slug: 'ai-sales-agent',
      category: 'Revenue Operations',
      shortDescription: 'High-converting inbound SDR agent qualifying leads, answering product questions, and booking qualified demos 24/7.',
      description: 'Never let a high-intent prospect go cold. The Beezent AI Sales Agent engages website visitors and inbound leads within seconds, answers granular technical and pricing questions, evaluates ICP fit against your qualification criteria, and coordinates calendar bookings directly.',
      businessProblem: 'B2B inbound leads lose interest within 10 minutes, yet typical sales response times average several hours or days.',
      solution: 'An intelligent conversational sales rep trained on your product docs, pricing matrices, and sales methodology to qualify buyers and lock in pipeline.',
      features: [
        'Instant inbound lead response on website and email',
        'Dynamic ICP qualification based on BANT or MEDDPIC criteria',
        'Live calendar synchronization and meeting scheduling',
        'CRM enrichment with buyer intent signals and firmographics',
        'Personalized follow-up sequences based on conversational context'
      ],
      benefits: [
        '3.2x increase in speed-to-lead response rates',
        'Over 40% higher visitor-to-demo conversion',
        'Sales reps receive meetings with fully enriched qualification notes',
        '24/7 coverage across all global timezones'
      ],
      workflow: [
        { step: 1, title: 'Engagement', description: 'Detects high-intent visitor browsing patterns and initiates personalized context.' },
        { step: 2, title: 'Discovery & Qualification', description: 'Asks strategic questions to verify team size, budget, and pain points.' },
        { step: 3, title: 'Calendar Booking', description: 'Offers available meeting slots for the appropriate account executive.' },
        { step: 4, title: 'CRM Sync', description: 'Creates deal record with conversation transcript and qualification tags.' }
      ],
      integrations: ['HubSpot', 'Salesforce', 'Calendly', 'Apollo', 'Slack', 'Clearbit'],
      technologies: ['TypeScript', 'Next.js', 'GPT-4o', 'Pgvector', 'Vercel'],
      visual: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      relatedProjectIds: ['prj-2'],
      ctaText: 'Activate AI Sales Agent',
      seoTitle: 'Autonomous AI Sales Agent & Inbound Qualification | The Beezent',
      seoDescription: 'Transform website visitors into qualified pipeline with The Beezent AI Sales Agent. 24/7 ICP qualification and instant calendar booking.',
      status: 'PUBLISHED',
      featured: true,
      createdAt: '2025-01-14T10:00:00Z',
      updatedAt: '2025-02-16T15:00:00Z'
    },
    {
      id: 'sol-3',
      title: 'AI Knowledge Assistant',
      slug: 'ai-knowledge-assistant',
      category: 'Internal Operations',
      shortDescription: 'Enterprise neural search and synthesis engine connecting company wikis, codebases, contracts, and Slack threads.',
      description: 'Break down internal information silos. The Beezent Knowledge Assistant ingests Notion, Confluence, Google Drive, Jira, and chat archives into a private, permission-aware vector index, allowing employees to get instant answers backed by citations.',
      businessProblem: 'Knowledge workers waste an estimated 20% of every workweek searching for internal files, policies, and past decisions.',
      solution: 'A unified enterprise cognitive search layer that respects document-level access permissions while providing verifiable answers with exact source attribution.',
      features: [
        'Document-level ACL permission enforcement at query time',
        'Exact citation references with deep links to source documents',
        'Multi-format ingestion: PDFs, presentations, spreadsheets, markdown',
        'Slack and Microsoft Teams native conversational interface',
        'Continuous incremental re-indexing on file updates'
      ],
      benefits: [
        'Save hundreds of hours per employee every year',
        'Eliminate repetitive questions directed at senior staff and HR',
        'Preserve institutional knowledge through employee transitions',
        '100% private retrieval within your corporate cloud perimeter'
      ],
      workflow: [
        { step: 1, title: 'Connector Ingestion', description: 'Continuously syncs internal wikis, Drive folders, and communication channels.' },
        { step: 2, title: 'Embedding & Chunking', description: 'Semantic chunking with contextual headers and metadata preservation.' },
        { step: 3, title: 'Hybrid Retrieval', description: 'Combines BM25 keyword matching with dense embeddings and re-ranking.' },
        { step: 4, title: 'Permission-Gated Synthesis', description: 'Generates concise answer referencing only documents the user is authorized to read.' }
      ],
      integrations: ['Google Workspace', 'Notion', 'Confluence', 'Slack', 'Jira', 'SharePoint'],
      technologies: ['Qdrant', 'FastAPI', 'Cohere Rerank', 'LangChain', 'Docker'],
      visual: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      relatedProjectIds: ['prj-4'],
      ctaText: 'Deploy Enterprise Knowledge Assistant',
      seoTitle: 'Enterprise AI Knowledge Assistant | The Beezent',
      seoDescription: 'Unified internal AI search engine connecting company documentation, wikis, and chats with strict permission enforcement.',
      status: 'PUBLISHED',
      featured: true,
      createdAt: '2025-01-18T11:00:00Z',
      updatedAt: '2025-02-18T16:00:00Z'
    },
    {
      id: 'sol-4',
      title: 'AI Workflow Automation',
      slug: 'ai-workflow-automation',
      category: 'Operations',
      shortDescription: 'Complex multi-system automation orchestrating data verification, invoice approvals, and cross-departmental handoffs.',
      description: 'Replace fragmented manual workflows with resilient, self-monitoring automation pipelines. We connect your ERP, payment gateways, supplier portals, and communications into coordinated event-driven loops.',
      businessProblem: 'Operational processes stall when human intervention is required for mundane verification, formatting conversions, and approval routing.',
      solution: 'An autonomous workflow manager that validates inputs against business rules, flags genuine anomalies for human review, and executes standard workflows end-to-end.',
      features: [
        'Automated 3-way invoice matching against POs and receiving slips',
        'Dynamic approval escalation based on transaction limits',
        'Automatic error recovery and dead-letter exception queues',
        'Real-time SLA tracking dashboard and bottleneck detection',
        'Audit-ready transaction logging for compliance'
      ],
      benefits: [
        'Cut end-to-end workflow cycle times by 85%',
        'Prevent duplicate payments and fraudulent invoices',
        'Provide management with live operational telemetry',
        'Free up finance and operations teams for strategic initiatives'
      ],
      workflow: [
        { step: 1, title: 'Event Trigger', description: 'System detects arrival of invoice, contract, or operational request.' },
        { step: 2, title: 'Extraction & Verification', description: 'Extracts line items and cross-references against purchase order database.' },
        { step: 3, title: 'Validation Logic', description: 'Applies company policy checks and fraud heuristics.' },
        { step: 4, title: 'Execution & Notification', description: 'Schedules payment in accounting software and notifies department lead.' }
      ],
      integrations: ['QuickBooks', 'NetSuite', 'SAP', 'Xero', 'Stripe', 'Email'],
      technologies: ['Temporal', 'Python', 'Node.js', 'PostgreSQL', 'Redis'],
      visual: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      relatedProjectIds: ['prj-1'],
      ctaText: 'Streamline Your Workflows',
      seoTitle: 'Intelligent AI Workflow Automation | The Beezent',
      seoDescription: 'Transform cross-departmental operations with AI workflow automation. Eliminate manual data entry and invoice processing bottlenecks.',
      status: 'PUBLISHED',
      featured: false,
      createdAt: '2025-01-20T12:00:00Z',
      updatedAt: '2025-02-19T10:00:00Z'
    },
    {
      id: 'sol-5',
      title: 'AI Document Intelligence',
      slug: 'ai-document-intelligence',
      category: 'Data & Compliance',
      shortDescription: 'High-accuracy parser extracting structured tables, entities, and signatures from complex PDFs, scans, and contracts.',
      description: 'Tackle the hardest unstructured documents: nested tables, multi-column layouts, skewed scans, and legal clauses. Our document intelligence pipeline transforms raw PDFs and images into validated JSON schemas ready for downstream databases.',
      businessProblem: 'Traditional OCR fails on complex layouts, leaving financial, legal, and medical organizations reliant on manual data keying.',
      solution: 'A vision-language multimodal pipeline that understands spatial geometry, tables, and entity relationships to achieve near-perfect extraction accuracy.',
      features: [
        'Nested table extraction with preserved column hierarchies',
        'Automated redlining and regulatory clause verification',
        'Handwritten note and signature detection',
        'Schema validation against strict Pydantic/Zod models',
        'Confidence scoring with targeted human review triggers'
      ],
      benefits: [
        '99.2% extraction accuracy across diverse document layouts',
        'Process thousands of pages in minutes rather than days',
        'Zero manual data entry on standard forms',
        'Guaranteed data privacy with zero model training on customer data'
      ],
      workflow: [
        { step: 1, title: 'Document Ingestion', description: 'PDF or scan uploaded via API or watch folder.' },
        { step: 2, title: 'Layout Segmentation', description: 'Multimodal vision model detects text blocks, tables, and signatures.' },
        { step: 3, title: 'Structured Parsing', description: 'Extracts data into target schema with confidence metrics.' },
        { step: 4, title: 'Validation Gate', description: 'High-confidence records pass to database; low-confidence routes to reviewer.' }
      ],
      integrations: ['AWS S3', 'Google Cloud Storage', 'Box', 'PostgreSQL', 'Snowflake'],
      technologies: ['Docling', 'Claude 3.5 Sonnet', 'FastAPI', 'Pydantic', 'OpenCV'],
      visual: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      relatedProjectIds: ['prj-3'],
      ctaText: 'Automate Document Extraction',
      seoTitle: 'Enterprise AI Document Intelligence & OCR | The Beezent',
      seoDescription: 'Extract structured tables, entities, and data from complex enterprise documents with high-precision multimodal AI.',
      status: 'PUBLISHED',
      featured: false,
      createdAt: '2025-01-22T14:00:00Z',
      updatedAt: '2025-02-21T09:00:00Z'
    },
    {
      id: 'sol-6',
      title: 'AI Lead Qualification',
      slug: 'ai-lead-qualification',
      category: 'Revenue Operations',
      shortDescription: 'Autonomous agent scoring inbound prospects, analyzing intent signals, and routing opportunities in real-time.',
      description: 'Stop wasting valuable account executive time on tire-kickers. The Beezent Lead Qualification system enriches incoming lead emails, inspects website behavior, queries company firmographics, and delivers a scored dossier directly into your CRM.',
      businessProblem: 'Sales teams spend up to 40% of their day sorting through unqualified signups rather than closing deals.',
      solution: 'An intelligent pipeline that analyzes lead data against historic win patterns to highlight high-value prospects instantly.',
      features: [
        'Automated firmographic enrichment (revenue, tech stack, headcount)',
        'Predictive deal scoring based on conversion history',
        'Dynamic territory and rep routing rules',
        'Custom executive briefing summary before every sales call'
      ],
      benefits: [
        'Focus senior reps exclusively on top-decile opportunities',
        'Double pipeline velocity for enterprise tier prospects',
        'Zero manual CRM updating for sales development teams'
      ],
      workflow: [
        { step: 1, title: 'Lead Capture', description: 'Form submission or signup webhook received.' },
        { step: 2, title: 'Enrichment', description: 'Pulls public firmographic and tech stack data.' },
        { step: 3, title: 'Score Computation', description: 'Applies predictive fit models and intent scoring.' },
        { step: 4, title: 'Dossier Dispatch', description: 'Creates CRM task and sends briefing card to assigned rep via Slack.' }
      ],
      integrations: ['HubSpot', 'Salesforce', 'Slack', 'Clearbit', 'Segment'],
      technologies: ['Python', 'PostgreSQL', 'FastAPI', 'scikit-learn', 'OpenAI'],
      visual: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      relatedProjectIds: ['prj-2'],
      ctaText: 'Upgrade Lead Qualification',
      seoTitle: 'AI Lead Qualification & Intent Scoring | The Beezent',
      seoDescription: 'Automate inbound qualification and account executive routing with predictive AI lead scoring by The Beezent.',
      status: 'PUBLISHED',
      featured: false,
      createdAt: '2025-01-24T11:00:00Z',
      updatedAt: '2025-02-23T14:00:00Z'
    }
  ],

  projects: [
    {
      id: 'prj-1',
      title: 'Autonomous Inventory & Demand Intelligence Engine',
      slug: 'autonomous-inventory-demand-intelligence',
      shortDescription: 'Predictive supply chain platform orchestrating stock replenishment across 12 regional distribution hubs.',
      fullDescription: 'An enterprise demand forecasting and replenishment platform built for a national logistics operator. The system ingests historic sales, local weather anomalies, port congestion feeds, and supplier lead times to automate reorder recommendations.',
      projectType: 'AI Solutions',
      industry: 'Supply Chain & Logistics',
      clientName: 'Enterprise Logistics Operator',
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1508873696983-2df5703bc2e0?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'TimescaleDB', 'Docker', 'Tailwind CSS'],
      servicesUsed: ['AI Automation', 'Custom AI Solutions', 'Web & Software Development'],
      projectUrl: 'https://example.com/demo/logistics-engine',
      githubUrl: 'https://github.com/beezent-ai/logistics-engine-core',
      completionDate: 'November 2024',
      featured: true,
      status: 'PUBLISHED',
      sortOrder: 1,
      overview: 'Managing thousands of SKUs across multiple distribution centers resulted in frequent stockouts on fast-moving items and excess capital tied up in slow-moving inventory.',
      challenge: 'Existing ERP forecasting modules relied on simple moving averages, completely failing to anticipate regional weather delays and international freight volatility.',
      solution: 'We engineered an intelligent forecasting pipeline that incorporates external macroeconomic and logistics signals, predicting item-level demand curves 30 days ahead.',
      implementation: 'Constructed an event-driven architecture using TimescaleDB for telemetry data and deployed autonomous reordering agents with strict managerial sign-off gates.',
      results: [
        '32% decrease in distribution center stockout incidents',
        '18% reduction in total inventory holding capital',
        'Automated 80% of routine weekly purchase order generation'
      ],
      relatedServiceIds: ['srv-2', 'srv-3', 'srv-4'],
      relatedCaseStudyId: 'cs-1',
      seoTitle: 'Autonomous Inventory Intelligence Engine | The Beezent Case Study',
      seoDescription: 'How The Beezent engineered a predictive supply chain intelligence engine for a regional distribution network.',
      ogImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2025-01-05T10:00:00Z',
      updatedAt: '2025-02-10T11:00:00Z'
    },
    {
      id: 'prj-2',
      title: 'Omni-Channel Agentic Support & Triage Infrastructure',
      slug: 'omni-channel-agentic-support-infrastructure',
      shortDescription: 'High-throughput customer support agent resolving complex requests across chat, email, and mobile apps.',
      fullDescription: 'A multi-agent customer support infrastructure operating across web chat, mobile SDKs, and email. The system dynamically classifies customer intent, extracts account tokens, executes verified database queries, and resolves tickets with minimal human intervention.',
      projectType: 'AI Agents',
      industry: 'E-Commerce & Retail',
      clientName: 'Direct-to-Consumer Retail Group',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e557b6f6?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1556742049-0a67e557b6f6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['React', 'Next.js', 'LangGraph', 'Claude 3.5 Sonnet', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
      servicesUsed: ['AI Agent Development', 'AI Integration'],
      projectUrl: 'https://example.com/demo/support-agent',
      completionDate: 'December 2024',
      featured: true,
      status: 'PUBLISHED',
      sortOrder: 2,
      overview: 'During peak seasonal shopping, support ticket queues grew to over 48 hours, hurting brand reputation and driving customer churn.',
      challenge: 'Standard customer support chatbots were frustrating users with canned FAQ excerpts that failed to answer specific transaction questions.',
      solution: 'We built an agentic support platform with direct access to order management and carrier tracking APIs, enabling the agent to take real actions like re-issuing shipments or adjusting accounts.',
      implementation: 'Deployed a LangGraph state machine with strict safety layers to prevent hallucination, integrated directly into Zendesk and the client custom warehouse database.',
      results: [
        'Average resolution time dropped from 38 hours to 45 seconds',
        '73% of tier-1 support tickets resolved without human intervention',
        'Customer Satisfaction (CSAT) rating increased from 78% to 94%'
      ],
      relatedServiceIds: ['srv-1', 'srv-5'],
      seoTitle: 'Omni-Channel Agentic Support Platform | The Beezent',
      seoDescription: 'Beezent deployed an autonomous agentic customer support platform with real database tool execution, reducing ticket resolution time to seconds.',
      ogImage: 'https://images.unsplash.com/photo-1556742049-0a67e557b6f6?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2025-01-08T12:00:00Z',
      updatedAt: '2025-02-12T14:00:00Z'
    },
    {
      id: 'prj-3',
      title: 'Real-Time Document Extraction & Compliance Pipeline',
      slug: 'real-time-document-compliance-pipeline',
      shortDescription: 'Zero-data-leakage financial document extraction engine handling multi-page invoices, tax forms, and KYC scans.',
      fullDescription: 'An automated document processing pipeline handling high-volume financial PDFs, bank statements, and identity documents for institutional compliance teams. Incorporates deterministic OCR, layout analysis, and cryptographic audit logs.',
      projectType: 'AI Automation',
      industry: 'Financial Services',
      clientName: 'Regulated FinTech Platform',
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['Python', 'Docling', 'FastAPI', 'PostgreSQL', 'Kubernetes', 'Pydantic'],
      servicesUsed: ['AI Automation', 'AI Integration'],
      completionDate: 'January 2025',
      featured: true,
      status: 'PUBLISHED',
      sortOrder: 3,
      overview: 'Compliance analysts spent up to 25 minutes manually reviewing each customer verification package, creating onboarding bottlenecks.',
      challenge: 'Inconsistent document formats, mobile camera glares, and complex multi-column tables caused off-the-shelf OCR solutions to fail frequently.',
      solution: 'We built a vision-augmented extraction pipeline that standardizes unstructured documents into verified JSON schemas with field-level confidence scores.',
      implementation: 'Deployed self-hosted vision models inside the client private VPC to ensure strict compliance with financial privacy regulations.',
      results: [
        'Onboarding document processing time cut from 25 minutes to 12 seconds',
        '99.4% extraction accuracy on standardized tax documents',
        'Zero sensitive customer data ever transmitted outside the secure VPC'
      ],
      relatedServiceIds: ['srv-2', 'srv-5'],
      relatedCaseStudyId: 'cs-2',
      seoTitle: 'Automated Document Compliance Pipeline | The Beezent',
      seoDescription: 'Learn how The Beezent architected a real-time financial document extraction engine with zero data leakage.',
      ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2025-01-15T15:00:00Z',
      updatedAt: '2025-02-18T10:00:00Z'
    },
    {
      id: 'prj-4',
      title: 'Enterprise Multimodal Knowledge Graph & Copilot',
      slug: 'enterprise-multimodal-knowledge-graph',
      shortDescription: 'Unified cognitive search and question-answering system indexing millions of technical engineering documents.',
      fullDescription: 'An internal RAG and knowledge graph system built for an engineering conglomerate. Connects Jira tickets, CAD specifications, Confluence spaces, and Slack channels into an interactive conversational assistant with deep-link source citations.',
      projectType: 'AI Solutions',
      industry: 'Engineering & Manufacturing',
      clientName: 'Industrial Systems Group',
      coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['Python', 'Qdrant', 'FastAPI', 'Next.js', 'TypeScript', 'Neo4j', 'Cohere'],
      servicesUsed: ['Custom AI Solutions', 'Web & Software Development', 'AI Integration'],
      completionDate: 'February 2025',
      featured: false,
      status: 'PUBLISHED',
      sortOrder: 4,
      overview: 'Over 1,200 hardware engineers lost critical hours attempting to locate legacy part schematics and troubleshooting logs.',
      challenge: 'Keyword search in legacy systems failed when queries did not match exact product numbers, and related documentation was scattered across four different platforms.',
      solution: 'We engineered a hybrid graph-vector retrieval architecture that maps relationships between parts, revisions, test reports, and engineers.',
      implementation: 'Integrated Neo4j knowledge graphs with Qdrant dense vectors, paired with a modern Next.js interface with real-time streaming answers.',
      results: [
        'Engineers spend 65% less time locating legacy technical specifications',
        'Over 90% user satisfaction across the engineering division',
        'Citations verified to be 100% accurate against source blueprints'
      ],
      relatedServiceIds: ['srv-3', 'srv-4', 'srv-5'],
      seoTitle: 'Enterprise Knowledge Graph & Copilot | The Beezent',
      seoDescription: 'Case study of an enterprise knowledge graph and internal copilot engineered by The Beezent for an industrial conglomerate.',
      ogImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-02-22T13:00:00Z'
    }
  ],

  caseStudies: [
    {
      id: 'cs-1',
      title: 'Autonomous Dispatch & Route Optimization for Global Logistics',
      slug: 'logistics-fleet-route-dispatch',
      client: 'Continental Freight Network',
      industry: 'Logistics & Supply Chain',
      summary: 'How an AI-driven multi-agent dispatch system reduced empty backhauls by 24% and streamlined route assignment across 450 freight vehicles.',
      challenge: 'Continental Freight was managing long-haul logistics using legacy spreadsheet-based scheduling and manual phone dispatching. With unpredictable weather, traffic delays, and last-minute cancellation surges, dispatchers could not balance driver duty hours with fuel efficiency.',
      objectives: [
        'Automate dynamic load matching and route adjustments in real time',
        'Reduce empty backhaul miles that cut into operating margins',
        'Comply strictly with driver rest regulations without manual audits',
        'Deliver a single operational command view for dispatch managers'
      ],
      solution: 'The Beezent designed an event-driven agentic dispatch platform. When a load status changes or an unexpected delay occurs, autonomous planning agents calculate multi-variable routing solutions, accounting for fuel costs, driver hours, and delivery windows.',
      architectureDescription: 'The solution combines real-time telematics ingestion via Kafka, linear programming route solvers, and a LangGraph decision coordinator backed by PostgreSQL and Redis.',
      workflowSteps: [
        { title: 'Telematics Ingestion', description: 'Live GPS, fuel levels, and driver log status stream continuously from vehicle onboard units.' },
        { title: 'Dynamic Constraint Evaluation', description: 'Agent evaluates upcoming load requests against active driver location and hours-of-service limits.' },
        { title: 'Route Optimization Engine', description: 'Solves the vehicle routing problem with time windows (VRPTW) in under 800 milliseconds.' },
        { title: 'Dispatcher Approval & App Sync', description: 'Optimized assignments are queued for dispatcher confirmation and synced directly to the driver mobile terminal.' }
      ],
      implementation: 'We rolled out the platform iteratively across three regional hubs before full fleet deployment, testing system resilience against peak holiday shipping volumes.',
      technologies: ['Python', 'FastAPI', 'Kafka', 'PostgreSQL', 'TimescaleDB', 'Next.js', 'Tailwind CSS', 'Docker'],
      process: [
        'Operational discovery and dispatcher ride-alongs to map edge cases',
        'Data pipeline integration with legacy telematics APIs',
        'Route optimization algorithm calibration against 12 months of historical routes',
        'Deployment of dispatcher cockpit and driver mobile interfaces',
        'Continuous performance tuning and fuel savings analysis'
      ],
      measurableResults: [
        { metric: '24%', label: 'Backhaul Reduction', context: 'Decrease in non-revenue empty trailer miles across active corridors' },
        { metric: '3.5x', label: 'Dispatch Throughput', context: 'Increase in loads assigned per dispatcher per shift' },
        { metric: '14%', label: 'Fuel Cost Savings', context: 'Reduction in route fuel consumption through dynamic traffic evasion' },
        { metric: '< 2 min', label: 'Rerouting Latency', context: 'Time to calculate and dispatch alternative route upon highway blockage' }
      ],
      testimonial: {
        quote: 'Beezent transformed our dispatch operations from a reactive fire-fighting exercise into an orchestrated, highly efficient system. Our dispatchers can now manage double the volume with far less stress.',
        author: 'Marcus Vance',
        role: 'VP of Fleet Operations',
        company: 'Continental Freight Network',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      },
      coverImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
      ],
      relatedProjectId: 'prj-1',
      relatedServices: ['AI Automation', 'Custom AI Solutions'],
      featured: true,
      status: 'PUBLISHED',
      publishDate: 'January 2025',
      seoTitle: 'Autonomous Fleet Dispatch Case Study | The Beezent',
      seoDescription: 'Read how The Beezent engineered an autonomous routing and dispatch system for Continental Freight Network, reducing empty backhauls by 24%.',
      createdAt: '2025-01-10T10:00:00Z',
      updatedAt: '2025-02-15T14:00:00Z'
    },
    {
      id: 'cs-2',
      title: 'Automated KYC & Underwriting Streamlining for FinTech',
      slug: 'fintech-underwriting-kyc-pipeline',
      client: 'Horizon Commercial Capital',
      industry: 'Financial Services & Lending',
      summary: 'Slashing business loan underwriting intake time from 4 days to 45 minutes using multimodal document parsing and automated compliance verification.',
      challenge: 'Horizon Commercial Capital provides working capital loans to mid-market businesses. Each application required manual inspection of bank statements, tax returns, profit-and-loss sheets, and ownership verification documents. The backlog caused prospective borrowers to seek alternative lenders with faster turnaround times.',
      objectives: [
        'Automate extraction of financial line items from diverse PDF statement formats',
        'Reconcile revenue claims against certified tax filings automatically',
        'Maintain absolute compliance with banking security standards',
        'Shorten preliminary qualification notice to under 1 hour'
      ],
      solution: 'The Beezent built an intelligent underwriting intake engine that securely digests customer financial records, extracts structured balance sheets and cash flow records, flags discrepancies, and generates an initial risk score for credit officers.',
      architectureDescription: 'A secure VPC microservice incorporating Docling spatial layout models, Pydantic data validation schemas, and cryptographic tamper-detection hashing.',
      workflowSteps: [
        { title: 'Secure Document Upload', description: 'Borrower uploads financial statements through an encrypted web portal.' },
        { title: 'Layout & Table Extraction', description: 'Multimodal vision engine maps nested financial statements into standardized schema.' },
        { title: 'Automated Reconciliation', description: 'Cross-verifies stated revenue with historical bank deposit patterns.' },
        { title: 'Underwriter Dossier Generation', description: 'Compiles verified debt-service ratios and highlights risk flags for human review.' }
      ],
      implementation: 'Deployed in an isolated AWS GovCloud environment with zero retention of customer data on public AI provider servers.',
      technologies: ['Python', 'Docling', 'FastAPI', 'PostgreSQL', 'AWS KMS', 'React', 'TypeScript'],
      process: [
        'Deep-dive audit of historical loan documentation variations and rejection criteria',
        'Validation schema engineering for 40+ distinct banking and tax forms',
        'Security hardening and SOC 2 Type II compliance validation',
        'Underwriter cockpit interface design with side-by-side document audit view',
        'Production release with continuous accuracy telemetry'
      ],
      measurableResults: [
        { metric: '45 min', label: 'Intake Turnaround', context: 'Down from an average of 4 business days for preliminary underwriting review' },
        { metric: '99.4%', label: 'Extraction Precision', context: 'Accuracy achieved across unstructured financial ledger line items' },
        { metric: '60%', label: 'Capacity Increase', context: 'More loan applications evaluated per underwriter each month' },
        { metric: '0', label: 'Security Violations', context: 'Zero data leakage incidents across hundreds of thousands of documents' }
      ],
      testimonial: {
        quote: 'Speed is everything in commercial lending. Beezent allowed us to turn what used to be a week-long manual slog into a streamlined, high-confidence process that our borrowers and underwriters love.',
        author: 'Elena Rostova',
        role: 'Chief Credit Officer',
        company: 'Horizon Commercial Capital',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      },
      coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
      ],
      relatedProjectId: 'prj-3',
      relatedServices: ['AI Automation', 'AI Integration'],
      featured: true,
      status: 'PUBLISHED',
      publishDate: 'February 2025',
      seoTitle: 'FinTech Underwriting & KYC Automation Case Study | The Beezent',
      seoDescription: 'Discover how Horizon Commercial Capital accelerated business loan underwriting from 4 days to 45 minutes using The Beezent document intelligence.',
      createdAt: '2025-01-18T11:00:00Z',
      updatedAt: '2025-02-18T16:00:00Z'
    },
    {
      id: 'cs-3',
      title: 'Clinical Records Synthesis & FHIR-Compliant Agent for HealthBridge',
      slug: 'healthbridge-clinical-records-assistant',
      client: 'HealthBridge Medical Network',
      industry: 'Healthcare Technology',
      summary: 'Empowering specialized clinical teams with automated patient history synthesis and FHIR-structured charting assistance.',
      challenge: 'Physicians at HealthBridge were spending an average of two hours every evening finishing electronic health record (EHR) charts. With historical patient records fragmented across PDF laboratory faxes, specialist consultation notes, and legacy EHR databases, doctors struggled to quickly extract longitudinal patient context.',
      objectives: [
        'Synthesize fragmented historical medical notes into concise chronological summaries',
        'Format extracted diagnostic metrics into standardized HL7/FHIR records',
        'Enforce strict HIPAA compliance and zero medical hallucination policies',
        'Return 90+ minutes of daily administrative time back to treating clinicians'
      ],
      solution: 'The Beezent architected a HIPAA-compliant clinical reasoning assistant. The system analyzes chronological patient records, extracts previous medication courses and surgical milestones, and generates an interactive timeline with direct links to certified source records.',
      architectureDescription: 'Private FHIR server connectors, local deterministic medical entity recognition (NER) models, and a verified verification layer ensuring all clinical claims cite exact source encounters.',
      workflowSteps: [
        { title: 'Secure EHR Ingestion', description: 'Patient records ingested through authenticated HL7 FHIR API endpoints.' },
        { title: 'Entity Extraction & Normalization', description: 'Clinical terms mapped to standard SNOMED CT and RxNorm medical ontologies.' },
        { title: 'Longitudinal Synthesis', description: 'Constructs chronological summary highlighting recent treatment modifications.' },
        { title: 'Physician Review & Sign-Off', description: 'Clinician verifies highlighted findings with single-click audit links.' }
      ],
      implementation: 'Deployed in a dedicated HIPAA-certified private cloud environment with full audit logging and encryption at rest.',
      technologies: ['Python', 'FHIR API', 'FastAPI', 'PostgreSQL', 'Docker', 'React', 'TypeScript'],
      process: [
        'Clinical workflow observation with department heads and privacy officers',
        'EHR data schema integration and ontology mapping',
        'Strict guardrail testing to guarantee 100% citation fidelity',
        'Pilot rollout across 35 physicians with daily feedback loops',
        'Full institutional accreditation and ongoing model calibration'
      ],
      measurableResults: [
        { metric: '75 min', label: 'Daily Time Saved', context: 'Average administrative charting time recovered per clinician per day' },
        { metric: '100%', label: 'Source Citation', context: 'All synthesized clinical statements include verified links to source notes' },
        { metric: '91%', label: 'Physician Adoption', context: 'Active voluntary clinician usage rate across the pilot departments' },
        { metric: 'Zero', label: 'HIPAA Exceptions', context: 'Zero data handling irregularities during comprehensive third-party audit' }
      ],
      testimonial: {
        quote: 'Beezent helped us give our doctors their evenings back. The synthesis is remarkably accurate, and because every single statement links right back to the original lab note, our team trusts it completely.',
        author: 'Dr. Aaron Meyer, MD',
        role: 'Chief Medical Information Officer',
        company: 'HealthBridge Medical Network',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
      },
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
      ],
      relatedProjectId: 'prj-4',
      relatedServices: ['Custom AI Solutions', 'AI Integration'],
      featured: true,
      status: 'PUBLISHED',
      publishDate: 'February 2025',
      seoTitle: 'Healthcare AI Clinical Synthesis Case Study | The Beezent',
      seoDescription: 'How HealthBridge Medical Network recovered 75 minutes of daily charting time per physician with The Beezent HIPAA-compliant clinical assistant.',
      createdAt: '2025-01-22T09:00:00Z',
      updatedAt: '2025-02-20T12:00:00Z'
    }
  ],

  blogPosts: [
    {
      id: 'post-1',
      title: 'Beyond Chatbots: Designing Deterministic Multi-Agent Workflows for Enterprise Ops',
      slug: 'beyond-chatbots-multi-agent-workflows',
      excerpt: 'Why single-prompt LLM wrappers fail in mission-critical environments, and how deterministic state machines provide the stability required for autonomous operations.',
      content: `The enterprise generative AI boom began with conversational interfaces. Companies quickly stood up internal search bots, customer support chatbots, and summarization tools. Yet as engineering teams attempted to push LLMs into mission-critical workflows—issuing invoices, adjusting inventory, or interacting with production databases—they hit a ceiling.

The root cause is simple: pure probabilistic language generation is fundamentally mismatched with deterministic enterprise requirements. A customer service bot that invents a promotional code or a logistics agent that skips an approval step causes catastrophic downstream liabilities.

### The Shift from Single Prompts to Multi-Agent State Machines

To deploy autonomous AI agents safely in production, enterprise architectures are abandoning monolithic prompts in favor of directed acyclic graphs (DAGs) and state machines. In this paradigm:

1. **Atomic Specialization:** Instead of one omniscient model, we deploy specialized sub-agents. A *Triage Agent* identifies intent; a *Validation Agent* verifies permissions and schemas; an *Execution Agent* invokes strictly scoped API tools; and a *Verification Agent* inspects the final output.
2. **Explicit State Persistence:** The workflow state is not held in an ephemeral prompt context window. It is persisted in a database (such as PostgreSQL or Redis) after every transition. If an API times out or a connection drops, the workflow resumes exactly where it stopped.
3. **Deterministic Tool Gates:** Agents do not execute arbitrary shell commands or open-ended SQL queries. Every tool call must adhere to rigid Pydantic or Zod schemas, with parameter bounds checking executed in deterministic code before the tool executes.

### The Human-in-the-Loop Threshold

Autonomy does not mean complete isolation from human oversight. Production systems require programmatic escalation rules based on calculated confidence scores, transaction financial limits, and domain sensitivity. When an action exceeds a defined risk threshold, the agent queues the proposed operation into an operator dashboard and pauses until an authenticated supervisor approves or modifies the parameters.

By combining the reasoning power of modern frontier models with the discipline of state machine engineering, organizations can finally realize the promise of intelligent automation with 99.9% enterprise reliability.`,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Alex Chen',
        role: 'Chief AI Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      category: 'AI Architecture',
      tags: ['Multi-Agent', 'Enterprise AI', 'LangGraph', 'Architecture', 'Automation'],
      status: 'PUBLISHED',
      publishDate: 'February 12, 2025',
      readTime: '6 min read',
      seoTitle: 'Deterministic Multi-Agent Workflows for Enterprise Ops | The Beezent',
      seoDescription: 'Why single-prompt chatbots fail in production and how deterministic multi-agent state machines guarantee reliable enterprise automation.',
      createdAt: '2025-02-12T10:00:00Z',
      updatedAt: '2025-02-12T10:00:00Z'
    },
    {
      id: 'post-2',
      title: 'The 2026 AI Infrastructure Blueprint: RAG, Fine-Tuning, or Autonomous Agents?',
      slug: '2026-ai-infrastructure-blueprint',
      excerpt: 'A pragmatic decision matrix for CTOs deciding between vector retrieval, domain adapter fine-tuning, and multi-agent systems for enterprise applications.',
      content: `Every enterprise technical leader faces the same strategic dilemma: should we build a RAG pipeline, fine-tune an open-source model, or invest in autonomous agents? Making the wrong architectural bet can waste quarters of engineering time and hundreds of thousands of dollars in cloud compute.

Here is the operational rubric we use at The Beezent to evaluate prospective technical architectures:

### When to Use Advanced Hybrid RAG
RAG remains the undisputed champion when your primary requirement is **verifiable factual recall over rapidly changing internal data**.
- **Strengths:** Zero training cost, immediate document updates, exact source attribution, and seamless document-level access control (ACLs).
- **Modern Best Practice:** Simple cosine similarity on naive chunks is obsolete. Production RAG in 2026 requires semantic chunking, dense vector retrieval paired with BM25 keyword matching, and cross-encoder re-ranking (such as Cohere Rerank or BGE-Reranker).

### When to Fine-Tune (or Distill to Small Language Models)
Fine-tuning is rarely about teaching a model new facts; it is about teaching a model **style, syntax, specialized ontologies, and execution discipline**.
- **Strengths:** Drastically lower token usage (using a 7B or 14B parameter distilled model instead of a 200B+ frontier model), reduced latency (sub-50ms token generation), and the ability to output strictly structured formats without conversational preamble.
- **Modern Best Practice:** Use parameter-efficient fine-tuning (PEFT/LoRA) on curated synthetic datasets to teach domain formatting, and pair it with private inference servers like vLLM.

### When to Deploy Autonomous Agents
Agents are necessary when a workflow requires **dynamic decision making, multi-step problem decomposition, and interaction with external systems**.
- **Strengths:** Can handle branching logic where the sequence of actions cannot be pre-programmed.
- **Warning:** Do not use agents for simple linear tasks. If a task can be expressed as a standard DAG or cron script, avoid introducing the non-determinism of an agent.`,
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Sarah Jenkins',
        role: 'Director of Machine Learning',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
      },
      category: 'Strategy & Engineering',
      tags: ['RAG', 'Fine-Tuning', 'Infrastructure', 'CTO Guide', 'LLMs'],
      status: 'PUBLISHED',
      publishDate: 'February 18, 2025',
      readTime: '8 min read',
      seoTitle: 'The 2026 AI Infrastructure Blueprint | The Beezent',
      seoDescription: 'Pragmatic technical comparison: RAG vs Fine-Tuning vs Autonomous Agents for enterprise technology leaders.',
      createdAt: '2025-02-18T11:00:00Z',
      updatedAt: '2025-02-18T11:00:00Z'
    },
    {
      id: 'post-3',
      title: 'Solving the 1% Failure Rate in Autonomous AI Pipelines: Guardrails & Human-in-the-Loop',
      slug: 'solving-the-1-percent-failure-rate-guardrails',
      excerpt: 'In enterprise automation, a 99% accuracy rate still produces thousands of critical errors per month. Here is how we build defense-in-depth safety layers.',
      content: `In an academic benchmark, a 99% accuracy score is cause for celebration. In an enterprise financial system processing 200,000 transactions a month, a 1% failure rate means **2,000 catastrophic errors reaching production ledgers every 30 days**.

To bridge the gap between AI demonstrations and production stability, engineering teams must implement defense-in-depth verification.

### Layer 1: Input Sanitization & Prompt Injection Protection
All external inputs—whether user messages, email bodies, or PDF metadata—must pass through heuristic and embedding-based classification gates before ever reaching the reasoning model. We sanitize suspicious instruction markers and strip hidden markdown payloads.

### Layer 2: Schema Constrained Decoding
Never allow an LLM to generate free-form text when a structured answer is required. By utilizing constrained grammar decoding (via Outlines, Instructor, or strict OpenAI/Gemini JSON schemas), we guarantee that the output syntactically cannot violate the required schema.

### Layer 3: Post-Generation Semantic Validation
Even valid JSON can contain semantic hallucinations (e.g., referencing an invoice number that does not exist in the database). Before any database write or external API call is dispatched, a deterministic validator checks foreign key relationships, balance conservation, and business logic constraints.

### Layer 4: Automated Confidence Calibration
Every prediction or extraction is scored against a calibrated confidence metric. Items falling below the established safety threshold are not guessed; they are flagged, placed into an isolation queue, and dispatched to human operators with pre-populated diff visualizations.`,
      coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Alex Chen',
        role: 'Chief AI Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      category: 'Reliability & Safety',
      tags: ['Guardrails', 'Safety', 'Enterprise Ops', 'Human-in-the-loop', 'Quality Assurance'],
      status: 'PUBLISHED',
      publishDate: 'February 24, 2025',
      readTime: '5 min read',
      seoTitle: 'Solving the 1% AI Failure Rate in Enterprise Pipelines | The Beezent',
      seoDescription: 'How to architect defense-in-depth guardrails, schema constraints, and human-in-the-loop escalation to achieve 99.99% operational reliability.',
      createdAt: '2025-02-24T09:00:00Z',
      updatedAt: '2025-02-24T09:00:00Z'
    },
    {
      id: 'post-4',
      title: 'How We Built an Enterprise Agent Orchestration Engine with 99.4% Task Accuracy',
      slug: 'enterprise-agent-orchestration-engine-accuracy',
      excerpt: 'An inside look into the architecture, tracing methodology, and evaluation harness behind our proprietary multi-agent framework.',
      content: `When building agents intended to run autonomously inside enterprise client networks, trial-and-error prompt tweaking is completely unacceptable. You cannot optimize what you do not rigorously measure.

In this deep dive, we outline the engineering decisions that allowed our agent orchestration framework to achieve 99.4% end-to-end task completion across our enterprise benchmark suite.

### Continuous Golden Dataset Evaluation
Every client integration begins with the compilation of a 200-scenario 'Golden Dataset' representing standard flows, adversarial inputs, edge cases, and catastrophic failure scenarios. Before any prompt modification, model swap, or tool definition change is approved, our automated CI pipeline runs the complete regression suite using LLM-as-a-judge and exact-match validators.

### Ephemeral Sub-Agent Spawning
Rather than allowing an agent session to accumulate hundreds of thousands of context tokens over time, our orchestrator spawns isolated, short-lived worker agents for specific sub-tasks. Each sub-agent receives only the minimum context required, performs its verification, and returns a clean, typed outcome back to the parent state machine before terminating.

### Complete Distributed Tracing
Every reasoning step, token expenditure, tool invocation latency, and intermediate response is logged with OpenTelemetry spans. If an agent executes an unexpected path, engineers can replay the exact state transition frame-by-frame.`,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'David Kim',
        role: 'Senior Systems Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      },
      category: 'Engineering & Tracing',
      tags: ['Tracing', 'Evaluation', 'OpenTelemetry', 'Benchmarking', 'Engineering'],
      status: 'PUBLISHED',
      publishDate: 'February 27, 2025',
      readTime: '7 min read',
      seoTitle: 'Building an Enterprise Agent Engine with 99.4% Accuracy | The Beezent',
      seoDescription: 'Inside look at the evaluation harness, ephemeral sub-agents, and distributed tracing powering The Beezent agent orchestration framework.',
      createdAt: '2025-02-27T14:00:00Z',
      updatedAt: '2025-02-27T14:00:00Z'
    },
    {
      id: 'post-5',
      title: 'Evaluating Agentic ROI: Real Operational Metrics That Matter to Leadership',
      slug: 'evaluating-agentic-roi-operational-metrics',
      excerpt: 'Moving past vanity metrics like token counts and chat interactions to measure true labor displacement, turnaround speed, and margin expansion.',
      content: `The easiest way for an enterprise AI initiative to lose executive sponsorship is failing to communicate progress in financial and operational terms that CFOs care about.

Too many engineering teams present status updates centered on 'number of prompts answered', 'tokens processed', or 'average latency'. These are vanity metrics. Leadership wants to know if operating margins improved, if revenue velocity accelerated, and if critical error rates declined.

### The Four Core ROI Pillars for Enterprise AI

1. **True Cycle Time Compression:** Measure the wall-clock time from when a business event occurs (such as an incoming customer dispute or loan application) to its verified conclusion. When cycle times drop from days to minutes, customer acquisition conversion naturally surges.
2. **Effective Labor Shift:** Rather than viewing automation as head-count reduction, quantify the redeployment of skilled human capital. When support engineers are freed from answering tier-1 status inquiries, how many high-value tier-3 customer accounts were they able to retain?
3. **Defect & Rework Elimination:** Manual data entry carries an inevitable 1–3% human error rate, which manifests in expensive downstream accounting adjustments and compliance fines. Demonstrating that an automated pipeline eliminated reconciliation errors directly proves cost avoidance.
4. **Marginal Scaling Cost:** If your business transaction volume doubles during peak season, what is the incremental operational cost? If the answer is linear headcount growth, your systems are not automated. If the answer is an additional $400 in API inference compute, you have achieved true software scalability.`,
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: 'Sarah Jenkins',
        role: 'Director of Machine Learning',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
      },
      category: 'Business & Leadership',
      tags: ['ROI', 'Leadership', 'Business Growth', 'Operational Metrics', 'Finance'],
      status: 'PUBLISHED',
      publishDate: 'March 01, 2025',
      readTime: '6 min read',
      seoTitle: 'Evaluating Enterprise Agentic ROI | The Beezent',
      seoDescription: 'How executive teams evaluate true ROI on AI agents and automation: cycle time compression, labor shift, and defect avoidance.',
      createdAt: '2025-03-01T10:00:00Z',
      updatedAt: '2025-03-01T10:00:00Z'
    }
  ],

  inquiries: [
    {
      id: 'inq-1',
      name: 'Victoria Sterling',
      email: 'v.sterling@apexlogistics.io',
      company: 'Apex Global Logistics',
      phone: '+1 (415) 882-9012',
      projectType: 'AI Automation',
      budgetRange: '$50,000 - $100,000',
      message: 'We are currently dispatching 300+ freight trucks daily across 4 hubs and need an autonomous agent pipeline to parse incoming broker bills of lading and match available trailers in real-time. Looking to start development within the next 3 weeks.',
      status: 'New',
      internalNotes: [
        {
          id: 'note-1',
          author: 'Alex Chen',
          note: 'Strong ICP fit. Reviewed their current logistics stack. Scheduled discovery call for Thursday.',
          createdAt: '2025-02-28T14:30:00Z'
        }
      ],
      createdAt: '2025-02-28T11:15:00Z',
      updatedAt: '2025-02-28T14:30:00Z'
    },
    {
      id: 'inq-2',
      name: 'Jonathan Reynolds',
      email: 'jreynolds@clarionhealth.com',
      company: 'Clarion Health Systems',
      phone: '+1 (617) 555-0199',
      projectType: 'AI Solutions',
      budgetRange: '$100,000+',
      message: 'Looking to build a private, HIPAA-compliant patient intake assistant that can ingest external faxed referral packets and map diagnostic notes into our Epic EHR system via FHIR API. Need a full technical feasibility assessment.',
      status: 'In Progress',
      internalNotes: [
        {
          id: 'note-2',
          author: 'Sarah Jenkins',
          note: 'Initial architecture review completed. Sent NDA and prepared HIPAA deployment blueprint.',
          createdAt: '2025-02-26T16:00:00Z'
        }
      ],
      createdAt: '2025-02-25T09:20:00Z',
      updatedAt: '2025-02-26T16:00:00Z'
    },
    {
      id: 'inq-3',
      name: 'Maya Patel',
      email: 'maya@fincrest.co',
      company: 'FinCrest Financial',
      projectType: 'AI Agents',
      budgetRange: '$25,000 - $50,000',
      message: 'We want to deploy an autonomous conversational SDR agent on our B2B fintech landing pages to qualify commercial loan seekers and book calls for our lending advisors.',
      status: 'Contacted',
      internalNotes: [
        {
          id: 'note-3',
          author: 'Marcus Vance',
          note: 'Sent product demo video and scheduling link for preliminary requirements intake.',
          createdAt: '2025-02-27T10:00:00Z'
        }
      ],
      createdAt: '2025-02-26T14:40:00Z',
      updatedAt: '2025-02-27T10:00:00Z'
    }
  ],

  media: [
    {
      id: 'med-1',
      name: 'beezent-neural-lattice.jpg',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      size: '420 KB',
      type: 'image/jpeg',
      alt: 'Beezent abstract neural network visualization with connected nodes and luminous blue accents',
      uploadedAt: '2025-01-10T10:00:00Z',
      width: 1200,
      height: 800
    },
    {
      id: 'med-2',
      name: 'logistics-fleet-control.jpg',
      url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      size: '560 KB',
      type: 'image/jpeg',
      alt: 'Logistics cargo transport and dispatch control center',
      uploadedAt: '2025-01-12T14:00:00Z',
      width: 1200,
      height: 800
    },
    {
      id: 'med-3',
      name: 'fintech-underwriting-data.jpg',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      size: '380 KB',
      type: 'image/jpeg',
      alt: 'Financial statement analysis and accounting charts',
      uploadedAt: '2025-01-15T09:00:00Z',
      width: 1200,
      height: 800
    },
    {
      id: 'med-4',
      name: 'beezent-engineering-team.jpg',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      size: '610 KB',
      type: 'image/jpeg',
      alt: 'Beezent senior AI architects and engineers collaborating around software architecture blueprint',
      uploadedAt: '2025-01-20T11:00:00Z',
      width: 1200,
      height: 800
    }
  ],

  users: [
    {
      id: 'usr-1',
      name: 'Alex Chen',
      email: 'alex.chen@beezent.ai',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: '2025-01-01T00:00:00Z',
      lastLoginAt: '2025-03-02T08:30:00Z'
    },
    {
      id: 'usr-2',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@beezent.ai',
      role: 'ADMIN',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      createdAt: '2025-01-05T00:00:00Z',
      lastLoginAt: '2025-03-01T15:45:00Z'
    },
    {
      id: 'usr-3',
      name: 'Marcus Vance',
      email: 'marcus.vance@beezent.ai',
      role: 'EDITOR',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      createdAt: '2025-01-10T00:00:00Z',
      lastLoginAt: '2025-02-28T18:10:00Z'
    }
  ],

  settings: {
    siteName: 'The Beezent',
    tagline: 'AI-Powered Products, Intelligent Automation & Scalable Software',
    logoUrl: '/logo/beezent-logo.svg',
    faviconUrl: '/logo/beezent-mark.svg',
    contactEmail: 'contact@beezent.ai',
    contactPhone: '+1 (800) 512-BEZZ',
    address: '548 Market Street, Suite 9200, San Francisco, CA 94104',
    socialLinks: {
      twitter: 'https://twitter.com/beezent_ai',
      linkedin: 'https://linkedin.com/company/the-beezent',
      github: 'https://github.com/the-beezent',
      youtube: 'https://youtube.com/@beezent'
    },
    footerText: '© 2025 The Beezent Inc. All rights reserved. Engineering AI agents and enterprise automation systems.',
    defaultSeoTitle: 'The Beezent | AI Agency, Automation & Software Engineering',
    defaultSeoDescription: 'Beezent builds AI-powered products, intelligent automation, and scalable software systems for ambitious businesses. Explore our AI agents, case studies, and engineering solutions.',
    googleAnalyticsId: 'G-BZNT2026AI'
  }
};
