import Reveal from '@/components/Reveal';
import type { Profile } from '@/content/types';

type CapabilityPillarsProps = {
  items: Profile['capabilityPillars'];
};

export default function CapabilityPillars({ items }: CapabilityPillarsProps) {
  return (
    <section aria-labelledby="capabilities" className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Reveal>
        <div className="mb-10">
          <p className="section-kicker">Focus areas</p>
          <h2 id="capabilities" className="section-title max-w-5xl">
            The model does the processing. The workflow is what makes it usable.
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.9rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,241,233,0.76))] p-6 shadow-[0_18px_46px_rgba(78,65,52,0.05)]"
            >
              <p className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
