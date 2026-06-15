import type { Profile } from './types';

export const profile: Profile = {
  name: 'Martin Nolan',
  role: 'AI Engineer',
  headline: 'I build product and orchestration layers for AI systems.',
  summary:
    'I work on the application layer for model calls: orchestration, prompts and inputs, interfaces, run visibility, evaluation surfaces, and the service contracts that make the system usable in real workflows.',
  links: {
    github: {
      label: 'GitHub',
      href: 'https://github.com/martin-nolan',
    },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/martinnolan0110',
    },
    email: {
      label: 'Email',
      href: 'mailto:martinnolan_1@hotmail.co.uk',
    },
  },
  proofStrip: [
    {
      value: 'Configurable runs',
      label: 'Voice-agent testing',
      detail:
        'Built a way to configure voice agents, inject scenarios and behaviours, keep call history, and evaluate runs without relying on one-off manual checks.',
    },
    {
      value: 'Research workflows',
      label: 'Research and video testing',
      detail:
        'Shaped tools for asking structured research questions, comparing responses, and keeping the useful evidence close to the work.',
    },
    {
      value: 'Reviewable delivery',
      label: 'Engineering harness',
      detail:
        'Defined repo guidance and validation checks so agent-assisted changes stayed scoped, testable, and owned by an engineer.',
    },
  ],
  capabilityPillars: [
    {
      title: 'Product engineering',
      description:
        'I build the screens, model-call flows, and service contracts for AI systems: setup, state, feedback, permissions, and support paths.',
    },
    {
      title: 'Workflow design',
      description:
        'I turn loose operational processes into flows teams can run more than once without rebuilding the setup each time.',
    },
    {
      title: 'Evaluation and evidence',
      description:
        'I make outputs easier to judge by putting context, run history, scores, and transcripts where reviewers need them.'
    },
    {
      title: 'Delivery discipline',
      description:
        'I use agents where they speed things up, but keep scope, checks, release risk, and ownership explicit.',
    },
  ],
};
