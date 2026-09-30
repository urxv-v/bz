use actix_web::{App, HttpServer};

mod api;
mod extract_auth;
use auth_dal::migrations::run_migrations;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    run_migrations().await.map_err(|e| {
        std::io::Error::new(
            std::io::ErrorKind::Other,
            format!("auth migration failed: {}", e),
        )
    })?;
    HttpServer::new(|| App::new().configure(api::views_factory))
        .workers(4)
        .bind("0.0.0.0:8081")?
        .run()
        .await
}
