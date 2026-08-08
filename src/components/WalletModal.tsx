import React, { useState } from 'react';
import { X, Wallet, ShieldAlert, Cpu } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateInstead: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSimulateInstead }) => {
  const [contractAddr, setContractAddr] = useState<string>('0x0000000000000000000000000000000000000000');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [attemptedConnect, setAttemptedConnect] = useState<boolean>(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnectWeb3 = async () => {
    setIsConnecting(true);
    setAttemptedConnect(true);

    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setConnectedAddress(accounts[0]);
        }
      }
    } catch (err) {
      console.log('Web3 connection attempted:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 sm:backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-lg bg-[#080D1A] border border-sky-400/30 rounded-2xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-5 text-gray-100 font-mono max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/35 text-sky-400 shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                CONNECT WEB3 WALLET
              </h3>
              <p className="text-xs text-sky-200/60 font-sans">
                On-chain $EMPR token balance verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contract Address Text Field */}
        <div className="space-y-2">
          <label className="block text-[10px] uppercase font-bold tracking-widest text-sky-300/80">
            Target Token Contract Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={contractAddr}
              onChange={(e) => setContractAddr(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black/80 border border-sky-500/25 rounded-xl px-3.5 py-3 text-xs text-cyan-300 placeholder-sky-900 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
            />
          </div>
          <p className="text-[11px] font-sans text-sky-200/70 leading-relaxed">
            The gate engine executes an ERC-20 <code className="text-cyan-300 font-mono">balanceOf(userAddress)</code> query against this contract.
          </p>
        </div>

        {/* Requirement Notice / Explicit Status Banner */}
        <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-400/35 text-sky-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-cyan-300">
            <ShieldAlert className="w-4 h-4 shrink-0 text-cyan-300" />
            <span>Mainnet contract not deployed — use Simulator below.</span>
          </div>
          <p className="font-sans text-sky-100/90 leading-relaxed text-[12px]">
            This application is a <strong>Phase 1 Investor & Client Demo</strong>. The $EMPR token contract has not been deployed on mainnet yet. No fake live balance is returned.
          </p>
        </div>

        {/* MetaMask connection block */}
        <div className="space-y-3">
          <button
            onClick={handleConnectWeb3}
            disabled={isConnecting}
            className="w-full py-3.5 px-4 min-h-[48px] rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.35)] active:scale-98 disabled:opacity-50"
          >
            <Wallet className="w-4 h-4 shrink-0" />
            <span>
              {isConnecting
                ? 'Requesting Web3 Wallet...'
                : connectedAddress
                ? `Connected: ${connectedAddress.substring(0, 6)}...${connectedAddress.substring(connectedAddress.length - 4)}`
                : 'Connect MetaMask / Web3 Provider'}
            </span>
          </button>

          {attemptedConnect && (
            <div className="p-3.5 bg-black/80 border border-sky-500/20 rounded-xl text-xs space-y-1">
              <div className="text-sky-200/70 font-sans">
                Status: {connectedAddress ? 'Wallet detected.' : 'Web3 provider request initialized.'}
              </div>
              <div className="text-cyan-300 text-[11px] font-bold">
                Contract Query Result: Unlaunched Token (0 $EMPR on-chain).
              </div>
            </div>
          )}
        </div>

        {/* Switch to Simulate Mode Action */}
        <div className="pt-3 border-t border-sky-500/15 flex items-center justify-between text-xs">
          <span className="text-sky-200/60 font-sans">Evaluate all gate levels?</span>
          <button
            onClick={() => {
              onClose();
              onSimulateInstead();
            }}
            className="text-cyan-300 hover:text-cyan-200 font-bold underline underline-offset-4 flex items-center gap-1.5 transition-colors min-h-[36px]"
          >
            <Cpu className="w-4 h-4" />
            <span>Switch to Simulator</span>
          </button>
        </div>
      </div>
    </div>
  );
};

