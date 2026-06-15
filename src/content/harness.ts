import type { Harness } from './types';

export const harness: Harness = {
  plainEnglish:
    'A practical way to use coding agents without pretending they own the work.',
  principle: 'Agent-assisted work is still engineer-owned work.',
  summary:
    'The harness is just repo hygiene applied to agent work: enough context, small changes, runnable checks, and notes a reviewer can use. When a command breaks or guidance drifts, the fix goes back into the repo.',
  repoEvidence:
    'Reusable harness materials live in this repo as a public-safe template: guidance, skills, review checks, scratchpad patterns, and workflow prompts.',
  flow: ['Set context', 'Plan the change', 'Build and verify', 'Review evidence', 'Log what changed'],
  guidanceLayers: [
    'Team standards and review expectations',
    'Repo-local AGENTS.md guidance',
    'Task docs for ambiguous work',
    'Reusable skills for repeated workflows',
    'Validation commands and review evidence',
  ],
  selfHealTriggers: [
    'Stale or contradictory guidance',
    'A command that no longer works',
    'Validation failing for repeated reasons',
    'Generated changes that introduce drift',
  ],
  reviewReadiness: [
    'Scope is clear before implementation starts',
    'The change has commands a reviewer can rerun',
    'Docs match what the system actually does',
    'Repeated friction becomes repo guidance',
  ],
};
