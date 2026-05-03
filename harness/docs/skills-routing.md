# Skills Routing

Task-intent routing guide for selecting repo skills before implementation.

## Decision Gate

Before starting implementation work:

1. Read `AGENTS.md` and the relevant repo docs or command surface first.
2. Use this file as the canonical skill inventory and routing table.
3. Decide explicitly:
   - **Skill match found:** read that skill file (for example `skills/delivery-loop/SKILL.md`) and execute the task using that skill workflow.
   - **No skill match:** state that no matching skill is available, then continue with normal repo conventions.

Notes:
- Do not block delivery if no skill exists for the task.
- If multiple skills match, choose the most specific one.

## Default Execution Rule

Use these defaults when the user intent is clear:

- if the user asks to implement a scoped change now -> `skills/delivery-loop/SKILL.md`
- if the user asks to plan a new cross-module slice -> `skills/workstream-planner/SKILL.md`
- if the user asks to debug first -> `skills/debug-triage/SKILL.md`
- if the user asks for review or a done gate -> `skills/pr-reviewer/SKILL.md`
- if the user asks for PR title/description metadata -> `skills/pr-authoring/SKILL.md`
- if the request is small, direct, and does not match a repo skill -> answer directly with `Skill: none`

Do not skip a matching named skill just because the request is short.

## Skill: none — Fallback Procedure

When no skill matches, do not improvise freely. Follow this fixed fallback:

1. State explicitly: `Skill: none — proceeding with repo conventions.`
2. Read the relevant repo guidance and command surface before writing any code.
3. Scope the change to a single module unless a contract or release boundary forces otherwise (see cross-module rubric in `skills/implementation-execution/SKILL.md`).
4. Apply the same output contract as `implementation-execution`:
   - restate outcome in one sentence
   - name in-scope and out-of-scope files
   - define stop condition
5. Run baseline checks for every touched module:
   - UI changes: run the target repo's documented UI lint, test, and build checks when they exist
   - service or library changes: run the documented lint, type-check, and test commands for the touched area
   - docs changes: run the target repo's documentation validation command when one exists
6. If the change touches routes, contracts, migrations, or release surfaces, it is not `Skill: none` — re-route to the matching skill.
7. If you discover a gap or mismatch during execution, invoke `skills/self-heal-loop/SKILL.md`.
8. After completing the task, assess whether this scenario warrants a new skill or doc:
   - **New skill warranted** if: this intent type will recur, it has a non-obvious execution path, and the fallback procedure above required significant judgment calls. Create a skill stub under `skills/<name>/SKILL.md` with at minimum: purpose, use-when triggers, execution steps, and skill composition. Then add it to the routing table in this file.
   - **New doc warranted** if: durable knowledge was produced (architecture decisions, workflow conventions, recurring patterns) that a fresh agent would need but cannot infer from code alone. Place it in `docs/` per `docs/documentation-standards.md` and link it from `AGENTS.md` if it becomes an entry point.
   - **Neither warranted** if: the task was genuinely one-off, simple, or fully derivable from existing docs. Record this verdict explicitly so it is not re-evaluated on the next occurrence.

## Routing (Intent -> Skill)

- Workstream/ticket execution from request to verified patch -> `skills/delivery-loop/SKILL.md`
- Narrow implementation slice inside an existing plan/ticket -> `skills/implementation-execution/SKILL.md`
- UI/UX behaviour, layout, interaction polish, visual consistency -> `skills/ui-ux/SKILL.md`
- Bug reproduction, triage, failure classification, root-cause narrowing -> `skills/debug-triage/SKILL.md`
- API/proxy contract changes across layers (types/routes/callers/docs) -> `skills/contract-change/SKILL.md`
- Schema/data migration design and safety checks -> `skills/migration-change/SKILL.md`
- Decide what tests to add/update AND execute verification -> `skills/testing/SKILL.md`
- Release/tag/readiness validation -> `skills/release-readiness/SKILL.md`
- Convert repeated failures into durable harness/process fixes -> `skills/self-heal-loop/SKILL.md`
- Plan workstreams with bounded blast radius -> `skills/workstream-planner/SKILL.md`
- Create/update Jira tickets -> `skills/jira-ticket-creator/SKILL.md`
- Review a change against done criteria / review gate -> `skills/pr-reviewer/SKILL.md`
- Draft PR titles/descriptions and reviewer-ready PR metadata (explicit request only) -> `skills/pr-authoring/SKILL.md`
- Detect and fix docs and skill drift after behaviour/contract/workflow changes -> `skills/doc-and-skill-sync/SKILL.md`
- Reconcile repo truth into Confluence or another external documentation system -> `skills/confluence-reconciler/SKILL.md`

## Overlap Rules

- If the user asks to *implement now*, prefer `delivery-loop` (or `implementation-execution` for a small bounded slice).
- If the user asks to *debug first*, start with `debug-triage`, then move to implementation skill.
- If both contract and implementation change, start with `contract-change`, then execute via `implementation-execution` or `delivery-loop`.
- If a migration is involved, `migration-change` takes precedence for the migration portion.
- If the task changes harness or governance files, use `doc-and-skill-sync` and then run `docs/harness-evaluation.md`.
- If no route clearly matches, continue without a skill and state `Skill: none`.
- If you bypass a plausible skill, state why in one sentence.
