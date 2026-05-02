# Codex Guidance

Use this file as the repo-local starting point for automated or agent-assisted work.

## Project Shape

- This is a static Next.js Pages Router portfolio.
- Keep the site single-page unless there is a clear reason to split it.
- Keep content in `src/content/*` and page structure in `src/components/sections/*`.
- Do not reintroduce CMS, runtime chat, contact forms, resume proxying, or full CV timelines.

## Content Standards

- Write in a direct, grounded voice.
- Prefer “AI systems” over “AI tools” unless the sentence specifically means a tool.
- Keep public project detail safe: use synthetic surfaces and neutral product names where needed.
- Add new work only when it adds a distinct proof point. Do not add projects just to be comprehensive.
- Treat customer-support assistant work as supporting proof unless it replaces an existing case study.

## Harness

- The harness in this repo should stay lightweight and real: guidance, validation commands, and review evidence.
- `harness/` stores the generic public-safe harness source kit: docs, skills, scratchpad, automation prompts, GitHub pointers, and validation helpers. It is not active runtime code for the site.
- Do not add fake active root-level `skills/` or process scaffolding unless it is actually used to maintain this repo.
- If repeated agent work creates friction, update this file or the README instead of adding process theatre.

## Verification

Run these before handing off meaningful changes:

```bash
npm run typecheck
npm run lint:check
npm run build
```
