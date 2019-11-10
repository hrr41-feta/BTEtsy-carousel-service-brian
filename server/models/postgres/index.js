const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'btetsy',
  password: 'password123',
  port: 5432,
});

const getProductById = (id, callback) => {
  pool.query('SELECT products.id, product_images.image_url, products.product_item, products.liked FROM product_images INNER JOIN products ON products.id=product_images.product_id AND products.id=$1;', [id])
  .then(res => {
    let images = [];
    let response = {};

    res.rows.forEach(row => {
      images.push(row.image_url);
    })

    response.id = res.rows[0].id;
    response.pictureUrl = images;
    response.name = res.rows[0].product_item;
    response.like = res.rows[0].liked;

    callback(null, [response]);
  })
  .catch(err => {
    callback(err);
  });
}

const updateProductById = (id, liked, callback) => {
  pool.query('UPDATE products SET liked=$1 WHERE id=$2;', [liked, id])
  .then(res => {
    callback(null, 'Successfully updated row');
  })
  .catch(err => {
    callback(err);
  })
}

const copyProducts = (filePath) => {
  pool.query(`COPY products(product_item, liked, pictures) from '${filePath}' DELIMITER ',' CSV HEADER`, (err, res) => {
    if(err){
      console.log(err.stack);
    }
    else{
      console.log('success');
    }
  })
}

const copyImages = (filePath) => {
  pool.query(`COPY picture(product_id, image) from '${filePath}' DELIMITER ',' CSV HEADER`, (err, res) => {
    if(err){
      console.log(err.stack);
    }
    else{
      console.log('success');
    }
  })
}

module.exports.getProductById = getProductById;
module.exports.copyProducts = copyProducts;
module.exports.copyImages = copyImages;
module.exports.updateProductById = updateProductById;