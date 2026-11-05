// ─── About Section ────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/config';
import { useInView } from '../../hooks/useInView';

const stats = [
  { icon: '🏢', label: 'Current employer', value: 'Jade Global Software Pvt. Ltd.' },
  { icon: '🎓', label: 'College & Degree', value: 'G H Raisoni College of Engineering & Management (CGPA 9.04)' },
  { icon: '🏆', label: 'Hackathon', value: 'Smart India Hackathon Finalist (Oct 2023)' },
  { icon: '🏅', label: 'Recognition', value: 'Jade Steadfast Award (Q4 FY26)' },
  { icon: '📍', label: 'Location', value: 'Pune, India' },
  { icon: '🔥', label: 'Currently building with', value: 'Python, FastAPI, Snowflake, dbt, React' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: siteConfig.social.github,
    icon: Github,
    ariaLabel: 'GitHub profile',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: Linkedin,
    ariaLabel: 'LinkedIn profile',
  },
  {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    ariaLabel: 'Send email',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="About Me"
      className="relative py-24 md:py-32"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
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
            About Me
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Engineer{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Behind the Code
            </span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-12 lg:grid-cols-5"
        >
          {/* Left column – Biography (60%) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-6 lg:col-span-3"
          >
            <div className="space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>
                I'm a software engineer based in Pune, India, working at{' '}
                <span className="font-semibold text-emerald-400">
                  Jade Global Software
                </span>{' '}
                where I build Python services, REST API integrations, and data
                processing workflows for enterprise clients. My work supports
                production systems that handle thousands of daily transactions
                across financial, inventory, and reporting domains.
              </p>
              <p>
                I enjoy working at the intersection of backend engineering and
                data — designing integrations that reliably move information
                between systems, optimizing query performance, and building
                automation that removes manual overhead. I'm particularly
                interested in applying LLM-based tools to practical business
                workflows.
              </p>
              <p>
                I hold a B.Tech in Computer Engineering with Honors in Data
                Science{' '}
                <span className="font-semibold text-white">(CGPA 9.04/10)</span>{' '}
                from G H Raisoni College of Engineering & Management, Pune. Outside of work, I enjoy exploring new
                engineering tools, contributing to side projects, and staying
                current with AI and distributed systems developments.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map(({ label, href, icon: Icon, ariaLabel }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={ariaLabel}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right column – Stats glass card (40%) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/5 sm:p-8">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-400">
                Quick Facts
              </h3>
              <ul className="space-y-4" role="list">
                {stats.map(({ icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 text-xl leading-none"
                      aria-hidden="true"
                    >
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-white break-words">
                        {value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Location pill */}
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span className="text-sm text-emerald-300">
                  Open to full-time opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

