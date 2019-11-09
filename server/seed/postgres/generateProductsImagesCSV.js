const models = require('../../models/postgres/index.js');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random()*(max-min) + min);
}

const makeString = () => {
  let build = "";
  let randomNum = random(2, 6);

  for(var i=0; i<randomNum; i++){
    if(i !== randomNum - 1){
      build += faker.image.image() + ";";
    }
    else{
      build += faker.image.image();
    }
  }

  return build;
}

(() => {
   writer.pipe(fs.createWriteStream(__dirname + '/products.csv'));
  let i=10000000;

  function writeProducts() {
    var ok = true;

    do {
      i -= 1;
      let images = makeString();
      if (i === 0) {
        // last time!
        writer.write({product_item: faker.commerce.productName(), liked: false, pictures: images});
        console.log("finished products");
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write({product_item: faker.commerce.productName(), liked: false, pictures: images});
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

