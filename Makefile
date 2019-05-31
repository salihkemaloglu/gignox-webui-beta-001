dpl ?= deploy.env
include $(dpl)
# HELP
.PHONY: help
help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# DOCKER TASKS
# Build the container
build: ## Build the container
	docker build -t gignoxui_dev .	
ps:
	docker-compose  ps
build-nc: ## Build the container without caching
	docker build --no-cache -t gignoxui .
## Run container on docker-compose environment
up:
	docker-compose up
upd:
	docker-compose up -d	
## stop container on docker-compose environment
stop: 
	docker-compose stop
## down container on docker-compose environment
down:
	docker-compose down

