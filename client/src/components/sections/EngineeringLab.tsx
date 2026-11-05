import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, ArrowLeftRight, FlaskConical } from 'lucide-react';
import { ApiExplorer } from './demos/ApiExplorer';
import { PipelineVisualizer } from './demos/PipelineVisualizer';
import { AiJobMatcher } from './demos/AiJobMatcher';
import { useInView } from '../../hooks/useInView';

type TabKey = 'api' | 'pipeline' | 'ai';

interface TabConfig {
  key: TabKey;
  label: string;
  badge: string;
  icon: typeof Terminal;
  description: string;
}

const TABS: TabConfig[] = [
  {
    key: 'api',
    label: 'API Integration Explorer',
    badge: 'REST & OAuth 2.0',
    icon: Terminal,
    description: 'Inspect authenticated enterprise REST endpoints, response payloads, error simulations, and token headers.',
  },
  {
    key: 'pipeline',
    label: 'Data Pipeline Visualizer',
    badge: 'ETL & Validation',
    icon: ArrowLeftRight,
    description: 'Track sample financial transactions moving through ingestion, validation, transformations, and warehouse loading.',
  },
  {
    key: 'ai',
    label: 'AI Match & Outreach Lab',
    badge: 'LLM & Workflows',
    icon: Cpu,
    description: 'Analyze candidate technical qualifications against job requirements and generate targeted recruiter communications.',
  },
];

export function EngineeringLab() {
  const [activeTab, setActiveTab] = useState<TabKey>('api');
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="lab" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="section-label">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>ENGINEERING LAB</span>
          </div>
          <h2 className="section-title">Interactive Demonstrations</h2>
          <p className="section-subtitle">
            Explore live working simulations of core backend integrations, data validation pipelines, and intelligent workflow automation.
          </p>
        </motion.div>

        {/* Tab Selection Bar */}
        <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-[var(--border-subtle)] backdrop-blur-md mb-8">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-1 flex items-center justify-between sm:justify-start gap-3 px-4 py-3 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-400 bg-slate-800/90 shadow-md border border-emerald-500/30'
                    : 'text-[var(--text-secondary)] hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="text-left font-sans text-xs font-semibold sm:text-xs">
                    {tab.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono hidden md:inline-block ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] shadow-glass">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'api' && <ApiExplorer />}
              {activeTab === 'pipeline' && <PipelineVisualizer />}
              {activeTab === 'ai' && <AiJobMatcher />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default EngineeringLab;

