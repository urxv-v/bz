use dal::experiments::transactions::delete::DeleteExperiment;
use glue::errors::NanoServiceError;
pub async fn delete<T: DeleteExperiment>(id: &str)
    -> Result<(), NanoServiceError> {
    let _ = T::delete_experiment(id.to_string()).await?;
    Ok(())
}
