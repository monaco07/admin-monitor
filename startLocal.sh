#!/usr/bin/env bash

set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PIDS=()

cleanup() {
    echo
    echo "Stopping services..."

    for pid in "${PIDS[@]}"; do
        kill "$pid" 2>/dev/null || true
    done

    wait 2>/dev/null || true
}

trap cleanup INT TERM EXIT

start_service() {
    local name="$1"
    local dir="$2"
    shift 2

    (
        cd "$ROOT_DIR/$dir"
        "$@" 2>&1 | sed "s/^/[$name] /"
    ) &

    PIDS+=("$!")
}

start_service "WEB" "web" npm start
start_service "API" "api" npm run start:dev
start_service "WORKER" "worker" cargo run

echo "Started:"
echo "  WEB    → http://localhost:4200"
echo "  API    → http://localhost:3000"
echo "  WORKER → Rust"

wait