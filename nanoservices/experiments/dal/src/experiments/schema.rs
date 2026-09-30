use serde::{Serialize, Deserialize};
use super::enums::TaskStatus;
use std::collections::HashMap;
use crate::telemetry::schema::FieldDaqSetup;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewExperimentItem {
    pub name: String,
    pub status: TaskStatus,
    #[serde(default)]
    pub field_daq: Option<FieldDaqSetup>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[cfg_attr(feature = "sqlx-postgres", derive(sqlx::FromRow))]
pub struct ExperimentItem {
    pub id: i32,
    pub name: String,
    pub status: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AllExperiments {
    pub experiments: HashMap<String, ExperimentItem>,
}

impl AllExperiments {
    pub fn new() -> Self {
        Self {
            experiments: HashMap::new(),
        }
    }

    pub fn add_experiment(&mut self, experiment: ExperimentItem) {
        self.experiments.insert(experiment.name.clone(), experiment);
    }

    pub fn get_experiment(&self, name: &str) -> Option<&ExperimentItem> {
        self.experiments.get(name)
    }

    pub fn from_vec(items: Vec<ExperimentItem>) -> Self {
        let experiments = items.into_iter()
            .map(|item| (item.name.clone(), item))
            .collect();
        Self { experiments }
    }
}
