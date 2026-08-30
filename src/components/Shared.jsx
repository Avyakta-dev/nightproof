export function Panel({ tone, label, children }) {
  const ring = tone === "leak" ? "ring-red-500/20" : "ring-[#D5FF40]/25";
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-[#111111] ring-1 ${ring} p-6`}>
      <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </span>
      {children}
    </div>
  );
}

export function BackLink({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="mb-6 text-xs font-semibold text-white/30 hover:text-white/60"
    >
      ← back to Nightly
    </button>
  );
}

export function PageHeader({ eyebrow, title, desc }) {
  return (
    <>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D5FF40]/80">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-white/40">{desc}</p>
    </>
  );
}