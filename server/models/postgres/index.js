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

module.exports.saveProduct = saveProduct;
module.exports.getProducts = getProducts;