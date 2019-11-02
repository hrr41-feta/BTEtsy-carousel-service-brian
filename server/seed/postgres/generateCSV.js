const models = require('../../models/postgres/index.js');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random()*(max-min) + min);
}

// writer.pipe(fs.createWriteStream(__dirname + '/products.csv'));
// for(var i=0; i<10000000; i++){
//   writer.write({productName: faker.lorem.word()});
// }

// writer.end();

writer.pipe(fs.createWriteStream(__dirname + '/images.csv'));
for(var i=0; i<40000000; i++){
  writer.write({product_id: random(0, 10000000), image: faker.image.cats()});
}

writer.end();


models.getProducts();