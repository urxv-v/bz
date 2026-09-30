CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE IF NOT EXISTS devices (
    id BIGSERIAL PRIMARY KEY,
    device_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    protocol TEXT NOT NULL,
    connector_config JSONB NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_daq_devices (
    experiment_id INTEGER NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
    device_id BIGINT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (experiment_id, device_id)
);

CREATE TABLE IF NOT EXISTS telemetry_events (
    time TIMESTAMPTZ NOT NULL,
    event_id UUID,
    experiment_id INTEGER NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
    device_id BIGINT REFERENCES devices(id) ON DELETE SET NULL,
    source_device_id TEXT,
    sequence BIGINT,
    quality TEXT,
    measurements JSONB NOT NULL,
    source_topic TEXT,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_hypertable('telemetry_events', 'time', if_not_exists => TRUE);

CREATE UNIQUE INDEX IF NOT EXISTS telemetry_events_event_id_idx
    ON telemetry_events (event_id, time) WHERE event_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS telemetry_events_device_sequence_idx
    ON telemetry_events (source_device_id, sequence, time)
    WHERE source_device_id IS NOT NULL AND sequence IS NOT NULL;
CREATE INDEX IF NOT EXISTS telemetry_events_experiment_time_idx
    ON telemetry_events (experiment_id, time DESC);
CREATE INDEX IF NOT EXISTS telemetry_events_device_time_idx
    ON telemetry_events (source_device_id, time DESC);
CREATE INDEX IF NOT EXISTS experiment_daq_devices_device_idx
    ON experiment_daq_devices (device_id);
