use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Measurement {
    pub name: String,
    pub value: f64,
    pub unit: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TelemetryEvent {
    pub schema_version: Option<i16>,
    pub event_id: Option<String>,
    pub experiment_id: i32,
    pub device_id: Option<String>,
    pub timestamp: String,
    pub sequence: Option<i64>,
    pub measurements: HashMap<String, f64>,
    pub quality: Option<String>,
    pub source_topic: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Device {
    pub id: i64,
    pub device_id: String,
    pub name: String,
    pub protocol: String,
    pub connector: ConnectorConfig,
    pub enabled: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct NewDevice {
    pub device_id: String,
    pub name: String,
    pub protocol: String,
    pub connector: ConnectorConfig,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct DaqDeviceAssignment {
    pub experiment_id: i32,
    pub device_id: i64,
    pub assigned_at: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum ConnectorConfig {
    Mqtt {
        topic: String,
        qos: u8,
    },
    MqttWebSocket {
        topic: String,
        qos: u8,
    },
    Rest {
        endpoint: String,
    },
    Custom {
        settings: HashMap<String, String>,
    },
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct FieldDaqSetup {
    pub device: NewDevice,
}