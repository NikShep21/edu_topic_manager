# Contributing Documentation

This document describes the basic workflow for contributing to the project.

## Branch Naming

Use short and descriptive branch names.

Examples:

```txt
feature/create-topic-form
feature/frontend-tests
fix/auth-refresh
fix/topic-files
docs/project-documentation
refactor/api-client
```

Recommended prefixes:

```txt
feature/
fix/
docs/
refactor/
test/
chore/
```

## Commit Messages

Use clear commit messages.

Examples:

```txt
feat: add topic creation form
fix: handle auth refresh error
docs: add frontend documentation
test: add validation schema tests
chore: update root makefile
refactor: simplify api client
```

## Pull Request Workflow

1. Create a branch from `main`.
2. Make changes.
3. Run checks locally.
4. Commit changes.
5. Push the branch.
6. Open a pull request.
7. Wait for CI.
8. Fix review comments if needed.
9. Merge after approval.

## Updating Branch from Main

Use rebase:

```bash
git fetch origin
git rebase origin/main
```

If the branch was already pushed:

```bash
git push --force-with-lease
```

Use `--force-with-lease`, not plain `--force`.

## Handling Rebase Conflicts

Check status:

```bash
git status
```

Fix conflicted files, then:

```bash
git add .
git rebase --continue
```

Abort rebase if needed:

```bash
git rebase --abort
```

## Before Opening a PR

Run checks depending on changed files.

### Frontend changes

```bash
cd frontend

npm run lint
npm run format:check
npm run typecheck
npm run test
npm run build
```

### Backend changes

```bash
cd backend

flake8 .
black --check .
python manage.py check
python manage.py test
```

### Full project

If Makefile is available:

```bash
make check
```

## Code Style

### Frontend

- Use TypeScript.
- Keep code inside the correct FSD layer.
- Keep tests near the tested files.
- Use Zod for form validation.
- Use React Query for server state.
- Use SCSS Modules for component styles.
- Run Prettier before committing.

### Backend

- Follow Django and DRF conventions.
- Keep domain logic in the related app.
- Use serializers for validation.
- Keep permissions explicit.
- Add migrations for model changes.
- Run Black and Flake8 before committing.

## Git Hooks

The project uses Husky and lint-staged.

Install root dependencies:

```bash
npm install
```

Enable Husky:

```bash
npm run prepare
```

Pre-commit hooks may run formatting and linting for staged frontend files.

## Pull Request Description

A good PR description should include:

```txt
What was changed?
Why was it changed?
How was it tested?
```

Example:

```md
## Summary

Added validation schema tests for frontend forms.

## Changes

- Added tests for login schema.
- Added tests for create student schema.
- Added tests for edit teacher schema.

## Testing

- npm run test
- npm run lint
```
