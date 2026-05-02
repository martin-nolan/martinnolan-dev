---
name: workstream-planner
description: Slice large requests into low-blast workstreams with dependencies, stop conditions, and verification scope.
---

# workstream-planner

## Purpose

Create execution plans that reduce scope creep and preserve momentum in this monorepo.

## Use this skill when

- a task spans multiple modules
- a ticket is too broad for one safe PR
- the team needs low-blast slices with clear handoff points

## Inputs

- objective
- constraints (time, risk tolerance, rollout constraints)
- affected modules and known dependencies

## Steps

1. Define the target outcome in one sentence.
2. Identify risky surfaces (auth, routes, shared models, release/versioning).
3. Split into workstreams with:
   - scope boundary
   - owner module(s)
   - dependency order
   - explicit stop condition
4. For each workstream, define minimal verification.
5. Mark any high-blast work as deferred with rationale.

## Strategic plan document rule

- For cross-module/high-blast work, produce one strategic plan markdown file under `docs/workstreams/`.
- For low-risk single-module work, skip plan-doc creation and return a lightweight task slice directly.

## Output contract

Return:

- workstream list (ordered)
- per-workstream goals and non-goals
- dependencies and blockers
- verification command set
- deferred items
- optional plan-doc path under `docs/workstreams/` when strategic mode is used

## Skill composition

- Use `skills/jira-ticket-creator/SKILL.md` to turn each workstream into a ticket.
- Use `skills/implementation-execution/SKILL.md` to execute one bounded slice at a time.
- Use `skills/testing/SKILL.md` to define required test additions and verification commands per stream.
- Use `skills/release-readiness/SKILL.md` for release-sensitive streams.
