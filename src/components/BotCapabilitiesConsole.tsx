import React, { useState } from 'react';
import { Terminal, Play, Lock, CheckCircle2 } from 'lucide-react';
import { TierInfo } from '../types';

interface BotCapabilitiesConsoleProps {
  currentTier: TierInfo;
  balance: number;
}

export const BotCapabilitiesConsole: React.FC<BotCapabilitiesConsoleProps> = ({ currentTier, balance }) => {
  const [testLog, setTestLog] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runGateDiagnostic = () => {
    setIsSimulating(true);
    setTestLog([
      `[GATE ENGINE] Initiating turnstile protocol audit...`,
      `[WALLET SCAN] Querying simulated ERC-20 state...`,
      `[BALANCE CONFIRMED] Verified holdings: ${balance.toLocaleString()} $EMPR`,
      `[CLEARANCE GRANTED] Protocol Level: [${currentTier.name.toUpperCase()} GATE]`,
    ]);

    setTimeout(() => {
      setTestLog((prev) => [
        ...prev,
        `[MODULE MATRIX] Loading authorized execution engines...`,
        `[ENGINE 01] Mempool Token Sniper: ${balance >= 10000 ? 'ACTIVE (READY)' : 'LOCKED (Requires 10,000 $EMPR)'}`,
        `[ENGINE 02] Execution Speed: ${currentTier.executionSpeed}`,
        `[ENGINE 03] Wallet Slots: ${currentTier.maxWallets}`,
        `[ENGINE 04] Honeypot / Rugpull Shield: ${balance >= 200000 ? 'ONLINE' : 'LOCKED (Requires 200,000 $EMPR)'}`,
        `[GATE STATUS] All turnstile clearance checks passed.`
      ]);
      setIsSimulating(false);
    }, 500);
  };

  const modules = [
    {
      name: 'Mempool Token Sniper',
      req: '10,000 $EMPR',
      tierNeeded: 'Bronze',
      unlocked: balance >= 10000,
      desc: 'Sub-second liquidity pool pair creation sniper with MEV protection'
    },
    {
      name: 'Auto-Sell & Take-Profit',
      req: '50,000 $EMPR',
      tierNeeded: 'Silver',
      unlocked: balance >= 50000,
      desc: 'Automated trailing stop-loss and multi-step profit target execution'
    },
    {
      name: 'Private RPC Route',
      req: '50,000 $EMPR',
      tierNeeded: 'Silver',
      unlocked: balance >= 50000,
      desc: 'Bypasses public node congestion via dedicated ultra-low latency RPC endpoints'
    },
    {
      name: 'Whale Copy Trading',
      req: '200,000 $EMPR',
      tierNeeded: 'Gold',
      unlocked: balance >= 200000,
      desc: 'Instant mirror execution of top-performing insider wallet movements'
    },
    {
      name: 'Bytecode Security Shield',
      req: '200,000 $EMPR',
      tierNeeded: 'Gold',
      unlocked: balance >= 200000,
      desc: 'Pre-flight smart contract bytecode analysis for honeypot & sell-tax traps'
    },
  ];

  return (
    <div className="bg-[#080D1A] border border-sky-400/20 rounded-2xl p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,180,255,0.1)] backdrop-blur-2xl space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/35 text-sky-400 shrink-0 shadow-[0_0_18px_rgba(56,189,248,0.25)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2 tracking-tight">
              PERMISSIONS MATRIX
              <span className="text-[10px] font-mono font-extrabold text-cyan-300 bg-sky-500/10 border border-sky-400/30 px-2 py-0.5 rounded-full uppercase">
                VERIFIED
              </span>
            </h3>
            <p className="text-xs text-sky-200/60 font-sans">
              Module authorization status based on current <span className="font-mono text-cyan-300 font-bold">{currentTier.name} Gate</span> clearance
            </p>
          </div>
        </div>

        <button
          onClick={runGateDiagnostic}
          disabled={isSimulating}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 min-h-[38px] sm:min-h-[42px] rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] active:scale-95 disabled:opacity-50 shrink-0 w-full sm:w-auto"
        >
          <Play className={`w-3.5 h-3.5 shrink-0 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Executing Audit...' : 'Run Gate Diagnostic'}</span>
        </button>
      </div>

      {/* Terminal Diagnostic Box if triggered */}
      {testLog.length > 0 && (
        <div className="bg-black/90 border border-sky-500/25 rounded-xl p-3 sm:p-4 font-mono text-[11px] sm:text-xs space-y-1 text-sky-100 overflow-x-auto shadow-inner">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-sky-300/70 pb-1 mb-1 border-b border-sky-500/20 font-bold">
            <span>TERMINAL DIAGNOSTIC STREAM</span>
            <span className="text-cyan-300">STATUS 200 OK</span>
          </div>
          {testLog.map((log, i) => (
            <div key={i} className="flex items-start gap-1.5 whitespace-nowrap">
              <span className="text-cyan-400 select-none font-bold">&gt;</span>
              <span className={log.includes('ACTIVE') || log.includes('passed') || log.includes('ONLINE') || log.includes('CLEARANCE') ? 'text-cyan-300 font-bold' : log.includes('LOCKED') ? 'text-gray-500' : 'text-sky-100'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Capabilities Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
        {modules.map((mod) => (
          <div
            key={mod.name}
            className={`p-3 sm:p-4 rounded-xl border font-mono transition-all duration-200 ${
              mod.unlocked
                ? 'bg-[#0B1428] border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                : 'bg-black/40 border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-xs font-extrabold text-white leading-snug">
                {mod.name}
              </span>
              {mod.unlocked ? (
                <span className="shrink-0 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold text-cyan-300 bg-sky-500/15 border border-sky-400/40 px-1.5 sm:px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  ACTIVE
                </span>
              ) : (
                <span className="shrink-0 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold text-gray-500 bg-white/5 border border-white/10 px-1.5 sm:px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3" />
                  LOCKED
                </span>
              )}
            </div>
            <p className="text-[11px] font-sans text-sky-100/70 leading-relaxed mb-2.5">
              {mod.desc}
            </p>
            <div className="pt-2 border-t border-sky-500/15 flex items-center justify-between text-[10px] text-sky-200/60">
              <span>Gate Threshold:</span>
              <span className={mod.unlocked ? 'text-cyan-300 font-extrabold' : 'text-gray-500'}>
                {mod.req} ({mod.tierNeeded})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

