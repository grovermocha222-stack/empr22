import React from 'react';
import { ShieldCheck, ShieldAlert, Zap, Crown, Wallet, KeyRound, Sparkles } from 'lucide-react';
import { TierInfo } from '../types';
import emprLogo from '../assets/images/empr_logo_1786160169180.jpg';

interface HeaderProps {
  currentTier: TierInfo;
  balance: number;
  onOpenWalletModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTier, balance, onOpenWalletModal }) => {
  const getTierIcon = (id: string) => {
    switch (id) {
      case 'gold': return <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />;
      case 'silver': return <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />;
      case 'bronze': return <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />;
      default: return <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#060A12]/98 sm:backdrop-blur-md border-b border-sky-500/15 shadow-[0_4px_20px_rgba(0,180,255,0.08)]">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Brand with Penguin Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative group shrink-0">
            <img
              src={emprLogo}
              alt="EMPR Penguin Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover border border-sky-400/40 shadow-[0_0_16px_rgba(56,189,248,0.35)] transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 rounded-full border border-black" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-sm sm:text-lg font-extrabold tracking-tight text-white uppercase font-sans flex items-center gap-1 leading-none">
                <span>EMPR</span>
                <span className="text-sky-400 font-extrabold">GATE</span>
              </h1>
              <span className="hidden xs:inline-flex items-center text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-sky-500/10 text-sky-300 border border-sky-400/25 px-1.5 py-0.5 rounded-full font-bold shrink-0">
                v1.0
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-sky-200/60 font-mono hidden sm:block mt-0.5 leading-tight">
              Algo-Bot Clearance Gateway
            </p>
          </div>
        </div>

        {/* Readout stats - Frosted Glass Container */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-3 bg-sky-950/20 px-2 sm:px-3.5 py-1 rounded-lg sm:rounded-xl border border-sky-500/20 backdrop-blur-md shadow-inner">
            <div className="flex flex-col">
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-sky-300/70 font-bold font-mono">
                Balance
              </span>
              <span className="font-mono text-sky-300 font-extrabold text-[11px] sm:text-sm leading-tight">
                {balance.toLocaleString()} <span className="text-[9px] text-cyan-400/90">$EMPR</span>
              </span>
            </div>
            <div className="h-5 sm:h-6 w-[1px] bg-sky-500/20"></div>
            <div className="flex flex-col">
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-sky-300/70 font-bold font-mono">
                Clearance
              </span>
              <div className="flex items-center gap-0.5 sm:gap-1 text-white font-bold text-[11px] sm:text-sm uppercase tracking-tight leading-tight">
                {getTierIcon(currentTier.id)}
                <span>{currentTier.name}</span>
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <button
            onClick={onOpenWalletModal}
            className="group relative inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 min-h-[34px] sm:min-h-[40px] text-[11px] sm:text-xs font-mono font-bold rounded-lg sm:rounded-xl border border-sky-400/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.2)] active:scale-95 shrink-0"
          >
            <Wallet className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="hidden md:inline">Connect Web3</span>
            <span className="md:hidden">Web3</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
};

