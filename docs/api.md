# API Documentation

The backend exposes a REST API used by the frontend application.

Most API routes are available under:

```txt
/api/
```

## Authentication

The application uses JWT-based authentication.

Main authentication routes:

```txt
POST /api/auth/login/
POST /api/auth/refresh/
POST /api/auth/logout/
```

## Users

User-related routes are used for managing students, teachers and user profile data.

Possible route group:

```txt
/api/users/
```

User features include:

- current session data;
- students management;
- teachers management;
- user role handling;
- reference data for user forms.

## Topics

Topic-related routes are used for creating, editing, deleting and selecting academic topics.

Possible route group:

```txt
/api/topics/
```

Common actions:

```txt
GET    /api/topics/
POST   /api/topics/
GET    /api/topics/:id/
PATCH  /api/topics/:id/
DELETE /api/topics/:id/
```

## Topic Files

Topics may include attached files.

Topic file data is sent from the frontend using `FormData`.

The frontend may send:

```txt
title
description
type
steps
files
delete_files_ids
```

Fields such as `steps` and `delete_files_ids` are serialized as JSON strings inside `FormData`.

## Error Handling

The frontend API client converts failed responses to a shared `ApiError` object.

Common fields:

```txt
message
status
data
```

This allows UI and business logic to handle API errors consistently.

## Authorization

Access to API actions depends on user role.

Typical rules:

- unauthenticated users can only access authentication endpoints;
- students can view and select topics;
- teachers can manage their own topics;
- administrators can manage users and reference data.

## Notes

This file describes the API at a high level.

If the backend API grows, this documentation should be extended with:

- exact request bodies;
- exact response examples;
- status codes;
- permission rules per endpoint;
- validation error examples.
