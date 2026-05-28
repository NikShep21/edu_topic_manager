# Backend Documentation

The backend is a Django REST Framework application.

It provides API endpoints for authentication, users, topics, files and academic reference data.

## Tech Stack

- Python
- Django
- Django REST Framework
- Simple JWT
- Djoser
- PostgreSQL
- Gunicorn
- WhiteNoise
- Black
- Flake8

## Structure

```txt
backend/
├── EduTopicManager/   # Django project settings
├── api/               # API routing and shared API logic
├── topics/            # Topic domain
├── users/             # User domain
├── manage.py
├── requirements.txt
├── Dockerfile
└── Makefile
```

## Main Domains

### Users

The users domain is responsible for:

- custom user model;
- user roles;
- students;
- teachers;
- administrators;
- user-related reference data.

### Topics

The topics domain is responsible for:

- topic creation;
- topic editing;
- topic deletion;
- topic files;
- topic steps;
- topic selection flow.

### API

The API layer contains shared API-related code:

- routing;
- authentication;
- pagination;
- exceptions;
- permissions.

## Authentication

The backend uses JWT-based authentication.

The frontend communicates with the backend through authentication endpoints and sends protected requests through the auth-aware API client.

Common auth actions:

- login;
- refresh session;
- logout;
- access protected resources.

## Permissions

The backend should protect API actions depending on user role.

Typical role-based access:

- students can view and select available topics;
- teachers can manage their own topics;
- administrators can manage users and reference data.

## Local Development

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Create a superuser:

```bash
python manage.py createsuperuser
```

Run development server:

```bash
python manage.py runserver
```

## Tests

Run backend tests:

```bash
python manage.py test
```

## Code Quality

Run Django checks:

```bash
python manage.py check
```

Run Flake8:

```bash
flake8 .
```

Run Black format check:

```bash
black --check .
```

Format code:

```bash
black .
```

## Backend Makefile

Backend commands can be executed from the `backend` directory.

```bash
make test
make lint
make format
make check
```

Depending on the environment, backend commands may run locally or through Docker.

## Development Notes

When adding backend code:

- keep domain logic inside the related Django app;
- keep serializers focused on validation and representation;
- keep permissions explicit;
- write tests for important business rules;
- create migrations for model changes;
- do not commit local database files or secrets.
