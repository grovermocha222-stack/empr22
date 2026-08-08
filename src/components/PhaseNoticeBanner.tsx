import React from 'react';
import { Sparkles, Terminal, ShieldAlert } from 'lucide-react';

interface PhaseNoticeBannerProps {
  onFocusSimulator: () => void;
}

export const PhaseNoticeBanner: React.FC<PhaseNoticeBannerProps> = ({ onFocusSimulator }) => {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#080D1A] via-[#0B1326] to-[#070A14] border border-sky-400/25 p-3.5 sm:p-5 shadow-[0_8px_30px_rgba(0,180,255,0.12)]">
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/[0.05] rounded-full pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start gap-2.5 sm:gap-3.5">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500/10 border border-sky-400/35 text-sky-400 shrink-0 mt-0.5 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider bg-sky-500/10 border border-sky-400/30 px-1.5 py-0.5 rounded-full">
                Protocol Prototype v1
              </span>
              <span className="text-[10px] sm:text-[11px] text-sky-200/70 font-mono flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-sky-400 shrink-0" /> Turnstile Gate Architecture
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
              $EMPR Quantitative Gate Clearance
            </h2>
            <p className="text-[11px] sm:text-xs text-sky-100/80 max-w-3xl mt-0.5 leading-relaxed font-sans">
              $EMPR turnstiles regulate algorithmic execution pipelines. The token is pre-deployment. Use the interactive <strong className="text-cyan-300 font-semibold">Simulate $EMPR Balance</strong> console below to test clearance levels in real time.
            </p>
          </div>
        </div>

        <button
          onClick={onFocusSimulator}
          className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 min-h-[36px] sm:min-h-[40px] rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black font-mono text-xs font-bold transition-all duration-200 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)] active:scale-95 group"
        >
          <Sparkles className="w-3.5 h-3.5 text-black group-hover:rotate-12 transition-transform shrink-0" />
          <span>Launch Simulator</span>
        </button>
      </div>
    </div>
  );
};

