#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"

# Log function with timestamp
log() {
  echo -e "\033[1;34m[INFO $(date +"%Y-%m-%d %H:%M:%S")]\033[0m $1"
}

log "Starting deployment script"
log "Changing directory to script location: $SCRIPT_DIR"

cd "$SCRIPT_DIR" || {
  echo "[ERROR] Failed to change directory to $SCRIPT_DIR"
  exit 1
}

log "Moving to project root directory"
cd .. || {
  echo "[ERROR] Failed to move up one directory"
  exit 1
}

# Load environment variables safely
if [[ -f .env_local ]]; then
  log "Loading environment variables from .env_local file"
  set -o allexport
  source .env_local
  set +o allexport
else
  log "Warning: .env_local file not found, skipping environment variable loading"
fi

# Frontend build process
log "Changing to frontend directory"
cd frontend || {
  echo "[ERROR] Frontend directory not found"
  exit 1
}

log "Installing frontend dependencies"
npm install || {
  echo "[ERROR] Failed to install frontend dependencies"
  exit 1
}

log "Building frontend"
npm run build || {
  echo "[ERROR] Frontend build failed"
  exit 1
}

# Move back to project root
log "Returning to project root directory"
cd .. || exit 1

# Backend setup
log "Cleaning old Rust builds"
cargo clean || {
  echo "[ERROR] Failed to clean Rust build artifacts"
  exit 1
}

log "Starting Rust backend"
cargo run || {
  echo "[ERROR] Rust backend failed to start"
  exit 1
}
