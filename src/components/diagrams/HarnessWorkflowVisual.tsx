import { Fragment } from 'react';

const workflowStages = [
  {
    number: '01',
    title: 'Standards',
    detail: 'Shared delivery expectations, review standards, and SOPs.',
  },
  {
    number: '02',
    title: 'Repo baseline',
    detail: 'Templates, docs, skills, checks, and repo-local guidance.',
  },
  {
    number: '03',
    title: 'Delivery loop',
    detail: 'Shape, plan, build, verify, review, and improve.',
  },
  {
    number: '04',
    title: 'Review evidence',
    detail: 'Scope, tests, docs, risks, follow-ups, and release impact.',
  },
];

const feedbackItems = ['Docs', 'Skills', 'Checks', 'Templates'];

export default function HarnessWorkflowVisual() {
  return (
    <div className="rounded-[1.6rem] border border-[color:var(--border-soft)] bg-[color:var(--paper)] p-5 shadow-[0_18px_48px_rgba(78,65,52,0.055)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            Simple workflow view
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--ink-muted)]">
            A sharper page-native version of the harness diagram: standards create the starting point,
            the delivery loop produces evidence, and repeated friction improves the repo.
          </p>
        </div>
        <span className="w-fit rounded-full border border-[color:rgba(11,122,132,0.2)] bg-[color:rgba(11,122,132,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-teal)]">
          Engineer-owned
        </span>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {workflowStages.map((stage, index) => (
          <Fragment key={stage.number}>
            <div
              className="rounded-[1.3rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(243,237,227,0.68))] p-4"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-teal)]">
                {stage.number}
              </span>
              <p className="mt-3 text-base font-semibold text-[color:var(--ink-strong)]">
                {stage.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--ink-muted)]">
                {stage.detail}
              </p>
            </div>
            {index < workflowStages.length - 1 ? (
              <div
                className="hidden items-center justify-center text-xl font-semibold text-[color:var(--ink-soft)] lg:flex"
                aria-hidden="true"
              >
                →
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-dashed border-[color:rgba(11,122,132,0.28)] bg-[color:rgba(11,122,132,0.05)] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-medium text-[color:var(--ink-strong)]">
            Feedback loop: repeated friction becomes durable repo improvement.
          </p>
          <div className="flex flex-wrap gap-2">
            {feedbackItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[color:var(--border-soft)] bg-[color:var(--paper)] px-3 py-1 text-xs font-medium text-[color:var(--ink-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
