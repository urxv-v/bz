use actix_web::{web, HttpResponse};
use auth_dal::users::transactions::create::SaveOne;
use auth_core::api::users::create as core_create;
use glue::errors::NanoServiceError;

pub async fn create<T: SaveOne>(
    data: web::Json<auth_core::api::users::create::CreateUser>
) -> Result<HttpResponse, NanoServiceError> {
    let user = core_create::create::<T>(data.into_inner()).await?;
    Ok(HttpResponse::Created().json(user))
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http::StatusCode, test};
    use auth_dal::users::schema::{NewUser, User};
    use auth_dal::users::transactions::create::SaveOne;
    use std::future::Future;

    struct FakeUserDescriptor;

    impl SaveOne for FakeUserDescriptor {
        fn save_one(
            user: NewUser,
        ) -> impl Future<Output = Result<User, NanoServiceError>> + Send {
            async move {
                Ok(User {
                    id: 42,
                    email: user.email,
                    password: user.password,
                    unique_id: user.unique_id,
                })
            }
        }
    }

    #[tokio::test]
    async fn create_user_returns_created_user() {
        let payload = auth_core::api::users::create::CreateUser {
            email: "new.user@example.com".to_string(),
            password: "super-secret".to_string(),
        };

        let response = create::<FakeUserDescriptor>(web::Json(payload)).await.unwrap();
        let status = response.status();
        let body: User = test::read_body_json(response).await;

        assert_eq!(status, StatusCode::CREATED);
        assert_eq!(body.email, "new.user@example.com");
        assert!(!body.unique_id.is_empty());
    }
}
