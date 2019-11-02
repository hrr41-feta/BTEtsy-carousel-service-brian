const models = require('../../models/postgres/index.js');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

// writer.pipe(fs.createWriteStream(__dirname + '/products.csv'));
// for(var i=0; i<10000000; i++){
//   writer.write({id: i, liked: false, productName: faker.lorem.word()});
// }

// writer.end();

// writer.pipe(fs.createWriteStream(__dirname + '/images.csv'));
// for(var i=0; i<40000000; i++){
//   writer.write({product_id: random(0, 10000000), image: faker.image.cats()});
// }

// writer.end();
(() => {
   writer.pipe(fs.createWriteStream(__dirname + '/products.csv'));
  let i=10000000

  function writeProducts() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
        writer.write({product_item: faker.lorem.word(), liked: false});
        console.log("finished products");
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write({product_item: faker.lorem.word(), liked: false});
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

