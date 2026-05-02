# Confluence Workflow

Use this workflow when repo behavior needs to be reflected in Confluence or another external document store.

## Rules

- Start from repo truth, not from memory.
- Reconcile against current code, docs, and tests before updating external docs.
- Keep repo docs factual and implementation-aligned before exporting or summarizing for Confluence.
- Avoid inventing future scope in external docs unless it is clearly labeled as proposed.

## Recommended Flow

1. Read the relevant repo docs and implementation.
2. Update repo docs first if they are stale.
3. Produce a concise external-doc summary from the updated repo state.
4. Link the external document back to the matching repo docs when appropriate.
5. Keep proposed or future-state content clearly labeled as proposed.

## Current SOP Pages To Sync

The following Confluence SOP pages should be kept aligned with the repo:

1. `Creation of New Project / Repositories`
   Repo sources:
   - `docs/template-repo-sop.md`
   - `README.md`
   - `docs/local-development.md`
2. `Agents Instruction Standard`
   Repo sources:
   - `AGENTS.md`
   - `.github/copilot-instructions.md`
   - `.github/instructions/*.instructions.md`
   - `docs/agent-harness.md`
   - `docs/skills-routing.md`
   - `skills/*`
   - `workbench/*`
3. `Shaping Projects for AI-Assisted Engineering`
   Repo sources:
   - `docs/requirements/_template.md`
   - `docs/requirements/README.md`
   - `docs/contributing.md`

When these repo docs change materially, update the matching Confluence SOP page in the same documentation cycle.

Use `skills/confluence-reconciler/SKILL.md` when the task is documentation reconciliation or external-doc generation.

## Good Inputs

- `README.md`
- `AGENTS.md`
- `docs/architecture.md`
- `docs/backend-architecture.md`
- `docs/frontend-architecture.md`
- `docs/api.md`
- `docs/troubleshooting.md`

## Not A Source Of Truth

- Scratchpad notes
- Stale ticket text
- Old release notes
- Prior Confluence pages that no longer match the code
