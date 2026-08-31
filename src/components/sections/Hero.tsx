import { site } from '@/content/site';

const areas = [
  'Full-stack AI applications',
  'Evaluation and observability',
  'Agent-assisted engineering',
] as const;

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="page-width hero__layout">
        <div className="hero__copy">
          <h1 id="hero-title">{site.headline}</h1>

          <p className="hero__introduction">{site.introduction}</p>

          <nav className="link-row link-row--hero" aria-label="Profile links">
            <a href={site.links.github} rel="noreferrer" target="_blank">
              GitHub <span aria-hidden="true">↗</span>
            </a>

            <a href={site.links.linkedin} rel="noreferrer" target="_blank">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>

            <a href={site.links.email}>Email</a>
          </nav>
        </div>

        <aside className="hero__areas" aria-label="Areas of work">
          {areas.map((area) => (
            <p key={area}>{area}</p>
          ))}
        </aside>
      </div>
    </section>
  );
}
