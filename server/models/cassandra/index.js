const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});

client.connect()
  .then(() => console.log('Connected!'));

const insertProduct = (id, productItem, pictureUrls, liked, callback) => {
  const query = "INSERT INTO btetsy.product (id, product_item, picture_url, liked) VALUES (?, ?, ?,  ?)";

  //spread maybe?
  client.execute(query, [id, productItem, pictureUrls, liked], {prepare: true})
    .then(result => console.log("Row updated"))
    .catch(err => console.error(err));
}

const getProductById = (id, callback) => {
  client.execute('SELECT * FROM btetsy.product WHERE id=?', [id], {prepare: true})
  .then(result => callback(result.rows[0]))
  .catch(err => console.error(err));
}

module.exports = {
  getProductById,
  insertProduct,
}