import { useState } from "react";

export default function LandingPage({ onSignUp }) {
  const [privacyOn, setPrivacyOn] = useState(true);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D5FF40]/80">
        Nightly · a social platform (demo)
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Where you belong,<br />privately.
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-white/40">
        A fictional social platform built to show where this exact signup
        pattern belongs — age-restricted apps, dating apps, and any platform
        that needs to verify you're 18+ without collecting your birthdate.
      </p>

      <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-[#111111] px-4 py-2.5">
        <span className={`text-sm font-medium ${privacyOn ? "text-white/40" : "text-white"}`}>
          Standard
        </span>
        <button
          onClick={() => setPrivacyOn(!privacyOn)}
          className={`relative h-6 w-11 rounded-full transition ${
            privacyOn ? "bg-[#D5FF40]" : "bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-black transition-transform ${
              privacyOn ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${privacyOn ? "text-[#D5FF40]" : "text-white/40"}`}>
          🔒 Privacy Mode
        </span>
      </div>

      <button
        onClick={() => onSignUp(privacyOn)}
        className="mt-8 block w-full rounded-full bg-[#D5FF40] px-8 py-3 font-semibold text-black transition hover:bg-[#c2ec2e] sm:w-auto sm:mx-auto"
      >
        Sign Up
      </button>

      <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
        {[
          ["🔒", "Private by design", "Turn on Privacy Mode and your birthdate never touches our servers."],
          ["⚡", "Instant verification", "Proofs generate in about a second."],
          ["✅", "Still fully compliant", "Meets age-gating requirements, honestly."],
        ].map(([icon, title, desc]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-[#111111] p-4">
            <div className="text-2xl">{icon}</div>
            <div className="mt-2 font-semibold text-white">{title}</div>
            <div className="mt-1 text-sm text-white/40">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}