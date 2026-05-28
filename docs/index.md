# Edu Topic Manager documentation

Edu Topic Manager is an educational project for managing coursework and graduation thesis topics.

The documentation describes the backend, frontend, API, Docker infrastructure, deployment, testing strategy, architecture, and development process.

```{toctree}
:maxdepth: 2
:caption: Contents

architecture
backend
frontend
api
docker
deployment
testing
contributing
```

## Diagrams

Project diagrams are stored in `docs/assets/diagrams/`.

Diagram sources are stored in Mermaid format:

- `docs/assets/diagrams/sources/global-architecture.mmd` — global architecture and system context.
- `docs/assets/diagrams/sources/request-flow.mmd` — HTTP request processing flow.
- `docs/assets/diagrams/sources/frontend-api-flow.mmd` — frontend and backend API interaction.
- `docs/assets/diagrams/sources/frontend-auth-retry-flow.mmd` — access token refresh and request retry flow.
- `docs/assets/diagrams/sources/frontend-fsd-layers.mmd` — frontend architecture layers.

Exported PNG versions are stored in `docs/assets/diagrams/png/`.

The diagrams can be edited with Mermaid Live Editor:

https://mermaid.live/
