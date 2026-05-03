import Reveal from '@/components/Reveal';
import AgentDispatchSurface from '@/components/surfaces/AgentDispatchSurface';
import ResearchWorkspaceSurface from '@/components/surfaces/ResearchWorkspaceSurface';
import type { DemoSurface } from '@/content/types';

type ProductSurfacesSectionProps = {
  items: DemoSurface[];
};

export default function ProductSurfacesSection({ items }: ProductSurfacesSectionProps) {
  const dispatch = items.find((item) => item.id === 'voice-agent-orchestration-console');
  const research = items.find((item) => item.id === 'research-platform');

  return (
    <section id="interfaces" aria-labelledby="interfaces-title" className="border-y border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(235,229,220,0.35))]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">Product Interfaces</p>
            <h2 id="interfaces-title" className="section-title">
              Synthetic interface patterns from the real apps.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8">
          {dispatch ? (
            <Reveal>
              <div className="space-y-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-teal)]">
                      {dispatch.kicker}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                      {dispatch.name}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[color:var(--ink-muted)]">
                    {dispatch.framing}
                  </p>
                </div>
                <AgentDispatchSurface />
              </div>
            </Reveal>
          ) : null}

          {research ? (
            <Reveal delayMs={120}>
              <div className="space-y-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-copper)]">
                      {research.kicker}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                      {research.name}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[color:var(--ink-muted)]">
                    {research.framing}
                  </p>
                </div>
                <ResearchWorkspaceSurface />
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
