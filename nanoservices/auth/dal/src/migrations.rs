use crate::connections::sqlx_postgres::SQLX_POSTGRES_POOL;
use sqlx::migrate::MigrateError;

pub async fn run_migrations() -> Result<(), MigrateError> {
    println!("Migrating Auth database (sqlx migrator)...");
    let mut migrations = sqlx::migrate!("./migrations/");
    migrations.ignore_missing = true;
    migrations.run(&*SQLX_POSTGRES_POOL).await?; 
    println!("Auth database migrations completed.");
    Ok(())
}