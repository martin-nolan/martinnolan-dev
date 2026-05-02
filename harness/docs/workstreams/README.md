# Workstreams

Use this directory for strategic, cross-module plans that need one durable source of truth for:

- delivery phases
- acceptance criteria
- completion status
- verification expectations

Keep these files compact. Once implementation is underway, prefer grouping completed work by outcome instead of repeating the same requirement in multiple sections.

Use this directory only for high-blast or cross-surface work. Small single-module changes should stay in module-local tasks or tickets.

Plan selection rules:

- Treat any workstream marked `complete`, `closed`, or equivalent as historical context, not an active queue.
- Treat plans with incomplete phases or unchecked acceptance criteria as active.
- If multiple active plans exist, pick the first incomplete highest-priority slice rather than relying on a single shared "current plan" pointer.
- Keep completed plans in this directory as delivery records unless they are superseded by a consolidated replacement.
- If there are no incomplete plans in this directory, create a new workstream plan before starting the next cross-module delivery slice.
- Put consolidated historical records under `docs/workstreams/archive/` when completed plans would otherwise crowd the active directory.
- Prefer consolidating related completed plans into one archived delivery record instead of keeping many overlapping historical plan files.
