# Docker Documentation

The project can be started with Docker Compose.

Docker is the recommended way to run the full project locally because it starts all required services together.

## Services

The local Docker Compose setup includes:

```txt
db        # PostgreSQL database
backend   # Django backend
frontend  # Next.js frontend
nginx     # Reverse proxy
```

## Start Project

From the project root:

```bash
docker compose up -d --build
```

This command builds images and starts containers in detached mode.

## Stop Project

```bash
docker compose down
```

## Show Running Services

```bash
docker compose ps
```

## Show Logs

```bash
docker compose logs -f
```

Show logs for one service:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
docker compose logs -f db
```

## Rebuild Images

```bash
docker compose build
```

Or rebuild and start:

```bash
docker compose up -d --build
```

## Environment Variables

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

Inside Docker, the database host should be:

```env
DB_HOST=db
```

because `db` is the Docker Compose service name.

## Nginx

Nginx acts as a reverse proxy.

Typical routing:

```txt
/api/      → backend
/static/   → backend static files
/media/    → backend media files
/          → frontend
```

## Root Makefile

The root Makefile provides shortcuts for common Docker commands.

```bash
make up
make down
make restart
make build
make logs
make ps
make clean
```

## Useful Commands

Start project:

```bash
make up
```

Stop project:

```bash
make down
```

Restart project:

```bash
make restart
```

Show logs:

```bash
make logs
```

Show services:

```bash
make ps
```

Remove orphan containers:

```bash
make clean
```

## Notes

If containers do not start correctly:

1. Check `.env`.
2. Check Docker is running.
3. Rebuild images.
4. Check service logs.

```bash
docker compose logs -f
```
