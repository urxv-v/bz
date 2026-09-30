use actix_web::{ 
    HttpResponse,
    web::Json
};
use coremod::api::basic_actions::{
    update::update as update_core,
    read::get_experiments as get_experiments_core
};
use dal::experiments::{
    transactions::{ 
        update::UpdateExperiment,
        read::GetExperiments
    },
    schema::ExperimentItem
};
use glue::errors::NanoServiceError;

pub async fn update<T: UpdateExperiment + GetExperiments>(body: Json<ExperimentItem>)
    -> Result<HttpResponse, NanoServiceError> {
    let _ = update_core::<T>(body.into_inner()).await?;
    Ok(HttpResponse::Ok().json(get_experiments_core::<T>().await?))
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http::StatusCode, test, web::Json};
    use dal::experiments::{
        schema::{AllExperiments, ExperimentItem},
        transactions::{
            read::GetExperiments,
            update::UpdateExperiment,
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
    }

    struct FakeExperimentDescriptor;

    impl GetExperiments for FakeExperimentDescriptor {
        fn get_experiments() -> impl Future<Output = Result<Vec<ExperimentItem>, NanoServiceError>> + Send {
            async move {
                let store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
                Ok(store.values().cloned().collect())
            }
        }
    }

    impl UpdateExperiment for FakeExperimentDescriptor {
        fn update_experiment(
            item: ExperimentItem,
        ) -> impl Future<Output = Result<ExperimentItem, NanoServiceError>> + Send {
            async move {
                let mut store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
                if !store.contains_key(&item.name) {
                    return Err(NanoServiceError::new(
                        format!("Item with name {} not found", item.name),
                        NanoServiceErrorStatus::NotFound,
                    ));
                }
                store.insert(item.name.clone(), item.clone());
                Ok(item)
            }
        }
    }

    #[tokio::test]
    async fn update_experiment_returns_updated_collection() {
        reset_store();

        let response = update::<FakeExperimentDescriptor>(Json(ExperimentItem {
            id: 1,
            name: "Rankine".to_string(),
            status: "pending".to_string(),
        }))
        .await
        .unwrap();

        let status = response.status();
        let body: AllExperiments = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::OK);
        assert_eq!(body.experiments.get("Rankine").unwrap().status, "pending");
    }
}
