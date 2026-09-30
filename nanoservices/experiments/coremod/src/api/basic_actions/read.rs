use dal::experiments::schema::{AllExperiments, ExperimentItem};
use dal::experiments::transactions::read::{GetExperiments,GetExperimentByName};
use glue::errors::NanoServiceError;

pub async fn get_experiments<T: GetExperiments>() -> Result<AllExperiments, NanoServiceError> {
    let all_experiments = T::get_experiments().await?;
    Ok(AllExperiments::from_vec(all_experiments))  
}

pub async fn get_experiment_by_name<T: GetExperimentByName>(name: &str) -> Result<ExperimentItem, NanoServiceError> {
    let item = T::get_experiment_by_name(name).await?;
    Ok(item)
}
