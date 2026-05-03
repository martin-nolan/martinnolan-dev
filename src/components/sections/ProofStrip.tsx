import Reveal from '@/components/Reveal';
import type { Profile } from '@/content/types';

type ProofStripProps = {
  items: Profile['proofStrip'];
};

export default function ProofStrip({ items }: ProofStripProps) {
  return (
    <section aria-labelledby="proof-strip" className="border-b border-[color:var(--border-soft)] bg-[color:var(--paper-strong)]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.label} delayMs={index * 100} className="h-full">
              <article className="h-full rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-5 shadow-[0_20px_50px_rgba(78,65,52,0.05)]">
                <p className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-medium text-[color:var(--ink-strong)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--ink-muted)]">
                  {item.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
