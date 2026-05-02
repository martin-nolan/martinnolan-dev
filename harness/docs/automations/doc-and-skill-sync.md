# Repository Harness - Documentation & Skill Sync

Run this scheduled task against the latest state of the `main` branch only.

If the current branch is not `main`, switch to `main` before analysis. Do not leave the repository on a different branch if a user branch was checked out locally before the run.

Use `$doc-and-skill-sync` for this task.

## Goal

Keep the repository’s guidance layer, including both `docs/*` and `skills/*/SKILL.md`, aligned with the latest commits on `main`.

## Requirements

- Apply only minimal, high-confidence fixes if meaningful drift exists.
- Detect stale docs and stale skill references against current code, commands, and repo behavior.
- Run `docs/harness-evaluation.md` only when the guidance change is behaviorally meaningful for routing, read order, fallback behavior, self-heal behavior, verification expectations, or process semantics.
- Do not run `docs/harness-evaluation.md` for trivial wording, formatting, broken-link, archive-only, or other meaning-preserving changes.

## Output Expectations

If meaningful changes were made, report:

- whether drift was found in docs, skills, or both
- files updated
- validation status
- branch or PR status when applicable
- harness-eval result only when that threshold was met

If no meaningful drift was found, report exactly:

`No guidance drift found. No action needed.`
