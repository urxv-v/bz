use thiserror::Error;
use serde::{Serialize, Deserialize};
use std::fmt;

#[cfg(feature = "actix")]
use actix_web::{error::ResponseError, http::StatusCode, HttpResponse};

#[derive(Error, Debug, Serialize, Deserialize, PartialEq)]
pub enum NanoServiceErrorStatus {
    #[error("Requested resource was not found")]
    NotFound,
    #[error("You are forbidden to access requested resource.")]
    Forbidden,
    #[error("Unknown Internal Error")]
    Unknown,
    #[error("Bad Request")]
    BadRequest,
    #[error("Conflict")]
    Conflict,
    #[error("Unauthorized")]
    Unauthorized,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NanoServiceError {
    pub message: String,
    pub status: NanoServiceErrorStatus,
}

impl fmt::Display for NanoServiceError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl NanoServiceError {
    pub fn new(message: String, status: NanoServiceErrorStatus) -> NanoServiceError {
        NanoServiceError { message, status }
    }
}

#[cfg(feature = "actix")]
impl ResponseError for NanoServiceError {
    fn status_code(&self) -> StatusCode {
        match self.status {
            NanoServiceErrorStatus::NotFound => StatusCode::NOT_FOUND,
            NanoServiceErrorStatus::Forbidden => StatusCode::FORBIDDEN,
            NanoServiceErrorStatus::Unknown => StatusCode::INTERNAL_SERVER_ERROR,
            NanoServiceErrorStatus::BadRequest => StatusCode::BAD_REQUEST,
            NanoServiceErrorStatus::Conflict => StatusCode::CONFLICT,
            NanoServiceErrorStatus::Unauthorized => StatusCode::UNAUTHORIZED,
        }
    }

    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code()).json(self)
    }
}

#[macro_export]
macro_rules! safe_eject {
    ($e:expr, $err_status:expr) => {
        $e.map_err(|x| NanoServiceError::new(x.to_string(), $err_status))
    };
    ($e:expr, $err_status:expr, $message_context:expr) => {
        $e.map_err(|x| {
            let msg = format!("{}: {}", $message_context, x);
            NanoServiceError::new(msg, $err_status)
        })
    };
}
