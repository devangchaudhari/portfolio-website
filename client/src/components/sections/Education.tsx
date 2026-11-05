// ─── Education Section ────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, Award } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

export function Education() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Education"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            Education
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Academic{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Background
            </span>
          </h2>
        </motion.div>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm ring-1 ring-white/5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/8 sm:p-10">
            {/* Hover glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.06), transparent 60%)',
              }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Icon */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10"
                aria-hidden="true"
              >
                <GraduationCap className="h-7 w-7 text-emerald-400" />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      G H Raisoni College of Engineering & Management Pune
                    </h3>
                    <p className="mt-1 text-base font-medium text-emerald-400">
                      B.Tech Computer Engineering with Honors in Data Science
                    </p>
                  </div>

                  {/* CGPA badge */}
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
                    <Award className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span className="text-sm font-bold text-emerald-300">
                      CGPA 9.04 / 10
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>2021 – 2025</span>
                  <span
                    className="mx-1 inline-block h-1 w-1 rounded-full bg-slate-600"
                    aria-hidden="true"
                  />
                  <span>Pune, India</span>
                </div>

                {/* Highlights */}
                <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Academic highlights">
                  {[
                    'Data Science Honors',
                    'Smart India Hackathon Finalist',
                    'Distributed Systems',
                    'Machine Learning',
                    'Database Engineering',
                  ].map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;

