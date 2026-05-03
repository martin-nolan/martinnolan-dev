---
name: contract-change
description: Apply a deterministic update path for API/proxy contract changes across code, docs, and tests.
---

# contract-change

## Purpose

Eliminate contract drift by enforcing a consistent change path when API/proxy behavior changes.

## Use this skill when

- service route inputs/outputs/status codes change
- UI proxy or proxy mapping changes
- auth, header, or query parameter contracts change

## Contract surfaces in this repo

- service route handlers and service modules
- observability or telemetry routes when that module exists
- UI proxy or proxy handlers when that module exists
- shared types, models, and DTOs used across modules

## Required update path

1. Update implementation at contract owner surface.
2. Update dependent proxy/mapping surface:
   - service <-> UI proxy/proxy
   - service <-> service consumer or mapper
3. Update tests:
   - UI route or proxy tests in the owning UI test layout
   - service tests in the owning test layout
4. Update docs:
   - `docs/architecture.md`
   - `docs/testing.md` when verification expectations change
   - nearest feature or contract doc when the target repo has one
5. Run verification commands for impacted modules.

## Guardrail checks

- include explicit status code mapping behavior for error cases
- include auth/permission behavior where applicable
- include query/header mapping behavior when proxying
- do not merge contract change with no test/doc updates unless explicitly justified

## Output contract

- changed contract summary (before/after)
- impacted modules and files
- required test updates
- required docs updates
- verification commands executed

## Skill composition

- Use `skills/testing/SKILL.md` for exact tests to add/update and command execution evidence.
- Use `skills/pr-reviewer/SKILL.md` for done/blocked gate.
