import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, KeyRound, ArrowDownRight, ShieldCheck, Cpu, HardDrive, BarChart3, Info } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  shortName: string;
  category: string;
  icon: typeof Database;
  description: string;
  technologies: string[];
  reliability: string;
}

const STAGES: Stage[] = [
  {
    id: 'source',
    name: '1. Source Applications',
    shortName: 'Sources',
    category: 'Ingress',
    icon: Database,
    description:
      'Heterogeneous enterprise systems including ERP platforms, external vendor APIs, CRM software, and automated SFTP drops delivering transaction batches, financial ledgers, and operational records.',
    technologies: ['REST APIs', 'SFTP / SSH', 'JSON / CSV payloads', 'Webhook listeners'],
    reliability: 'Guaranteed idempotency tokens and batch delivery checkpoints prevent duplicate event ingestion.',
  },
  {
    id: 'auth',
    name: '2. Authentication & Authorization',
    shortName: 'Auth Gate',
    category: 'Security',
    icon: KeyRound,
    description:
      'Zero-trust security boundary. Manages OAuth 2.0 client credentials, dynamic access token refreshes, HMAC signature verification, and mutual TLS for secure client handshakes.',
    technologies: ['OAuth 2.0', 'JWT tokens', 'Azure Key Vault', 'IP Whitelisting'],
    reliability: 'Automatic token caching with pre-expiration renewal to avoid authentication latency bottlenecks.',
  },
  {
    id: 'ingestion',
    name: '3. Python Ingestion Engine',
    shortName: 'Ingestion',
    category: 'Compute',
    icon: Cpu,
    description:
      'Resilient Python microservices pull, paginate, and stream thousands of daily transactions from authenticated endpoints into staging buffers with exponential backoff on transient errors.',
    technologies: ['Python 3.11', 'FastAPI', 'AsyncIO / HTTPX', 'Paramiko (SFTP)'],
    reliability: 'Dead-letter queuing and circuit breakers isolate downstream systems from external API rate-limit spikes.',
  },
  {
    id: 'validation',
    name: '4. Schema & Data Quality Guard',
    shortName: 'Validation',
    category: 'Integrity',
    icon: ShieldCheck,
    description:
      'Every inbound record undergoes strict type checking, non-negative monetary rules, date boundary validation, and currency code harmonization before touching staging tables.',
    technologies: ['Pydantic', 'JSON Schema', 'dbt tests', 'Great Expectations pattern'],
    reliability: 'Automated quarantine tables preserve corrupt records for audit without failing the overarching pipeline run.',
  },
  {
    id: 'transformation',
    name: '5. SQL & dbt Transformations',
    shortName: 'Transform',
    category: 'Analytics Engine',
    icon: ArrowDownRight,
    description:
      'Modular dbt models compile incremental transformations, deduplication, financial currency conversion, and business dimension enrichment directly inside Snowflake.',
    technologies: ['Snowflake SQL', 'dbt Core', 'Clustering Keys', 'Materialized Views'],
    reliability: 'Optimized partitioning and lineage DAGs reduced Snowflake query execution time by 30%.',
  },
  {
    id: 'warehouse',
    name: '6. Enterprise Data Warehouse',
    shortName: 'Snowflake',
    category: 'Storage',
    icon: HardDrive,
    description:
      'Centralized analytical repository structured into raw staging, dimensional marts, and curated presentation layers. Enforces role-based data governance.',
    technologies: ['Snowflake', 'Time Travel', 'Zero-Copy Cloning', 'Data Governance'],
    reliability: 'Automated table maintenance and clustering ensure low-latency SLA compliance for critical reporting queries.',
  },
  {
    id: 'reporting',
    name: '7. Automated Reporting & BI',
    shortName: 'Reporting',
    category: 'Egress',
    icon: BarChart3,
    description:
      'Scheduled orchestration pipelines deliver consolidated financial reports, audit ledgers, and executive summary dashboards directly to stakeholders.',
    technologies: ['Azure DevOps Pipelines', 'Automated Email SFTP Dispatch', 'PowerBI / Tableau'],
    reliability: 'Decreased monthly reporting turnaround by 40% through end-to-end process automation.',
  },
];

export function ArchitectureDiagram() {
  const [selectedStage, setSelectedStage] = useState<Stage>(STAGES[2]); // Default to Ingestion

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-300">Architecture Demonstration: </strong>
          Illustrates high-level integration topology. Proprietary client endpoints, schemas, and credentials are obfuscated in accordance with confidentiality standards.
        </span>
      </div>

      {/* Interactive Diagram Pipeline Flow */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
          <span>PIPELINE TOPOLOGY (CLICK A NODE TO INSPECT)</span>
          <span className="text-emerald-400 font-semibold">{selectedStage.shortName} selected</span>
        </div>

        {/* Desktop Pipeline Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {STAGES.map((stage) => {
            const isSelected = selectedStage.id === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500 shadow-glow-emerald text-emerald-300 scale-105'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium font-sans line-clamp-1">{stage.shortName}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">{stage.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">STAGE ANALYSIS</div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mt-0.5">
                {selectedStage.name}
              </h3>
            </div>
            <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {selectedStage.category}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedStage.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Tech stack */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Technologies Used</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStage.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Reliability */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Reliability & SLA</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedStage.reliability}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
