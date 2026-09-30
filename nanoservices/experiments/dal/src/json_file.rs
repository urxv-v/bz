use glue::{
    safe_eject,
    errors::{NanoServiceError, NanoServiceErrorStatus},
};
use serde::{de::DeserializeOwned, Serialize};
use std::collections::HashMap;
use std::env;
use std::fs::{File, OpenOptions};
use std::io::{Read, Write};

const DEFAULT_JSON_PATH: &str = "./experiments.json";

fn json_file_path() -> String {
    env::var("JSON_STORE_PATH").unwrap_or_else(|_| DEFAULT_JSON_PATH.to_string())
}

fn open_json_file_read_write() -> Result<File, NanoServiceError> {
    let file_path = get_json_path();
    let file = safe_eject!(
        OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .open(&file_path),
        NanoServiceErrorStatus::Unknown,
        "Error reading JSON file"
    )?;
    Ok(file)
}

fn open_json_file_write_truncate() -> Result<File, NanoServiceError> {
    let file_path = get_json_path();
    let file = safe_eject!(
        OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .open(&file_path),
        NanoServiceErrorStatus::Unknown,
        "Error reading JSON file (write handle)"
    )?;
    Ok(file)
}

pub fn save_experiment<T>(id: &str, experiment: &T) -> Result<(), NanoServiceError>
where
    T: Serialize + DeserializeOwned + Clone,
{
    let mut experiments = get_experiments::<T>().unwrap_or_else(|_| HashMap::new());
    experiments.insert(id.to_string(), experiment.clone());
    save_experiments(&experiments)
}

pub fn save_experiments<T: Serialize>( experiments: &HashMap<String, T>) -> Result<(), NanoServiceError> {
    let mut file = open_json_file_write_truncate()?;
    let json = safe_eject!(
        serde_json::to_string_pretty(experiments),
        NanoServiceErrorStatus::Unknown,
        "Error serializing JSON"
    )?;
    safe_eject!(
        file.write_all(json.as_bytes()),
        NanoServiceErrorStatus::Unknown,
        "Error writing JSON file"
    )?;
    Ok(())
}

pub fn get_experiment<T: DeserializeOwned + Clone>(id: &str) -> Result<T, NanoServiceError> {
    let experiments = get_experiments::<T>()?;
    match experiments.get(id) {
        Some(exp) => Ok(exp.clone()),
        None => Err(NanoServiceError::new(
            format!("Experiment with id {} not found", id),
            NanoServiceErrorStatus::NotFound,
        )),
    }
}

pub fn get_experiments<T: DeserializeOwned>() -> Result<HashMap<String, T>, NanoServiceError> {
    let mut file = open_json_file_read_write()?; // previously get_handle
    let mut contents = String::new();

    safe_eject!(
        file.read_to_string(&mut contents),
        NanoServiceErrorStatus::Unknown,
        "Error reading JSON file to get all experiments"
    )?;

    let experiments: HashMap<String, T> = safe_eject!(
        serde_json::from_str(&contents.trim()),
        NanoServiceErrorStatus::Unknown,
        "Error parsing JSON file"
    )?;
    Ok(experiments)
}

pub fn delete_experiment<T>(id: &str) -> Result<(), NanoServiceError>
where
    T: Serialize + DeserializeOwned + Clone + std::fmt::Debug,
{
    let mut experiments = get_experiments::<T>().unwrap_or_default();

    match experiments.remove(id) {
        Some(_) => {
            save_experiments(&experiments)?;
            Ok(())
        }
        None => Err(NanoServiceError::new(
            format!("Experiment with id {} not found", id),
            NanoServiceErrorStatus::NotFound,
        )),
    }
}
