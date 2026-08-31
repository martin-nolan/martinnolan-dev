export const site = {
  name: 'Martin Nolan',
  role: 'AI Engineer',
  headline: 'Building AI products across the stack.',
  introduction:
    'Most of my work is in TypeScript/Next.js and Python/FastAPI, building interfaces, APIs and services around models. ' +
    'I also experiment with coding-agent orchestration, evaluation and observability, and use what I learn to improve how I work.',
  links: {
    github: 'https://github.com/martin-nolan',
    linkedin: 'https://www.linkedin.com/in/martinnolan0110',
    email: 'mailto:martinnolan_1@hotmail.co.uk',
  },
} as const;

export const agentRoles = [
  {
    name: 'Quick Code',
    kind: 'Execution',
    description: 'Small changes where the approach is already settled.',
  },
  {
    name: 'Code',
    kind: 'Execution',
    description: 'Most implementation, debugging and routine design work.',
  },
  {
    name: 'Deep Code',
    kind: 'Execution',
    description:
      'Harder technical work that benefits from a fresh context and more room to investigate.',
  },
  {
    name: 'Delivery Plan',
    kind: 'Planning',
    description:
      'Read-only planning when sequencing, migration or cross-layer dependencies need working out first.',
  },
  {
    name: 'Docs',
    kind: 'Documentation',
    description:
      'Updates repository guidance when the implementation changes something other engineers need to rely on.',
  },
  {
    name: 'Review',
    kind: 'Review',
    description:
      'An independent final read of the changed code and the evidence used to verify it.',
  },
  {
    name: 'Principal Engineer',
    kind: 'Technical judgement',
    description:
      'A second opinion for an important technical choice that the implementation cannot settle from repository evidence.',
  },
] as const;

export const systemDecisions = [
  {
    title: 'One orchestrator owns the task',
    text:
      'It keeps track of the outcome, current state and anything still unproven. ' +
      'A specialist gets one part of the work and returns the result.',
  },
  {
    title: 'Specialists have narrow jobs',
    text: 'Quick Code handles small settled changes, Code does most implementation, and Deep Code gets the harder work that needs more investigation.',
  },
  {
    title: 'Handoffs carry known state',
    text:
      'Decisions, useful repository context and checks that still hold move with the task. ' +
      'A new context should not mean starting the investigation again.',
  },
  {
    title: 'I measure where the harness gets stuck',
    text:
      'OpenTelemetry records model calls, tool use, latency and recovery. ' +
      'I use the traces to find repeated loops and routes that cost more than the work warrants.',
  },
] as const;

export const loopStages = [
  'Understand',
  'Plan',
  'Implement',
  'Check',
  'Review',
  'Observe',
  'Adjust',
] as const;

export const ownership = {
  model: [
    'Read unfamiliar code and form a working hypothesis',
    'Implement a scoped change',
    'Review a candidate',
    'Investigate failures where the cause is still unclear',
  ],
  software: [
    'Access and permissions',
    'Validation and workflow state',
    'Tests and CI',
    'Git and production controls',
  ],
} as const;

export const highlights = [
  {
    title: 'Full-stack applications',
    text: 'I work across Next.js and TypeScript frontends, Python/FastAPI services, authentication, API contracts, backend state and the loading and failure behaviour around them.',
  },
  {
    title: 'Model-backed workflows',
    text: 'I work on how context gets assembled, what the model is asked to return, what gets validated in code and how people inspect or act on the result.',
  },
  {
    title: 'Engineering foundations',
    text: 'I also work on logging and tracing, access control, repository standards, reusable project baselines and the coding-agent harness described above.',
  },
] as const;
