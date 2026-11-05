import { useState, useMemo } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Info, Search, Bot } from 'lucide-react';

interface ExpenseItem {
  id: string;
  date: string;
  employee: string;
  category: string;
  amount: number;
  description: string;
  status: 'clean' | 'flagged';
  risk: 'none' | 'low' | 'medium' | 'high';
  riskReason: string | null;
  aiExplanation?: string;
  recommendation?: string;
}

const SAMPLE_EXPENSES: ExpenseItem[] = [
  {
    id: 'EXP-101',
    date: '2026-10-15',
    employee: 'Alex Johnson',
    category: 'Travel',
    amount: 1250.0,
    description: 'Round-trip Flight NYC-SFO for Client Deployment',
    status: 'flagged',
    risk: 'low',
    riskReason: 'Above team median flight cost by 18%',
    aiExplanation:
      'The requested airfare exceeds the departmental median benchmark by 18%. However, historical flight pricing on this high-demand corridor indicates volatility. Booking timestamp shows last-minute schedule adjustment due to client urgency.',
    recommendation: 'Request manager sign-off on travel exception or verify ticket booking lead time.',
  },
  {
    id: 'EXP-102',
    date: '2026-10-16',
    employee: 'Sam Rivera',
    category: 'Meals & Entertainment',
    amount: 847.5,
    description: 'Client Discovery Dinner — 8 Attendees',
    status: 'flagged',
    risk: 'medium',
    riskReason: 'Per-person average ($105.93) breaches Tier-1 standard meal threshold ($80/person)',
    aiExplanation:
      'Total expense receipt lists 8 attendees, resulting in $105.93 per head. Policy cap for client entertaining in this metro area is $80/person. Itemized invoice breakdown includes non-qualifying premium beverage charges.',
    recommendation: 'Deduct non-reimbursable beverage line items or request executive entertainment waiver.',
  },
  {
    id: 'EXP-103',
    date: '2026-10-17',
    employee: 'Chris Lee',
    category: 'Lodging',
    amount: 320.0,
    description: 'Hotel Stay — Austin Technology Summit (2 Nights)',
    status: 'clean',
    risk: 'none',
    riskReason: null,
    aiExplanation: 'Fully compliant with standard corporate hotel tier pricing ($160/night). Itemized invoice verified.',
    recommendation: 'Auto-approved for direct disbursement.',
  },
  {
    id: 'EXP-104',
    date: '2026-10-18',
    employee: 'Sam Rivera',
    category: 'Meals & Entertainment',
    amount: 847.5,
    description: 'Client Working Dinner — Follow-up Meeting',
    status: 'flagged',
    risk: 'high',
    riskReason: 'CRITICAL: Potential duplicate claim matching EXP-102 ($847.50 within 48h for same employee)',
    aiExplanation:
      'Exact monetary amount collision ($847.50) submitted by the same employee within 48 hours. Merchant category code and tax amount matches previous submission EXP-102. High probability of accidental double-submission or duplicate invoice upload.',
    recommendation: 'Halt reimbursement immediately. Contact submitter to reconcile potential duplicate invoice.',
  },
  {
    id: 'EXP-105',
    date: '2026-10-20',
    employee: 'Jordan Kim',
    category: 'Software & Tools',
    amount: 299.99,
    description: 'Annual Team Figma Professional Subscription',
    status: 'clean',
    risk: 'none',
    riskReason: null,
    aiExplanation: 'Approved vendor catalog match. Pricing corresponds to approved team volume pricing.',
    recommendation: 'Auto-approved for direct disbursement.',
  },
  {
    id: 'EXP-106',
    date: '2026-10-22',
    employee: 'Alex Johnson',
    category: 'Travel',
    amount: 4200.0,
    description: 'International Flight — London Partner Summit',
    status: 'flagged',
    risk: 'medium',
    riskReason: 'Requires VP-level authorization threshold (> $2,500.00)',
    aiExplanation:
      'Transaction amount crosses the $2,500 enterprise single-line threshold requiring dual authorization. While an international conference itinerary is attached, standard workflow rules require routing to division director.',
    recommendation: 'Route to VP of Engineering for secondary approval signature before processing.',
  },
  {
    id: 'EXP-107',
    date: '2026-10-25',
    employee: 'Morgan Chen',
    category: 'Hardware & Peripherals',
    amount: 89.99,
    description: 'USB-C Multi-Monitor Display Adapter',
    status: 'clean',
    risk: 'none',
    riskReason: null,
    aiExplanation: 'Within standard home-office peripheral allowance ($150 quarterly maximum).',
    recommendation: 'Auto-approved for direct disbursement.',
  },
  {
    id: 'EXP-108',
    date: '2026-10-28',
    employee: 'Chris Lee',
    category: 'Meals & Entertainment',
    amount: 15.5,
    description: 'Coffee Meeting with Candidate Interviewee',
    status: 'clean',
    risk: 'none',
    riskReason: null,
    aiExplanation: 'Compliant with recruiting casual refreshments policy.',
    recommendation: 'Auto-approved for direct disbursement.',
  },
];

export function AuditIQDemo() {
  const [expenses] = useState<ExpenseItem[]>(SAMPLE_EXPENSES);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>('EXP-104');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedExpense = expenses.find(e => e.id === selectedExpenseId) || expenses[0];

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const matchesSearch =
        e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'all' || e.risk === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [expenses, searchTerm, riskFilter]);

  const stats = {
    total: expenses.length,
    flagged: expenses.filter(e => e.status === 'flagged').length,
    highRisk: expenses.filter(e => e.risk === 'high').length,
    clean: expenses.filter(e => e.status === 'clean').length,
  };

  const getRiskBadge = (risk: ExpenseItem['risk']) => {
    switch (risk) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/15 text-red-400 border border-red-500/30 font-semibold">
            <ShieldAlert className="w-3 h-3" /> HIGH RISK
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <AlertTriangle className="w-3 h-3" /> MEDIUM
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/20">
            <Info className="w-3 h-3" /> LOW
          </span>
        );
      case 'none':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> CLEAN
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>
          <strong className="text-orange-200">Synthetic Portfolio Demonstration: </strong>
          All records, employees, and amounts are fictional. This simulation demonstrates automated anomaly detection, policy compliance, and LLM-assisted audit reasoning.
        </span>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Audited Claims</div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-0.5">{stats.total}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Auto-Approved</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{stats.clean}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Flagged Claims</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">{stats.flagged}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">High Risk Duplicates</div>
          <div className="text-xl font-bold font-mono text-red-400 mt-0.5">{stats.highRisk}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search claim, employee, or description..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs font-mono pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-mono">
          <span className="text-slate-400">Risk Filter:</span>
          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none font-sans text-xs"
          >
            <option value="all" className="bg-slate-900">All Claims</option>
            <option value="high" className="bg-slate-900">High Risk Only</option>
            <option value="medium" className="bg-slate-900">Medium Risk</option>
            <option value="low" className="bg-slate-900">Low Risk</option>
            <option value="none" className="bg-slate-900">Clean Only</option>
          </select>
        </div>
      </div>

      {/* Claims Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">ID / Date</th>
                <th className="py-2.5 px-3">Employee</th>
                <th className="py-2.5 px-3">Category & Detail</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredExpenses.map(item => {
                const isSelected = item.id === selectedExpense.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedExpenseId(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-orange-950/20 font-medium' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="text-slate-100 font-semibold">{item.id}</div>
                      <div className="text-[10px] text-slate-500">{item.date}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans text-xs">{item.employee}</td>
                    <td className="py-2.5 px-3">
                      <div className="text-slate-200 font-sans text-xs">{item.description}</div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-100">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3">{getRiskBadge(item.risk)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Expense AI Reasoner Card */}
      {selectedExpense && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-orange-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono font-semibold text-slate-200">
                AUDIT LOG & AI SYNTHESIS — {selectedExpense.id}
              </span>
            </div>
            <div>{getRiskBadge(selectedExpense.risk)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Risk Finding */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="text-[10px] font-mono text-orange-400 uppercase">Risk Evaluation</div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedExpense.riskReason || 'No policy violations or duplicate anomalies detected for this transaction.'}
              </p>
            </div>

            {/* Recommendation */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="text-[10px] font-mono text-emerald-400 uppercase">Recommended Action</div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedExpense.recommendation}
              </p>
            </div>
          </div>

          {/* AI Narrative Context */}
          {selectedExpense.aiExplanation && (
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs font-mono text-slate-300 leading-relaxed">
              <strong className="text-slate-400 font-sans">Automated Auditor Context: </strong>
              {selectedExpense.aiExplanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
