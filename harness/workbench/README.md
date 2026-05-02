# Workbench

This folder is a lightweight, agent-agnostic workspace for temporary task notes.

## Files

- `scratchpad.template.md`: starter structure for temporary notes
- local scratchpad file created from the template when needed
- `docs/workstreams/*.md`: committed execution plans for non-trivial work

## Rules

- The local scratchpad file is intentionally ignored and should not be committed.
- Clear or recreate the scratchpad per task.
- If a plan needs to survive handoff or review, move it into `docs/workstreams/` instead of keeping it in the scratchpad.
- Promote any durable guidance into `docs/` or a skill, then remove it from the scratchpad.
- Do not treat scratchpad content as source of truth.
