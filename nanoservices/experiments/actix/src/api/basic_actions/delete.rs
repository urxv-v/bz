use actix_web::{
    HttpRequest,
    HttpResponse
};
use coremod::api::basic_actions::{
    delete::delete as delete_core,
    read::get_experiments as get_experiments_core
};
use dal::experiments::transactions::{
    delete::DeleteExperiment,
    read::GetExperiments
};
use glue::errors::{
    NanoServiceError,
    NanoServiceErrorStatus
};

pub async fn delete_by_name<T: DeleteExperiment + GetExperiments>(req: HttpRequest)
    -> Result<HttpResponse, NanoServiceError> {
    match req.match_info().get("name") {
        Some(name) => {
            delete_core::<T>(name).await?;
        },
        None => {
            return Err(
                NanoServiceError::new(
                    "Name not provided".to_string(),
                    NanoServiceErrorStatus::BadRequest
                )
            )
        }
    };
    Ok(HttpResponse::Ok().json(get_experiments_core::<T>().await?))
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{
        http::StatusCode,
        test::{self, TestRequest},
    };
    use dal::experiments::{
        schema::{AllExperiments, ExperimentItem},
        transactions::{
            delete::DeleteExperiment,
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

    impl DeleteExperiment for FakeExperimentDescriptor {
        fn delete_experiment(
            name: String,
        ) -> impl Future<Output = Result<ExperimentItem, NanoServiceError>> + Send {
            async move {
                let mut store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
                let item = store
                    .remove(&name)
                    .ok_or_else(|| NanoServiceError::new("Item not found".to_string(), NanoServiceErrorStatus::NotFound))?;
                Ok(item)
            }
        }
    }

    #[tokio::test]
    async fn delete_experiment_removes_item_and_returns_remaining_collection() {
        reset_store();

        let req = TestRequest::default()
            .insert_param(("name", "Rankine"))
            .to_http_request();

        let response = delete_by_name::<FakeExperimentDescriptor>(req).await.unwrap();
        let status = response.status();
        let body: AllExperiments = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::OK);
        assert!(!body.experiments.contains_key("Rankine"));
    }

    #[tokio::test]
    async fn delete_experiment_requires_name() {
        let req = TestRequest::default().to_http_request();
        let err = delete_by_name::<FakeExperimentDescriptor>(req)
            .await
            .expect_err("missing name is rejected");

        assert_eq!(err.status, NanoServiceErrorStatus::BadRequest);
    }
}
