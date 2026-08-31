import { highlights } from '@/content/site';

export default function ProductEngineering() {
  return (
    <section className="section section--practice" id="practice" aria-labelledby="practice-title">
      <div className="page-width">
        <div className="section-heading section-heading--inverse">
          <p className="eyebrow">Product engineering</p>

          <div>
            <h2 id="practice-title">Most of my work is around the model.</h2>

            <p>
              I work on interfaces, APIs, workflow state, evaluation and observability, including
              what the user sees while model-backed work is running or when something fails.
            </p>
          </div>
        </div>

        <div className="highlights">
          {highlights.map((highlight) => (
            <article key={highlight.title}>
              <h3>{highlight.title}</h3>
              <p>{highlight.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
