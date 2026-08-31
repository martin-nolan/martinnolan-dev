# Martin Nolan portfolio

A small, single-page portfolio about full-stack AI application engineering and the systems around agent-assisted software delivery.

The site deliberately does not reproduce a CV, name private employers or reconstruct internal products. It focuses on durable engineering ideas: orchestration, repository truth, deterministic boundaries, independent review, recovery, evaluation and observability.

## Structure

```text
src/
├── components/
│   ├── diagrams/       Agent graph and engineering loop
│   ├── layout/         Header and footer
│   └── sections/       Four page sections
├── content/site.ts     Public copy and structured content
├── pages/              Next.js Pages Router entry points
└── index.css           Tokens, layout and responsive styling
```

There is no CMS, database, contact form, client-side state, UI library, synthetic product demo or embedded copy of an engineering harness.

## Development

Use Node.js 22.

```bash
npm install
npm run dev
```

## Verification

```bash
npm run check
```

This runs formatting, linting, TypeScript and a production build.

## Deployment

The site is configured for Netlify with `@netlify/plugin-nextjs`.
