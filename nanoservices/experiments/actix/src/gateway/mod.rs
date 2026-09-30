use dal::telemetry::schema::TelemetryEvent;
use parking_lot::Mutex;
use rumqttc::{AsyncClient, Event, LastWill, MqttOptions, Packet, QoS, Transport};
use std::{
    collections::{HashSet, VecDeque},
    env,
    sync::{
        Arc,
        atomic::{AtomicU64, Ordering},
    },
    time::{Duration, Instant},
};
use tokio::{
    sync::{broadcast, mpsc},
    task::JoinHandle,
};
use tokio_util::sync::CancellationToken;
use tracing::{debug, info, warn};
use url::Url;

pub mod websocket;

const INGESTION_CAPACITY: usize = 512;
const FANOUT_CAPACITY: usize = 256;
const DEDUPLICATION_CAPACITY: usize = 4096;
const DEFAULT_RECONNECT_DELAY_MS: u64 = 500;
const DEFAULT_MAX_RECONNECT_DELAY_MS: u64 = 30_000;
const DEFAULT_RECONNECT_RESET_AFTER_SECS: u64 = 60;
const DEFAULT_DEDUP_TTL_SECS: u64 = 3_600;
const DEFAULT_KEEP_ALIVE_SECS: u64 = 30;

// ---------------------------------------------------------------------------
// Topic namespace: daq/<scope>/<device>/<class>/[<resource>/[<channel>/<metric>]]
// ---------------------------------------------------------------------------

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum MessageClass {
    Telemetry,
    Event,
    State,
    Command,
    Config,
    Unknown,
}

impl MessageClass {
    fn parse(s: &str) -> Self {
        match s {
            "telemetry" => Self::Telemetry,
            "event" => Self::Event,
            "state" => Self::State,
            "command" => Self::Command,
            "config" => Self::Config,
            _ => Self::Unknown,
        }
    }

    /// Classes the *gateway* consumes. Others (command/config) are outbound-only
    /// and are ignored here even if the broker delivers them.
    fn is_ingestible(self) -> bool {
        matches!(self, Self::Telemetry | Self::Event | Self::State)
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TopicContext {
    pub raw: String,
    pub scope: String,
    pub device: String,
    pub class: MessageClass,
    /// `telemetry/<resource>/<channel>/<metric>` → all three populated.
    /// `event|state|command|config/<x>` → resource = Some(x), channel/metric = None.
    pub resource: Option<String>,
    pub channel: Option<String>,
    pub metric: Option<String>,
}

#[derive(Debug, thiserror::Error)]
pub enum TopicParseError {
    #[error("topic does not start with configured prefix")]
    PrefixMismatch,
    #[error("topic has fewer than 4 segments after prefix")]
    TooFewSegments,
    #[error("telemetry topic must have exactly <resource>/<channel>/<metric>")]
    InvalidTelemetryShape,
    #[error("non-telemetry topic must have exactly one resource segment")]
    InvalidShallowShape,
}

impl TopicContext {
    pub fn parse(prefix: &str, topic: &str) -> Result<Self, TopicParseError> {
        let prefix = prefix.trim_end_matches('/');
        let rest = topic
            .strip_prefix(prefix)
            .and_then(|s| s.strip_prefix('/'))
            .ok_or(TopicParseError::PrefixMismatch)?;
        let parts: Vec<&str> = rest.split('/').collect();
        if parts.len() < 4 {
            return Err(TopicParseError::TooFewSegments);
        }
        let scope = parts[0].to_string();
        let device = parts[1].to_string();
        let class = MessageClass::parse(parts[2]);
        let (resource, channel, metric) = match class {
            MessageClass::Telemetry => {
                if parts.len() != 6 {
                    return Err(TopicParseError::InvalidTelemetryShape);
                }
                (
                    Some(parts[3].to_string()),
                    Some(parts[4].to_string()),
                    Some(parts[5].to_string()),
                )
            }
            MessageClass::Event
            | MessageClass::State
            | MessageClass::Command
            | MessageClass::Config => {
                if parts.len() != 4 {
                    return Err(TopicParseError::InvalidShallowShape);
                }
                (Some(parts[3].to_string()), None, None)
            }
            MessageClass::Unknown => (None, None, None),
        };
        Ok(Self {
            raw: topic.to_string(),
            scope,
            device,
            class,
            resource,
            channel,
            metric,
        })
    }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

#[derive(Clone, Debug)]
pub struct GatewayConfig {
    pub broker_url: String,
    pub client_id: String,
    pub username: Option<String>,
    pub password: Option<String>,
    pub ca_cert_path: Option<String>,
    pub client_cert_path: Option<String>,
    pub client_key_path: Option<String>,
    pub topic_prefix: String,
    pub qos: QoS,
    pub reconnect_delay: Duration,
    pub max_reconnect_delay: Duration,
    /// If the connection stayed up at least this long, reset backoff on disconnect.
    pub reconnect_reset_after: Duration,
    /// Wall-clock window in which a duplicate event ID is suppressed.
    pub dedup_ttl: Duration,
    pub keep_alive: Duration,
}

impl GatewayConfig {
    pub fn from_env() -> Result<Self, String> {
        let qos = match env::var("MQTT_QOS").unwrap_or_else(|_| "1".into()).as_str() {
            "0" => QoS::AtMostOnce,
            "1" => QoS::AtLeastOnce,
            "2" => QoS::ExactlyOnce,
            value => return Err(format!("MQTT_QOS must be 0, 1, or 2, got {value}")),
        };
        let reconnect_delay = env::var("MQTT_RECONNECT_DELAY_MS")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(DEFAULT_RECONNECT_DELAY_MS);
        let max_reconnect_delay = env::var("MQTT_MAX_RECONNECT_DELAY_MS")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(DEFAULT_MAX_RECONNECT_DELAY_MS);
        if reconnect_delay == 0 || max_reconnect_delay < reconnect_delay {
            return Err("MQTT reconnect delays must be positive and max must be >= initial".into());
        }
        let reconnect_reset_after = env::var("MQTT_RECONNECT_RESET_AFTER_SECS")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(DEFAULT_RECONNECT_RESET_AFTER_SECS);
        let dedup_ttl = env::var("MQTT_DEDUP_TTL_SECS")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(DEFAULT_DEDUP_TTL_SECS);

        let username = env::var("MQTT_USERNAME").ok();
        let password = env::var("MQTT_PASSWORD").ok();
        if username.is_some() != password.is_some() {
            return Err(
                "MQTT_USERNAME and MQTT_PASSWORD must be configured together or not at all".into(),
            );
        }

        Ok(Self {
            broker_url: env::var("MQTT_BROKER_URL")
                .unwrap_or_else(|_| "mqtt://127.0.0.1:1883".into()),
            client_id: env::var("MQTT_CLIENT_ID")
                .unwrap_or_else(|_| "blazecore-experiments".into()),
            username,
            password,
            ca_cert_path: env::var("MQTT_CA_CERT_PATH").ok(),
            client_cert_path: env::var("MQTT_CLIENT_CERT_PATH").ok(),
            client_key_path: env::var("MQTT_CLIENT_KEY_PATH").ok(),
            topic_prefix: env::var("MQTT_TOPIC_PREFIX").unwrap_or_else(|_| "daq".into()),
            qos,
            reconnect_delay: Duration::from_millis(reconnect_delay),
            max_reconnect_delay: Duration::from_millis(max_reconnect_delay),
            reconnect_reset_after: Duration::from_secs(reconnect_reset_after),
            dedup_ttl: Duration::from_secs(dedup_ttl),
            keep_alive: Duration::from_secs(DEFAULT_KEEP_ALIVE_SECS),
        })
    }

    /// `daq/+/+/#` covers every class and any depth below `<class>`.
    fn topic_filter(&self) -> String {
        format!("{}/+/+/#", self.topic_prefix.trim_end_matches('/'))
    }

    fn status_topic(&self) -> String {
        format!(
            "{}/gateway/{}/status",
            self.topic_prefix.trim_end_matches('/'),
            self.client_id
        )
    }
}

pub use dal::telemetry::schema::TelemetryEvent as GatewayTelemetryEvent;

// ---------------------------------------------------------------------------
// Broadcast payload: parsed topic context + the schema event
// ---------------------------------------------------------------------------

#[derive(Clone, Debug)]
pub struct GatewayEvent {
    pub context: TopicContext,
    pub event: TelemetryEvent,
}

// ---------------------------------------------------------------------------
// Gateway state: broadcast sender + deduplication cache
// ---------------------------------------------------------------------------

#[derive(Clone)]
pub struct GatewayState {
    sender: broadcast::Sender<GatewayEvent>,
    seen_events: Arc<Mutex<DeduplicationCache>>,
    metrics: Arc<GatewayMetrics>,
}

impl GatewayState {
    pub fn new(dedup_ttl: Duration) -> Self {
        let (sender, _) = broadcast::channel(FANOUT_CAPACITY);
        Self {
            sender,
            seen_events: Arc::new(Mutex::new(DeduplicationCache::new(
                DEDUPLICATION_CAPACITY,
                dedup_ttl,
            ))),
            metrics: Arc::new(GatewayMetrics::default()),
        }
    }

    pub fn subscribe(&self) -> broadcast::Receiver<GatewayEvent> {
        self.sender.subscribe()
    }

    pub fn metrics(&self) -> Arc<GatewayMetrics> {
        Arc::clone(&self.metrics)
    }

    fn publish(&self, event: GatewayEvent) {
        let key = event.event.event_id.clone().or_else(|| {
            Some(format!(
                "{}:{}",
                event.event.device_id.as_deref().unwrap_or("unknown"),
                event.event.sequence?
            ))
        });
        let Some(key) = key else {
            // Neither event_id nor (device_id, sequence) available: cannot dedup.
            // We deliberately forward rather than drop, since the original dropped.
            self.metrics
                .missing_dedup_key
                .fetch_add(1, Ordering::Relaxed);
            self.dispatch(event);
            return;
        };

        let is_new = self.seen_events.lock().insert(key);
        if !is_new {
            self.metrics.duplicate.fetch_add(1, Ordering::Relaxed);
            debug!("duplicate event suppressed");
            return;
        }
        self.dispatch(event);
    }

    fn dispatch(&self, event: GatewayEvent) {
        match self.sender.send(event) {
            Ok(n) => {
                self.metrics.published.fetch_add(1, Ordering::Relaxed);
                debug!(receivers = n, "event fanned out");
            }
            Err(_) => {
                self.metrics.no_receivers.fetch_add(1, Ordering::Relaxed);
            }
        }
    }
}

#[derive(Default)]
pub struct GatewayMetrics {
    pub received: AtomicU64,
    pub topic_parse_failed: AtomicU64,
    pub deserialize_failed: AtomicU64,
    pub non_finite: AtomicU64,
    pub device_mismatch: AtomicU64,
    pub missing_dedup_key: AtomicU64,
    pub duplicate: AtomicU64,
    pub published: AtomicU64,
    pub no_receivers: AtomicU64,
    pub class_ignored: AtomicU64,
}

// ---------------------------------------------------------------------------
// Deduplication cache: count- and TTL-bounded FIFO
// ---------------------------------------------------------------------------

struct DeduplicationCache {
    keys: HashSet<String>,
    order: VecDeque<(String, Instant)>,
    capacity: usize,
    ttl: Duration,
}

impl DeduplicationCache {
    fn new(capacity: usize, ttl: Duration) -> Self {
        Self {
            keys: HashSet::with_capacity(capacity),
            order: VecDeque::with_capacity(capacity),
            capacity,
            ttl,
        }
    }

    /// Returns `true` if `key` was not present (i.e. the event is new).
    fn insert(&mut self, key: String) -> bool {
        self.evict_expired();
        if self.keys.contains(&key) {
            return false;
        }
        self.keys.insert(key.clone());
        self.order.push_back((key, Instant::now()));
        while self.order.len() > self.capacity {
            if let Some((oldest, _)) = self.order.pop_front() {
                self.keys.remove(&oldest);
            }
        }
        true
    }

    fn evict_expired(&mut self) {
        let now = Instant::now();
        while let Some((_, t)) = self.order.front() {
            if now.duration_since(*t) > self.ttl {
                if let Some((old, _)) = self.order.pop_front() {
                    self.keys.remove(&old);
                }
            } else {
                break;
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

struct InboundTelemetry {
    topic: String,
    payload: Vec<u8>,
}

pub struct GatewayHandle {
    shutdown: CancellationToken,
    processor: JoinHandle<()>,
    mqtt: JoinHandle<()>,
}

impl GatewayHandle {
    /// Signal both tasks to stop and wait for them to finish.
    pub async fn shutdown(self) {
        self.shutdown.cancel();
        let _ = tokio::join!(self.processor, self.mqtt);
    }

    pub fn cancellation_token(&self) -> CancellationToken {
        self.shutdown.clone()
    }
}

pub fn start(config: GatewayConfig, state: GatewayState) -> GatewayHandle {
    let shutdown = CancellationToken::new();
    let (ingestion_tx, ingestion_rx) = mpsc::channel::<InboundTelemetry>(INGESTION_CAPACITY);

    let mqtt = tokio::spawn(run_mqtt(config.clone(), ingestion_tx, shutdown.clone()));
    let processor = tokio::spawn(process_ingestion(
        ingestion_rx,
        state,
        config.topic_prefix.clone(),
        shutdown.clone(),
    ));

    GatewayHandle {
        shutdown,
        processor,
        mqtt,
    }
}

// ---------------------------------------------------------------------------
// Processing task
// ---------------------------------------------------------------------------

async fn process_ingestion(
    mut receiver: mpsc::Receiver<InboundTelemetry>,
    state: GatewayState,
    topic_prefix: String,
    cancel: CancellationToken,
) {
    loop {
        let inbound = tokio::select! {
            _ = cancel.cancelled() => {
                info!("ingestion cancelled");
                return;
            }
            maybe = receiver.recv() => match maybe {
                Some(v) => v,
                None => return,
            },
        };

        state.metrics.received.fetch_add(1, Ordering::Relaxed);

        let context = match TopicContext::parse(&topic_prefix, &inbound.topic) {
            Ok(ctx) => ctx,
            Err(error) => {
                state
                    .metrics
                    .topic_parse_failed
                    .fetch_add(1, Ordering::Relaxed);
                warn!(topic = %inbound.topic, %error, "dropping malformed topic");
                continue;
            }
        };

        if !context.class.is_ingestible() {
            state.metrics.class_ignored.fetch_add(1, Ordering::Relaxed);
            continue;
        }

        let Ok(mut event) = serde_json::from_slice::<TelemetryEvent>(&inbound.payload) else {
            state
                .metrics
                .deserialize_failed
                .fetch_add(1, Ordering::Relaxed);
            debug!(topic = %inbound.topic, "dropping unparseable payload");
            continue;
        };

        // Cross-check device identity: topic wins on disagreement.
        if let Some(device) = event.device_id.as_deref() {
            if device != context.device {
                state
                    .metrics
                    .device_mismatch
                    .fetch_add(1, Ordering::Relaxed);
                warn!(
                    topic_device = %context.device,
                    payload_device = %device,
                    "device mismatch between topic and payload; using topic"
                );
            }
        }
        event.device_id = Some(context.device.clone());
        event.source_topic = Some(context.raw.clone());

        if !event.measurements.values().all(|v| v.is_finite()) {
            state.metrics.non_finite.fetch_add(1, Ordering::Relaxed);
            debug!(topic = %inbound.topic, "dropping event with non-finite measurement");
            continue;
        }

        state.publish(GatewayEvent { context, event });
    }
}

// ---------------------------------------------------------------------------
// MQTT task
// ---------------------------------------------------------------------------

async fn run_mqtt(
    config: GatewayConfig,
    sender: mpsc::Sender<InboundTelemetry>,
    cancel: CancellationToken,
) {
    let mut delay = config.reconnect_delay;
    loop {
        if cancel.is_cancelled() {
            return;
        }
        let connected_at = Instant::now();
        let result = tokio::select! {
            _ = cancel.cancelled() => return,
            r = connect_and_poll(&config, &sender, &cancel) => r,
        };

        match result {
            Ok(()) => {
                // Clean shutdown path from within connect_and_poll.
                return;
            }
            Err(error) => {
                // If we had been up long enough, treat this as a fresh outage.
                if connected_at.elapsed() >= config.reconnect_reset_after {
                    delay = config.reconnect_delay;
                }
                warn!(%error, ?delay, "MQTT gateway disconnected; retrying");
                tokio::select! {
                    _ = cancel.cancelled() => return,
                    _ = tokio::time::sleep(delay) => {}
                }
                delay = std::cmp::min(delay.saturating_mul(2), config.max_reconnect_delay);
            }
        }
    }
}

async fn connect_and_poll(
    config: &GatewayConfig,
    sender: &mpsc::Sender<InboundTelemetry>,
    cancel: &CancellationToken,
) -> Result<(), String> {
    let broker_url = with_client_id(&config.broker_url, &config.client_id)?;
    let mut options =
        MqttOptions::parse_url(&broker_url).map_err(|e| format!("invalid MQTT broker URL: {e}"))?;

    if let (Some(username), Some(password)) = (&config.username, &config.password) {
        options.set_credentials(username, password);
    }

    options.set_keep_alive(config.keep_alive);
    options.set_last_will(LastWill::new(
        config.status_topic(),
        b"offline".to_vec(),
        config.qos,
        true,
    ));

    if config.ca_cert_path.is_some()
        || config.client_cert_path.is_some()
        || config.client_key_path.is_some()
    {
        options.set_transport(build_transport(config)?);
    }

    let (client, mut eventloop) = AsyncClient::new(options, INGESTION_CAPACITY);
    client
        .subscribe(config.topic_filter(), config.qos)
        .await
        .map_err(|e| e.to_string())?;
    info!(filter = %config.topic_filter(), "subscribed");

    loop {
        let event = tokio::select! {
            _ = cancel.cancelled() => return Ok(()),
            result = eventloop.poll() => result.map_err(|e| e.to_string())?,
        };
        match event {
            Event::Incoming(Packet::ConnAck(_)) => info!("MQTT connected"),
            Event::Incoming(Packet::Publish(publish)) => {
                let inbound = InboundTelemetry {
                    topic: publish.topic,
                    payload: publish.payload.to_vec(),
                };
                tokio::select! {
                    _ = cancel.cancelled() => return Ok(()),
                    res = sender.send(inbound) => {
                        if res.is_err() {
                            return Err("telemetry processor stopped".into());
                        }
                    }
                }
            }
            _ => {}
        }
    }
}

fn build_transport(config: &GatewayConfig) -> Result<Transport, String> {
    let url =
        Url::parse(&config.broker_url).map_err(|e| format!("invalid MQTT broker URL: {e}"))?;

    let ca = config
        .ca_cert_path
        .as_ref()
        .map(std::fs::read)
        .transpose()
        .map_err(|e| format!("failed to read MQTT CA certificate: {e}"))?
        .unwrap_or_default();

    let client_auth = match (&config.client_cert_path, &config.client_key_path) {
        (Some(cert), Some(key)) => Some((
            std::fs::read(cert)
                .map_err(|e| format!("failed to read MQTT client certificate: {e}"))?,
            std::fs::read(key).map_err(|e| format!("failed to read MQTT client key: {e}"))?,
        )),
        (None, None) => None,
        _ => {
            return Err(
                "MQTT_CLIENT_CERT_PATH and MQTT_CLIENT_KEY_PATH must be configured together".into(),
            );
        }
    };

    Ok(match url.scheme() {
        "mqtt" => Transport::Tcp,
        "mqtts" | "ssl" => Transport::tls(ca, client_auth, None),
        "ws" => Transport::Ws,
        "wss" => Transport::wss(ca, client_auth, None),
        other => return Err(format!("unsupported MQTT URL scheme: {other}")),
    })
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

fn with_client_id(broker_url: &str, client_id: &str) -> Result<String, String> {
    let mut url = Url::parse(broker_url).map_err(|e| format!("invalid MQTT broker URL: {e}"))?;

    // Drop any pre-existing client_id before appending ours.
    let preserved: Vec<(String, String)> = url
        .query_pairs()
        .filter(|(k, _)| k != "client_id")
        .map(|(k, v)| (k.into_owned(), v.into_owned()))
        .collect();
    url.set_query(None);
    {
        let mut qp = url.query_pairs_mut();
        for (k, v) in preserved {
            qp.append_pair(&k, &v);
        }
        qp.append_pair("client_id", client_id);
    }
    Ok(url.into())
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    fn make_event(id: Option<&str>, device: &str, seq: Option<u64>) -> TelemetryEvent {
        TelemetryEvent {
            schema_version: Some(1),
            event_id: id.map(str::to_string),
            experiment_id: 1,
            device_id: Some(device.to_string()),
            timestamp: "2026-09-02T00:00:00Z".into(),
            sequence: seq,
            measurements: [("temperature_c".into(), 20.0)].into(),
            quality: Some("good".into()),
            source_topic: None,
        }
    }

    #[test]
    fn client_id_is_added_and_replaced() {
        assert_eq!(
            with_client_id("mqtt://broker:1883", "daq gateway").unwrap(),
            "mqtt://broker:1883?client_id=daq+gateway"
        );
        assert_eq!(
            with_client_id("mqtt://broker:1883?foo=bar", "daq").unwrap(),
            "mqtt://broker:1883?foo=bar&client_id=daq"
        );
        // Pre-existing client_id is replaced, not duplicated.
        assert_eq!(
            with_client_id("mqtt://broker:1883?client_id=old", "new").unwrap(),
            "mqtt://broker:1883?client_id=new"
        );
    }

    #[test]
    fn parses_telemetry_topic() {
        let ctx = TopicContext::parse(
            "daq",
            "daq/lab/thermal-001/telemetry/thermocouple/tc01/temperature",
        )
        .unwrap();
        assert_eq!(ctx.scope, "lab");
        assert_eq!(ctx.device, "thermal-001");
        assert_eq!(ctx.class, MessageClass::Telemetry);
        assert_eq!(ctx.resource.as_deref(), Some("thermocouple"));
        assert_eq!(ctx.channel.as_deref(), Some("tc01"));
        assert_eq!(ctx.metric.as_deref(), Some("temperature"));
    }

    #[test]
    fn parses_event_and_state_topics() {
        let ev = TopicContext::parse("daq", "daq/field/sat-001/event/sensor_fault").unwrap();
        assert_eq!(ev.class, MessageClass::Event);
        assert_eq!(ev.resource.as_deref(), Some("sensor_fault"));

        let st = TopicContext::parse("daq", "daq/lab/thermal-001/state/availability").unwrap();
        assert_eq!(st.class, MessageClass::State);
        assert_eq!(st.resource.as_deref(), Some("availability"));
    }

    #[test]
    fn rejects_malformed_topics() {
        assert!(TopicContext::parse("daq", "other/lab/x/telemetry/a/b/c").is_err());
        assert!(TopicContext::parse("daq", "daq/lab/x").is_err());
        assert!(TopicContext::parse("daq", "daq/lab/x/telemetry/a/b").is_err());
        assert!(TopicContext::parse("daq", "daq/lab/x/event/a/b").is_err());
    }

    #[test]
    fn duplicate_event_ids_are_published_once() {
        let state = GatewayState::new(Duration::from_secs(3600));
        let mut receiver = state.subscribe();
        let ctx = TopicContext::parse(
            "daq",
            "daq/lab/thermal-001/telemetry/thermocouple/tc01/temperature",
        )
        .unwrap();
        let ev = make_event(Some("event-1"), "thermal-001", Some(1));

        state.publish(GatewayEvent {
            context: ctx.clone(),
            event: ev.clone(),
        });
        state.publish(GatewayEvent {
            context: ctx,
            event: ev,
        });

        assert_eq!(
            receiver.try_recv().unwrap().event.event_id.as_deref(),
            Some("event-1")
        );
        assert!(matches!(
            receiver.try_recv(),
            Err(broadcast::error::TryRecvError::Empty)
        ));
    }

    #[test]
    fn sequence_is_used_when_event_id_is_missing() {
        let state = GatewayState::new(Duration::from_secs(3600));
        let mut receiver = state.subscribe();
        let ctx = TopicContext::parse("daq", "daq/lab/thermal-001/state/availability").unwrap();
        let ev = make_event(None, "thermal-001", Some(7));

        state.publish(GatewayEvent {
            context: ctx.clone(),
            event: ev.clone(),
        });
        state.publish(GatewayEvent {
            context: ctx,
            event: ev,
        });

        assert!(receiver.try_recv().is_ok());
        assert!(receiver.try_recv().is_err());
    }

    #[test]
    fn dedup_cache_evicts_oldest_when_full() {
        let mut cache = DeduplicationCache::new(3, Duration::from_secs(3600));
        assert!(cache.insert("a".into()));
        assert!(cache.insert("b".into()));
        assert!(cache.insert("c".into()));
        assert!(cache.insert("d".into())); // evicts "a"
        assert!(cache.insert("a".into())); // a is new again
        assert!(!cache.insert("b".into()));
        assert!(!cache.insert("c".into()));
        assert!(!cache.insert("d".into()));
    }
}
