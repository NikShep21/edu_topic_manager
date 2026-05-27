COMPOSE = docker compose -f ../docker-compose.yml
SERVICE = backend

.PHONY: help install migrate makemigrations superuser shell test lint format check collectstatic

help:
	@echo "Backend commands:"
	@echo "  make install          Install Python dependencies"
	@echo "  make migrate          Run migrations in Docker"
	@echo "  make makemigrations   Create migrations in Docker"
	@echo "  make superuser        Create Django superuser in Docker"
	@echo "  make shell            Open Django shell in Docker"
	@echo "  make test             Run Django tests in Docker"
	@echo "  make lint             Run flake8 locally"
	@echo "  make format           Format Python code with black locally"
	@echo "  make check            Run Django, black and flake8 checks"
	@echo "  make collectstatic    Collect static files in Docker"

install:
	pip install -r requirements.txt

migrate:
	$(COMPOSE) exec $(SERVICE) python manage.py migrate

makemigrations:
	$(COMPOSE) exec $(SERVICE) python manage.py makemigrations

superuser:
	$(COMPOSE) exec $(SERVICE) python manage.py createsuperuser

shell:
	$(COMPOSE) exec $(SERVICE) python manage.py shell

test:
	$(COMPOSE) exec $(SERVICE) python manage.py test

lint:
	flake8

format:
	black .

check:
	python manage.py check
	black --check .
	flake8 .

collectstatic:
	$(COMPOSE) exec $(SERVICE) python manage.py collectstatic --noinput