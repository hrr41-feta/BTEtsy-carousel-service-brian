const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const saveProduct = (productItem, liked, callback) => {
  pool.query('INSERT INTO products (product_item, liked) VALUES ($1, $2);', [productItem, liked])
  .then(res => {
    callback(null,"Inserted row successfully");
  })
  .catch(err => {
    callback(err);
  })
}

const saveImageByProductId = (id, imageURL, callback) => {
  pool.query('INSERT INTO product_images (product_id, image_url) values ($1, $2);', [id, imageURL])
  .then(res => {
    callback(null, "Inserted row successfully");
  })
  .catch(err => {
    callback(err);
  })
}

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

//should also delete all images associated with a product_id
const _deleteImagesById = (id) => {
  pool.query('DELETE FROM product_images WHERE id=$1', [id])
  .then(res => {
    return "Succesfully deleted product images";
  })
  .catch(err => {
    return err;
  })
}

const deleteProductById = (id, callback) => {
  pool.query('DELETE FROM products WHERE id=$1;', [id])
  .then(res => {
    callback(null, _deleteImagesById(id));
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

module.exports = {
  getProductById,
  copyProducts,
  copyImages,
  updateProductById,
  saveProduct,
  saveImageByProductId,
  deleteProductById,
}