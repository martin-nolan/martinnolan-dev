# Repository guidance

This is a deliberately small, static Next.js portfolio.

## Product boundary

- The site explains how Martin engineers AI products and agent-assisted delivery systems.
- Keep it employer-neutral and safe for a public, long-lived website.
- Do not add private project diagrams, internal screenshots, mock product interfaces, a CV copy, employment history, a blog, a CMS, runtime AI, analytics trackers, or a contact form.
- Add a new section only when it introduces a distinct and durable idea.

## Engineering boundary

- Keep the Pages Router and one-page structure unless a real product need justifies changing them.
- Prefer direct React and semantic HTML over shared primitives or configuration-driven rendering.
- Use plain CSS in `src/index.css`; do not add a component library or styling framework for this page.
- Keep copy in `src/content/site.ts` and meaningful visual boundaries in components.
- Accessibility, responsive behaviour, security headers and metadata are part of the implementation.

## Verification

Run:

```bash
npm run check
```
