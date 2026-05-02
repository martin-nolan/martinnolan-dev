# Documentation Standards

Use this file as the durable source of truth for documentation hygiene after the harness is copied into a repository.

## Source Of Truth

1. Code, tests, and runnable commands define behavior.
2. `docs/*` contains durable architecture, workflow, and operating rules.
3. `AGENTS.md` is the repo map and read order.
4. `.github/*` files are thin assistant pointers only.
5. `skills/*` contains reusable workflows, not primary repo truth.

If these disagree, fix the docs or skills in the same change.

## Update Triggers

Update docs in the same change whenever you change:

- repo structure or module boundaries
- local run or verification commands
- environment variables or configuration flow
- API, route, contract, or data-shape behavior
- auth, permission, or access behavior
- deployment or release workflow
- any file, path, or command referenced from `AGENTS.md`, `README.md`, `.github/*`, `docs/*`, or `skills/*`
- harness governance files such as `AGENTS.md`, `docs/agent-harness.md`, `docs/skills-routing.md`, `.github/*`, or `skills/*/SKILL.md`

## Placement Rules

- Keep `AGENTS.md` short. It should answer what this repo is, where command truth lives, what to read next, and where durable knowledge belongs.
- Keep `README.md` focused on repo identity and quick-start orientation.
- Put procedures, architecture, and durable operational detail in `docs/`.
- Put reusable workflow instructions in `skills/`.
- Put temporary task notes in `workbench/`, not in committed docs.
- Put strategic implementation plans under `docs/workstreams/`.
- Put feature requirement packages under `docs/requirements/`.

## Promotion Rules

When you discover a stable correction, promote it instead of leaving it in chat context:

- recurring gotchas -> `docs/troubleshooting.md`
- repeated assistant mistakes -> `docs/agent-feedback-log.md`
- workflow changes -> relevant `skills/*/SKILL.md`
- architecture or command truth -> nearest durable doc
