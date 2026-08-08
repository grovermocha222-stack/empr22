import React from 'react';
import { Lock, Unlock, ChevronRight, ShieldCheck, Zap, Crown } from 'lucide-react';
import { TIERS_DATA, getNextTier } from '../data/tiers';
import { TierInfo } from '../types';

interface GateProgressBarProps {
  balance: number;
  currentTier: TierInfo;
  onSetBalance: (val: number) => void;
}

export const GateProgressBar: React.FC<GateProgressBarProps> = ({
  balance,
  currentTier,
  onSetBalance,
}) => {
  const { nextTier, remaining, progressPercent } = getNextTier(balance);

  const getTierIcon = (id: string, isUnlocked: boolean, isCurrent: boolean) => {
    const sizeClass = "w-4 h-4 sm:w-5 sm:h-5";
    if (isCurrent) {
      switch (id) {
        case 'gold': return <Crown className={`${sizeClass} text-black`} />;
        case 'silver': return <Zap className={`${sizeClass} text-black`} />;
        case 'bronze': return <ShieldCheck className={`${sizeClass} text-black`} />;
        default: return <Unlock className={`${sizeClass} text-black`} />;
      }
    }
    if (!isUnlocked) return <Lock className={`${sizeClass} text-gray-500`} />;
    switch (id) {
      case 'gold': return <Crown className={`${sizeClass} text-amber-400`} />;
      case 'silver': return <Zap className={`${sizeClass} text-cyan-400`} />;
      case 'bronze': return <ShieldCheck className={`${sizeClass} text-amber-500`} />;
      default: return <Unlock className={`${sizeClass} text-emerald-400`} />;
    }
  };

  return (
    <div className="bg-[#080D1A] border border-sky-400/20 rounded-2xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.4)] space-y-5">
      {/* Header and Next Tier distance readout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono font-bold text-white text-sm sm:text-base uppercase tracking-wider">
              Gate Clearance Pipeline
            </h3>
            <span className="text-[10px] font-mono bg-sky-500/10 text-cyan-300 border border-sky-400/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
              TURNSTILE ARCHITECTURE
            </span>
          </div>
          <p className="text-xs text-sky-200/60 mt-0.5 font-sans">
            Real-time algorithmic turnstile threshold progression
          </p>
        </div>

        {/* Status Callout */}
        <div className="bg-black/60 border border-sky-500/20 rounded-xl px-3.5 py-2 font-mono text-xs flex items-center justify-between sm:justify-end gap-2.5">
          {nextTier ? (
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300 flex-wrap">
              <span className="text-sky-200/70">Next Upgrade:</span>
              <span className="font-bold text-cyan-300">+{remaining.toLocaleString()} $EMPR</span>
              <span className="text-sky-200/70">for</span>
              <button
                onClick={() => onSetBalance(nextTier.threshold)}
                className="font-bold text-white hover:text-cyan-300 underline decoration-sky-400/60 underline-offset-4 flex items-center gap-1 transition-colors min-h-[36px] px-1"
              >
                {nextTier.name}
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>MAXIMUM PROTOCOL CLEARANCE (GOLD LEVEL)</span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="relative pt-1 pb-1">
        {/* Connector Line Background */}
        <div className="absolute top-4 sm:top-6 left-6 right-6 sm:left-10 sm:right-10 h-1 sm:h-1.5 bg-sky-950/80 border border-sky-500/20 rounded-full z-0" />
        
        {/* Connector Active Progress Line */}
        <div
          className="absolute top-4 sm:top-6 left-6 sm:left-10 h-1 sm:h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-300 rounded-full transition-all duration-500 shadow-[0_0_18px_rgba(56,189,248,0.7)] z-0"
          style={{
            width: `calc(${(TIERS_DATA.findIndex(t => t.id === currentTier.id) / (TIERS_DATA.length - 1)) * 100}% * 0.82 + ${(progressPercent / 100) * (100 / (TIERS_DATA.length - 1)) * 0.82}%)`
          }}
        />

        {/* Checkpoint Nodes */}
        <div className="grid grid-cols-4 relative z-10">
          {TIERS_DATA.map((tier) => {
            const isUnlocked = balance >= tier.threshold;
            const isCurrent = currentTier.id === tier.id;

            return (
              <div
                key={tier.id}
                className="flex flex-col items-center group cursor-pointer select-none"
                onClick={() => onSetBalance(tier.threshold)}
              >
                {/* Node Circle */}
                <div
                  className={`w-9 h-9 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center font-mono transition-all duration-300 border ${
                    isCurrent
                      ? 'bg-gradient-to-br from-sky-400 to-cyan-500 border-cyan-300 text-black shadow-[0_0_22px_rgba(56,189,248,0.6)] scale-105 sm:scale-110'
                      : isUnlocked
                      ? 'bg-sky-950/60 border-sky-400/60 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:border-sky-300'
                      : 'bg-black/80 border-white/10 text-gray-600 group-hover:border-sky-500/30'
                  }`}
                >
                  {getTierIcon(tier.id, isUnlocked, isCurrent)}
                </div>

                {/* Node Labels */}
                <div className="text-center mt-2 font-mono">
                  <div className={`text-[10px] sm:text-xs font-extrabold ${isCurrent ? 'text-cyan-300' : isUnlocked ? 'text-gray-100' : 'text-gray-500'}`}>
                    {tier.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-sky-200/70 mt-0.5">
                    {tier.threshold === 0 ? '0' : `${(tier.threshold / 1000)}k`} <span className="hidden sm:inline">$EMPR</span>
                  </div>
                  <div className="mt-1">
                    {isUnlocked ? (
                      <span className="text-[8px] sm:text-[9px] uppercase font-extrabold tracking-wider text-cyan-300 bg-sky-500/15 px-1.5 sm:px-2 py-0.5 rounded-full border border-sky-400/40">
                        CLEAR
                      </span>
                    ) : (
                      <span className="text-[8px] sm:text-[9px] uppercase font-extrabold tracking-wider text-gray-500 bg-black/60 px-1.5 sm:px-2 py-0.5 rounded-full border border-white/5">
                        LOCKED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

