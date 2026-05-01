# Martin Nolan — Portfolio

A static, proof-of-work portfolio showcasing how GenAI systems are designed, built, and shipped into real-world workflows.

This portfolio is intentionally opinionated: it focuses on product-minded engineering, clear system thinking, and tangible delivery over generic demos or abstract experimentation.

---

## What This Portfolio Demonstrates

* **Product-minded GenAI engineering** — systems built to fit real user workflows, not isolated prototypes
* **Grounded case studies** — based on real problems, constraints, and decisions
* **Workflow-driven interfaces** — synthetic surfaces that reflect how systems are actually used
* **Agent-assisted engineering** — harness thinking, evaluation loops, and controlled iteration
* **Low-maintenance architecture** — static, durable, and easy to evolve

---

## Current Architecture

* **Framework:** Next.js (Pages Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Content:** Static modules (`src/content/*`)
* **Structure:** Single-page homepage (`src/pages/index.tsx`)

The architecture prioritises simplicity, speed, and long-term maintainability over unnecessary complexity.

---

## Development

### Prerequisites

* Node.js 20.x

### Run locally

```bash
npm install
npm run dev
```

### Verification

```bash
npm run typecheck
npm run lint:check
npm run build
```

---

## Content Model

All homepage content is defined in structured modules:

```txt
src/content/
  profile.ts
  harness.ts
  case-studies.ts
  demo-surfaces.ts
  writing.ts
```

This keeps content explicit, version-controlled, and easy to iterate on without CMS overhead.

---

## Design Principles

The visual and interaction system is intentionally:

* **Editorial over SaaS** — warm, readable, and narrative-driven
* **Product-led** — focused on systems and workflows, not CV formatting
* **Structured and dense (when needed)** — optimised for signal over aesthetics
* **Honest about abstraction** — demo surfaces clearly use synthetic data

---

## Philosophy

This portfolio is built around a simple idea:

> AI work should be understandable, evaluable, and reviewable — not just impressive.

It emphasises:

* visibility into system behaviour
* evaluation as a first-class concern
* interfaces that reflect real usage
* delivery that can be reasoned about and critiqued

---

## Links

* [Live Site](https://martinnolan-dev.netlify.app/)
* [LinkedIn](https://linkedin.com/in/martinnolan0110)
* [GitHub](https://github.com/martin-nolan)