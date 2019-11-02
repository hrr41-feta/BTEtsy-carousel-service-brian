CREATE DATABASE btetsy;

\c btetsy

CREATE TABLE product(
id SERIAL PRIMARY KEY,
productItem text,
liked boolean default false,
);

CREATE TABLE picture(
id SERIAL PRIMARY KEY,
product_id integer,
image text
);

