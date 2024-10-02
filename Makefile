.PHONY: help build up down logs ps test clean rebuild restart frontend-logs backend-logs

# Colors
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20

## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Build Docker images
build:
	docker-compose build

## Start the application
up:
	docker-compose up -d

## Stop the application
down:
	docker-compose down

## View application logs
logs:
	docker-compose logs -f

## View frontend logs
frontend-logs:
	docker-compose logs -f frontend

## View backend logs
backend-logs:
	docker-compose logs -f backend

## List running containers
ps:
	docker-compose ps

## Run tests (placeholder for now)
test:
	@echo "Running tests..."
	# Add actual test commands here

## Remove all containers, networks, and volumes
clean:
	docker-compose down -v --remove-orphans

## Rebuild and restart the application
rebuild: down build up

## Restart the application without rebuilding
restart: down up

## Rebuild and restart only the frontend
rebuild-frontend:
	docker-compose up -d --no-deps --build frontend

## Rebuild and restart only the backend
rebuild-backend:
	docker-compose up -d --no-deps --build backend

## Install frontend dependencies
frontend-install:
	cd frontend && npm install

## Install backend dependencies
backend-install:
	cd backend && pip install -r requirements.txt

## Run frontend tests
frontend-test:
	docker-compose run --rm frontend npm test

## Run backend tests
backend-test:
	docker-compose run --rm backend pytest

## Check available disk space
check-space:
	@echo "Checking available disk space..."
	@df -h