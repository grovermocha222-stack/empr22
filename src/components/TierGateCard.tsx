import React from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldAlert, ShieldCheck, Zap, Crown, ArrowRight, Sparkles } from 'lucide-react';
import { TierInfo } from '../types';

interface TierGateCardProps {
  tier: TierInfo;
  userBalance: number;
  isUnlocked: boolean;
  isCurrentTier: boolean;
  onSelectPreset: (threshold: number) => void;
}

export const TierGateCard: React.FC<TierGateCardProps> = ({
  tier,
  userBalance,
  isUnlocked,
  isCurrentTier,
  onSelectPreset
}) => {
  const neededToUnlock = tier.threshold - userBalance;

  const tierNumbers: Record<string, string> = {
    free: '01',
    bronze: '02',
    silver: '03',
    gold: '04',
  };

  const getTierIcon = (id: string) => {
    switch (id) {
      case 'gold': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'silver': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'bronze': return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      default: return <ShieldAlert className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-6 ${
        isCurrentTier
          ? 'bg-[#0B1428] border-2 border-cyan-400 shadow-[0_0_35px_rgba(56,189,248,0.28)] ring-1 ring-cyan-400/40'
          : isUnlocked
          ? 'bg-[#070E1E] border border-sky-400/35 hover:border-sky-300/70 shadow-[0_6px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]'
          : 'bg-[#050914] border border-white/5 opacity-70 hover:opacity-90'
      }`}
    >
      {/* Top Gate Status Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-white/5">
        <div
          className={`h-full w-full transition-all duration-500 ${
            isUnlocked
              ? 'bg-gradient-to-r from-sky-500 via-cyan-300 to-sky-400'
              : 'bg-gray-800'
          }`}
        />
      </div>

      {/* Card Content Header */}
      <div className="space-y-3.5 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-cyan-300 mb-0.5 block">
              GATE {tierNumbers[tier.id] || '00'}
            </span>
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg sm:text-2xl font-extrabold text-white font-sans tracking-tight">
                {tier.name}
              </h3>
              {getTierIcon(tier.id)}
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-sky-200/70 uppercase mt-0.5 font-semibold">
              {tier.threshold === 0 ? 'Public Gate' : `${tier.threshold.toLocaleString()} $EMPR`}
            </p>
          </div>

          {/* Status Badge */}
          <div>
            {isCurrentTier ? (
              <div className="flex items-center gap-1 bg-gradient-to-r from-sky-400 to-cyan-400 text-black text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-tight shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span>Active</span>
              </div>
            ) : isUnlocked ? (
              <span className="bg-sky-500/15 border border-sky-400/40 text-cyan-300 text-[9px] sm:text-[10px] font-mono font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase">
                Unlocked
              </span>
            ) : (
              <div className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-gray-500">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-sky-100/90 leading-relaxed font-sans min-h-[32px]">
          {tier.summary}
        </p>

        {/* Speed / Wallet Meta Info */}
        <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-black/60 border border-sky-500/20 text-[11px] font-mono flex items-center justify-between gap-2 text-sky-100">
          <span className="text-sky-300/70 uppercase font-semibold text-[10px]">Speed:</span>
          <span className="font-extrabold text-cyan-300">{tier.executionSpeed}</span>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 pt-2.5 border-t border-sky-500/15">
          <ul className="space-y-2 text-xs text-gray-200 font-sans">
            {tier.features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2 ${
                  isUnlocked ? 'text-gray-100' : 'text-gray-500 line-through'
                }`}
              >
                <span className={`shrink-0 mt-0.5 ${isUnlocked ? 'text-cyan-300 font-bold' : 'text-gray-600'}`}>
                  {isUnlocked ? '✓' : '•'}
                </span>
                <span className="leading-snug text-[11px] sm:text-xs">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-sky-500/15 flex items-center justify-between gap-2">
        {isUnlocked ? (
          <div className="text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
            <span>Clearance OK</span>
          </div>
        ) : (
          <div className="text-[10px] sm:text-[11px] font-mono text-gray-400">
            Need <span className="text-cyan-300 font-bold">+{neededToUnlock.toLocaleString()} $EMPR</span>
          </div>
        )}

        <button
          onClick={() => onSelectPreset(tier.threshold)}
          className={`px-3 py-2 min-h-[36px] sm:min-h-[40px] rounded-lg sm:rounded-xl text-xs font-mono font-extrabold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
            isCurrentTier
              ? 'bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black shadow-lg shadow-sky-500/30'
              : isUnlocked
              ? 'bg-sky-500/10 hover:bg-sky-500/20 text-white border border-sky-400/30'
              : 'bg-sky-500/10 hover:bg-sky-500/20 text-cyan-300 border border-sky-400/40'
          }`}
        >
          <span>{isUnlocked ? 'Simulate' : 'Set Balance'}</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
};

