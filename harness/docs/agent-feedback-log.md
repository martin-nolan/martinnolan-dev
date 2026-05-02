# Agent Feedback Log

Use this file sparingly to record stable corrections that are likely to recur across runs.

## When To Add An Entry

- A wrong assumption exposed a stable repo convention, command, path, or workflow.
- The same mistake is likely to happen again.
- The lesson is useful beyond the current task.

Do not use this file for scratch reasoning, transient debugging notes, or one-off dead ends.

## Entry Template

```md
## CORR-YYYY-MM-DD-##
- Area: repo | docs | skills | tests | release | other
- Incorrect assumption:
- Correct guidance:
- Source of truth:
- When to reuse:
- Promote to:
- Status: active | superseded
```

## Example

```md
## CORR-YYYY-MM-DD-##
- Area: repo
- Incorrect assumption: Repo-specific guidance can live mainly in Copilot files or ad hoc notes.
- Correct guidance: Keep `AGENTS.md` as the repo map, keep Copilot files thin, and put durable process detail in `docs/`.
- Source of truth: `AGENTS.md`, `docs/documentation-standards.md`
- When to reuse: When adding new guidance files or moving instructions between layers.
- Promote to: `AGENTS.md` and the relevant doc in `docs/`
- Status: active
```

## Entries

Add live entries below this heading.
