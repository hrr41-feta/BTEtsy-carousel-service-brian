const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'btetsy',
  password: 'abc',
  port: 5432,
});

const saveProduct = (productItem, pictureId) => {
  pool.query('INSERT INTO product(product_item) VALUES ($1)', [productItem], (err, res) => {
    if(err){
      console.log(err.stack);
    }
    else{
      console.log('success');
    }
  })
}

const getProducts = () => {
  pool.query('SELECT * FROM product', (err, res) => {
    if(err){
      console.log(err.stack);
    }
    else{
      console.log(res.rows[0]);
    }
  })
}

const copyProducts = (filePath) => {
  pool.query(`COPY product(product_item, liked) from '${filePath}' DELIMITER ',' CSV HEADER`, (err, res) => {
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


module.exports.saveProduct = saveProduct;
module.exports.getProducts = getProducts;
module.exports.copyProducts = copyProducts;
module.exports.copyImages = copyImages;