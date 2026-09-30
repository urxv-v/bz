use crate::experiments::schema::ExperimentItem;
use crate::telemetry::schema::{Device, FieldDaqSetup};
use glue::errors::{NanoServiceError, NanoServiceErrorStatus};
use std::future::Future;

pub trait RegisterFieldDaq {
    fn register_field_daq(
        experiment: ExperimentItem,
        setup: FieldDaqSetup,
    ) -> impl Future<Output = Result<Device, NanoServiceError>> + Send;
}

#[cfg(feature = "sqlx-postgres")]
impl RegisterFieldDaq for super::super::descriptors::SqlxPostGresDescriptor {
    fn register_field_daq(
        experiment: ExperimentItem,
        setup: FieldDaqSetup,
    ) -> impl Future<Output = Result<Device, NanoServiceError>> + Send {
        async move {
            let connector = serde_json::to_value(&setup.device.connector).map_err(|error| {
                NanoServiceError::new(error.to_string(), NanoServiceErrorStatus::BadRequest)
            })?;
            let device = sqlx::query_as::<_, DeviceRow>(
                "INSERT INTO devices (device_id, name, protocol, connector_config)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (device_id) DO UPDATE SET name = EXCLUDED.name,
                   protocol = EXCLUDED.protocol, connector_config = EXCLUDED.connector_config,
                   updated_at = NOW()
                 RETURNING id, device_id, name, protocol, connector_config, enabled"
            )
            .bind(&setup.device.device_id)
            .bind(&setup.device.name)
            .bind(&setup.device.protocol)
            .bind(connector)
            .fetch_one(&*crate::connections::sqlx_postgres::SQLX_POSTGRES_POOL)
            .await
            .map_err(|error| NanoServiceError::new(error.to_string(), NanoServiceErrorStatus::Unknown))?;

            sqlx::query(
                "INSERT INTO experiment_daq_devices (experiment_id, device_id)
                 VALUES ($1, $2) ON CONFLICT DO NOTHING"
            )
            .bind(experiment.id)
            .bind(device.id)
            .execute(&*crate::connections::sqlx_postgres::SQLX_POSTGRES_POOL)
            .await
            .map_err(|error| NanoServiceError::new(error.to_string(), NanoServiceErrorStatus::Unknown))?;

            Ok(Device {
                id: device.id,
                device_id: device.device_id,
                name: device.name,
                protocol: device.protocol,
                connector: serde_json::from_value(device.connector_config).map_err(|error| {
                    NanoServiceError::new(error.to_string(), NanoServiceErrorStatus::Unknown)
                })?,
                enabled: device.enabled,
            })
        }
    }
}

#[cfg(feature = "sqlx-postgres")]
#[derive(sqlx::FromRow)]
struct DeviceRow {
    id: i64,
    device_id: String,
    name: String,
    protocol: String,
    connector_config: serde_json::Value,
    enabled: bool,
}