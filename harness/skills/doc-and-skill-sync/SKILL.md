---
name: doc-and-skill-sync
description: Keep repository documentation AND skill files aligned with implementation. Detects drift in docs/* and skills/*/SKILL.md and creates a draft PR if any is found.
---

# doc-and-skill-sync

## Purpose

Maintain this repository as a self-documenting system by syncing guidance and durable docs with the latest implementation on `main`.

## Use this skill when

- running scheduled or recurring guidance maintenance
- checking whether recent code changes created doc drift
- validating that a fresh Codex session can still understand the repo without user explanation
- updating repo guidance after changes to modules, routes, commands, or infrastructure
- a skill is producing unexpected output that suggests its guidance no longer matches repo reality (cross-reference with `skills/self-heal-loop/SKILL.md` for the fix)
- `self-heal-loop` classifies a root cause as `skill-gap` or `doc-drift`

## Source of truth

Use this order:

1. code, tests, and live route declarations
2. documented command surfaces and runnable commands
3. durable docs in `docs/*`
4. `AGENTS.md` as the repo map
5. `.github/*` as thin assistant guidance

If these disagree, fix the docs in the same change.

## Step 1 — Detect recent change areas

Inspect recent commits on `main` (HEAD) and identify changes to:

- modules or directory structure
- backend or UI route groups
- command surfaces and local workflows
- deployment or infrastructure paths

Use this step to decide which guidance files need review before editing anything.

## Step 2 — Check for drift

Review:

- `AGENTS.md`
- `README.md`
- `docs/*`
- `.github/*`
- module README files
- `skills/*/SKILL.md`

Compare those files against:

- current code and directory structure
- documented command surfaces
- live route declarations and API prefixes
- current deployment and infrastructure paths

For skill files specifically, flag drift when:
- a skill references a command that no longer exists in the relevant command surface
- a skill references a file path, route pattern, or directory that has moved or been removed
- a skill's composition section points to a deprecated or renamed skill

## Step 3 — Fresh-session simulation

Verify that a new agent can determine, from repository contents alone:

- repo identity
- read order
- module layout
- command authority
- durable docs
- which docs must be updated when routes, commands, modules, or infra change

## Step 4 — Apply fixes only if needed

- update docs only where drift exists
- fix stale or broken references in docs and skill files
- align module README files with canonical repo guidance
- update `AGENTS.md` only if repo structure, read order, or command authority changed

Rules:

- keep edits minimal
- do not rewrite correct content just for style
- do not invent behaviour not supported by the repository
- preserve `AGENTS.md` as a map, not a manual
- when fixing skill drift, prefer updating the skill over removing it unless the skill has been formally deprecated

## Step 5 — Validate

Run:

```bash
python3 scripts/validate_docs.py
```

Validation must pass before finishing.

For harness-governance changes, run `docs/harness-evaluation.md` only when the change is behaviorally meaningful. Do not run the harness eval for typo-only, formatting-only, or link/path-only guidance fixes that do not change routing, ownership, fallback behavior, verification expectations, or process semantics.

## Step 6 — Git workflow (when available)

If meaningful doc changes are required:

1. create branch `codex/doc-and-skill-sync-YYYYMMDD`
2. commit with message `docs: sync guidance and skills with latest main`
3. if remote workflow access is available, push branch and create a draft PR

If a draft PR is created, description must include:

- whether drift was found in docs, skills, or both
- what changed
- validation results
- any uncertainties

## Step 7 — No-op behaviour

If no meaningful drift exists:

- make no changes
- do not create a branch/PR
- report exactly: `No guidance drift found. No action needed.`

## Done when

- reviewed docs and skills match current repository truth
- fresh-session understanding works from repo contents alone without user explanation
- validation passes
- either:
  - local commit exists (and optional draft PR when available) for meaningful fixes, or
  - the exact no-op message was reported
