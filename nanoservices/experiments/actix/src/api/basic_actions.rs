use actix_web::web::{ServiceConfig, delete, get, post, put};
use dal::experiments::descriptors::SqlxPostGresDescriptor;

pub mod create;
pub mod delete;
pub mod read;
pub mod update;

pub fn configure_experiments_routes(cfg: &mut ServiceConfig) {
    cfg.route(
        "/get/all",
        get().to(read::get_experiments::<SqlxPostGresDescriptor>),
    )
    .route(
        "/get/{name}",
        get().to(read::get_experiment_by_name::<SqlxPostGresDescriptor>),
    )
    .route(
        "/create",
        post().to(create::create::<SqlxPostGresDescriptor>),
    )
    .route(
        "/delete/{name}",
        delete().to(delete::delete_by_name::<SqlxPostGresDescriptor>),
    )
    .route(
        "/update",
        put().to(update::update::<SqlxPostGresDescriptor>),
    );
}
