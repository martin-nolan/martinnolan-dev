---
name: self-heal-loop
description: Convert any failure, unexpected skill output, or guidance drift into a permanent harness improvement (rule, skill, or docs) before continuing. Wider than "blocked" — trigger whenever something in the repo, the skills, or the docs doesn't match reality.
---

# self-heal-loop

## Purpose

Prevent repeated failures by making every meaningful gap — whether a hard failure, an unexpected skill output, or discovered guidance drift — produce a durable fix in repo guidance, checks, or skill files.

## Use this skill when

- `pr-reviewer` returns `blocked`
- a regression or repeated failure pattern appears
- remediation debt is identified (temporary patch, TODO/FIXME, follow-up gap)
- a skill produces unexpected output mid-execution (guidance doesn't match what the repo actually does)
- a skill instruction refers to a file, path, command, or route that no longer exists
- you discover during execution that no skill or doc covers the situation you're in (gap, not just mismatch)
- a repeated agent misconception surfaces that hasn't been captured in `docs/agent-feedback-log.md`

## Required classification

Classify the failure as one of:

- `rule-missing` — a lint/test/check rule that would have caught this doesn't exist
- `skill-gap` — a skill's guidance is wrong, missing, or outdated for the current repo state
- `doc-drift` — docs/guidance don't match current code, commands, or architecture
- `test-gap` — missing test coverage let a regression through
- `other` — classify explicitly; do not use as a catch-all

## Required permanent-fix targets

Choose at least one:

- lint/test/check enforcement update
- skill update under `skills/*/SKILL.md`
- docs correction under `docs/*` (including `docs/agent-feedback-log.md` when recurring)
- follow-up ticket with explicit rationale (only when fix cannot be in current slice)

## Required remediation artifact

Every invocation must leave behind one concrete artifact:

- a code/test/check change
- a skill update
- a docs update
- or a follow-up ticket with explicit rationale

Do not stop at diagnosis only.

## Workflow

1. Capture the failure or mismatch evidence and affected path.
2. Classify root cause.
3. Apply one permanent-fix target (or create explicit follow-up ticket):
   - for `skill-gap`: update the relevant `skills/*/SKILL.md` directly, then run `skills/doc-and-skill-sync/SKILL.md` (`doc-and-skill-sync`) to check for related drift
   - for `doc-drift`: update `docs/*` per the routing table below
   - for `rule-missing` or `test-gap`: add the enforcement or test, then run verification
   - if the remediation changes harness-governance behavior, run `docs/harness-evaluation.md`; do not run it for typo-only or meaning-preserving doc cleanup
4. Re-run the failed verification path.
5. Re-run `pr-reviewer` done gate.

## Repetition rule

If the same misconception, drift pattern, or command mismatch appears three times in one slice or session:

- update `docs/agent-feedback-log.md`
- update the nearest owning doc or skill
- prefer adding enforcement or verification if the failure was machine-detectable

## Docs routing for durable fixes

When fix target is docs, select by failure type:

- route/contract drift -> `docs/api.md`, `docs/frontend-architecture.md`, `docs/backend-architecture.md`
- command/setup drift -> `docs/local-development.md`, `docs/contributing.md`
- recurring runtime/debug issue -> `docs/troubleshooting.md`
- repeated agent misconception -> `docs/agent-feedback-log.md`
- guidance-map drift -> `AGENTS.md` and `docs/documentation-standards.md`
- skill instruction wrong/outdated -> update `skills/*/SKILL.md` then run `skills/doc-and-skill-sync/SKILL.md`

## Output contract

- failure or mismatch observed (`yes|no`)
- root cause class
- affected path or command
- permanent fix applied
- remediation artifact created
- status (`fixed-now|ticketed`)
- rerun result summary

## Skill composition

- Use `skills/debug-triage/SKILL.md` when root cause is unclear.
- Use `skills/doc-and-skill-sync/SKILL.md` (`doc-and-skill-sync`) when remediation includes any guidance or skill drift.
- Use `skills/jira-ticket-creator/SKILL.md` for follow-up work that cannot be fixed in current slice.
- Use `skills/pr-reviewer/SKILL.md` to confirm the repaired state.
