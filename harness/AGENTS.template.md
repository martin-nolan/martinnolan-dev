# AGENTS.md

Repo map for contributors and coding agents. Keep this file short; put durable detail in `docs/`.

## Start Here

Follow this sequence before implementation:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read only the relevant docs for the task.
4. Read the relevant module README and command surface when code or commands are in scope.
5. Decide whether a harness skill or normal repo workflow applies.
6. Start implementation.

For small, low-risk tasks, use the shortest repo-consistent path. For ambiguous, cross-module, high-blast-radius, or governance-changing work, use the full harness path in `docs/agent-harness.md`.

If guidance, commands, or skills drift from repo reality, update the docs or skills in the same change.

## Repo Identity

- Replace this section with a short factual description of the repository.
- Mention only modules, commands, and conventions that actually exist.

## Repo Map

- `docs/` - durable project documentation.
- `skills/` - optional reusable workflow guidance.
- Replace or remove these entries to match the repo.

## Command Truth

- Use the repo's documented scripts, task runner, package commands, or CI checks.
- Do not invent commands for agent convenience.

## Source Of Truth

- Code, tests, and runnable commands define behavior.
- `docs/*` contains durable operating rules.
- `AGENTS.md` is the repo map.
- `skills/*` contains reusable workflows, not primary repo truth.

If these disagree, fix the docs or skills in the same change.

## Verification

Document the normal checks here after adapting the template:

```bash
# example only - replace with real repo commands
npm run typecheck
npm run lint:check
npm run build
```
