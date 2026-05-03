# Harness Evaluation

Lightweight regression check for changes to repository guidance, routing, and skills.

Use this when a change touches:

- `AGENTS.md`
- `docs/agent-harness.md`
- `docs/skills-routing.md`
- `docs/documentation-standards.md`
- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`
- `skills/*/SKILL.md`

This is intentionally manual and small. The goal is to catch harness regressions with a grounded rubric before the team has enough usage data to justify stronger automation.

## Trigger Threshold

Run this evaluation only when the change is behaviorally meaningful for the harness. That includes changes to:

- skill selection or routing rules
- read order or entry-point guidance
- `Skill: none` fallback behavior
- self-heal expectations
- canonical ownership of docs or commands
- verification expectations for harness-governance work
- diagrams or prose that change the intended process semantics

Do not run this evaluation for:

- spelling or grammar fixes only
- formatting-only edits
- broken link or path repairs that do not change meaning
- archive moves or file renames with no routing or behavior impact

## Required Checks

Run:

Run the target repo's documentation validation command when one exists.

Then, if the threshold above is met, walk the benchmark set below and score the changed harness against it.

## Benchmark Set

Use these prompts as the fixed comparison set when the harness or repo guidance changes:

1. Implement a small UI-only behavior fix.
2. Plan a new cross-module workstream.
3. Debug a failing UI test before implementing a fix.
4. Review a completed branch against done criteria.
5. Draft a PR title and description from verified branch changes.
6. Update docs after a route or command surface change.
7. Handle a task with no matching repo skill and proceed with `Skill: none`.
8. Recover from stale guidance or a missing command by invoking self-heal.

You do not need to fully execute all eight tasks. Evaluate whether the harness makes the expected next action clear for each one.

## Expected Paths

Use this table as the grounding reference when deciding whether a harness change regressed routing.

| Task | Prompt summary | Expected path | Verification anchor |
| --- | --- | --- | --- |
| 1 | Small UI-only behavior fix | `delivery-loop` | UI verification guidance in `docs/testing.md` |
| 2 | New cross-module plan | `workstream-planner` | plan created or selected from `docs/workstreams/` |
| 3 | Debug failing UI test first | `debug-triage`, then implementation | repro path and UI checks |
| 4 | Review completed branch | `pr-reviewer` | done/blocked review verdict |
| 5 | Draft PR metadata | `pr-authoring` | PR title/description output |
| 6 | Update docs after route/command change | `doc-and-skill-sync` | target repo docs validation command, when one exists |
| 7 | No matching repo skill | `Skill: none` fallback | fallback procedure in `docs/skills-routing.md` |
| 8 | Stale guidance or missing command | `self-heal-loop`, then `doc-and-skill-sync` if drift exists | remediation artifact plus docs validation |

## Scorecard

For each benchmark prompt, score `0` or `1` for:

- correct entry point is obvious
- correct skill or `Skill: none` fallback is obvious
- next document to read is obvious
- required verification step is obvious
- self-heal trigger is obvious when applicable

Recommended summary fields:

| Field | Meaning |
| --- | --- |
| `task` | benchmark prompt number or label |
| `expected_path` | expected skill or fallback path |
| `actual_path` | path a fresh agent would most likely take |
| `score` | `0-5` based on the rubric above |
| `notes` | ambiguity, drift, or wording issue |

Suggested interpretation:

- `5 of 5`: no obvious ambiguity
- `4 of 5`: minor wording issue, route still clear
- `3 of 5` or lower: investigate as a likely regression

## Regression Log

When a harness-governance change regresses the benchmark set, capture a short before/after record in the review output or `docs/agent-feedback-log.md` if the issue is likely to recur.

Recommended fields:

| Field | Meaning |
| --- | --- |
| `change` | file or harness area changed |
| `task` | benchmark task number |
| `before` | previous expected or observed path |
| `after` | regressed or corrected path |
| `impact` | why the regression matters |
| `resolution` | fixed now or follow-up needed |

## Pass Bar

Treat the harness change as acceptable when:

- docs validation passes
- no benchmark prompt has an ambiguous entry point caused by the change
- no benchmark prompt regresses the expected path in the table above
- no task scores below `4 of 5` unless the regression is fixed in the same slice
- any new ambiguity found during scoring is fixed in the same change or recorded in `docs/agent-feedback-log.md`

## Output Expectation

When a harness-governance change is reviewed, capture a short summary in the final report, PR description, or review artifact:

- benchmark prompts checked
- any below-pass scores
- any regressions found
- whether they were fixed in the same slice

Keep this summary to a few lines unless the harness change is large enough to justify a dedicated review artifact.

## Current Boundary

This is a process regression check, not a machine-enforced evaluation framework. Keep it lightweight until the team has enough real usage data to justify stronger automation.
