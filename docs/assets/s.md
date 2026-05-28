```mermaid
flowchart TD
    Browser[Browser] --> Nginx[Nginx]

    Nginx -->|/| Frontend[Next.js Frontend]
    Nginx -->|/api| Backend[Django REST API]
    Nginx -->|/media| Media[Media Files]
    Nginx -->|/static| Static[Static Files]

    Backend --> Database[(PostgreSQL)]
```
