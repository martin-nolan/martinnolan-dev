# Feature Requirement Files

Use `docs/requirements/<feature>.md` for non-trivial feature work. UI-heavy work should fill every UX section; service-only or infrastructure-heavy work should still keep the file explicit about change type, scope, success criteria, and documentation impact.

## Required Sections

- `Problem Statement`
- `Objective / Success Criteria`
- `Scope`
- `Functional Requirements`
- `Non-Functional Requirements`
- `Business Success Metrics`
- `Risks / Assumptions`
- `Documentation Impact`
- `UX / UI Intent`
- `Information Hierarchy`
- `Screens / Routes Affected`
- `Navigation Model`
- `States`
- `Reference Patterns / Inputs`
- `Data -> UI Mapping`
- `Representative Content / Data`
- `UI Complexity / UX Bias`
- `Acceptance Criteria`
- `Change Type`

## Minimum Usage Rule

Use a requirement file when the change is more than trivial polish and affects one or more of:

- `UI`
- `API`
- `Data`
- `AI`
- `Config`
- `Infra`
- `Observability`

For non-trivial work, pair the requirement file with `docs/workstreams/<change>.md` when implementation needs explicit sequencing, cross-module coordination, or contract decisions.

## UX / UI Intent

Include:

- primary user
- primary task
- key decisions/actions
- interaction model
- data density
- accessibility constraints
- references or explicit `none available`

## Information Hierarchy

Include:

- primary focus,
- secondary elements,
- supporting/detail elements,
- what must be scannable in under three seconds.

## Navigation Model

Include:

- primary navigation (`sidebar`, `tabs`, `none`, or equivalent),
- secondary navigation (`filters`, `drill-down`, `panels`, or equivalent),
- entry point into the feature,
- exit or back behaviour.

## When No Design Exists

`none available` is valid when there is no prepared UI, wireframe, or screenshot. In that case the requirement must still include:

- enough task detail to shape the layout,
- representative content or data,
- the key workflow decisions the user must make.

The UI/UX skill should use that requirement to define a clear visual direction, layout plan, hierarchy, and state coverage before code is written.

## Data -> UI Mapping

Describe:

- what data appears where,
- what is grouped together,
- what is sortable or filterable,
- what is editable vs read-only.

## UI Complexity / UX Bias

Optional but recommended:

- UI complexity: `simple`, `moderate`, or `complex`
- UX bias: `speed` or `confidence`

## Reference Assets

Store requirement-linked reference assets under:

`docs/requirements/assets/<feature>/`

Use this folder for screenshots, wireframes, mock annotations, and representative content examples. PR screenshots can supplement review, but the requirement-linked assets are canonical.

## Small Changes

Small changes do not require a full requirement file update. These include:

- copy-only edits,
- small spacing/alignment fixes within an existing pattern,
- icon swaps,
- small visual bug fixes that do not change workflow or hierarchy,
- localized service fixes with no contract, configuration, or workflow impact.

For those changes, include a short PR note instead.
