import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Loader2, AlertTriangle, Info } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type EndpointKey = 'inventory' | 'analytics' | 'sync';
type TabKey = 'response' | 'error';

interface Endpoint {
  key: EndpointKey;
  method: 'GET' | 'POST';
  path: string;
  label: string;
  status: number;
  description: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
const ENDPOINTS: Endpoint[] = [
  {
    key: 'inventory',
    method: 'GET',
    path: '/api/inventory/items',
    label: 'GET /api/inventory/items',
    status: 200,
    description: 'Fetch paginated inventory list',
  },
  {
    key: 'analytics',
    method: 'GET',
    path: '/api/analytics/summary',
    label: 'GET /api/analytics/summary',
    status: 200,
    description: 'Retrieve aggregated analytics metrics',
  },
  {
    key: 'sync',
    method: 'POST',
    path: '/api/integrations/sync',
    label: 'POST /api/integrations/sync',
    status: 201,
    description: 'Trigger a downstream sync job',
  },
];

// ─── Sample Responses ─────────────────────────────────────────────────────────
const RESPONSES: Record<EndpointKey, unknown> = {
  inventory: {
    data: [
      { id: 'INV-001', name: 'MacBook Pro M3', category: 'Electronics', quantity: 24, location: 'Warehouse A' },
      { id: 'INV-002', name: 'Office Chair', category: 'Furniture', quantity: 8, location: 'Warehouse B' },
    ],
    total: 2,
    timestamp: '2026-11-04T10:00:00Z',
  },
  analytics: {
    metrics: {
      total_items: 847,
      low_stock_alerts: 12,
      pending_transfers: 5,
      monthly_turnover: '₹2.4M',
    },
    period: '2026-11',
  },
  sync: {
    status: 'triggered',
    job_id: 'SYNC-20261104-001',
    estimated_completion_seconds: 45,
    records_queued: 1250,
  },
};

const ERROR_RESPONSE = {
  error: 'Unauthorized',
  message: 'Bearer token is missing or has expired.',
  code: 401,
  hint: 'Refresh your OAuth 2.0 token and retry the request.',
};

// ─── Syntax-highlighted JSON renderer ────────────────────────────────────────
function HighlightedJson({ value, indent = 0 }: { value: unknown; indent?: number }) {
  const pad = '  '.repeat(indent);
  const innerPad = '  '.repeat(indent + 1);

  if (value === null) return <span className="text-slate-400">null</span>;
  if (typeof value === 'boolean') return <span className="text-violet-400">{String(value)}</span>;
  if (typeof value === 'number') return <span className="text-amber-400">{value}</span>;
  if (typeof value === 'string') return <span className="text-emerald-400">"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-300">[]</span>;
    return (
      <>
        <span className="text-slate-300">{'['}</span>
        {'\n'}
        {value.map((item, i) => (
          <span key={i}>
            {innerPad}
            <HighlightedJson value={item} indent={indent + 1} />
            {i < value.length - 1 ? ',' : ''}
            {'\n'}
          </span>
        ))}
        {pad}
        <span className="text-slate-300">{']'}</span>
      </>
    );
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-slate-300">{'{}'}</span>;
    return (
      <>
        <span className="text-slate-300">{'{'}</span>
        {'\n'}
        {entries.map(([k, v], i) => (
          <span key={k}>
            {innerPad}
            <span className="text-sky-300">"{k}"</span>
            <span className="text-slate-300">: </span>
            <HighlightedJson value={v} indent={indent + 1} />
            {i < entries.length - 1 ? ',' : ''}
            {'\n'}
          </span>
        ))}
        {pad}
        <span className="text-slate-300">{'}'}</span>
      </>
    );
  }

  return <span className="text-slate-300">{String(value)}</span>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ApiExplorer() {
  const [selectedKey, setSelectedKey] = useState<EndpointKey>('inventory');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<unknown>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('response');
  const [errorVisible, setErrorVisible] = useState(false);

  const selectedEndpoint = ENDPOINTS.find(e => e.key === selectedKey)!;

  function handleSendRequest() {
    setLoading(true);
    setResponseData(null);
    setErrorVisible(false);
    setActiveTab('response');

    const simulatedTime = Math.floor(Math.random() * (350 - 120 + 1)) + 120;
    setTimeout(() => {
      setResponseData(RESPONSES[selectedKey]);
      setResponseTime(simulatedTime);
      setLoading(false);
    }, 800);
  }

  function handleTriggerError() {
    setActiveTab('error');
    setErrorVisible(true);
    setResponseData(null);
  }

  return (
    <div className="space-y-5">
      {/* Auth Strip */}
      <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2.5">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Auth</span>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5">
          Bearer ey…xyz
        </span>
        <span className="ml-auto text-xs text-slate-500">OAuth 2.0</span>
      </div>

      {/* Endpoint Selector + Send */}
      <div className="flex gap-3">
        {/* Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="w-full flex items-center justify-between gap-2 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2.5 text-sm text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded font-mono flex-shrink-0 ${
                  selectedEndpoint.method === 'GET'
                    ? 'bg-sky-500/20 text-sky-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {selectedEndpoint.method}
              </span>
              <span className="font-mono text-xs truncate">{selectedEndpoint.path}</span>
            </div>
            <ChevronDown
              size={14}
              className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute z-20 top-full mt-1 left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
              >
                {ENDPOINTS.map(ep => (
                  <button
                    key={ep.key}
                    onClick={() => { setSelectedKey(ep.key); setDropdownOpen(false); setResponseData(null); setErrorVisible(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700/60 transition-colors text-sm ${
                      ep.key === selectedKey ? 'bg-slate-700/40' : ''
                    }`}
                  >
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded font-mono flex-shrink-0 ${
                        ep.method === 'GET' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-slate-200 truncate">{ep.path}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{ep.description}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendRequest}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          {loading ? 'Sending…' : 'Send Request'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700">
        {(['response', 'error'] as TabKey[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab === 'error' ? 'Error Simulation' : 'Response'}
          </button>
        ))}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        {activeTab === 'response' ? (
          <motion.div
            key="response-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {/* Status bar */}
            {(responseData !== null || loading) && (
              <div className="flex items-center gap-4 text-xs">
                {!loading && responseData !== null && (
                  <>
                    <span className="font-semibold text-emerald-400">
                      {selectedEndpoint.status} {selectedEndpoint.status === 201 ? 'Created' : 'OK'}
                    </span>
                    <span className="text-slate-500">{responseTime} ms</span>
                    <span className="text-slate-500 ml-auto font-mono">{selectedEndpoint.path}</span>
                  </>
                )}
                {loading && <span className="text-slate-400">Awaiting response…</span>}
              </div>
            )}

            {/* JSON Block */}
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-lg p-4 min-h-[180px] font-mono text-xs leading-relaxed overflow-x-auto">
              {loading && (
                <div className="flex items-center gap-2 text-slate-500 h-full">
                  <Loader2 size={14} className="animate-spin text-emerald-500" />
                  <span>Processing request…</span>
                </div>
              )}
              {!loading && responseData === null && (
                <span className="text-slate-600 italic">Hit "Send Request" to see the response.</span>
              )}
              {!loading && responseData !== null && (
                <pre className="whitespace-pre-wrap">
                  <HighlightedJson value={responseData} />
                </pre>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <button
              onClick={handleTriggerError}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <AlertTriangle size={14} />
              Trigger 401 Error
            </button>

            <div className="bg-slate-900/80 border border-slate-700/60 rounded-lg p-4 min-h-[140px] font-mono text-xs leading-relaxed overflow-x-auto">
              {!errorVisible ? (
                <span className="text-slate-600 italic">Click "Trigger 401 Error" to see the error response.</span>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-red-400">401 Unauthorized</span>
                  </div>
                  <pre className="whitespace-pre-wrap">
                    <HighlightedJson value={ERROR_RESPONSE} />
                  </pre>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note */}
      <div className="flex gap-2 text-xs text-slate-500 bg-slate-800/40 border border-slate-700/40 rounded-lg px-3 py-2.5">
        <Info size={13} className="flex-shrink-0 mt-0.5 text-slate-500" />
        <span>
          This uses a mock API for demonstration. In production, requests are authenticated with OAuth 2.0.
        </span>
      </div>
    </div>
  );
}

export default ApiExplorer;

