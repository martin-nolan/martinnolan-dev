type SelfHealLoopDiagramProps = {
  items: string[];
};

export default function SelfHealLoopDiagram({ items }: SelfHealLoopDiagramProps) {
  return (
    <div className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
        Self-heal loop
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[1.2rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(11,122,132,0.06),rgba(255,255,255,0))] p-4"
          >
            <p className="text-sm leading-6 text-[color:var(--ink-strong)]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
