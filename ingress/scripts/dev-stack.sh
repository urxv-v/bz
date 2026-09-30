#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

# Privilege / Invoker escalation
if (( EUID != 0 )); then
  if   command -v sudo >/dev/null 2>&1; then
    exec sudo bash "$0" "$@"
  elif command -v doas >/dev/null 2>&1; then
    exec doas bash "$0" "$@"
  else
    >&2 echo "ERROR: requires root or passwordless sudo/doas."
    exit 1
  fi
fi
readonly INVOKER="${SUDO_USER:-${DOAS_USER:-root}}"

# Helpers & trap
log()   { printf '\033[1;34m[INFO %s]\033[0m %s\n' "$(date +"%Y-%m-%d %H:%M:%S")" "$*"; }
die()   { log "ERROR: $*" >&2; exit 1; }
require_command() {
  command -v "$1" >/dev/null 2>&1 \
    || die "Missing required command: $1"
}
load_env_file() {
  local env_file="${1:?load_env_file: missing file argument}"
  if [[ -f $env_file ]]; then
    log "Loading environment variables from '$env_file'"
    set -a
    source "$env_file"
    set +a
  else
    log "Warning: '$env_file' not found; skipping"
  fi
}
trap 'cleanup' EXIT INT TERM
cleanup() { :; }

# Environment Initialization
load_env_file ".env_os"
load_env_file ".env_DB_credentials"

main() {
  log "Starting deployment script"

  # Ensure essential tools exist
  for cmd in modprobe ss pgrep timeout podman podman-compose npm cargo su runuser; do
    require_command "$cmd"
  done
  # Load kernel module if needed
  if ! lsmod | grep -q "^${KERNEL_MODULE}[[:space:]]"; then
    log "Loading kernel module: $KERNEL_MODULE"
    modprobe "$KERNEL_MODULE"
  else
    log "Kernel module $KERNEL_MODULE already loaded"
  fi

  # Stop stray Postgres
if PG_PID=$(pgrep -u "$PG_USER" -f "postgres.*-D"); then
  log "Stopping Postgres PID $PG_PID"
  kill -SIGTERM "$PG_PID" \
    || die "Failed to send SIGTERM to Postgres ($PG_PID)"

  log "Waiting up to ${PG_SHUTDOWN_TIMEOUT}s for clean exit..."
  timeout=${PG_SHUTDOWN_TIMEOUT}
  while kill -0 "$PG_PID" 2>/dev/null && (( timeout > 0 )); do
    sleep 1
    (( timeout-- ))
  done

  if kill -0 "$PG_PID" 2>/dev/null; then
    log "Postgres did not exit in time; sending SIGKILL."
    kill -KILL "$PG_PID" \
      || die "Failed to force-kill Postgres ($PG_PID)"
  else
    log "Postgres exited cleanly."
  fi
else
  log "No Postgres running"
fi

  # Bring up DB stack as original invoker
  log "Launching Podman Compose as $INVOKER"
  runuser --login "$INVOKER" -- \
    -c "cd '$COMPOSE_FILE_DIR' && podman compose up -d" \
    || die "Podman Compose failed"
  log "✅ Database stack is up"


  log "🎉 All done!"
}
main "$@"
