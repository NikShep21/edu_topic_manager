# Testing Documentation

The project contains tests for both frontend and backend.

## Frontend Tests

Frontend tests are written with:

- Vitest;
- Testing Library;
- jsdom.

Run frontend tests:

```bash
cd frontend
npm run test
```

## Current Frontend Test Coverage

Current frontend tests focus on unit-level logic.

Covered areas:

- validation schemas;
- API/core logic;
- authentication retry logic;
- FormData building for topics;
- selected utilities.

Examples:

```txt
shared/api/core
shared/api/auth
shared/utils
entities/topic
features/*/model/schema.ts
```

## Frontend Test Location

Tests are placed near the code they test.

Example:

```txt
src/shared/utils/formatDate.ts
src/shared/utils/formatDate.test.ts
```

```txt
src/features/auth-by-credentials/model/schema.ts
src/features/auth-by-credentials/model/schema.test.ts
```

This keeps tests close to the related module and matches the project structure.

## Frontend Test Naming

Use one of these patterns:

```txt
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx
```

Preferred pattern:

```txt
*.test.ts
*.test.tsx
```

## What to Test on Frontend

Good candidates:

- validation schemas;
- data builders;
- API core logic;
- auth retry logic;
- query keys;
- mutation hooks with cache invalidation;
- helper functions.

Avoid testing implementation details of UI components unless there is important user behavior.

## Backend Tests

Backend tests use the Django test runner.

Run backend tests:

```bash
cd backend
python manage.py test
```

Backend tests should cover:

- models;
- serializers;
- permissions;
- API endpoints;
- business rules.

## Code Quality Checks

### Frontend

```bash
cd frontend

npm run lint
npm run format:check
npm run typecheck
npm run test
npm run build
```

### Backend

```bash
cd backend

flake8 .
black --check .
python manage.py check
python manage.py test
```

## Root Checks

If the root Makefile is available:

```bash
make test
make lint
make format
make check
```

## CI

GitHub Actions runs checks for pull requests.

Frontend CI usually includes:

- install dependencies;
- lint;
- format check;
- typecheck;
- tests;
- build.

Backend CI usually includes:

- install dependencies;
- lint;
- format check;
- Django checks;
- migration checks;
- tests.

## Testing Notes

Before opening a pull request, run the relevant checks locally.

For frontend-only changes:

```bash
cd frontend
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run build
```

For backend-only changes:

```bash
cd backend
flake8 .
black --check .
python manage.py check
python manage.py test
```
