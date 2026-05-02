# UI Patterns

This template standardises a system for internal tools, not one fixed style.

## Core Rules

- Design for scan-first usability and decision support.
- Prefer a calm surface hierarchy over decorative layout.
- Use cards only when the card is the interaction.
- Use real or representative content for primary surfaces.
- Each region should have one job.

## Composition Rules

- Each screen should read as a single composition, not disconnected fragments.
- Each section has one purpose only.
- If a section serves multiple purposes, split it.
- Remove regions that do not support the primary task.

## Pattern Rules

- Prefer tables over cards for dense data.
- Use one primary action per region.
- Avoid nested containers unless they are required for interaction or state separation.
- Use whitespace and typography for grouping before adding borders.
- If multiple patterns are used, one pattern must dominate the layout.

## Archetypes

### Operations Console

Use when the primary user is monitoring, triaging, or acting on active work.

- Strong page header with status context
- Worklist or queue as the primary scan surface
- Supporting detail panel or summary rail

### Analyst Workbench

Use when the primary user needs to inspect data, compare evidence, or make a judgement.

- Dense tabular or pane-based layout
- Strong labels, metrics, and supporting context
- Fewer decorative surfaces, more information clarity

### Review / Approval Workspace

Use when the primary user must approve, edit, reject, or escalate work.

- Primary object under review in the center
- Context or evidence alongside the object
- Clear action grouping and visible status feedback

### Admin / Configuration Surface

Use when the primary user is configuring rules, settings, access, or metadata.

- Clear settings groups
- Stable navigation
- Strong form hierarchy and field help

## Pattern Selection Rule

- Choose the archetype based on the user’s primary task.
- If a feature mixes patterns, select one primary archetype for page composition and treat others as supporting regions.
- When uncertain, prefer the archetype that optimises the main decision or action rather than the richest visual treatment.

## Recurring Patterns

### Table + Detail

Use for lists where the user scans many rows but works deeply on one item at a time.

- Left or main pane: table/worklist
- Right pane: selected item details and actions
- Rows should remain readable without decorative cards

### Split-Pane Review

Use for approval or inspection workflows.

- Primary object in the main pane
- Supporting evidence, reasoning, or metadata in the secondary pane
- Actions remain visible without dominating the layout

### Chat + Context

Use for conversational flows where metadata or sources must remain visible.

- Conversation area as the primary surface
- Context pane for references, sources, or policy guidance
- Keep response actions close to the content being reviewed

### Settings / Configuration Form

Use for structured admin work.

- Group related settings
- Use help text and defaults sparingly but clearly
- Surface validation and save feedback close to the inputs

### Queue / List + Drill-In

Use when the user triages many items quickly.

- Queue is the primary scan surface
- Drill-in view shows the active item without losing list context
- Favour status clarity and actionability over ornament

## Anti-Patterns

These are non-negotiable:

- Generic dashboard card mosaics for dense data
- Decorative container overload
- Multiple competing accent colours without meaning
- Placeholder-first composition
- Borders everywhere instead of using spacing and typography to create structure
- Generic card grids without clear interaction purpose
- Mosaics of unrelated metrics without a task flow
- Excessive visual decoration that competes with the work

## Accessibility Baseline

- Primary flows must be keyboard reachable
- Focus states must remain visible in light and dark modes
- State feedback should not rely on colour alone
- Labels, errors, and actions must remain explicit
