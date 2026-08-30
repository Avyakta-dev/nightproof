import { useState } from "react";
import { BackLink, PageHeader } from "../components/Shared";

export default function SignupStandard({ onBack }) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCreateAccount = async () => {
    setSending(true);
    try {
      await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthdate }),
      });
    } catch (e) {
      // ignore network errors for demo purposes
    }
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-md">
      <BackLink onBack={onBack} />
      <PageHeader
        eyebrow="Nightly · sign up · standard"
        title="Create your account"
        desc="Your exact birthdate is collected and stored on our servers to verify your age."
      />

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-6 ring-1 ring-red-500/20">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-white outline-none focus:border-red-400/60"
        />

        <label className="mt-4 block text-xs font-semibold uppercase tracking-widest text-white/40">
          Date of birth
        </label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-white outline-none focus:border-red-400/60"
        />

        <button
          onClick={handleCreateAccount}
          disabled={!name || !birthdate || sending}
          className="mt-5 w-full rounded-xl bg-white/10 px-4 py-2.5 font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {sending ? "Sending to server…" : "Create account"}
        </button>

        {submitted && (
          <p className="mt-4 font-mono text-xs text-red-400">
            ⚠ sent to server → name: {name}, birthdate: {birthdate} (check
            Network tab: httpbin.org/post)
          </p>
        )}
      </div>
    </div>
  );
}