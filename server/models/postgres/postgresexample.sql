DROP TABLE IF EXISTS products;

CREATE TABLE products(
id SERIAL PRIMARY KEY,
product_item text,
liked boolean default false
);

DROP TABLE IF EXISTS product_images;

CREATE TABLE product_images(
  product_id int,
  image_url text
);

CREATE INDEX product_id_index on product_images (product_id);
