import { loopStages, ownership } from '@/content/site';

export default function EngineeringLoop() {
  return (
    <div className="engineering-loop">
      <ol className="engineering-loop__stages" aria-label="Engineering improvement loop">
        {loopStages.map((stage) => (
          <li key={stage}>
            <strong>{stage}</strong>
          </li>
        ))}
      </ol>

      <div className="ownership-split">
        <section aria-labelledby="model-work-title">
          <h3 id="model-work-title">Useful model work</h3>

          <ul>
            {ownership.model.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="deterministic-work-title">
          <h3 id="deterministic-work-title">Kept deterministic</h3>

          <ul>
            {ownership.software.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <p className="engineering-loop__note">
        The traces are most useful when the same failure keeps coming back. I can find where the
        work first went wrong, fix the owning layer and add a regression when the failure is likely
        to recur.
      </p>
    </div>
  );
}
