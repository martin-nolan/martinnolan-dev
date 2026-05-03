---
name: migration-change
description: Handle DB/model/schema changes with migration ordering, compatibility checks, and rollback-aware verification.
---

# migration-change

## Purpose

Make schema and model changes safe across producers and consumers by enforcing migration order and compatibility checks.

## Use this skill when

- editing database models or shared data contracts
- adding or modifying Alembic migrations
- changing fields consumed by service, background job, or observability flows

## Repo schema surfaces

- service migration directories
- service models, types, and service modules
- shared database models and utilities when present
- background jobs, analytics, or observability consumers of shared contracts

## Required sequence

1. Identify contract impact across service, background job, shared, and any observability consumer modules.
2. Add or update a migration in the owning service module as needed.
3. Validate migration state locally:
   - run the service module’s database setup command
   - run the service module’s migration upgrade command
   - run the service module’s migration status command
4. Validate consumer compatibility:
   - run impacted module lint/type checks
   - run impacted MVP tests
5. Verify rollback awareness:
   - if safe/required, test downgrade assumptions or explicitly document downgrade limitations.

## Risk checks

- migration ordering conflicts
- extension/ownership/permission issues
- non-null/default/backfill hazards
- shared model drift across consumers

## Output contract

- migration summary (forward change)
- compatibility impact by module
- rollback position (`validated` or `documented limitation`)
- commands run and results
- residual risks

## Skill composition

- Use `skills/testing/SKILL.md` for required test updates and command execution evidence.
- Use `skills/release-readiness/SKILL.md` for deploy/version implications.
