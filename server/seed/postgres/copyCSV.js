const models = require('../../models/postgres/index.js');

models.copyProducts(__dirname + '/products.csv');
console.log(__dirname);
// models.copyImages(__dirname + '/images.csv');