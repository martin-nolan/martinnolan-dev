import { agentRoles } from '@/content/site';

export default function AgentGraph() {
  return (
    <figure className="agent-graph" aria-labelledby="agent-graph-title">
      <figcaption className="agent-graph__header">
        <span>Control model</span>
        <strong id="agent-graph-title">
          One orchestrator. Leaf specialists. No recursive delegation.
        </strong>
      </figcaption>

      <div className="agent-graph__flow">
        <div className="agent-node agent-node--intent">
          <span>Developer intent</span>
          <small>Outcome and authority</small>
        </div>

        <div className="agent-graph__arrow" aria-hidden="true">
          ↓
        </div>

        <div className="agent-node agent-node--engineer">
          <span>Engineer</span>
          <small>Owns the complete workstream</small>
        </div>

        <div className="agent-graph__roles">
          {agentRoles.map((role) => (
            <div className={`agent-node agent-node--${role.kind.toLowerCase()}`} key={role.name}>
              <span>{role.name}</span>
              <small>{role.description}</small>
            </div>
          ))}
        </div>

        <p className="agent-graph__resolution">Every route resolves against</p>
        <div className="agent-node agent-node--truth">
          <span>Repository truth</span>
          <small>Code · tests · contracts · commands · CI</small>
        </div>
      </div>
    </figure>
  );
}
