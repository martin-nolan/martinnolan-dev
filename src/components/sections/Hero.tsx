import type { Profile } from '@/content/types';

type HeroProps = {
  profile: Profile;
};

const buildAreas = [
  {
    title: 'Testing workflows',
    detail: 'Configurable agents, scenarios, runs, transcripts, and evaluation.',
  },
  {
    title: 'Research workflows',
    detail: 'Audience-led studies, video testing, jobs, outputs, and evidence review.',
  },
  {
    title: 'Reviewable delivery',
    detail: 'Repo guidance, validation checks, and engineer-owned agent-assisted work.',
  },
];

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border-soft)] bg-[radial-gradient(circle_at_top_left,_rgba(11,122,132,0.1),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.48),_rgba(255,255,255,0))]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="hero-enter text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">
              {profile.role}
            </p>
            <h1 className="hero-enter hero-enter-delay-1 max-w-4xl text-5xl font-semibold leading-[1.02] -tracking-wider text-[color:var(--ink-strong)] sm:text-6xl lg:text-7xl">
              {profile.headline}
            </h1>
            <p className="hero-enter hero-enter-delay-2 max-w-2xl text-lg leading-8 text-[color:var(--ink-muted)]">
              {profile.summary}
            </p>
          </div>

          <div className="hero-enter hero-enter-delay-3 flex flex-col gap-3 sm:flex-row">
            <a
              href="#harness"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[color:var(--ink-strong)] px-5 text-sm font-medium text-[color:var(--paper)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              See how I work
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#case-studies"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[color:var(--border-strong)] px-5 text-sm font-medium text-[color:var(--ink-strong)] transition-colors duration-200 hover:border-[color:var(--accent-teal)] hover:text-[color:var(--accent-teal)]"
            >
              View case studies
            </a>
          </div>
        </div>

        <div className="hero-enter hero-enter-delay-4 rounded-[2rem] border border-[color:var(--border-soft)] bg-[color:rgb(255_255_255_/_0.58)] p-6 shadow-[0_28px_80px_rgba(78,65,52,0.09)] backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">
                  What I build
                </p>
                <p className="mt-3 text-lg font-medium leading-7 text-[color:var(--ink-strong)]">
                  Products built around real AI systems.
                </p>
              </div>
              <span className="inline-flex rounded-full border border-[color:rgba(11,122,132,0.22)] bg-[color:rgba(11,122,132,0.08)] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-teal)]">
                Proof areas
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {buildAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-[1.4rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-4"
                >
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                    {area.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[color:var(--ink-muted)]">
                    {area.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
