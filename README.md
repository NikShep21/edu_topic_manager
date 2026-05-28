# Edu Topic Manager

Edu Topic Manager is a full-stack web application for managing academic project topics, such as coursework and thesis topics.

The system allows teachers to create and manage topics, students to view and select available topics, and administrators to manage users and reference data.

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- TanStack React Query
- React Hook Form
- Zod
- SCSS Modules
- Vitest

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL

### Infrastructure

- Docker
- Docker Compose
- Nginx
- GitHub Actions
- Husky
- lint-staged

## Project Structure

```txt
edu_topic_manager/
├── backend/                  # Django backend
├── frontend/                 # Next.js frontend
├── nginx/                    # Nginx configuration
├── docs/                     # Project documentation
├── docker-compose.yml        # Local Docker Compose configuration
├── docker-compose.deploy.yml # Deployment Docker Compose configuration
├── Makefile                  # Root project commands
└── README.md
```

## Quick Start

Create a `.env` file in the project root.

Example:

```env
SECRET_KEY=your-secret-key
DEBUG=1
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=edu_topic_manager
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```

Start the project with Docker:

```bash
docker compose up -d --build
```

Open the application:

```txt
http://localhost
```

Stop the project:

```bash
docker compose down
```

## Available Commands

If `make` is available, common commands can be executed from the project root:

```bash
make up
make down
make restart
make build
make logs
make ps
make test
make lint
make format
make check
make clean
```

## Documentation

Detailed documentation is stored in the `docs/` directory:

- [Frontend](docs/frontend.md)
- [Backend](docs/backend.md)
- [Architecture](docs/architecture.md)
- [API](docs/api.md)
- [Docker](docs/docker.md)
- [Testing](docs/testing.md)
- [Contributing](docs/contributing.md)
- [Deployment](docs/deployment.md)

## Testing

Frontend:

```bash
cd frontend
npm run test
```

Backend:

```bash
cd backend
python manage.py test
```

## License

This project is licensed under the MIT License.
