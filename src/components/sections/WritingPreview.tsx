import Reveal from '@/components/Reveal';
import type { WritingEntry } from '@/content/types';

type WritingPreviewProps = {
  items: WritingEntry[];
};

export default function WritingPreview({ items }: WritingPreviewProps) {
  return (
    <section id="principles" aria-labelledby="principles-title" className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Reveal>
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Principles</p>
          <h2 id="principles-title" className="section-title">
            A few working principles behind the builds.
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-teal)]">
                {item.note}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-muted)]">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
