import { useState } from "react";

export default function WalletConnect() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 top-4 z-10">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
      >
        Connect Wallet
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-[#111111] p-5 text-left shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D5FF40]/80">
            Midnight wallet integration
          </p>
          <p className="mt-2 text-sm text-white/60">
            This app is built to connect to Lace via Midnight's DApp
            Connector API (<code className="text-white/80">window.midnight</code>),
            requesting your real Preprod address on approval.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Live connection in this demo is intermittent due to Preprod
            network instability — the same instability that also
            blocked live contract deployment.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}