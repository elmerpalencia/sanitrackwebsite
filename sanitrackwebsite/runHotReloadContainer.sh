#!/usr/bin/env bash

set -e

echo "Starting hot reload container..."

docker info > /dev/null 2>&1 || {
  echo "❌ Docker is not running"
  exit 1
}

docker compose -f docker-compose.dev.yml down

docker compose -f docker-compose.dev.yml up --build


# Attach logs so Ctrl+C still works
docker compose -f docker-compose.dev.yml logs -f