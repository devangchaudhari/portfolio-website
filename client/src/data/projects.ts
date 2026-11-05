// ─── Projects Data ────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  contribution: string;
  techStack: string[];
  highlights: string[];
  results?: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoType?: 'architecture' | 'inventory' | 'jobautopilot' | 'auditiq';
  featured: boolean;
  category: string;
  coverColor: string;
}

export const projects: Project[] = [
  {
    id: 'enterprise-data-integration',
    slug: 'enterprise-data-integration',
    title: 'Enterprise Data Integration & Workflow Automation Platform',
    shortDescription:
      'End-to-end system enabling enterprise applications to reliably exchange data via APIs, Python processing, SQL transformations, and secure SFTP workflows.',
    problem:
      'Enterprise clients required reliable, secure, and auditable data exchange between disparate systems — including ERP platforms, financial reporting tools, and third-party APIs — with zero data-loss tolerance and strict compliance requirements.',
    solution:
      'Built a multi-stage data integration platform handling authentication, ingestion, validation, transformation, and delivery. Architected Python services for API and SFTP ingestion, implemented dbt models for SQL transformations in Snowflake, and established CI/CD automation to reduce deployment risk.',
    contribution:
      'Sole backend engineer responsible for designing and implementing the ingestion and transformation pipeline. Authored Python integration services, Snowflake dbt models, SFTP exchange workflows, and automated validation tests. Collaborated on Azure DevOps CI/CD pipeline improvements and production incident response.',
    techStack: [
      'Python',
      'SQL',
      'Snowflake',
      'dbt',
      'Azure Logic Apps',
      'REST APIs',
      'SFTP',
      'OAuth 2.0',
      'Azure DevOps',
      'Automated Testing',
    ],
    highlights: [
      'Multi-stage pipeline: ingestion → validation → transformation → delivery',
      'OAuth 2.0 authenticated API integrations with external enterprise systems',
      'Secure SFTP workflows with retry logic and data integrity verification',
      'dbt models for Snowflake SQL transformations with lineage tracking',
      'Automated validation tests catching data quality issues before they reach reporting',
      'CI/CD pipeline on Azure DevOps with pre-deployment quality gates',
    ],
    results: [
      '30% reduction in Snowflake query execution time through query and model optimization',
      '40% reduction in monthly financial reporting turnaround through workflow automation',
      '35% reduction in deployment failures via enhanced CI/CD validation',
      'Production systems reliably processing thousands of daily transactions',
    ],
    demoType: 'architecture',
    featured: true,
    category: 'Data Engineering',
    coverColor: 'from-emerald-600/20 to-teal-600/20',
  },
  {
    id: 'inventory-management-system',
    slug: 'inventory-management-system',
    title: 'End-to-End Inventory Management System',
    shortDescription:
      'Full-stack inventory tracking system with stock management, role-based access, approval workflows, and a live analytics dashboard.',
    problem:
      'Teams needed a centralized inventory system to track stock levels, manage transfers across locations, enforce approval workflows, and provide real-time visibility into inventory health — replacing manual spreadsheet-based processes.',
    solution:
      'Built a complete full-stack application with a React + Vite frontend, FastAPI backend, and MySQL database. Implemented role-based access control, multi-stage approval workflows, inventory search and filter, and a dashboard with charts showing stock trends and category breakdowns.',
    contribution:
      'Designed and implemented the full application from database schema to UI. Built the FastAPI backend with JWT authentication and RBAC, MySQL data model, React frontend with Tailwind CSS, and all business logic including approval workflow state management.',
    techStack: [
      'React.js',
      'FastAPI',
      'Python',
      'MySQL',
      'Tailwind CSS',
      'Vite',
      'React Data Grid',
      'ApexCharts',
      'JWT',
      'RBAC',
    ],
    highlights: [
      'Inventory tracking with real-time stock level updates and alerts',
      'Role-based access control — Admin, Manager, and Viewer roles with separate permissions',
      'Multi-stage approval workflow for stock transfer requests',
      'Interactive dashboard with category charts, stock history, and low-stock alerts',
      'Advanced search and filter with category, location, and status facets',
      'JWT authentication with secure session management',
    ],
    results: [
      'Replaced manual spreadsheet processes with an auditable, role-controlled system',
      'Reduced inventory discrepancy reports through automated validation and approval workflows',
    ],
    demoType: 'inventory',
    featured: true,
    category: 'Full-Stack',
    coverColor: 'from-cyan-600/20 to-blue-600/20',
  },
  {
    id: 'jobautopilot',
    slug: 'jobautopilot',
    title: 'JobAutoPilot — AI-Powered Job Application Automation',
    shortDescription:
      'AI-powered job application tracker that generates tailored outreach messages, tracks application status, and matches candidate profiles to job descriptions.',
    problem:
      'Job seekers spend significant time manually customizing applications, tracking status across platforms, and writing personalized outreach — a process that is error-prone, inconsistent, and time-consuming at scale.',
    solution:
      'Built a full-stack application combining React, Node.js, and SQLite with LLM API integration. Features intelligent job matching, tailored outreach generation, application status tracking, and profile management. Includes a local simulation mode when API keys are unavailable.',
    contribution:
      'Designed and implemented the full application architecture, LLM integration layer, job matching algorithm, outreach generation pipeline, and React frontend. Implemented a deterministic fallback mode for demonstration without API credentials.',
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'SQLite',
      'REST APIs',
      'LLM APIs',
      'Apify',
      'Nodemailer',
    ],
    highlights: [
      'Job tracking with status management (Applied, Screening, Interview, Offer, Rejected)',
      'AI-powered outreach generation using LLM APIs with structured prompt engineering',
      'Skill matching engine that identifies matched skills and gaps for each job',
      'Profile management and application history tracking',
      'Deterministic simulation mode for environments without API keys',
      'REST API with SQLite persistence — zero external database setup required',
    ],
    demoType: 'jobautopilot',
    featured: true,
    category: 'AI / Full-Stack',
    coverColor: 'from-violet-600/20 to-purple-600/20',
  },
  {
    id: 'auditiq',
    slug: 'auditiq',
    title: 'AuditIQ — AI Expense Risk Intelligence',
    shortDescription:
      'AI-powered expense auditing tool that identifies duplicate claims, policy violations, and risk patterns using configurable LLM-based analysis.',
    problem:
      'Finance and operations teams struggle to manually audit large volumes of expense submissions for policy violations, duplicate reimbursement attempts, and anomalous patterns — especially at scale.',
    solution:
      'Built an interactive expense auditing workflow using synthetic data. Leverages LLM-based analysis to generate natural-language risk explanations, identify potentially duplicate claims, and flag policy violations. All demonstrations use synthetic fictional data.',
    contribution:
      'Designed the LLM-powered risk analysis pipeline, expense data model, duplicate detection heuristics, and interactive demonstration frontend. Implemented structured output prompting to ensure reliable, parseable LLM responses.',
    techStack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Gemini API', 'Tailwind CSS'],
    highlights: [
      'Synthetic expense data analysis — no real financial data ever used',
      'AI-generated natural-language risk explanations for each flagged item',
      'Duplicate claim detection using fuzzy matching and temporal clustering',
      'Policy violation flagging with configurable rule sets',
      'Interactive expense inspector with filter and risk scoring',
    ],
    demoType: 'auditiq',
    featured: true,
    category: 'AI / FinTech',
    coverColor: 'from-orange-600/20 to-red-600/20',
  },
];
