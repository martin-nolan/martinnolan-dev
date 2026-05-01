import type { Profile } from './types';

export const profile: Profile = {
  name: 'Martin Nolan',
  role: 'GenAI Software Engineer',
  headline: 'I build AI systems that fit real workflows.',
  summary:
    'I work across full-stack product engineering, workflow design, evaluation, and delivery standards. The useful work is usually around the model: clear setup, visible runs, inspectable evidence, and interfaces people can trust.',
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
        'Built a workflow for agents, scenarios, behaviours, call history, and runtime evaluation so teams could test more than the happy path.',
    },
    {
      value: 'Research workflows',
      label: 'Research and video testing',
      detail:
        'Shaped tools for asking questions of research audiences, comparing responses, and turning study outputs into usable evidence.',
    },
    {
      value: 'Reviewable delivery',
      label: 'Engineering harness',
      detail:
        'Defined repo guidance, validation checks, and review evidence so agent-assisted work stayed scoped and engineer-owned.',
    },
  ],
  capabilityPillars: [
    {
      title: 'Product engineering',
      description:
        'I build the product surface around AI systems: setup, state, feedback, permissions, support paths, and clear user flows.',
    },
    {
      title: 'Workflow design',
      description:
        'I turn loose operational processes into configurable workflows that teams can run, repeat, inspect, and improve.',
    },
    {
      title: 'Evaluation and evidence',
      description:
        'I make outputs easier to judge by exposing context, run history, scores, transcripts, metadata, and review evidence.',
    },
    {
      title: 'Delivery discipline',
      description:
        'I use agents where they help, but keep scope, verification, release readiness, and engineering ownership explicit.',
    },
  ],
};
