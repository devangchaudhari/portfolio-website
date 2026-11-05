import { motion } from 'framer-motion';
import { Server, Monitor, Database, Cloud, Cpu, GitMerge, Terminal, Sparkles, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { skillCategories, type SkillCategory } from '../../data/skills';
import { useInView } from '../../hooks/useInView';

// ─── Icon map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Server,
  Monitor,
  Database,
  Cloud,
  Cpu,
  GitMerge,
  Terminal,
};

// ─── Category Subtitles & Badges ──────────────────────────────────────────────
const categoryMeta: Record<string, { subtitle: string; badge: string }> = {
  languages: {
    subtitle: 'Core programming and scripting languages used across backend microservices, data modeling, automation & frontend.',
    badge: 'Languages',
  },
  backend: {
    subtitle: 'Enterprise REST services, OAuth 2.0 / JWT security, API connectors, SFTP workflows, asynchronous microservices & third-party integrations.',
    badge: 'Backend Architecture',
  },
  data: {
    subtitle: 'Snowflake data pipelines, dbt modeling, SQL query execution optimization, ETL workflows & relational/NoSQL databases.',
    badge: 'Data Platforms',
  },
  cloud: {
    subtitle: 'Azure DevOps CI/CD pipelines, Docker containerization, Azure Logic Apps, AWS Lambda & automated deployment gates.',
    badge: 'Cloud & Infrastructure',
  },
  ai: {
    subtitle: 'LangGraph multi-agent systems, LangChain orchestration, RAG architectures, prompt engineering & practical LLM application integrations.',
    badge: 'GenAI & Agentic AI',
  },
  frontend: {
    subtitle: 'Modern responsive SPAs, React Data Grid, ApexCharts interactive dashboards, Vite tooling & Tailwind design systems.',
    badge: 'UI & Visualization',
  },
  systems: {
    subtitle: 'Linux OS internals, bash automation, socket and networking fundamentals, production operations & diagnostics.',
    badge: 'Systems & OS',
  },
  practices: {
    subtitle: 'Automated test suites, L2/L3 production support, root-cause analysis, defect resolution & engineering code review standards.',
    badge: 'Reliability & Quality',
  },
};

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Big Skill Box Component ──────────────────────────────────────────────────
function SkillBigBox({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = iconMap[category.icon] ?? Server;
  const isEmerald = category.color === 'emerald';
  const meta = categoryMeta[category.id] || {
    subtitle: 'Technical competencies, tools, and production engineering practices.',
    badge: category.label,
  };

  // Sort: highlighted first, then rest
  const sortedSkills = [...category.skills].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  const accentBorder = isEmerald
    ? 'hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]'
    : 'hover:border-cyan-500/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.12)]';

  const accentIcon = isEmerald ? 'text-emerald-400' : 'text-cyan-400';
  const accentBg = isEmerald
    ? 'bg-emerald-500/10 border-emerald-500/25'
    : 'bg-cyan-500/10 border-cyan-500/25';

  const badgeClass = isEmerald
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

  const highlightedSkills = sortedSkills.filter(s => s.highlight);
  const otherSkills = sortedSkills.filter(s => !s.highlight);

  return (
    <motion.div
      variants={cardVariants}
      className={`glass-card p-6 sm:p-8 rounded-2xl flex flex-col gap-5 transition-all duration-300 border border-[var(--border-subtle)] ${accentBorder}`}
    >
      {/* ── Top Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-start gap-3.5">
          <div className={`flex items-center justify-center w-11 h-11 rounded-xl border shrink-0 ${accentBg}`}>
            <Icon className={`w-5 h-5 ${accentIcon}`} strokeWidth={1.8} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                {category.label}
              </h3>
              <span className="text-xs font-mono text-slate-500">
                ({category.skills.length})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1 max-w-2xl">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Right-aligned Badge */}
        <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-semibold border ${badgeClass} shrink-0`}>
          {meta.badge}
        </span>
      </div>

      {/* ── Skills Cloud ── */}
      <div className="space-y-4">
        {/* Core & Production Specialties */}
        {highlightedSkills.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Core & Production Specialties</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {highlightedSkills.map((skill) => (
                <span
                  key={skill.name}
                  className={
                    isEmerald
                      ? 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/25 transition-all'
                      : 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/25 transition-all'
                  }
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isEmerald ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                  />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supporting Ecosystem & Tools */}
        {otherSkills.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              <Layers className="w-3 h-3 text-slate-500" />
              <span>Ecosystem & Frameworks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {otherSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-slate-600 hover:text-white transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <p className="section-label">
            <span className="w-6 h-px bg-emerald-400 inline-block" />
            Technical Competencies
          </p>
          <h2 className="section-title">Technical Skills & Platforms</h2>
          <p className="section-subtitle">
            A comprehensive breakdown of the languages, enterprise frameworks, data platforms, and cloud tools I use to build scalable systems.
          </p>
        </div>

        {/* Big Boxes List matching Professional Experience layout */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6"
        >
          {skillCategories.map((category, index) => (
            <SkillBigBox key={category.id} category={category} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
