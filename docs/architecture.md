# Architecture Documentation

Edu Topic Manager is a full-stack monorepo application.

It consists of:

- Next.js frontend;
- Django REST Framework backend;
- PostgreSQL database;
- Nginx reverse proxy;
- Docker Compose infrastructure.

## Global Architecture

The application is accessed through Nginx. Nginx routes frontend requests to the Next.js service and API requests to the Django backend.

![Global architecture](assets/diagrams/png/global-architecture.png)

Diagram source:

```text
docs/assets/diagrams/sources/global-architecture.mmd
```

## Request Flow

The common request flow contains two main parts:

- loading the frontend application;
- sending API requests to the backend.

![Request flow](assets/diagrams/png/request-flow.png)

Diagram source:

```text
docs/assets/diagrams/sources/request-flow.mmd
```

## Monorepo Structure

```text
edu_topic_manager/
├── backend/
├── frontend/
├── nginx/
├── docs/
├── docker-compose.yml
├── docker-compose.deploy.yml
├── Makefile
└── package.json
```

## Frontend Responsibility

The frontend is responsible for:

- rendering pages;
- handling user interaction;
- validating forms;
- communicating with the backend API;
- managing server state with React Query;
- handling authentication retry logic.

## Backend Responsibility

The backend is responsible for:

- authentication;
- authorization;
- business rules;
- database models;
- API endpoints;
- validation;
- file handling;
- permissions.

## Database Responsibility

PostgreSQL stores application data:

- users;
- students;
- teachers;
- topics;
- topic files;
- topic steps;
- topic applications;
- reference data.

## Nginx Responsibility

Nginx is used as a reverse proxy.

It routes requests to the correct service:

```text
/api/      → backend
/static/   → backend static files
/media/    → backend media files
/          → frontend
```

## Authentication Architecture

Protected frontend requests are sent through the shared auth-aware API client.

If the backend returns `401 Unauthorized`, the frontend tries to refresh the session and then retries the original request once.

General flow:

```text
Protected request
  ↓
authClient
  ↓
Backend API

If 401:
  ↓
refresh session
  ↓
retry original request
```

## Additional Architecture Diagrams

Project diagrams are stored both as editable Mermaid sources and exported PNG images.

Mermaid sources are stored in:

```text
docs/assets/diagrams/sources/
```

Exported PNG images are stored in:

```text
docs/assets/diagrams/png/
```

### Use Case Diagram

![Use case diagram](assets/diagrams/png/use-case.png)

Diagram source: `docs/assets/diagrams/sources/use-case.mmd`

This diagram shows the main user roles and their key actions in the system: students work with topics and applications, teachers manage topics and application decisions, and administrators manage users and reference data.

### Topic Application Flow

![Topic application flow](assets/diagrams/png/topic-application-flow.png)

Diagram source: `docs/assets/diagrams/sources/topic-application-flow.mmd`

This sequence diagram shows the main backend scenario for applying to a topic. It includes the frontend request, nginx routing, backend validation, database checks, topic application creation, and error branches.

### Database Schema

![Database schema](assets/diagrams/png/database-schema.png)

Diagram source: `docs/assets/diagrams/sources/database-schema.mmd`

This diagram shows the main backend database entities and relations: users, student and teacher profiles, reference tables, topics, topic steps, topic files, and topic applications.

Built-in Django tables such as groups, permissions, sessions, and migrations are not shown to keep the diagram focused on project domain data.

### Frontend API Flow

![Frontend API flow](assets/diagrams/png/frontend-api-flow.png)

Diagram source: `docs/assets/diagrams/sources/frontend-api-flow.mmd`

This diagram describes how the frontend sends API requests, receives backend responses, and updates the user interface.

### Authentication Retry Flow

![Frontend auth retry flow](assets/diagrams/png/frontend-auth-retry-flow.png)

Diagram source: `docs/assets/diagrams/sources/frontend-auth-retry-flow.mmd`

This diagram shows how the frontend handles an expired access token, refreshes it, and retries the original request once.

### Frontend FSD Layers

![Frontend FSD layers](assets/diagrams/png/frontend-fsd-layers.png)

Diagram source: `docs/assets/diagrams/sources/frontend-fsd-layers.mmd`

This diagram shows the frontend code organization based on Feature-Sliced Design layers.

## Development Principles

- Keep frontend and backend responsibilities separated.
- Keep shared frontend infrastructure in the `shared` layer.
- Keep business entity logic in the `entities` layer.
- Keep user actions and mutation flows in the `features` layer.
- Keep backend domain logic inside the related Django app.
- Keep documentation and diagrams synchronized with code changes.
- Store diagram sources together with exported diagram images.
