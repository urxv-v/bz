use super::{GatewayEvent, GatewayState};
use actix_runtime::{Actor, ActorContext, AsyncContext, StreamHandler};
use actix_web::{Error, HttpRequest, HttpResponse, web};
use actix_web_actors::ws;
use glue::token::HeaderToken;
use serde::Deserialize;
use std::time::Duration;

#[derive(Deserialize)]
pub struct StreamQuery {
    access_token: Option<String>,
}

pub async fn stream(
    req: HttpRequest,
    payload: web::Payload,
    experiment_id: web::Path<i32>,
    query: web::Query<StreamQuery>,
    state: web::Data<GatewayState>,
) -> Result<HttpResponse, Error> {
    let token = req
        .headers()
        .get("token")
        .and_then(|value| value.to_str().ok())
        .map(str::to_owned)
        .or_else(|| query.access_token.clone())
        .ok_or_else(|| actix_web::error::ErrorUnauthorized("telemetry token required"))?;
    HeaderToken::decode(&token)
        .map_err(|_| actix_web::error::ErrorUnauthorized("invalid telemetry token"))?;
    let actor = TelemetryWebSocket {
        experiment_id: experiment_id.into_inner(),
        receiver: state.subscribe(),
    };
    ws::start(actor, &req, payload)
}

struct TelemetryWebSocket {
    experiment_id: i32,
    receiver: tokio::sync::broadcast::Receiver<GatewayEvent>,
}

impl Actor for TelemetryWebSocket {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        ctx.text(
            serde_json::json!({
                "type": "connected",
                "experiment_id": self.experiment_id,
            })
            .to_string(),
        );
        ctx.run_interval(Duration::from_millis(100), |actor, ctx| {
            loop {
                match actor.receiver.try_recv() {
                    Ok(event) if event.event.experiment_id == actor.experiment_id => {
                        if let Ok(payload) = serde_json::to_string(&event.event) {
                            ctx.text(payload);
                        }
                    }
                    Ok(_) => {}
                    Err(tokio::sync::broadcast::error::TryRecvError::Empty) => break,
                    Err(tokio::sync::broadcast::error::TryRecvError::Lagged(skipped)) => {
                        ctx.text(
                            serde_json::json!({
                                "type": "gap",
                                "skipped": skipped,
                            })
                            .to_string(),
                        );
                        break;
                    }
                    Err(tokio::sync::broadcast::error::TryRecvError::Closed) => {
                        ctx.close(Some(ws::CloseReason {
                            code: ws::CloseCode::Error,
                            description: Some("telemetry gateway stopped".into()),
                        }));
                        ctx.stop();
                        break;
                    }
                }
            }
        });
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for TelemetryWebSocket {
    fn handle(&mut self, message: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match message {
            Ok(ws::Message::Ping(bytes)) => ctx.pong(&bytes),
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            Ok(ws::Message::Text(_)) | Ok(ws::Message::Binary(_)) | Ok(ws::Message::Pong(_)) => {}
            Ok(ws::Message::Continuation(_)) | Ok(ws::Message::Nop) => {}
            Err(_) => ctx.stop(),
        }
    }
}
