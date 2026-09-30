use glue::errors::NanoServiceError;

use dal::experiments::schema::{NewExperimentItem, ExperimentItem};
use dal::experiments::transactions::create::SaveExperiment;

pub async fn create<T: SaveExperiment>(item: NewExperimentItem)
    -> Result<ExperimentItem, NanoServiceError> {
    let created_item = T::save_experiment(item).await?;
    Ok(created_item)
}
