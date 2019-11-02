const models = require('../../models/postgres/index.js');

models.copyProducts(__dirname + '/products.csv');

models.copyImages(__dirname + '/images.csv');