import HarnessWorkflowVisual from '@/components/diagrams/HarnessWorkflowVisual';
import OperatingModelDiagram from '@/components/diagrams/OperatingModelDiagram';
import Reveal from '@/components/Reveal';
import type { Harness } from '@/content/types';

type HarnessSummaryProps = {
  harness: Harness;
};

export default function HarnessSummary({ harness }: HarnessSummaryProps) {
  return (
    <section id="harness" aria-labelledby="harness-title" className="border-b border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(243,237,227,0.55))]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="mb-10">
          <div>
            <p className="section-kicker">How I work</p>
            <h2 id="harness-title" className="section-title max-w-5xl">
              {harness.plainEnglish}
            </h2>
            <p className="mt-4 max-w-5xl text-base leading-8 text-[color:var(--ink-muted)]">{harness.summary}</p>
          </div>
          <p className="mt-6 rounded-[1.6rem] border border-[color:var(--border-soft)] bg-[color:rgba(255,255,255,0.46)] px-5 py-4 text-sm leading-7 text-[color:var(--ink-muted)] shadow-[0_18px_48px_rgba(78,65,52,0.045)]">
            {harness.repoEvidence}
          </p>
        </div>
      </Reveal>

      <div className="mt-5">
        <Reveal>
          <div className="rounded-[1.6rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-6 shadow-[0_18px_48px_rgba(78,65,52,0.055)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              Core principle
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
              {harness.principle}
            </p>
            <ul className="my-6 grid grid-cols-2 gap-3 text-sm leading-7 text-[color:var(--ink-muted)]">
              {harness.reviewReadiness.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <OperatingModelDiagram flow={harness.flow} />
          </div>
        </Reveal>
      </div>

      <Reveal delayMs={160} className="mt-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.6rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              What keeps it grounded
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {harness.guidanceLayers.map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-[color:var(--border-soft)] bg-[color:var(--paper-strong)] px-3 py-1 text-xs font-medium text-[color:var(--ink-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[1.6rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              When it improves
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {harness.selfHealTriggers.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(11,122,132,0.06),rgba(255,255,255,0))] px-3 py-2 text-sm leading-6 text-[color:var(--ink-muted)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={220} className="mt-5">
        <HarnessWorkflowVisual />
      </Reveal>
      </div>
    </section>
  );
}
