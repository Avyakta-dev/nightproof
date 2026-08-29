import { useState } from "react";

async function mockProveAdult(birthYear) {
  await new Promise((r) => setTimeout(r, 1200)); // simulate proof generation time
  const currentYear = new Date().getFullYear();
  const isAdult = currentYear - birthYear >= 18;
  if (!isAdult) throw new Error("Proof failed: under 18");
  return { verified: true };
}

function Panel({ tone, label, children }) {
  const ring = tone === "leak" ? "ring-rose-500/30" : "ring-violet-500/30";
  const glow = tone === "leak" ? "bg-rose-500/5" : "bg-violet-500/5";
  return (
    <div className={`relative rounded-2xl border border-white/10 ${glow} ring-1 ${ring} p-6 backdrop-blur-sm`}>
      <span className="mb-4 inline-block rounded-full border border-white/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/50">
        {label}
      </span>
      {children}
    </div>
  );
}

function LeakyForm({ onSubmit }) {
  const [birthdate, setBirthdate] = useState("");
  return (
    <Panel tone="leak" label="Before · plaintext">
      <h2 className="text-lg font-semibold text-white">Typical signup form</h2>
      <p className="mt-1 text-sm text-white/50">
        Your exact birthdate is sent to and stored by the server.
      </p>
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="mt-4 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-rose-400/60"
      />
      <button
        onClick={() => onSubmit(birthdate)}
        disabled={!birthdate}
        className="mt-3 w-full rounded-lg bg-rose-500/90 px-4 py-2 font-medium text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Submit birthdate to server
      </button>
      {birthdate && (
        <p className="mt-3 font-mono text-xs text-rose-300">
          ⚠ sent to server → birthdate: {birthdate}
        </p>
      )}
    </Panel>
  );
}

function ZkForm() {
  const [birthYear, setBirthYear] = useState("");
  const [status, setStatus] = useState("idle"); // idle | proving | verified | failed
  const [error, setError] = useState("");

  const handleProve = async () => {
    setStatus("proving");
    setError("");
    try {
      await mockProveAdult(Number(birthYear));
      setStatus("verified");
    } catch (e) {
      setStatus("failed");
      setError(e.message);
    }
  };

  return (
    <Panel tone="zk" label="After · zero-knowledge">
      <h2 className="text-lg font-semibold text-white">Midnight age proof</h2>
      <p className="mt-1 text-sm text-white/50">
        Your birth year never leaves this device. Only a proof is generated.
      </p>
      <input
        type="number"
        placeholder="Birth year (e.g. 2000)"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
        className="mt-4 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-violet-400/60"
      />
      <button
        onClick={handleProve}
        disabled={!birthYear || status === "proving"}
        className="mt-3 w-full rounded-lg bg-violet-500/90 px-4 py-2 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {status === "proving" ? "Generating proof…" : "Prove I'm 18+"}
      </button>

      {status === "verified" && (
        <p className="mt-3 font-mono text-xs text-emerald-300">
          ✔ proof verified → server sees only: verified = true
        </p>
      )}
      {status === "failed" && (
        <p className="mt-3 font-mono text-xs text-rose-300">✖ {error}</p>
      )}
    </Panel>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_#050508_60%)] px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-violet-400/70">
          Midnight Hackathon
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Prove it. Don't show it.
        </h1>
        <p className="mt-3 max-w-xl text-white/50">
          The same age check, built two ways — one leaks your data, one proves
          a fact about it without revealing anything else.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <LeakyForm onSubmit={() => {}} />
          <ZkForm />
        </div>
      </div>
    </div>
  );
}