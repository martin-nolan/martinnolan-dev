import { Menu } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '#harness', label: 'How I work' },
  { href: '#case-studies', label: 'Case studies' },
  { href: '#interfaces', label: 'Interfaces' },
  { href: '#principles', label: 'Principles' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border-soft)] bg-[color:rgb(248_244_237_/_0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3 text-[0.95rem] font-semibold tracking-[0.06em] text-[color:var(--ink-strong)]">
          <span className="inline-flex size-2 rounded-full bg-[color:var(--accent-teal)]" />
          Martin Nolan
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[color:var(--ink-muted)] transition-colors duration-200 hover:text-[color:var(--ink-strong)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://www.linkedin.com/in/martinnolan0110"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[color:var(--border-soft)] px-4 text-sm font-medium text-[color:var(--ink-strong)] transition-colors duration-200 hover:border-[color:var(--accent-teal)] hover:text-[color:var(--accent-teal)]"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/martin-nolan"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-full bg-[color:var(--ink-strong)] px-4 text-sm font-medium text-[color:var(--paper)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            GitHub
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[color:var(--border-soft)] text-[color:var(--ink-strong)] md:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[color:var(--border-soft)] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl border border-[color:var(--border-soft)] px-4 py-3 text-sm font-medium text-[color:var(--ink-strong)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
