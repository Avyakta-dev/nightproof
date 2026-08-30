import { useState } from "react";

async function connectLaceWallet() {
  const registry = window.midnight;
  if (!registry) {
    throw new Error("No Midnight wallet found — install the Lace extension and refresh.");
  }

  const entry = Object.values(registry).find(
    (w) => w.name?.toLowerCase() === "lace"
  );
  if (!entry) {
    throw new Error("Lace wallet not found among installed wallets — check it's enabled.");
  }

  const walletAPI = await entry.connect(); // triggers the Lace connection popup
  const state = await walletAPI.state();
  return state.address; // your real Preprod address
}

export default function WalletConnect() {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    setError("");
    try {
      const addr = await connectLaceWallet();
      setAddress(addr);
    } catch (e) {
      setError(e.message);
    }
    setConnecting(false);
  };

  return (
    <div className="fixed right-4 top-4 z-10">
      {address ? (
        <div className="rounded-full border border-[#D5FF40]/30 bg-[#111111] px-4 py-2 font-mono text-xs text-[#D5FF40]">
          🟢 {address.slice(0, 14)}…{address.slice(-6)}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
        >
          {connecting ? "Connecting…" : "Connect Wallet"}
        </button>
      )}
      {error && (
        <p className="mt-2 max-w-[220px] text-right font-mono text-[10px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}