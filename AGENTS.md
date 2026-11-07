# AGENTS.md

Martin's personal site. One static page that shows how he thinks about building software: product, developer experience and the engineering around models. It sits alongside his CV and LinkedIn; it does not repeat them.

## Content rules

- Copy lives in `src/content/site.ts`. Components never hold prose.
- Write in Martin's voice: plain, direct, UK English, contractions, spaced hyphens rather than em dashes. No hype, no "passionate about", no lists of buzzwords.
- Sky can be named. Internal project or product names, colleagues, quotes, internal figures and screenshots cannot.
- Keep it short: four sections and five figures. A new figure has to replace one, not add to it.
- Work is described at the level of the CV and LinkedIn, generalised. No case studies with private detail.
- Any number on the site says what it measured and how far it can be trusted (for example "one task, one run").
- No CV copy, employment timeline, blog, CMS, contact form, analytics, cookies or runtime AI.

## Design rules

- Tokens are defined once in `src/app/globals.css` and explained in `DESIGN.md`. Use the tokens; do not add raw colours, fonts or spacing values elsewhere.
- Deep green plus one signal colour (vermilion) and a highlighter. Visuals are hand-made SVG drawings in `src/figures/` that use the drawing classes; no stock icons, photos, badges or decorative gradients.
- Light and dark themes follow the visitor's system setting. Both must meet WCAG 2.2 AA contrast.
- Motion is CSS only and must switch off under `prefers-reduced-motion`; the page must make sense with no motion at all.
- Every change keeps keyboard focus visible, the skip link working and the page usable at 320px wide.

## Engineering rules

- Next.js App Router, static export (`output: 'export'`). No server code, API routes or middleware.
- Plain CSS. No component library or CSS framework.
- Security headers live in `netlify.toml`. Do not loosen the content security policy without a stated reason.
- Fonts come through `next/font`, so they are self-hosted. No third-party requests at runtime.

## Checks

```bash
npm run check
```

Runs formatting, lint (including accessibility rules), type-checking and a production build. A change is not done until this passes. If you could not run it, say so rather than claiming it passed.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
