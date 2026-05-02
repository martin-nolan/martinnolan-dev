---
name: contract-change
description: Apply a deterministic update path for API/BFF contract changes across code, docs, and tests.
---

# contract-change

## Purpose

Eliminate contract drift by enforcing a consistent change path when API/BFF behavior changes.

## Use this skill when

- backend route inputs/outputs/status codes change
- frontend proxy or BFF mapping changes
- auth, header, or query parameter contracts change

## Contract surfaces in this repo

- backend route handlers and service modules
- observability or telemetry routes when that module exists
- frontend proxy or BFF handlers when that module exists
- shared types, models, and DTOs used across modules

## Required update path

1. Update implementation at contract owner surface.
2. Update dependent proxy/mapping surface:
   - backend <-> frontend proxy/BFF
   - service <-> service consumer or mapper
3. Update tests:
   - frontend route or proxy tests in the owning frontend test layout
   - Python service tests in the owning module test layout
4. Update docs:
   - `docs/api.md`
   - `docs/frontend-architecture.md`
   - `docs/backend-architecture.md` (when backend route groups/behavior shift)
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
