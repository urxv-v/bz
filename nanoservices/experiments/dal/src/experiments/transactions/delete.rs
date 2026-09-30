use std::future::Future;
use glue::errors::NanoServiceError;
use crate::experiments::schema::ExperimentItem;

#[cfg(feature = "json-file")]
use super::super::descriptors::JsonFileDescriptor;
#[cfg(feature = "json-file")]
use crate::json_file::{get_experiments, save_experiments};
#[cfg(feature = "json-file")]
use std::collections::HashMap;

#[cfg(feature = "sqlx-postgres")]
use crate::connections::sqlx_postgres::SQLX_POSTGRES_POOL;
#[cfg(feature = "sqlx-postgres")]
use super::super::descriptors::SqlxPostGresDescriptor;
#[cfg(any(feature = "json-file", feature = "sqlx-postgres"))]
use glue::errors::NanoServiceErrorStatus;

pub trait DeleteExperiment{
    fn delete_experiment(name: String) -> 
        impl Future<Output = Result<ExperimentItem,NanoServiceError>> + Send;
}

#[cfg(feature = "json-file")]
impl DeleteExperiment for JsonFileDescriptor {
    fn delete_experiment(name: String) ->
    impl Future<Output = Result<ExperimentItem, NanoServiceError>> + Send {
        json_file_delete_experiment(name)
    }
}

#[cfg(feature = "json-file")]
async fn json_file_delete_experiment(name: String) ->
    Result<ExperimentItem, NanoServiceError> {
    let mut experiments = get_experiments::<ExperimentItem>().unwrap_or_else(|_|
        HashMap::new()
    );
    let experiment_item = experiments.remove(
        &name
    ).ok_or_else(|| {
        NanoServiceError::new(
            "Item not found".to_string(),
            NanoServiceErrorStatus::NotFound
        )
    })?;
    let _ = save_all(&experiments)?;
    Ok(experiment_item)
}

#[cfg(feature = "sqlx-postgres")]
impl DeleteExperiment for SqlxPostGresDescriptor {
    fn delete_experiment(name: String) ->
    impl Future<Output = Result<ExperimentItem, NanoServiceError>> + Send {
        sqlx_postgres_delete_experiment(name)
    }
}

#[cfg(feature = "sqlx-postgres")]
async fn sqlx_postgres_delete_experiment(name: String) ->
    Result<ExperimentItem, NanoServiceError> {
    let item = sqlx::query_as::<_, ExperimentItem>("
        DELETE FROM experiments
        WHERE name = $1
        RETURNING *"
    ).bind(name)
    .fetch_one(&*SQLX_POSTGRES_POOL).await.map_err(|e| {
        NanoServiceError::new(
            e.to_string(),
            NanoServiceErrorStatus::Unknown
        )
    })?;
    Ok(item)
}
