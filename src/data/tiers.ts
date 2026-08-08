import { TierInfo } from '../types';

export const TIERS_DATA: TierInfo[] = [
  {
    id: 'free',
    name: 'Free',
    threshold: 0,
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    borderColor: 'border-slate-800',
    glowColor: 'rgba(148, 163, 184, 0.15)',
    bgGradient: 'from-slate-900/80 to-slate-950/90',
    iconName: 'ShieldAlert',
    summary: 'Public preview level with basic market observation tools.',
    features: [
      'View new token launches',
      'Basic wallet tracker',
      'Delayed alerts'
    ],
    maxWallets: '0',
    executionSpeed: 'None / Delayed'
  },
  {
    id: 'bronze',
    name: 'Bronze',
    threshold: 10000,
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
    borderColor: 'border-amber-900/60',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    bgGradient: 'from-amber-950/30 via-slate-900/80 to-slate-950/90',
    iconName: 'ShieldCheck',
    summary: 'Essential automated trading gate with entry-level sniping capability.',
    features: [
      'Access to sniping bot',
      'Standard execution speed',
      'One wallet connection'
    ],
    maxWallets: '1',
    executionSpeed: 'Standard (~1.2s)'
  },
  {
    id: 'silver',
    name: 'Silver',
    threshold: 50000,
    badgeColor: 'bg-slate-800/90 text-cyan-300 border-cyan-500/40',
    borderColor: 'border-cyan-500/50',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    bgGradient: 'from-cyan-950/30 via-slate-900/80 to-slate-950/90',
    iconName: 'Zap',
    summary: 'Advanced bot suite with speed routing, multi-wallet and profit auto-triggers.',
    features: [
      'Faster execution',
      'Up to 5 wallets',
      'Auto-sell and take-profit features',
      'Priority RPC access'
    ],
    maxWallets: '5',
    executionSpeed: 'High-speed (~300ms)'
  },
  {
    id: 'gold',
    name: 'Gold',
    threshold: 200000,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    borderColor: 'border-amber-500/80',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    bgGradient: 'from-amber-950/40 via-amber-900/20 to-slate-950/95',
    iconName: 'Crown',
    summary: 'Maximum clearance tier with ultra-low latency, honeypot shielding, and unlimited copy-trading.',
    features: [
      'Fastest execution',
      'Unlimited wallets',
      'Copy trading',
      'Rug pull / honeypot detection',
      'Beta feature access',
      'VIP community'
    ],
    maxWallets: 'Unlimited', executionSpeed: 'Ultra-Low Latency (<50ms)'
  }
];

export function getCurrentTier(balance: number): TierInfo {
  if (balance >= 200000) return TIERS_DATA[3]; // Gold
  if (balance >= 50000) return TIERS_DATA[2];  // Silver
  if (balance >= 10000) return TIERS_DATA[1];  // Bronze
  return TIERS_DATA[0];                        // Free
}

export function getNextTier(balance: number): { nextTier: TierInfo | null; remaining: number; progressPercent: number } {
  if (balance >= 200000) {
    return { nextTier: null, remaining: 0, progressPercent: 100 };
  }
  
  let targetTier: TierInfo;
  let lowerBound = 0;
  
  if (balance < 10000) {
    targetTier = TIERS_DATA[1]; // Bronze
    lowerBound = 0;
  } else if (balance < 50000) {
    targetTier = TIERS_DATA[2]; // Silver
    lowerBound = 10000;
  } else {
    targetTier = TIERS_DATA[3]; // Gold
    lowerBound = 50000;
  }
  
  const remaining = targetTier.threshold - balance;
  const range = targetTier.threshold - lowerBound;
  const currentInRange = balance - lowerBound;
  const progressPercent = Math.min(100, Math.max(0, (currentInRange / range) * 100));
  
  return { nextTier: targetTier, remaining, progressPercent };
}
