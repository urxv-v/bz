-- Add migration script here
CREATE TABLE experiments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(7) NOT NULL
);


INSERT INTO experiments (name, status) VALUES ('Rankine', 'done');
INSERT INTO experiments (name, status) VALUES ('Hvac', 'pending');
INSERT INTO experiments (name, status) VALUES ('Hvac2', 'pending');
INSERT INTO experiments (name, status) VALUES ('Clinton', 'done');
