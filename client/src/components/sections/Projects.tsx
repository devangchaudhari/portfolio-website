import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Github } from 'lucide-react';
import { projects, type Project } from '../../data/projects';
import { useInView } from '../../hooks/useInView';

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
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const MAX_VISIBLE_TAGS = 4;
  const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = project.techStack.length - MAX_VISIBLE_TAGS;

  const externalHref = project.githubUrl ?? project.liveUrl;
  const externalLabel = project.githubUrl ? 'GitHub' : 'Live Demo';
  const ExternalIcon = project.githubUrl ? Github : ExternalLink;

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card flex flex-col overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
    >
      {/* Cover gradient header */}
      <div className={`relative h-28 bg-gradient-to-br ${project.coverColor} flex items-end p-4`}>
        {/* Category badge */}
        <span className="absolute top-3 right-3 inline-block px-2.5 py-1 rounded-md text-xs font-mono bg-black/40 text-slate-300 border border-white/10 backdrop-blur-sm">
          {project.category}
        </span>
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/60 to-transparent" />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title & description */}
        <div>
          <h3 className="text-lg font-bold text-slate-100 leading-snug mb-2 group-hover:text-emerald-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono bg-slate-700/50 text-slate-400 border border-slate-600/40">
              +{overflowCount} more
            </span>
          )}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <Link
            to={`/projects/${project.slug}`}
            className="btn-secondary text-xs px-4 py-2"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {externalHref && (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
            >
              <ExternalIcon className="w-3.5 h-3.5" />
              {externalLabel}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.07, triggerOnce: true });

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14">
          <p className="section-label">
            <span className="w-6 h-px bg-emerald-400 inline-block" />
            Featured Projects
          </p>
          <h2 className="section-title">Things I&apos;ve Built</h2>
          <p className="section-subtitle">
            Real engineering work. Practical problems. Measurable results.
          </p>
        </div>

        {/* Project grid — 2×2 on lg, 1 col on mobile */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View all projects CTA */}
        <div className="mt-12 flex justify-center">
          <Link to="/projects" className="btn-secondary">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;

