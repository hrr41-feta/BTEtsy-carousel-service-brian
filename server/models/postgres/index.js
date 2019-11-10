const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'btetsy',
  password: 'abc',
  port: 5432,
});

const saveProduct = (productItem, pictures) => {
  pool.query('INSERT INTO product(product_item, pictures) VALUES ($1, $2)', [productItem, pictures], (err, res) => {
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


const getProductById = (id, callback) => {
  pool.query('SELECT * FROM product WHERE id=$1', [id], (err, res) => {
    if(err){
      callback(err.stack);
    }
    else{
      callback(null, res.rows[0]);
    }
  })
}

const test = () => {
  pool.query('SELECT * FROM pg_catalog.pg_tables', function(err, result) {
    console.log(result);
  });
}

test();

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

module.exports.saveProduct = saveProduct;
module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.copyProducts = copyProducts;
module.exports.copyImages = copyImages;