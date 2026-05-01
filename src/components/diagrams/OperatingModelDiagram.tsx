import type { Harness } from '@/content/types';

type OperatingModelDiagramProps = {
  flow: Harness['flow'];
};

export default function OperatingModelDiagram({ flow }: OperatingModelDiagramProps) {
  return (
    <div className="rounded-[1.8rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
        Operating model
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {flow.map((step, index) => (
          <div key={step} className="operating-step rounded-[1.4rem] border border-[color:var(--border-soft)] bg-[color:var(--paper-strong)] p-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="mt-2 text-sm font-semibold text-[color:var(--ink-strong)]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
