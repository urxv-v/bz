use actix_web::{
    HttpRequest,
    HttpResponse
};
use coremod::api::basic_actions::read::{
    get_experiments as get_experiments_core,
    get_experiment_by_name  as get_experiment_by_name_core
};
use dal::experiments::transactions::read::{
    GetExperiments,
    GetExperimentByName
};
use glue::errors::{
    NanoServiceError,
    NanoServiceErrorStatus
};

pub async fn get_experiments<T: GetExperiments>()
    -> Result<HttpResponse, NanoServiceError> {
    Ok(HttpResponse::Ok().json(get_experiments_core::<T>().await?))
}

pub async fn get_experiment_by_name<T: GetExperimentByName>(req: HttpRequest)
    -> Result<HttpResponse, NanoServiceError> {
    let name = match req.match_info().get("name") {
        Some(name) => name,
        None => {
            return Err(NanoServiceError::new(
                "Name not provided".to_string(),
                NanoServiceErrorStatus::BadRequest,
            ))
        }
    };
    Ok(HttpResponse::Ok().json(get_experiment_by_name_core::<T>(name).await?))
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
        transactions::read::{GetExperimentByName, GetExperiments},
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

    impl GetExperimentByName for FakeExperimentDescriptor {
        fn get_experiment_by_name(
            name: &str,
        ) -> impl Future<Output = Result<ExperimentItem, NanoServiceError>> + Send {
            async move {
                let store = STORE.get_or_init(|| Mutex::new(HashMap::new())).lock().unwrap();
                store
                    .get(name)
                    .cloned()
                    .ok_or_else(|| NanoServiceError::new("Item not found".to_string(), NanoServiceErrorStatus::NotFound))
            }
        }
    }

    #[tokio::test]
    async fn get_experiments_returns_all_experiments() {
        reset_store();

        let response = get_experiments::<FakeExperimentDescriptor>().await.unwrap();
        let status = response.status();
        let body: AllExperiments = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::OK);
        assert!(body.experiments.contains_key("Rankine"));
    }

    #[tokio::test]
    async fn get_experiment_by_name_returns_requested_item() {
        reset_store();

        let req = TestRequest::default()
            .insert_param(("name", "Rankine"))
            .to_http_request();

        let response = get_experiment_by_name::<FakeExperimentDescriptor>(req).await.unwrap();
        let status = response.status();
        let body: ExperimentItem = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::OK);
        assert_eq!(body.name, "Rankine");
    }

    #[tokio::test]
    async fn get_experiment_by_name_requires_name() {
        let req = TestRequest::default().to_http_request();
        let err = get_experiment_by_name::<FakeExperimentDescriptor>(req)
            .await
            .expect_err("missing name is rejected");

        assert_eq!(err.status, NanoServiceErrorStatus::BadRequest);
    }
}
