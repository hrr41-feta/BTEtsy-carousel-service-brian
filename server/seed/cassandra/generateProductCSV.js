const models = require('../../models/postgres/index.js');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random()*(max-min) + min);
}

(() => {
  writer.pipe(fs.createWriteStream(__dirname + '/product_cassandra.csv'));
  let i=10000000;

  function writeProducts() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
        writer.write({id: 10000000-i, product_item: faker.commerce.productName(), liked: false});
        console.log('finished images');
        writer.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write({id: 10000000-i, product_item: faker.commerce.productName(), liked: false});
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', writeProducts);
    }
  }

  writeProducts();
})();