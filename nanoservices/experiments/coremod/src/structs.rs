use crate::enums::TaskStatus;
use ::std::collections::HashMap;
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Experiment {
    pub name: String,
    pub status: TaskStatus,
}

impl fmt::Display for Experiment {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self.status {
            TaskStatus::PENDING => write!(f, "Pending: {}", self.name),
            TaskStatus::DONE => write!(f, "Done: {}", self.name),
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AllExperiments {
    pub pending: Vec<Experiment>,
    pub done: Vec<Experiment>,
}

impl AllExperiments {
    pub fn from_hashmap(all_items: HashMap<String, Experiment>) -> AllExperiments {
        let mut pending = Vec::new();
        let mut done = Vec::new();
        for (_, item) in all_items {
            match item.status {
                TaskStatus::PENDING => pending.push(item),
                TaskStatus::DONE => done.push(item),
            }
        }
        AllExperiments { pending, done }
    }
}
