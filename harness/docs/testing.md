# Testing

Replace this file with the target repository's real testing map after copying the harness.

## Principles

- Run checks that match the touched surface.
- Keep tests close to the code they verify unless the behavior spans multiple areas.
- Add focused regression coverage for behavior changes.
- Document skipped checks with a concrete reason.
- Do not change command surfaces only to satisfy the harness.

## Suggested Structure

For each major surface in the target repo, document:

- lint command
- type-check command
- unit test command
- integration or end-to-end test command
- build/package command
- when each check is required

## Docs And Harness Changes

For docs-only or harness-only changes, run the repository's documentation validation command if one exists. If no validation exists, record that explicitly in the handoff.
