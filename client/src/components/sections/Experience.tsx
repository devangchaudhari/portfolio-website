import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { experiences, type ExperienceItem } from '../../data/experience';
import { useInView } from '../../hooks/useInView';

// ─── Badge component ──────────────────────────────────────────────────────────

function RoleBadge({ type }: { type: ExperienceItem['type'] }) {
  const styles: Record<ExperienceItem['type'], string> = {
    'full-time':
      'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    internship:
      'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
    contract:
      'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    freelance:
      'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  };
  const labels: Record<ExperienceItem['type'], string> = {
    'full-time': 'Full-Time',
    internship: 'Internship',
    contract: 'Contract',
    freelance: 'Freelance',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────────

function MetricCard({
  metric,
  index,
}: {
  metric: { label: string; value: string; description: string };
  index: number;
}) {
  const colors = [
    { value: 'text-emerald-400', border: 'hover:border-emerald-500/30' },
    { value: 'text-cyan-400', border: 'hover:border-cyan-500/30' },
    { value: 'text-teal-400', border: 'hover:border-teal-500/30' },
  ];
  const color = colors[index % colors.length];

  return (
    <div className={`glass-card p-4 flex flex-col gap-1 transition-all duration-300 ${color.border}`}>
      <span className={`text-2xl font-bold font-mono ${color.value}`}>
        {metric.label}
      </span>
      <span className="text-xs font-semibold text-slate-300 leading-snug">
        {metric.value}
      </span>
      <span className="text-xs text-slate-500 leading-relaxed">
        {metric.description}
      </span>
    </div>
  );
}

// ─── Experience card ──────────────────────────────────────────────────────────

function ExperienceCard({
  experience,
  index,
  isInView,
}: {
  experience: ExperienceItem;
  index: number;
  isInView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.55,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-[2.35rem] top-6 w-4 h-4 rounded-full border-2 border-emerald-500 bg-[var(--bg-primary)] z-10 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
        aria-hidden="true"
      />

      <div className="glass-card p-6 hover:border-emerald-500/20 transition-all duration-300">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex flex-col gap-1.5">
            {/* Company + link */}
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100">
                {experience.company}
              </h3>
              {experience.companyUrl && (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${experience.company} website`}
                  className="text-slate-500 hover:text-emerald-400 transition-colors duration-200"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            {/* Role */}
            <p className="text-sm font-semibold text-emerald-400">
              {experience.role}
            </p>
          </div>

          {/* Badge */}
          <RoleBadge type={experience.type} />
        </div>

        {/* Meta: dates + location */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-slate-600" />
            {experience.startDate} – {experience.endDate}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-slate-600" />
            {experience.location}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          {experience.summary}
        </p>

        {/* Metrics */}
        {experience.metrics && experience.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {experience.metrics.map((metric, i) => (
              <MetricCard key={i} metric={metric} index={i} />
            ))}
          </div>
        )}

        {/* Show details toggle */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-400 transition-colors duration-200 mb-1 focus-visible:outline-none focus-visible:text-emerald-400"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp size={14} />
              Hide details
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Show details
            </>
          )}
        </button>

        {/* Expandable highlights */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-3 mb-5 space-y-2">
                {experience.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {experience.tech.map((tech) => (
            <span key={tech} className="skill-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  // Merge refs
  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      id="experience"
      ref={setRefs}
      className="section-padding"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-container">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Professional Experience
          </span>
          <h2 className="section-title">Where I've Built Things</h2>
          <p className="section-subtitle">
            Designing and delivering software that runs at enterprise scale.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px ml-[-0.5px]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #10b981 10%, #10b981 90%, transparent)',
              opacity: 0.3,
              left: '0',
            }}
            aria-hidden="true"
          />

          {/* Cards */}
          <div className="pl-10 flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isInView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;

