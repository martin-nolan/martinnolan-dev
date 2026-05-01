const runRows = [
  {
    status: 'Evaluated',
    scenario: 'Payment query',
    behaviour: 'Price-sensitive caller',
    duration: '03:12',
    evidence: 'Ready',
  },
  {
    status: 'Running',
    scenario: 'Contract change',
    behaviour: 'Escalation request',
    duration: '01:44',
    evidence: 'Collecting',
  },
  {
    status: 'Queued',
    scenario: 'Service issue',
    behaviour: 'Confused caller',
    duration: '--',
    evidence: 'Pending',
  },
];

export default function AgentDispatchSurface() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:rgba(8,43,46,0.18)] bg-[color:var(--surface-deep)] text-[color:var(--surface-foreground)] shadow-[0_26px_80px_rgba(8,43,46,0.28)]">
      <div className="border-b border-[color:rgba(255,255,255,0.08)] px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(227,239,239,0.58)]">
              Agent Dispatch Console
            </p>
            <h4 className="mt-2 text-lg font-semibold text-white">Billing Support Voice Agent</h4>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Agent setup', 'Call setup', 'Tests', 'Run', 'Results'].map((tab, index) => (
              <span
                key={tab}
                className={`inline-flex rounded-full px-3 py-1.5 transition-colors duration-200 ${
                  index === 4
                    ? 'border border-[color:rgba(73,195,206,0.35)] bg-[color:rgba(73,195,206,0.16)] text-[color:var(--surface-foreground)]'
                    : 'border border-[color:rgba(255,255,255,0.08)] text-[color:rgba(227,239,239,0.6)]'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <div className="rounded-[1.6rem] border border-[color:rgba(255,255,255,0.07)] bg-[color:rgba(255,255,255,0.03)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(227,239,239,0.58)]">
              Setup summary
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] bg-[color:rgba(255,255,255,0.04)] p-3">
                <p className="text-xs text-[color:rgba(227,239,239,0.55)]">Provider</p>
                <p className="mt-2 text-sm font-medium">Voice AI Provider</p>
              </div>
              <div className="rounded-[1.2rem] bg-[color:rgba(255,255,255,0.04)] p-3">
                <p className="text-xs text-[color:rgba(227,239,239,0.55)]">Evaluation mode</p>
                <p className="mt-2 text-sm font-medium">Runtime evaluation</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[color:rgba(255,255,255,0.07)] bg-[color:rgba(255,255,255,0.03)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(227,239,239,0.58)]">
                Test matrix preview
              </p>
              <span className="rounded-full border border-[color:rgba(191,120,79,0.35)] bg-[color:rgba(191,120,79,0.16)] px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--surface-copper)]">
                9 combinations
              </span>
            </div>
            <div className="mt-4 grid gap-2">
              {[
                'Payment query × Price-sensitive caller',
                'Contract change × Escalation request',
                'Service issue × Confused caller',
              ].map((row) => (
                <div key={row} className="rounded-2xl border border-[color:rgba(255,255,255,0.06)] p-3 text-sm text-[color:rgba(255,255,255,0.88)] transition-colors duration-200 hover:bg-[color:rgba(255,255,255,0.05)]">
                  {row}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Runs today', '12'],
              ['Pass rate', '91%'],
              ['Median duration', '03:08'],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`rounded-[1.4rem] border p-4 ${
                  index === 1
                    ? 'border-[color:rgba(73,195,206,0.25)] bg-[color:rgba(73,195,206,0.12)]'
                    : 'border-[color:rgba(255,255,255,0.07)] bg-[color:rgba(255,255,255,0.03)]'
                }`}
              >
                <p className="text-xs text-[color:rgba(227,239,239,0.58)]">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[1.6rem] border border-[color:rgba(255,255,255,0.07)] bg-[color:rgba(255,255,255,0.03)]">
            <div className="grid grid-cols-[0.9fr_1.1fr_1.2fr_0.8fr_0.8fr] gap-3 border-b border-[color:rgba(255,255,255,0.06)] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:rgba(227,239,239,0.55)]">
              <span>Status</span>
              <span>Scenario</span>
              <span>Behaviour</span>
              <span>Duration</span>
              <span>Evidence</span>
            </div>
            <div>
              {runRows.map((row) => (
                <div
                  key={`${row.scenario}-${row.behaviour}`}
                  className="surface-row grid grid-cols-[0.9fr_1.1fr_1.2fr_0.8fr_0.8fr] gap-3 p-4 text-sm text-[color:rgba(255,255,255,0.88)]"
                >
                  <span
                    className={`inline-flex w-fit rounded-full px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${
                      row.status === 'Evaluated'
                        ? 'border border-[color:rgba(73,195,206,0.3)] bg-[color:rgba(73,195,206,0.16)] text-[color:var(--surface-foreground)]'
                        : row.status === 'Running'
                          ? 'status-running border border-[color:rgba(255,214,128,0.25)] bg-[color:rgba(255,214,128,0.12)] text-[color:#f5d788]'
                          : 'border border-[color:rgba(255,255,255,0.1)] bg-[color:rgba(255,255,255,0.04)] text-[color:rgba(227,239,239,0.65)]'
                    }`}
                  >
                    {row.status}
                  </span>
                  <span>{row.scenario}</span>
                  <span>{row.behaviour}</span>
                  <span>{row.duration}</span>
                  <span>{row.evidence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
