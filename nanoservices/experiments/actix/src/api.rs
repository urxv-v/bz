use crate::gateway;
use actix_web::web::{ServiceConfig, get, scope};

pub mod basic_actions;

pub fn views_factory(app: &mut ServiceConfig) {
    app.service(
        scope("/api/v1").service(
            scope("/experiments")
                .configure(basic_actions::configure_experiments_routes)
                .route(
                    "/{experiment_id}/stream",
                    get().to(gateway::websocket::stream),
                ),
        ),
    );
}
