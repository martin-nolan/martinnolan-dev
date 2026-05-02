# Skills

This folder contains reusable workflow guidance for recurring engineering tasks.

## Design Rules

- Keep each skill narrow enough to be predictable, but broad enough to be reused across repos.
- Point back to repo docs and commands instead of duplicating them.
- Prefer workflow, checks, and failure modes over vague advice.
- Use existing repo commands and validation gates when they exist.
- Treat skills as helpers for repeatable work, not as the source of truth for repo behavior.

## Available Skills

- `delivery-loop`: execute a scoped delivery slice from request through verification
- `implementation-execution`: keep one slice bounded and mergeable
- `workstream-planner`: shape non-trivial work into safe implementation slices
- `testing`: define test impact, run verification, and report evidence
- `debug-triage`: reproduce failures and narrow root cause before patching
- `contract-change`: keep cross-layer contract updates aligned
- `confluence-reconciler`: turn repo truth into external documentation safely
- `migration-change`: handle schema and migration work safely
- `doc-and-skill-sync`: keep docs and skills aligned with repo reality
- `self-heal-loop`: convert harness failures into durable fixes
- `jira-ticket-creator`: draft executable tickets when needed
- `pr-authoring`: draft reviewer-ready PR metadata when asked
- `pr-reviewer`: review for bugs, regressions, and missing verification
- `release-readiness`: verify release and version alignment when release surfaces change
- `ui-ux`: apply product-consistent UI/UX standards

## Skill Contract

Each skill should define:

- when to use it
- when not to use it
- expected inputs
- expected outputs
- workflow steps
- verification expectations
- failure modes

Skills support the repo docs. They do not replace them.
