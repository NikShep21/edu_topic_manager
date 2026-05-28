# Deployment Documentation

The project contains a deployment Docker Compose configuration.

Deployment-related file:

```txt
docker-compose.deploy.yml
```

## Deployment Services

The deployment setup may include:

```txt
db
backend
frontend
nginx
```

The deployment configuration uses prebuilt images instead of building everything locally.

## Images

Deployment images are expected to be stored in a container registry, for example GitHub Container Registry.

Typical services:

```txt
backend image
frontend image
nginx image
postgres image
```

## Environment Variables

Deployment requires environment variables for backend and database configuration.

Example:

```env
SECRET_KEY=your-production-secret-key
DEBUG=0
ALLOWED_HOSTS=your-domain.com

DB_NAME=edu_topic_manager
DB_USER=postgres
DB_PASSWORD=secure-password
DB_HOST=db
DB_PORT=5432
```

Production values must not be committed to the repository.

## HTTPS

Nginx can be configured to use HTTPS certificates.

Certificates may be mounted from the host machine, for example:

```txt
/etc/letsencrypt
```

## Static and Media Files

The backend serves or exposes:

```txt
/static/
/media/
```

Nginx should be configured to route these paths correctly.

## Deployment Flow

Typical deployment flow:

1. Build images.
2. Push images to container registry.
3. Pull images on server.
4. Start services with deployment compose.
5. Apply migrations.
6. Collect static files.
7. Check logs and health.

## Start Deployment

Example command:

```bash
docker compose -f docker-compose.deploy.yml up -d
```

## Stop Deployment

```bash
docker compose -f docker-compose.deploy.yml down
```

## Show Logs

```bash
docker compose -f docker-compose.deploy.yml logs -f
```

## Apply Migrations

Depending on the backend container setup:

```bash
docker compose -f docker-compose.deploy.yml exec backend python manage.py migrate
```

## Create Superuser

```bash
docker compose -f docker-compose.deploy.yml exec backend python manage.py createsuperuser
```

## Troubleshooting

Check running services:

```bash
docker compose -f docker-compose.deploy.yml ps
```

Check logs:

```bash
docker compose -f docker-compose.deploy.yml logs -f backend
docker compose -f docker-compose.deploy.yml logs -f frontend
docker compose -f docker-compose.deploy.yml logs -f nginx
docker compose -f docker-compose.deploy.yml logs -f db
```

Common issues:

- missing environment variables;
- invalid database credentials;
- migrations were not applied;
- nginx routes are incorrect;
- certificates are missing;
- images were not pulled correctly.
