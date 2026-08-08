import React, { useState } from 'react';
import { Sliders, RotateCcw, Plus, Cpu, Sparkles } from 'lucide-react';
import { TierInfo } from '../types';

interface SimulatePanelProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  currentTier: TierInfo;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const SimulatePanel: React.FC<SimulatePanelProps> = ({
  balance,
  onBalanceChange,
  currentTier,
  containerRef
}) => {
  const [inputValue, setInputValue] = useState<string>(balance.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/,/g, '');
    setInputValue(e.target.value);
    
    const parsed = parseInt(rawVal, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onBalanceChange(Math.min(100000000, parsed));
    } else if (rawVal === '') {
      onBalanceChange(0);
    }
  };

  const handleQuickSelect = (amount: number) => {
    setInputValue(amount.toString());
    onBalanceChange(amount);
  };

  const handleAdjust = (delta: number) => {
    const updated = Math.max(0, balance + delta);
    setInputValue(updated.toString());
    onBalanceChange(updated);
  };

  const quickPresets = [
    { label: '0 $EMPR', value: 0, tier: 'Free' },
    { label: '10,000 $EMPR', value: 10000, tier: 'Bronze' },
    { label: '50,000 $EMPR', value: 50000, tier: 'Silver' },
    { label: '200,000 $EMPR', value: 200000, tier: 'Gold' },
  ];

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="bg-[#080D1A] border border-sky-400/20 rounded-2xl p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,180,255,0.1)] backdrop-blur-2xl relative overflow-hidden"
    >
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sky-500/15">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/35 text-sky-400 shrink-0 shadow-[0_0_18px_rgba(56,189,248,0.25)]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 font-mono tracking-tight">
                SIMULATE $EMPR HOLDINGS
                <span className="text-[10px] uppercase font-mono font-bold text-cyan-300 bg-sky-500/10 border border-sky-400/30 px-2 py-0.5 rounded-full">
                  LIVE OVERRIDE
                </span>
              </h3>
              <p className="text-xs text-sky-200/60 font-sans">
                Inject custom token balances to test turnstile gate responses and feature activations
              </p>
            </div>
          </div>

          <button
            onClick={() => handleQuickSelect(0)}
            className="self-start sm:self-auto flex items-center justify-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-mono font-bold transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset (0)</span>
          </button>
        </div>

        {/* Input & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Main Input Box */}
          <div className="lg:col-span-6 space-y-2">
            <label className="block text-[10px] uppercase font-bold text-sky-300/80 tracking-widest font-mono">
              Simulated Token Balance
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-cyan-400 pointer-events-none">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                value={balance.toLocaleString()}
                onChange={handleInputChange}
                placeholder="Enter amount..."
                className="w-full bg-black/80 border border-sky-500/25 focus:border-cyan-400 rounded-xl pl-9 pr-20 py-2.5 sm:py-3 text-sm sm:text-lg font-mono font-bold text-cyan-300 placeholder-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all shadow-inner"
              />
              <div className="absolute right-2.5 font-mono text-[11px] sm:text-xs font-bold text-cyan-300 bg-sky-500/15 px-2.5 py-1 rounded-lg border border-sky-400/30 pointer-events-none">
                $EMPR
              </div>
            </div>

            {/* Quick Increment Chips */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: '+1k', val: 1000 },
                { label: '+5k', val: 5000 },
                { label: '+25k', val: 25000 },
                { label: '+100k', val: 100000 },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleAdjust(chip.val)}
                  className="px-1.5 sm:px-2.5 py-1.5 min-h-[34px] rounded-lg bg-sky-950/40 hover:bg-sky-900/40 text-sky-200 hover:text-cyan-300 border border-sky-500/20 text-[11px] font-mono font-bold transition-all active:scale-95 flex items-center justify-center gap-0.5"
                >
                  <Plus className="w-3 h-3 text-cyan-400 shrink-0" />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Preset Buttons (0 / 10,000 / 50,000 / 200,000) */}
          <div className="lg:col-span-6 space-y-2">
            <label className="block text-[10px] uppercase font-bold text-sky-300/80 tracking-widest font-mono">
              Tier Gate Threshold Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickPresets.map((preset) => {
                const isSelected = balance === preset.value;
                return (
                  <button
                    key={preset.value}
                    onClick={() => handleQuickSelect(preset.value)}
                    className={`p-2.5 sm:p-3 min-h-[50px] sm:min-h-[56px] rounded-xl border font-mono text-left transition-all duration-200 flex flex-col justify-between active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-br from-sky-400 via-cyan-400 to-sky-500 text-black border-cyan-300 font-extrabold shadow-[0_0_20px_rgba(56,189,248,0.45)]'
                        : 'bg-sky-950/30 hover:bg-sky-900/30 border-sky-500/20 text-sky-100 hover:border-sky-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 opacity-90">
                      <span>{preset.tier}</span>
                      {isSelected && <Sparkles className="w-3 h-3 text-black shrink-0" />}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold tracking-tight">
                      {preset.value === 0 ? '0' : preset.value >= 1000 ? `${preset.value / 1000}k` : preset.value} <span className="text-[10px] opacity-80">$EMPR</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-sky-200/70 mb-2">
            <span>0 $EMPR</span>
            <span className="text-cyan-300 font-extrabold">{balance.toLocaleString()} $EMPR</span>
            <span>250,000+ $EMPR</span>
          </div>
          <input
            type="range"
            min="0"
            max="250000"
            step="1000"
            value={Math.min(250000, balance)}
            onChange={(e) => {
              const val = Number(e.target.value);
              setInputValue(val.toString());
              onBalanceChange(val);
            }}
            className="w-full h-2.5 bg-sky-950/80 border border-sky-500/20 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

