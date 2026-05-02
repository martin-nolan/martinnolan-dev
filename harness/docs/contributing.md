# Contributing

## Workflow

1. Keep changes scoped to the area you are changing.
2. Prefer existing repo patterns and command surfaces.
3. Run the checks that match the changed surface.
4. Update docs and skills in the same change when behavior, commands, contracts, structure, or workflow rules move.

## Command Surfaces

Use the target repo's documented command surface. This may be package scripts, a task runner, CI workflows, or module-local commands.

Do not add harness-only commands unless they are useful to the repo outside agent work.

## Testing Expectations

- Use `docs/testing.md` as the canonical testing map.
- Match verification depth to the change.
- If the change meaningfully alters harness routing, read order, fallback behavior, or review expectations, also run the benchmark in `docs/harness-evaluation.md`.

## Documentation Ownership

- The team changing behavior owns keeping `README.md`, `AGENTS.md`, `.github/*`, `docs/*`, and `skills/*` accurate.
- Put durable corrections in `docs/` or `skills/` rather than leaving them in chat context.
