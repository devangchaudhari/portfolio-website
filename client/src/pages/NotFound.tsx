import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="glass-card max-w-md w-full p-8 text-center space-y-5 rounded-2xl border border-slate-800">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <Terminal className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">404 EXCEPTION</span>
          <h1 className="text-2xl font-bold text-slate-100">Route Unreachable</h1>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          The requested path does not map to any recognized endpoint in this system. Return to the home cluster to continue exploring.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <Link to="/" className="btn-primary text-xs py-2.5 px-4 inline-flex items-center gap-2">
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary text-xs py-2.5 px-4 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
