# Martin Nolan Portfolio

Static proof-of-work portfolio for Martin Nolan, focused on product-minded GenAI engineering and public-safe examples of shipped workflow systems.

The site is intentionally small. It should read like a builder showing credible work, not a CV archive or an AI demo catalogue.

## Current Direction

- **Positioning:** AI systems that fit real workflows.
- **Format:** single-page portfolio.
- **Evidence:** two primary case studies, two synthetic product surfaces, a compact harness section, and short working principles.
- **Supporting proof:** one compact real-world assistant systems card for customer-support AI work.
- **Links:** LinkedIn, GitHub, and email are secondary actions.

The homepage should stay curated. Avoid adding every project, role, or historical detail unless it strengthens the core story.

## Architecture

- **Framework:** Next.js 14, Pages Router.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Content:** static TypeScript modules in `src/content/*`.
- **Deployment:** Netlify.

There is no CMS, database, runtime chat, contact form, resume proxy, or MDX blog system.

## Repo Structure

```txt
src/pages/
  index.tsx          Homepage composition and metadata
  404.tsx           Static fallback page

src/content/
  profile.ts        Hero, proof strip, capability pillars, links
  harness.ts        Agent-assisted delivery copy
  case-studies.ts   Primary case study content
  demo-surfaces.ts  Public-safe synthetic interface copy
  writing.ts        Short principles section

src/components/
  sections/         Homepage sections
  surfaces/         Synthetic product interface mockups
  diagrams/         Page-native diagrams used by the harness section
  layout/           Header and footer

src/ui/             Small shared UI primitives
src/lib/            Utilities and logging
scripts/            Build validation helpers
harness/            Public-safe reusable harness source kit, not site runtime code
```

Keep new content in the content modules first. Only add component complexity when the page needs a new visual pattern.

## Content Rules

- Prefer concrete product and engineering language over marketing copy.
- Prefer “AI systems” over “AI tools” unless the sentence specifically means a tool.
- Keep the copy grounded in real work: workflow design, product UX, evaluation, evidence, supportability, and delivery discipline.
- Use neutral or public-safe names when a real internal name adds risk or noise.
- Synthetic surfaces must stay clearly labelled as reconstructed public-safe workflow demos.
- Do not reintroduce a full timeline, old project list, resume CTA, contact form, or blog-shaped writing section unless there is real content to publish.

## Project Scope

The current v1 should stay focused on:

- Synthetic testing / orchestration system for conversational AI as the voice-agent testing case study.
- AI research platform for conversational workflows and insights as the research and video-testing case study.
- Two synthetic product surfaces that show the interaction model without exposing internal material.
- A compact harness section that explains engineer-owned agent-assisted delivery.

Customer-support assistant work is useful supporting evidence because it shows real-world AI systems across PII handling, retrieval, structured outputs, logging, streaming sessions, and production support. It should stay as a compact supporting proof card unless it replaces another section or adds a clearly different proof point.

## Harness Guidance

The harness should exist in this repo only where it is real and useful:

- `AGENTS.md` for repo-local guidance.
- `harness/` for the generic public-safe harness source kit: docs, skills, scratchpad, automation prompts, GitHub pointers, and validation helpers.
- `npm run typecheck`, `npm run lint:check`, and `npm run build` for verification.
- README updates when structure, commands, or content rules change.

Do not add fake active root-level `skills/` or process scaffolding just to demonstrate the idea. If harness material is stored here, it should remain generic, clearly separate from the site runtime, and safe to copy into another repository after adapting paths and commands.

## Development

Use Node.js 20.x.

```bash
npm install
npm run dev
```

## Verification

Run the main checks before handing off meaningful changes:

```bash
npm run typecheck
npm run lint:check
npm run build
```

For deployment parity checks:

```bash
npm run validate:build
```

## Links

- [Live site](https://martinnolan-dev.netlify.app/)
- [LinkedIn](https://www.linkedin.com/in/martinnolan0110)
- [GitHub](https://github.com/martin-nolan)
