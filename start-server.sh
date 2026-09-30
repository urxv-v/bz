#!/bin/bash

set -euo pipefail

# These mirror the ${VAR:-default} values in compose.yml.
# Export any of them beforehand to override (e.g. if you changed
# POSTGRES_PASSWORD in your .env file).
POSTGRES_USER="${POSTGRES_USER:-blazecore}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-change-me}"
POSTGRES_DB="${POSTGRES_DB:-blazecore}"

# Running via `cargo run` on the host, not inside the blazecore-net
# network, so postgres/experiments are reached via localhost + their
# published ports rather than the internal service names.
export DATABASE_URL="${DATABASE_URL:-postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}}"
export JWT_SECRET="${JWT_SECRET:-blazecore_secret_key_12345}"

# ingress-specific settings (see the `ingress` service in compose.yml)
export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-8001}"
export AUTH_MAX_CONNECTIONS="${AUTH_MAX_CONNECTIONS:-5}"
export EXPERIMENTS_POOL_SIZE="${EXPERIMENTS_POOL_SIZE:-5}"
export EXPERIMENTS_SERVICE_URL="${EXPERIMENTS_SERVICE_URL:-http://localhost:8080}"

echo "Starting Blazecore ingress server with environment variables..."
echo "DATABASE_URL: $DATABASE_URL"
echo "JWT_SECRET: ***redacted***"
echo "HOST: $HOST"
echo "PORT: $PORT"
echo "AUTH_MAX_CONNECTIONS: $AUTH_MAX_CONNECTIONS"
echo "EXPERIMENTS_POOL_SIZE: $EXPERIMENTS_POOL_SIZE"
echo "EXPERIMENTS_SERVICE_URL: $EXPERIMENTS_SERVICE_URL"

# Run the server
cargo run --bin ingress
