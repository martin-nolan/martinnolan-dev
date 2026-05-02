---
name: testing
description: Decide what tests to add/update for a change, then execute repo-aligned verification commands and produce deterministic evidence. Covers both strategy and execution in one sequential pass.
---

# testing

## Purpose

Two phases in one skill: first decide the right test additions, then run the right verification commands. Most changes need both sequentially — keeping them as separate skills creates unnecessary friction.

## Use this skill when

- implementing new behavior or changing contracts
- adding or modifying routes, provider/network behavior, auth logic, or shared models
- verifying a code change before review/merge
- reproducing and confirming a test failure
- collecting review-ready evidence for `pr-reviewer`

## Phase 1 — Test strategy

Define the minimum test additions required before running anything.

### Repo testing structure

- frontend route and component tests: use the frontend module’s colocated test layout
- Python service tests: use the module’s existing `tests/` layout
- repo-guidance validation: `python3 scripts/validate_docs.py`

### Conventions

- Frontend: colocate route and component behavior under the nearest owning feature; mock network/auth boundaries explicitly and assert contract mapping behavior directly.
- Python services: use the repo’s existing async, monkeypatch, and collaborator-fake patterns; assert status, contract, and error behavior directly.

### Decision rubric

1. Route or API contract changed → add/update MVP route contract tests for success + mapped failure behavior.
2. Provider/network behavior changed → add/update tests for timeout/cancellation/status/error mapping; for UI, include loading/empty/error state assertions where applicable.
3. Auth/permission behavior changed → add/update unauthorized/forbidden contract tests.
4. Shared model/type behavior changed → add/update service tests in each impacted module relying on that contract.
5. Release-only metadata/version change → no new behavioral tests; proceed to release-readiness check instead.

### Phase 1 output

- test impact summary by module
- tests to add/update (exact file targets)
- mock strategy per target test
- why existing tests are insufficient (or why no new tests are needed)

## Phase 2 — Verification execution

### Baseline checks (run for every touched module)

- Docs/guidance changes: `python3 scripts/validate_docs.py`
- UI changes: run the target repo's documented UI lint, test, and build checks when they exist
  - include a build check when routing, runtime, or bundle behavior changed
- Python modules: run the module’s documented lint, type-check, and test commands

### Execution depth

1. **Low risk** — run lint/type/doc checks for touched module(s).
2. **Medium risk** (single-module behavior change) — run baseline checks + the module’s focused behavioral suite.
3. **High risk** (cross-module/auth/data-flow/release path) — run all impacted module baseline checks + impacted MVP suites + deterministic smoke evidence.

### Phase 2 output

- selected depth (`low|medium|high`) and reason
- commands run
- pass/fail/skipped per command
- failing command output summary
- final verification status

## Skill composition

- Use `skills/ui-ux/SKILL.md` when UI flow, motion, or interaction behavior changed.
- Use `skills/contract-change/SKILL.md` when route or proxy contracts are affected.
- Use `skills/release-readiness/SKILL.md` when version/tag/release surfaces changed.
- Use `skills/pr-reviewer/SKILL.md` for the final done/blocked gate.
