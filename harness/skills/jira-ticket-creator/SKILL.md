---
name: jira-ticket-creator
description: Generate repo-specific Jira tickets with clear acceptance and verification gates for agent execution.
---

# jira-ticket-creator

## Purpose

Produce tickets that are executable by humans or agents without follow-up clarification and without scope creep.

## Modes

- Structured mode: default for cross-module or release-sensitive work.
- Lightweight mode: for low-risk, single-module tasks.
- Non-Jira mode: same content in plain markdown task format when Jira is not used.

## Use this skill when

- creating net-new delivery tickets
- converting a workstream plan into individual tasks
- clarifying acceptance criteria for agent execution

## Steps

1. Extract objective, module scope, and blast radius.
2. Choose mode (structured, lightweight, or non-Jira markdown task).
3. Write acceptance criteria as verifiable outcomes, not implementation details.
4. Add explicit non-goals to prevent scope creep.
5. Define verification commands and artifacts reviewers should expect.

## Conditional usage rule

- Do not create Jira tickets by default for every task.
- Create tickets when requested, or when scope is cross-module, release-sensitive, or explicitly deferred/follow-up work.
- If a strategic plan exists, source tickets from `docs/workstreams/*.md`.

## Structured template (default)

Use this exact shape:

```md
Title
<Outcome-focused title>

Description
<What is changing and why. Include module boundaries and any hard constraints.>

Acceptance checklist:
- <User-visible or contract-level outcome 1>
- <Outcome 2>
- <Outcome 3>

Out of scope:
- <Explicit non-goal 1>
- <Explicit non-goal 2>

Dependencies/Risks:
- <Dependency or risk 1 + mitigation>
- <Dependency or risk 2 + mitigation>

Verification:
- <Command/artifact 1>
- <Command/artifact 2>
```

## Lightweight template (single-module, low risk)

```md
Title
<Short outcome>

Description
<One paragraph with boundary and expected behavior change>

Acceptance checklist:
- <Outcome 1>
- <Outcome 2>
- <Outcome 3>

Verification:
- <Minimum deterministic check>
```

## Repo-specific constraints to encode in tickets

- Name exact module(s) using the module names that exist in the repo.
- If route contracts change, require docs sync for the affected API, UI, and service docs.
- If deployable modules change, include release or version expectation in acceptance criteria when relevant.
- Keep each ticket slice mergeable within one PR unless explicitly marked as a multi-PR workstream.

## Output contract

Always include:

- title
- description
- 3-6 acceptance bullets

Include when relevant:

- out of scope
- risks/dependencies
- required verification outputs
- release/version bump expectation
- docs update expectation

## Skill composition

- Use `skills/workstream-planner/SKILL.md` first if scope is broad.
- Use `skills/implementation-execution/SKILL.md` to turn ticket intent into a bounded coding slice.
- Use `skills/pr-reviewer/SKILL.md` acceptance language for done gates.
- Use `skills/testing/SKILL.md` to define required test additions and verification commands/depth.
