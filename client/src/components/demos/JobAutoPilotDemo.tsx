import { useState } from 'react';
import { Briefcase, Send, CheckCircle, Clock, Award, XCircle, Copy, CheckCheck, Sparkles, AlertCircle } from 'lucide-react';

type ApplicationStatus = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';

interface JobApplication {
  id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
  matchScore: number;
  notes: string;
}

const INITIAL_APPS: JobApplication[] = [
  { id: 1, company: 'DataScale Systems', role: 'Senior Backend Engineer', status: 'Interview', appliedDate: '2026-10-15', matchScore: 92, notes: 'Technical round scheduled on distributed systems & Snowflake optimizations.' },
  { id: 2, company: 'NextGen Cloud', role: 'Full-Stack Developer (Python/React)', status: 'Applied', appliedDate: '2026-10-20', matchScore: 84, notes: 'Application reviewed. Tailored outreach sent to engineering lead.' },
  { id: 3, company: 'FinPulse Analytics', role: 'Data Integration Engineer', status: 'Screening', appliedDate: '2026-10-22', matchScore: 88, notes: 'Recruiter call completed. Advancing to team lead discussion.' },
  { id: 4, company: 'HyperAI Research', role: 'AI Platform Engineer', status: 'Offer', appliedDate: '2026-10-10', matchScore: 78, notes: 'Offer letter received. Compensation evaluation in progress.' },
  { id: 5, company: 'Enterprise Commerce', role: 'Software Engineer', status: 'Rejected', appliedDate: '2026-10-08', matchScore: 65, notes: 'Position paused due to quarterly budget restructuring.' },
];

const STATUS_ORDER: ApplicationStatus[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

export function JobAutoPilotDemo() {
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPS);
  const [selectedAppId, setSelectedAppId] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const cycleStatus = (id: number) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== id) return app;
        const currentIndex = STATUS_ORDER.indexOf(app.status);
        const nextStatus = STATUS_ORDER[(currentIndex + 1) % STATUS_ORDER.length];
        return { ...app, status: nextStatus };
      })
    );
  };

  const statusCount = {
    total: applications.length,
    interview: applications.filter(a => a.status === 'Interview').length,
    offer: applications.filter(a => a.status === 'Offer').length,
    active: applications.filter(a => ['Applied', 'Screening', 'Interview'].includes(a.status)).length,
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Send className="w-3 h-3" /> Applied
          </span>
        );
      case 'Screening':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Screening
          </span>
        );
      case 'Interview':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Interview
          </span>
        );
      case 'Offer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
            <Award className="w-3 h-3" /> Offer Received
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-400 border border-slate-700">
            <XCircle className="w-3 h-3" /> Closed
          </span>
        );
    }
  };

  const outreachDraft = `Hi ${selectedApp.company} Hiring Team,

I recently applied for the ${selectedApp.role} opening. With hands-on experience building enterprise-grade Python microservices, OAuth 2.0 integrations, and Snowflake dbt data pipelines at Jade Global, I am excited about how my background directly maps to your technical roadmap.

In my recent projects, I achieved:
• 30% reduction in query execution times on enterprise Snowflake databases
• 40% reduction in turnaround for high-volume automated reporting workflows
• Robust full-stack delivery with React, TypeScript, FastAPI, and MySQL

I would love to connect for a brief 15-minute introductory call to learn more about your engineering priorities.

Warm regards,
Devang Chaudhari
Software Engineer | Pune, India`;

  const handleCopy = () => {
    navigator.clipboard.writeText(outreachDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
        <span>
          <strong className="text-slate-300">JobAutoPilot Simulation: </strong>
          Interactive application pipeline tracker. Click any status badge in the table to cycle through workflow states.
        </span>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Tracked Roles</div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-0.5">{statusCount.total}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">In Active Pipeline</div>
          <div className="text-xl font-bold font-mono text-blue-400 mt-0.5">{statusCount.active}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Interviews</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{statusCount.interview}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Offers</div>
          <div className="text-xl font-bold font-mono text-purple-300 mt-0.5">{statusCount.offer}</div>
        </div>
      </div>

      {/* Main Layout: Table + Side Outreach Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Applications List */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> ACTIVE APPLICATIONS
            </span>
            <span className="text-slate-500 text-[10px]">Click row to select</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {applications.map(app => {
              const isSelected = app.id === selectedAppId;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-purple-950/20 border-l-2 border-purple-400' : 'hover:bg-slate-900/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-100">{app.company}</span>
                      <span className="text-[10px] font-mono text-slate-400">• {app.appliedDate}</span>
                    </div>
                    <div className="text-xs text-slate-400">{app.role}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-400">Match</div>
                      <div className="text-xs font-mono font-bold text-emerald-400">{app.matchScore}%</div>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        cycleStatus(app.id);
                      }}
                      title="Click to cycle status"
                      className="hover:scale-105 transition-transform"
                    >
                      {getStatusBadge(app.status)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Application Outreach Panel */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TAILORED OUTREACH</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[11px]">Copy Draft</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Generated for <strong className="text-slate-200">{selectedApp.role}</strong> at{' '}
              <strong className="text-slate-200">{selectedApp.company}</strong> ({selectedApp.matchScore}% profile match).
            </div>

            <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800/80 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
              {outreachDraft}
            </pre>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Log notes: {selectedApp.notes}
          </div>
        </div>
      </div>
    </div>
  );
}
