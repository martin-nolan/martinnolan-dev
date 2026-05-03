---
name: delivery-loop
description: End-to-end execution loop from idea/plan to implementation, review gate, and release readiness with bounded slices.
---

# delivery-loop

## Purpose

Run a repeatable, self-correcting delivery loop for this repo without manual process stitching.

## Use this skill when

- implementing any non-trivial change where a bounded slice and deterministic gates are needed
- user asks to implement a plan, ticket, or feature end-to-end
- scope is ambiguous (single module vs cross-module) and needs explicit slicing first
- team wants one consistent path from intent to done/blocked verdict

## Loop stages (required order)

1. Scope and slice
   - use `skills/workstream-planner/SKILL.md`
   - choose one bounded slice only
2. Ticket/intent hardening (when needed)
   - use `skills/jira-ticket-creator/SKILL.md`
3. Execution
   - use `skills/implementation-execution/SKILL.md`
4. Testing and verification
   - use `skills/testing/SKILL.md` — covers both strategy and execution in one pass; includes baseline checks
5. Review gate
   - use `skills/pr-reviewer/SKILL.md`
6. Release gate
   - use `skills/release-readiness/SKILL.md` when release/version/deploy surfaces changed
7. Self-heal
   - invoke `skills/self-heal-loop/SKILL.md` at any stage when:
     - reviewer returns `blocked`
     - a failure or regression appears
     - a skill instruction doesn't match repo reality
     - you discover a gap not covered by any skill or doc

## Dynamic skill routing (mandatory)

At each stage, invoke additional skills based on change surface:

- Contract/API/proxy change:
  - `skills/contract-change/SKILL.md`
  - docs: `docs/architecture.md` plus the nearest target-repo contract doc when one exists
- UI/UX flow or visual behavior change:
  - `skills/ui-ux/SKILL.md`
- Schema/migration/model change:
  - `skills/migration-change/SKILL.md`
  - docs: `docs/architecture.md`, `docs/troubleshooting.md` when a durable gotcha is found
- Failure with unclear root cause:
  - `skills/debug-triage/SKILL.md`
- Release/version/deploy surface touched:
  - `skills/release-readiness/SKILL.md`
- Guidance/docs drift discovered during execution:
  - `skills/doc-and-skill-sync/SKILL.md` (`doc-and-skill-sync`)
- Skill instruction wrong or doesn't match repo:
  - `skills/self-heal-loop/SKILL.md` (classify as `skill-gap`)
- Recurring agent mistake discovered:
  - update `docs/agent-feedback-log.md` via `skills/self-heal-loop/SKILL.md`

## Default slicing rule

If user does not specify scope, execute only the first incomplete/high-priority slice from `docs/workstreams/*.md`.

## Entry points by input shape

- Idea only:
  - start with `skills/workstream-planner/SKILL.md`
- Existing workstream doc:
  - start with slice selection from `docs/workstreams/*.md`
- Existing ticket only:
  - validate/normalize with `skills/jira-ticket-creator/SKILL.md`, then execute one slice
- "Implement the plan":
  - execute one slice only, then rerun loop for next slice if requested

## Stop conditions

- `done`: reviewer verdict is `done` and no unresolved high/critical findings.
- `blocked`: reviewer verdict is `blocked`; emit explicit blocker and next required action.

## Output contract

- selected slice
- executed stages and artifacts produced
- final status (`done|blocked`)
- if blocked: blocker + next slice or remediation path
