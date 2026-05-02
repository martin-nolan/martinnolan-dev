# Agent-Assisted Engineering Harness

This folder stores a generic, public-safe harness pattern for agent-assisted engineering work.

It is not used by the portfolio runtime. It exists as a reusable template artifact: Markdown instructions and skill files that can be copied into a new repository and adapted to that repo's real commands, modules, and review expectations.

## Contents

- `AGENTS.md` - root-ready starter repo map for a generated or target repository.
- `AGENTS.template.md` - starter repo map and read-order guidance.
- `.github/` - thin assistant pointer files and validation workflow templates.
- `docs/agent-harness.md` - delivery loop and governance model.
- `docs/skills-routing.md` - intent-to-skill routing rules.
- `docs/review-readiness.md` - lightweight evidence checklist for handoff.
- `docs/harness-evaluation.md` - lightweight regression check for harness changes.
- `docs/agent-feedback-log.md` - recurring correction log template.
- `docs/requirements/` - feature requirement template and asset convention.
- `docs/workstreams/` - durable workstream planning templates.
- `docs/automations/` - reusable maintenance prompt templates.
- `workbench/` - ignored scratchpad pattern for temporary task notes.
- `skills/*/SKILL.md` - reusable workflow guidance.

## Rules

- Keep this generic. Do not add client names, internal systems, secrets, deployment details, or private repository paths.
- Do not treat this as active guidance for this portfolio. Active guidance lives in the root `AGENTS.md`.
- When copying into a new repo, rewrite every command, module name, and path to match that repo before using it.
- Preserve the `.github`, `docs`, `skills`, and `workbench` paths if you want the assistant pointers to work without rewiring.
- Prefer a real harness that can be adapted and followed over a process folder that only looks complete.

## Intended Use

The harness is useful when a repo has recurring agent-assisted work and needs a repeatable way to keep changes scoped, verified, and reviewable.

The core idea:

1. Start from repo-local context.
2. Pick the lightest safe path for the task.
3. Keep implementation bounded.
4. Verify with runnable commands.
5. Hand off with evidence.
6. Feed repeated friction back into durable guidance.

## Adaptation Checklist

Before using this in another project:

1. Copy the relevant harness files into the target repo root.
2. Replace placeholder command guidance with the target repo's real commands.
3. Remove skills or docs that do not match how that repo works.
4. Add any repo-specific validation script only after the repo has a real command surface to validate.
