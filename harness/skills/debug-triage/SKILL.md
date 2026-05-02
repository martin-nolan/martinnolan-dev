---
name: debug-triage
description: Deterministically reproduce failures, collect repo-relevant logs/signals, and narrow root cause before patching.
---

# debug-triage

## Purpose

Prevent premature fixes by forcing deterministic reproduction and evidence-led root-cause narrowing.

## Use this skill when

- a test/check fails and cause is unclear
- runtime behavior differs between UI, API, background jobs, integrations, or observability surfaces
- repeated regressions indicate unresolved root-cause class

## Reproduction-first workflow

1. Pin exact failing command and inputs.
2. Reproduce in the smallest module scope.
3. Capture evidence before code changes.
4. Classify failure type.
5. Patch only after root-cause hypothesis is explicit.

## Repo evidence map

- Frontend or BFF:
  - run the frontend module locally
  - verify the failing route, page, or proxy handler in the owning frontend path
  - run the frontend test command or a targeted suite
- Backend:
  - run the backend module locally
  - check the owning router, service, or schema path
  - run the documented service test command for the affected area
- Worker:
  - run the worker module locally
  - verify queue, config, and task handling in the owning worker path
- Observability or telemetry backend:
  - run that module locally and verify the affected ingest, trace, or API flow
- DB or migrations:
  - use the impacted Python service module’s migration status/history commands

## Failure classes (repo-specific)

- `auth-session-boundary`: auth/session propagation or role checks
- `bff-contract-mapping`: proxy param/status/shape mismatch
- `backend-router-service`: backend route/service mismatch or schema drift
- `worker-queue-runtime`: queue config, message parsing, or processing-state failures
- `migration-schema-drift`: migration/order/ownership/extension issues
- `non-functional-default`: timeout/cancellation/status-check/error-mapping gap

## Output contract

- deterministic repro command
- evidence summary (logs/check output)
- failure class
- narrowed root cause
- patch scope recommendation (file/module bounded)

## Skill composition

- Use `skills/testing/SKILL.md` to run repro and regression checks.
- Use `skills/contract-change/SKILL.md` if route/contract drift is involved.
- Use `skills/migration-change/SKILL.md` if schema/migration surfaces are involved.
