import { useState } from "react";
import { BackLink, PageHeader } from "../components/Shared";

async function mockProveAdult(birthYear) {
  await new Promise((r) => setTimeout(r, 1200));
  const currentYear = new Date().getFullYear();
  const isAdult = currentYear - birthYear >= 18;
  if (!isAdult) throw new Error("Proof failed: under 18");
  return { verified: true };
}

export default function SignupPrivate({ onBack }) {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [status, setStatus] = useState("idle");
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
    <div className="mx-auto max-w-md">
      <BackLink onBack={onBack} />
      <PageHeader
        eyebrow="Nightly · sign up · privacy mode"
        title="Create your account"
        desc="Prove you're 18+ using a Midnight zero-knowledge proof — your birth year never leaves this device."
      />

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-6 ring-1 ring-[#D5FF40]/25">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-white outline-none focus:border-[#D5FF40]/60"
        />

        <label className="mt-4 block text-xs font-semibold uppercase tracking-widest text-white/40">
          Birth year (kept private)
        </label>
        <input
          type="number"
          placeholder="e.g. 2000"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-white outline-none focus:border-[#D5FF40]/60"
        />

        <button
          onClick={handleProve}
          disabled={!name || !birthYear || status === "proving"}
          className="mt-5 w-full rounded-xl bg-[#D5FF40] px-4 py-2.5 font-semibold text-black transition hover:bg-[#c2ec2e] disabled:cursor-not-allowed disabled:opacity-30"
        >
          {status === "proving" ? "Generating proof…" : "Prove I'm 18+ & create account"}
        </button>

        {status === "verified" && (
          <p className="mt-4 font-mono text-xs text-[#D5FF40]">
            ✔ proof verified → server stores only: name + verified = true
          </p>
        )}
        {status === "failed" && (
          <p className="mt-4 font-mono text-xs text-red-400">✖ {error}</p>
        )}
      </div>
    </div>
  );
}