import type { WritingEntry } from './types';

export const writing: WritingEntry[] = [
  {
    title: 'Make the workflow visible',
    summary:
      'Good AI systems show setup, state, evidence, and recovery paths. The user should not have to guess what the system is doing.',
    note: 'Principle',
  },
  {
    title: 'Treat evaluation as product work',
    summary:
      'Scores, transcripts, metadata, and explanations need usable interfaces. Evaluation is not finished when the backend produces a number.',
    note: 'Principle',
  },
  {
    title: 'Keep agent-assisted work reviewable',
    summary:
      'Agents can speed up delivery, but scope, verification, risk, and final judgment still need to be owned by an engineer.',
    note: 'Principle',
  },
];
