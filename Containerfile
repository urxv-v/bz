# syntax=docker/dockerfile:1.7

FROM rust:1.88.0-bookworm AS builder

WORKDIR /workspace

RUN apt-get -o Acquire::Check-Date=false -o Acquire::Check-Valid-Until=false update \
    && apt-get install -y --no-install-recommends \
        pkg-config \
        libssl-dev \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY . .

ENV CARGO_PROFILE_RELEASE_LTO=true \
    CARGO_PROFILE_RELEASE_CODEGEN_UNITS=1 \
    CARGO_PROFILE_RELEASE_STRIP=symbols

RUN cargo build --release --locked --bin ingress --bin auth_actix_server --bin actix

FROM debian:bookworm-slim AS runtime

RUN apt-get -o Acquire::Check-Date=false -o Acquire::Check-Valid-Until=false update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        libssl3 \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system --gid 10001 appgroup \
    && useradd --system --uid 10001 --gid appgroup --create-home --home-dir /home/appuser appuser

WORKDIR /srv/blazecore

COPY --from=builder --chown=appuser:appgroup /workspace/target/release/ingress /usr/local/bin/ingress
COPY --from=builder --chown=appuser:appgroup /workspace/target/release/auth_actix_server /usr/local/bin/auth_actix_server
COPY --from=builder --chown=appuser:appgroup /workspace/target/release/actix /usr/local/bin/actix

ENV APP_ENV=production \
    RUST_LOG=info \
    AUTH_MAX_CONNECTIONS=5 \
    EXPERIMENTS_POOL_SIZE=5 \
    HOST=0.0.0.0 \
    PORT=8001 \
    DATABASE_URL=

USER appuser

EXPOSE 8001 8080 8081
