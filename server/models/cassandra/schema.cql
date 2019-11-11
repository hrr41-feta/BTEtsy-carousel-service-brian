CREATE KEYSPACE btetsy WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE product(
  id int PRIMARY KEY,
  product_item text,
  picture_url set<text>,
  liked Boolean
)

