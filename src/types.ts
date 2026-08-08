export type TierLevel = 'free' | 'bronze' | 'silver' | 'gold';

export interface TierInfo {
  id: TierLevel;
  name: string;
  threshold: number;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  bgGradient: string;
  iconName: string;
  summary: string;
  features: string[];
  maxWallets: string;
  executionSpeed: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  contractAddress: string;
  errorMsg: string | null;
  isConnecting: boolean;
}
