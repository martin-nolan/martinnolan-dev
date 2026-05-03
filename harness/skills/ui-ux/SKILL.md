---
name: ui-ux
description: Apply repo-specific UI/UX standards for visual consistency, motion, interaction states, and user-flow quality in UI modules.
---

# ui-ux

## Purpose

Keep UI changes modern, consistent, and predictable within the product’s existing design language.

## Use this skill when

- editing UI routes, screens, components, or shared UI primitives
- introducing new screens, cards, forms, dialogs, toolbars, or filters
- changing user flows (navigation, onboarding/help paths, multi-step interactions)

## Repo-specific UI foundations

- Start from the UI module’s existing design tokens, global styles, and shared UI primitives.
- Prefer the existing app shell, navigation, and state patterns over one-off feature styling.
- Use the nearest feature layout or state-handling pattern as the first reference point.

## Styling and component rules

1. Reuse existing UI primitives before creating bespoke controls.
2. Reuse tokenized classes (`bg-base-*`, `text-*`, `border-*`, `muted-*`) instead of hardcoded colors.
3. Keep card/toolbar/dialog surface language consistent with existing rounded-xl + border + subtle shadow treatment.
4. Avoid introducing a parallel design system or one-off visual language per feature.

## Motion and modern feel rules

1. Prefer subtle transitions already used in repo (`duration-150` to `duration-300`) for layout and visibility changes.
2. Respect reduced-motion accessibility using existing CSS patterns (`prefers-reduced-motion` in shimmer/skeleton styles).
3. Use motion to clarify state changes (expand/collapse, overlays, loading) rather than decorative animation.

## User-flow quality rules

1. Preserve role-gated navigation and app-aware tab behavior.
2. Keep flows task-first: primary action visible, secondary actions nearby, destructive actions explicit.
3. Every changed flow must have explicit states:
   - loading
   - empty
   - error
   - success/ready
4. Avoid dead ends; provide recovery or next step in empty/error states.

## Verification expectations for UI changes

- run the target repo's documented UI lint and test commands
- run the UI module’s build command when layout, routing, or runtime behavior changed
- provide concise UX evidence summary:
  - changed flow(s)
  - state coverage (loading/empty/error/success)
  - responsive behavior notes for mobile and desktop

## Output contract

- UI surfaces changed
- primitives/tokens reused
- flow changes and state coverage
- motion/accessibility considerations
- verification commands and results

## Skill composition

- Use `skills/testing/SKILL.md` to define required UI test additions and run UI verification commands.
- Use `skills/pr-reviewer/SKILL.md` for final quality gate.
