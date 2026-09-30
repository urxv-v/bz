use actix_web::{
    web::Json,
    HttpResponse
};
use coremod::api::basic_actions::{
    create::create as create_core,
    read::get_experiments as get_experiments_core
};
use dal::experiments::{
    transactions::{
        create::SaveExperiment,
        device::RegisterFieldDaq,
        read::GetExperiments,
    },
    schema::NewExperimentItem
};
use glue::errors::NanoServiceError;

pub async fn create<T: SaveExperiment + GetExperiments + RegisterFieldDaq>(
    //token: HeaderToken,   
    body: Json<NewExperimentItem>
) -> Result<HttpResponse, NanoServiceError> {

    let item = body.into_inner();
    let field_daq = item.field_daq.clone();
    let created = create_core::<T>(item).await?;
    if let Some(setup) = field_daq {
        T::register_field_daq(created, setup).await?;
    }
    Ok(HttpResponse::Created().json(get_experiments_core::<T>().await?))
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{
        http::StatusCode,
        test,
        web::Json,
    };
    use dal::experiments::{
        enums::TaskStatus,
        schema::{AllExperiments, ExperimentItem, NewExperimentItem},
        transactions::{
            create::SaveExperiment,
            device::RegisterFieldDaq,
            read::GetExperiments,
        },
    };
    use std::{collections::HashMap, future::Future, sync::{Mutex, OnceLock}};

    static STORE: OnceLock<Mutex<HashMap<String, ExperimentItem>>> = OnceLock::new();

    fn reset_store() {
        let mut store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
        store.clear();
        store.insert(
            "Rankine".to_string(),
            ExperimentItem {
                id: 1,
                name: "Rankine".to_string(),
                status: "done".to_string(),
            },
        );
        store.insert(
            "Hvac".to_string(),
            ExperimentItem {
                id: 2,
                name: "Hvac".to_string(),
                status: "pending".to_string(),
            },
        );
    }

    struct FakeExperimentDescriptor;

    impl SaveExperiment for FakeExperimentDescriptor {
        fn save_experiment(
            item: NewExperimentItem,
        ) -> impl Future<Output = Result<ExperimentItem, NanoServiceError>> + Send {
            async move {
                let mut store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
                let next_id = store.values().map(|entry| entry.id).max().unwrap_or(0) + 1;
                let experiment = ExperimentItem {
                    id: next_id,
                    name: item.name.clone(),
                    status: item.status.to_string(),
                };
                store.insert(item.name.clone(), experiment.clone());
                Ok(experiment)
            }
        }
    }

    impl GetExperiments for FakeExperimentDescriptor {
        fn get_experiments() -> impl Future<Output = Result<Vec<ExperimentItem>, NanoServiceError>> + Send {
            async move {
                let store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
                Ok(store.values().cloned().collect())
            }
        }
    }

    impl RegisterFieldDaq for FakeExperimentDescriptor {
        fn register_field_daq(
            _experiment: ExperimentItem,
            _setup: dal::telemetry::schema::FieldDaqSetup,
        ) -> impl Future<Output = Result<dal::telemetry::schema::Device, NanoServiceError>> + Send {
            async move {
                Ok(dal::telemetry::schema::Device {
                    id: 1,
                    device_id: "test-daq".to_string(),
                    name: "Test DAQ".to_string(),
                    protocol: "mqtt".to_string(),
                    connector: dal::telemetry::schema::ConnectorConfig::Mqtt { topic: "daq/test/telemetry".to_string(), qos: 1 },
                    enabled: true,
                })
            }
        }
    }

    #[tokio::test]
    async fn create_experiment_returns_updated_collection() {
        reset_store();

        let response = create::<FakeExperimentDescriptor>(Json(NewExperimentItem {
            name: "Alpha".to_string(),
            status: TaskStatus::PENDING,
            field_daq: None,
        }))
        .await
        .unwrap();

        let status = response.status();
        let body: AllExperiments = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::CREATED);
        assert!(body.experiments.contains_key("Alpha"));
    }
}
