import type { Harness } from './types';

export const harness: Harness = {
  plainEnglish:
    'A practical way to use coding agents without handing over engineering ownership.',
  principle: 'Agent-assisted work is still engineer-owned work.',
  summary:
    'The harness is not a framework for making agents look clever. It is a set of repo habits: clear context, small scopes, runnable checks, and review evidence. When checks fail or guidance drifts, the fix goes into the repo — so the same issue doesn\'t repeat.',
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
    'Scope is explicit before implementation starts',
    'The change has runnable verification evidence',
    'Docs match what the system actually does',
    'Repeated friction becomes durable repo guidance',
  ],
};
