COMPOSE = docker-compose
NPM = npm.cmd
FRONTEND = $(NPM) --prefix frontend run

.PHONY: help up down restart build logs ps test lint format check clean

help:
	@echo "Available commands:"
	@echo "  make up          Start project in Docker"
	@echo "  make down        Stop Docker containers"
	@echo "  make restart     Restart Docker containers"
	@echo "  make build       Build Docker images"
	@echo "  make logs        Show Docker logs"
	@echo "  make ps          Show Docker services"
	@echo "  make test        Run all tests"
	@echo "  make lint        Run all linters"
	@echo "  make format      Format all code"
	@echo "  make check       Run all checks"
	@echo "  make clean       Stop containers and remove orphans"

up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) down && $(COMPOSE) up -d --build

build:
	$(COMPOSE) build

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

test:
	"$(MAKE)" -C backend test && $(FRONTEND) test

lint:
	"$(MAKE)" -C backend lint && $(FRONTEND) lint

format:
	"$(MAKE)" -C backend format && $(FRONTEND) format

check:
	"$(MAKE)" -C backend check && $(FRONTEND) check

clean:
	$(COMPOSE) down --remove-orphans
