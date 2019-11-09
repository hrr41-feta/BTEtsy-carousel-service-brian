
DROP TABLE IF EXISTS products;

CREATE TABLE products(
id SERIAL PRIMARY KEY,
product_item text,
liked boolean default false,
pictures text
);