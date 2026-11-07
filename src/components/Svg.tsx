import { readFileSync } from 'node:fs';
import path from 'node:path';

// Inlines a hand-drawn SVG from src/figures at build time. Inline (rather than <img>) so the
// drawings use the site's fonts and colour tokens, including dark mode.
// The SVG files are our own source files, not user input.
export function Svg({ name, className }: { name: string; className?: string }) {
  const markup = readFileSync(path.join(process.cwd(), 'src', 'figures', `${name}.svg`), 'utf8');
  return (
    <span
      className={className ? `svg ${className}` : 'svg'}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
