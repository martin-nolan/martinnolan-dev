# Design

The look is an annotated technical drawing: hand-made diagrams on a faint dot grid, a confident serif for headings, mono labels, and deep green as the main colour, a vermilion signal for anything probabilistic or worth a second look, and a highlighter for the odd phrase that matters. It should feel like one person's notebook, never like a template.

## Type

| Role    | Face                   | Used for                                                     |
| ------- | ---------------------- | ------------------------------------------------------------ |
| Display | Source Serif 4, 600    | Name, section headings, pull lines                           |
| Body    | IBM Plex Sans, 400-600 | Paragraphs and lists                                         |
| Mono    | IBM Plex Mono, 400-500 | Kicker, section numbers, captions, links, labels in drawings |

The serif gives warmth, Plex gives a technical edge, and the mono is used sparingly for annotations.

## Colour

| Token           | Light   | Dark        | Purpose                                                                          |
| --------------- | ------- | ----------- | -------------------------------------------------------------------------------- |
| `--bg`          | #f7f7f4 | #121514     | Page                                                                             |
| `--ink`         | #17191c | #e8e8e3     | Body text                                                                        |
| `--ink-muted`   | #545b61 | #a3aaa5     | Secondary text, notes                                                            |
| `--rule`        | #d9d9d2 | #2c322f     | Dividers                                                                         |
| `--accent`      | #1f5e46 | #84c6a5     | Links, numbers, the one highlight                                                |
| `--accent-soft` | #e2ece6 | #1c2b24     | Soft fills, text selection                                                       |
| `--amber`       | #b63c26 | #f08a6e     | The signal colour: the model, gates, the second thread (named amber for history) |
| `--amber-soft`  | #f9e4dd | #3a211b     | Soft signal fills                                                                |
| `--highlight`   | #e6f5a3 | lime at 22% | Highlighter behind marked phrases (`==text==` in the copy)                       |
| `--dot`         | #d4d6cf | #262b28     | The dot grid behind drawings                                                     |

Contrast on the page background: ink 16.4:1 (light) and 14.9:1 (dark); muted 6.4:1 and 7.7:1; accent 7.1:1 and 9.3:1.

Signal text on its soft fill has 4.7:1 contrast in light mode, including the product-code label.

## Drawings

- Every figure is a hand-written SVG in `src/figures/`, inlined at build time so it uses the site's fonts and tokens (and switches with dark mode).
- Drawings use the drawing classes in `globals.css` (`ink`, `muted`, `ln`, `ln-accent`, `box`, `box-amber` and so on), never raw colours.
- Labels inside drawings are set in the mono face so their widths are predictable.
- Main figures carry a `<title>` and `<desc>`; small illustrations and icons are `aria-hidden`.
- Each figure gets a numbered caption ("Fig. 02") that says what it shows and, for numbers, how far to trust them.
- Each file contains wide and compact SVG layouts, selected by CSS container queries: below 56rem of drawing space, or 24rem for the simpler hero. Side-by-side figures stay compact even on a wide screen. Compact drawings use a 240-unit viewBox and labels of at least 14 units so they remain readable at 320px; their width is capped at 24rem. The outer SVG supplies one accessible title and description for both layouts.
- `--drawing-ratio` and `--drawing-compact-ratio` describe each drawing's geometry, not design tokens. They reserve the correct height for each layout.

## Motion

- CSS only, no JavaScript. Nothing depends on motion to be understood, and all motion stops under `prefers-reduced-motion`.
- The hero rings draw in once on load, and the agent dot goes round its loop.
- Figures draw and build as they scroll into view, using scroll-driven animation (`animation-timeline`). Browsers without it show the finished drawing.
- In SVGs, `draw` (with `pathLength="1"`) marks a line that draws in, `pop` (with `--i` for order) marks a part that appears, and `spin` marks the orbiting agent.

## Layout

- A 74rem page with a two-column hero: name and intro, then the rings drawing.
- Numbered sections, each opened by a full-width rule, a mono number and a serif heading, then a pull line and body copy.
- Sections: product first (with two strands of work, not a career timeline, and the naming point afterwards), the harness (one combined drawing plus a small results chart), the template (copy beside the drawing). Five figures in total; restraint matters more than adding visuals.
- Spacing uses the `--space-*` scale only.

## What not to add

Stock icons, stock photos, gradients (other than the dot grid), drop shadows, badges, emoji, glowing effects, animated backgrounds, or a third colour.
