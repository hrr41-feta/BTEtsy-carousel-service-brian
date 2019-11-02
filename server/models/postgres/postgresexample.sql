CREATE TABLE product(
id SERIAL PRIMARY KEY,
product_item text,
liked boolean default false
);

CREATE TABLE picture(
id SERIAL PRIMARY KEY,
product_id integer,
image text
);

