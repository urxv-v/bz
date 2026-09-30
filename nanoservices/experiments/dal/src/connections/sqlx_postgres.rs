use sqlx::postgres::{PgPool,PgPoolOptions};
use once_cell::sync::Lazy;
use std::env;
      
pub static SQLX_POSTGRES_POOL: Lazy<PgPool> = Lazy::new(|| {
    let connection_string = env::var("DATABASE_URL").expect("Missing database URL"); 
    let max_connections = 
        match std::env::var( "EXPERIMENTS_POOL_SIZE") {
        Ok(val) => val,
        Err(_) => "5".to_string()  
    }.trim().parse::<u32>().map_err(|_e|{
        "Could not parse max connections".to_string()
    }).unwrap();
    let pool = PgPoolOptions::new()
            .max_connections(max_connections);
    pool.connect_lazy(&connection_string)
        .expect("Failed to create pool") 
});

