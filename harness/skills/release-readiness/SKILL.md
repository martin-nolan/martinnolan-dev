---
name: release-readiness
description: Verify that validation gates, docs updates, and release-facing checks are covered before merge or release. Use for requests like "is this ready to merge", "release check this", or "what do I need to run before shipping". Do not use for early exploratory work.
use_when: A change is preparing for merge, release, or template publication.
do_not_use_for: Early exploratory work where validation scope is still unclear.
inputs:
  - changed modules
  - required commands
  - affected docs
outputs:
  - readiness checklist
  - missing validation or doc gaps
verification:
  - required checks listed explicitly
  - doc updates included when relevant
---
# Release Readiness

## Workflow

1. Identify the modules touched by the change.
2. Map those modules to the relevant validation commands.
3. Check whether docs need updating for the touched behavior.
4. Decide whether release notes, versioning, tags, or deployment checks are required.
5. Check whether additional repo-specific validation is required.
6. Report missing checks or drift before calling the change ready.

## Template Source Checks

- the target repo's documented pre-release or pre-merge check
- any additional validation required by changed release surfaces
- Review generated output expectations when placeholder, residue, or guidance behavior changed

## Generated Repo Checks

- the target repo's documented release-readiness checks
- Module-local verification for touched backend, frontend, or infra code

## Checklist

- Relevant tests identified and run
- Required release checks identified for release-impacting changes
- Commands in docs still match the repo
- Changed behavior is documented
- No unresolved template residue or guidance drift introduced

## Failure Modes

- Declaring readiness without listing the required checks
- Ignoring doc updates because code passed tests
- Treating template changes the same as ordinary generated-repo changes
