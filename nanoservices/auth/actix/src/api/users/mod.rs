pub mod create;
use auth_dal::users::descriptors::SqlxPostGresDescriptor;
use actix_web::web::{ServiceConfig, post};

pub fn users_factory(app: &mut ServiceConfig) {
    app.route("/users/create", post().to(create::create::<SqlxPostGresDescriptor>));
}
