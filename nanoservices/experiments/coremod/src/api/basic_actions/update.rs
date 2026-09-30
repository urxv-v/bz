use dal::experiments::schema::ExperimentItem;
use glue::errors::NanoServiceError;
use dal::experiments::transactions::update::UpdateExperiment;

pub async fn update<T: UpdateExperiment>(item: ExperimentItem)
    -> Result<(), NanoServiceError> {
    let _ = T::update_experiment(item).await?;
    Ok(())
}
