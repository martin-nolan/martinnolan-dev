# Repository Harness - Harness Self-Healing Sweep

Run this scheduled task against the latest state of the `main` branch only.

If the current branch is not `main`, switch to `main` before analysis. Do not leave the repository on a different branch if a user branch was checked out locally before the run.

Use:

- `$self-heal-loop` for the primary workflow
- `$pr-reviewer` when review-style classification helps
- `$debug-triage` when root cause is unclear

## Goal

Identify recurring delivery or review failures, skill instructions that do not match repo reality, and guidance gaps, then convert them into durable harness fixes.

Keep this task focused on harness quality only.

## Requirements

- Inspect recent changes on `main` and recurring failure patterns.
- Inspect `skills/*/SKILL.md` for stale file paths, stale commands, or stale route patterns.
- Classify each meaningful issue as one of:
  - `rule-missing`
  - `skill-gap`
  - `doc-drift`
  - `test-gap`
  - `other` with explicit description
- If remediation changes harness-governance behavior, run `docs/harness-evaluation.md`.
- Do not run `docs/harness-evaluation.md` for typo-only, formatting-only, link/path-only, or other meaning-preserving cleanup.
- If any guidance or skill files are edited, rerun:

```bash
<target repo docs validation command>
```

## Output Expectations

Report:

- top recurring issues, maximum `3-5`
- root cause class for each
- permanent fix target and file path(s)
- what was updated now versus ticketed for later
- validation result if docs or skills changed
- harness-eval result only when that threshold was met

If no meaningful recurring issues are found, report exactly:

`No harness drift found. No action needed.`
