pub mod login;
use actix_web::web::{ServiceConfig, get};
use auth_dal::users::descriptors::SqlxPostGresDescriptor;

pub fn auth_factory(app: &mut ServiceConfig) {
    app.route(
        "/auth/login",
        get().to(login::login::<SqlxPostGresDescriptor>),
    );
}
