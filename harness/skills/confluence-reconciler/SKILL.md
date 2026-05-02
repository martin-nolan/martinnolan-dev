---
name: confluence-reconciler
description: Reconcile repo truth with Confluence or other external documentation without inventing unsupported behavior.
---

# confluence-reconciler

## Purpose

Keep external documentation aligned with repository truth after first correcting any stale repo docs.

## Use this skill when

- updating Confluence pages from current repository state
- rewriting SOPs or operating guides from repo-owned guidance
- comparing external documentation against current code, docs, and commands

## Required workflow

1. Start from repository truth, not prior external docs.
2. Correct stale repo docs first if they drift from code or commands.
3. Summarize the current operating model in stakeholder-readable language.
4. Keep proposed or future-state content clearly marked as proposed.
5. Link external guidance back to the repo-owned source docs where appropriate.

## Output contract

- repo sources used
- repo corrections made first, if any
- external-doc summary or rewrite
- any unresolved uncertainty called out explicitly

## Skill composition

- Use `skills/doc-and-skill-sync/SKILL.md` when repo docs or skills drift.
- Use `skills/pr-authoring/SKILL.md` only when the user also wants PR metadata for the documentation change.
