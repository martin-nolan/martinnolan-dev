import Reveal from '@/components/Reveal';
import type { SupportingSystem } from '@/content/types';

type SupportingSystemsSectionProps = {
  items: SupportingSystem[];
};

export default function SupportingSystemsSection({ items }: SupportingSystemsSectionProps) {
  return (
    <section aria-labelledby="supporting-systems-title" className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
      <Reveal>
        <div className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[color:rgba(8,43,46,0.045)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker">Additional systems work</p>
              <h2 id="supporting-systems-title" className="section-title">
                Real-world assistant work behind the same pattern.
              </h2>
            </div>

            <div className="space-y-5">
              {items.map((item) => (
                <article key={item.title}>
                  <span className="inline-flex rounded-full border border-[color:rgba(11,122,132,0.2)] bg-[color:rgba(11,122,132,0.08)] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-teal)]">
                    {item.label}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--ink-muted)]">
                    {item.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.signals.map((signal) => (
                      <span
                        key={signal}
                        className="inline-flex rounded-full border border-[color:var(--border-soft)] bg-[color:var(--paper)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--ink-muted)]"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
