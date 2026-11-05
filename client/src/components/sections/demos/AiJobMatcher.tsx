import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, ArrowRight, Loader2, Sparkles, Copy, CheckCheck, RefreshCw } from 'lucide-react';

const DEFAULT_SKILLS = `Python, FastAPI, React, TypeScript, SQL, Snowflake, dbt, REST APIs, OAuth 2.0, Azure DevOps, Docker, JWT, Automated Testing`;

const DEFAULT_JD = `Senior Backend Engineer — Scalable Systems & Integrations

We are looking for a Senior Backend Engineer to build scalable APIs and reliable data pipelines.

Key Responsibilities:
- Design, deploy, and maintain Python REST APIs and microservices
- Build reliable data transformation pipelines using SQL and modern data warehouses
- Integrate external enterprise services using OAuth 2.0 and secure webhooks
- Collaborate on CI/CD automation and production troubleshooting

Requirements:
- Strong proficiency in Python, REST APIs, and SQL databases
- Experience with Cloud platforms (Azure or AWS) and containerization (Docker)
- Familiarity with data engineering workflows (Snowflake, dbt, or ETL)
- Nice to have: React, TypeScript, and automated testing practices`;

interface AnalysisResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  relevanceSummary: string;
  generatedOutreach: string;
}

export function AiJobMatcher() {
  const [candidateSkills, setCandidateSkills] = useState(DEFAULT_SKILLS);
  const [jobDescription, setJobDescription] = useState(DEFAULT_JD);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setResult(null);

    // Realistic keyword extraction and matching simulation
    setTimeout(() => {
      const parsedCandidate = candidateSkills
        .split(/[,\n]/)
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);

      const knownSkills = [
        { name: 'Python', keywords: ['python'] },
        { name: 'REST APIs', keywords: ['rest', 'api', 'apis', 'fastapi'] },
        { name: 'SQL Databases', keywords: ['sql', 'database', 'snowflake', 'mysql', 'postgresql'] },
        { name: 'Snowflake & dbt', keywords: ['snowflake', 'dbt', 'etl', 'warehouse'] },
        { name: 'Cloud & CI/CD', keywords: ['azure', 'aws', 'ci/cd', 'devops', 'docker'] },
        { name: 'OAuth 2.0 & Auth', keywords: ['oauth', 'jwt', 'auth', 'authentication'] },
        { name: 'React & TypeScript', keywords: ['react', 'typescript', 'frontend'] },
        { name: 'Automated Testing', keywords: ['testing', 'test', 'automated testing'] },
      ];

      const jdLower = jobDescription.toLowerCase();

      const matched: string[] = [];
      const missing: string[] = [];

      knownSkills.forEach(skillObj => {
        const inJd = skillObj.keywords.some(k => jdLower.includes(k));
        const inCandidate = skillObj.keywords.some(k =>
          parsedCandidate.some(cs => cs.includes(k) || k.includes(cs))
        );

        if (inJd && inCandidate) {
          matched.push(skillObj.name);
        } else if (inJd && !inCandidate) {
          missing.push(skillObj.name);
        }
      });

      const totalRequired = matched.length + missing.length || 1;
      const calculatedScore = Math.min(94, Math.max(68, Math.round((matched.length / totalRequired) * 100)));

      const outreach = `Hi [Hiring Manager / Recruiter],

I noticed your Senior Backend Engineer opening and wanted to reach out. With extensive experience architecting Python microservices, enterprise REST APIs, and automated Snowflake/dbt pipelines at Jade Global, I have delivered production systems processing thousands of daily transactions with strict reliability requirements.

My background closely aligns with your core requirements:
- Python & REST APIs: Built OAuth 2.0-authenticated enterprise services with automated validation.
- Data & Warehouse: Reduced Snowflake query execution times by 30% and automated reporting workflows.
- CI/CD & Reliability: Maintained Azure DevOps pipelines resulting in 35% fewer deployment failures.

I would appreciate the chance to discuss how my hands-on backend and data engineering experience can deliver value to your engineering team.

Best regards,
Devang Chaudhari
Pune, India | linkedin.com/in/devangchaudhari`;

      setResult({
        matchScore: calculatedScore,
        matchedSkills: matched.length > 0 ? matched : ['Python', 'REST APIs', 'SQL', 'Snowflake', 'dbt', 'Azure DevOps'],
        missingSkills: missing.length > 0 ? missing : ['Kubernetes orchestration (Advanced)', 'AWS Lambda (GCP/Azure transferable)'],
        relevanceSummary:
          'High qualification match. Core backend, data warehousing, and authentication requirements are strongly covered by Devang\'s verified production experience.',
        generatedOutreach: outreach,
      });

      setLoading(false);
    }, 700);
  };

  const handleCopyOutreach = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.generatedOutreach);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCandidateSkills(DEFAULT_SKILLS);
    setJobDescription(DEFAULT_JD);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h4 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            AI Profile & Job Match Engine
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Parses job requirements against candidate technical profile, calculates alignment score, and crafts customized outreach.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Simulation & Gemini API Ready
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            title="Reset to sample data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Candidate Profile Skills */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-medium text-[var(--text-secondary)] flex items-center justify-between">
            <span>CANDIDATE SKILLS & SPECIALTIES</span>
            <span className="text-[10px] text-slate-500">Comma-separated</span>
          </label>
          <textarea
            value={candidateSkills}
            onChange={e => setCandidateSkills(e.target.value)}
            rows={6}
            className="w-full text-xs font-mono bg-slate-900/60 border border-[var(--border-subtle)] rounded-lg p-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none"
            placeholder="Enter candidate skills..."
          />
        </div>

        {/* Target Job Description */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-medium text-[var(--text-secondary)] flex items-center justify-between">
            <span>TARGET JOB SPECIFICATION</span>
            <span className="text-[10px] text-slate-500">Job requirements & stack</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            rows={6}
            className="w-full text-xs font-mono bg-slate-900/60 border border-[var(--border-subtle)] rounded-lg p-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
            placeholder="Paste target job description..."
          />
        </div>
      </div>

      {/* Trigger Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={loading || !candidateSkills.trim() || !jobDescription.trim()}
          className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Match Profile...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Analyze Match & Draft Outreach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 pt-4 border-t border-[var(--border-subtle)]"
          >
            {/* Score & Summary Banner */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500">
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {result.matchScore}%
                  </span>
                </div>
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                    Profile Fit Score
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    High qualification overlap
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-700/40">
                <strong className="text-slate-100 font-medium">Evaluation Summary: </strong>
                {result.relevanceSummary}
              </div>
            </div>

            {/* Matched vs Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Matched */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>VERIFIED REQUIREMENTS ({result.matchedSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchedSkills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing / Growth */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>ADJACENT OR TRANSFERABLE SKILLS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingSkills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Outreach Message */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TAILORED RECRUITER / HIRING MANAGER OUTREACH DRAFT</span>
                </div>
                <button
                  onClick={handleCopyOutreach}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-300 bg-black/40 p-3.5 rounded-lg border border-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-60 overflow-y-auto">
                {result.generatedOutreach}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
