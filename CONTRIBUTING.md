# CONTRIBUTING.md

## Branches
- `main`: stable.
- `develop`: integration.
- `feature/*`: work.
- Use GitFlow. Branch off `develop`. Merge to `develop`.

## Commits
- Rule: Conventional Commits `type(scope): description`.
- Scopes:
    - `auth`: users.
    - `tracker`: emotions.
    - `diagnostic`: scoring.
    - `respiration`: breathing.
    - `activites`: relaxation.
    - `infos`: pages.
    - `ci`: pipeline.
    - `docker`: containers.
    - `iac`: infra.
    - `deps`: updates.

## Pull Requests
- Target: `develop`.
- Checklist:
    - Commit convention followed.
    - Tests passing.
    - Lint passing.
    - Documentation updated.

## Contraintes Stack
- Supabase: local `.env.local` ONLY. Never commit.
- Prisma: migrations on `develop`.
- Next.js: App Router.
