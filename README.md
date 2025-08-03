# Martin Nolan Portfolio & AI Assistant

## Overview

This is the source code for Martin Nolan's personal portfolio and AI chat assistant. It showcases professional experience, featured and personal projects, technical skills, and includes an interactive AI chat widget powered by OpenAI.

## Features

- **Portfolio**: Modern, responsive design with sections for About, Work Experience, Projects, and Contact.
- **AI Chat Widget**: Ask questions about Martin's background, experience, and projects.
- **Resume Modal**: View and download Martin's CV as a PDF.
- **Contact Form**: Send messages directly from the site.

## Tech Stack

- Next.js
- React 18
- TypeScript
- shadcn/ui
- Tailwind CSS
- TanStack Query
- Zod

## Project Structure

This project follows a feature-sliced architecture.

- `src/app/` — Global styles and providers.
- `src/pages/` — Next.js pages and API routes.
- `src/shared/` — Reusable, low-level modules like UI components, hooks, and utilities.
- `src/entities/` — Business entities, like data models and domain-specific logic.
- `src/features/` — User-facing features, such as the AI chat widget or resume modal.
- `src/widgets/` — Compositional blocks for pages, like the navigation bar or footer.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

MIT
