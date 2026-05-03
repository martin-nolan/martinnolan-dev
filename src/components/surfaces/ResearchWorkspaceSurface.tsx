const audiences = [
  'Prospective customers',
  'Under 35',
];

export default function ResearchWorkspaceSurface() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:rgba(8,43,46,0.12)] bg-[linear-gradient(180deg,#fffdf8,#f2f6f2)] shadow-[0_24px_70px_rgba(78,65,52,0.1)]">
      <div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-copper)]">
                  Research Workspace
                </p>
                <h4 className="mt-2 text-lg font-semibold text-[color:var(--ink-strong)]">
                  Ask a structured question of research audiences
                </h4>
              </div>
              <span className="rounded-full border border-[color:rgba(11,122,132,0.18)] bg-[color:rgba(11,122,132,0.08)] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-[color:var(--accent-teal)]">
                Ask mode
              </span>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[color:var(--border-soft)] bg-[color:var(--paper-strong)] p-4">
              <p className="text-sm leading-7 text-[color:var(--ink-strong)]">
                What would make a streaming plan feel more flexible without making the offer look confusing or lower quality?
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Compare value signals',
                'Rank friction points',
                'Surface emotional objections',
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-[color:var(--border-soft)] bg-white px-2.5 py-1.5 text-xs font-medium text-[color:var(--ink-muted)] transition-colors duration-200 hover:border-[color:var(--accent-teal)] hover:text-[color:var(--accent-teal)]"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="mt-5 border-t border-[color:var(--border-soft)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                Audiences
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {audiences.map((audience, index) => (
                  <span
                    key={audience}
                    className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
                      index === 1
                        ? 'border-[color:rgba(11,122,132,0.22)] bg-[color:rgba(11,122,132,0.08)] text-[color:var(--accent-teal)]'
                        : 'border-[color:var(--border-soft)] bg-[color:var(--paper)] text-[color:var(--ink-strong)]'
                    }`}
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                Model
              </p>
              <p className="mt-2 text-sm font-medium text-[color:var(--ink-strong)]">Balanced reasoning</p>
            </div>
            <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                Output mode
              </p>
              <p className="mt-2 text-sm font-medium text-[color:var(--ink-strong)]">Ask + rank responses</p>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,#0d4f57,#0a2f35)] p-5 text-[color:var(--surface-foreground)] shadow-[0_16px_44px_rgba(8,43,46,0.22)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(227,239,239,0.58)]">
                Starting state
              </p>
              <span className="rounded-full border border-[color:rgba(255,255,255,0.1)] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-[color:rgba(227,239,239,0.7)]">
                Ready to run
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                'Choose a focused audience group',
                'Start with one question, then compare objections',
                'Inspect ranked signals before expanding scope',
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-[1.1rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[color:rgba(255,255,255,0.9)]"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
