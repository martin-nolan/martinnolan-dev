type GuidanceHierarchyDiagramProps = {
  items: string[];
};

export default function GuidanceHierarchyDiagram({ items }: GuidanceHierarchyDiagramProps) {
  return (
    <div className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
        Guidance hierarchy
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="rounded-[1.2rem] border border-[color:var(--border-soft)] bg-[color:var(--paper-strong)] p-4"
          >
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
              Layer {index + 1}
            </span>
            <p className="mt-2 text-sm leading-6 text-[color:var(--ink-strong)]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
