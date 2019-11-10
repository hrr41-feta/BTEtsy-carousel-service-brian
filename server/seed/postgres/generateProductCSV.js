const models = require('../../models/postgres/index.js');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

(() => {
   writer.pipe(fs.createWriteStream(__dirname + '/products.csv'));
  let i=10000000

  function writeProducts() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
        writer.write({product_item: faker.commerce.productName(), liked: false});
        console.log("finished products");
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write({product_item: faker.commerce.productName(), liked: false});
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

