import { Github, Linkedin, Mail } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border-soft)] bg-[color:var(--paper-strong)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">
            Martin Nolan
          </p>
          <p className="max-w-xl text-sm leading-6 text-[color:var(--ink-muted)]">
            Product-minded GenAI engineering, public-safe workflow demos, and a delivery model
            built around reviewable, engineer-owned AI work.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/martin-nolan"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[46px] min-w-[46px] items-center justify-center rounded-full border border-[color:var(--border-soft)] text-[color:var(--ink-strong)] transition-colors duration-200 hover:border-[color:var(--accent-teal)] hover:text-[color:var(--accent-teal)]"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/martinnolan0110"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[46px] min-w-[46px] items-center justify-center rounded-full border border-[color:var(--border-soft)] text-[color:var(--ink-strong)] transition-colors duration-200 hover:border-[color:var(--accent-teal)] hover:text-[color:var(--accent-teal)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:martinnolan_1@hotmail.co.uk"
            className="inline-flex min-h-[46px] min-w-[46px] items-center justify-center rounded-full border border-[color:var(--border-soft)] text-[color:var(--ink-strong)] transition-colors duration-200 hover:border-[color:var(--accent-teal)] hover:text-[color:var(--accent-teal)]"
            aria-label="Email"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
