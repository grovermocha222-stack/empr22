import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { PhaseNoticeBanner } from './components/PhaseNoticeBanner';
import { SimulatePanel } from './components/SimulatePanel';
import { GateProgressBar } from './components/GateProgressBar';
import { TierGateCard } from './components/TierGateCard';
import { BotCapabilitiesConsole } from './components/BotCapabilitiesConsole';
import { WalletModal } from './components/WalletModal';
import { TIERS_DATA, getCurrentTier } from './data/tiers';
import { Shield, KeyRound, Cpu, Terminal, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [balance, setBalance] = useState<number>(10000); // Default to Bronze threshold for immediate active preview
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const simulatorRef = useRef<HTMLDivElement>(null);

  const currentTier = getCurrentTier(balance);

  const handleFocusSimulator = () => {
    if (simulatorRef.current) {
      simulatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(255,255,255,0))] text-gray-200 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200 relative overflow-x-hidden">
      {/* Subtle Ambient Accent Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/15 to-transparent -translate-y-1/2 pointer-events-none z-0"></div>

      {/* Persistent Header */}
      <Header
        currentTier={currentTier}
        balance={balance}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 relative z-10">
        {/* Phase 1 Demo Banner */}
        <PhaseNoticeBanner onFocusSimulator={handleFocusSimulator} />

        {/* Gate Progress Clearance Pipeline */}
        <GateProgressBar
          balance={balance}
          currentTier={currentTier}
          onSetBalance={setBalance}
        />

        {/* Simulate Balance Panel */}
        <SimulatePanel
          balance={balance}
          onBalanceChange={setBalance}
          currentTier={currentTier}
          containerRef={simulatorRef}
        />

        {/* Tier Cards Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <h2 className="text-lg sm:text-xl font-extrabold font-mono text-white uppercase tracking-wider leading-none">
                  Turnstile Clearance Levels
                </h2>
                <span className="inline-flex items-center text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-400/30 px-2 py-0.5 rounded-full shrink-0">
                  4 GATE TIERS
                </span>
              </div>
              <p className="text-xs text-sky-200/60 mt-0.5 font-sans">
                Algorithmic gates lift immediately as simulated $EMPR balance crosses threshold parameters
              </p>
            </div>
            <div className="text-xs font-mono text-gray-300 bg-black/80 px-3.5 py-2 rounded-xl border border-sky-500/20 self-start sm:self-auto shadow-[0_0_15px_rgba(0,180,255,0.08)]">
              Simulated State: <span className="text-cyan-400 font-extrabold">{balance.toLocaleString()} $EMPR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TIERS_DATA.map((tier) => {
              const isUnlocked = balance >= tier.threshold;
              const isCurrentTier = currentTier.id === tier.id;

              return (
                <TierGateCard
                  key={tier.id}
                  tier={tier}
                  userBalance={balance}
                  isUnlocked={isUnlocked}
                  isCurrentTier={isCurrentTier}
                  onSelectPreset={setBalance}
                />
              );
            })}
          </div>
        </section>

        {/* Interactive Bot Capabilities & Security Console */}
        <BotCapabilitiesConsole
          currentTier={currentTier}
          balance={balance}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050608] py-8 text-gray-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-gray-300">$EMPR ACCESS GATE</span>
            <span className="text-gray-600">|</span>
            <span>Quantitative Turnstile v1.0</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-[11px]">
            <span>Clearance Gates: Free (0) / Bronze (10k) / Silver (50k) / Gold (200k)</span>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSimulateInstead={handleFocusSimulator}
      />
    </div>
  );
}
