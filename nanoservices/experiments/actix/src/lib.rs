pub mod api;
pub mod gateway;
pub use api::{
    views_factory,
    basic_actions::{
        create,
        read,
        update,
        delete
    }
};

