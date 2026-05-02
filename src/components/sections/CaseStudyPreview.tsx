import Reveal from '@/components/Reveal';
import type { CaseStudy } from '@/content/types';

type CaseStudyPreviewProps = {
  items: CaseStudy[];
};

export default function CaseStudyPreview({ items }: CaseStudyPreviewProps) {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="mb-10">
          <p className="section-kicker">Case studies</p>
          <h2 id="case-studies-title" className="section-title max-w-5xl">
            Two product builds that show the same pattern in practice.
          </h2>
          <p className="mt-4 max-w-5xl text-base leading-8 text-[color:var(--ink-muted)]">
            Both are less about a model call and more about making a workflow usable: setup,
            state, evidence, and review.
          </p>
        </div>
      </Reveal>

      <div className="space-y-5">
        {items.map((item, index) => (
          <Reveal key={item.id} delayMs={index * 110}>
            <article className="rounded-[1.6rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-6 shadow-[0_18px_48px_rgba(78,65,52,0.055)]">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <span className="inline-flex rounded-full border border-[color:rgba(11,122,132,0.2)] bg-[color:rgba(11,122,132,0.08)] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-teal)]">
                    {item.label}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--ink-muted)]">
                    {item.summary}
                  </p>
                  <p className="mt-5 text-base leading-7 text-[color:var(--ink-strong)]">
                    {item.outcome}
                  </p>
                </div>

                <div>
                  <dl className="grid gap-5 md:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                        Problem
                      </dt>
                      <dd className="mt-2 text-sm leading-7 text-[color:var(--ink-muted)]">{item.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                        What I owned
                      </dt>
                      <dd className="mt-2 text-sm leading-7 text-[color:var(--ink-muted)]">{item.ownership}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                        System decisions
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--ink-muted)]">
                        {item.decisions.map((decision) => (
                          <li key={decision}>• {decision}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                        Tradeoffs
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--ink-muted)]">
                        {item.tradeoffs.map((tradeoff) => (
                          <li key={tradeoff}>• {tradeoff}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.proofPoints.map((proofPoint) => (
                      <span
                        key={proofPoint}
                        className="inline-flex rounded-full border border-[color:var(--border-soft)] bg-[color:var(--paper-strong)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--ink-muted)]"
                      >
                        {proofPoint}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
