import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Award, Layers, Terminal, Sparkles, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArchitectureDiagram } from '../components/demos/ArchitectureDiagram';
import { InventoryDemo } from '../components/demos/InventoryDemo';
import { JobAutoPilotDemo } from '../components/demos/JobAutoPilotDemo';
import { AuditIQDemo } from '../components/demos/AuditIQDemo';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="glass-card max-w-md w-full p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-100">Project Not Found</h1>
          <p className="text-xs text-slate-400">
            The requested project specification "{slug}" does not exist in the portfolio catalog.
          </p>
          <Link to="/" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5 mt-2">
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-5xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO ALL PROJECTS
          </Link>

          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            {project.category}
          </span>
        </div>

        {/* Project Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-700/80 text-emerald-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Problem, Solution, Contribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5">
              <span>01. BUSINESS CHALLENGE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{project.problem}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <span>02. ARCHITECTURAL SOLUTION</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>03. INDIVIDUAL ROLE & IMPACT</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{project.contribution}</p>
          </div>
        </div>

        {/* Interactive Demo Section */}
        {project.demoType && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>LIVE INTERACTIVE SIMULATION</span>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl border border-emerald-500/20 shadow-glass">
              {project.demoType === 'architecture' && <ArchitectureDiagram />}
              {project.demoType === 'inventory' && <InventoryDemo />}
              {project.demoType === 'jobautopilot' && <JobAutoPilotDemo />}
              {project.demoType === 'auditiq' && <AuditIQDemo />}
            </div>
          </div>
        )}

        {/* Technical Highlights & Measurable Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Highlights */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              <Layers className="w-4 h-4" />
              <span>KEY ENGINEERING DECISIONS</span>
            </div>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results if available */}
          {project.results && project.results.length > 0 && (
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                <Award className="w-4 h-4" />
                <span>MEASURABLE BUSINESS IMPACT</span>
              </div>
              <ul className="space-y-3">
                {project.results.map((res, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Links & CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> Inspect Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Live System Demo
              </a>
            )}
          </div>

          <Link
            to="/#contact"
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Have a question about this architecture? Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
