pub mod auth;
pub mod users;
use actix_web::web::{ServiceConfig, get, post, scope};
use auth_dal::users::descriptors::SqlxPostGresDescriptor;

pub fn views_factory(cfg: &mut ServiceConfig) {
    cfg.service(
        scope("/api/v1/auth")
            .route(
                "/login",
                get().to(auth::login::login::<SqlxPostGresDescriptor>),
            )
            .route(
                "/create",
                post().to(users::create::create::<SqlxPostGresDescriptor>),
            ),
    );
}
