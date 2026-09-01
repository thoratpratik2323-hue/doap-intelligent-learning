import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("DOAP Application caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <div 
            className="p-8 rounded-3xl max-w-md w-full text-center space-y-5 border shadow-2xl doap-card"
            style={{ backgroundColor: 'var(--doap-surface, #111111)', borderColor: 'var(--doap-border, #262626)' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-lg" style={{ color: 'var(--doap-text-prim, #ffffff)' }}>
                Page Encountered a Temporary Error
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                {this.state.error?.message || 'A render exception occurred.'}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-80"
                style={{ backgroundColor: 'var(--doap-surface-sec, #1a1a1a)', borderColor: 'var(--doap-border, #333)', color: '#fff' }}
              >
                <RefreshCw size={13} />
                <span>Retry</span>
              </button>

              <button
                onClick={this.handleReset}
                className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90"
              >
                <Home size={13} />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
