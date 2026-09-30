use auth_actix_server::views_factory as auth_views_factory;
use auth_dal::migrations::run_migrations as run_auth_migrations;

use actix_cors::Cors;
use rust_embed::RustEmbed;
use std::path::Path;

use actix_web::{
    App, HttpRequest, HttpResponse, HttpServer, Responder, http::header::HeaderName, web,
};
use futures_util::{SinkExt, StreamExt};
use tokio_tungstenite::tungstenite::{client::IntoClientRequest, http::HeaderValue};

async fn proxy_experiment_websocket(
    req: HttpRequest,
    payload: web::Payload,
    experiment_id: web::Path<String>,
) -> Result<HttpResponse, actix_web::Error> {
    let (response, mut session, mut messages) = actix_ws::handle(&req, payload)?;
    let base_url = std::env::var("EXPERIMENTS_SERVICE_URL")
        .unwrap_or_else(|_| "http://127.0.0.1:8080".to_string());

    let base_trimmed = base_url.trim_end_matches('/');
    let mut upstream_url = format!("{base_trimmed}/api/v1/experiments/{experiment_id}/stream")
        .replace("http://", "ws://")
        .replace("https://", "wss://");

    if let Some(query) = req.uri().query() {
        upstream_url = format!("{upstream_url}?{query}");
    }

    let token_header = req
        .headers()
        .get("token")
        .and_then(|value| value.to_str().ok())
        .and_then(|value| HeaderValue::from_str(value).ok());

    actix_web::rt::spawn(async move {
        let mut upstream_request = match upstream_url.into_client_request() {
            Ok(request) => request,
            Err(_) => {
                let _ = session
                    .close(Some(actix_ws::CloseReason {
                        code: actix_ws::CloseCode::Error,
                        description: Some("invalid experiments service URL".into()),
                    }))
                    .await;
                return;
            }
        };

        if let Some(token) = token_header {
            upstream_request.headers_mut().insert("token", token);
        }

        let Ok((upstream, _)) = tokio_tungstenite::connect_async(upstream_request).await else {
            let _ = session
                .close(Some(actix_ws::CloseReason {
                    code: actix_ws::CloseCode::Error,
                    description: Some("experiments service unavailable".into()),
                }))
                .await;
            return;
        };

        let (mut upstream_sink, mut upstream_stream) = upstream.split();

        loop {
            tokio::select! {
                Some(Ok(message)) = messages.next() => {
                    match message {
                        actix_ws::Message::Text(text) => {
                            let _ = upstream_sink.send(tokio_tungstenite::tungstenite::Message::Text(text.to_string().into())).await;
                        }
                        actix_ws::Message::Binary(bytes) => {
                            let _ = upstream_sink.send(tokio_tungstenite::tungstenite::Message::Binary(bytes.to_vec().into())).await;
                        }
                        actix_ws::Message::Ping(bytes) => {
                            let _ = upstream_sink.send(tokio_tungstenite::tungstenite::Message::Ping(bytes.to_vec().into())).await;
                        }
                        actix_ws::Message::Pong(bytes) => {
                            let _ = upstream_sink.send(tokio_tungstenite::tungstenite::Message::Pong(bytes.to_vec().into())).await;
                        }
                        actix_ws::Message::Close(reason) => {
                            let _ = upstream_sink.send(tokio_tungstenite::tungstenite::Message::Close(reason.map(|reason| {
                                tokio_tungstenite::tungstenite::protocol::frame::CloseFrame {
                                    code: u16::from(reason.code).into(),
                                    reason: reason.description.unwrap_or_default().into()
                                }
                            }))).await;
                            break;
                        }
                        actix_ws::Message::Continuation(_) | actix_ws::Message::Nop => {}
                    }
                }
                Some(Ok(message)) = upstream_stream.next() => {
                    match message {
                        tokio_tungstenite::tungstenite::Message::Text(text) => {
                            let _ = session.text(text).await;
                        }
                        tokio_tungstenite::tungstenite::Message::Binary(bytes) => {
                            let _ = session.binary(bytes).await;
                        }
                        tokio_tungstenite::tungstenite::Message::Ping(bytes) => {
                            let _ = session.ping(&bytes).await;
                        }
                        tokio_tungstenite::tungstenite::Message::Pong(_) => {}
                        tokio_tungstenite::tungstenite::Message::Close(_) => {
                            let _ = session.close(None).await;
                            break;
                        }
                        tokio_tungstenite::tungstenite::Message::Frame(_) => {}
                    }
                }
                else => break,
            }
        }
    });

    Ok(response)
}

async fn proxy_experiment_request(
    req: HttpRequest,
    body: web::Bytes,
    tail: web::Path<String>,
) -> Result<HttpResponse, actix_web::Error> {
    let base_url = std::env::var("EXPERIMENTS_SERVICE_URL")
        .unwrap_or_else(|_| "http://127.0.0.1:8080".to_string());
    let target = format!(
        "{}/api/v1/experiments/{}",
        base_url.trim_end_matches('/'),
        tail
    );
    let client = reqwest::Client::new();
    let method = reqwest::Method::from_bytes(req.method().as_str().as_bytes())
        .map_err(actix_web::error::ErrorInternalServerError)?;
    let mut builder = client.request(method, target).body(body);

    for (name, value) in req.headers() {
        if *name != HeaderName::from_static("host") {
            if let Ok(value) = value.to_str() {
                builder = builder.header(name.as_str(), value);
            }
        }
    }

    let response = builder.send().await.map_err(|error| {
        actix_web::error::ErrorBadGateway(format!("experiments service unavailable: {error}"))
    })?;
    let status = actix_web::http::StatusCode::from_u16(response.status().as_u16())
        .map_err(actix_web::error::ErrorInternalServerError)?;
    let headers = response.headers().clone();
    let payload = response.bytes().await.map_err(|error| {
        actix_web::error::ErrorBadGateway(format!("failed to read experiments response: {error}"))
    })?;
    let mut output = HttpResponse::build(status);
    for (name, value) in &headers {
        if *name != reqwest::header::CONTENT_LENGTH {
            output.append_header((name.as_str(), value.as_bytes()));
        }
    }
    Ok(output.body(payload))
}

async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../index.html"))
}

#[derive(RustEmbed)]
#[folder = "./frontend/public"]
struct FrontendAssets;

fn serve_frontend_asset(path: String) -> HttpResponse {
    let file = match Path::new(&path).file_name() {
        Some(file) => file.to_str().unwrap(),
        None => return HttpResponse::BadRequest().body("404 Not Found"),
    };

    match FrontendAssets::get(file) {
        Some(content) => HttpResponse::Ok()
            .content_type(
                mime_guess::from_path(&file)
                    .first_or_octet_stream()
                    .as_ref(),
            )
            .append_header(("Cache-Control", "public, max-age=604800"))
            .body(content.data),
        None => HttpResponse::NotFound().body("404 Not Found"),
    }
}

async fn catch_all(req: HttpRequest) -> impl Responder {
    let file_type = match mime_guess::from_path(&req.path()).first_raw() {
        Some(file_type) => file_type,
        None => "text/html",
    };

    if !file_type.contains("text/html") {
        return serve_frontend_asset(req.path().to_string());
    }
    if req.path().contains("/api/") {
        return HttpResponse::NotFound().finish();
    }
    if req.path().contains("frontend/public") {
        return serve_frontend_asset(req.path().to_string());
    } else {
        index().await
    }
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv::from_filename(".env.postgres").ok();

    run_auth_migrations()
        .await
        .map_err(|error| std::io::Error::other(format!("auth migration failed: {error}")))?;

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
        App::new()
            .configure(auth_views_factory)
            .service(
                web::scope("/api/v1/experiments")
                    .route("", web::to(proxy_experiment_request))
                    .route(
                        "/{experiment_id}/stream",
                        web::get().to(proxy_experiment_websocket),
                    )
                    .route("/{tail:.*}", web::to(proxy_experiment_request)),
            )
            .wrap(cors)
            .default_service(web::route().to(catch_all))
    })
    .bind("0.0.0.0:8001")?
    .run()
    .await
}
