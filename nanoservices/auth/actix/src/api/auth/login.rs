use crate::extract_auth::extract_credentials;
use actix_web::HttpRequest;
use actix_web::HttpResponse;
use auth_core::api::auth::login::login as core_login;
use auth_dal::users::transactions::get::GetByEmail;
use glue::errors::NanoServiceError;
use serde::Serialize;

#[derive(Serialize)]
struct LoginResponse {
    token: String,
}

pub async fn login<T: GetByEmail>(req: HttpRequest) -> Result<HttpResponse, NanoServiceError> {
    let credentials = extract_credentials(req).await?;
    let token = core_login::<T>(credentials.email, credentials.password).await?;
    Ok(HttpResponse::Ok().json(LoginResponse { token }))
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{
        http::StatusCode,
        test::{self, TestRequest},
    };
    use auth_dal::users::schema::{NewUser, User};
    use auth_dal::users::transactions::get::GetByEmail;
    use base64::{Engine, engine::general_purpose};
    use glue::errors::NanoServiceErrorStatus;
    use std::future::Future;

    struct FakeUserDescriptor;

    impl GetByEmail for FakeUserDescriptor {
        fn get_by_email(
            email: String,
        ) -> impl Future<Output = Result<User, NanoServiceError>> + Send {
            async move {
                let account =
                    NewUser::new("alice@example.com".to_string(), "password123".to_string())
                        .unwrap();

                if email == account.email {
                    Ok(User {
                        id: 1,
                        email: account.email,
                        password: account.password,
                        unique_id: account.unique_id,
                    })
                } else {
                    Err(NanoServiceError::new(
                        "User not found".to_string(),
                        NanoServiceErrorStatus::NotFound,
                    ))
                }
            }
        }
    }

    #[tokio::test]
    async fn login_returns_token_for_valid_basic_credentials() {
        let credentials = general_purpose::STANDARD.encode("alice@example.com:password123");
        let req = TestRequest::default()
            .insert_header(("Authorization", format!("Basic {}", credentials)))
            .to_http_request();

        let response = login::<FakeUserDescriptor>(req).await.unwrap();
        let status = response.status();
        let body: LoginResponse = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::OK);
        assert!(!body.token.is_empty());
    }

    #[tokio::test]
    async fn login_rejects_missing_authorization_header() {
        let req = TestRequest::default().to_http_request();
        let err = login::<FakeUserDescriptor>(req)
            .await
            .expect_err("missing auth is rejected");

        assert_eq!(err.status, NanoServiceErrorStatus::Unauthorized);
    }

    #[tokio::test]
    async fn login_rejects_invalid_password() {
        let credentials = general_purpose::STANDARD.encode("alice@example.com:incorrect-pass");
        let req = TestRequest::default()
            .insert_header(("Authorization", format!("Basic {}", credentials)))
            .to_http_request();

        let err = login::<FakeUserDescriptor>(req)
            .await
            .expect_err("wrong password is rejected");

        assert_eq!(err.status, NanoServiceErrorStatus::Unauthorized);
    }
}
