// ─── Impact Section ───────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Medal } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const duration = 1600; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target]);

  return <span>{current}</span>;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const metrics = [
  {
    id: 'queries',
    value: 30,
    unit: '%',
    label: 'Faster Snowflake Queries',
    description: 'SQL and dbt model optimization at Jade Global',
  },
  {
    id: 'reporting',
    value: 40,
    unit: '%',
    label: 'Faster Monthly Reporting',
    description: 'Automation of financial reporting workflows',
  },
  {
    id: 'deployments',
    value: 35,
    unit: '%',
    label: 'Fewer Deployment Failures',
    description: 'Improved CI/CD pipeline quality gates',
  },
];

const achievements = [
  {
    id: 'steadfast',
    icon: Medal,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    title: 'Jade Steadfast Award (Q4 FY26)',
    year: 'Q4 FY26',
    description:
      'Recognized for delivery quality, ownership, and client impact in enterprise integration and data automation platforms at Jade Global.',
  },
  {
    id: 'sih',
    icon: Trophy,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/30',
    title: 'Smart India Hackathon Finalist',
    year: 'Oct 2023',
    description:
      'Shortlisted from over 10,000+ competing engineering teams nationwide in India\'s premier national engineering hackathon.',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function Impact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="impact"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Engineering Impact"
      className="relative py-24 md:py-32"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            Engineering Impact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Results That{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Matter
            </span>
          </h2>
        </motion.div>

        {/* Metric cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 grid gap-6 sm:grid-cols-3"
        >
          {metrics.map(({ id, value, unit, label, description }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm ring-1 ring-white/5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/8"
            >
              {/* Subtle glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-emerald-500/20 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="mb-3 flex items-baseline justify-center gap-1">
                <span
                  className="text-6xl font-extrabold tracking-tight text-emerald-400 sm:text-7xl"
                  aria-label={`${value} percent`}
                >
                  <AnimatedNumber target={value} inView={inView} />
                  {unit}
                </span>
              </div>

              <div
                className="mx-auto mb-3 h-px w-12 bg-emerald-500/40"
                aria-hidden="true"
              />

              <h3 className="text-base font-semibold text-white sm:text-lg">
                {label}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{description}</p>

              {/* Icon */}
              <div
                className="mt-4 flex justify-center"
                aria-hidden="true"
              >
                <TrendingUp className="h-5 w-5 text-emerald-500/50" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2"
        >
          {achievements.map(
            ({ id, icon: Icon, iconColor, iconBg, title, year, description }) => (
              <motion.div
                key={id}
                variants={cardVariants}
                className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/8 sm:p-8"
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      {title}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                      {year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {description}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Impact;

