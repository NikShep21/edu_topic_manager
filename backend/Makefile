COMPOSE = docker compose -f ../docker-compose.yml
SERVICE = backend

.PHONY: help up install migrate makemigrations superuser shell test lint format check collectstatic

help:
	@echo "Backend commands:"
	@echo "  make up               Start database and backend containers"
	@echo "  make install          Install Python dependencies locally"
	@echo "  make migrate          Run migrations in Docker"
	@echo "  make makemigrations   Create migrations in Docker"
	@echo "  make superuser        Create Django superuser in Docker"
	@echo "  make shell            Open Django shell in Docker"
	@echo "  make test             Run Django tests in Docker"
	@echo "  make lint             Run flake8 in Docker"
	@echo "  make format           Format Python code with black in Docker"
	@echo "  make check            Run Django, black and flake8 checks in Docker"
	@echo "  make collectstatic    Collect static files in Docker"

up:
	$(COMPOSE) up -d db $(SERVICE)

install:
	python -m pip install -r requirements.txt

migrate: up
	$(COMPOSE) exec $(SERVICE) python manage.py migrate

makemigrations: up
	$(COMPOSE) exec $(SERVICE) python manage.py makemigrations

superuser: up
	$(COMPOSE) exec $(SERVICE) python manage.py createsuperuser

shell: up
	$(COMPOSE) exec $(SERVICE) python manage.py shell

test: up
	$(COMPOSE) exec $(SERVICE) python manage.py test

lint: up
	$(COMPOSE) exec $(SERVICE) flake8

format: up
	$(COMPOSE) exec $(SERVICE) black .

check: up
	$(COMPOSE) exec $(SERVICE) python manage.py check
	$(COMPOSE) exec $(SERVICE) black --check .
	$(COMPOSE) exec $(SERVICE) flake8

collectstatic: up
	$(COMPOSE) exec $(SERVICE) python manage.py collectstatic --noinput