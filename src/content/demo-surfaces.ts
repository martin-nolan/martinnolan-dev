import type { DemoSurface } from './types';

export const demoSurfaces: DemoSurface[] = [
  {
    id: 'agent-dispatch-console',
    name: 'Agent Dispatch Console',
    kicker: 'Synthetic interface pattern',
    summary:
      'A public-facing rebuild of the workflow pattern behind configurable voice-agent testing.',
    framing:
      'Rebuilt with synthetic data to show the product decisions: explicit setup, visible run state, and evidence users can review.',
  },
  {
    id: 'research-workspace',
    name: 'Research Workspace',
    kicker: 'Synthetic interface pattern',
    summary:
      'A public-facing rebuild of an audience-led research and video-testing workspace.',
    framing:
      'Rebuilt to show the interaction model: cohorts, questions, generated evidence, and clearer next actions.',
  },
];
