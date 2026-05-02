# Repository Harness - Release Readiness Sanity Check

Run this scheduled task against the latest state of the `main` branch only.

If the current branch is not `main`, switch to `main` before analysis. Do not leave the repository on a different branch if a user branch was checked out locally before the run.

Use `$release-readiness` for this task.

## Goal

Check version, tag, and release-surface alignment against recent changes on `main`.

## Requirements

- Inspect recent changes on `main` and map them to impacted components.
- Check expected version, bump, tag, and release-contract surfaces.
- Flag missing alignment or missing rationale.
- Treat missing local release environment variables as local context, not release drift, unless a real repo-level alignment issue exists.

## Output Expectations

Report:

- impacted components
- expected versus actual release or version alignment
- release risks and remediation actions
- explicit final line:
  - `Release readiness: pass`
  - or `Release readiness: blocked`

If no release-sensitive drift is found, report exactly:

`Release readiness: pass`
