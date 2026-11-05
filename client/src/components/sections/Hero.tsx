import { motion } from 'framer-motion';
import {
  MapPin,
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Database,
  Server,
  Cpu,
} from 'lucide-react';
import { siteConfig } from '../../data/config';
import { scrollToSection } from '../../hooks/useActiveSection';

// ─── Systems Diagram SVG ──────────────────────────────────────────────────────

function SystemsDiagram() {
  return (
    <svg
      viewBox="0 0 400 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/* Animated gradient for flowing lines */}
        <linearGradient id="flow-h" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flow-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="node-db" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="node-api" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="node-transform" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="node-report" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Background grid dots ── */}
      {[60, 120, 180, 240, 300, 360].map(x =>
        [60, 120, 180, 240, 300].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#10b981" fillOpacity="0.12" />
        ))
      )}

      {/* ── Static connector lines ── */}
      {/* DB → API (horizontal) */}
      <line x1="130" y1="90" x2="210" y2="90" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1.5" />
      {/* API → Transform (vertical) */}
      <line x1="250" y1="115" x2="250" y2="185" stroke="#06b6d4" strokeOpacity="0.2" strokeWidth="1.5" />
      {/* Transform → Report (horizontal, reversed) */}
      <line x1="210" y1="225" x2="130" y2="225" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1.5" />
      {/* DB → Report (vertical) */}
      <line x1="90" y1="115" x2="90" y2="200" stroke="#10b981" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />

      {/* ── Animated flowing line: DB → API ── */}
      <line x1="130" y1="90" x2="210" y2="90" stroke="url(#flow-h)" strokeWidth="2" filter="url(#glow)">
        <animate attributeName="strokeDashoffset" from="80" to="0" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite" />
      </line>

      {/* ── Animated flowing line: API → Transform ── */}
      <line x1="250" y1="115" x2="250" y2="185" stroke="url(#flow-v)" strokeWidth="2" filter="url(#glow)">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2.0s" begin="0.5s" repeatCount="indefinite" />
      </line>

      {/* ── Animated flowing line: Transform → Report ── */}
      <line x1="210" y1="225" x2="130" y2="225" stroke="url(#flow-h)" strokeWidth="2" filter="url(#glow)">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" begin="1.0s" repeatCount="indefinite" />
      </line>

      {/* ── Particle dots on lines ── */}
      {/* Dot: DB → API */}
      <circle r="3.5" fill="#10b981" filter="url(#glow)">
        <animateMotion dur="1.8s" repeatCount="indefinite">
          <mpath href="#path-db-api" />
        </animateMotion>
      </circle>
      <path id="path-db-api" d="M130,90 L210,90" stroke="none" fill="none" />

      {/* Dot: API → Transform */}
      <circle r="3.5" fill="#06b6d4" filter="url(#glow)">
        <animateMotion dur="2.0s" begin="0.5s" repeatCount="indefinite">
          <mpath href="#path-api-transform" />
        </animateMotion>
      </circle>
      <path id="path-api-transform" d="M250,115 L250,185" stroke="none" fill="none" />

      {/* Dot: Transform → Report */}
      <circle r="3.5" fill="#10b981" filter="url(#glow)">
        <animateMotion dur="1.8s" begin="1.0s" repeatCount="indefinite">
          <mpath href="#path-transform-report" />
        </animateMotion>
      </circle>
      <path id="path-transform-report" d="M210,225 L130,225" stroke="none" fill="none" />

      {/* ═══════════════════════════════════════════
          NODE 1 — DATABASE  (top-left, cx=90 cy=90)
      ═══════════════════════════════════════════ */}
      <rect x="30" y="58" width="100" height="64" rx="12" fill="url(#node-db)" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
      {/* Pulsing ring */}
      <rect x="30" y="58" width="100" height="64" rx="12" stroke="#10b981" strokeOpacity="0" strokeWidth="2" fill="none">
        <animate attributeName="strokeOpacity" values="0;0.4;0" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="rx" values="12;16;12" dur="2.5s" repeatCount="indefinite" />
      </rect>
      {/* DB icon – cylinder shape */}
      <ellipse cx="80" cy="78" rx="12" ry="4" fill="none" stroke="#10b981" strokeWidth="1.5" />
      <line x1="68" y1="78" x2="68" y2="90" stroke="#10b981" strokeWidth="1.5" />
      <line x1="92" y1="78" x2="92" y2="90" stroke="#10b981" strokeWidth="1.5" />
      <ellipse cx="80" cy="90" rx="12" ry="4" fill="none" stroke="#10b981" strokeWidth="1.5" />
      <text x="80" y="113" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="600">Database</text>

      {/* ═══════════════════════════════════════════
          NODE 2 — API  (top-right, cx=250 cy=90)
      ═══════════════════════════════════════════ */}
      <rect x="210" y="62" width="80" height="56" rx="12" fill="url(#node-api)" stroke="#06b6d4" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="210" y="62" width="80" height="56" rx="12" stroke="#06b6d4" strokeOpacity="0" strokeWidth="2" fill="none">
        <animate attributeName="strokeOpacity" values="0;0.4;0" dur="2.8s" begin="0.6s" repeatCount="indefinite" />
      </rect>
      {/* Server/API icon */}
      <rect x="236" y="74" width="28" height="6" rx="2" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      <rect x="236" y="84" width="28" height="6" rx="2" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6" />
      <circle cx="239" cy="77" r="1.5" fill="#06b6d4" />
      <text x="250" y="108" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="600">API</text>

      {/* ═══════════════════════════════════════════
          NODE 3 — TRANSFORM  (bottom-right, cx=250 cy=215)
      ═══════════════════════════════════════════ */}
      <rect x="195" y="188" width="110" height="56" rx="12" fill="url(#node-transform)" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="195" y="188" width="110" height="56" rx="12" stroke="#10b981" strokeOpacity="0" strokeWidth="2" fill="none">
        <animate attributeName="strokeOpacity" values="0;0.4;0" dur="3.0s" begin="1.0s" repeatCount="indefinite" />
      </rect>
      {/* CPU / Transform icon */}
      <rect x="239" y="200" width="22" height="22" rx="3" fill="none" stroke="#10b981" strokeWidth="1.5" />
      <line x1="244" y1="200" x2="244" y2="196" stroke="#10b981" strokeWidth="1.5" />
      <line x1="250" y1="200" x2="250" y2="196" stroke="#10b981" strokeWidth="1.5" />
      <line x1="256" y1="200" x2="256" y2="196" stroke="#10b981" strokeWidth="1.5" />
      <line x1="244" y1="222" x2="244" y2="226" stroke="#10b981" strokeWidth="1.5" />
      <line x1="250" y1="222" x2="250" y2="226" stroke="#10b981" strokeWidth="1.5" />
      <line x1="256" y1="222" x2="256" y2="226" stroke="#10b981" strokeWidth="1.5" />
      <line x1="239" y1="206" x2="235" y2="206" stroke="#10b981" strokeWidth="1.5" />
      <line x1="239" y1="212" x2="235" y2="212" stroke="#10b981" strokeWidth="1.5" />
      <line x1="261" y1="206" x2="265" y2="206" stroke="#10b981" strokeWidth="1.5" />
      <line x1="261" y1="212" x2="265" y2="212" stroke="#10b981" strokeWidth="1.5" />
      <text x="250" y="236" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="600">Transform</text>

      {/* ═══════════════════════════════════════════
          NODE 4 — REPORT  (bottom-left, cx=90 cy=215)
      ═══════════════════════════════════════════ */}
      <rect x="30" y="188" width="100" height="56" rx="12" fill="url(#node-report)" stroke="#06b6d4" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="30" y="188" width="100" height="56" rx="12" stroke="#06b6d4" strokeOpacity="0" strokeWidth="2" fill="none">
        <animate attributeName="strokeOpacity" values="0;0.4;0" dur="2.6s" begin="1.4s" repeatCount="indefinite" />
      </rect>
      {/* Chart / Report icon */}
      <rect x="68" y="209" width="6" height="12" rx="1" fill="#06b6d4" fillOpacity="0.8" />
      <rect x="78" y="204" width="6" height="17" rx="1" fill="#06b6d4" />
      <rect x="88" y="207" width="6" height="14" rx="1" fill="#06b6d4" fillOpacity="0.6" />
      <line x1="66" y1="221" x2="96" y2="221" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
      <text x="80" y="236" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="600">Report</text>

      {/* ── Orbital decorations ── */}
      <circle cx="170" cy="157" r="30" stroke="#10b981" strokeOpacity="0.08" strokeWidth="1" fill="none" strokeDasharray="6 4">
        <animateTransform attributeName="transform" type="rotate" from="0 170 157" to="360 170 157" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="157" r="50" stroke="#06b6d4" strokeOpacity="0.05" strokeWidth="1" fill="none" strokeDasharray="10 6">
        <animateTransform attributeName="transform" type="rotate" from="360 170 157" to="0 170 157" dur="30s" repeatCount="indefinite" />
      </circle>

      {/* ── Center label ── */}
      <text x="170" y="152" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">data pipeline</text>
      <text x="170" y="164" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace" fontWeight="700">● RUNNING</text>
    </svg>
  );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const diagramVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-grid overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Radial glow blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10 w-full py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT: Text Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to Opportunities
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              I build reliable software that{' '}
              <span className="accent-gradient">
                moves data, automates work,
              </span>{' '}
              and solves real business problems.
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 leading-relaxed max-w-xl"
            >
              Software engineer focused on backend systems, full-stack
              applications, enterprise integrations, data pipelines, and
              practical AI automation.
            </motion.p>

            {/* Meta row: location + experience */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-sm text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-500" />
                <span>{siteConfig.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Database size={14} className="text-cyan-500" />
                <span>2.5+ years building enterprise software</span>
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                className="btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                Explore My Work
                <ArrowRight size={16} />
              </button>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </button>
              <a
                href={siteConfig.resumeFile}
                download
                className="btn-ghost"
              >
                <Download size={15} />
                Resume
              </a>
            </motion.div>

            {/* Specialty tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {[
                'Software Engineer',
                'Software Developer',
                'Python Developer',
                'Backend Systems',
                'Data Engineering',
                'AI Automation',
              ].map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors duration-200"
              >
                <Github size={20} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Systems Diagram ── */}
          <motion.div
            variants={diagramVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-center items-center"
          >
            <div
              className="relative w-full max-w-[420px] aspect-square glass-card p-6"
              style={{ borderColor: 'rgba(16,185,129,0.15)' }}
            >
              {/* Corner accent dots */}
              <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-60" />
              <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-60" />
              <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60" />

              {/* Top label bar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
                <Server size={11} className="text-emerald-400" />
                <span className="text-xs font-mono text-slate-500 tracking-widest">
                  SYSTEM OVERVIEW
                </span>
                <Cpu size={11} className="text-cyan-400" />
              </div>

              <SystemsDiagram />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-emerald-500/40">
          <div
            className="w-full bg-emerald-400 rounded-full"
            style={{
              height: '40%',
              animation: 'scrollIndicator 2s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollIndicator {
          0%   { transform: translateY(-100%); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default Hero;

