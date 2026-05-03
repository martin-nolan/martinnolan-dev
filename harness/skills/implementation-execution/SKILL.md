---
name: implementation-execution
description: Convert one workstream/ticket into a bounded execution slice with stop condition, patch scope, and verification artifacts.
---

# implementation-execution

## Purpose

Turn approved plan/ticket intent into one safe, mergeable execution slice with minimal blast radius.

## Use this skill when

- executing one workstream from `docs/workstreams/*.md`
- implementing one Jira ticket from the structured template
- preventing scope creep during coding

## Inputs

- selected workstream or ticket text
- module boundary
- explicit non-goals
- done criteria

## Execution steps

1. Restate outcome in one sentence.
2. Define patch scope:
   - modules/files allowed
   - modules/files explicitly out of scope
3. Define stop condition:
   - what must be true to stop coding this slice
4. Define verification plan:
   - baseline checks
   - required tests to add/update
   - execution commands
5. Implement only in-scope changes.
6. Produce evidence and handoff summary.

## Repo-specific boundaries

- Prefer single-module slices unless a cross-module boundary is forced (see rubric below).
- If UI screens/components/flows are touched, invoke `skills/ui-ux/SKILL.md`.
- If route contracts are touched, invoke `skills/contract-change/SKILL.md`.
- If schema/migrations are touched, invoke `skills/migration-change/SKILL.md`.
- If release surfaces are touched, invoke `skills/release-readiness/SKILL.md`.

## Cross-module decision rubric

A slice **must** cross module boundaries only when one of these is true:

| Condition | Modules forced into scope |
|---|---|
| A shared type or model in a shared contract module changes | All modules that import that type |
| An API route contract changes | contract owner module + direct caller/proxy modules |
| A proxy route or proxy mapping changes | UI module + downstream service |
| A background job payload or async schema changes | producer and consumer surfaces |
| A release version bump is required | All deployable modules with changed behaviour |

In all other cases, **split into separate slices**. Do not expand scope because a related change is nearby. Flag the adjacent change as a deferred item in the output contract.

If you are unsure whether a boundary condition is met, default to single-module and note the potential cross-module dependency in residual items.

## Output contract

- execution slice summary
- in-scope files
- out-of-scope files
- stop condition met (`yes|no`)
- verification evidence summary
- residual/deferred items

## Skill composition

- Use `skills/workstream-planner/SKILL.md` when no slice exists yet.
- Use `skills/delivery-loop/SKILL.md` when running full end-to-end execution from plan intent.
- Use `skills/jira-ticket-creator/SKILL.md` when ticket text is missing/weak.
- Use `skills/testing/SKILL.md` for validation — covers both test strategy and execution.
- Use `skills/pr-reviewer/SKILL.md` for final done/blocked gate.
