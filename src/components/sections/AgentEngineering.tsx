import AgentGraph from '@/components/diagrams/AgentGraph';
import EngineeringLoop from '@/components/diagrams/EngineeringLoop';
import { systemDecisions } from '@/content/site';

export default function AgentEngineering() {
  return (
    <section className="section section--system" id="system" aria-labelledby="system-title">
      <div className="page-width">
        <div className="section-heading">
          <p className="eyebrow">Agent-assisted development</p>

          <div>
            <h2 id="system-title">How I use coding agents</h2>

            <p>
              I use one orchestrator and a small set of specialist agents. The orchestrator owns the
              task, hands off a defined piece of work, and brings the result back into the main
              context. The specialists do not call each other.
            </p>
          </div>
        </div>

        <AgentGraph />

        <div className="system-decisions">
          {systemDecisions.map((decision) => (
            <article key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
            </article>
          ))}
        </div>

        <div className="loop-introduction">
          <p className="eyebrow">Improving the harness</p>

          <div>
            <h2>Learning from the runs</h2>

            <p>
              I collect traces for model calls, tool use, latency and recovery. They make it much
              easier to see when an agent keeps rediscovering the same information, takes an
              unnecessarily expensive route or gets stuck proving something that is already known.
            </p>

            <p>
              When a pattern repeats, I can work out whether the change belongs in the repository,
              routing, a deterministic check or an eval.
            </p>
          </div>
        </div>

        <EngineeringLoop />
      </div>
    </section>
  );
}
