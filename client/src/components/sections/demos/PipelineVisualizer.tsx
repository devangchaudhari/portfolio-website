import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Check, X, Loader2, Info } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type StageKey = 'INGEST' | 'VALIDATE' | 'TRANSFORM' | 'LOAD' | 'REPORT';
type RecordStatus = 'pending' | 'pass' | 'fail' | 'transformed';
type PipelineState = 'idle' | 'running' | 'done';

interface InputRecord {
  id: string;
  amount: number;
  currency: string;
  date: string;
  vendor: string;
}

interface ProcessedRecord {
  input: InputRecord;
  status: RecordStatus;
  validationError?: string;
  transformNote?: string;
  output?: {
    id: string;
    amount_usd: number;
    currency: string;
    date: string;
    vendor: string;
    normalized: boolean;
  };
}

// ─── Pipeline Stages ──────────────────────────────────────────────────────────
const STAGES: { key: StageKey; label: string; desc: string }[] = [
  { key: 'INGEST', label: 'Ingest', desc: 'Pull records from source' },
  { key: 'VALIDATE', label: 'Validate', desc: 'Check data quality rules' },
  { key: 'TRANSFORM', label: 'Transform', desc: 'Apply business logic' },
  { key: 'LOAD', label: 'Load', desc: 'Write to data warehouse' },
  { key: 'REPORT', label: 'Report', desc: 'Generate output summary' },
];

// ─── Sample Records ───────────────────────────────────────────────────────────
const INPUT_RECORDS: InputRecord[] = [
  { id: 'TXN-001', amount: 1500.0, currency: 'USD', date: '2026-11-04', vendor: 'Acme Corp' },
  { id: 'TXN-002', amount: -50.0, currency: 'USD', date: '2026-11-04', vendor: 'Beta Ltd' },
  { id: 'TXN-003', amount: 2200.0, currency: 'GBP', date: '2026-11-04', vendor: 'Gamma Inc' },
];

const GBP_TO_USD = 1.27;

function processRecords(): ProcessedRecord[] {
  return INPUT_RECORDS.map(rec => {
    if (rec.amount < 0) {
      return { input: rec, status: 'fail', validationError: 'Negative amount: amounts must be ≥ 0' };
    }
    if (rec.currency !== 'USD') {
      return {
        input: rec,
        status: 'transformed',
        transformNote: `Currency converted: ${rec.currency} → USD (rate ${GBP_TO_USD})`,
        output: {
          id: rec.id,
          amount_usd: parseFloat((rec.amount * GBP_TO_USD).toFixed(2)),
          currency: 'USD',
          date: rec.date,
          vendor: rec.vendor,
          normalized: true,
        },
      };
    }
    return {
      input: rec,
      status: 'pass',
      output: { id: rec.id, amount_usd: rec.amount, currency: 'USD', date: rec.date, vendor: rec.vendor, normalized: false },
    };
  });
}

// ─── Stage Card ───────────────────────────────────────────────────────────────
function StageCard({
  stage,
  active,
  done,
  count,
}: {
  stage: { key: StageKey; label: string; desc: string };
  active: boolean;
  done: boolean;
  count: number;
}) {
  return (
    <motion.div
      animate={active ? { boxShadow: '0 0 18px 2px rgba(16,185,129,0.35)' } : { boxShadow: '0 0 0px 0px rgba(16,185,129,0)' }}
      transition={{ duration: 0.3 }}
      className={`flex-1 min-w-0 rounded-xl border p-3 text-center transition-colors duration-300 ${
        active
          ? 'bg-emerald-900/30 border-emerald-500/60'
          : done
          ? 'bg-emerald-900/15 border-emerald-700/40'
          : 'bg-slate-800/60 border-slate-700/50'
      }`}
    >
      <div className={`text-xs font-bold tracking-wider uppercase mb-1 ${active || done ? 'text-emerald-400' : 'text-slate-500'}`}>
        {stage.label}
      </div>
      <div className="text-slate-500 text-[10px] leading-tight hidden sm:block">{stage.desc}</div>
      {done && (
        <div className="mt-2 text-[10px] text-emerald-500 font-semibold">
          {count} rec{count !== 1 ? 's' : ''}
        </div>
      )}
    </motion.div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: RecordStatus }) {
  const cfg: Record<RecordStatus, { label: string; classes: string }> = {
    pass: { label: 'PASS', classes: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    fail: { label: 'FAIL', classes: 'bg-red-500/20 text-red-400 border-red-500/30' },
    transformed: { label: 'TRANSFORMED', classes: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    pending: { label: 'PENDING', classes: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  };
  const { label, classes } = cfg[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${classes}`}>
      {label}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function PipelineVisualizer() {
  const [pipelineState, setPipelineState] = useState<PipelineState>('idle');
  const [activeStageIdx, setActiveStageIdx] = useState(-1);
  const [doneUpTo, setDoneUpTo] = useState(-1);
  const [results, setResults] = useState<ProcessedRecord[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function runPipeline() {
    if (pipelineState === 'running') return;

    // Reset
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setResults([]);
    setActiveStageIdx(-1);
    setDoneUpTo(-1);
    setPipelineState('running');

    STAGES.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveStageIdx(i);
        setDoneUpTo(i - 1);
        if (i === STAGES.length - 1) {
          const done = setTimeout(() => {
            setActiveStageIdx(-1);
            setDoneUpTo(STAGES.length - 1);
            setResults(processRecords());
            setPipelineState('done');
          }, 500);
          timerRef.current.push(done);
        }
      }, i * 500);
      timerRef.current.push(t);
    });
  }

  const stageCounts: Record<StageKey, number> = {
    INGEST: INPUT_RECORDS.length,
    VALIDATE: INPUT_RECORDS.length,
    TRANSFORM: INPUT_RECORDS.filter(r => r.amount >= 0).length,
    LOAD: INPUT_RECORDS.filter(r => r.amount >= 0).length,
    REPORT: INPUT_RECORDS.filter(r => r.amount >= 0).length,
  };

  return (
    <div className="space-y-5">
      {/* Run Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={runPipeline}
          disabled={pipelineState === 'running'}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          {pipelineState === 'running' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Play size={14} />
          )}
          {pipelineState === 'running' ? 'Running…' : pipelineState === 'done' ? 'Run Again' : 'Run Pipeline'}
        </button>
        {pipelineState === 'done' && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-emerald-400 font-medium"
          >
            Pipeline completed — {results.filter(r => r.status !== 'fail').length}/{results.length} records loaded
          </motion.span>
        )}
      </div>

      {/* Stage Flow */}
      <div className="flex items-center gap-1.5">
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="flex items-center gap-1.5 flex-1 min-w-0">
            <StageCard
              stage={stage}
              active={activeStageIdx === i}
              done={doneUpTo >= i}
              count={stageCounts[stage.key]}
            />
            {i < STAGES.length - 1 && (
              <ArrowRight
                size={14}
                className={`flex-shrink-0 transition-colors duration-300 ${doneUpTo >= i ? 'text-emerald-500' : 'text-slate-700'}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Results Table */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Processing Results</h4>
            <div className="rounded-xl border border-slate-700/60 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-800/60 border-b border-slate-700/50">
                    <th className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Record ID</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider hidden sm:table-cell">Vendor</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Amount</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 font-semibold uppercase tracking-wider hidden md:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((rec, i) => (
                    <motion.tr
                      key={rec.input.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-slate-700/30 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-sky-400">{rec.input.id}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 hidden sm:table-cell">{rec.input.vendor}</td>
                      <td className="px-4 py-3">
                        <div className={`font-mono ${rec.status === 'fail' ? 'text-red-400' : 'text-slate-200'}`}>
                          {rec.input.currency} {rec.input.amount.toFixed(2)}
                        </div>
                        {rec.output && rec.output.currency !== rec.input.currency && (
                          <div className="text-amber-400 font-mono mt-0.5">
                            → USD {rec.output.amount_usd.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={rec.status} />
                      </td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                        {rec.validationError && (
                          <span className="flex items-center gap-1 text-red-400">
                            <X size={11} />
                            {rec.validationError}
                          </span>
                        )}
                        {rec.transformNote && (
                          <span className="flex items-center gap-1 text-amber-400">
                            <Check size={11} />
                            {rec.transformNote}
                          </span>
                        )}
                        {rec.status === 'pass' && (
                          <span className="flex items-center gap-1 text-emerald-500">
                            <Check size={11} />
                            All validations passed
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note */}
      <div className="flex gap-2 text-xs text-slate-500 bg-slate-800/40 border border-slate-700/40 rounded-lg px-3 py-2.5">
        <Info size={13} className="flex-shrink-0 mt-0.5 text-slate-500" />
        <span>
          This demonstrates the validation and transformation patterns used in production data integration workflows.
        </span>
      </div>
    </div>
  );
}

export default PipelineVisualizer;

