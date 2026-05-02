---
name: pr-reviewer
description: Review a code change for bugs, regressions, missing tests, doc drift, and config drift. Use for requests like "review this", "review my PR", "scan for issues", or "look for regressions". Do not use for writing new documentation from scratch.
use_when: The user asks for a review or when a change needs a risk-focused pass before merge.
do_not_use_for: Writing new feature docs from scratch without reviewing code changes.
inputs:
  - diff or changed files
  - relevant tests
  - affected docs
outputs:
  - prioritized findings
  - doc/test gaps
verification:
  - findings ordered by severity
  - doc update expectations called out when behavior changed
---
# PR Reviewer

## Scope

- Bugs and behavioral regressions
- Missing or weak tests
- Contract drift between code and docs
- Config or environment drift
- Release or validation gaps introduced by the change

## Inputs To Gather

- Changed files or diff
- Relevant `README.md`, `AGENTS.md`, `docs/documentation-standards.md`, `docs/testing.md`, and documented command surfaces
- Existing tests near the change
- The module-local commands needed to verify the touched area

## Workflow

1. Read the changed code before forming conclusions.
2. Identify behavior changes, not just line edits.
3. Check the nearest tests for coverage gaps or stale assertions.
4. Check the matching docs when commands, config, API, or behavior moved.
5. Prefer concrete findings with exact file and line evidence over general advice.
6. Keep focus on user-visible risk, correctness, and drift.

## Checks

- Does the code still do what the previous contract promised?
- Did a behavior change without a matching test update?
- Did commands, config, env vars, or API shapes move without doc updates?
- Did the change create FE/BE drift when both modules are involved?
- Did the change skip an expected validation step for the touched area?

## Output Shape

1. Findings first
2. Open questions or assumptions
3. Brief change summary only if needed

## Failure Modes

- Restating the diff without identifying risk
- Preferring style nits over correctness issues
- Ignoring missing tests or doc drift
- Giving vague review comments without evidence
