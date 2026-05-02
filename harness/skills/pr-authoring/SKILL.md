---
name: pr-authoring
description: Produce concise, merge-ready pull request metadata (title, description, verification summary, and reviewer-facing notes) aligned to repo conventions.
---

# pr-authoring

## Purpose

Create high-signal PR metadata that clearly communicates intent, scope, risk, and validation.

This skill is opt-in. Do not apply it automatically unless the user explicitly asks for PR authoring help.

## Use this skill when

- user asks for a PR title
- user asks for a PR description/body
- user asks for complete PR text/summary/checklist
- user explicitly asks to update an existing GitHub PR
- preparing final PR text after implementation/review

## Modes

- `draft-only` (default): produce Markdown the developer can paste/edit manually
- `publish` (explicit request only): attempt to update the branch PR on GitHub using `gh`

## Inputs

- change summary
- key user-visible outcomes
- verification commands and results
- known risks or follow-ups

## Steps

1. Derive a title in imperative style, scoped to the primary outcome.
2. Write a short summary paragraph with business/user impact.
3. Add `What changed` bullets grouped by behavior area (not file dump).
4. Add `Verification` with exact commands and pass/fail.
5. Add `Risks / follow-ups` only when needed.
6. Ensure no claims exceed available evidence.
7. Always output Markdown.
8. If `publish` mode was explicitly requested:
   - detect current branch (`git rev-parse --abbrev-ref HEAD`)
   - check `gh` availability/auth
   - find PR for current branch (`gh pr list --head <branch> --json number,url --limit 1`)
   - update title/body only when a single matching PR is found
   - if `gh` is missing/not authenticated/no PR found, fall back to `draft-only` output and report why

## Output template

```md
## PR Title
<single line>

## PR Description
### Summary
<1 short paragraph>

### What changed
- <bullet>
- <bullet>

### Verification
- `<command>`: <pass|fail|not run>

### Risks / follow-ups
- <item or "None.">
```

If `publish` mode was requested, append:

```md
## GitHub PR Update
- status: <updated|skipped>
- reason: <short reason when skipped>
- pr: <url or "not found">
```

## Quality bar

- keep under ~250 words unless user asks for depth
- avoid repeating commit history
- include blockers explicitly when not fully green
- keep language factual and reviewer-friendly
- never force GitHub updates; publishing is explicit and optional

## Skill composition

- Use `skills/pr-reviewer/SKILL.md` when generating a final merge/no-merge verdict.
- Use `skills/testing/SKILL.md` to collect verification evidence before drafting.
